import {LayersControl, MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import * as L from "leaflet";
import {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import ukraineOblast from '../../assets/ukraine-oblast.json'
import {Layer, PathOptions, GeoJSON as GeoJson, LeafletMouseEvent} from "leaflet";
import {getColor} from "../../services/util.ts";
import {Feature, GeoJsonObject, Geometry} from "geojson";
import {DataScope} from "../../types/datascope.interface.ts";
import {Legend} from "../ui/map/Legend.tsx";
import {MigrationInterface} from "../../types/migration.interface.ts";
import {MigrationService} from "../../services/migration.service.ts";
import {DataScopeSelector} from "../ui/map/DataScopeSelector.tsx";


const dataScopes: DataScope[] = [
    {
        name: "Population",
        key: "pop_est",
        description: "The population of the oblast",
        unit: "",
        // scale: [5000000, 10000000, 25000000, 50000000, 75000000, 100000000, 200000000, 1000000000]
        scale: [1000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000]
    },
    {
        name: "GDP",
        key: "gdp_md_est",
        description: "The GDP of the country",
        unit: "USD",
        scale: [100000, 250000, 500000, 1000000, 2500000, 5000000, 15000000]
    }
];

const colors = [
    ['#fcfca7', '#f4e283', '#eec762', '#e8ab44', '#e28d2b', '#dc6e16', '#d4490a', '#cb0c0c'],
    ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']
]

const InternalMigration = () => {
    const [dataScope, setDataScope] = useState<DataScope>(dataScopes[0]);
    // const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState<{[p: string]: any}>({});
    const [migrations, setMigrations] = useState<MigrationInterface[]>([])

    const geoMap = useRef<GeoJson>(null);

    useEffect(() => {

        const fetchData = async () => {
            const data = await MigrationService.getInternalMigration(new Date(2023, 0, 1), new Date(2024, 0, 1))
            setMigrations(data)
        }

        // call the function
        fetchData()

        // MigrationService.getInternalMigration(new Date(2023, 0, 1), new Date(2024, 0, 1))
        //     .then((result) => setMigrations(result))
    }, [])

    useMemo(() => {
        if (geoMap.current) {
            geoMap.current.getLayers().map(l => {
                const layer = l as L.GeoJSON
                const feature = layer.feature as Feature
                if (feature && feature.properties) {
                    const name = feature.properties['name:en'].replace(' Oblast', '')

                    const migration = migrations?.filter(e => e.Oblast == name).at(0)
                    let migrationValue = 0
                    if(migration) {
                        migrationValue = migration.Migration
                    }
                    l.setTooltipContent(`<div><span>Migration</span>: ${Math.ceil(migrationValue)}</div>`)
                }
            })
        }

    }, [migrations])

    const handleDataScopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const scope = dataScopes.find(element => element.key === event.target.value)
        if (scope)
            setDataScope(scope);
    }

    const highlightFeature = (e: LeafletMouseEvent) => {
        const layer = e.target as GeoJson<GeoJsonObject>;
        if (layer) {
            layer.setStyle({
                color: '#444',
                weight: 2
            });
            layer.bringToFront();
            const feature = layer.feature as Feature;
            if (feature && feature.properties) {
                setHoveredCountry(feature.properties);
            }
        }
    }

    const resetHighlight = (e: LeafletMouseEvent) => {
        e.target.setStyle({
            color: '#888',
            weight: 1
        });
        setHoveredCountry({});
    }

    const onEachFeature = useCallback(async (feature: Feature<Geometry, any>, layer: Layer) => {
        const name = feature?.properties['name:en'].replace(' Oblast', '')

        const migration = migrations?.filter(e => e.Oblast == name).at(0)
        let migrationValue = 0
        if(migration) {
            migrationValue = migration.Migration
        }
        layer.bindTooltip(`<div><span>Migration</span>: ${migrationValue}</div>`, { sticky: true });

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            // click: () => setSelectedCountry(feature.properties)
        });
    }, [dataScope, migrations]);

    const style = useCallback((feature: Feature<Geometry, any> | undefined) => {
        const name = feature?.properties['name:en'].replace(' Oblast', '')

        const migration = migrations?.filter(e => e.Oblast == name).at(0)
        let migrationValue = 0
        if(migration) {
            migrationValue = migration.Migration
        }

        const mapStyle = {
            // fillColor: getColor(feature?.properties[dataScope.key], colors, dataScope.scale),
            fillColor: getColor(migrationValue, colors, dataScope.scale),
            // fillColor: getColor(Math.random()*100000, colors, dataScope.scale),
            weight: 1,
            opacity: 1,
            color: '#888',
            dashArray: '3',
            fillOpacity: 0.7
        };

        return mapStyle as PathOptions;
    }, [dataScope, migrations]);

    const geoJsonComponent = useMemo(
        () => <GeoJSON data={ukraineOblast as GeoJsonObject} style={style} onEachFeature={onEachFeature} ref={geoMap} />,
        [style, onEachFeature]
    );

    return(
        <div className="mapContainer">
            <MapContainer center={[48.5, 31.5]}
                          zoomControl={false}
                          zoom={6}
                          maxZoom={8}
                          minZoom={2}
                          zoomSnap={0.5}
                          zoomDelta={0.5}
                          wheelPxPerZoomLevel={120}
                          maxBoundsViscosity={0.5}
                          maxBounds={L.latLngBounds(new L.LatLng(85, -210), new L.LatLng(-85, 210))}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/*<TileLayer url={`https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=${import.meta.env.VITE_MAP_API_KEY}`} />*/}
                <LayersControl position="topleft">
                    <LayersControl.Overlay checked name="GeoJSON">
                        {geoJsonComponent}
                    </LayersControl.Overlay>
                </LayersControl>
                <Legend scope={dataScope} colors={colors} hoveredCountry={hoveredCountry} migrations={migrations}/>
            </MapContainer>
            <DataScopeSelector options={dataScopes} value={dataScope} changeHandler={handleDataScopeChange} />
        </div>
    )
}

export default InternalMigration
import {DataScopeSelector} from "../ui/map/DataScopeSelector.tsx";
import {GeoJSON, LayersControl, MapContainer, TileLayer} from "react-leaflet";
import * as L from "leaflet";
import {Legend} from "../ui/map/Legend.tsx";
import {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {GeoJSON as GeoJson, Layer, LeafletMouseEvent, PathOptions} from "leaflet";
import {Feature, GeoJsonObject, GeoJsonProperties, Geometry} from "geojson";
import {getColor} from "../../services/util.ts";
import worldGeoJSON from "../../assets/custom.geo.50.json";
import {DataScope} from "../../types/datascope.interface.ts";
import {ExternalMigrationInterface} from "../../types/migration.interface.ts";
import {MigrationService} from "../../services/migration.service.ts";

const dataScopes: DataScope[] = [
    {
        name: "Migration",
        key: "Migration",
        description: "The population of the oblast",
        unit: "",
        // scale: [5000000, 10000000, 25000000, 50000000, 75000000, 100000000, 200000000, 1000000000]
        scale: [1000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000]
    },
    {
        name: "Immigration",
        key: "Immigration",
        description: "The GDP of the country",
        unit: "",
        scale: [10000, 25000, 50000, 100000, 250000, 500000, 1500000]
    }
];

const colors = [
    ['#fcfca7', '#f4e283', '#eec762', '#e8ab44', '#e28d2b', '#dc6e16', '#d4490a', '#cb0c0c'],
    ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']
]

const ExternalMigration = () => {

    const [dataScope, setDataScope] = useState<DataScope>(dataScopes[0]);
    const [hoveredCountry, setHoveredCountry] = useState<{[p: string]: any}>({});
    const [migrations, setMigrations] = useState<ExternalMigrationInterface[]>([])
    const [selectedCountry, setSelectedCountry] = useState<GeoJsonProperties>(null);

    const geoMap = useRef<GeoJson>(null);

    useMemo(() => {

        const fetchData = async () => {
            if(selectedCountry) {
                const data = await MigrationService.getExternalMigration(selectedCountry.name_sort, new Date(2023, 0, 1), new Date(2025, 0, 1))
                setMigrations(data)
                setDataScope(prevState => {return {...prevState, scale: [10, 50, 100, 150, 200, 250, 300, 400]}})
            }
        }

        // call the function
        fetchData()

        // MigrationService.getInternalMigration(new Date(2023, 0, 1), new Date(2024, 0, 1))
        //     .then((result) => setMigrations(result))
    }, [selectedCountry])

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
            color: '#3388ff',
            weight: 1
        });
        setHoveredCountry({});
    }

    const onEachFeature = useCallback(async (feature: Feature<Geometry, any>, layer: Layer) => {
        const name = feature?.properties['name']
        //
        // const migration = migrations?.filter(e => e.Oblast == name).at(0)
        // let migrationValue = 0
        // if(migration) {
        //     migrationValue = migration.Migration
        // }
        layer.bindTooltip(`<div><span>Migration</span>: ${name}</div>`, { sticky: true });

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: () => setSelectedCountry(feature.properties)
        });
    }, [dataScope]);

    const style = useCallback((feature: Feature<Geometry, any> | undefined) => {
        const name = feature?.properties['name_sort']
        // console.log('Country: ', name)

        const migration = migrations?.filter(e => e.Destination == name).at(0)
        let migrationValue = 0
        if(migration) {
            // console.log(migrations)
            migrationValue = migration.Migration
            // console.log(`for ${dataScope.key}: `, migrationValue)
        }

        let isOrigin = false;
        if(migrations.length > 0) {
            isOrigin = name == migrations[0].Origin
        }

        const mapStyle = migrationValue != 0 || isOrigin ? {
            // fillColor: getColor(feature?.properties[dataScope.key], colors, dataScope.scale),
            fillColor: isOrigin ? '#006bff' : getColor(migrationValue, colors, dataScope.scale),
            // fillColor: getColor(Math.random()*100000, colors, dataScope.scale),
            weight: 1,
            opacity: 1,
            color: '#3388ff',
            dashArray: '3',
            fillOpacity: 0.7
        } : {
            color: '#3388ff',
            weight: 1
        };

        return mapStyle as PathOptions;
    }, [dataScope, migrations]);

    const geoJsonComponent = useMemo(
        () => <GeoJSON data={worldGeoJSON as GeoJsonObject} style={style} onEachFeature={onEachFeature} ref={geoMap} />,
        [style, onEachFeature]
    );



    const applyStyle = () => {
        if(geoMap.current) {
            geoMap.current.setStyle(style)
        }
    }




    return(
        <div className="h-full flex flex-col">
            <div className="flex mb-4 flex-col md:flex-row lg:flex-row space-y-2 md:space-y-0 lg:space-y-0">
                <DataScopeSelector options={dataScopes} value={dataScope} changeHandler={handleDataScopeChange} />
                {/*<div className="flex items-center ml-0 md:ml-2 lg:ml-2 flex-col md:flex-row lg:flex-row space-x-0 space-y-2 md:space-y-0 lg:space-y-0 md:space-x-2 lg:space-x-2">*/}
                {/*    <Datepicker options={options} onChange={handleFromChange} show={fromShow} setShow={handleFromClose} />*/}
                {/*    <span className="mx-4 text-gray-50">to</span>*/}
                {/*    <Datepicker options={toOptions} onChange={handleToChange} show={toShow} setShow={handleToClose} />*/}
                {/*    <button onClick={predictMigration}*/}
                {/*            className="bg-gray-50 ml-4 w-full md:w-min lg:w-min border hover:bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                {/*    >Predict</button>*/}
                {/*</div>*/}

                    <button onClick={applyStyle}
                            className="bg-gray-50 ml-4 w-full md:w-min lg:w-min border hover:bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >Style</button>
            </div>
            <div className="mapContainer z-0">
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
                    {/*<Legend scope={dataScope} colors={colors} hoveredCountry={hoveredCountry} migrations={migrations}/>*/}
                </MapContainer>
            </div>
        </div>
    )
}

export default ExternalMigration

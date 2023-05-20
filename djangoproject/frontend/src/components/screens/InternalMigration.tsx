import {LayersControl, MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import * as L from "leaflet";
import {useCallback, useMemo, useRef, useState} from "react";
import ukraineOblast from '../../assets/ukraine-oblast.json'
import {Layer, PathOptions, GeoJSON as GeoJson, LeafletMouseEvent} from "leaflet";
import {getColor} from "../../services/util.ts";
import {Feature, GeoJsonObject, Geometry} from "geojson";
import {DataScope} from "../../types/datascope.interface.ts";
import {Legend} from "../ui/map/Legend.tsx";


const dataScopes: DataScope[] = [
    {
        name: "Population",
        key: "pop_est",
        description: "The population of the oblast",
        unit: "",
        // scale: [5000000, 10000000, 25000000, 50000000, 75000000, 100000000, 200000000, 1000000000]
        scale: [1000, 10000, 25000, 50000, 100000, 200000, 50000000, 100000000]
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
    const [dataScope] = useState<DataScope>(dataScopes[0]);
    // const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState<{[p: string]: any}>({});

    const geoMap = useRef<GeoJson>(null);

    // const handleDataScopeChange = (event: Event) => {
    //     const scope = dataScopes.find(element => element.key === (event.target as HTMLSelectElement).value)
    //     if (scope)
    //         setDataScope(scope);
    // }
    //
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
                console.log(feature.properties)
                setHoveredCountry(feature.properties);
            }
        }
    }

    const resetHighlight = (e: LeafletMouseEvent) => {
        e.target.setStyle({
            color: '#888',
            weight: 1
        });
        // setHoveredCountry(null);
    }

    const onEachFeature = useCallback((feature: Feature<Geometry, any>, layer: Layer) => {
        layer.bindTooltip(`<div><span>${dataScope.name}</span>: ${feature.properties[dataScope.key]}</div>`, { sticky: true });

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            // click: () => setSelectedCountry(feature.properties)
        });
    }, [dataScope])

    const style = useCallback((feature: Feature<Geometry, any> | undefined) => {
        const mapStyle = {
            fillColor: getColor(feature?.properties[dataScope.key], colors, dataScope.scale),
            // fillColor: getColor(Math.random()*100000, colors, dataScope.scale),
            weight: 1,
            opacity: 1,
            color: '#888',
            dashArray: '3',
            fillOpacity: 0.7
        };

        return mapStyle as PathOptions;
    }, [dataScope]);

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
                <Legend scope={dataScope} colors={colors} hoveredCountry={hoveredCountry} />
            </MapContainer>
        </div>
    )
}

export default InternalMigration
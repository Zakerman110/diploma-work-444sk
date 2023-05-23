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
// @ts-ignore
import Datepicker from "tailwind-datepicker-react"


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

const options = {
    // title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-red-500",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12 z-10",
    defaultDate: new Date("2023-01-01"),
    language: "en",
}

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

    const [fromShow, setFromShow] = useState<boolean>(false)
    const [fromDate, setFromDate] = useState<Date>(new Date("2023-01-01"))
    const [toShow, setToShow] = useState<boolean>(false)
    const [toDate, setToDate] = useState<Date>(new Date("2024-01-01"))
    const [toOptions, setToOptions] = useState({...options, minDate: new Date("2023-01-01"), defaultDate: new Date("2024-01-01")})
    const handleFromChange = (selectedDate: Date) => {
        setToOptions(prevState => {
            return {...prevState, minDate: new Date(selectedDate), defaultDate: new Date(selectedDate)}
        })
        setFromDate(selectedDate)
    }
    const handleFromClose = (state: boolean) => {
        setFromShow(state)
    }
    const handleToChange = (selectedDate: Date) => {
        setToDate(selectedDate)
    }
    const handleToClose = (state: boolean) => {
        setToShow(state)
    }

    const predictMigration = async () => {
        const data = await MigrationService.getInternalMigration(fromDate, toDate)
        setMigrations(data)
    }

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
                        //@ts-ignore
                        migrationValue = migration[dataScope.key]
                    }
                    l.setTooltipContent(`<div><span>${dataScope.key}</span>: ${Math.ceil(migrationValue)}</div>`)
                }
            })
        }

    }, [dataScope, migrations])

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
            //@ts-ignore
            migrationValue = migration[dataScope.key]
            // console.log(`for ${dataScope.key}: `, migrationValue)
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
        <div className="h-full flex flex-col">
            <div className="flex mb-4 flex-col md:flex-row lg:flex-row space-y-2 md:space-y-0 lg:space-y-0">
                <DataScopeSelector options={dataScopes} value={dataScope} changeHandler={handleDataScopeChange} />
                <div className="flex items-center ml-0 md:ml-2 lg:ml-2 flex-col md:flex-row lg:flex-row space-x-0 space-y-2 md:space-y-0 lg:space-y-0 md:space-x-2 lg:space-x-2">
                    <Datepicker options={options} onChange={handleFromChange} show={fromShow} setShow={handleFromClose} />
                    <span className="mx-4 text-gray-50">to</span>
                    <Datepicker options={toOptions} onChange={handleToChange} show={toShow} setShow={handleToClose} />
                    <button onClick={predictMigration}
                            className="bg-gray-50 ml-4 w-full md:w-min lg:w-min border hover:bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >Predict</button>
                </div>
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
                              maxBounds={L.latLngBounds(new L.LatLng(55, 17), new L.LatLng(40, 49))}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {/*<TileLayer url={`https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=${import.meta.env.VITE_MAP_API_KEY}`} />*/}
                    <LayersControl position="topleft">
                        <LayersControl.Overlay checked name="GeoJSON">
                            {geoJsonComponent}
                        </LayersControl.Overlay>
                    </LayersControl>
                    <Legend scope={dataScope} colors={colors} hoveredCountry={hoveredCountry} migrations={migrations}/>
                </MapContainer>
            </div>
        </div>
    )
}

export default InternalMigration
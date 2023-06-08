import {DataScopeSelector} from "../ui/map/DataScopeSelector.tsx";
import {GeoJSON, LayersControl, MapContainer, TileLayer} from "react-leaflet";
import * as L from "leaflet";
import {ChangeEvent, useCallback, useMemo, useRef, useState} from "react";
import {GeoJSON as GeoJson, Layer, LeafletMouseEvent, PathOptions} from "leaflet";
import {Feature, GeoJsonObject, Geometry} from "geojson";
import {generateScaleRanges, getColor} from "../../services/util.ts";
import worldGeoJSON from "../../assets/custom.geo.50.json";
import {DataScope} from "../../types/datascope.interface.ts";
import {ExternalMigrationInterface} from "../../types/migration.interface.ts";
import {MigrationService} from "../../services/migration.service.ts";
// @ts-ignore
import Datepicker from "tailwind-datepicker-react"
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {Spinner} from "flowbite-react";

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

const ExternalMigration = () => {

    const [dataScope, setDataScope] = useState<DataScope>(dataScopes[0]);
    const [migrationScale, setMigrationScale] = useState<number[]>([]);

    const [, setHoveredCountry] = useState<{[p: string]: any}>({});
    const [migrations, setMigrations] = useState<ExternalMigrationInterface[]>([])

    const geoMap = useRef<GeoJson>(null);
    const { t } = useTranslation();

    const [fromShow, setFromShow] = useState<boolean>(false)
    const [fromDate, setFromDate] = useState<Date>(new Date("2023-01-01"))
    const [toShow, setToShow] = useState<boolean>(false)
    const [toDate, setToDate] = useState<Date>(new Date("2024-01-01"))
    const [toOptions, setToOptions] = useState({...options, minDate: new Date("2023-01-01"), defaultDate: new Date("2024-01-01")})
    const [loading, setLoading] = useState(false);

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
        setLoading(true)
        try {
            let data : ExternalMigrationInterface[]
            if (dataScope.name == 'Migration') {
                data = await MigrationService.getExternalMigration(fromDate, toDate)
            } else {
                data = await MigrationService.getExternalImmigration(fromDate, toDate)
            }
            setMigrations(data)
        } catch (error) {
            const errorMessage = (error as Error).message || 'An error occurred';
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    useMemo(() => {
        const fetchData = async () => {
            let data : ExternalMigrationInterface[]
            if (dataScope.name == 'Migration') {
                data = await MigrationService.getExternalMigration(new Date(2023, 0, 1), new Date(2025, 0, 1))
            } else {
                data = await MigrationService.getExternalImmigration(new Date(2023, 0, 1), new Date(2025, 0, 1))
            }
            setMigrations(data)
            const minValue = data.reduce((min, obj) => {
                return obj.Migration < min ? obj.Migration : min;
            }, Infinity);

            const maxValue = data.reduce((max, obj) => {
                return obj.Migration > max ? obj.Migration : max;
            }, -Infinity);
            // setDataScope(prevState => {return {...prevState, scale: generateScaleRanges(minValue, maxValue, dataScope.name == 'Migration' ? 8 : 7)}})

            setMigrationScale(generateScaleRanges(minValue, maxValue, dataScope.name == 'Migration' ? 8 : 7))

            if (geoMap.current) {
                geoMap.current.getLayers().map(l => {
                    const layer = l as L.GeoJSON
                    const feature = layer.feature as Feature
                    if (feature && feature.properties) {
                        const name = feature.properties['name_sort']

                        const migration = data.filter(e => e.Origin == name).at(0)
                        let migrationValue = 0
                        if(migration) {
                            migrationValue = migration.Migration
                        }
                        l.setTooltipContent(`<div><span>${dataScope.key}</span>: ${Math.ceil(migrationValue)}</div>`)
                    }
                })
            }
        }

        fetchData()
    }, [dataScope])

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
            // click: () => setSelectedCountry(feature.properties)
        });
    }, [dataScope]);

    const style = useCallback((feature: Feature<Geometry, any> | undefined) => {
        const name = feature?.properties['name_sort']
        // console.log('Country: ', name)

        const migration = migrations?.filter(e => e.Origin == name).at(0)
        let migrationValue = 0
        if(migration) {
            // console.log(migrations)
            migrationValue = migration.Migration
            // console.log(`for ${dataScope.key}: `, migrationValue)
        }

        let isOrigin = false;
        if(migrations.length > 0) {
            isOrigin = name == 'Ukraine'
        }

        const mapStyle = migrationValue != 0 || isOrigin ? {
            // fillColor: getColor(feature?.properties[dataScope.key], colors, dataScope.scale),
            fillColor: isOrigin ? '#006bff' : getColor(migrationValue, colors, migrationScale),
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
                    >{loading ? <Spinner aria-label="Default status example" /> : t('internal.predict')}</button>
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

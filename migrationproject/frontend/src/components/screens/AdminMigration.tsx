import {ChangeEvent, useEffect, useState} from "react";
import {Flow, UpdateFlowStatus} from "../../types/flow.interface.ts";
import {UserMigrationService} from "../../services/usermigration.service.ts";
import {toast} from "react-toastify";
import StatusLabel from "../ui/StatusLabel.tsx";
import {Accordion, Radio} from "flowbite-react";
import {exportToCsv} from "../../services/parse.service.ts";
import {useTranslation} from "react-i18next";

const AdminMigration = () => {

    const [flows, setFlows] = useState<Flow[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRadio, setSelectedRadio] = useState("");
    const [flowUpdateCounter, setFlowUpdateCounter] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const response = await UserMigrationService.getAllFlows()
                setFlows(response.data)
            } catch (error) {
                const errorMessage = (error as Error).message || 'An error occurred';
                toast.error(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        fetchFlows()
    }, [flowUpdateCounter]);

    const filterFlows = flows.filter((flow) =>
        flow.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        flow.status.includes(selectedRadio)
    );

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleRadio = (radioStatus: string) => {
        setSelectedRadio(radioStatus)
    }

    const handleUpdateFlowStatus = async (id: number, status: number) => {
        const updateFlowStatus = {id, status} as UpdateFlowStatus
        try {
            const response = await UserMigrationService.updateFlowStatus(updateFlowStatus)
            toast.success(response.data.message)
            setFlowUpdateCounter(prevState => prevState + 1)
        } catch (error) {
            const errorMessage = (error as Error).message || 'An error occurred';
            toast.error(errorMessage)
        }
    }

    const handleExportCsv = async () => {
        // Fetch data from the Flow and FlowDetails models
        const responseFlows = await UserMigrationService.getAllFlows()
        const flows = responseFlows.data.map(obj => {
            const { ['flowdetails_set']: removedField, ...rest } = obj;
            return rest;
        });
        const responseFlowsDetails = await UserMigrationService.getAllFlowsDetails()
        // const flowData = []; // Replace with actual data from the Flow model
        // const flowDetailsData = []; // Replace with actual data from the FlowDetails model

        // Export data to CSV files
        exportToCsv(flows, 'flow_data.csv');
        exportToCsv(responseFlowsDetails.data, 'flow_details_data.csv');
    };

    if (loading) {
        return (
            <div role="status" className="w-min m-auto mt-[25%]">
                <svg aria-hidden="true"
                     className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only dark:text-white">Loading...</span>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto">
            <div className="flex mb-4">
                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       type="text" placeholder={t('userMigration.searchByDescription') ?? ''} onChange={handleSearch} />
                <button className="ml-2 px-4 flex-shrink-0 bg-green-600 hover:bg-gray-500 rounded-lg border dark:bg-green-800 dark:hover:bg-green-700 dark:border-gray-600 dark:text-white" onClick={handleExportCsv}>{t('userMigration.exportCSV')}</button>
            </div>

            <ul className="items-center mb-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3 rounded-l bg-blue-800">
                        <Radio id="radio-pending" name="status-radio" onChange={() => handleRadio('Pending')}/>
                        <label htmlFor="radio-pending"  className="w-full py-3 ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Pending</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3 bg-green-800">
                        <Radio id="radio-approved" name="status-radio" onChange={() => handleRadio('Approved')}/>
                        <label htmlFor="radio-approved" className="w-full py-3 ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Approved</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3 bg-red-800">
                        <Radio id="radio-declined" name="status-radio" onChange={() => handleRadio('Declined')}/>
                        <label htmlFor="radio-declined" className="w-full py-3 ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Declined</label>
                    </div>
                </li>
                <li className="w-full dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <Radio id="radio-all" name="status-radio" defaultChecked onChange={() => handleRadio('')}/>
                        <label htmlFor="radio-all" className="w-full py-3 ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">All</label>
                    </div>
                </li>
            </ul>

            { filterFlows.length === 0 ?
                <div className="flex justify-center">
                    <span className="dark:text-white">{t('userMigration.notFound')}</span>
                </div>
                :
                filterFlows.map(request => (
                    <div key={request.id} className="mb-8 bg-gray-50 dark:bg-gray-800 rounded p-4 border border-gray-300 dark:border-gray-600">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">{request.description}</h2>
                        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-4">
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.startDate')}</dt>
                                <dd className="text-lg font-semibold">{request.start_date}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.endDate')}</dt>
                                <dd className="text-lg font-semibold">{request.end_date}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.fromCountry')}</dt>
                                <dd className="text-lg font-semibold">{request.from_country}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.toCountry')}</dt>
                                <dd className="text-lg font-semibold">{request.to_country}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.user')}</dt>
                                <dd className="text-lg font-semibold">{request.user}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.status')}</dt>
                                <StatusLabel status={request.status} />
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{t('userMigration.actions')}</dt>
                                <div className="inline-flex rounded-md shadow-sm w-full" role="group">
                                    <button type="button"
                                            className="px-4 py-2 w-full text-sm font-medium text-blue-300 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-blue-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            onClick={() => handleUpdateFlowStatus(request.id, 1)}>
                                        Pending
                                    </button>
                                    <button type="button"
                                            className="px-4 py-2 w-full text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-green-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            onClick={() => handleUpdateFlowStatus(request.id, 2)}>
                                        Approve
                                    </button>
                                    <button type="button"
                                            className="px-4 py-2 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-red-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            onClick={() => handleUpdateFlowStatus(request.id, 3)}>
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </dl>
                        <Accordion collapseAll flush={true}>
                            <Accordion.Panel>
                                <Accordion.Title>
                                    {t('userMigration.flowDetails')}
                                </Accordion.Title>
                                <Accordion.Content>
                                    {request.flowdetails_set.map((flowDetail, index) => (
                                        <div key={index} className="bg-gray-100 p-4 rounded-md mt-2">
                                            <p>{t('userMigration.age')}: {flowDetail.age}</p>
                                            <p>{t('userMigration.income')}: {flowDetail.income}</p>
                                            <p>{t('userMigration.gender')}: {flowDetail.gender}</p>
                                            <p>{t('userMigration.education')}: {flowDetail.education}</p>
                                            <p>{t('userMigration.occupation')}: {flowDetail.occupation}</p>
                                        </div>
                                    ))}
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                ))
            }
        </div>
    );
}

export default AdminMigration
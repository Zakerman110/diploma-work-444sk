import {ChangeEvent, useEffect, useState} from "react";
import {Flow} from "../../types/flow.interface.ts";
import {UserMigrationService} from "../../services/usermigration.service.ts";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import StatusLabel from "../ui/StatusLabel.tsx";
import {Accordion} from "flowbite-react";

const UserMigration = () => {

    const [flows, setFlows] = useState<Flow[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const response = await UserMigrationService.getFlows()
                setFlows(response.data)
            } catch (error) {
                const errorMessage = (error as Error).message || 'An error occurred';
                toast.error(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        fetchFlows()
    }, []);

    const filterFlows = flows.filter((flow) =>
        flow.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
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
            <Link to="/migration/user/create"
                  className="m-auto w-full flex justify-center mb-4 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add new migration flow</Link>
            <input className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   type="text" placeholder="Search by description" onChange={handleSearch} />

            { filterFlows.length === 0 ?
                <div className="flex justify-center">
                    <span className="dark:text-white">Not found</span>
                </div>
                :
                filterFlows.map(request => (
                    <div key={request.id} className="mb-8 bg-gray-50 dark:bg-gray-800 rounded p-4 border border-gray-300 dark:border-gray-600">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">{request.description}</h2>
                        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-4">
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Start Date</dt>
                                <dd className="text-lg font-semibold">{request.start_date}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">End Date</dt>
                                <dd className="text-lg font-semibold">{request.end_date}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">From Country</dt>
                                <dd className="text-lg font-semibold">{request.from_country}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">To Country</dt>
                                <dd className="text-lg font-semibold">{request.to_country}</dd>
                            </div>
                            <div className="flex flex-col pt-2">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Status</dt>
                                <StatusLabel status={request.status} />
                            </div>
                        </dl>
                        <Accordion collapseAll flush={true}>
                            <Accordion.Panel>
                                <Accordion.Title>
                                    Flow Details
                                </Accordion.Title>
                                <Accordion.Content>
                                    {request.flowdetails_set.map((flowDetail, index) => (
                                        <div key={index} className="bg-gray-100 p-4 rounded-md mt-2">
                                            <p>Age: {flowDetail.age}</p>
                                            <p>Income: {flowDetail.income}</p>
                                            <p>Gender: {flowDetail.gender}</p>
                                            <p>Education: {flowDetail.education}</p>
                                            <p>Occupation: {flowDetail.occupation}</p>
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

export default UserMigration
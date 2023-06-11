import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Flow, FlowDetailsNew, FlowDetailsValue, FlowNew} from "../../types/flow.interface.ts";
import {UserMigrationService} from "../../services/usermigration.service.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import ErrorMessage from "../ui/ErrorMessage.tsx";
import {useTranslation} from "react-i18next";

interface FlowError {
    start_date: string[]
    end_date: string[],
    description: string[],
    from_country: string[],
    to_country: string[],
}

const UserMigrationCreate = () => {

    const { register, handleSubmit, formState: {errors} } = useForm<Flow>();
    const { register: registerDetail  } = useForm();
    const [countries, setCountries] = useState<FlowDetailsValue[]>([]);
    const [genders, setGenders] = useState<FlowDetailsValue[]>([]);
    const [educations, setEducations] = useState<FlowDetailsValue[]>([]);
    const [occupations, setOccupations] = useState<FlowDetailsValue[]>([]);
    const [flowDetails, setFlowDetails] = useState<FlowDetailsNew[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [flowError, setFlowError] = useState<FlowError>()
    const { t } = useTranslation();

    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const responseCountries = await UserMigrationService.getCountries()
                setCountries(responseCountries.data)
                const responseGenders = await UserMigrationService.getGenders()
                setGenders(responseGenders.data)
                const responseEducations = await UserMigrationService.getEducations()
                setEducations(responseEducations.data)
                const responseOccupations = await UserMigrationService.getOccupations()
                setOccupations(responseOccupations.data)
            } catch (error) {
                const errorMessage = (error as Error).message || 'An error occurred';
                toast.error(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        fetchFlows()
    }, []);

    const onSubmit = async (data: any) => {
        if (flowDetails.length === 0) {
            toast.error('Add Flow Details!')
            return
        }

        data['flowdetails_set'] = flowDetails

        const selectedFields = ['start_date', 'end_date', 'description', 'from_country', 'to_country', 'flowdetails_set'];
        const newData = selectedFields.reduce((obj, field) => {
            obj[field] = data[field];
            return obj;
        }, {} as { [key: string]: any });
        newData['from_country'] = +newData['from_country']
        newData['to_country'] = +newData['to_country']

        try {
            await UserMigrationService.postFlow(newData as FlowNew)
            toast.success('Flow created!')
            navigate('/migration/user')

        } catch (error) {
            if (error instanceof AxiosError) {
                setFlowError((error.response?.data) as FlowError)
            }
            toast.error('An error occurred')
        }
    };

    const handleFlowDetailChange = (index: number, field: string, value: any) => {
        const updatedFlowDetails = [...flowDetails];

        if ('age' === field && value < 0) {
            return;
        }
        updatedFlowDetails[index][field as keyof FlowDetailsNew] = +value;
        setFlowDetails(updatedFlowDetails);
    };

    const addFlowDetail = () => {
        setFlowDetails([...flowDetails, { age: 0, income: 0, gender: 0, education: 0, occupation: 0 }]);
    };

    const removeFlowDetail = (index: number) => {
        setFlowDetails((prevFlowDetails) => {
            return prevFlowDetails.filter((_, i) => i !== index);
        });
    }

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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-gray-50 dark:bg-gray-800 rounded p-4 border border-gray-300 dark:border-gray-600">
            <div className="mb-4">
                <label htmlFor="start_date" className="block font-medium mb-1 dark:text-white">{t('userMigration.startDate')}</label>
                <input type="date" id="start_date" {...register('start_date', { required: "Start date is required!" })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" />
                <ErrorMessage error={errors?.start_date} />
                <ErrorMessage error={flowError?.start_date} />
            </div>
            <div className="mb-4">
                <label htmlFor="end_date" className="block font-medium mb-1 dark:text-white">{t('userMigration.endDate')}</label>
                <input type="date" id="end_date" {...register('end_date', { required: "End date is required!" })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" />
                <ErrorMessage error={errors?.end_date} />
                <ErrorMessage error={flowError?.end_date} />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1 dark:text-white">{t('userMigration.description')}</label>
                <textarea id="description" {...register('description', { required: "Description is required!" })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" />
                <ErrorMessage error={errors?.description} />
                <ErrorMessage error={flowError?.description} />
            </div>
            <div className="mb-4">
                <label htmlFor="from_country" className="block font-medium mb-1 dark:text-white">{t('userMigration.fromCountry')}</label>
                <select id="from_country" {...register('from_country', { required: "From country is required!" })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border">
                    <option value="">Select From Country</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                </select>
                <ErrorMessage error={errors?.from_country} />
                <ErrorMessage error={flowError?.from_country} />
            </div>
            <div className="mb-4">
                <label htmlFor="to_country" className="block font-medium mb-1 dark:text-white">{t('userMigration.toCountry')}</label>
                <select id="to_country" {...register('to_country', { required: "To country is required!" })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border">
                    <option value="">Select To Country</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                </select>
                <ErrorMessage error={errors?.to_country} />
                <ErrorMessage error={flowError?.to_country} />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 dark:text-white">{t('userMigration.flowDetails')}</h3>
                {flowDetails.map((flowDetail, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center ">
                            <h4 className="text-lg font-medium dark:text-white">{t('userMigration.person')} {index + 1}</h4>
                            <button className="bg-red-500 hover:bg-red-400 text-white rounded-md px-4 py-2 ml-4" onClick={_ => removeFlowDetail(index)}>{t('userMigration.remove')}</button>
                        </div>
                        <label htmlFor={`age_${index}`} className="block font-medium mb-1 dark:text-white">{t('userMigration.age')}</label>
                        <input type="number" id={`age_${index}`} value={flowDetail.age} {...registerDetail(`age_${index}`, { required: true })}  onChange={(e) => handleFlowDetailChange(index, 'age', e.target.value)} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" required />
                        <label htmlFor={`income_${index}`} className="block font-medium mb-1 dark:text-white">{t('userMigration.income')}</label>
                        <input type="number" id={`income_${index}`} value={flowDetail.income} {...registerDetail(`income_${index}`, { required: true })} onChange={(e) => handleFlowDetailChange(index, 'income', e.target.value)} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" required />
                        <label htmlFor={`gender_${index}`} className="block font-medium mb-1 dark:text-white">{t('userMigration.gender')}</label>
                        <select id={`gender_${index}`} {...registerDetail(`gender_${index}`, { required: true })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" onChange={(e) => handleFlowDetailChange(index, 'gender', e.target.value)}>
                            <option value="">Select Gender</option>
                            {genders.map(gender => (
                                <option key={gender.id} value={gender.id}>{gender.name}</option>
                            ))}
                        </select>
                        <label htmlFor={`education_${index}`} className="block font-medium mb-1 dark:text-white">{t('userMigration.education')}</label>
                        <select id={`education_${index}`} {...registerDetail(`education_${index}`, { required: true })} className="w-full border-gray-300 rounded-md p-2 bg-gray-50 border" onChange={(e) => handleFlowDetailChange(index, 'education', e.target.value)}>
                            <option value="">Select Education</option>
                            {educations.map(education => (
                                <option key={education.id} value={education.id}>{education.name}</option>
                            ))}
                        </select>
                        <label htmlFor={`occupation_${index}`} className="block font-medium mb-1 dark:text-white">{t('userMigration.occupation')}</label>
                        <select id={`occupation_${index}`} {...registerDetail(`occupation_${index}`, { required: true })} className="w-full border-gray-300 rounded-md p-2 mb-4 bg-gray-50 border" onChange={(e) => handleFlowDetailChange(index, 'occupation', e.target.value)}>
                            <option value="">Select Occupation</option>
                            {occupations.map(occupation => (
                                <option key={occupation.id} value={occupation.id}>{occupation.name}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="button" onClick={addFlowDetail} className="text-blue-500 underline">{t('userMigration.addPerson')}</button>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white rounded-md px-4 py-2 mb-4">{t('userMigration.submit')}</button>
        </form>
    );
}

export default UserMigrationCreate
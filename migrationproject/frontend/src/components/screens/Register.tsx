import {useState} from "react";
import {useForm} from "react-hook-form";
import {IRegister} from "../../types/auth.interface.ts";
import {AuthService} from "../../services/auth.service.ts";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage.tsx";
import {useTranslation} from "react-i18next";
import {AxiosError} from "axios";

const Register = () => {
    const [navigate, setNavigate] = useState(false)
    const { t } = useTranslation();

    const {register, handleSubmit, formState: {errors}} = useForm<IRegister>({
        mode: 'onChange'
    })

    const onSubmit = async (data: IRegister) => {
        const response = await AuthService.register(data)
        if (response.status === 200) {
            toast.success('Register success!')
            setNavigate(true)
        }
        if (response instanceof AxiosError) {
            if (response.response?.status === 400) {
                toast.error(response.response?.data.email[0])
            }
        }
    }

    if(navigate)
        return <Navigate to="/login" />

    return(
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('signup.create')}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('signup.name')}</label>
                                <input type="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Jhon" {...register("name", {required: "Name is required!"})} />
                                <ErrorMessage error={errors?.name} />
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('signup.email')}</label>
                                <input type="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" {...register("email", {required: "Email is required!"})} />
                                <ErrorMessage error={errors?.email} />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('signup.password')}</label>
                                <input type="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       {...register("password", {required: "Password is required!"})} />
                                <ErrorMessage error={errors?.password} />
                            </div>
                            <button type="submit"
                                    className="m-auto w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t('header.signup')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register

import {useState} from "react";
import {useForm} from "react-hook-form";
import {ILogin} from "../../types/auth.interface.ts";
import {AuthService} from "../../services/auth.service.ts";
import {toast} from "react-toastify";
import {Link, Navigate} from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

const Login = () => {

    const [navigate, setNavigate] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>({
        mode: 'onChange'
    })

    const { setUser} = useAuth()

    const onSubmit = async (data: ILogin) => {
        const {token} = await AuthService.login(data)
        setUser(AuthService.isAuthenticated().tokenData)
        localStorage.setItem('token', token)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        toast.success('Login success!')
        setNavigate(true)
    }

    if(navigate)
        return <Navigate to="/" />

    return(
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input type="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" {...register("email", {required: "Email is required!"})} />
                                <ErrorMessage error={errors?.email} />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       {...register("password", {required: "Password is required!"})} />
                                <ErrorMessage error={errors?.password} />
                            </div>
                            <button type="submit"
                                    className="m-auto w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to={"/register"}
                                                                 className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
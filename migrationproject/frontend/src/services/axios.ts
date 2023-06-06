import axios from "axios";
import {toast} from "react-toastify";
import {AuthService} from "./auth.service.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

let refresh = false;

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        req.headers.Authorization = null
    }

    return req;
})

axiosInstance.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 403 && !refresh) {
        toast.error(error.response.data.detail)
        refresh = true

        const response = await AuthService.refresh()

        if (response.status === 200) {
            localStorage.setItem('token', response.data['token'])
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`

            return axiosInstance(error.config)
        }
    }
    refresh = false;
    return error;
})

export default axiosInstance

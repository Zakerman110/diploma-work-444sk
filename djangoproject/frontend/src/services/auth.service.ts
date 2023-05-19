import axios from './axios.ts'
import {ILogin, IRegister} from "../types/auth.interface.ts";
import jwt_decode from "jwt-decode";
import {User} from "../types/user.inteface.ts";

interface UserData {
    isAuth: boolean,
    tokenData: User | null
}

export const AuthService = {

    async register(credentials: IRegister) {
        await axios.post('/api/auth/register/', credentials)
    },

    async login(credentials: ILogin) {
        const response = await axios.post('/api/auth/login/', credentials, {withCredentials:true})
        localStorage.setItem('token', response.data['token'])
        return response.data
    },

    async refresh() {
        const url = `${import.meta.env.VITE_API_URL}/api/auth/refresh/`
        return await axios.post(url, {}, {withCredentials: true})
    },

    async logout() {
        localStorage.removeItem('token')
        const url = `${import.meta.env.VITE_API_URL}/api/auth/logout/`
        return await axios.post(url, {}, {withCredentials: true})
    },

    isAuthenticated(): UserData {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        if (token) {
            // Decode the token to get the expiration date
            const decodedToken = jwt_decode(token) as User
            if (decodedToken) {
                const expirationTime = decodedToken.exp;

                // Check if the token is expired
                const currentTime = Date.now() / 1000; // Convert to seconds
                return {isAuth: currentTime < expirationTime, tokenData: decodedToken};
            }
        }

        return {isAuth: false, tokenData: null}; // No token found
    }
}
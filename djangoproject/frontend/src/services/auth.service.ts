import axios from './axios.ts'
import {ILogin, IRegister} from "../types/auth.interface.ts";
import jwt_decode from "jwt-decode";

interface TokenData {
    id: number;
    name: string;
    email: string;
    exp: number;
}

interface UserData {
    isAuth: boolean,
    tokenData: TokenData
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
            const decodedToken = jwt_decode(token) as TokenData
            const expirationTime = decodedToken.exp;

            // Check if the token is expired
            const currentTime = Date.now() / 1000; // Convert to seconds
            return {isAuth: currentTime < expirationTime, tokenData: decodedToken};
        }

        return {isAuth: false, tokenData: {id: 0, name: '', email: '', exp: 0}}; // No token found
    }
}
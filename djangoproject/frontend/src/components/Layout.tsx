import {ReactElement, useEffect} from "react";
import Header from "./ui/Header.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {AuthService} from "../services/auth.service.ts";

const Layout = ({children}:{children: ReactElement}) => {

    const {setUser} = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            const {tokenData} = await AuthService.isAuthenticated()
            setUser(tokenData)
        }
        fetchData()
    }, [])

    return(
        <>
            <Header />
            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</main>
        </>
    )
}

export default Layout
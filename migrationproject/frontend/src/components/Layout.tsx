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
            <div className="flex flex-col h-screen">
                <Header />
                <div className="h-full flex flex-col dark:bg-gray-900 scroll-container">
                    <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-full w-full">{children}</main>
                </div>
            </div>
        </>
    )
}

export default Layout
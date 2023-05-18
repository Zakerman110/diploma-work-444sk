import {ReactElement} from "react";
import Header from "./ui/Header.tsx";

const Layout = ({children}:{children: ReactElement}) => {
    return(
        <>
            <Header />
            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</main>
        </>
    )
}

export default Layout
import {Route, Routes} from "react-router-dom";
import Home from "../components/screens/Home.tsx";
import Login from "../components/screens/Login.tsx";
import InternalMigration from "../components/screens/InternalMigration.tsx";

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/migration/internal' element={<InternalMigration />}/>
        </Routes>
    )
}

export default Router
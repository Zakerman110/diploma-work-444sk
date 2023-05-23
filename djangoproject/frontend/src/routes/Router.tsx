import {Route, Routes} from "react-router-dom";
import Home from "../components/screens/Home.tsx";
import Login from "../components/screens/Login.tsx";
import InternalMigration from "../components/screens/InternalMigration.tsx";
import Register from "../components/screens/Register.tsx";
import ExternalMigration from "../components/screens/ExternalMigration.tsx";

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/migration/internal' element={<InternalMigration />}/>
            <Route path='/migration/external' element={<ExternalMigration />}/>
        </Routes>
    )
}

export default Router
import {Route, Routes} from "react-router-dom";
import Home from "../components/screens/Home.tsx";
import Login from "../components/screens/Login.tsx";
import InternalMigration from "../components/screens/InternalMigration.tsx";
import Register from "../components/screens/Register.tsx";
import ExternalMigration from "../components/screens/ExternalMigration.tsx";
import UserMigration from "../components/screens/UserMigration.tsx";
import UserMigrationCreate from "../components/screens/UserMigrationCreate.tsx";

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/migration/internal' element={<InternalMigration />}/>
            <Route path='/migration/external' element={<ExternalMigration />}/>
            <Route path='/migration/user' element={<UserMigration />}/>
            <Route path='/migration/user/create' element={<UserMigrationCreate />}/>
        </Routes>
    )
}

export default Router
import {Route, Routes} from "react-router-dom";
import Home from "../components/screens/Home.tsx";
import Login from "../components/screens/Login.tsx";

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
        </Routes>
    )
}

export default Router
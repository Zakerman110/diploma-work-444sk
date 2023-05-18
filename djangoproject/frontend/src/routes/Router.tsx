import {Route, Routes} from "react-router-dom";
import Home from "../components/screens/Home.tsx";

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
        </Routes>
    )
}

export default Router
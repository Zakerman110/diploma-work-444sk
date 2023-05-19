import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider.tsx";

export const useAuth = () => useContext(AuthContext)
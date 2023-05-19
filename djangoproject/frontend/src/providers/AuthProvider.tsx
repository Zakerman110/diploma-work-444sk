import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState} from "react";
import {User} from "../types/user.inteface.ts";

type TypeContext = {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export const AuthContext = createContext<TypeContext>({
    user: null,
    setUser: () => {}
})

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
    const [user, setUser] = useState<User>(null)

    return(
        <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider
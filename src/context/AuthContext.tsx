import { createContext, useState, type Dispatch } from "react";
import type { ChildrenType } from "../@types/children";

const AuthContext = createContext({} as {
    auth:string | null,
    setAuth:Dispatch<React.SetStateAction<string | null>>,
    isAuth:boolean | null,
    setIsAuth:Dispatch<React.SetStateAction<boolean | null>>,
});

const AuthProvider = ({children}:ChildrenType)=>{

    const [auth,setAuth] = useState<string | null>(null);
    const [isAuth,setIsAuth] = useState<boolean | null>(null);

    return (
        <AuthContext.Provider value={
            {
                auth,
                isAuth,
                setAuth,
                setIsAuth,
            }
        }>
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider,
    AuthContext
}
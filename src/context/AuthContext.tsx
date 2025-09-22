import { createContext, useEffect, useState } from "react";
import type { ChildrenType } from "../@types/children";

const AuthContext = createContext({} as {
    auth:string | null,
    isAuth:boolean | null
});

const AuthProvider = ({children}:ChildrenType)=>{

    const [auth,setAuth] = useState<string | null>(null);
    const [isAuth,setIsAuth] = useState<boolean | null>(null);

    useEffect(()=>{

        const local_token = localStorage.getItem("token")

        setIsAuth(!!local_token)

        if(!!local_token){

            setAuth(local_token)

        }

    },[])

    return (
        <AuthContext.Provider value={{auth,isAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider,
    AuthContext
}
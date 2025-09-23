import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import useHandleToken from "./useHandleToken";

const useHandleAuth = ()=>{

    const {onGetToken} = useHandleToken();
    const currentAuthContext = useContext(AuthContext)
    const [isChecking,setIsChecking] = useState<boolean | null>(null);

    const onCheckLocalToken = ()=>{
        setIsChecking(true)
        const local_token = onGetToken();
        if(!!local_token){
            currentAuthContext.setAuth(local_token)
        }
        setIsChecking(false)
    }

    return {
        currentAuthContext,
        onCheckLocalToken,
        isChecking
    }

}

export default useHandleAuth
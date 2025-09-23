import { useEffect, useState } from "react"

const useHandleToken = ()=>{

    const [token,setToken] = useState<string | null>(null);

    const onSetToken = (token:string)=>{
        
        try{
            localStorage.setItem("token",token)
        }
        catch(error){
            console.log(error)
            return false
        }
        finally{
            return true
        }

    }

    const onGetToken = ()=>{

        const local_token = localStorage.getItem("token")
        return local_token

    }

    useEffect(()=>{
        setToken(onGetToken())
    },[])

    return {
        token,
        onGetToken,
        onSetToken
    }

}

export default useHandleToken
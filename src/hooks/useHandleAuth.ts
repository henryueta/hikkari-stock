import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const useHandleAuth = ()=>{

    const currentAuthContext = useContext(AuthContext)

    return {
        currentAuthContext
    }

}

export default useHandleAuth
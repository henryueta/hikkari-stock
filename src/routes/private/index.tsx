import { Navigate } from "react-router-dom";
import useHandleAuth from "../../hooks/useHandleAuth"
import type { ChildrenType } from "../../@types/children";
import { useEffect } from "react";

const Private = ({children}:ChildrenType) => {

    const {currentAuthContext,onCheckLocalToken,isChecking} = useHandleAuth();

    useEffect(()=>{

      onCheckLocalToken();

    },[]);
    
  return (
            (isChecking !== null)
            ?
            (!currentAuthContext.auth
            ?
            <Navigate to={"/auth"}/>
            :
            children)
            :
            <h1>loading . . .</h1>
        )
}

export default Private

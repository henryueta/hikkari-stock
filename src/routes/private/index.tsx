import { Navigate } from "react-router-dom";
import useHandleAuth from "../../hooks/useHandleAuth"
import type { ChildrenType } from "../../@types/children";

const Private = ({children}:ChildrenType) => {

    const {currentAuthContext} = useHandleAuth();

  return (
            currentAuthContext.isAuth !== null
            &&
            !currentAuthContext.isAuth
            ?
            <Navigate to={"/auth"}/>
            :
            children
        )
}

export default Private

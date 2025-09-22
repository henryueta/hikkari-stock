import type { ChildrenType } from "../@types/children"
import { AuthProvider } from "./AuthContext"

const AppProvider = ({children}:ChildrenType)=>{

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )

}

export default AppProvider;
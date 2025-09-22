import { useEffect } from "react";
import api_endpoints from "../config/api";
import useHandleAxios from "../hooks/useHandleAxios";
import useHandleNavigate from "../hooks/useHandleNavigate";
import auth_model from "../models/auth"
import Form from "./Form"

const Auth = () => {

  const {onRequest,onCreateCancelToken} = useHandleAxios();
  const {onNavigate} = useHandleNavigate()

  return (
    <div className="authContainer">
        <Form
        model={auth_model}
        submit={{
          title:"Entrar",
          onAction(data) {
            onRequest({
              url:api_endpoints.auth.get,
              method:"post",
              data:data,
              cancelToken:onCreateCancelToken()
            },{
              onThen(result) {
                console.log(result)
                localStorage.setItem("token",result.data.token)
                const local_token = localStorage.getItem("token");

                if(local_token){
                  onNavigate("/")
                }
              },
              onCatch(error) {
                console.log(error)
              },
            })
          },
        }}
        />
    </div>
  )
}

export default Auth

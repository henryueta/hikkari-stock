import { useEffect, useState } from "react";
import api_endpoints from "../../config/api";
import useHandleAxios from "../../hooks/useHandleAxios";
import useHandleNavigate from "../../hooks/useHandleNavigate";
import auth_model from "../../models/auth"
import Form from "../form/Form"
import useHandleToken from "../../hooks/useHandleToken";

const Auth = () => {

  const {onRequest,onCreateCancelToken} = useHandleAxios();
  const {onNavigate} = useHandleNavigate()
  const {onGetToken,onSetToken} = useHandleToken();
  const [isAuth,setIsAuth] = useState<boolean | null>(null);

  useEffect(()=>{
    setIsAuth(!!onGetToken())
  },[])

  useEffect(()=>{

    if(!!isAuth){
      onNavigate("/")
    }

  },[isAuth])

  return (
    isAuth !== null
    &&
    !isAuth
    &&
    <div className="authContainer">
      <Form
        model={auth_model}
        submit={{
          title:"Entrar",
          onAction(data) {
            onRequest({
              url:api_endpoints.auth.post,
              method:"post",
              data:data,
              cancelToken:onCreateCancelToken()
            },{
              onThen(result) {
                console.log(result)
                const insert_token = onSetToken(result.data.token)
                setIsAuth(insert_token)
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

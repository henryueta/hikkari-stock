import auth_model from "../models/auth"
import Form from "./Form"

const Auth = () => {
  return (
    <div className="authContainer">
        <Form
        model={auth_model}
        />
    </div>
  )
}

export default Auth

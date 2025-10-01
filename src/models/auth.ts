import z from "zod";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";
import { default_string_validation } from "../validation/default";

const auth_schema = z.object({
    username:z.string().refine((val)=>
        default_string_validation(val),
        "Campo username inválido"
    ),
    password:z.string().refine((val)=>
        default_string_validation(val),
        "Campo senha inválido"
    )
});

const auth_form:FormType = [
    {
        id:"username_id",
        registerId:"username",
        tag:"input",
        title:"Login",
        type:"text"
    },
    {
        id:"password_id",
        registerId:"password",
        tag:"input",
        title:"Senha",
        type:"password"
    }
];

const auth_model = new Model(auth_schema,auth_form)


export default auth_model
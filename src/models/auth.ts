import z from "zod";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";

const auth_schema = z.object({
    username:z.string().refine((val)=>val.trim().length > 0,{
        message:"Error"
    }),
    password:z.string().refine((val)=>val.trim().length > 0,{
        message:"Error"
    })
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
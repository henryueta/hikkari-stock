import z from "zod";
import type { SchemaType } from "../@types/schema";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";
import { default_number_validation, default_string_validation } from "../validation/default";

const size_schema:SchemaType = z.object({
    name:z.string().refine((val)=>
        default_string_validation(val),
        "Campo nome inválido"
    ),
    quantity:z.number().refine((val)=>
        default_number_validation(val),
        "Campo quantidade inválido"
    )
})

const size_form:FormType = [
    {
        id:"name_id",
        registerId:"name",
        tag:"input",
        title:"Nome",
        type:"text"
    },
    {
        id:"quantity_id",
        registerId:"quantity",
        tag:"input",
        title:"Quantidade",
        type:"number"
    }
]


const size_model = new Model(size_schema,size_form);

export {
    size_model,
    size_schema,
    size_form
}


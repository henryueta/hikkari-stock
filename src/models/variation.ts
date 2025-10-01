import z from "zod";
import type { SchemaType } from "../@types/schema";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";
import { size_form, size_schema } from "./size";
import { default_array_validation, default_string_validation } from "../validation/default";

const variation_schema:SchemaType = z.object({
    name:z.string().refine((val)=>
        default_string_validation(val),
        "Campo nome inválido"
    ),
    size:z.array(size_schema).refine((val)=>
        default_array_validation(val),
        "Campo tamanhos inválido"
    )
})

const variation_form:FormType = [
    {
        id:"name_id",
        registerId:"name",
        tag:"input",
        title:"Nome",
        type:"text"
    },
    {
        id:"size_id",
        registerId:"size",
        tag:"form",
        title:"Tamanhos",
        type:"text",
        modelBody:{
            form:size_form,
            schema:size_schema
        }
    }
]

const variation_model = new Model(variation_schema,variation_form);

export {
    variation_model,
    variation_schema,
    variation_form
}


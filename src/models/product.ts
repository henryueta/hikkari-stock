import z from "zod";
import type { SchemaType } from "../@types/schema";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";
import { variation_form, variation_schema } from "./variation";
import { default_array_validation, default_string_validation } from "../validation/default";

const product_schema:SchemaType = z.object({
    description:z.string().refine((val)=>
        default_string_validation(val),
        "Campo descrição inválido"
    ),
    cod:z.string().refine((val)=>
        default_string_validation(val),
        "Campo código inválido"
    ),
    variations:z.array(variation_schema).refine((val)=>
        default_array_validation(val),
        "Campo variações inválido"
    )
})


const product_form:FormType = [
    {
        id:"description_id",
        registerId:"description",
        tag:"input",
        type:"text",
        title:"Descrição"
    },
    {
        id:"cod_id",
        registerId:"cod",
        tag:"input",
        title:"Código",
        type:"text"
    },
    {
        id:"variations_id",
        registerId:"variations",
        tag:"dialog",
        title:"Variações",
        type:"text",
        modelBody:{
            form:variation_form,
            schema:variation_schema
        }
    }
]

const product_model = new Model(product_schema,product_form);

export {
    product_model,
    product_schema,
    product_form
}

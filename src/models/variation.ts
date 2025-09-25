import z from "zod";
import type { SchemaType } from "../@types/schema";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";
import { size_schema } from "./size";

const variation_schema:SchemaType = z.object({
    name:z.string(),
    size:z.array(size_schema)
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
        tag:"select",
        title:"Tamanhos",
        type:"text"
    }
]

const variation_model = new Model(variation_schema,variation_form);

export {
    variation_model,
    variation_schema,
    variation_form
}


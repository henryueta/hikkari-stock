import z from "zod";
import type { SchemaType } from "../@types/schema";
import type { FormType } from "../@types/form";
import Model from "../classes/Model";

const size_schema:SchemaType = z.object({
    name:z.string(),
    
})

const size_form:FormType = [
    {
        id:"name_id",
        registerId:"name",
        tag:"input",
        title:"Nome",
        type:"text"
    }
]


const size_model = new Model(size_schema,size_form);

export {
    size_model,
    size_schema,
    size_form
}


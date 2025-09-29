import z from "zod"
import type { FormType } from "../@types/form"
import type { SchemaType } from "../@types/schema"
import Model from "../classes/Model"
import { sale_variation_model, sale_variation_schema } from "./sale-variation"
import api_endpoints from "../config/api"

const sale_product_schema:SchemaType = z.object({
    
    product_id:z.string(),
    variations_id:z.array(sale_variation_schema)
})

const sale_product_form:FormType = [
    {
        id:"product_id",
        registerId:"product_id",
        tag:"select",
        title:"Produto",
        type:"text",
        changeWatch:{
            changeControl:true,
            onChange(value) {
                return api_endpoints.sale_variation.get+value
            },
            changeFields:[
                {
                    registerId:'variations_id',
                    typeOfField:'object'
                }
            ]
        },
        defaultViewValue:"Produto"
    },
    {
        id:"variations_id",
        registerId:"variations_id",
        tag:"form",
        title:"Variações",
        type:"text",
        modelBody:sale_variation_model
    }
]

const sale_product_model = new Model(sale_product_schema,sale_product_form);

export {
    sale_product_form,
    sale_product_schema,
    sale_product_model
}
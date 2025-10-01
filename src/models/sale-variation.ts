import z from "zod";
import type { FormType } from "../@types/form";
import Model from "../classes/Model"
import type { SchemaType } from "../@types/schema";
import api_endpoints from "../config/api";

const sale_variation_schema:SchemaType = z.object({

    variation_id:z.string(),
    size_id:z.string(),
    quantity:z.string()

}) 

const sale_variation_form:FormType = [
    {
        id:"variation_id",
        registerId:"variation_id",
        tag:"select",
        title:"Variação",
        type:"text",
        changeWatch:{
            changeControl:true,
            onChange(value) {
                return api_endpoints.sale_variation_size.get+value
            },
            changeFields:[
                {
                    registerId:"size_id",
                    typeOfField:"string"
                },
                {
                    registerId:"quantity",
                    typeOfField:"string"
                }
            ]
        }
    },
    {
        id:"size_id",
        registerId:"size_id",
        tag:"select",
        title:"Tamanho",
        type:"text",
        changeWatch:{
            changeControl:true,
            onChange(value) {
                return api_endpoints.sale_size_quantity.get+value
            },
            changeFields:[
                {
                    registerId:"quantity",
                    typeOfField:"string"
                }
            ],
            noChangeFields:[
                "variation_id"
            ]
        }
    },
    {
        id:"quantity_id",
        registerId:"quantity",
        tag:"input",
        title:"Quantidade",
        type:"text"
    }
]

const sale_variation_model = new Model(sale_variation_schema,sale_variation_form);

export {
    sale_variation_form,
    sale_variation_schema,
    sale_variation_model
}
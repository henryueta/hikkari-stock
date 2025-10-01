import z from "zod";
import type { FormType } from "../@types/form";
import Model from "../classes/Model"
import type { SchemaType } from "../@types/schema";
import api_endpoints from "../config/api";
import { default_number_validation, default_string_validation } from "../validation/default";

const sale_variation_schema:SchemaType = z.object({

    variation_id:z.string().refine((val)=>
        default_string_validation(val),
        "Campo variação inválido"
    ),
    size_id:z.string().refine((val)=>
        default_string_validation(val),
        "Campo tamanho inválido"
    ),
    quantity:z.number().refine((val)=>
        default_number_validation(val),
        "Campo quantidade inválido"
    )

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
                    typeOfField:"number"
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
        type:"number"
    }
]

const sale_variation_model = new Model(sale_variation_schema,sale_variation_form);

export {
    sale_variation_form,
    sale_variation_schema,
    sale_variation_model
}
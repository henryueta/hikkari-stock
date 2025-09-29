import z from "zod";
import type { SchemaType } from "../@types/schema";
import type { FormType } from "../@types/form";
import { sale_product_model, sale_product_schema } from "./sale-product";
import Model from "../classes/Model";
import api_endpoints from "../config/api";


const sale_schema:SchemaType = z.object({
    client_name: z.string(),
    products_id:z.array(sale_product_schema),
})

const sale_form:FormType = [
    {
        id:"client_name_id",
        registerId:"client_name",
        tag:"input",
        title:"Nome do cliente",
        type:"text"
    },
    {
        id:"products_id",
        registerId:"products_id",
        tag:"dialog",
        title:"Produtos",
        type:"text",
        modelBody:sale_product_model,
        queryOptionsUrl:api_endpoints.sale_product.get
    }
]

const sale_model = new Model(sale_schema,sale_form);

export {
    sale_schema,
    sale_form,
    sale_model
}
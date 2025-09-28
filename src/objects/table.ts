import type { TableDataListType } from "../@types/table"
import api_endpoints from "../config/api"
import {product_model} from "../models/product"
import { sale_model } from "../models/sale"
import { variation_model } from "../models/variation"

const table_form_config = [
    {
        name:'variation',
        queryOptionsUrl:null
    },
    {
        name:'product',
        queryOptionsUrl:null
    },
    {
        name:'sale',
        queryOptionsUrl:api_endpoints.sale_product.get
    }
]

const table_data_list:TableDataListType = [
    {
        name:"variation",
        model:variation_model,
    },
    {   
        name:'product',
        model:product_model,
    },
    {
        name:'sale',
        model:sale_model,
    },
]

const table_form_type_list = [
    {
        type:'create',
        title:"Cadatrar"
    },
    {
        type:'edit',
        title:"Editar"
    }
]

const button_table_management_list = [
        {
            title:'Deletar',
            action_type:'delete'
        },
        {
            title:"Cadastrar",
            action_type:'create'
        }
    ]

    export {
        button_table_management_list,
        table_form_type_list,
        table_data_list,
        table_form_config
    }
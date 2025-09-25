import type { TableDataListType } from "../@types/table"
import {product_model} from "../models/product"
import { variation_model } from "../models/variation"

const table_data_list:TableDataListType = [
    {
        name:"variation",
        model:variation_model
    },
    {   
        name:'product',
        model:product_model
    },
    {
        name:'sale',
        model:product_model
    }
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
        table_data_list
    }
import type { UseFormRegister } from "react-hook-form";
import type { SchemaType } from "./schema";

type FormItemFieldType = 'text'|'password'|'email'

type FormItemTagType = 'input'|'textarea'|'select'|'form'|'dialog'

type FormItemType = 
Record<'title'|'id'|'registerId',string>
&
Record<'tag',FormItemTagType>
&
Record<'type',FormItemFieldType>
&
{
    modelBody?:{
        form:FormType,
        schema:SchemaType
    }
}

type FormType = FormItemType[];

interface FormFieldItemType {
    properties:FormItemType,
    register:UseFormRegister<Record<string, unknown>>
     warn:string | null,
     index?:number,
     identifier?:string
}

type FormFieldListType = FormFieldItemType[];

export type {
    FormItemFieldType,
    FormItemTagType,
    FormItemType,
    FormType,
    FormFieldItemType,
    FormFieldListType
}

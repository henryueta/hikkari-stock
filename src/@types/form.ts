import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { SchemaType } from "./schema";
import type { TypeofOutput } from "./output";
import type { SelectOptionType } from "./select";

type FormFieldType = 'number' | 'option' | 'text'

type FormItemFieldType = 'text'|'password'|'email'|'number'

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
&
{
    changeWatch?:{
        changeControl:boolean
        onChange?:(value:string)=>string,
        changeFields?:{
            registerId:string,
            typeOfField:TypeofOutput
        }[],
        noChangeFields?:string[]
    }
}
&  
{
    options?:SelectOptionType
}   
&
{
    queryOptionsUrl?:string
}
&
{
    defaultViewValue?:string
}

type FormType = FormItemType[];

type DefaultFormValuesType = Readonly<{[x: string]: unknown;}> | undefined;

type UseFormRegisterType= UseFormRegister<Record<string, unknown>>;

type FormMethodType = 'put' | 'post';

type FormChangeFieldsType = {
    onInput?:(value:string)=>void,
    onSelect?:(value:string)=>void
}

interface FormFieldItemType {
    properties:FormItemType,
    register:UseFormRegisterType
    warn:FieldErrors<Record<string, unknown>>| null,
    onSetValue?:(value:string)=>void,
    options?:SelectOptionType | undefined,
    max?:number
}

type FormFieldListType = FormFieldItemType[];

type FormSelectType = {
    registerId:string,
    options:SelectOptionType
}

type FormFieldNumberType = {
    registerId:string,
    max:number,
}

type FormSelectOptionType = FormSelectType[]

type FormFieldNumberListType = FormFieldNumberType[]

export type {
    FormItemFieldType,
    FormItemTagType,
    FormItemType,
    FormType,
    FormFieldItemType,
    FormFieldListType,
    DefaultFormValuesType,
    FormMethodType,
    UseFormRegisterType,
    FormChangeFieldsType,
    FormSelectType,
    FormSelectOptionType,
    FormFieldType,
    FormFieldNumberType,
    FormFieldNumberListType
}

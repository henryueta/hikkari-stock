import type { UseFormRegister } from "react-hook-form";
import type { SchemaType } from "./schema";
import type { TypeofOutput } from "./output";

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
&
{
    changeWatch?:{
        onChange:(value:string)=>string,
        changeFields:{
            registerId:string,
            typeOfField:TypeofOutput
        }[]
    }
}

type FormType = FormItemType[];

type DefaultFormValuesType = Readonly<{[x: string]: unknown;}> | undefined;

type UseFormRegisterType= UseFormRegister<Record<string, unknown>>;

type FormMethodType = 'put' | 'post';

interface FormFieldItemType {
    properties:FormItemType,
    register:UseFormRegisterType
    warn:string | null,
    onSetValue?:(value:string)=>void
}

type FormFieldListType = FormFieldItemType[];

export type {
    FormItemFieldType,
    FormItemTagType,
    FormItemType,
    FormType,
    FormFieldItemType,
    FormFieldListType,
    DefaultFormValuesType,
    FormMethodType,
    UseFormRegisterType
}

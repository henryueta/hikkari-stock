import type { UseFormRegister } from "react-hook-form";

type FormItemFieldType = 'text'|'password'|'email'

type FormItemTagType = 'input'|'textarea'|'select'

type FormItemType = 
Record<'title'|'id'|'registerId',string>
&
Record<'tag',FormItemTagType>
&
Record<'type',FormItemFieldType>
&
{
    options?:Record<'label'|'value',string>
}

type FormType = FormItemType[];

interface FormFieldItemType {
    properties:FormItemType,
    register:UseFormRegister<Record<string, unknown>>
     warn:string | null
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

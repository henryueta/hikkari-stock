
type FormItemFieldType = 'text'|'password'|'email'

type FormItemTagType = 'input'|'textarea'

type FormItemType = 
Record<'title'|'id'|'registerId',string>
&
Record<'tag',FormItemTagType>
&
Record<'type',FormItemFieldType>

type FormType = FormItemType[];

export type {
    FormItemFieldType,
    FormItemTagType,
    FormItemType,
    FormType
}

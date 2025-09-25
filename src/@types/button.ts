
type ButtonActionType = 'button'| 'submit'

interface ButtonItemType {
    title?:string,
    type?:ButtonActionType,
    onClick?:()=>void
}

type ButtonListType = ButtonItemType[]

export type {
    ButtonItemType,
    ButtonListType
}
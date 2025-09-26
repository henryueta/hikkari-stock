import type { DefaultFunctionType } from "./function"

type ButtonActionType = 'button'| 'submit'

interface ButtonItemType {
    title?:string,
    type?:ButtonActionType,
    onClick?:DefaultFunctionType
}

type ButtonListType = ButtonItemType[]

export type {
    ButtonItemType,
    ButtonListType
}
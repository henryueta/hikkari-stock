import type { DefaultFunctionType } from "./function"

interface QueryTreatmentType {
    onThen?:(result:any)=>void,
    onCatch?:(error:unknown)=>void,
    onFinally?:DefaultFunctionType
}

export type {
    QueryTreatmentType
}
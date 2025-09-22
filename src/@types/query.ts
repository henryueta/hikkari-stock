
interface QueryTreatmentType {
    onThen?:(result:any)=>void,
    onCatch?:(error:unknown)=>void,
    onFinally?:()=>void
}

export type {
    QueryTreatmentType
}
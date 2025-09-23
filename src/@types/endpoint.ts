
interface EndpointTypeItemType {
    type:string,
    endpoint:{
        get:string
    }
}

type EndpointTypeListType = EndpointTypeItemType[]

export type {
    EndpointTypeItemType,
    EndpointTypeListType
}
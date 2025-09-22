
interface AxiosStateType {
    hasError:boolean | null,
    hasSuccess:boolean | null,
    isLoading:boolean | null    
}

type AxiosStateActionType = 
{
    type:'error',
    value:boolean | null
}
|
{
    type:'success',
    value:boolean | null
}
|
{
    type:'loading',
    value:boolean | null
}

export type {
    AxiosStateType,
    AxiosStateActionType
}

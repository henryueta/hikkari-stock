import axios, { type AxiosRequestConfig } from "axios"
import type { QueryTreatmentType } from "../@types/query"
import { useReducer } from "react"
import type { AxiosStateActionType, AxiosStateType } from "../@types/axios"


const initialAxiosState:AxiosStateType = {
    hasError:null,
    hasSuccess:null,
    isLoading:null
}

const onHandleAxiosState = (state:AxiosStateType,action:AxiosStateActionType)=>{

    switch (action.type) {
        case 'error':
            return {...state,hasError:action.value}
        case 'success':
            return {...state,hasSuccess:action.value}
        case 'loading':
            return {...state,isLoading:action.value}
        default:
            return {...state}
    }

}

const useHandleAxios = ()=>{

    const [queryState,setQueryState] = useReducer(onHandleAxiosState,initialAxiosState);

    const onTreatmentProvider = (treatment?:QueryTreatmentType)=>{

        return {
            onThen(result:any){
                !!treatment
                &&
                !!treatment.onThen
                &&
                treatment.onThen(result);


            },
            onCatch(error:unknown){
                !!treatment
                &&
                !!treatment.onCatch
                &&
                treatment.onCatch(error)
            },
            onFinally(){
                !!treatment
                &&
                !!treatment.onFinally
                &&
                treatment.onFinally()
            }
        }

    }

    const onCreateCancelToken = ()=>{
        const source = axios.CancelToken.source();
        return source.token
    }

    const onRequest = async (config:AxiosRequestConfig,treatment?:QueryTreatmentType)=>{

        const treatment_provider = (
            !!treatment
            ? onTreatmentProvider(treatment)
            : null
        )

        setQueryState({
            type:'loading',
            value:true
        })

        return await axios
        .request(config)
        .then((result)=>{
            if(!!treatment_provider){
                treatment_provider.onThen(result.data)
            }
            setQueryState({
                type:"success",
                value:true
            })
        })
        .catch((error)=>{
            if(!!treatment_provider){
                treatment_provider.onCatch(error)
            }
            setQueryState({
                type:'error',
                value:true
            })
        })
        .finally(()=>{
            if(!!treatment_provider){
                treatment_provider.onFinally()
            }
            setQueryState({
                type:"loading",
                value:false
            })
        })

        
    }

    

    return {
        onRequest,
        onTreatmentProvider,
        onCreateCancelToken
    }

}

export default useHandleAxios
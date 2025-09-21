import axios, { type AxiosRequestConfig } from "axios"

const useAxios = ()=>{


    const onRequest = (config:AxiosRequestConfig)=>{

        axios.request(config)

    }

    

    return {
        onRequest
    }

}

export default useAxios
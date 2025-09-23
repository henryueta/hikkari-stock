import { useState } from "react";
import type { DataType } from "../@types/data";
import type { QueryTreatmentType } from "../@types/query";
import { endpoint_type_list } from "../objects/endpoint"
import useHandleAxios from "./useHandleAxios"
import type { TableBodyType } from "../@types/table";

const useHandleTable = ()=>{

    const {onRequest,onCreateCancelToken,onTreatmentProvider} = useHandleAxios();

    const [tableBody,setTableBody] = useState<TableBodyType>({
        header:[],
        data:[]
    });

    const onGetTableData = (type:DataType)=>{

        const endpoint_type_index = endpoint_type_list.findIndex((endpoint_item)=>{
            return endpoint_item.type === type
        })
        const endpoint = endpoint_type_list[endpoint_type_index].endpoint.get

        onRequest({
            url:endpoint,
            method:"get",
            cancelToken:onCreateCancelToken()
        },{
            onThen(result) {
                console.log(result.data.data)
                setTableBody({
                    header:result.data.header,
                    data:result.data.data
                })
            },
            onCatch(error) {
                console.log(error)
            },
        })

    }

    return {
        onGetTableData,
        tableBody
    }

}

export default useHandleTable
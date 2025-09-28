import { useParams } from "react-router-dom"
import Form from "../../components/form";
import { table_data_list } from "../../objects/table";
import { useState } from "react";
import type { ModelType } from "../../@types/model";
import api_endpoints from "../../config/api";
import type { TableDataType } from "../../@types/table";
import useHandleAxios from "../../hooks/useHandleAxios";
import useHandleToken from "../../hooks/useHandleToken";

const TableFormPage = () => {

    const {table,type} = useParams();
    const [tableModel] = useState<ModelType | undefined>(
        table_data_list.find((table_data_item)=>
                table_data_item.name === table
    )?.model);
    const {onRequest,onCreateCancelToken} = useHandleAxios();
    const {onGetToken} = useHandleToken();
  return (
    <section className="tableFormPage">
        {
        !!(table && type)
        &&
        !!(tableModel && !!(type === 'post' || type === 'put'))
        ?    
        <Form
        method={type}
        model={
            tableModel
        }
        submit={{
            title:"Cadatrar",
            onAction(data) {
              const table_type = (['auth','product','sale'] as Exclude<TableDataType,'variation'>[]).find((table_type_item)=>
                table_type_item === table
              );
              if(!!table_type){
                 onRequest({
                  url:api_endpoints[table_type].post,
                  method:type,
                  data:{
                    data:data,
                    token:onGetToken()
                  },
                  cancelToken:onCreateCancelToken()
                },{
                  onThen(result) {
                    console.log("RESULT",result)
                  },
                  onCatch(error){
                    console.log(error)
                  }
                })
              }
               
            },
        }}
        />
        :
        <p>Endereço inválido</p>
      }
    </section>
  )
}

export default TableFormPage

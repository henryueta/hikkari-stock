import { useParams } from "react-router-dom"
import Form from "../../components/form";
import { table_data_list, table_form_config } from "../../objects/table";
import { useEffect, useState } from "react";
import type { ModelType } from "../../@types/model";
import api_endpoints from "../../config/api";
import type { TableDataType } from "../../@types/table";
import useHandleAxios from "../../hooks/useHandleAxios";
import useHandleToken from "../../hooks/useHandleToken";
import type { SelectOptionType } from "../../@types/select";
import { type FormFieldNumberListType, type FormFieldType, type FormSelectOptionType } from "../../@types/form";

const TableFormPage = () => {

    const {table,type} = useParams();
    const [tableModel] = useState<ModelType | undefined>(
        table_data_list.find((table_data_item)=>
                table_data_item.name === table
    )?.model);
    const [tableQueryOptionsUrl,setTableQueryOptionsUrl] = useState<string | null | undefined>(
      table_form_config.find((table_config_item)=>
        table_config_item.name === table
      )?.queryOptionsUrl
    );
    const [tableFieldOptions,setTableFieldOptions] = useState<FormSelectOptionType| null>(null);
    const [tableFieldNumbers,setTableFieldNumbers] = useState<FormFieldNumberListType | null>(null);

    const {onRequest,onCreateCancelToken} = useHandleAxios();
    const {onGetToken} = useHandleToken();
    useEffect(()=>{
      if(tableQueryOptionsUrl !== null){
        onRequest({
          url:tableQueryOptionsUrl,
          params:{
            token:onGetToken()
          },
          method:"get",
          cancelToken:onCreateCancelToken(),
        },{
          onThen(result) {
            const curret_result = result.data as {
            field_type:FormFieldType,
            name:string,
            value:SelectOptionType | number | any
          }[]

            if(curret_result.find((result_item)=>result_item.field_type === 'number')){

              setTableFieldNumbers(curret_result.map((result_item)=>{
                return {
                  max:result_item.value
                }
              }))

            }

            if(curret_result.find((result_item)=>result_item.field_type === 'option')){
              setTableFieldOptions(
                ((prev)=>{

                  const current_form_option = curret_result
                  .filter((option_item)=>typeof option_item !== 'number')
                  .map((option_item)=>{
                    return {
                      registerId:option_item.name,
                      options:option_item.value
                    }
                  })

                  if(!!prev){
                    let formated_prev_list = prev;

                    const prev_register_list = new Set(
                      prev.map((option_item)=>option_item.registerId)
                    );
                    const form_option_register_list = new Set(
                      current_form_option.map((option_item)=>option_item.registerId)
                    );

                    for(let registerId of prev_register_list){
                      if(form_option_register_list.has(registerId)){
                        
                        formated_prev_list = formated_prev_list.filter((prev_item)=>
                          prev_item.registerId !== registerId
                        )

                      }
                    }

                    return [...formated_prev_list,...current_form_option]
                  }
                  return current_form_option

                })
              )
            }
          },
          onCatch(error) {
            console.log(error)
          },
        })

      }

    },[tableQueryOptionsUrl])




  return (
    <section className="tableFormPage">
        {
        !!(table && type)
        &&
        !!(tableModel && !!(type === 'post' || type === 'put'))
        &&
        !!(tableQueryOptionsUrl !== undefined && tableFieldOptions !== null
          ||
          tableQueryOptionsUrl === null
        )
        ?    
        <Form
        defaultOptions={tableFieldOptions}
        changeFields={{
          onSelect(value) {
            setTableQueryOptionsUrl(value)
          },
          onInput(value) {

          },
        }}

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
                  url:api_endpoints[table_type].post+"?token="+onGetToken(),
                  method:type,
                  data:{
                    data:data
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

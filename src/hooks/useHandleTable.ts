import { useState } from "react";
import type { DataType } from "../@types/data";
import { endpoint_type_list } from "../objects/endpoint"
import useHandleAxios from "./useHandleAxios"
import type { TableBodyType } from "../@types/table";
import useHandleToken from "./useHandleToken";
import type { FormFieldNumberListType, FormFieldType, FormSelectOptionType } from "../@types/form";
import type { SelectOptionType } from "../@types/select";
import { table_form_config } from "../objects/table";

const useHandleTable = ()=>{

    const {onRequest,onCreateCancelToken} = useHandleAxios();
    const {onGetToken} = useHandleToken()

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

    const [tableQueryOptionsUrl,setTableQueryOptionsUrl] = useState<string | null | undefined>(null);

    const [tableFieldNumbers,setTableFieldNumbers] = useState<FormFieldNumberListType | null>(null);
    const [tableFieldOptions,setTableFieldOptions] = useState<FormSelectOptionType| null>(null);

    const onGetTableFieldOptions = (table:string | undefined)=>{
        setTableQueryOptionsUrl(table_form_config.find((table_config_item)=>
        table_config_item.name === table
        )?.queryOptionsUrl)
    }

    const onCreateTableForm = ()=>{

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
                value:SelectOptionType | number | any,
                index:string
              }[]
    
                if(curret_result.find((result_item)=>result_item.field_type === 'number')){
    
                  setTableFieldNumbers(curret_result.map((result_item)=>{
                    return {
                      registerId:result_item.name,
                      max:result_item.value,
                      index:Number.parseInt(result_item.index)
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
                          options:option_item.value,
                          index:Number.parseInt(option_item.index)
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

    }

        // useEffect(()=>{

        //     onTableForm();

        // },[tableQueryOptionsUrl])


    return {
        onGetTableData,
        onGetTableFieldOptions,
        onCreateTableForm,
        tableFieldOptions,
        tableFieldNumbers,
        tableQueryOptionsUrl,
        setTableQueryOptionsUrl,
        tableBody
    }

}

export default useHandleTable
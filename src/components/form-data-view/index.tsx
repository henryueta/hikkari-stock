import { Fragment } from "react"
import Button from "../button";
import type { DefaultFunctionType } from "../../@types/function";

const FormDataView = ({body,actions}:{
  body:{
    label:string,
    value:string
  }[],
  actions?:{
    onDelete?:DefaultFunctionType,
    onUpdate?:DefaultFunctionType
  },
}) => {

  return (
    <div className="form-data-view">
        {
          body?.map((data_item,data_index)=>
            <Fragment key={data_index}>
              {
                typeof data_item.value !== 'object'
                &&
                <div className="label-container">
                  {data_item.label}
                </div>
                }
              <div className="value-container">
                {
                  typeof data_item.value === 'object'
                  ?
                  <FormDataView
                  body={data_item.value}
                  />
                  :
                  data_item.value
                }
              </div>
            </Fragment>
          )
        }
        {
          !!actions
          &&
          !!actions.onDelete
          &&
          <Button
          title="Deletar"
          onClick={()=>actions.onDelete && actions.onDelete()}
          />
        }
        {
          !!actions
          &&
          !!actions.onUpdate
          &&
          <Button
          title="Editar"
          onClick={()=>{
             actions.onUpdate && actions.onUpdate()
            // if(!!teste){
            //   setFormatedData(Object.entries(teste).map((data_item)=>
            //     {
            //       return {
            //         label:data_item[0],
            //         value:data_item[1]
            //       }
            //     }
            //   ))
            // }
          }}
          />
        }
    </div>
  )
}

export default FormDataView

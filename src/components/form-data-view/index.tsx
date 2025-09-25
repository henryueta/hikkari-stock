import { Fragment, useEffect, useState } from "react"

const FormDataView = <T extends object,>({data}:{
  data:T
}) => {

  const [formatedData,setFormatedData] = useState<{ label: string; value: any; }[]>();

  useEffect(()=>{

    setFormatedData(Object.entries(data).map((data_item)=>
        {
          return {
            label:data_item[0],
            value:data_item[1]
          }
        }
    ))

  },[])
  console.log(formatedData)
  return (
    <div className="form-data-view">
      
        
        {
          formatedData
          &&
          formatedData?.map((data_item,data_index)=>
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
                  data={data_item.value}

                  />
                  :
                  data_item.value
                }
              </div>
            </Fragment>
          )
        }

    </div>
  )
}

export default FormDataView

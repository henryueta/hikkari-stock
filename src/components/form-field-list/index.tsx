import type { UseFieldArrayReturn } from "react-hook-form"
import FormField from "../form-field"
import type { FormFieldItemType, FormType } from "../../@types/form"
import type { ZodObject } from "zod"

const FormFieldList = (
  {
    id,
    title,
    arrayFields,
    fieldSchema,
    actions,
    formContent,
    fieldForm
  }:{
    title:string,
    id:string,
    arrayFields:Record<"id", string>[],
    formContent:FormFieldItemType,
    fieldSchema:ZodObject,
    fieldForm:FormType
    actions:UseFieldArrayReturn
}) => {
  return (
    <div className="formFieldList">
      
        <label htmlFor={id}>
            <p>
            {/* {title} */}
            </p>
        </label>
        {
            arrayFields.map((field_item,field_index)=>
                {
                    return <div className="fieldListItemContainer" key={field_item.id}>
                    {
                        Object.entries(fieldSchema.shape).map(
                        ([key,_])=>(
                        <FormField
                        index={field_index}
                        register={formContent.register}
                        key={`${formContent.properties.registerId}.${field_index}.${key}`}
                        identifier={formContent.properties.registerId}
                        properties={{   
                          registerId: `${formContent.properties.registerId}.${field_index}.${key}`,
                          title: `${formContent.properties.title} - ${key}`,
                          id:`${formContent.properties.id} - ${key}`,
                          tag:fieldForm[
                            fieldForm.findIndex((form_item)=>
                              form_item.registerId === key
                            )
                          ].tag,
                          type:formContent.properties.type,
                          modelBody:formContent.properties.modelBody
                        }}
                        warn={formContent.warn}
                      />
                            )
                        )
                    }
                </div>}
            )
        }
              <button
                type="button"
                onClick={() =>
                  actions.append({}) 
                }
              >
                Adicionar
              </button>
    </div>
  )
}

export default FormFieldList

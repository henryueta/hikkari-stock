import type { UseFieldArrayReturn } from "react-hook-form"
import type z from "zod"
import FormField from "../form-field"
import type { FormFieldItemType } from "../../@types/form"

const FormFieldList = ({id,title,arrayFields,fieldSchema,actions,formField}:{
    title:string,
    id:string,
    arrayFields:Record<"id", string>[],
    formField:FormFieldItemType,
    fieldSchema:z.ZodArray,
    actions:UseFieldArrayReturn
}) => {
  return (
    <div className="formFieldList">
        <label htmlFor={id}>
            <p>
            {title}
            </p>
        </label>
        {
            arrayFields.map((field_item,field_index)=>
                {
                    return <div className="fieldListItemContainer" key={field_index}>
                    {
                        Object.entries(fieldSchema.element.shape).map(
                        ([key,_])=>(
                        <FormField
                        register={formField.register}
                        key={`${formField.properties.registerId}.${field_index}.${key}`}
                        properties={{   
                          registerId: `${formField.properties.registerId}.${field_index}.${key}`,
                          title: `${formField.properties.title} - ${key}`,
                          id:field_item.id,
                          tag:"input",
                          type:formField.properties.type
                        }}
                        warn={formField.warn}
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
                  actions.append({}) // 👈 se quiser, pode passar um valor padrão aqui
                }
              >
                Adicionar
              </button>
    </div>
  )
}

export default FormFieldList

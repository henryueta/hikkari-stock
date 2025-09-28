import type { UseFieldArrayReturn } from "react-hook-form"
import FormField from "../form-field"
import type { FormChangeFieldsType, FormFieldItemType, FormType } from "../../@types/form"
import type { ZodObject } from "zod"
import { onFindField } from "../../functions/field"
import Button from "../button"
import { onDefaultTypeofData } from "../../functions/output"

const FormFieldList = (
  {
    id,
    title,
    arrayFields,
    fieldSchema,
    actions,
    formContent,
    fieldForm,
    changeFields
  }:{
    title:string,
    id:string,
    arrayFields:Record<"id", string>[],
    formContent:FormFieldItemType,
    fieldSchema:ZodObject,
    fieldForm:FormType
    actions:UseFieldArrayReturn,
    changeFields?:FormChangeFieldsType
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
                    return <div className="fieldListItemContainer" key={field_item.id}>
                    {
                        Object.entries(fieldSchema.shape).map(
                        ([key,_])=>(
                        <FormField
                        onSetValue={(value)=>{
                          const current_field = onFindField(fieldForm,key)
                          !!changeFields
                          &&
                          current_field.tag === 'input'
                          ? 
                          changeFields.onInput && changeFields.onInput(value)
                          :
                          current_field.tag === 'select'
                          &&
                          changeFields?.onSelect && changeFields.onSelect(value)
                          
                          !!current_field.changeWatch
                          &&
                          current_field.changeWatch.changeFields.forEach((field_for_change)=>
                          {
                            actions.update(field_index,
                              {
                              [key]:value,
                              [field_for_change.registerId]:onDefaultTypeofData(field_for_change.typeOfField)
                              }
                            )
                          }
                          
                          )

                        }}
                        register={formContent.register}
                        key={`${formContent.properties.registerId}.${field_index}.${key}`}
                        properties={{   
                          registerId: `${formContent.properties.registerId}.${field_index}.${key}`,
                          title:onFindField(fieldForm,key).title,
                          id:`${formContent.properties.id} - ${key}`,
                          tag:onFindField(fieldForm,key).tag,
                          type:formContent.properties.type,
                          modelBody:formContent.properties.modelBody
                        }}
                        warn={formContent.warn}
                      />
                            )
                        )
                    }
                    <Button
                    title="Excluir"
                    onClick={()=>{
                      actions.remove(field_index)
                    }}
                    />
                    
                </div>}
            )
            
        }
        <Button
        title={"Adicionar "+title.toLocaleLowerCase()}
        onClick={() =>
        {
            actions.append({}) 
        }
        }
        />
    </div>
  )
}

export default FormFieldList

import type { UseFieldArrayReturn } from "react-hook-form"
import FormField from "../form-field"
import type { FormChangeFieldsType, FormFieldItemType, FormFieldNumberListType, FormSelectOptionType, FormType } from "../../@types/form"
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
    changeFields,
    defaultOptions,
    numberFields
  }:{
    title:string,
    id:string,
    arrayFields:Record<"id", string>[],
    formContent:FormFieldItemType,
    fieldSchema:ZodObject,
    fieldForm:FormType
    actions:UseFieldArrayReturn,
    changeFields?:FormChangeFieldsType,
    defaultOptions?:FormSelectOptionType | null,
    numberFields?:FormFieldNumberListType | null
}) => {
  console.log(
    (formContent.warn
    &&
    formContent.warn[0])
    &&
    formContent.warn[0]
  )
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
                        max={
                          (()=>{
                            const current_fields_number = numberFields?.find((field_number_item)=>
                            !!(`${formContent.properties.registerId}.${field_index}.${field_number_item.registerId}` === `${formContent.properties.registerId}.${field_index}.${key}`
                              &&
                              field_number_item.index === field_index)
                            )?.max
                            return current_fields_number

                          })()
                        }
                        options={
                          (()=>{
                            const current_options = 
                            
                            (
                              !onFindField(fieldForm,key).options
                              ?
                              defaultOptions?.find((field_option_item)=>
                                `${formContent.properties.registerId}.${field_index}.${field_option_item.registerId}` === `${formContent.properties.registerId}.${field_index}.${key}`
                                &&
                                (!!field_option_item.index 
                                ? field_option_item.index === field_index
                                :
                                true
                              )
                                
                              )?.options
                              : 
                              onFindField(fieldForm,key).options
                            )

                            return current_options
                          })()
                      }
                        onSetValue={(value)=>{
                          const current_field = onFindField(fieldForm,key)
                          !!changeFields
                          &&
                          !!current_field.changeWatch?.changeControl
                          &&
                          current_field.tag === 'input'
                          ? 
                          changeFields.onInput && changeFields.onInput(
                            current_field.changeWatch
                            &&
                            (
                            !!current_field.changeWatch.onChange
                            &&
                            current_field.changeWatch.onChange(value,field_index))
                            ||
                            value
                          )
                          :
                          !!current_field.changeWatch?.changeControl
                          &&
                          current_field.tag === 'select'
                          &&
                          changeFields?.onSelect && changeFields.onSelect(
                            current_field.changeWatch
                            &&
                            (
                            !!current_field.changeWatch.onChange
                            &&
                            current_field.changeWatch.onChange(value,field_index))
                            ||
                            value
                          )
                          const previus_data = (
                            (!!current_field.changeWatch
                            &&
                            !!current_field.changeWatch.noChangeFields)
                            ?
                            Object.fromEntries((Object.entries(actions.fields[field_index]).filter((action_field_item)=>

                              current_field.changeWatch?.noChangeFields?.includes(action_field_item[0])

                            )).map((action_field_item)=>[action_field_item[0],action_field_item[1]]))
                            :
                            actions.fields[field_index]
                          );

                          const field_for_change_list = 
                          (!!current_field.changeWatch
                          &&
                          !!current_field.changeWatch.changeFields
                          &&
                          !!current_field.changeWatch?.changeControl)
                          ?
                          Object.fromEntries(current_field.changeWatch.changeFields.map((item)=>{
                            return [item.registerId,onDefaultTypeofData(item.typeOfField)]
                          }))
                          :
                          actions.fields[field_index]
                         

                          !!current_field.changeWatch
                          &&
                          !!current_field.changeWatch.changeFields
                          &&
                          !!current_field.changeWatch?.changeControl
                          &&
                          current_field.changeWatch.changeFields.forEach(()=>
                          {  
                            actions.update(field_index,
                              {...previus_data,
                              [key]:value,
                              ...field_for_change_list
                              }
                            )
                          }
                                                    
                          );

                          


                        }}
                        register={formContent.register}
                        key={`${formContent.properties.registerId}.${field_index}.${key}`}
                        properties={{   
                          registerId: `${formContent.properties.registerId}.${field_index}.${key}`,
                          title:onFindField(fieldForm,key).title,
                          id:`${formContent.properties.id} - ${key}`,
                          tag:onFindField(fieldForm,key).tag,
                          type:onFindField(fieldForm,key).type,
                          modelBody:formContent.properties.modelBody
                        }}
                        warn={
                          (formContent.warn
                            &&
                            formContent.warn[field_index]
                            &&
                            formContent.warn[field_index][key as 'root']
                          ) 
                          ? formContent.warn[field_index][key as "root"]!.message || ""
                          : null 
                        }
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

import { useFieldArray, type Control, type FieldErrors, type FieldValues, type UseFieldArrayReturn, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import type { ModelType } from "../../@types/model"
import z from "zod";
import FormFieldList from "../form-field-list";
import FormField from "../form-field";
import Button from "../button";
import FormDataView from "../form-data-view";
import { Fragment } from "react/jsx-runtime";
import type { DefaultFormValuesType, FormMethodType } from "../../@types/form";
import { onFindField } from "../../functions/field";
import { onDefaultTypeofData } from "../../functions/output";


const FormStructure = ({model,control,register,errors,onCoupledForm,onUpdateFields}
    :{
        model:ModelType,
        control:Control,
        register:UseFormRegister<Record<string, unknown>>,
        onUpdateFields:UseFormSetValue<Record<string, unknown>>,
        errors:FieldErrors<Record<string, unknown>>,
        onCoupledForm?:(
          model:ModelType,
          fieldArray:UseFieldArrayReturn<FieldValues>,
          method:FormMethodType,
          defaultForm?:{
            registerId:string | undefined,
            index:number | undefined
            values:DefaultFormValuesType,
          }
          )=>void
      }) => {
        

  const fieldArrays = model.form.reduce((acc, field_item) => {
  const field_schema = model.schema.shape[field_item.registerId];


  if (
    field_schema instanceof z.ZodArray &&
    field_schema.element instanceof z.ZodObject
  ) {
    acc[field_item.registerId] = useFieldArray({
      control,
      name: field_item.registerId
    });
  }

  return acc;
}, {} as Record<string, ReturnType<typeof useFieldArray>>);


    return model.form.map((field_item,field_index)=>
          {
            const field_schema = model.schema.shape[field_item.registerId];
            const fieldArrayActions = fieldArrays[field_item.registerId]
              if(field_schema instanceof z.ZodArray
                &&
                field_schema.element instanceof z.ZodObject
                &&
                field_item.tag !== 'dialog'
              ){
                return (
                  <FormFieldList
                  key={field_item.registerId+field_index}
                  actions={fieldArrayActions}
                  id={field_item.id}
                  arrayFields={fieldArrayActions.fields}
                  title={field_item.title}
                  fieldSchema={field_schema.element}
                  fieldForm={model.form[model.form.findIndex((form_item)=>
                  (
                    form_item.tag === 'form' 
                    && 
                    form_item.id === field_item.id
                  )
                  )].modelBody!.form}
                  formContent={{
                    properties:field_item,
                    register:register,
                    warn:errors[field_item.registerId]?.message || null,
                  }}
                  />
                )
              }
              if(field_item.tag === 'dialog'){
                return <Fragment
                key={field_item.registerId}>
                  <p>{field_item.title}</p>
                {
                  !!control._formValues[field_item.registerId]
                  &&
                  (control._formValues[field_item.registerId] as object[]).map((field_array_item,field_array_index)=>
                      <FormDataView
                        key={field_array_index}
                        body={Object.entries(field_array_item).map((field_data_item)=>
                        {
                          const field_form = onFindField(model.form,field_item.registerId).modelBody?.form
                          const current_field = onFindField(field_form!,field_data_item[0])
                          if(!!current_field){
                            if(current_field.tag !== 'form' && current_field.tag !== 'dialog')
                            return {
                              label:
                              current_field.title,
                              value:field_data_item[1]
                            }
                          }
                         
                          }
                        ).filter((valid_fields)=>
                          !!valid_fields?.label && valid_fields.value
                        ) as { label: string; value: any; }[]}
                        actions={{
                          onDelete() {
                            fieldArrayActions.remove(field_array_index)
                          },
                          onUpdate() {
                            !!onCoupledForm
                            &&
                            !!field_item.modelBody
                            &&
                            onCoupledForm(field_item.modelBody,fieldArrayActions,'put',{
                              registerId:field_item.registerId,
                              values:{...field_array_item},
                              index:field_array_index
                            })
                          },
                        }}
                      />
                  )
                }
                <Button
                title={"Adicionar "+field_item.title.toLocaleLowerCase()}
                onClick={()=>{
                  return (!!onCoupledForm
                  &&
                  !!field_item.modelBody
                  &&
                  onCoupledForm(field_item.modelBody,fieldArrayActions,'post'));
                }}                
                />
                </Fragment>
              }

            return (
            <FormField
              onSetValue={(value)=>{
                !!field_item.changeWatch
                &&
                field_item.changeWatch.changeFields.forEach((field_for_change)=>
                    onUpdateFields(field_for_change.registerId,(
                      onDefaultTypeofData(field_for_change.typeOfField)
                    ))
                )
              }}
              key={field_item.registerId+field_index}
              properties={field_item}
              register={register}
              warn={errors[field_item.registerId]?.message || null}
            />
          )
          }
        )

}

export default FormStructure

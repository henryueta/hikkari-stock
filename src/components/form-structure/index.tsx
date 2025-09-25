import { useFieldArray, type Control, type FieldErrors, type FieldValues, type UseFieldArrayReturn, type UseFormRegister } from "react-hook-form";
import type { ModelType } from "../../@types/model"
import z from "zod";
import FormFieldList from "../form-field-list";
import FormField from "../form-field";
import Button from "../button";
import FormDataView from "../form-data-view";
import { Fragment } from "react/jsx-runtime";


const FormStructure = ({model,control,register,errors,onCoupledForm}
    :{
        model:ModelType,
        control:Control,
        register:UseFormRegister<Record<string, unknown>>,
        errors:FieldErrors<Record<string, unknown>>,
        onCoupledForm?:(model:ModelType,fieldArray:UseFieldArrayReturn<FieldValues>)=>void
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
                  form_item.tag === 'form' && form_item.id === field_item.id
                  )].modelBody!.form}
                  formContent={{
                    properties:field_item,
                    register:register,
                    warn:errors[field_item.registerId]?.message || null,
                    index:field_index
                  }}
                  />
                )

              }

              

              if(field_item.tag === 'dialog'){
                
                return <Fragment
                key={field_item.registerId}>
                {
                  !!control._formValues[field_item.registerId]
                  &&
                  (control._formValues[field_item.registerId] as object[]).map((field_array_item,field_array_index)=>
                      <FormDataView
                      key={field_array_index}
                      data={field_array_item}
                      />
                  )
                }
                <Button
                title={"Adicionar "+field_item.title}
                onClick={()=>{
                  return (!!onCoupledForm
                  &&
                  !!field_item.modelBody
                  &&
                  onCoupledForm(field_item.modelBody,fieldArrayActions));
                }}                
                />
                </Fragment>
              }

            return (
            <FormField
              key={field_item.registerId+field_index}
              identifier={field_item.registerId}
              properties={field_item}
              register={register}
              warn={errors[field_item.registerId]?.message || null}
            />
          )
          }
        )

}

export default FormStructure

import { useFieldArray, type Control, type FieldErrors, type FieldValues, type UseFieldArrayReturn, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import type { ModelType } from "../../@types/model"
import z from "zod";
import FormFieldList from "../form-field-list";
import FormField from "../form-field";
import Button from "../button";
import FormDataView from "../form-data-view";
import { Fragment } from "react/jsx-runtime";
import type { DefaultFormValuesType, FormChangeFieldsType, FormFieldNumberListType, FormMethodType, FormSelectOptionType } from "../../@types/form";
import { onFindField } from "../../functions/field";
import { onDefaultTypeofData } from "../../functions/output";
// import useHandleAxios from "../../hooks/useHandleAxios";
// import useHandleToken from "../../hooks/useHandleToken";


const FormStructure = (
  {
    model,
    control,
    register,
    errors,
    defaultOptions,
    numberFields,
    onCoupledForm,
    onUpdateFields,
    changeFields
  }
    :{
        model:ModelType,
        control:Control,
        register:UseFormRegister<Record<string, unknown>>,
        onUpdateFields:UseFormSetValue<Record<string, unknown>>,
        changeFields?:FormChangeFieldsType,
        errors:FieldErrors<Record<string, unknown>>,
        defaultOptions?:FormSelectOptionType | null,
        numberFields?:FormFieldNumberListType | null,
        onCoupledForm?:(
          model:ModelType,
          fieldArray:UseFieldArrayReturn<FieldValues>,
          method:FormMethodType,
          changeFields?:FormChangeFieldsType,
          defaultOptions?:FormSelectOptionType | null,
          defaultForm?:{
            registerId:string | undefined,
            index:number | undefined
            values:DefaultFormValuesType,
          },
          )=>void
      }) => {
        
    // const {onRequest,onCreateCancelToken} = useHandleAxios();
      // const {onGetToken} = useHandleToken();

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
            console.log("errors",errors[field_item.registerId])
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
                  numberFields={numberFields}
                  defaultOptions={defaultOptions}
                  changeFields={changeFields}
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
                    warn:errors[field_item.registerId] || null,
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
                              value:(
                                !current_field.defaultViewValue
                                ?
                                field_data_item[1]
                                : 
                                current_field.defaultViewValue + (" número ("+(field_array_index+1)+")")
                              )
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
                            onCoupledForm(field_item.modelBody,fieldArrayActions,'put',changeFields,defaultOptions,{
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
                  // field_item.
                  
                  // const current_field = onFindField(
                  //   model.form,
                  //   field_item.registerId
                  // )

                  // if(current_field.queryOptionsUrl){
                  //   return onRequest({
                  //   url:current_field.queryOptionsUrl,
                  //   method:"get",
                  //   params:{
                  //     token:onGetToken()
                  //   },
                  //   cancelToken:onCreateCancelToken(),
                  // },{
                  //   onThen(result) {
                  //     (!!onCoupledForm
                  //       &&
                  //       !!field_item.modelBody
                  //       &&
                  //       onCoupledForm(field_item.modelBody,fieldArrayActions,'post',changeFields,
                  //         result.data.map((item)=>{
                  //           return {
                  //             registerId:item.name,
                  //             options:item.options
                  //           }
                  //         }) || []
                  //       ));
                                     
                  //   },
                  //     onCatch(error) {
                  //     console.log(error)
                  //     },
                  //   });
                  // }
                  
                  
                  return (!!onCoupledForm
                  &&
                  !!field_item.modelBody
                  &&
                  onCoupledForm(field_item.modelBody,fieldArrayActions,'post',changeFields,defaultOptions));
                  }}                
                />
                </Fragment>
              }

            return (
            <FormField
              max={
                numberFields?.find((field_number_item=>
                  field_number_item.registerId === field_item.registerId
                ))?.max
              }
              options={
                defaultOptions?.find((field_option_item=>
                  field_option_item.registerId === field_item.registerId
                ))?.options
              }
              onSetValue={(value)=>{

                !!changeFields
                &&
                field_item.changeWatch?.changeControl
                &&
                field_item.tag === 'input'
                ? 
                changeFields.onInput && changeFields.onInput(
                  !!field_item.changeWatch
                  &&
                  (field_item.changeWatch.onChange
                  &&
                  field_item.changeWatch.onChange(value))
                  ||
                  value
                )
                :
                field_item.tag === 'select'
                &&
                field_item.changeWatch?.changeControl
                &&
                changeFields?.onSelect && changeFields.onSelect(
                  !!field_item.changeWatch
                  &&
                  (field_item.changeWatch.onChange
                  &&
                  field_item.changeWatch.onChange(value))
                  ||
                  value
                )
                
                !!field_item.changeWatch
                &&
                field_item.changeWatch.changeFields
                &&
                field_item.changeWatch.changeFields.forEach((field_for_change)=>
                    {
                      onUpdateFields(field_for_change.registerId,(
                      onDefaultTypeofData(field_for_change.typeOfField)
                    ))
                  }
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

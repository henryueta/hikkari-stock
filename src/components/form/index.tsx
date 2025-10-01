import { FormProvider, useForm, type FieldValues, type UseFieldArrayReturn } from "react-hook-form";
import type { ModelType } from "../../@types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormStructure from "../form-structure";
import Dialog from "../dialog";
import { useState } from "react";
import type { DefaultFormValuesType, FormChangeFieldsType, FormFieldNumberListType, FormMethodType, FormSelectOptionType } from "../../@types/form";
import Button from "../button";


const Form = ({model,submit,defaultForm,changeFields,defaultOptions,numberFields}:
  {
    model:ModelType,
    defaultForm?:DefaultFormValuesType,
    defaultOptions?:FormSelectOptionType | null,
    numberFields?:FormFieldNumberListType | null,
    method:'post'|'put',
    submit:{
      title:string,
      onAction?:(data:Record<string, unknown>)=>void
    },
    changeFields?:FormChangeFieldsType
  }) => {
    type ModelFormType = z.infer<typeof model.schema> 
    const form_methods = useForm<ModelFormType>({
      mode:"all",
      reValidateMode:"onChange",
      resolver:zodResolver(model.schema),
      defaultValues:defaultForm
    });

    const {register,formState,control,handleSubmit,setValue} = form_methods;
    const {errors} = formState;
    const [coupledForm,setCoupledForm] = useState<{
      method:FormMethodType,
      model:ModelType,
      defaultOptions?:FormSelectOptionType | null,
      defaultForm?:{
        values:DefaultFormValuesType,
        registerId?:string,
        index?:number
      },
      changeFields?:FormChangeFieldsType
    }|null>(null);
    const [coupledFieldArray,setCoupledFieldArray] = useState<UseFieldArrayReturn<FieldValues>|null>(null);
    console.log(control._formValues)
  return (
    <>
    {
      !!coupledForm
      &&
      <Dialog
        options={{
        conclude:{
        title:"Concluir",
        onAction() {
                            
        },
        },
        exit:{
        title:"Sair",
          onAction() {
              setCoupledForm(null);
              setCoupledFieldArray(null);              
          },
        }
        }}
        >
        <Form
        changeFields={coupledForm.changeFields}
        method={coupledForm.method}
        model={coupledForm.model}
        defaultForm={coupledForm.defaultForm?.values}
        defaultOptions={defaultOptions}
        numberFields={numberFields}
        submit={{
          title:
          (coupledForm.method === 'post'
          ? "Cadastrar"
          : "Editar"),
          onAction(data) {
            !!coupledFieldArray
            &&
            (
              coupledForm.method === 'post'
              ? 
              coupledFieldArray.append(data)
              :
              coupledForm.method === 'put'
              // &&
              &&
              (()=>{
                if(typeof coupledForm.defaultForm?.index === 'number'){
                coupledFieldArray.update(
                  coupledForm.defaultForm?.index,
                  data
                )
                // setValue(`${coupledForm.defaultForm.registerId}.${coupledForm.defaultForm.index}.name`,"MUDADO")
                }
                
              })()
            )
          },
        }}
        />
    </Dialog>
    }
     <FormProvider {...form_methods}>
      <form onSubmit={handleSubmit((data)=>{
        !!submit.onAction
        &&
        submit.onAction(data);
      })}>
      <FormStructure
      defaultOptions={defaultOptions}
      numberFields={numberFields}
        changeFields={changeFields}
        onCoupledForm={(model,fieldArray,method,changeFields,defaultOptions,defaultForm)=>{
          setCoupledForm({
            model:model,
            method:method,
            defaultForm:{
              values:defaultForm?.values,
              index:defaultForm?.index,
              registerId:defaultForm?.registerId
            },
            changeFields:changeFields,
            defaultOptions:defaultOptions

          });
          setCoupledFieldArray(fieldArray)
          
      }}
      model={model}
      control={control}
      onUpdateFields={setValue}
      errors={errors}
      register={register}
      />
      <Button
      title={submit.title}
      type="submit"
      />
     </form>
    </FormProvider>
    </>
  )
}

export default Form

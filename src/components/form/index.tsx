import { FormProvider, useForm, type FieldValues, type UseFieldArrayReturn } from "react-hook-form";
import type { ModelType } from "../../@types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormStructure from "../form-structure";
import Dialog from "../dialog";
import { useState } from "react";


const Form = ({model,submit}:
  {
    model:ModelType,
    submit:{
      title:string,
      onAction?:(data:Record<string, unknown>)=>void
    },
  }) => {
    type ModelFormType = z.infer<typeof model.schema> 
    
    const form_methods = useForm<ModelFormType>({
      mode:"all",
      reValidateMode:"onChange",
      resolver:zodResolver(model.schema)
    });

    const {register,formState,control,handleSubmit} = form_methods;

    const {errors} = formState;
    const [coupledForm,setCoupledForm] = useState<ModelType|null>(null);
    const [coupledFieldArray,setCoupledFieldArray] = useState<UseFieldArrayReturn<FieldValues>|null>(null);

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
        model={coupledForm}
        submit={{
          title:"Cadastrar",
          onAction(data) {
            console.log(data)
            !!coupledFieldArray
            &&
            coupledFieldArray.append(data)
          },
        }}
        />
    </Dialog>
    }
     <FormProvider {...form_methods}>
      <form onSubmit={handleSubmit((data)=>{
        !!submit.onAction
        &&
        submit.onAction(data)
                
        console.log(data)

      })}>
      <FormStructure
      onCoupledForm={(model,fieldArray)=>{
          setCoupledForm(model);
          setCoupledFieldArray(fieldArray)
      }}
      model={model}
      control={control}
      errors={errors}
      register={register}
      />
      <button
      >
        {submit.title}
      </button>
     </form>
    </FormProvider>
    </>
  )
}

export default Form

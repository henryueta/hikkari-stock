import { useFieldArray, useForm } from "react-hook-form";
import type { ModelType } from "../../@types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../form-field";
import z from "zod";
import FormFieldList from "../form-field-list";


const Form = ({model,submit}:
  {
    model:ModelType,
    submit:{
      title:string,
      onAction?:(data:Record<string, unknown>)=>void
    }
  }) => {
type ModelFormType = z.infer<typeof model.schema> 

    const {register,formState,control,handleSubmit} = useForm<ModelFormType>({
      mode:"all",
      reValidateMode:"onChange",
      resolver:zodResolver(model.schema)
    });

    const {errors} = formState;


  return (
    <form onSubmit={handleSubmit((data)=>{
      !!submit.onAction
      &&
      submit.onAction(data)
      
      console.log(data)

    })}>
      {
        model.form.map((field_item,field_index)=>
          {

            const field_schema = model.schema.shape[field_item.registerId];

              if(field_schema instanceof z.ZodArray
                &&
                field_schema.element instanceof z.ZodObject
              ){

                const fieldArrayActions = useFieldArray({
                  control,
                  name:field_item.registerId as any
                })

                return (
                  <FormFieldList
                  key={field_index}
                  actions={fieldArrayActions}
                  id={field_item.id}
                  arrayFields={fieldArrayActions.fields}
                  title={field_item.title}
                  fieldSchema={field_schema}
                  formField={{
                    properties:field_item,
                    register:register,
                    warn:errors[field_item.registerId]?.message || null
                  }}
                  />
                )

              }

            return (
            <FormField
              key={field_item.registerId}
              properties={field_item}
              register={register}
              warn={errors[field_item.registerId]?.message || null}
            />
          )
          }
        )
      }
      <button
      >
        {submit.title}
      </button>
    </form>
  )
}

export default Form

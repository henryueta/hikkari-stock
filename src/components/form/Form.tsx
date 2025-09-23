import { useForm } from "react-hook-form";
import type { ModelType } from "../../@types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../form-field";

const Form = ({model,submit}:
  {
    model:ModelType,
    submit:{
      title:string,
      onAction?:(data:Record<string, unknown>)=>void
    }
  }) => {

    const {register,formState,handleSubmit} = useForm({
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
        model.form.map((field)=>
          <FormField
          key={field.registerId}
          properties={field}
          register={register}
          warn={errors[field.registerId]?.message || null}
          />
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

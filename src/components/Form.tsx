import { useForm } from "react-hook-form";
import type { ModelType } from "../@types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";

const Form = ({model}:{model:ModelType}) => {

    const {register,formState,handleSubmit} = useForm({
      mode:"all",
      reValidateMode:"onChange",
      resolver:zodResolver(model.schema)
    });

    const {errors} = formState;

  return (
    <form>
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
    </form>
  )
}

export default Form

import type { UseFormRegister } from "react-hook-form"
import type { FormItemType } from "../../@types/form"
import FormWarn from "../form-warn"

const FormField = ({properties,register,warn}:
    {
    properties:FormItemType,
    register:UseFormRegister<Record<string, unknown>>
    warn:string | null
    }
) => {
  return (
    <div className="formField">
        <label htmlFor={properties.id}>
            <p>{properties.title}</p>
            {
                properties.tag === 'input'
                ?
                <input 
                type={properties.type}
                id={properties.id}
                {...register(properties.registerId)}
                />
                : 
                properties.tag === 'textarea'
                &&
                <textarea 
                id={properties.id}
                {...register(properties.registerId)}
                >
                </textarea>
            }
        </label>
        {
            !!warn
            &&
            <FormWarn
                message={warn}
            />
        }
    </div>
  )
}

export default FormField

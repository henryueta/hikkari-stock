import type { FormFieldItemType } from "../../@types/form"
import FormWarn from "../form-warn"

const FormField = ({properties,register,warn}:FormFieldItemType
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
        {
            properties.registerId
        }
    </div>
  )
}

export default FormField

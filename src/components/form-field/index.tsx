import type { FormFieldItemType } from "../../@types/form"
import FormWarn from "../form-warn"
import Select from "../select"

const FormField = ({properties,register,warn,onSetValue,options}:FormFieldItemType
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
                    onChange={(e)=>{
                    !!onSetValue
                    &&
                    onSetValue(e.target.value)
                }}
                />
                : 
                properties.tag === 'textarea'
                ?
                <textarea 
                id={properties.id}
                {...register(properties.registerId)}
                >
                </textarea>
                : 
                properties.tag === 'select'
                &&
                <Select
                options={options}
                id={properties.id}
                register={register}
                registerId={properties.registerId}
                onSelect={(selected)=>{
                    !!onSetValue
                    &&
                    onSetValue(selected.value);
                }}
                />       
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

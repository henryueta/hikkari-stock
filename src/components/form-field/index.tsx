import { useEffect, useState } from "react"
import type { FormFieldItemType } from "../../@types/form"
import FormWarn from "../form-warn"
import Select from "../select"
import type { SelectOptionType } from "../../@types/select"

const FormField = (
    {
        properties,
        register,
        warn,
        onSetValue,
        options,
        max
    }
    :Omit<FormFieldItemType,'warn'>
    &
    {
        warn:string | null
    }
) => {

    const [numberMax,setNumberMax] = useState<string | null>(
        (!!max
        ?
        "Máx: "+max.toString()
        :
        "")            
    );

    useEffect(()=>{

        setNumberMax((prev)=>{
            if(!!max){
                return max.toString()
            }
            return prev
        })

    },[max])
    const [selectOptions,setSelectOptions] = useState<SelectOptionType | undefined>(options);
    
    useEffect(()=>{
        if(!!options){
            setSelectOptions(options)
        }
    },[options])
    
  return (
    <div className="formField">
        <label htmlFor={properties.id}>
            <p>{properties.title}</p>
            {
                properties.tag === 'input'
                ?
                <input 
                placeholder={
                    properties.type === 'number'
                    ? 
                    !!numberMax
                    ?
                    "Máx: "+numberMax
                    :
                    "Máx:. . ."
                    : ""
                }
                max={
                    properties.type === 'number'
                    ? 
                    !!numberMax
                    ?
                    numberMax
                    :
                    "100"
                    : ""
                }
                type={properties.type}
                id={properties.id}
                {...register(properties.registerId,{
                    valueAsNumber:(properties.type === 'number')
                })}
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
                (
                <Select
                options={selectOptions}
                id={properties.id}
                register={register}
                registerId={properties.registerId}
                onSelect={(selected)=>{
                    !!onSetValue
                    &&
                    onSetValue(selected.value);
                }}
                />) 
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

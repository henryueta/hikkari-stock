import { useEffect, useState } from "react"
import type { UseFormRegisterType } from "../../@types/form"
import type { OptionType, SelectOptionType } from "../../@types/select"

const Select = ({id,register,registerId,onSelect,options,selected}:
    {
        id?:string,
        register:UseFormRegisterType,
        registerId:string,
        onSelect?:(selected:OptionType)=>void,
        options?:SelectOptionType,
        selected?:OptionType | null
    }) => {
        
        const [optionSelected,setOptionSelected] = useState<OptionType | null>((
            !!selected
            ? selected
            : null
        ));

        useEffect(()=>{
            !!optionSelected
            &&
            !!onSelect
            &&
            (()=>{
               onSelect(optionSelected) 
            })()
        },[optionSelected])


  return (
    <div className="select-container">

        <select
         id={
            !!id
            ? id
            : "select_field_id"
        }
        {...register(registerId)}
        onChange={(e)=>{
            setOptionSelected({
                label:options?.find((item)=>item.value === e.target.value)?.label || "",
                value:e.target.value
            })
        }}
        >

            <option value=""></option>
            {
               !!options?.length
                &&
                options.map((option_item,option_index)=>
                    <option 
                    key={option_index}
                    value={option_item.value}>
                        {option_item.label}
                    </option>
                )
            }
            {/* <option value="f4b77dbb-39b2-46e8-a9a7-e1e3f2302ff9">1</option>
            <option value="f4b77dbb-39b2-46e8-a9a7-e1e3f2302ff9">2</option> */}
        </select>
        
    </div>
  )
}

export default Select

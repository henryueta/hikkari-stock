import { useEffect, useState } from "react"
import type { UseFormRegisterType } from "../../@types/form"
import type { SelectType } from "../../@types/select"

const Select = ({id,register,registerId,onSelect}:
    {
        id?:string,
        register:UseFormRegisterType,
        registerId:string,
        onSelect?:(selected:SelectType)=>void,
    }) => {

        const [selected,setSelected] = useState<SelectType | null>(null);

        useEffect(()=>{
            
            !!selected
            &&
            !!onSelect
            &&
            onSelect(selected)
        },[selected])

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
            console.log(e.target.value)
            setSelected({
                label:"1",
                value:e.target.value
            })
        }}
        >
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
    </div>
  )
}

export default Select

import type { FormType } from "../@types/form"


    const onFindField = (form:FormType,registerId:string)=>{

        const index = form.findIndex((form_item)=>
        {
            console.log(form_item.registerId,registerId)
            return form_item.registerId === registerId
        }
        )
        console.log("index",index)
            return form[index]

    }


    export {
        onFindField
    }

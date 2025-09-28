import type { FormType } from "../@types/form"


    const onFindField = (form:FormType,registerId:string)=>{

        const index = form.findIndex((form_item)=>
        {
            return form_item.registerId === registerId
        }
        )
            return form[index]

    }


    export {
        onFindField
    }

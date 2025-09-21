import type { StyleType } from "../@types/style"
import onCondition from "./condition"

const onClassName = (className:string,style?:StyleType)=>{

    let formated_classname = className;

    onCondition(!!style,{
        onTrue(){
            return formated_classname = style![className]
        },
        onFalse() {
            return 
        },
    })

    return formated_classname

}

export {
    onClassName
}
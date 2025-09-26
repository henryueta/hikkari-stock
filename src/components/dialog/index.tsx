import type { ChildrenType } from "../../@types/children"
import type { DefaultFunctionType } from "../../@types/function"
import ButtonList from "../button-list"
import styles from "./index.module.css"

const Dialog = ({
    children,options
}:ChildrenType 
& {
    options:{
        exit:{
            title:string,
            onAction:DefaultFunctionType
        },
        conclude:{
            title:string,
            onAction:DefaultFunctionType
        }
    }
}) => {


  return (
    <dialog className={styles['dialog-message']}>
        {children}
        <ButtonList
        buttonList={[
            {
                title:options.exit.title,
                onClick:options.exit.onAction
            },
            {
                title:options.conclude.title,
                onClick:options.conclude.onAction
            }
        ]}
        />
    </dialog>
  )
}

export default Dialog

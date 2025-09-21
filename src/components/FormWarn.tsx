import type { ComponentStyleType } from "../@types/style"
import { onClassName } from "../functions/style"

const FormWarn = ({message,styles}:{message:string} & ComponentStyleType) => {
  
  return (
    <div className={
      onClassName("warnContainer",styles)
    }>
        <p>
            {message}
        </p>
    </div>
  )
}

export default FormWarn

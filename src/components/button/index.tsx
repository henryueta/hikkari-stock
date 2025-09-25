import type { ButtonItemType } from "../../@types/button"

const Button = (
    {
        title,
        onClick,
        type

    }:ButtonItemType) => {
  return (
    <div className="buttonContainer">
        <button 
        type={type}
        onClick={onClick}>
            {title}
        </button>
    </div>
  )
}

export default Button

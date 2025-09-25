import type { ButtonListType } from "../../@types/button"
import Button from "../button"

const ButtonList = ({buttonList}:{buttonList:ButtonListType}) => {
  return (
    <section className="buttonListSection">
        {
            buttonList.map((button_item,button_index)=>
                <Button 
                    key={button_index}
                    title={button_item.title}
                    type={
                        !!button_item.type
                        ?
                        button_item.type
                        :
                        "button"
                    }
                    onClick={button_item.onClick}
                />
            )
        }
    </section>
  )
}

export default ButtonList

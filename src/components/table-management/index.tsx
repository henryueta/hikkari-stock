import { useEffect } from "react"
import type { DataType } from "../../@types/data"
import Table from "../table"
import styles from "./index.module.css"
import useHandleTable from "../../hooks/useHandleTable"
import ButtonList from "../button-list"
import { button_table_management_list } from "../../objects/table"

const TableManagement = ({type}:{type:DataType}) => {

    const {onGetTableData,tableBody} = useHandleTable();

    useEffect(()=>{

        onGetTableData(type)

    },[])

  return (
    <section className={styles['tableManagementSection']}>
        <ButtonList
        buttonList={button_table_management_list.map((button_item)=>{
          return {
            title:button_item.title,
            onClick() {
              button_item.action_type === 'create'
              ?
              console.log("criar")
              :
              console.log("deletar")
            },
          }
        })}
        />
        {
            !!tableBody
            &&
            <Table
            body={tableBody}
            />
        }
    </section>
  )
}

export default TableManagement

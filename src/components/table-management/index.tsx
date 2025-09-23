import { useEffect } from "react"
import type { DataType } from "../../@types/data"
import Table from "../table"
import styles from "./index.module.css"
import useHandleTable from "../../hooks/useHandleTable"

const TableManagement = ({type}:{type:DataType}) => {

    const {onGetTableData,tableBody} = useHandleTable();

    useEffect(()=>{

        onGetTableData(type)

    },[])

  return (
    <section className={styles['tableManagementSection']}>
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

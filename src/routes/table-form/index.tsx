import { useParams } from "react-router-dom"
import Form from "../../components/form";
import { table_data_list } from "../../objects/table";
import { useState } from "react";
import type { ModelType } from "../../@types/model";

const TableFormPage = () => {

    const {table,type} = useParams();
    const [tableModel,setTableModel] = useState<ModelType | undefined>(
        table_data_list.find((table_data_item)=>
                table_data_item.name === table
    )?.model);


  return (
    <section className="tableFormPage">
        {
        !!tableModel
        &&    
        <Form
        model={
            tableModel
        }
        submit={{
            title:"Cadatrar"
        }}
        />}
    </section>
  )
}

export default TableFormPage

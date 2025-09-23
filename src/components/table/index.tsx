import type { TableType } from "../../@types/table"
import styles from "./index.module.css"

const Table = ({body}:TableType) => {
  return (
    <div className={styles['tableContainer']}>
        <table>
            <thead>
                <tr>
                    {
                        body.header.map((header_item,header_index)=>
                            <th key={header_index}>
                                {(
                                    header_item !== 'id'
                                    &&
                                    header_item.toString()
                                )}
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    body.data.map((row_item,row_index)=>
                        <tr 
                        onClick={()=>{
                            const data_id = row_item.find((row_item_id)=>row_item_id[0] === 'id');
                            if(!!data_id){
                                console.log(data_id[1])
                            }
                        }}
                        key={row_index}>
                            {
                                row_item.map((column_item,column_index)=>
                                {
                                    return (
                                        column_item[0] !== 'id'
                                        &&
                                        <td key={column_index}>
                                            {column_item[1].toString()}
                                        </td>
                                    )
                                }
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table

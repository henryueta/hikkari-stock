import type { ModelType } from "./model"

type TableBodyType = 
Record<'header',string[]>
&
Record<'data',string[][]>

interface TableType {
    body:TableBodyType
}

interface TableDataItemType {

    name:'product'|'sale'|'variation',
    model:ModelType

}

type TableDataListType = TableDataItemType[] ;

export type {
    TableBodyType,
    TableType,
    TableDataItemType,
    TableDataListType
}
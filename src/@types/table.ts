import type { ModelType } from "./model"

type TableBodyType = 
Record<'header',string[]>
&
Record<'data',string[][]>

interface TableType {
    body:TableBodyType
}

type TableDataType = 'product'|'sale'|'variation'|'auth';

interface TableDataItemType {

    name:TableDataType,
    model:ModelType,
}

type TableDataListType = TableDataItemType[] ;

export type {
    TableBodyType,
    TableType,
    TableDataItemType,
    TableDataListType,
    TableDataType
}
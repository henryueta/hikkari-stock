
type TableBodyType = 
Record<'header',string[]>
&
Record<'data',string[][]>

interface TableType {
    body:TableBodyType
}

export type {
    TableBodyType,
    TableType
}
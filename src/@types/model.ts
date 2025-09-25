import type { FormType } from "./form";
import type { SchemaType } from "./schema";

interface ModelType {
    schema:SchemaType,
    form:FormType,
    type?:''
}

export type {
    ModelType
}
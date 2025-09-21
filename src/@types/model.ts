import type { FormType } from "./form";
import type { SchemaType } from "./schema";

interface ModelType {
    schema:SchemaType,
    form:FormType
}

export type {
    ModelType
}
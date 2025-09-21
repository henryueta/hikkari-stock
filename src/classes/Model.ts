import type { FormType } from "../@types/form";
import type { SchemaType } from "../@types/schema";

class Model{
    
    public schema:SchemaType;
    public form:FormType;

    constructor(schema:SchemaType,form:FormType){
        this.schema = schema;
        this.form = form;
    }

}

export default Model
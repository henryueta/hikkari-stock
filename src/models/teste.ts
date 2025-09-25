import z from "zod";
import {product_form, product_schema} from "./product";
import { variation_form, variation_schema } from "./variation";

const teste_schema = z.object({
    product:product_schema,
    variations:z.array(variation_schema)
});



export {

}
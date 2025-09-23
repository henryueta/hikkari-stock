import type { EndpointTypeListType } from "../@types/endpoint"
import api_endpoints from "../config/api"

const endpoint_type_list:EndpointTypeListType = [
    {
        type:'product',
        endpoint:api_endpoints.product
    },
    {
        type:'sale',
        endpoint:api_endpoints.sale
    }
]

export {
    endpoint_type_list
}
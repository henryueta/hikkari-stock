
const api_base = "http://localhost:2030/"

const api_endpoints = {

    auth:{
        post:api_base+"auth/post",
        get_by_id:""
    },
    product:{
        get:api_base+"product/get",
        post:api_base+"product/post",
        get_by_id:api_base+"product/get-id?id="
    },
    sale:{
        get:api_base+"sale/get",
        post:api_base+"sale/post",
        get_by_id:api_base+"sale/get-id?id="
    },
    sale_product:{
        get:api_base+"sale/product/get",
        get_by_id:api_base+"sale/product/get-id?id="
    },
    sale_variation:{
        get:api_base+"sale/variation/get?product_id=",
        get_by_id:""
    },
    sale_variation_size:{
        get:api_base+"sale/variation/size/get?variation_id=",
        get_by_id:""
    },
    sale_size_quantity:{
        get:api_base+"sale/size/quantity/get?size_id=",
        get_by_id:""
    }

}

export default api_endpoints
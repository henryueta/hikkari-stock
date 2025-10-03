
const api_base = "http://localhost:2030/"

const api_endpoints = {

    auth:{
        post:api_base+"auth/post",
        get_by_id:"",
        put:""
    },
    product:{
        get:api_base+"product/get",
        get_by_id:api_base+"product/get-id?id=",
        post:api_base+"product/post",
        put:api_base+"product/put?id="
    },
    sale:{
        get:api_base+"sale/get",
        get_by_id:api_base+"sale/get-id?id=",
        post:api_base+"sale/post",
        put:api_base+"sale/put?id="
    },
    sale_product:{
        get:api_base+"sale/product/get",
        get_by_id:api_base+"sale/product/get-id?id=",
        put:""
    },
    sale_variation:{
        get:api_base+"sale/variation/get?product_id=",
        get_by_id:"",
        put:""
    },
    sale_variation_size:{
        get:api_base+"sale/variation/size/get?variation_id=",
        get_by_id:"",
        put:""
    },
    sale_size_quantity:{
        get:api_base+"sale/size/quantity/get?size_id=",
        get_by_id:"",
        put:""
    }

}

export default api_endpoints
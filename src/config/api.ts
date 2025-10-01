
const api_base = "http://localhost:2030/"

const api_endpoints = {

    auth:{
        post:api_base+"auth/post"
    },
    product:{
        get:api_base+"product/get",
        post:api_base+"product/post"
    },
    sale:{
        get:api_base+"sale/get",
        post:api_base+"sale/post"
    },
    sale_product:{
        get:api_base+"sale/product/get"
    },
    sale_variation:{
        get:api_base+"sale/variation/get?product_id="
    },
    sale_variation_size:{
        get:api_base+"sale/variation/size/get?variation_id="
    },
    sale_size_quantity:{
        get:api_base+"sale/size/quantity/get?size_id="
    }

}

export default api_endpoints
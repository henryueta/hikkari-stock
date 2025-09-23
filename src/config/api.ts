
const api_base = "http://localhost:2030/"

const api_endpoints = {

    auth:{
        post:api_base+"auth/post"
    },
    product:{
        get:api_base+"product/get"
    },
    sale:{
        get:api_base+"sale/get"
    }

}

export default api_endpoints
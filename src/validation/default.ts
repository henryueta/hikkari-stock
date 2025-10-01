
const default_data_validation = <T>(value:string|number|object|T[]|boolean)=>{

    return !!(
        value !== undefined && value !== null
    )

} 

const default_array_validation = <T>(value:T[])=>{

    return !!(
        value.length > 0
        &&
        default_data_validation(value)
    )

}

const default_string_validation = (value:string)=>{

    return !!(
        value.trim().length > 0
        &&
        default_data_validation(value)
    )

}

const default_number_validation = (value:number)=>{

    return !!(
        value > 0
        &&
        default_data_validation(value)
    )

}

export {
    default_data_validation,
    default_array_validation,
    default_string_validation,
    default_number_validation
}
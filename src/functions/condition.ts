
const onCondition = (condition:boolean,result:{
    onTrue:()=>void,
    onFalse:()=>void
})=>{

    const result_check = [
        {
            value:true,
            action:result.onTrue
        },
        {
            value:false,
            action:result.onFalse
        }
    ]

    const result_choiced = result_check.find((result)=>result.value === condition)
    
    if(!!result_choiced){
        return result_choiced.action();
    }

}

export default onCondition
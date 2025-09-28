import type { TypeofOutput } from "../@types/output";

const onDefaultTypeofData = (type:TypeofOutput)=>{
    
    switch (type) {
        case 'string':
            return '';
        case 'boolean':
            return false;
        case 'number':
            return 0;
        case 'object':
            return [];
        case 'function':
            return ()=>{}
        default:
            break;
    }

}

export {
    onDefaultTypeofData
}
import { getItem } from "../../utils/storage-utils"


export const permissionRoute=()=>{
    const check=getItem("token")
    if( check !== undefined && check!==null ){
        return true;
    }
    return false;
}
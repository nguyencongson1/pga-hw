import {createStore} from "redux"
import { IInfoCard } from "../interface";

const initialValue ={
    userToken:"",
    default:"",
    cardInfo:[]
}
const reducerRedux=(state =initialValue,action:any)=>{
    switch( action.type){
        case "SET_TOKEN_USER":
            return { ...state, userToken: action.payload };
        case "SET_INFO_CARD":
            return{...state,cardInfo: action.payload}
        default :
            return state;
    }
}

export const storeRedux= createStore(reducerRedux)
    console.log("store",storeRedux );
export const setToken=(payload:string)=>{
    return{
        type: "SET_TOKEN_USER",
        payload
    }
}
export const setInfoCard=(payload:IInfoCard[])=>{
    return{
        type: "SET_INFO_CARD",
        payload
    }
}


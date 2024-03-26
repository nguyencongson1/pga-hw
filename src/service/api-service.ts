import axios from "axios";

import { ILoginForm, ISignUp } from "../interface";
import { API_URL, API_URL1 } from "../configs/api-config";

const instance = axios.create({
    baseURL: API_URL
});
const instance1 = axios.create({
    baseURL: API_URL1
});

export const login = async (param: ILoginForm ) => {
    try {
        const res = await instance1.post("/auth/login", param);
        console.log("Response from login API:", res.data);
        return res.data;
    } catch (error) {
        console.error("lỗi:", error);
        throw error; 
    }
};

export const getProducts= async() =>{
    try{
        const token= localStorage.getItem("token")
        if(token){
            const config={
                headers: {
                    Authorization:token
                }
            }
            const res =await instance1.get("/product",config)
            return res.data;
        }
    }catch(err){
        throw err
    }
}

export const getLocation= async () =>{
    try{
        const res = await instance1.get("/location");
        return res.data;
    }catch(err){
        throw err
    }
}
export const getCity=async(id:number)=>{
    try{
        const res =await instance1.get(`/location?pid=${id}`)
        return res.data
    }catch(err){
        throw err
    }
}
export const signUp =async(param:ISignUp)=>{
    try{
        const res = await instance1.post("auth/register",param)
        return res.data
    }catch(err){
        console.log(err);
        throw err
    }
}

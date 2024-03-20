import axios from "axios";
import API_URL from "../configs/api-config";

const instance = axios.create({
    baseURL: API_URL
});

interface ILoginForm {
    email: string;
    password: string;
}

export const login = async (param: ILoginForm) => {
    try {
        const res = await instance.post("/authentication/login", param);
        console.log("Response from login API:", res.data);
        return res.data;
    } catch (error) {
        console.error("lỗi:", error);
        throw error; 
    }
};

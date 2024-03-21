

 export interface ILoginForm{
    email:string;
    password:string;
}
export interface ISignUp{
    email:string,
    password:string,
    repassword:string,
    name:string,
    sex:string,
    region:string,
    city:string,
}
export interface ILocalStorage{
    key:string;
    value?:string | number;
}

export interface ILocationRes{
    id:number;
    pid:number;
    name:string;
    createAt:string;
}
export interface IOptionCity{
    value:string | number;
    label:string
}
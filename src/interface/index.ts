

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
export interface IProductRes{
    id?:number;
    status?:string;
    currency?:string;
    total?:string;
    client?:string;
    createdAt?:string;
    invoice?:string;
    order?:string;
    fundingMethod?:string;
    updatedAt?:string;
    createdBy?:string;
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
export interface IInfoCard{
    name:string;
    age:string;
    address:string;
    avatar:string;
}
export interface typeUpdate {
    type: "add" | "edit";
    id?: number;
  }
export interface IProfile{
    id:number;
    email:string;
    name:string;
    gender:string;
    avatar:string;
    region:number;
    state:number;
    description: null;
}
export interface IResProfile{
    message:string;
    error:boolean;
    code:number;
    data?:IProfile;
}
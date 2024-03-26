import HomePage from "../page/home/HomePage";
import LoginPage from "../page/login/LoginPage";
import PayrollPage from "../page/payroll-list/PayrollList";
import SignUpPage from "../page/signup/SignupPage";


const publicRoutes=[
    {path:"/" ,element: LoginPage},
    {path:"/login" , element: LoginPage},
    {path:"/sign-up", element : SignUpPage}
]
const privateRoutes=[
    {path:"/home", element : HomePage},
    {path:"/payroll-list",element : PayrollPage}
]
export {publicRoutes , privateRoutes }
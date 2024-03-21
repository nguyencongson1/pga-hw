import HomePage from "../page/home/HomePage";
import LoginPage from "../page/login/LoginPage";
import SignUpPage from "../page/signup/SignupPage";


const publicRoutes=[
    {path:"/" ,element: LoginPage},
    {path:"/login" , element: LoginPage},
    {path:"/sign-up", element : SignUpPage}
]
const privateRoutes=[
    {path:"/home", element : HomePage}
]
export {publicRoutes , privateRoutes }
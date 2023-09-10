import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Main from "../Layouts/Main";
import Login from "../LogIn/Login";
import Shop from "../Shop/Shop";
import ViewCart from "../Shop/ViewCart";
import Signup from "../Signup/Signup";

 const router =createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
             path:'/shop',
             element:<Shop></Shop>
             
            },
            {
             path:'/login',
             element:<Login></Login>
             
            },
            {
             path:'/signup',
             element:<Signup></Signup>
             
            },
            {
             path:'/viewcart',
             element:<ViewCart></ViewCart>
             
            },
        ]

    }
]);
export default router;
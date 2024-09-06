import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../@landing";
import { Login } from "../@pages/_auth_pages/login";
import { Register } from "../@pages/_auth_pages/register";
import { MasterLayout } from "../@layout/masterLayout";
import path from "path";
import { Groups } from "../@pages/groups";

export const routes = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path : "/landing",
                element: <Landing/>
            },
            {
                path: "/groups",
                element : <Groups/>
            }
        ],
        element: <MasterLayout/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path : "/register",
        element: <Register/>
    }
]);
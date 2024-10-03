import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../@landing";
import { Login } from "../@pages/_auth_pages/login";
import { Register } from "../@pages/_auth_pages/register";
import { MasterLayout } from "../@layout/masterLayout";
import path from "path";
import { Groups } from "../@pages/groups";
import { PageNotFound } from "../@components/pageNotFound";
import AceCourts from "../@pages/courts";
import { Schedule } from "../@pages/schedules";
import { DashboardLayout } from "../@layout/dashboardLayout";
import BasicLogin from "../@pages/_auth_pages/formikLogin";
import UserRegistration from "../@pages/_auth_pages/register.v2";

export const routes = createBrowserRouter([
    {
        children: [
            {
                path : "/",
                element: <Landing/>
            },
            // {
            //     path: "/groups",
            //     element : <Groups/>
            // },
            // {
            //     path : "/courts",
            //     element : <AceCourts/>
            // },
            // {
            //     path : "/schedule",
            //     element : <Schedule/>
            // },
            // {
            //     path : "*",
            //     element : <PageNotFound/>
            // }
        ],
        element: <MasterLayout/>,
    },
    {
        element : <DashboardLayout/>, 
        children : [
            {
                path : "/ace/landing",
                element : <Landing/>
            },
            {
                path : "/ap/groups",
                element : <Groups/>
            },
            {
                path : "/ap/courts",
                element : <AceCourts/>
            },
            {
                path : "/ap/schedule",
                element : <Schedule/>
            },
            {
                path : "*",
                element : <PageNotFound/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path : "/basicLogin",
        element : <BasicLogin/> 
    },
    {
        path : "/register",
        element: <UserRegistration/>
    }
]);
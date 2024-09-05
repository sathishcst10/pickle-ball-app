import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../@landing";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Landing/>,
    }
]);
import {OrderPage} from "./Pages/OrderPage/OrderPage";
import {Login} from "./Components/LoginContainer/Login";
import {Navigate} from "react-router";

import {createBrowserRouter} from "react-router-dom";
import {MainLayouts} from "./Layouts/MainLayouts";

const router = createBrowserRouter([
    {
        path: '/', element: <MainLayouts/>, children: [
            {index: true, element: <Navigate to={'login'}/>},
            {path: 'login', element: <Login/>},
        ]
    },
    {path: 'orders', element: <OrderPage/>, children: []},
])

export {router}
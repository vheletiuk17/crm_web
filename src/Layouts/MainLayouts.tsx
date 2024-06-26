import React from 'react';
import {Outlet} from "react-router";
import {LoginPage} from "../Pages/LoginPage/LoginPage";

const MainLayouts = () => {
    return (
        <div>
            <Outlet/>

        </div>
    );
};

export {MainLayouts};
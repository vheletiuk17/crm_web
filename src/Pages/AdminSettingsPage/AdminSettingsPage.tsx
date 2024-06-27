import React from 'react';
import {Admin} from "../../Components/AdminSettingContainer/Admin";
import {Header} from "../../Components/HeaderContainer/Header";

const AdminSettingsPage = () => {
    return (
        <div>
            <Header/>
            <Admin/>
        </div>
    );
};

export {AdminSettingsPage};
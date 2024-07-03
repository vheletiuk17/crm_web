import React from 'react';
import {Orders} from "../../Components/OrderContainer/Orders/Orders";
import {Header} from "../../Components/HeaderContainer/Header";


const OrderPage = () => {
    return (
        <div>
            <Header/>
            <Orders/>
        </div>
    );
};

export {OrderPage};
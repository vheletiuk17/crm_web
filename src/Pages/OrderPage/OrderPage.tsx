import React from 'react';
import {Orders} from "../../Components/OrderContainer/Orders/Orders";
import {Header} from "../../Components/HeaderContainer/Header";
import {Sort} from "../../Components/SortContainer/Sort";

const OrderPage = () => {
    return (
        <div>
            <Header/>
            <Sort/>
            <Orders/>
        </div>
    );
};

export {OrderPage};
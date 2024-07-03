import React, {useEffect} from 'react';
import {Orders} from "../../Components/OrderContainer/Orders/Orders";
import {Header} from "../../Components/HeaderContainer/Header";
import {useAppDispatch} from "../../Hook/reduxHooks";
import {orderActions} from "../../Redux/Slice/orderSlice";


const OrderPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(orderActions.getAll({page:'1'}))
    }, [dispatch]);
    return (
        <div>
            <Header/>
            <Orders/>
        </div>
    );
};

export {OrderPage};
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./Slice/authSlice";
import {orderReducer} from "./Slice/orderSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        order:orderReducer
    }
})


export {
    store
}
import {createAsyncThunk, createSlice, isFulfilled, isPending} from "@reduxjs/toolkit";
import {IOrder, IPageOrder} from "../../Interface/orderInterface";

import {AxiosError} from "axios";
import {orderService} from "../../Service/orderService";

interface IState {
    orders: IPageOrder
    error: string | null;
    isLoading: boolean
}

const initialState: IState = {

    orders: {

        data: [],
        meta: {
            page: 0,
            total: 0
        },
        filter: ''
    },
    error: null,
    isLoading: false
}

interface IGetAllArgs {
    page?: string;
    sortBy?: string;
}


const getAll = createAsyncThunk<IPageOrder, IGetAllArgs>(
    'orderSlice/getAll',
    async ({page, sortBy}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(page, sortBy)
            return data
        } catch (e) {
            const err = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(err.response.data)
        }
    }
)

const filterParams = createAsyncThunk<IOrder, string>(
    'orderSlice/filterOrders',
    async (filterArgs, { rejectWithValue }) => {
        try {
            const { data } = await orderService.filter(filterArgs);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data ?? "Error occurred");
        }
    }
);

const orderSlice = createSlice({
    name:'orderSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.orders = action.payload
        })
        .addMatcher(isFulfilled(),(state, action)=>{
            state.isLoading =false
        })
        .addMatcher(isPending(),state=>{
            state.isLoading =true
        } )
        .addMatcher(isFulfilled(filterParams), (state) => { // Використовуємо isFulfilled з filterOrders
            state.isLoading = false;
        })
        .addMatcher(isPending(filterParams), (state) => { // Використовуємо isPending з filterOrders
            state.isLoading = true;
        }),
    }
)



const {reducer: orderReducer, actions} = orderSlice

const orderActions = {
    ...actions,
    getAll,
    filterParams
}
export {
    orderActions,
    orderReducer
}
import {createAsyncThunk, createSlice, isFulfilled, isPending} from "@reduxjs/toolkit";
import {IPageOrder} from "../../Interface/orderInterface";

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
        }
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
    }
)



const {reducer: orderReducer, actions} = orderSlice

const orderActions = {
    ...actions,
    getAll
}
export {
    orderActions,
    orderReducer
}
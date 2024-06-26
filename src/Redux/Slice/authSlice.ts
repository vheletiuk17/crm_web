import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {ITokens} from "../../Interface/tokenInterface";
import {IAuth} from "../../Interface/authInterface";
import {loginService} from "../../Service/loginService";
import {AxiosError} from "axios";


interface IState {
    user: ITokens | null,
    error: string | null
}

const initialState: IState = {
    user: null,
    error: null
}

const login = createAsyncThunk<ITokens, {user: IAuth}>(
     'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            return await loginService.login(user)
        }catch (e){

            const err = e as AxiosError;
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(login.fulfilled, (state, {payload}) => {
            state.user = payload
        })
        .addCase(login.rejected, state => {
            state.error = `Wrong email or password`
        })
        .addMatcher(isFulfilled(login), state => {
            state.error = null
        })
})


const {reducer: authReducer, actions} = authSlice

const authActions = {
    ...actions,
    login
}

export {
    authReducer,
    authActions
}
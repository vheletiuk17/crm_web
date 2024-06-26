import {store} from "../Redux/store";

type RootState = ReturnType<typeof store.getState>
type AppDispatch =  typeof  store.dispatch

export type {
    RootState,
    AppDispatch
}
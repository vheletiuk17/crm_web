import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {AppDispatch} from "../Type/hookType";
import {RootState} from "../Type/hookType";


const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>()

export {
    useAppDispatch,
    useAppSelector
}
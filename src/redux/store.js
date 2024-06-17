import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./features/loaderSlice";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
    },
    setting: {
        toggle: false,
        confirmationDialog: {},
    },
    loader: {
        isLoading: false,
    },
    userDetail: {
        data: {},
    },
    mqttDetail: {
        data: {},
    }
})
export default store;
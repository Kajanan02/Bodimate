import {configureStore} from "@reduxjs/toolkit";
import loaderSlice from "./features/loaderSlice.js";
import confirmationDialogSlice from "./features/confirmationDialogSlice.js";

const store = configureStore({
    reducer: {
        loader: loaderSlice,
        confirmationDialog: confirmationDialogSlice,
    },
    setting: {
        confirmationDialog: confirmationDialogSlice,
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
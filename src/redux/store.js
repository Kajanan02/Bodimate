import {configureStore} from "@reduxjs/toolkit";
import loaderSlice from "./features/loaderSlice.js";
import confirmationDialogSlice from "./features/confirmationDialogSlice.js";
import userDataSlice from "./features/userDataSlice.js";

const store = configureStore({
    reducer: {
        loader: loaderSlice,
        confirmationDialog: confirmationDialogSlice,
        userData: userDataSlice,
    }
})
export default store;
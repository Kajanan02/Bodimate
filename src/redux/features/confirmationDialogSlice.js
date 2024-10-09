import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    confirmationDialog: {},
};

const confirmationDialogSlice = createSlice({
    name: "confirmationDialog",
    initialState,
    reducers: {
        toggleConfirmationDialog: (state, action) => {
            state.confirmationDialog = action.payload;
        },
    },
})

export const {toggleConfirmationDialog} = confirmationDialogSlice.actions;

export default confirmationDialogSlice.reducer;

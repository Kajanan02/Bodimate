import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userDetails: {},
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        userUpdate: (state, action) => {
            state.userDetails = action.payload;
        },
    },
})

export const {userUpdate} = userDataSlice.actions;

export default userDataSlice.reducer;

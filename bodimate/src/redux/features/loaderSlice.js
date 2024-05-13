import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
})

export const {setLoading} = loaderSlice.actions;

export default loaderSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'searchValue',
    initialState: { value: {
        search: ""
    }},
    reducers: {
        searchVal: (state, action) => {
            state.value = action.payload
        }
    }
});

export const {searchVal} = searchSlice.actions;

export default searchSlice.reducer;
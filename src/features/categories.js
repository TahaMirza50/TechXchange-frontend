import {createSlice} from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {value: null},
  reducers: {
    category: (state,action) => {
      state.value = action.payload;
    }
  }
});

export const {category} = categoriesSlice.actions;

export default categoriesSlice.reducer;
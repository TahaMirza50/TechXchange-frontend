import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "userProfile",
  initialState: {value: {
    firstName: "", 
    lastName: "", 
    profileID: "", 
    notificationsID:"",
    address: "",
    contact: "",
    CNIC: "",
    rating: null,
    numberOfReviews: 0,
    socialMediaLinks: [],
    wishlist: []
  }},
  reducers: {
    profile: (state,action) => {
      state.value = action.payload;
    },
    wishlist: (state,action) => {
      state.value.wishlist = action.payload;
    }
  }
});

export const {profile,wishlist} = userSlice.actions;

export default userSlice.reducer;
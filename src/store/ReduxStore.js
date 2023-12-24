import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userProfile';
import categoryReducer from '../features/categories'

export const ReduxStore = configureStore({
  reducer: {
    userProfile: userReducer, categories: categoryReducer
  },
})

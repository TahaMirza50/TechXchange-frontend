import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userProfile';
import categoryReducer from '../features/categories'
import authReducer from '../features/auth';
import searchReducer from '../features/search';

export const ReduxStore = configureStore({
  reducer: {
    userProfile: userReducer, categories: categoryReducer, auth: authReducer, searchValue: searchReducer
  },
})

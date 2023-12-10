import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userProfile';

export const ReduxStore = configureStore({
  reducer: {userProfile: userReducer},
})

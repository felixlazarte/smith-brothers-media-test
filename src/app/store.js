import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/User/userSlice';
import dogReducer from '../features/Dog/dogSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dog: dogReducer
  },
});

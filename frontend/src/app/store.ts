import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import passengerReducer from '../features/passengers/passengerSlice';
import templateReducer from '../features/templates/templateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    passengers: passengerReducer,
    templates: templateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

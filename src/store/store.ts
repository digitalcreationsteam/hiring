import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import onboardingReducer from './slices/onboardingSlice'; // Import the onboarding reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    onboarding: onboardingReducer, // Add this line

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  _id: string;
  email: string;
  name?: string;
  role?: string;
  subscriptionTier?: 'basic' | 'premium' | null;
  hireabilityIndex?: number;
  skillIndex?: number;
  experienceIndex?: number;
  rankings?: {
    country?: number;
    state?: number;
    city?: number;
    university?: number;
  };
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const getUserFromStorage = (): UserProfile | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

const initialState: UserState = {
  profile: getUserFromStorage(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('userId', action.payload._id);
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.profile));
      }
    },
    clearUserProfile: (state) => {
      state.profile = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setUserProfile,
  updateUserProfile,
  clearUserProfile,
  setUserLoading,
  setUserError,
} = userSlice.actions;
export default userSlice.reducer;
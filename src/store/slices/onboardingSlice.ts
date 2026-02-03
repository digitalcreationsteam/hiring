// store/slices/onboardingSlice.ts
// ⭐ REPLACE YOUR ENTIRE FILE WITH THIS

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OnboardingStep =
  | "demographics"
  | "education"
  | "experience"
  | "certifications"
  | "awards"
  | "projects"
  | "skill-index-intro"
  | "paywall"
  | "job-domain"
  | "skills"
  | "assessment-intro"
  | "assessment"
  | "assessment-results";

interface NavigationState {
  nextRoute: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  isOnboardingComplete: boolean;
  hasPayment: boolean;
}

interface OnboardingState {
  navigation: NavigationState;
  isLoading: boolean;
  error: string | null;
}

const initialState: OnboardingState = {
  navigation: {
    nextRoute: "/demographics",
    currentStep: "demographics",
    completedSteps: [],
    isOnboardingComplete: false,
    hasPayment: false,
  },
  isLoading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // ✅ Set navigation from API response (login or status endpoint)
    setNavigation: (state, action: PayloadAction<NavigationState>) => {
      state.navigation = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // ✅ Update after step completion
    completeStep: (state, action: PayloadAction<OnboardingStep>) => {
      const step = action.payload;
      
      if (!state.navigation.completedSteps.includes(step)) {
        state.navigation.completedSteps.push(step);
      }

      // Don't auto-advance - wait for backend response
      // Frontend will call setNavigation with new state after save
    },

    // ✅ Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // ✅ Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // ✅ Reset on logout
    reset: () => initialState,
  },
});

export const {
  setNavigation,
  completeStep,
  setLoading,
  setError,
  reset,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
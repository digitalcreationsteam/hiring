// src/store/slices/onboardingSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API, { URL_PATH } from "../../common/API";

// ============================================
// TYPES
// ============================================
export type OnboardingStep =
  | "resume"
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
  | "assessment-results"
  | "completed";

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
  isHydrated: boolean;
  allowedRoutes: string[];
}

// ============================================
// ROUTE DEFINITIONS
// ============================================
const SECTION_2_ROUTES = [
  "/demographics",
  "/education",
  "/experience",
  "/certifications",
  "/awards",
  "/projects",
  "/skill-index-intro",
];

const SECTION_4_ROUTES = [
  "/job-domain",
  "/skills",
  "/assessment-intro",
  "/assessment",
  "/assessment-results",
];

const APP_ROUTES = [
  "/dashboard",
  "/recruiter-chats",
  "/case-assessments",
  "/chat",
  "/talent-ranking",
  "/experience-index",
  "/skill-index",
  "/hireability-index",
];

// ============================================
// STEP ORDER (Matches Backend)
// ============================================
// src/store/slices/onboardingSlice.ts

// ============================================
// STEP ORDER (Matches Your Backend Flow)
// ============================================
const STEP_ORDER: OnboardingStep[] = [
  "resume",
  "demographics",
  "education",
  "experience",
  "certifications",
  "awards",
  "projects",
  "skill-index-intro", // ✅ Added this here
  "paywall", // ✅ Paywall comes after skill-index-intro
  "job-domain", // ✅ Job-domain comes AFTER paywall
  "skills",
  "assessment-intro",
  "assessment",
  "assessment-results",
];

// ============================================
// HELPER: Calculate Allowed Routes
// ============================================
// src/store/slices/onboardingSlice.ts

// ============================================
// HELPER: Calculate Allowed Routes
// ============================================
// function calculateAllowedRoutes(navigation: NavigationState): string[] {
//   const { currentStep, completedSteps, hasPayment, isOnboardingComplete } =
//     navigation;

//   console.log("📍 [calculateAllowedRoutes] ==================");
//   console.log("📍 Input navigation:", {
//     currentStep,
//     completedSteps,
//     hasPayment,
//     isOnboardingComplete,
//   });

//   // ✅ Onboarding complete - access everything
//   // if (isOnboardingComplete) {
//   //   console.log("✅ Onboarding complete - granting full access");
//   //   const routes = [
//   //     "/upload-resume",
//   //     ...SECTION_2_ROUTES,
//   //     "/paywall",
//   //     "/payment-processing",
//   //     ...SECTION_4_ROUTES,
//   //     ...APP_ROUTES,
//   //   ];
//   //   console.log("📋 Full access routes:", routes);
//   //   return routes;
//   // }
//     if (isOnboardingComplete) {
//     return ["/dashboard", ...APP_ROUTES]; // Full access
//   }

//   // Build allowed routes based on step order
//    const allowedRoutes: string[] = ["/upload-resume"]
//   console.log("🔄 Building allowed routes based on step order");

//   // ============================================
//   // SECTION 2 ROUTES - ALWAYS ACCESSIBLE (with proper order)
//   // ============================================

//   // 1. Always allow /upload-resume (can always go back to start)
//   allowedRoutes.push("/upload-resume");
//   console.log("✅ Added base route: /upload-resume");

//   // 2. Define Section 2 steps (FREE - no payment required)
//   const section2Steps: OnboardingStep[] = [
//     "demographics",
//     "education",
//     "experience",
//     "certifications",
//     "awards",
//     "projects",
//     "skill-index-intro",
//   ];

//   // 3. Find where we are in Section 2
//   const currentStepIndex = STEP_ORDER.indexOf(currentStep);
//   console.log(
//     `📍 Current step '${currentStep}' is at index: ${currentStepIndex}`,
//   );

//   // 4. Add ALL completed Section 2 steps (allow going back)
//   console.log("🔄 Adding completed Section 2 steps (backward navigation):");
//   completedSteps.forEach((step) => {
//     if (section2Steps.includes(step as any)) {
//       const route = `/${step}`;
//       allowedRoutes.push(route);
//       console.log(`  ✅ Added completed Section 2 step: ${route}`);
//     }
//   });

//   // 5. Add current step if it's in Section 2
//   if (currentStep && section2Steps.includes(currentStep as any)) {
//     const currentRoute = `/${currentStep}`;
//     allowedRoutes.push(currentRoute);
//     console.log(`✅ Added current Section 2 step: ${currentRoute}`);
//   }

//   // 6. Add next Section 2 step (allow forward navigation WITHIN Section 2)
//   if (currentStepIndex >= 0) {
//     // Find the next step that's in Section 2
//     for (let i = currentStepIndex + 1; i < STEP_ORDER.length; i++) {
//       const nextStep = STEP_ORDER[i];
//       if (section2Steps.includes(nextStep as any)) {
//         const nextRoute = `/${nextStep}`;
//         allowedRoutes.push(nextRoute);
//         console.log(
//           `✅ Added next Section 2 step: ${nextRoute} (forward navigation)`,
//         );
//         break;
//       }
//       // If we hit job-domain, stop (Section 2 ends)
//       if (nextStep === "job-domain") {
//         break;
//       }
//     }
//   }

//   // ============================================
//   // TRANSITION TO SECTION 3 & 4
//   // ============================================

//   // 7. Check if user has completed all Section 2 steps
//   const completedSection2Steps = section2Steps.filter((step) =>
//     completedSteps.includes(step),
//   );

//   const allSection2Completed = section2Steps.every((step) =>
//     completedSteps.includes(step),
//   );

//   console.log("📊 Section 2 progress:", {
//     completed: completedSection2Steps.length,
//     total: section2Steps.length,
//     allCompleted: allSection2Completed,
//   });

//   // 8. If all Section 2 completed, allow job-domain
//   if (allSection2Completed || currentStep === "job-domain") {
//     console.log(
//       "⚠️ All Section 2 completed or on job-domain - allowing job-domain",
//     );
//     allowedRoutes.push("/job-domain");
//     console.log("✅ Added job-domain route");
//   }

//   // 9. If on job-domain, allow skills (next step)
//   if (currentStep === "job-domain") {
//     console.log("⚠️ On job-domain - allowing skills");
//     allowedRoutes.push("/skills");
//     console.log("✅ Added skills route");
//   }

//   // 10. If skills completed or current step is skills, allow paywall (if no payment)
//   if (
//     (completedSteps.includes("skills") || currentStep === "skills") &&
//     !hasPayment
//   ) {
//     console.log("⚠️ Skills completed or current - allowing paywall");
//     allowedRoutes.push("/paywall");
//     console.log("✅ Added paywall route");
//   }

//   // 11. Special paywall handling
//   if (currentStep === "paywall") {
//     console.log("⚠️ On paywall - allowing paywall and payment-processing");
//     allowedRoutes.push("/paywall");
//     allowedRoutes.push("/payment-processing");

//     // If paid, allow next steps
//     if (hasPayment) {
//       allowedRoutes.push("/assessment-intro");
//       allowedRoutes.push("/assessment");
//       console.log("✅ Paid user - allowing assessment routes");
//     }
//   }

//   // 12. If paid, allow Section 4 routes based on progress
//   if (hasPayment) {
//     const section4Steps = [
//       "assessment-intro",
//       "assessment",
//       "assessment-results",
//     ];

//     // Add completed Section 4 steps
//     completedSteps.forEach((step) => {
//       if (section4Steps.includes(step)) {
//         allowedRoutes.push(`/${step}`);
//       }
//     });

//     // Add current Section 4 step
//     if (section4Steps.includes(currentStep as any)) {
//       allowedRoutes.push(`/${currentStep}`);
//     }

//     // Add next Section 4 step
//     const currentSection4Index = section4Steps.indexOf(currentStep as any);
//     if (
//       currentSection4Index >= 0 &&
//       currentSection4Index < section4Steps.length - 1
//     ) {
//       allowedRoutes.push(`/${section4Steps[currentSection4Index + 1]}`);
//     }
//   }

//   // Remove duplicates
//   const uniqueRoutes = Array.from(new Set(allowedRoutes));

//   console.log("📊 Final allowed routes calculation:");
//   console.log("  ├─ Current Step:", currentStep);
//   console.log("  ├─ Has Payment:", hasPayment);
//   console.log("  ├─ Completed Steps:", completedSteps);
//   console.log("  ├─ All Section 2 Completed:", allSection2Completed);
//   console.log("  └─ Allowed Routes:", uniqueRoutes);
//   console.log("📍 [calculateAllowedRoutes] ==================\n");

//   return uniqueRoutes;
// }

// src/store/slices/onboardingSlice.ts

function calculateAllowedRoutes(navigation: NavigationState): string[] {
  const { currentStep, completedSteps, hasPayment, isOnboardingComplete } =
    navigation;

  console.log("📍 [calculateAllowedRoutes] ==================");
  console.log("📍 Input navigation:", {
    currentStep,
    completedSteps,
    hasPayment,
    isOnboardingComplete,
  });

  // ✅ Onboarding complete - access everything
  if (isOnboardingComplete) {
    const routes = [
      "/upload-resume",
      ...SECTION_2_ROUTES,
      "/skill-index-intro", // ✅ Add this
      "/paywall",
      "/payment-processing",
      ...SECTION_4_ROUTES,
      ...APP_ROUTES,
    ];
    return routes;
  }

  const allowedRoutes: string[] = [];

  // 1. Always allow /upload-resume
  allowedRoutes.push("/upload-resume");

  // 2. Define the complete step sequence
  const fullSequence = [
    "demographics",
    "education",
    "experience",
    "certifications",
    "awards",
    "projects",
    "skill-index-intro",
    "paywall",
    "job-domain",
    "skills",
    "assessment-intro",
    "assessment",
    "assessment-results",
  ];

  // 3. Find where we are
  const currentStepIndex = fullSequence.indexOf(currentStep as string);
  console.log(`📍 Current step '${currentStep}' at index: ${currentStepIndex}`);

  // 4. Add ALL completed steps (allow going back)
  completedSteps.forEach((step) => {
    if (step !== "resume" && fullSequence.includes(step as string)) {
      allowedRoutes.push(`/${step}`);
    }
  });

  // 5. Add current step
  if (currentStep && currentStep !== "completed") {
    allowedRoutes.push(`/${currentStep}`);
  }

  // 6. Add next step (forward navigation)
  if (currentStepIndex >= 0 && currentStepIndex < fullSequence.length - 1) {
    const nextStep = fullSequence[currentStepIndex + 1];
    allowedRoutes.push(`/${nextStep}`);
    console.log(`✅ Added next step: /${nextStep}`);
  }

  // 7. SPECIAL HANDLING FOR YOUR FLOW

  // If on projects, allow skill-index-intro
  if (currentStep === "projects" || completedSteps.includes("projects")) {
    allowedRoutes.push("/skill-index-intro");
    console.log("✅ Added skill-index-intro (after projects)");
  }

  // If on skill-index-intro, allow paywall
  if (
    currentStep === "skill-index-intro" ||
    completedSteps.includes("skill-index-intro")
  ) {
    allowedRoutes.push("/paywall");
    console.log("✅ Added paywall (after skill-index-intro)");
  }

  // If payment made, allow job-domain and beyond
  if (hasPayment) {
    console.log("💰 Payment detected - unlocking Section 4 routes");

    // Add job-domain if paywall is completed or current step is after paywall
    if (
      completedSteps.includes("paywall") ||
      currentStepIndex >= fullSequence.indexOf("paywall")
    ) {
      allowedRoutes.push("/job-domain");
      console.log("✅ Added job-domain (after payment)");
    }

    // Add skills if job-domain is completed or current
    if (completedSteps.includes("job-domain") || currentStep === "job-domain") {
      allowedRoutes.push("/skills");
    }

    // Add assessment routes based on progress
    if (completedSteps.includes("skills") || currentStep === "skills") {
      allowedRoutes.push("/assessment-intro");
    }
    if (
      completedSteps.includes("assessment-intro") ||
      currentStep === "assessment-intro"
    ) {
      allowedRoutes.push("/assessment");
    }
    if (completedSteps.includes("assessment") || currentStep === "assessment") {
      allowedRoutes.push("/assessment-results");
    }
  } else {
    // No payment yet - only allow up to paywall
    console.log("💰 No payment - limiting to pre-paywall routes");

    // If on or after paywall but no payment, restrict
    if (
      currentStepIndex >= fullSequence.indexOf("paywall") &&
      currentStep !== "paywall"
    ) {
      console.log(
        "⚠️ No payment but trying to access post-paywall route - redirecting to paywall",
      );
    }
  }

  // Remove duplicates
  const uniqueRoutes = Array.from(new Set(allowedRoutes));

  console.log("📊 Final allowed routes:", uniqueRoutes);
  console.log("📍 ==================\n");

  return uniqueRoutes;
}

// ============================================
// ASYNC THUNK: Hydrate Navigation from API
// ============================================
export const hydrateNavigation = createAsyncThunk(
  "onboarding/hydrate",
  async (_, { rejectWithValue }) => {
    console.log("🔄 [hydrateNavigation] Starting hydration from API");
    try {
      console.log("📡 Calling API: GET", URL_PATH.getUserStatus);
      const response = await API("GET", URL_PATH.getUserStatus);

      console.log("📥 API Response:", response);

      if (!response?.success || !response?.navigation) {
        console.error("❌ Invalid navigation response:", response);
        throw new Error("Invalid navigation response");
      }

      console.log("✅ Navigation data received:", response.navigation);
      return response.navigation;
    } catch (error: any) {
      console.error("❌ Hydration failed:", error);
      return rejectWithValue(error?.message || "Failed to load navigation");
    }
  },
);

// ============================================
// INITIAL STATE
// ============================================
const initialState: OnboardingState = {
  navigation: {
    nextRoute: "/upload-resume",
    currentStep: "resume",
    completedSteps: [],
    isOnboardingComplete: false,
    hasPayment: false,
  },
  isLoading: false,
  error: null,
  isHydrated: false,
  allowedRoutes: ["/upload-resume"],
};

// ============================================
// SLICE
// ============================================
const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // ✅ Set navigation from API response
    setNavigation: (state, action: PayloadAction<NavigationState>) => {
      console.log("🔄 [setNavigation] Setting navigation:", action.payload);

      state.navigation = action.payload;
      state.allowedRoutes = calculateAllowedRoutes(action.payload);
      state.isLoading = false;
      state.error = null;

      if (!state.isHydrated) {
        state.isHydrated = true;
        console.log("✅ Marked as hydrated");
      }

      console.log("📊 New state after setNavigation:", {
        navigation: state.navigation,
        allowedRoutes: state.allowedRoutes,
        isHydrated: state.isHydrated,
      });
    },

    // ✅ Mark step as complete (optimistic update)
    completeStep: (state, action: PayloadAction<OnboardingStep>) => {
      const step = action.payload;
      console.log("✅ [completeStep] Marking step as complete:", step);

      if (!state.navigation.completedSteps.includes(step)) {
        state.navigation.completedSteps.push(step);
        console.log(
          "📊 Updated completedSteps:",
          state.navigation.completedSteps,
        );

        // Recalculate allowed routes
        state.allowedRoutes = calculateAllowedRoutes(state.navigation);
        console.log("📊 Recalculated allowed routes after completion");
      } else {
        console.log("⚠️ Step already completed:", step);
      }
    },

    // ✅ Update payment status
    setPaymentStatus: (state, action: PayloadAction<boolean>) => {
      console.log(
        "💰 [setPaymentStatus] Setting payment status:",
        action.payload,
      );

      state.navigation.hasPayment = action.payload;
      state.allowedRoutes = calculateAllowedRoutes(state.navigation);

      console.log("📊 Recalculated allowed routes after payment update");
    },

    // ✅ Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log("⏳ [setLoading] Setting loading to:", action.payload);
      state.isLoading = action.payload;
    },

    // ✅ Set error
    setError: (state, action: PayloadAction<string | null>) => {
      console.log("❌ [setError] Setting error:", action.payload);
      state.error = action.payload;
    },

    // ✅ Reset on logout
    resetOnboarding: () => {
      console.log("🔄 [resetOnboarding] Resetting to initial state");
      return initialState;
    },
  },

  // ============================================
  // ASYNC THUNK HANDLERS
  // ============================================
  extraReducers: (builder) => {
    builder
      // Hydration pending
      .addCase(hydrateNavigation.pending, (state) => {
        console.log("⏳ [hydrateNavigation] Pending");
        state.isLoading = true;
        state.error = null;
      })

      // Hydration success
      .addCase(hydrateNavigation.fulfilled, (state, action) => {
        console.log("✅ [hydrateNavigation] Fulfilled with:", action.payload);

        state.navigation = action.payload;
        state.allowedRoutes = calculateAllowedRoutes(action.payload);
        state.isHydrated = true;
        state.isLoading = false;
        state.error = null;

        console.log("📊 Final hydrated state:", {
          navigation: state.navigation,
          allowedRoutes: state.allowedRoutes,
          isHydrated: state.isHydrated,
        });
      })

      // Hydration failed
      .addCase(hydrateNavigation.rejected, (state, action) => {
        console.error("❌ [hydrateNavigation] Rejected:", action.payload);

        state.error = action.payload as string;
        state.isLoading = false;
        state.isHydrated = true; // Mark as hydrated even on error to prevent infinite loading

        console.log(
          "⚠️ Hydration failed but marked as hydrated to prevent infinite loading",
        );
      });
  },
});

// ============================================
// EXPORTS
// ============================================
export const {
  setNavigation,
  completeStep,
  setPaymentStatus,
  setLoading,
  setError,
  resetOnboarding,
} = onboardingSlice.actions;

// ✅ SELECTORS
export const selectNavigation = (state: { onboarding: OnboardingState }) => {
  const nav = state.onboarding.navigation;
  console.log("🔍 [selectNavigation] Current navigation:", nav);
  return nav;
};

export const selectIsHydrated = (state: { onboarding: OnboardingState }) => {
  const hydrated = state.onboarding.isHydrated;
  console.log("🔍 [selectIsHydrated] Is hydrated:", hydrated);
  return hydrated;
};

export const selectIsLoading = (state: { onboarding: OnboardingState }) => {
  const loading = state.onboarding.isLoading;
  console.log("🔍 [selectIsLoading] Is loading:", loading);
  return loading;
};

export const selectAllowedRoutes = (state: { onboarding: OnboardingState }) => {
  const routes = state.onboarding.allowedRoutes;
  console.log("🔍 [selectAllowedRoutes] Allowed routes:", routes);
  return routes;
};

export const selectHasPayment = (state: { onboarding: OnboardingState }) => {
  const hasPayment = state.onboarding.navigation.hasPayment;
  console.log("🔍 [selectHasPayment] Has payment:", hasPayment);
  return hasPayment;
};

export const selectCurrentStep = (state: { onboarding: OnboardingState }) => {
  const step = state.onboarding.navigation.currentStep;
  console.log("🔍 [selectCurrentStep] Current step:", step);
  return step;
};

export const selectIsComplete = (state: { onboarding: OnboardingState }) => {
  const complete = state.onboarding.navigation.isOnboardingComplete;
  console.log("🔍 [selectIsComplete] Is complete:", complete);
  return complete;
};

export const selectCompletedSteps = (state: {
  onboarding: OnboardingState;
}) => {
  const steps = state.onboarding.navigation.completedSteps;
  console.log("🔍 [selectCompletedSteps] Completed steps:", steps);
  return steps;
};

export const selectNextRoute = (state: { onboarding: OnboardingState }) => {
  const route = state.onboarding.navigation.nextRoute;
  console.log("🔍 [selectNextRoute] Next route:", route);
  return route;
};

// ✅ DEBUG SELECTOR - combines all for easy debugging
export const selectDebugInfo = (state: { onboarding: OnboardingState }) => {
  const debug = {
    currentStep: state.onboarding.navigation.currentStep,
    completedSteps: state.onboarding.navigation.completedSteps,
    hasPayment: state.onboarding.navigation.hasPayment,
    allowedRoutes: state.onboarding.allowedRoutes,
    isHydrated: state.onboarding.isHydrated,
    isLoading: state.onboarding.isLoading,
    isComplete: state.onboarding.navigation.isOnboardingComplete,
    nextRoute: state.onboarding.navigation.nextRoute,
  };
  console.log("🔍 [selectDebugInfo] Full debug info:", debug);
  return debug;
};

export default onboardingSlice.reducer;

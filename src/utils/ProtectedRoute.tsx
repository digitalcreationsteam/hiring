// src/utils/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import {
  selectIsHydrated,
  selectAllowedRoutes,
  selectHasPayment,
  selectIsComplete,
  selectCurrentStep,
  selectCompletedSteps,
  selectDebugInfo,
} from "../store/slices/onboardingSlice";
import { isAuthenticated } from "./authUtils";

interface ProtectedRouteProps {
  children: React.ReactElement;
  requirePayment?: boolean; // For Section 4 routes
  requireComplete?: boolean; // For app routes (dashboard, etc)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requirePayment = false,
  requireComplete = false,
}) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const isHydrated = useAppSelector(selectIsHydrated);
  const allowedRoutes = useAppSelector(selectAllowedRoutes);
  const hasPayment = useAppSelector(selectHasPayment);
  const isComplete = useAppSelector(selectIsComplete);
  const currentStep = useAppSelector(selectCurrentStep);
  const completedSteps = useAppSelector(selectCompletedSteps);

  // Debug info
  const debug = useAppSelector(selectDebugInfo);
  console.log("🔍 [ProtectedRoute] ==================");
  console.log("🔍 Path:", location.pathname);
  console.log("🔍 Debug Info:", debug);
  console.log("🔍 Completed Steps:", completedSteps);
  console.log("🔍 Allowed Routes:", allowedRoutes);
  console.log("🔍 Has Payment:", hasPayment);
  console.log("🔍 Require Payment Prop:", requirePayment);
  console.log("🔍 Current Step from Redux:", currentStep);
  console.log("🔍 ==================");

  // ============================================
  // 1. CHECK AUTHENTICATION
  // ============================================
  if (!isAuth) {
    console.log("🚫 [ProtectedRoute] Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ============================================
  // 2. WAIT FOR HYDRATION
  // ============================================
  if (!isHydrated) {
    console.log("⏳ [ProtectedRoute] Waiting for hydration...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // YOUR SPECIFIC FLOW HANDLING
  // ============================================

  // Define your sequence (matches your actual flow)
  const stepSequence = [
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

  console.log("📋 [ProtectedRoute] Step Sequence Check:");
  console.log(
    "📋 Current Step Index:",
    stepSequence.indexOf(currentStep as string),
  );
  console.log("📋 Job-domain Index:", stepSequence.indexOf("job-domain"));
  console.log(
    "📋 Skill-index-intro Index:",
    stepSequence.indexOf("skill-index-intro"),
  );

  // ============================================
  // HANDLE SKILL-INDEX-INTRO ACCESS
  // ============================================
  if (location.pathname === "/skill-index-intro") {
    console.log("🎯 [ProtectedRoute] Attempting to access /skill-index-intro");

    const hasCompletedProjects = completedSteps.includes("projects");
    console.log("📊 Has completed projects:", hasCompletedProjects);

    if (!hasCompletedProjects) {
      console.log(
        "🚫 [ProtectedRoute] Need to complete projects first before skill-index-intro",
      );
      console.log("🔄 Redirecting to /projects");
      return <Navigate to="/projects" replace />;
    }

    console.log("✅ [ProtectedRoute] Access granted to skill-index-intro");
    return children;
  }

  // ============================================
  // HANDLE PAYWALL ACCESS
  // ============================================
  // src/utils/ProtectedRoute.tsx

  // ============================================
  // HANDLE PAYWALL ACCESS - FIXED VERSION
  // ============================================
  if (location.pathname === "/paywall") {
    console.log("💰 [ProtectedRoute] ===== PAYWALL ACCESS ATTEMPT =====");
    console.log("💰 Path:", location.pathname);
    console.log("💰 Has payment:", hasPayment);
    console.log("💰 Current step:", currentStep);
    console.log("💰 Completed steps:", completedSteps);
    console.log("💰 Allowed routes:", allowedRoutes);

    // If user already has payment, they shouldn't be on paywall
    if (hasPayment) {
      console.log(
        "✅ [ProtectedRoute] User has payment, redirecting from paywall to job-domain",
      );
      return <Navigate to="/job-domain" replace />;
    }

    // Check if they've completed skill-index-intro
    const hasCompletedSkillIndexIntro =
      completedSteps.includes("skill-index-intro");
    console.log(
      "📊 Has completed skill-index-intro:",
      hasCompletedSkillIndexIntro,
    );

    // Also check if they've completed projects (prerequisite for skill-index-intro)
    const hasCompletedProjects = completedSteps.includes("projects");
    console.log("📊 Has completed projects:", hasCompletedProjects);

    if (!hasCompletedSkillIndexIntro) {
      console.log(
        "🚫 [ProtectedRoute] Cannot access paywall - need to complete skill-index-intro first",
      );

      // If they've completed projects but not skill-index-intro, go to skill-index-intro
      if (hasCompletedProjects) {
        console.log("🔄 [ProtectedRoute] Redirecting to skill-index-intro");
        return <Navigate to="/skill-index-intro" replace />;
      } else {
        // Find first incomplete step
        const firstIncomplete = stepSequence.find(
          (step) => !completedSteps.includes(step as any),
        );
        const redirectTo = firstIncomplete
          ? `/${firstIncomplete}`
          : "/projects";
        console.log(
          "🔄 [ProtectedRoute] Redirecting to first incomplete step:",
          redirectTo,
        );
        return <Navigate to={redirectTo} replace />;
      }
    }

    // Check if paywall is in allowed routes
    const isPaywallAllowed = allowedRoutes.includes("/paywall");
    console.log("📊 Is paywall in allowedRoutes?:", isPaywallAllowed);

    if (!isPaywallAllowed) {
      console.log(
        "⚠️ [ProtectedRoute] Paywall not in allowedRoutes but prerequisites met",
      );
      console.log(
        "🔄 Still allowing access to paywall - this is the correct step",
      );
      // Allow access anyway since prerequisites are met
      console.log("✅ [ProtectedRoute] Access granted to paywall");
      return children;
    }

    console.log("✅ [ProtectedRoute] Access granted to paywall");
    return children;
  }
  // ============================================
  // HANDLE PAYMENT PROCESSING
  // ============================================
  if (location.pathname === "/payment-processing") {
    console.log("💳 [ProtectedRoute] Accessing payment processing");
    return children;
  }

  // ============================================
  // HANDLE JOB-DOMAIN ACCESS
  // ============================================
  if (location.pathname === "/job-domain") {
    console.log("💼 [ProtectedRoute] ===== JOB-DOMAIN ACCESS ATTEMPT =====");
    console.log("💼 Has payment:", hasPayment);
    console.log("💼 Current step from Redux:", currentStep);
    console.log("💼 Completed steps:", completedSteps);
    console.log("💼 Allowed routes:", allowedRoutes);
    console.log("💼 Require payment prop:", requirePayment);

    // Check if job-domain is in allowedRoutes
    const isJobDomainAllowed = allowedRoutes.includes("/job-domain");
    console.log("💼 Is job-domain in allowedRoutes?:", isJobDomainAllowed);

    // Check if trying to access job-domain without payment
    if (!hasPayment) {
      console.log(
        "🚫 [ProtectedRoute] Cannot access job-domain without payment",
      );

      // Check if they've completed up to skill-index-intro
      const hasCompletedProjects = completedSteps.includes("projects");
      const hasCompletedSkillIndexIntro =
        completedSteps.includes("skill-index-intro");

      console.log("📊 Has completed projects:", hasCompletedProjects);
      console.log(
        "📊 Has completed skill-index-intro:",
        hasCompletedSkillIndexIntro,
      );

      const hasCompletedPrePaywallSteps =
        hasCompletedProjects && hasCompletedSkillIndexIntro;
      console.log(
        "📊 Has completed pre-paywall steps (projects + skill-index-intro):",
        hasCompletedPrePaywallSteps,
      );

      if (hasCompletedPrePaywallSteps) {
        console.log(
          "✅ [ProtectedRoute] Pre-paywall steps complete - should go to paywall",
        );
        console.log("🔄 Redirecting to paywall");
        return <Navigate to="/paywall" replace />;
      } else {
        // Find first incomplete step
        console.log("🔍 [ProtectedRoute] Looking for first incomplete step...");
        const firstIncomplete = stepSequence.find(
          (step) => !completedSteps.includes(step as any),
        );
        console.log("🔍 First incomplete step:", firstIncomplete);

        let redirectTo = "/projects";
        if (firstIncomplete) {
          redirectTo = `/${firstIncomplete}`;
        }

        console.log(
          "🔄 [ProtectedRoute] Redirecting to incomplete step:",
          redirectTo,
        );
        return <Navigate to={redirectTo} replace />;
      }
    }

    // If has payment but job-domain not in allowedRoutes
    if (hasPayment && !isJobDomainAllowed) {
      console.log(
        "⚠️ [ProtectedRoute] Has payment but job-domain not in allowedRoutes",
      );
      console.log("🔄 Redirecting to current step:", currentStep);
      return <Navigate to={`/${currentStep}`} replace />;
    }

    console.log("✅ [ProtectedRoute] Access granted to job-domain");
    // Don't return here - let it continue to other checks
  }

  // ============================================
  // CHECK PAYMENT REQUIREMENT (for Section 4 routes)
  // ============================================
  if (requirePayment && !hasPayment) {
    console.log("🚫 [ProtectedRoute] Payment required for:", location.pathname);
    console.log("📊 Has payment:", hasPayment);
    console.log("📊 RequirePayment prop is true, but hasPayment is false");

    // Check if they've completed skill-index-intro
    const hasCompletedSkillIndexIntro =
      completedSteps.includes("skill-index-intro");
    console.log(
      "📊 Has completed skill-index-intro:",
      hasCompletedSkillIndexIntro,
    );

    if (!hasCompletedSkillIndexIntro) {
      console.log("🔄 [ProtectedRoute] Redirecting to skill-index-intro first");
      return <Navigate to="/skill-index-intro" replace />;
    }

    console.log("🔄 [ProtectedRoute] Redirecting to paywall");
    return <Navigate to="/paywall" replace />;
  }

  // ============================================
  // CHECK IF ROUTE IS ALLOWED (based on allowedRoutes from Redux)
  // ============================================
  const currentPath = location.pathname;
  console.log("🔍 [ProtectedRoute] Checking if route is allowed:", currentPath);
  console.log("🔍 [ProtectedRoute] Against allowed routes:", allowedRoutes);

  const isAllowed = allowedRoutes.some((route) => {
    if (route === currentPath) return true;
    if (currentPath.startsWith(route + "/")) return true;
    return false;
  });

  if (!isAllowed) {
    console.log("🚫 [ProtectedRoute] Route not allowed:", currentPath);
    console.log("✅ [ProtectedRoute] Allowed routes:", allowedRoutes);

    // Determine where to redirect
    let redirectTo = "/upload-resume";

    if (currentStep && currentStep !== "completed") {
      redirectTo = `/${currentStep}`;
      console.log(
        "🔄 [ProtectedRoute] Redirecting to current step:",
        redirectTo,
      );
    } else if (allowedRoutes.length > 0) {
      redirectTo = allowedRoutes[allowedRoutes.length - 1];
      console.log(
        "🔄 [ProtectedRoute] Redirecting to last allowed route:",
        redirectTo,
      );
    }

    return <Navigate to={redirectTo} replace />;
  }

  // ============================================
  // CHECK ONBOARDING COMPLETE (for app routes like dashboard)
  // ============================================
  if (requireComplete && !isComplete) {
    console.log(
      "🚫 [ProtectedRoute] Onboarding not complete, but route requires completion:",
      location.pathname,
    );
    const redirectTo = currentStep ? `/${currentStep}` : "/upload-resume";
    console.log("🔄 [ProtectedRoute] Redirecting to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  // ============================================
  // ✅ ALL CHECKS PASSED
  // ============================================
  console.log(
    "✅ [ProtectedRoute] All checks passed, rendering:",
    location.pathname,
  );
  console.log("🔍 [ProtectedRoute] ==================\n");

  return children;
};

export default ProtectedRoute;

// "use client";

// import React from "react";
// import { Button } from "../ui/components/Button";
// import { IconButton } from "../ui/components/IconButton";
// import HeaderLogo from "src/ui/components/HeaderLogo";
// import { IconWithBackground } from "../ui/components/IconWithBackground";
// import { FeatherArrowLeft } from "@subframe/core";
// import { FeatherInfo } from "@subframe/core";
// import { useNavigate } from "react-router-dom";
// import { colors } from "src/common/Colors";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "../ui/components/Footer";

// function SkillIndexIntro() {
//   const navigate = useNavigate();

//   // In SkillIndexIntro.tsx - Add logging
// const handleProceedToPaywall = () => {
//   console.log("🔄 [SkillIndexIntro] Navigating to /paywall");
//   console.log("📊 Current completed steps from Redux will be checked in ProtectedRoute");
//   navigate("/paywall");
// };

// // In the button:
// <Button
//   size="large"
//   onClick={handleProceedToPaywall}
//   className="..."
//   style={{
//     backgroundColor: colors.accent,
//     color: colors.background,
//   }}
// >
//   Proceed to Payment
// </Button>
//   return (
//     <>
//     <Navbar />
//      {/* 🎨 Linear gradient background - fixed behind everything */}
//     <div
//       className="pointer-events-none fixed inset-0 -z-10"
//       style={{
//         background: `linear-gradient(
//           to bottom,
//           #d9d9d9 0%,
//           #cfd3d6 25%,
//           #9aa6b2 55%,
//           #2E4056 100%
//         )`,
//         width: "100%",
//       }}
//     />

//  <div className="w-full max-w-[660px] mx-auto relative">
//   <div
//     className="flex w-full flex-col items-start gap-9 rounded-3xl px-5 sm:px-8 md:px-10 py-8 sm:py-12 md:py-14 shadow-lg"
//     style={{
//       backgroundColor: colors.white,
//       border: `1px solid ${colors.neutral[200]}`,
//     }}
//   >
//          <div className="flex w-full items-center gap-3">
//   <IconButton
//     size="small"
//     icon={<FeatherArrowLeft />}
//     onClick={() => navigate(-1)}
//   />

//   <div className="flex flex-1 items-center gap-2">
//     <div
//       className="h-1 flex-1 rounded-full"
//       style={{ backgroundColor: colors.primary }}
//     />
//     {[1, 2, 3, 4].map((step) => (
//       <div
//         key={step}
//         className="h-1 flex-1 rounded-full"
//         style={{ backgroundColor: colors.neutral[200] }}
//       />
//     ))}
//   </div>
// </div>

//           <div className="flex w-full flex-col items-start gap-3">
//             <h2 className="text-xl sm:text-2xl md:text-[30px] text-neutral-900">
//               Now let's calculate your Skill Index
//             </h2>

//             <p className="text-xs sm:text-sm text-neutral-500">
//               The Skill Index is the foundation of UniTalent’s hiring system and
//               the most important step in your evaluation. It provides evidence
//               of job readiness and role-relevant knowledge, enabling
//               transparent, skill-first hiring
//             </p>
//           </div>

// <div className="flex w-full flex-col items-start gap-6">
//   <span
//     className="text-heading-3 font-semibold"
//     style={{ color: colors.neutral[800] }}
//   >
//     What happens next
//   </span>

//   {/* Step 1 */}
//   <div className="flex items-start gap-4">
//     <div
//       className="mt-1 h-6 w-6 rounded-full shrink-0"
//       style={{ backgroundColor: colors.primaryGlow }}
//     />
//     <div className="flex flex-col gap-1">
//       <p className="text-sm font-medium" style={{ color: colors.neutral[800] }}>
//         Choose your job domain
//       </p>
//       <p className="text-xs" style={{ color: colors.neutral[600] }}>
//         You will be asked to select your primary job domain — the role
//         you want to be evaluated for.
//       </p>
//     </div>
//   </div>

//   {/* Step 2 */}
//   <div className="flex items-start gap-4">
//     <div
//       className="mt-1 h-6 w-6 rounded-full shrink-0"
//       style={{ backgroundColor: colors.primaryGlow }}
//     />
//     <div className="flex flex-col gap-1">
//       <p className="text-sm font-medium" style={{ color: colors.neutral[800] }}>
//         Take the Skill Index Assessment
//       </p>
//       <p className="text-xs" style={{ color: colors.neutral[600] }}>
//         You will complete a focused, role-specific assessment designed
//         to objectively evaluate your readiness for this role.
//       </p>
//     </div>
//   </div>

//   {/* Step 3 */}
//   <div className="flex items-start gap-4">
//     <div
//       className="mt-1 h-6 w-6 rounded-full shrink-0"
//       style={{ backgroundColor: colors.primaryGlow }}
//     />
//     <div className="flex flex-col gap-1">
//       <p className="text-sm font-medium" style={{ color: colors.neutral[800] }}>
//         Get your Hireability Score
//       </p>
//       <p className="text-xs" style={{ color: colors.neutral[600] }}>
//         Your performance here directly impacts how recruiters
//         discover, evaluate, and rank your profile on UniTalent.
//       </p>
//     </div>
//   </div>

//   {/* Note Box */}
//   <div
//     className="w-full rounded-2xl border px-4 sm:px-6 py-4 sm:py-5 backdrop-blur-sm"
//     style={{
//       backgroundColor: `${colors.primaryGlow}CC`,
//       borderColor: colors.primary,
//     }}
//   >
//     <div className="flex items-start gap-4">
//       <div
//         className="flex h-8 w-8 items-center justify-center rounded-full"
//         style={{ backgroundColor: colors.primary }}
//       >
//         <FeatherInfo className="h-4 w-4" style={{ color: colors.white }} />
//       </div>

//       <div className="flex flex-col gap-1">
//         <p className="text-sm font-medium" style={{ color: colors.neutral[800] }}>
//           Note :
//         </p>
//         <p
//           className="text-xs leading-relaxed max-w-[560px]"
//           style={{ color: colors.neutral[600] }}
//         >
//           This is the most critical part of the process.
//           <br /> Recruiters rely on the Skill Index to make decisions.
//           <br /> Your performance here determines how you stand among
//           others competing for the same roles.
//         </p>
//       </div>
//     </div>
//   </div>
// </div>

// <div
//   className="flex w-full flex-col items-stretch gap-3 sm:gap-4 border-t pt-5 sm:pt-6"
//   style={{ borderColor: colors.neutral[200] }}
// >
//   <Button
//     size="large"
//     onClick={() => navigate("/paywall")}
//     className="
//       w-full
//       h-10 sm:h-11
//       rounded-2xl
//       text-sm sm:text-base
//       font-semibold
//       transition
//       active:scale-[0.99]
//     "
//     style={{
//       backgroundColor: colors.accent,
//       color: colors.background,
//     }}
//   >
//     Proceed to Skill Index Assessment
//   </Button>

//   <button
//     onClick={() => navigate("/dashboard")}
//     className="w-full text-center text-xs sm:text-sm font-medium transition"
//     style={{ color: colors.neutral[600] }}
//   >
//     Skip for now
//   </button>
// </div>

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SkillIndexIntro;
// "use client";

// import React, { useEffect } from "react";
// import { Button } from "../ui/components/Button";
// import { useAppDispatch } from "../store/hooks";
// import { IconButton } from "../ui/components/IconButton";
// import HeaderLogo from "src/ui/components/HeaderLogo";
// import { IconWithBackground } from "../ui/components/IconWithBackground";
// import { FeatherArrowLeft } from "@subframe/core";
// import { FeatherInfo } from "@subframe/core";
// import { useNavigate } from "react-router-dom";
// import { colors } from "src/common/Colors";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "../ui/components/Footer";
// import { useAppSelector } from "../store/hooks";
// import {
//   selectCompletedSteps,
//   completeStep,
// } from "../store/slices/onboardingSlice";

// function SkillIndexIntro() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const completedSteps = useAppSelector(selectCompletedSteps);
//   // Check if user has completed projects (prerequisite)
//   const hasCompletedProjects = completedSteps.includes("projects");

//   useEffect(() => {
//     console.log("📊 [SkillIndexIntro] Mounted - Checking prerequisites");
//     console.log("📊 Completed steps:", completedSteps);

//     // Mark skill-index-intro as completed when user views this page
//     if (!completedSteps.includes("skill-index-intro")) {
//       console.log(
//         "✅ [SkillIndexIntro] Marking skill-index-intro as completed",
//       );
//       dispatch(completeStep("skill-index-intro"));
//     }

//     const hasCompletedProjects = completedSteps.includes("projects");
//     console.log("📊 Has completed projects:", hasCompletedProjects);

//     if (!hasCompletedProjects) {
//       console.log("⚠️ [SkillIndexIntro] User hasn't completed projects yet!");
//       console.log("🔄 Redirecting to /projects");
//       navigate("/projects", { replace: true });
//     }
//   }, [completedSteps, dispatch, navigate]);

//   const handleProceedToPaywall = () => {
//     console.log("🔄 [SkillIndexIntro] Navigating to /paywall");
//     console.log("📊 Current completed steps:", completedSteps);

//     // Double-check prerequisites before navigating
//     if (!hasCompletedProjects) {
//       console.log(
//         "🚫 [SkillIndexIntro] Cannot proceed - projects not completed",
//       );
//       navigate("/projects", { replace: true });
//       return;
//     }

//     navigate("/paywall");
//   };

//   const handleSkip = () => {
//     console.log("⏭️ [SkillIndexIntro] Skipping to dashboard");
//     navigate("/dashboard");
//   };

//   const handleGoBack = () => {
//     console.log("⬅️ [SkillIndexIntro] Going back");
//     navigate(-1);
//   };

//   return (
//     <>
//       <Navbar />
//       {/* 🎨 Linear gradient background - fixed behind everything */}
//       <div
//         className="pointer-events-none fixed inset-0 -z-10"
//         style={{
//           background: `linear-gradient(
//             to bottom,
//             #d9d9d9 0%,
//             #cfd3d6 25%,
//             #9aa6b2 55%,
//             #2E4056 100%
//           )`,
//           width: "100%",
//         }}
//       />

//       <div className="w-full max-w-[660px] mx-auto relative">
//         <div
//           className="flex w-full flex-col items-start gap-9 rounded-3xl px-5 sm:px-8 md:px-10 py-8 sm:py-12 md:py-14 shadow-lg"
//           style={{
//             backgroundColor: colors.white,
//             border: `1px solid ${colors.neutral[200]}`,
//           }}
//         >
//           <div className="flex w-full items-center gap-3">
//             <IconButton
//               size="small"
//               icon={<FeatherArrowLeft />}
//               onClick={handleGoBack}
//             />

//             <div className="flex flex-1 items-center gap-2">
//               <div
//                 className="h-1 flex-1 rounded-full"
//                 style={{ backgroundColor: colors.primary }}
//               />
//               {[1, 2, 3, 4].map((step) => (
//                 <div
//                   key={step}
//                   className="h-1 flex-1 rounded-full"
//                   style={{ backgroundColor: colors.neutral[200] }}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="flex w-full flex-col items-start gap-3">
//             <h2 className="text-xl sm:text-2xl md:text-[30px] text-neutral-900">
//               Now let's calculate your Skill Index
//             </h2>

//             <p className="text-xs sm:text-sm text-neutral-500">
//               The Skill Index is the foundation of UniTalent's hiring system and
//               the most important step in your evaluation. It provides evidence
//               of job readiness and role-relevant knowledge, enabling
//               transparent, skill-first hiring
//             </p>
//           </div>

//           <div className="flex w-full flex-col items-start gap-6">
//             <span
//               className="text-heading-3 font-semibold"
//               style={{ color: colors.neutral[800] }}
//             >
//               What happens next
//             </span>

//             {/* Step 1 */}
//             <div className="flex items-start gap-4">
//               <div
//                 className="mt-1 h-6 w-6 rounded-full shrink-0"
//                 style={{ backgroundColor: colors.primaryGlow }}
//               />
//               <div className="flex flex-col gap-1">
//                 <p
//                   className="text-sm font-medium"
//                   style={{ color: colors.neutral[800] }}
//                 >
//                   Choose your job domain
//                 </p>
//                 <p className="text-xs" style={{ color: colors.neutral[600] }}>
//                   You will be asked to select your primary job domain — the role
//                   you want to be evaluated for.
//                 </p>
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div className="flex items-start gap-4">
//               <div
//                 className="mt-1 h-6 w-6 rounded-full shrink-0"
//                 style={{ backgroundColor: colors.primaryGlow }}
//               />
//               <div className="flex flex-col gap-1">
//                 <p
//                   className="text-sm font-medium"
//                   style={{ color: colors.neutral[800] }}
//                 >
//                   Take the Skill Index Assessment
//                 </p>
//                 <p className="text-xs" style={{ color: colors.neutral[600] }}>
//                   You will complete a focused, role-specific assessment designed
//                   to objectively evaluate your readiness for this role.
//                 </p>
//               </div>
//             </div>

//             {/* Step 3 */}
//             <div className="flex items-start gap-4">
//               <div
//                 className="mt-1 h-6 w-6 rounded-full shrink-0"
//                 style={{ backgroundColor: colors.primaryGlow }}
//               />
//               <div className="flex flex-col gap-1">
//                 <p
//                   className="text-sm font-medium"
//                   style={{ color: colors.neutral[800] }}
//                 >
//                   Get your Hireability Score
//                 </p>
//                 <p className="text-xs" style={{ color: colors.neutral[600] }}>
//                   Your performance here directly impacts how recruiters
//                   discover, evaluate, and rank your profile on UniTalent.
//                 </p>
//               </div>
//             </div>

//             {/* Note Box */}
//             <div
//               className="w-full rounded-2xl border px-4 sm:px-6 py-4 sm:py-5 backdrop-blur-sm"
//               style={{
//                 backgroundColor: `${colors.primaryGlow}CC`,
//                 borderColor: colors.primary,
//               }}
//             >
//               <div className="flex items-start gap-4">
//                 <div
//                   className="flex h-8 w-8 items-center justify-center rounded-full"
//                   style={{ backgroundColor: colors.primary }}
//                 >
//                   <FeatherInfo
//                     className="h-4 w-4"
//                     style={{ color: colors.white }}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                   <p
//                     className="text-sm font-medium"
//                     style={{ color: colors.neutral[800] }}
//                   >
//                     Note :
//                   </p>
//                   <p
//                     className="text-xs leading-relaxed max-w-[560px]"
//                     style={{ color: colors.neutral[600] }}
//                   >
//                     This is the most critical part of the process.
//                     <br /> Recruiters rely on the Skill Index to make decisions.
//                     <br /> Your performance here determines how you stand among
//                     others competing for the same roles.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div
//             className="flex w-full flex-col items-stretch gap-3 sm:gap-4 border-t pt-5 sm:pt-6"
//             style={{ borderColor: colors.neutral[200] }}
//           >
//             <Button
//               size="large"
//               onClick={handleProceedToPaywall}
//               className="
//                 w-full
//                 h-10 sm:h-11
//                 rounded-2xl
//                 text-sm sm:text-base
//                 font-semibold
//                 transition
//                 active:scale-[0.99]
//               "
//               style={{
//                 backgroundColor: colors.accent,
//                 color: colors.background,
//               }}
//             >
//               Proceed to Skill Index Assessment
//             </Button>

//             <button
//               onClick={handleSkip}
//               className="w-full text-center text-xs sm:text-sm font-medium transition"
//               style={{ color: colors.neutral[600] }}
//             >
//               Skip for now
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SkillIndexIntro;

// src/components/SkillIndexIntro.tsx
// src/components/SkillIndexIntro.tsx
// src/components/SkillIndexIntro.tsx
// src/components/SkillIndexIntro.tsx
"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/components/Button";
import { useAppDispatch } from "../store/hooks";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherInfo } from "@subframe/core";
import { useNavigate } from "react-router-dom";
import { colors } from "src/common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";
import { useAppSelector } from "../store/hooks";
import {
  selectCompletedSteps,
  completeStep,
} from "../store/slices/onboardingSlice";

function SkillIndexIntro() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const completedSteps = useAppSelector(selectCompletedSteps);
  // Check if user has completed projects (prerequisite)
  const hasCompletedProjects = completedSteps.includes("projects");

  useEffect(() => {
    console.log("📊 [SkillIndexIntro] Mounted - Checking prerequisites");
    console.log("📊 Completed steps:", completedSteps);

    // Mark skill-index-intro as completed when user views this page
    if (!completedSteps.includes("skill-index-intro")) {
      console.log(
        "✅ [SkillIndexIntro] Marking skill-index-intro as completed",
      );
      dispatch(completeStep("skill-index-intro"));
    }

    const hasCompletedProjects = completedSteps.includes("projects");
    console.log("📊 Has completed projects:", hasCompletedProjects);

    if (!hasCompletedProjects) {
      console.log("⚠️ [SkillIndexIntro] User hasn't completed projects yet!");
      console.log("🔄 Redirecting to /projects");
      navigate("/projects", { replace: true });
    }
  }, [completedSteps, dispatch, navigate]);

  const handleProceedToPaywall = () => {
    console.log("🔄 [SkillIndexIntro] Navigating to /paywall");
    console.log("📊 Current completed steps:", completedSteps);

    // Double-check prerequisites before navigating
    if (!hasCompletedProjects) {
      console.log(
        "🚫 [SkillIndexIntro] Cannot proceed - projects not completed",
      );
      navigate("/projects", { replace: true });
      return;
    }

    navigate("/paywall");
  };

  const handleSkip = () => {
    console.log("⏭️ [SkillIndexIntro] Skipping to dashboard");
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    console.log("⬅️ [SkillIndexIntro] Going back");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 relative overflow-hidden">
      {/* Background Gradient Effects for Glass */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.primary }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.secondary || colors.primary }}
        />
      </div>

      <Navbar />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Simple header with progress */}
        <div className="flex items-center gap-3 mb-8 max-w-[660px] mx-auto">
          <IconButton
            size="small"
            icon={<FeatherArrowLeft />}
            onClick={handleGoBack}
            className="text-neutral-600 hover:text-neutral-900 bg-white/50 backdrop-blur-sm border border-white/20"
          />
          <div className="flex-1 flex items-center gap-1">
            <div className="h-1 flex-1 bg-neutral-200/50 backdrop-blur-sm rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: "100%", backgroundColor: colors.primary }}
              />
            </div>
            <span className="text-xs text-neutral-500 ml-2 bg-white/30 backdrop-blur-sm px-2 py-1 rounded-full">
              Complete
            </span>
          </div>
        </div>

        {/* Main content - Glass Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-[660px]">
            <div
              className="backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
              style={{
                backgroundColor: `${colors.white}CC`, // CC = 80% opacity
                border: `1px solid ${colors.white}`,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)",
              }}
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

              {/* Content with relative z-index to appear above the glass effects */}
              <div className="relative z-10">
                {/* Illustration from public folder */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-white/30 backdrop-blur-sm">
                    <img
                      src="/skill-index-illustration.svg"
                      alt="Skill Index Assessment Illustration"
                      className="w-48 h-48 object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h1 className="text-2xl font-light text-neutral-900 mb-2">
                    Now let's calculate your Skill Index
                  </h1>
                  <p className="text-sm text-neutral-600 font-light backdrop-blur-sm bg-white/30 p-3 rounded-xl">
                    The Skill Index is the foundation of UniTalent's hiring
                    system and the most important step in your evaluation. It
                    provides evidence of job readiness and role-relevant
                    knowledge, enabling transparent, skill-first hiring
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-sm font-medium text-neutral-500 mb-3 backdrop-blur-sm bg-white/30 px-3 py-1 rounded-full inline-block">
                    WHAT HAPPENS NEXT
                  </h2>

                  {/* Step 1 - Blue/Purple Neon */}
                  <div className="group flex gap-4 p-3 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      {/* Main circle */}
                      <div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}, #8B5CF6)`,
                          color: "white",
                          boxShadow: `0 4px 15px ${colors.primary}60`,
                        }}
                      >
                        1
                      </div>
                      {/* Outer glow rings */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"
                        style={{
                          boxShadow: `0 0 20px ${colors.primary}, 0 0 20px #8B5CF6, 0 0 40px ${colors.primary}`,
                          filter: "blur(4px)",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 transition-all">
                        Choose your job domain
                      </h3>
                      <p className="text-xs text-neutral-600 group-hover:text-neutral-700 transition-colors">
                        You will be asked to select your primary job domain —
                        the role you want to be evaluated for.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 - Green/Teal Neon */}
                  <div className="group flex gap-4 p-3 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12"
                        style={{
                          background:
                            "linear-gradient(135deg, #10B981, #059669)",
                          color: "white",
                          boxShadow: "0 4px 15px #10B98160",
                        }}
                      >
                        2
                      </div>
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"
                        style={{
                          boxShadow:
                            "0 0 20px #10B981, 0 0 30px #059669, 0 0 40px #10B981",
                          filter: "blur(4px)",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-600 transition-all">
                        Take the Skill Index Assessment
                      </h3>
                      <p className="text-xs text-neutral-600 group-hover:text-neutral-700 transition-colors">
                        You will complete a focused, role-specific assessment
                        designed to objectively evaluate your readiness for this
                        role.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 - Pink/Orange Neon */}
                  <div className="group flex gap-4 p-3 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                        style={{
                          background:
                            "linear-gradient(135deg, #EC4899, #F97316)",
                          color: "white",
                          boxShadow: "0 4px 15px #EC489960",
                        }}
                      >
                        3
                      </div>
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"
                        style={{
                          boxShadow:
                            "0 0 20px #EC4899, 0 0 30px #F97316, 0 0 40px #EC4899",
                          filter: "blur(4px)",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-500 transition-all">
                        Get your Hireability Score
                      </h3>
                      <p className="text-xs text-neutral-600 group-hover:text-neutral-700 transition-colors">
                        Your performance here directly impacts how recruiters
                        discover, evaluate, and rank your profile on UniTalent.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-white/30">
                  <button
                    onClick={handleProceedToPaywall}
                    className="w-full py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 mb-3 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    style={{
                      backgroundColor: colors.primary,
                      color: "white",
                      boxShadow: `0 8px 20px ${colors.primary}40`,
                    }}
                  >
                    Proceed to Skill Index Assessment
                  </button>

                  <button
                    onClick={handleSkip}
                    className="w-full text-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors backdrop-blur-sm bg-white/30 py-2 rounded-full"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SkillIndexIntro;

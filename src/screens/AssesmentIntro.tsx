// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Button } from "../ui/components/Button";
// import { useNavigate } from "react-router-dom";
// import { IconWithBackground } from "../ui/components/IconWithBackground";
// import HeaderLogo from "src/ui/components/HeaderLogo";
// import { FeatherArrowLeft } from "@subframe/core";
// import { FeatherBook } from "@subframe/core";
// import { FeatherCheckSquare } from "@subframe/core";
// import { FeatherClock } from "@subframe/core";
// import { FeatherCompass } from "@subframe/core";
// import { FeatherFileText } from "@subframe/core";
// import { FeatherTarget } from "@subframe/core";
// import { FeatherTrendingUp } from "@subframe/core";
// import { FeatherZap } from "@subframe/core";
// import API, { URL_PATH } from "src/common/API";
// import { colors } from "src/common/Colors";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "src/ui/components/Footer";

// function AssessmentIntro3() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [domainName, setDomainName] = useState<string | null>(null);
//   const [domainLoading, setDomainLoading] = useState(true);
//   const userId = useMemo(() => localStorage.getItem("userId"), []);
//   const [domainError, setDomainError] = useState<string | null>(null);

//   //============== GET API FOR FETCH THE DOMAIN==========
//   useEffect(() => {
//     const fetchDomain = async () => {
//       if (!userId) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await API(
//           "GET",
//           URL_PATH.getJobDomain,
//           {},
//           { "user-id": userId },
//         );

//         if (!Array.isArray(res) || res.length === 0) {
//           throw new Error("No domain selected");
//         }

//         setDomainName(res[0].name);
//         setDomainError(null);
//       } catch (err) {
//         console.error("Domain fetch failed", err);
//         setDomainName(null);
//         setDomainError(
//           "Unable to load your selected domain. Please try again.",
//         );
//       } finally {
//         setDomainLoading(false);
//       }
//     };

//     fetchDomain();
//   }, [userId, navigate]);

//   //========= POST API FOR TO START THE ASSESSMENT ==============
//   const handleBeginAssessment = async () => {
//     if (loading || !userId) {
//       if (!userId) navigate("/login");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await API(
//         "POST",
//         URL_PATH.startAssessment,
//         {},
//         { "user-id": userId },
//       );

//       if (response?.attemptId) {
//         console.log("✅ Assessment started, navigating to assessment page");

//         // Navigate to the assessment page with all necessary data
//         navigate("/assessment", {
//           // or "/assessment" based on your route
//           state: {
//             attemptId: response.attemptId,
//             expiresAt: response.expiresAt,
//             questions: response.questions || [],
//             totalQuestions: response.totalQuestions || 0,
//             timeLimit: response.timeLimit || 30, // default 30 mins if not provided
//             assessmentId: response.assessmentId,
//             domainName: localStorage.getItem("jobDomain") || "",
//           },
//         });
//       } else {
//         console.error("Failed to start assessment:", response);
//         alert(
//           response?.message || "Failed to start assessment. Please try again.",
//         );
//       }
//     } catch (err: any) {
//       console.error("Assessment error:", err);
//       alert(err?.message || "Failed to start assessment. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   //   return (
//   // <div
//   // style={{
//   //   background: `linear-gradient(
//   //     to bottom,
//   //     #d9d9d9 0%,
//   //     #cfd3d6 25%,
//   //     #9aa6b2 55%,
//   //     #2E4056 100%
//   //   )`,
//   //   // minHeight: '100vh',
//   //   width: '100%',
//   //   overflowY: 'auto',
//   //   paddingBottom: '3rem'
//   // }}
//   // className="min-h-screen bg-neutral-50 relative overflow-hidden">
//   //   {/* Blended background - Covers entire page */}

//   //   {/* Header and content with z-index to stay above background */}
//   //   <div className="relative z-10">
//   //     <Navbar />
//   //     <div className="flex w-full justify-center px-4 sm:px-6 lg:px-8 py-0 sm:py-0">
//   //       <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 sm:gap-8 py-8">
//   //         <Button
//   //           variant="neutral-tertiary"
//   //           size="small"
//   //           icon={<FeatherArrowLeft />}
//   //           onClick={() => navigate(-1)}
//   //         />
//   //         <div className="flex w-full flex-col items-center gap-6 ">
//   //           <IconWithBackground
//   //             style={{backgroundColor: colors.primary, color: colors.white}}
//   //             className="rounded-2xl"
//   //             size="large"
//   //             icon={<FeatherFileText />}
//   //             square={true}
//   //           />
//   //           <div className="flex flex-col items-center gap-3">
//   //             <span className="text-xl sm:text-2xl md:text-[30px] font-heading-1 text-default-font text-center">
//   //               {domainLoading
//   //                 ? "Loading Assessment..."
//   //                 : `${domainName} Skill Assessment`}
//   //             </span>

//   //             <span className="max-w-[90%] sm:max-w-[800px] text-sm font-body text-center">
//   //               This assessment evaluates your readiness for {domainName} roles
//   //               through real-world scenarios. You&#39;ll be tested on three
//   //               aspects —
//   //             </span>
//   //           </div>
//   //         </div>

//   //         <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//   //           <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-3xl border border-solid border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//   //             <div className="flex w-full items-center gap-3">
//   //               <IconWithBackground
//   //                 style={{backgroundColor: colors.primary, color: colors.white}}
//   //                 className="rounded-2xl"
//   //                 variant="brand"
//   //                 size="medium"
//   //                 icon={<FeatherBook />}
//   //               />
//   //               <span className="text-heading-3 font-heading-3 text-default-font">
//   //                 Knowledge
//   //               </span>
//   //             </div>
//   //             <div className="flex w-full flex-col text-xs text-gray-600 items-start gap-2">
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Product lifecycle stages and trade-offs
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • User-centric design and customer discovery
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Market sizing, competition, and positioning
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Metrics, KPIs, and outcome-based measurement
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Agile development and go-to-market fundamentals
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Stakeholder dynamics and business fundamentals
//   //               </span>
//   //             </div>
//   //           </div>

//   //           <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-3xl border border-solid border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//   //             <div className="flex w-full items-center gap-3">
//   //               <IconWithBackground
//   //                 style={{backgroundColor: colors.primary, color: colors.white}}
//   //                 className="rounded-2xl"
//   //                 variant="brand"
//   //                 size="medium"
//   //                 icon={<FeatherTarget />}
//   //               />
//   //               <span className="text-heading-3 font-heading-3 text-default-font">
//   //                 Decision-Making Skills
//   //               </span>
//   //             </div>
//   //             <div className="flex w-full flex-col text-xs text-gray-600 items-start gap-2">
//   //               <span className="text-body  font-body text-subtext-color">
//   //                 • Breaking down ambiguous problems
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Identifying and prioritizing user problems
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Making trade-offs between scope, speed, and impact
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Defining success metrics and evaluating outcomes
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Analyzing qualitative and quantitative inputs
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Prioritizing under real-world constraints
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Communicating and justifying decisions
//   //               </span>
//   //             </div>
//   //           </div>

//   //           <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-3xl border border-solid border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//   //             <div className="flex w-full items-center gap-3">
//   //               <IconWithBackground
//   //                 style={{backgroundColor: colors.primary, color: colors.white}}
//   //                 className="rounded-2xl"
//   //                 variant="brand"
//   //                 size="medium"
//   //                 icon={<FeatherCompass />}
//   //               />
//   //               <span className="text-heading-3 font-heading-3 text-default-font">
//   //                 Attributes
//   //               </span>
//   //             </div>
//   //             <div className="flex w-full flex-col text-xs text-gray-600 items-start gap-2">
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Structured and first-principles thinking
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Customer empathy and ownership
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Comfort with ambiguity
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Bias toward action and iteration
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Strategic judgment over short-term optimization
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Balancing data, intuition, and constraints
//   //               </span>
//   //               <span className="text-body font-body text-subtext-color">
//   //                 • Decision quality under uncertainty
//   //               </span>
//   //             </div>
//   //           </div>
//   //         </div>

//   //         <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:gap-8 rounded-3xl border border-solid border-neutral-border bg-white px-8 py-6 shadow-sm">
//   //           <div className="flex items-center gap-3">
//   //             <FeatherClock className="text-body font-body" />
//   //             <span className="text-body-bold font-body-bold text-default-font">
//   //               25 minutes
//   //             </span>
//   //           </div>
//   //           <div className="hidden sm:flex h-8 w-px bg-neutral-border" />
//   //           <div className="flex items-center gap-3">
//   //             <FeatherCheckSquare className="text-body font-body" />
//   //             <span className="text-body-bold font-body-bold text-default-font">
//   //               20 scenario questions
//   //             </span>
//   //           </div>
//   //           <div className="hidden sm:flex h-8 w-px bg-neutral-border" />
//   //           <div className="flex items-center gap-3">
//   //             <FeatherTrendingUp className="text-body font-body" />
//   //             <span className="text-body-bold font-body-bold text-default-font">
//   //               Counts toward your Skill Index
//   //             </span>
//   //           </div>
//   //         </div>

//   //         <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8">
//   //           <Button
//   //             disabled={loading}
//   //             style={{ backgroundColor: colors.primary, color: "white" }}
//   //             className="w-full max-w-[260px] h-10 rounded-2xl hover:bg-violet-700 text-white disabled:opacity-60 p-6"
//   //             size="large"
//   //             icon={<FeatherZap />}
//   //             onClick={handleBeginAssessment}
//   //           >
//   //             {loading ? "Starting..." : "Begin Skill Index Assessment"}
//   //           </Button>

//   //           <button
//   //             className="text-body font-body text-subtext-color hover:text-gray-700 transition"
//   //             onClick={() => {
//   //               navigate("/dashboard");
//   //             }}
//   //           >
//   //             Skip for now
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   //   <Footer />
//   // </div>
//   // );

//   return (
//     <div
//       style={{
//         background: `linear-gradient(
//         to bottom,
//         #d9d9d9 0%,
//         #cfd3d6 25%,
//         #9aa6b2 55%,
//         #2E4056 100%
//       )`,
//         width: "100%",
//       }}
//       className="min-h-screen flex flex-col"
//     >
//       {/* Content Wrapper */}
//       <div className="flex-grow relative z-10">
//         <Navbar />

//         <div className=" min-h-screen flex w-full justify-center px-4 sm:px-6 lg:px-8">
//           <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 sm:gap-8 py-8">
//             <Button
//               variant="neutral-tertiary"
//               size="small"
//               icon={<FeatherArrowLeft />}
//               onClick={() => navigate(-1)}
//             />

//             {/* Header Section */}
//             <div className="flex w-full flex-col items-center gap-6">
//               <IconWithBackground
//                 style={{ backgroundColor: colors.primary, color: colors.white }}
//                 className="rounded-2xl"
//                 size="large"
//                 icon={<FeatherFileText />}
//                 square
//               />

//               <div className="flex flex-col items-center gap-3">
//                 <span className="text-xl sm:text-2xl md:text-[30px] font-heading-1 text-default-font text-center">
//                   {domainLoading
//                     ? "Loading Assessment..."
//                     : `${domainName} Skill Assessment`}
//                 </span>

//                 <span className="max-w-[90%] sm:max-w-[800px] text-sm font-body text-center">
//                   This assessment evaluates your readiness for {domainName}{" "}
//                   roles through real-world scenarios. You'll be tested on three
//                   aspects —
//                 </span>
//               </div>
//             </div>

//             {/* Cards */}
//             <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {/* Knowledge */}
//               <div className="flex flex-col gap-4 rounded-3xl border border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <IconWithBackground
//                     style={{
//                       backgroundColor: colors.primary,
//                       color: colors.white,
//                     }}
//                     className="rounded-2xl"
//                     size="medium"
//                     icon={<FeatherBook />}
//                   />
//                   <span className="text-heading-3 font-heading-3 text-default-font">
//                     Knowledge
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-2 text-xs text-gray-600">
//                   <span>• Product lifecycle stages and trade-offs</span>
//                   <span>• User-centric design and customer discovery</span>
//                   <span>• Market sizing, competition, and positioning</span>
//                   <span>• Metrics, KPIs, and outcome-based measurement</span>
//                   <span>• Agile development and go-to-market fundamentals</span>
//                   <span>• Stakeholder dynamics and business fundamentals</span>
//                 </div>
//               </div>

//               {/* Decision-Making */}
//               <div className="flex flex-col gap-4 rounded-3xl border border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <IconWithBackground
//                     style={{
//                       backgroundColor: colors.primary,
//                       color: colors.white,
//                     }}
//                     className="rounded-2xl"
//                     size="medium"
//                     icon={<FeatherTarget />}
//                   />
//                   <span className="text-heading-3 font-heading-3 text-default-font">
//                     Decision-Making Skills
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-2 text-xs text-gray-600">
//                   <span>• Breaking down ambiguous problems</span>
//                   <span>• Identifying and prioritizing user problems</span>
//                   <span>
//                     • Making trade-offs between scope, speed, and impact
//                   </span>
//                   <span>
//                     • Defining success metrics and evaluating outcomes
//                   </span>
//                   <span>• Analyzing qualitative and quantitative inputs</span>
//                   <span>• Prioritizing under real-world constraints</span>
//                   <span>• Communicating and justifying decisions</span>
//                 </div>
//               </div>

//               {/* Attributes */}
//               <div className="flex flex-col gap-4 rounded-3xl border border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <IconWithBackground
//                     style={{
//                       backgroundColor: colors.primary,
//                       color: colors.white,
//                     }}
//                     className="rounded-2xl"
//                     size="medium"
//                     icon={<FeatherCompass />}
//                   />
//                   <span className="text-heading-3 font-heading-3 text-default-font">
//                     Attributes
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-2 text-xs text-gray-600">
//                   <span>• Structured and first-principles thinking</span>
//                   <span>• Customer empathy and ownership</span>
//                   <span>• Comfort with ambiguity</span>
//                   <span>• Bias toward action and iteration</span>
//                   <span>• Strategic judgment over short-term optimization</span>
//                   <span>• Balancing data, intuition, and constraints</span>
//                   <span>• Decision quality under uncertainty</span>
//                 </div>
//               </div>
//             </div>

//             {/* Info Section */}
//             <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:gap-8 rounded-3xl border border-neutral-border bg-white px-8 py-6 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <FeatherClock />
//                 <span className="font-semibold">25 minutes</span>
//               </div>
//               <div className="hidden sm:flex h-8 w-px bg-neutral-border" />
//               <div className="flex items-center gap-3">
//                 <FeatherCheckSquare />
//                 <span className="font-semibold">20 scenario questions</span>
//               </div>
//               <div className="hidden sm:flex h-8 w-px bg-neutral-border" />
//               <div className="flex items-center gap-3">
//                 <FeatherTrendingUp />
//                 <span className="font-semibold">
//                   Counts toward your Skill Index
//                 </span>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8">
//               <Button
//                 disabled={loading}
//                 style={{ backgroundColor: colors.primary, color: "white" }}
//                 className="w-full max-w-[260px] h-10 rounded-2xl disabled:opacity-60"
//                 size="large"
//                 icon={<FeatherZap />}
//                 onClick={handleBeginAssessment}
//               >
//                 {loading ? "Starting..." : "Begin Skill Index Assessment"}
//               </Button>

//               <button
//                 className="text-subtext-color hover:text-gray-700 transition"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Skip for now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer stays at bottom */}
//       <Footer />
//     </div>
//   );
// }

// export default AssessmentIntro3;

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/components/Button";
import { useNavigate } from "react-router-dom";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import {
  FeatherArrowLeft,
  FeatherBook,
  FeatherCheckSquare,
  FeatherClock,
  FeatherCompass,
  FeatherFileText,
  FeatherTarget,
  FeatherTrendingUp,
  FeatherZap,
  FeatherChevronRight,
} from "@subframe/core";
import API, { URL_PATH } from "src/common/API";
import { colors } from "src/common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "src/ui/components/Footer";

// ============================================
// ENHANCED BACKGROUND GLASS LAYER
// ============================================
const BackgroundGlass: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
    <div className="absolute inset-0 bg-white/20 backdrop-blur-[150px]" />
    <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10" />
  </div>
);

// ============================================
// GLASS CARD COMPONENT
// ============================================
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`relative group ${className}`}
  >
    {/* Main glass layer */}
    <div
      className="absolute inset-0 rounded-2xl transition-all duration-500"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(255, 255, 255, 0.3) inset",
      }}
    />

    {/* Content */}
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// ============================================
// DEMO QUESTIONS GENERATOR
// ============================================
const generateDemoQuestions = () => {
  return [
    {
      id: "demo_1",
      question: "What is the primary goal of product discovery?",
      marks: 5,
      options: [
        {
          key: 1,
          title: "A. To build features quickly",
          description: "Focus on speed over validation",
        },
        {
          key: 2,
          title: "B. To validate customer problems before building solutions",
          description: "Ensure you're solving the right problem",
        },
        {
          key: 3,
          title: "C. To increase team velocity",
          description: "Measure development speed",
        },
        {
          key: 4,
          title: "D. To create marketing materials",
          description: "Focus on promotion",
        },
      ],
    },
    {
      id: "demo_2",
      question: "Which metric is most important for measuring user engagement?",
      marks: 5,
      options: [
        {
          key: 1,
          title: "A. Daily Active Users (DAU)",
          description: "Users who engage daily",
        },
        {
          key: 2,
          title: "B. Total Downloads",
          description: "Initial acquisition metric",
        },
        {
          key: 3,
          title: "C. Number of features",
          description: "Product complexity",
        },
        {
          key: 4,
          title: "D. Team size",
          description: "Resource allocation",
        },
      ],
    },
    {
      id: "demo_3",
      question: "What is a Minimum Viable Product (MVP)?",
      marks: 5,
      options: [
        {
          key: 1,
          title: "A. The smallest product with no features",
          description: "Too minimal to provide value",
        },
        {
          key: 2,
          title: "B. A product with minimum features to validate learning",
          description: "Correct - build just enough to learn",
        },
        {
          key: 3,
          title: "C. The final product before launch",
          description: "That's the final product",
        },
        {
          key: 4,
          title: "D. A product with all planned features",
          description: "That's a full release",
        },
      ],
    },
    {
      id: "demo_4",
      question: "What does A/B testing help you determine?",
      marks: 5,
      options: [
        {
          key: 1,
          title: "A. Which version performs better",
          description: "Compare two variants",
        },
        {
          key: 2,
          title: "B. Total user count",
          description: "That's analytics",
        },
        {
          key: 3,
          title: "C. Development time",
          description: "That's project management",
        },
        {
          key: 4,
          title: "D. Team productivity",
          description: "That's team metrics",
        },
      ],
    },
    {
      id: "demo_5",
      question: "What is product-market fit?",
      marks: 5,
      options: [
        {
          key: 1,
          title: "A. When your product is in the market",
          description: "That's just launch",
        },
        {
          key: 2,
          title:
            "B. When customers consistently buy and recommend your product",
          description: "Strong market demand",
        },
        {
          key: 3,
          title: "C. When you have many competitors",
          description: "That's market saturation",
        },
        {
          key: 4,
          title: "D. When your product is fully built",
          description: "That's development complete",
        },
      ],
    },
  ];
};

// ============================================
// MAIN COMPONENT
// ============================================
function AssessmentIntro3() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [domainName, setDomainName] = useState<string | null>(null);
  const [domainLoading, setDomainLoading] = useState(true);
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [useDemoMode, setUseDemoMode] = useState(false);

  // Steps for progress
  const steps = [
    { label: "Domain", completed: true },
    { label: "Skills", completed: true },
    { label: "Assessment", active: true },
    { label: "Complete", active: false },
  ];

  //============== GET API FOR FETCH THE DOMAIN==========
  useEffect(() => {
    const fetchDomain = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const res = await API(
          "GET",
          URL_PATH.getJobDomain,
          {},
          { "user-id": userId },
        );

        if (!Array.isArray(res) || res.length === 0) {
          throw new Error("No domain selected");
        }

        setDomainName(res[0].name);
        setDomainError(null);
      } catch (err) {
        console.error("Domain fetch failed", err);
        setDomainName(null);
        setDomainError(
          "Unable to load your selected domain. Please try again.",
        );
      } finally {
        setDomainLoading(false);
      }
    };

    fetchDomain();
  }, [userId, navigate]);

  //========= POST API FOR TO START THE ASSESSMENT ==============
  const handleBeginAssessment = async () => {
    if (loading || !userId) {
      if (!userId) navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await API(
        "POST",
        URL_PATH.startAssessment,
        {},
        { "user-id": userId },
      );

      if (response?.attemptId) {
        console.log("✅ Assessment started, navigating to assessment page");
        navigate("/assessment", {
          state: {
            attemptId: response.attemptId,
            expiresAt: response.expiresAt,
            questions: response.questions || [],
            totalQuestions: response.totalQuestions || 0,
            timeLimit: response.timeLimit || 30,
            assessmentId: response.assessmentId,
            domainName: localStorage.getItem("jobDomain") || "",
          },
        });
      } else {
        console.error("Failed to start assessment:", response);

        // Check for specific error messages
        if (
          response?.message?.includes("Not enough Easy questions") ||
          response?.message?.includes("not enough")
        ) {
          // Auto-trigger demo mode
          console.log("🎯 Using demo mode due to backend error");
          startDemoMode();
        } else {
          alert(
            response?.message ||
              "Failed to start assessment. Please try again.",
          );
        }
      }
    } catch (err: any) {
      console.error("Assessment error:", err);

      // Check for the specific 403 error
      if (
        err?.response?.status === 403 ||
        err?.response?.data?.message?.includes("Not enough")
      ) {
        console.log("🎯 Using demo mode due to 403 error");
        startDemoMode();
      } else {
        alert(err?.message || "Failed to start assessment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Start demo mode
  const startDemoMode = () => {
    const demoQuestions = generateDemoQuestions();
    const demoAttemptId = "demo_" + Date.now();
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes from now

    // Store in sessionStorage for persistence
    sessionStorage.setItem(
      `attempt-${demoAttemptId}`,
      JSON.stringify({
        answers: Array(demoQuestions.length).fill(null),
        currentIndex: 0,
      }),
    );

    navigate("/assessment", {
      state: {
        attemptId: demoAttemptId,
        expiresAt: expiryTime,
        questions: demoQuestions,
        totalQuestions: demoQuestions.length,
        timeLimit: 30,
        assessmentId: "demo_assessment",
        domainName:
          domainName ||
          localStorage.getItem("jobDomain") ||
          "Product Management",
        isDemo: true, // Flag to indicate this is a demo assessment
      },
    });
  };

  return (
    <>
      <Navbar />
      <BackgroundGlass />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <GlassCard>
            <div className="p-6 sm:p-8 md:p-10">
              {/* Header with back button and progress */}
              <div className="flex items-center gap-3 sm:gap-4 mb-8">
                <motion.button
                  onClick={() => navigate(-1)}
                  className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FeatherArrowLeft style={{ color: colors.neutral[600] }} />
                </motion.button>

                <div className="flex-1 flex items-center gap-1">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.label}>
                      <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor:
                              index <= 2 ? colors.primary : colors.neutral[200],
                            width: index <= 2 ? "100%" : "0%",
                          }}
                          initial={{ width: "0%" }}
                          animate={{ width: index <= 2 ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      {index < steps.length - 1 && <div className="w-1" />}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-xs text-neutral-400 ml-2">3/4</span>
              </div>

              {/* Title Section */}
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}05)`,
                      border: `1px solid ${colors.primary}30`,
                    }}
                  >
                    <FeatherFileText
                      style={{
                        color: colors.primary,
                        width: 32,
                        height: 32,
                        justifyContent: "center",
                      }}
                    />
                  </div>
                </div>

                <h1
                  className="text-2xl sm:text-3xl font-light tracking-tight mb-2"
                  style={{ color: colors.accent }}
                >
                  {domainLoading
                    ? "Loading Assessment..."
                    : `${domainName} Skill Assessment`}
                </h1>

                <p
                  className="text-sm max-w-2xl mx-auto"
                  style={{ color: colors.neutral[600] }}
                >
                  This assessment evaluates your readiness for {domainName}{" "}
                  roles through real-world scenarios. You'll be tested on three
                  aspects —
                </p>
              </motion.div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Knowledge Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-5 rounded-xl border"
                  style={{
                    backgroundColor: "white",
                    borderColor: colors.neutral[200],
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${colors.primary}10`,
                      }}
                    >
                      <FeatherBook style={{ color: colors.primary }} />
                    </div>
                    <h3
                      className="font-medium"
                      style={{ color: colors.accent }}
                    >
                      Knowledge
                    </h3>
                  </div>
                  <ul
                    className="space-y-1 text-xs"
                    style={{ color: colors.neutral[600] }}
                  >
                    <li>• Product lifecycle stages and trade-offs</li>
                    <li>• User-centric design and customer discovery</li>
                    <li>• Market sizing, competition, and positioning</li>
                    <li>• Metrics, KPIs, and outcome-based measurement</li>
                    <li>• Agile development and go-to-market fundamentals</li>
                    <li>• Stakeholder dynamics and business fundamentals</li>
                  </ul>
                </motion.div>

                {/* Decision-Making Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 rounded-xl border"
                  style={{
                    backgroundColor: "white",
                    borderColor: colors.neutral[200],
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${colors.primary}10`,
                      }}
                    >
                      <FeatherTarget style={{ color: colors.primary }} />
                    </div>
                    <h3
                      className="font-medium"
                      style={{ color: colors.accent }}
                    >
                      Decision-Making
                    </h3>
                  </div>
                  <ul
                    className="space-y-1 text-xs"
                    style={{ color: colors.neutral[600] }}
                  >
                    <li>• Breaking down ambiguous problems</li>
                    <li>• Identifying and prioritizing user problems</li>
                    <li>
                      • Making trade-offs between scope, speed, and impact
                    </li>
                    <li>• Defining success metrics and evaluating outcomes</li>
                    <li>• Analyzing qualitative and quantitative inputs</li>
                    <li>• Prioritizing under real-world constraints</li>
                    <li>• Communicating and justifying decisions</li>
                  </ul>
                </motion.div>

                {/* Attributes Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-5 rounded-xl border"
                  style={{
                    backgroundColor: "white",
                    borderColor: colors.neutral[200],
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${colors.primary}10`,
                      }}
                    >
                      <FeatherCompass style={{ color: colors.primary }} />
                    </div>
                    <h3
                      className="font-medium"
                      style={{ color: colors.accent }}
                    >
                      Attributes
                    </h3>
                  </div>
                  <ul
                    className="space-y-1 text-xs"
                    style={{ color: colors.neutral[600] }}
                  >
                    <li>• Structured and first-principles thinking</li>
                    <li>• Customer empathy and ownership</li>
                    <li>• Comfort with ambiguity</li>
                    <li>• Bias toward action and iteration</li>
                    <li>• Strategic judgment over short-term optimization</li>
                    <li>• Balancing data, intuition, and constraints</li>
                    <li>• Decision quality under uncertainty</li>
                  </ul>
                </motion.div>
              </div>

              {/* Info Section - Minimalist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-6 py-4 mb-6 border-y"
                style={{ borderColor: colors.neutral[200] }}
              >
                <div className="flex items-center gap-2">
                  <FeatherClock style={{ color: colors.primary }} />
                  <span className="text-sm" style={{ color: colors.accent }}>
                    25 minutes
                  </span>
                </div>
                <div
                  className="w-px h-4"
                  style={{ backgroundColor: colors.neutral[200] }}
                />
                <div className="flex items-center gap-2">
                  <FeatherCheckSquare style={{ color: colors.primary }} />
                  <span className="text-sm" style={{ color: colors.accent }}>
                    20 scenario questions
                  </span>
                </div>
                <div
                  className="w-px h-4"
                  style={{ backgroundColor: colors.neutral[200] }}
                />
                <div className="flex items-center gap-2">
                  <FeatherTrendingUp style={{ color: colors.primary }} />
                  <span className="text-sm" style={{ color: colors.accent }}>
                    Counts toward Skill Index
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleBeginAssessment}
                  disabled={loading || domainLoading}
                  className="w-full max-w-md py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{
                    backgroundColor: colors.primary,
                    color: "white",
                  }}
                >
                  <FeatherZap className="w-4 h-4" />
                  {loading ? "Starting..." : "Begin Skill Index Assessment"}
                </button>

                {/* Demo Mode Button (for development) */}
                <button
                  onClick={startDemoMode}
                  className="text-sm transition-opacity hover:opacity-70 mt-2"
                  style={{ color: colors.neutral[500] }}
                >
                  Try Demo Assessment
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: colors.neutral[500] }}
                >
                  Skip for now
                </button>
              </motion.div>
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: ${colors.primary}4D;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.primary}80;
        }
      `}</style>
    </>
  );
}

export default AssessmentIntro3;

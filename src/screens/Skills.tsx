// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FeatherArrowLeft, FeatherX } from "@subframe/core";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { completeStep } from "../store/slices/onboardingSlice";

// import HeaderLogo from "src/ui/components/HeaderLogo";
// import { IconButton } from "../ui/components/IconButton";
// import { TextField } from "../ui/components/TextField";
// import { Button } from "../ui/components/Button";

// import API, { URL_PATH } from "src/common/API";
// import { colors } from "../common/Colors";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "../ui/components/Footer";

// export default function Skills() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const source = location.state?.source; // "dashboard" | undefined

//   console.log("📍 [Skills] Component mounted");
//   console.log("📍 Source:", source);
//   console.log("📍 Location state:", location.state);

//   const [input, setInput] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [skills, setSkills] = useState<string[]>([]);

//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const suggested = [
//     "Data Analysis",
//     "A/B Testing",
//     "Stakeholder Management",
//     "Feature Prioritization",
//     "Agile Methodology",
//     "Product Analytics",
//     "Customer Development",
//     "Wireframing",
//     "SQL",
//     "Go-to-Market Strategy",
//     "API Integration",
//     "Metrics & KPIs",
//   ];

//   const scTextFieldClass =
//     "w-full [&>label]:text-[12px] [&>label]:font-medium [&>div]:h-8 [&>div]:rounded-full [&>div]:bg-neutral-100 [&>div]:!border-none";

//   const scInputClass =
//     "rounded-full h-7 px-3 text-[16px] placeholder:text-[16px] bg-neutral-100 !border-none focus:ring-0 focus:outline-none w-full";

//   const addSkill = (raw: string) => {
//     const s = raw.trim();
//     if (!s) return;

//     const exists = skills.some((k) => k.toLowerCase() === s.toLowerCase());
//     if (!exists) {
//       console.log("➕ [Skills] Adding skill:", s);
//       setSkills((prev) => [...prev, s]);
//     }
//   };

//   const removeSkill = (s: string) => {
//     console.log("➖ [Skills] Removing skill:", s);
//     setSkills((prev) => prev.filter((k) => k !== s));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       addSkill(input);
//       setInput("");
//     }
//   };

//   const handleBack = () => {
//     console.log("⬅️ [Skills] Back button clicked");
//     console.log("📍 Current source:", source);

//     if (source === "dashboard") {
//       console.log("🔄 [Skills] Source is dashboard - going to /dashboard");
//       navigate("/dashboard");
//     } else {
//       // In the onboarding flow, go back to job-domain
//       console.log("🔄 [Skills] In onboarding flow - going to /job-domain");
//       navigate("/job-domain");
//     }
//   };

//   const handleContinue = async () => {
//     console.log("🔄 [Skills] Continue clicked");
//     console.log("📊 Current skills:", skills);
//     console.log("📊 Source:", source);

//     if (skills.length === 0) {
//       console.log("⚠️ [Skills] No skills added - showing alert");
//       alert("Add at least one skill to continue.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       console.log("⏳ [Skills] Submitting skills to API...");

//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");
//       const domainId = localStorage.getItem("domainId");

//       console.log("📦 Request data:", {
//         userId: userId ? "present" : "missing",
//         domainId: domainId ? "present" : "missing",
//         skillsCount: skills.length,
//       });

//       if (!domainId) {
//         console.log("🚫 [Skills] Domain ID missing");
//         alert("Domain selection missing. Please select domain again.");
//         navigate("/job-domain");
//         return;
//       }

//       const response = await API(
//         "POST",
//         URL_PATH.updateUserDomainSkills,
//         { userId, domainId, skills },
//         { Authorization: `Bearer ${token}` },
//       );

//       console.log("✅ [Skills] API Response:", response);

//       // Mark skills as completed in Redux
//       console.log("🔄 [Skills] Dispatching completeStep for 'skills'");
//       dispatch(completeStep("skills"));

//       // Determine navigation destination
//       if (source === "dashboard") {
//         console.log(
//           "🔄 [Skills] Source is dashboard - navigating to /dashboard",
//         );
//         navigate("/dashboard");
//       } else {
//         console.log(
//           "🔄 [Skills] Source is onboarding - navigating to /assessment-intro",
//         );
//         navigate("/assessment-intro");
//       }
//     } catch (error: any) {
//       console.error("❌ [Skills] Skill save failed:", error);
//       console.error("❌ Error response:", error?.response?.data);
//       alert(
//         error?.response?.data?.message ||
//           "Failed to save skills. Please try again.",
//       );
//     } finally {
//       setIsSubmitting(false);
//       console.log("🏁 [Skills] Submission complete");
//     }
//   };

//   useEffect(() => {
//     const fetchSkills = async () => {
//       console.log("🔄 [Skills] Fetching existing skills...");
//       try {
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("userId");

//         console.log("📡 Fetching from:", URL_PATH.getUserDomainSkils);

//         const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
//           Authorization: `Bearer ${token}`,
//           "user-id": userId,
//         });

//         console.log("📥 [Skills] Fetch response:", res);

//         const skillsFromApi = res?.[0]?.skills;
//         if (Array.isArray(skillsFromApi)) {
//           console.log("✅ [Skills] Loaded skills from API:", skillsFromApi);
//           setSkills(skillsFromApi);
//         } else {
//           console.log("ℹ️ [Skills] No existing skills found");
//         }
//       } catch (err) {
//         console.error("❌ [Skills] Failed to fetch skills:", err);
//       }
//     };

//     fetchSkills();
//   }, []);

//   const isDisabled = skills.length === 0 || isSubmitting;

//   return (
//     <div className="min-h-screen relative overflow-hidden">
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

//       <div className="relative z-10">
//         <Navbar />
//       </div>

//       <div className="relative z-10 flex justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8">
//         <main
//           className="w-full max-w-[720px] rounded-3xl shadow-xl border px-6 sm:px-8 md:px-10 py-6 sm:py-8 backdrop-blur-md"
//           style={{
//             backgroundColor: `${colors.white}CC`,
//             borderColor: colors.neutral[200],
//           }}
//         >
//           {/* Top row - FIXED BACK BUTTON */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <IconButton
//               size="small"
//               icon={<FeatherArrowLeft />}
//               onClick={handleBack}
//             />

//             <div className="flex-1">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 {Array.from({ length: 3 }).map((_, i) => (
//                   <div
//                     key={`p-${i}`}
//                     className="flex-1 rounded-full h-1.5 sm:h-2"
//                     style={{ backgroundColor: colors.primary }}
//                   />
//                 ))}
//                 {Array.from({ length: 2 }).map((_, i) => (
//                   <div
//                     key={`n-${i}`}
//                     className="flex-1 rounded-full h-1.5 sm:h-2"
//                     style={{ backgroundColor: colors.neutral[200] }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Header */}
//           <div className="mt-6 sm:mt-8 flex flex-col gap-1">
//             <h2
//               className="text-[20px] sm:text-[22px] md:text-[26px] font-semibold"
//               style={{ color: colors.neutral[800] }}
//             >
//               Add your skills
//             </h2>

//             <p
//               className="text-xs sm:text-sm leading-relaxed"
//               style={{ color: colors.neutral[600] }}
//             >
//               Add your key skills to help recruiters discover your profile and
//               match you with relevant opportunities
//             </p>
//           </div>

//           {/* Your Skills */}
//           <div className="mt-8 flex flex-col gap-2">
//             <span
//               className="text-[16px]"
//               style={{ color: colors.neutral[800] }}
//             >
//               Your Skills *
//             </span>

//             <TextField className={scTextFieldClass} label="">
//               <TextField.Input
//                 placeholder="Type a skill and press Enter"
//                 value={input}
//                 ref={inputRef}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className={scInputClass}
//               />
//             </TextField>

//             <div className="flex flex-wrap items-center gap-3 mt-1">
//               {skills.map((s) => (
//                 <div
//                   key={s}
//                   className="inline-flex items-center gap-2 rounded-full px-3 py-1"
//                   style={{ backgroundColor: colors.neutral[100] }}
//                 >
//                   <span
//                     className="text-[16px]"
//                     style={{ color: colors.neutral[600] }}
//                   >
//                     {s}
//                   </span>

//                   <IconButton
//                     size="small"
//                     icon={<FeatherX />}
//                     onClick={() => removeSkill(s)}
//                     className="!bg-transparent !w-6 !h-6 [&>svg]:w-3 [&>svg]:h-3"
//                     style={{ color: colors.neutral[600] }}
//                     aria-label={`Remove ${s}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Suggested Skills */}
//           <div className="mt-8">
//             <div
//               className="rounded-3xl px-4 py-4 flex flex-col gap-3"
//               style={{ backgroundColor: colors.neutral[200] }}
//             >
//               <span
//                 className="text-[18px]"
//                 style={{ color: colors.neutral[800] }}
//               >
//                 Suggested Skills for Product Managers
//               </span>

//               <div className="flex flex-wrap gap-3 mt-2">
//                 {suggested.map((s) => {
//                   const isAdded = skills.some(
//                     (k) => k.toLowerCase() === s.toLowerCase(),
//                   );

//                   return (
//                     <button
//                       key={s}
//                       type="button"
//                       disabled={isAdded}
//                       onClick={() => addSkill(s)}
//                       className="px-3 py-1 rounded-full text-sm transition-all border"
//                       style={{
//                         backgroundColor: isAdded
//                           ? colors.neutral[100]
//                           : colors.neutral[200],
//                         borderColor: colors.neutral[200],
//                         color: isAdded
//                           ? colors.neutral[400]
//                           : colors.neutral[600],
//                         cursor: isAdded ? "default" : "pointer",
//                       }}
//                     >
//                       {s}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div
//             className="w-full h-px my-8"
//             style={{ backgroundColor: colors.secondary }}
//           />

//           <footer>
//             <Button
//               onClick={handleContinue}
//               disabled={isDisabled}
//               className="w-full h-10 sm:h-11 rounded-full text-sm sm:text-base font-semibold transition active:scale-[0.99]"
//               style={{
//                 backgroundColor: isDisabled
//                   ? colors.neutral[200]
//                   : colors.accent,
//                 color: colors.background,
//                 cursor: isDisabled ? "not-allowed" : "pointer",
//                 opacity: isDisabled ? 0.75 : 1,
//                 boxShadow: isDisabled ? "none" : "0 10px 24px rgba(0,0,0,0.08)",
//               }}
//             >
//               {isSubmitting ? "Saving..." : "Continue"}
//             </Button>
//           </footer>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FeatherArrowLeft,
  FeatherX,
  FeatherPlus,
  FeatherTarget,
  FeatherZap,
  FeatherStar,
  FeatherCheckSquare,
  FeatherCpu,
  FeatherCode,
  FeatherTrendingUp,
  FeatherUsers,
} from "@subframe/core";
import { useAppDispatch } from "../store/hooks";
import { completeStep } from "../store/slices/onboardingSlice";

import { IconButton } from "../ui/components/IconButton";
import { TextField } from "../ui/components/TextField";
import { Button } from "../ui/components/Button";

import API, { URL_PATH } from "src/common/API";
import { colors } from "../common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";

// ============================================
// SKILLS ILLUSTRATION WITH COLORFUL BORDERS
// ============================================
const SkillsIllustration: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <motion.div
    className={`w-full h-full flex items-center justify-center ${className}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    style={{ overflow: "visible" }}
  >
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "400px", minWidth: "320px" }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Define gradients for vibrant colors */}
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#2563EB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#059669" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#DB2777" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#BE185D" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow circles */}
      <motion.circle
        cx="200"
        cy="200"
        r="160"
        fill="url(#blueGradient)"
        opacity="0.08"
        animate={{
          r: [160, 170, 160],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="140"
        fill="url(#pinkGradient)"
        opacity="0.06"
        animate={{
          r: [140, 150, 140],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="120"
        fill="url(#greenGradient)"
        opacity="0.04"
        animate={{
          r: [120, 130, 120],
          opacity: [0.04, 0.1, 0.04],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Skill hexagons/polygons with colored borders */}
      <motion.g
        animate={{
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Central hexagon */}
        <path
          d="M200 100 L250 125 L250 175 L200 200 L150 175 L150 125 L200 100"
          stroke="url(#blueGradient)"
          strokeWidth="2"
          fill="url(#blueGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />

        {/* Surrounding skill icons */}
        <circle
          cx="280"
          cy="140"
          r="20"
          stroke="url(#pinkGradient)"
          strokeWidth="2"
          fill="url(#pinkGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
        <circle
          cx="320"
          cy="200"
          r="20"
          stroke="url(#greenGradient)"
          strokeWidth="2"
          fill="url(#greenGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
        <circle
          cx="280"
          cy="260"
          r="20"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          fill="url(#purpleGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
        <circle
          cx="200"
          cy="300"
          r="20"
          stroke="url(#blueGradient)"
          strokeWidth="2"
          fill="url(#blueGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
        <circle
          cx="120"
          cy="260"
          r="20"
          stroke="url(#pinkGradient)"
          strokeWidth="2"
          fill="url(#pinkGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
        <circle
          cx="80"
          cy="200"
          r="20"
          stroke="url(#greenGradient)"
          strokeWidth="2"
          fill="url(#greenGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
        <circle
          cx="120"
          cy="140"
          r="20"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          fill="url(#purpleGradient)"
          fillOpacity="0.1"
          filter="url(#glow)"
        />
      </motion.g>

      {/* Connection lines */}
      <motion.path
        d="M200 100 L280 140 L320 200 L280 260 L200 300 L120 260 L80 200 L120 140 L200 100"
        stroke="url(#blueGradient)"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="4 4"
        fill="none"
        filter="url(#glow)"
        animate={{
          strokeDashoffset: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Skill labels - small dots */}
      <circle cx="280" cy="140" r="4" fill="#EC4899" filter="url(#glow)" />
      <circle cx="320" cy="200" r="4" fill="#10B981" filter="url(#glow)" />
      <circle cx="280" cy="260" r="4" fill="#8B5CF6" filter="url(#glow)" />
      <circle cx="200" cy="300" r="4" fill="#3B82F6" filter="url(#glow)" />
      <circle cx="120" cy="260" r="4" fill="#EC4899" filter="url(#glow)" />
      <circle cx="80" cy="200" r="4" fill="#10B981" filter="url(#glow)" />
      <circle cx="120" cy="140" r="4" fill="#8B5CF6" filter="url(#glow)" />

      {/* Floating particles */}
      <motion.circle
        cx="100"
        cy="100"
        r="6"
        fill="#3B82F6"
        opacity="0.15"
        filter="url(#glow)"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="320"
        cy="80"
        r="8"
        fill="#EC4899"
        opacity="0.15"
        filter="url(#glow)"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.circle
        cx="280"
        cy="340"
        r="5"
        fill="#10B981"
        opacity="0.15"
        filter="url(#glow)"
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </motion.svg>
  </motion.div>
);

// ============================================
// ENHANCED BACKGROUND GLASS LAYER
// ============================================
const BackgroundGlass: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
    <div className="absolute inset-0 bg-white/20 backdrop-blur-[150px]" />
    <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10" />

    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full"
      style={{
        background: `radial-gradient(circle, #3B82F615 0%, transparent 70%)`,
        top: "-30%",
        left: "-15%",
        filter: "blur(100px)",
      }}
      animate={{
        y: [0, -50, 0],
        x: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background: `radial-gradient(circle, #EC489915 0%, transparent 70%)`,
        bottom: "-20%",
        right: "-10%",
        filter: "blur(100px)",
      }}
      animate={{
        y: [0, 40, 0],
        x: [0, -30, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />

    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{
        background: `radial-gradient(circle, #10B98115 0%, transparent 70%)`,
        top: "40%",
        left: "60%",
        filter: "blur(80px)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
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
    whileHover={{
      y: -4,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    }}
    className={`relative group ${className}`}
  >
    {/* Animated glow effect */}
    <motion.div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${colors.primary}20, transparent 40%)`,
        filter: "blur(30px)",
      }}
    />

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

    {/* Inner glow border */}
    <div
      className="absolute inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        border: `1px solid ${colors.primary}30`,
        boxShadow: `0 0 30px ${colors.primary}20`,
        pointerEvents: "none",
      }}
    />

    {/* Content */}
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// ============================================
// GLASS BUTTON
// ============================================
const GlassButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative group overflow-hidden rounded-full font-medium ${className}`}
      style={{
        background: !disabled
          ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
          : colors.neutral[200],
        color: !disabled ? "white" : colors.neutral[400],
        cursor: !disabled ? "pointer" : "not-allowed",
        boxShadow: !disabled ? `0 8px 32px ${colors.primary}4D` : "none",
      }}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Shine effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transform: "translateX(-100%)",
          }}
          animate={{
            transform: ["translateX(-100%)", "translateX(100%)"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}

      {/* Button content */}
      <div className="relative z-10 px-6 py-3 flex items-center justify-center gap-2">
        <span>{children}</span>
      </div>
    </motion.button>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function Skills() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const source = location.state?.source;

  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggested = [
    "Data Analysis",
    "A/B Testing",
    "Stakeholder Management",
    "Feature Prioritization",
    "Agile Methodology",
    "Product Analytics",
    "Customer Development",
    "Wireframing",
    "SQL",
    "Go-to-Market Strategy",
    "API Integration",
    "Metrics & KPIs",
  ];

  // Steps for progress
  const steps = [
    { label: "Domain", completed: true },
    { label: "Skills", active: true },
    { label: "Assessment", active: false },
    { label: "Complete", active: false },
  ];

  const addSkill = (raw: string) => {
    const s = raw.trim();
    if (!s) return;

    const exists = skills.some((k) => k.toLowerCase() === s.toLowerCase());
    if (!exists) {
      setSkills((prev) => [...prev, s]);
    }
  };

  const removeSkill = (s: string) => {
    setSkills((prev) => prev.filter((k) => k !== s));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(input);
      setInput("");
    }
  };

  const handleBack = () => {
    if (source === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/job-domain");
    }
  };

  const handleContinue = async () => {
    if (skills.length === 0) {
      alert("Add at least one skill to continue.");
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const domainId = localStorage.getItem("domainId");

      if (!domainId) {
        alert("Domain selection missing. Please select domain again.");
        navigate("/job-domain");
        return;
      }

      const response = await API(
        "POST",
        URL_PATH.updateUserDomainSkills,
        { userId, domainId, skills },
        { Authorization: `Bearer ${token}` },
      );

      dispatch(completeStep("skills"));

      if (source === "dashboard") {
        navigate("/dashboard");
      } else {
        navigate("/assessment-intro");
      }
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to save skills. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
          Authorization: `Bearer ${token}`,
          "user-id": userId,
        });

        const skillsFromApi = res?.[0]?.skills;
        if (Array.isArray(skillsFromApi)) {
          setSkills(skillsFromApi);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const isDisabled = skills.length === 0 || isSubmitting;

  return (
    <>
      <Navbar />
      <BackgroundGlass />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column - Illustration */}
            <motion.div
              className="hidden lg:flex flex-col items-start justify-center h-full"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg mx-auto">
                <SkillsIllustration />

                {/* Benefit cards */}
                <motion.div
                  className="mt-12 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    {
                      icon: FeatherCpu,
                      title: "Showcase Your Expertise",
                      desc: "Highlight the skills that make you stand out to recruiters",
                      color: "#3B82F6",
                    },
                    {
                      icon: FeatherTrendingUp,
                      title: "Get Matched Better",
                      desc: "Skills help us match you with the most relevant opportunities",
                      color: "#EC4899",
                    },
                    {
                      icon: FeatherUsers,
                      title: "Stand Out from Crowd",
                      desc: "Demonstrate your unique skill set to potential employers",
                      color: "#10B981",
                    },
                  ].map((benefit, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/30"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${benefit.color}20, ${benefit.color}05)`,
                          border: `1px solid ${benefit.color}30`,
                        }}
                      >
                        <benefit.icon style={{ color: benefit.color }} />
                      </div>
                      <div>
                        <h3
                          className="font-medium"
                          style={{ color: colors.accent }}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: colors.neutral[600] }}
                        >
                          {benefit.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right column - Form */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <div className="p-6 sm:p-8 md:p-10">
                  {/* Header with back button and progress */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-8">
                    <motion.button
                      onClick={handleBack}
                      className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FeatherArrowLeft
                        style={{ color: colors.neutral[600] }}
                      />
                    </motion.button>

                    <div className="flex-1 flex items-center gap-1">
                      {steps.map((step, index) => (
                        <React.Fragment key={step.label}>
                          <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  index <= 1
                                    ? colors.primary
                                    : colors.neutral[200],
                                width: index <= 1 ? "100%" : "0%",
                              }}
                              initial={{ width: "0%" }}
                              animate={{ width: index <= 1 ? "100%" : "0%" }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          {index < steps.length - 1 && <div className="w-1" />}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="text-xs text-neutral-400 ml-2">2/4</span>
                  </div>

                  {/* Title */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h1
                      className="text-2xl sm:text-3xl font-light tracking-tight mb-2"
                      style={{ color: colors.accent }}
                    >
                      Add your skills
                    </h1>
                    <p
                      className="text-sm"
                      style={{ color: colors.neutral[600] }}
                    >
                      Add your key skills to help recruiters discover your
                      profile and match you with relevant opportunities
                    </p>
                  </motion.div>

                  {/* Skills Input */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      className="text-xs font-medium mb-2 block"
                      style={{ color: colors.neutral[500] }}
                    >
                      YOUR SKILLS <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setFocusedField("skills")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Type a skill and press Enter"
                        className="w-full px-0 py-2 text-sm border-0 border-b border-neutral-200 rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:outline-none transition-all duration-200"
                        style={{
                          borderBottomColor:
                            focusedField === "skills"
                              ? colors.primary
                              : undefined,
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Skills Tags */}
                  {skills.length > 0 && (
                    <motion.div
                      className="mb-6 flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {skills.map((s) => (
                        <motion.div
                          key={s}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}05)`,
                            border: `1px solid ${colors.primary}30`,
                            color: colors.accent,
                          }}
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <span>{s}</span>
                          <button
                            onClick={() => removeSkill(s)}
                            className="ml-1 hover:opacity-70 transition-opacity"
                          >
                            <FeatherX className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Suggested Skills */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3
                      className="text-sm font-medium mb-3"
                      style={{ color: colors.accent }}
                    >
                      Suggested Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {suggested.map((s) => {
                        const isAdded = skills.some(
                          (k) => k.toLowerCase() === s.toLowerCase(),
                        );

                        return (
                          <motion.button
                            key={s}
                            type="button"
                            disabled={isAdded}
                            onClick={() => addSkill(s)}
                            className="px-3 py-1 rounded-full text-sm transition-all border"
                            style={{
                              background: isAdded
                                ? colors.neutral[100]
                                : "transparent",
                              borderColor: isAdded
                                ? "transparent"
                                : colors.neutral[300],
                              color: isAdded
                                ? colors.neutral[400]
                                : colors.neutral[600],
                              cursor: isAdded ? "default" : "pointer",
                            }}
                            whileHover={
                              !isAdded
                                ? { scale: 1.05, borderColor: colors.primary }
                                : {}
                            }
                            whileTap={!isAdded ? { scale: 0.95 } : {}}
                          >
                            {s}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Continue Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <GlassButton
                      onClick={handleContinue}
                      disabled={isDisabled}
                      className="w-full"
                    >
                      {isSubmitting ? "Saving..." : "Continue"}
                    </GlassButton>
                  </motion.div>

                  {/* Skills count */}
                  {skills.length > 0 && (
                    <motion.p
                      className="text-xs text-center mt-4"
                      style={{ color: colors.neutral[400] }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {skills.length} skill{skills.length !== 1 ? "s" : ""}{" "}
                      added
                    </motion.p>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
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

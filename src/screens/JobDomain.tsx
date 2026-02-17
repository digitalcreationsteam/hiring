// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { Button } from "../ui/components/Button";
// // import { IconButton } from "../ui/components/IconButton";
// // import HeaderLogo from "src/ui/components/HeaderLogo";
// // import { FeatherArrowLeft, FeatherChevronDown } from "@subframe/core";
// // import { useNavigate } from "react-router-dom";
// // import * as SubframeCore from "@subframe/core";
// // import API, { URL_PATH } from "src/common/API";
// // import { useAppDispatch } from "src/store/hooks";
// // import { setNavigation } from "src/store/slices/onboardingSlice";
// // import { colors } from "src/common/Colors";
// // import Navbar from "src/ui/components/Navbar";

// // import Footer from "../ui/components/Footer";

// // const notify = (msg: string) => {
// //   console.warn(msg);
// // };

// // function JobDomain() {
// //   const navigate = useNavigate();
// //   const dispatch = useAppDispatch();
// //   const [isDomainOpen, setIsDomainOpen] = useState(false);

// //   const userId = React.useMemo(() => localStorage.getItem("userId"), []);

// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // Domain
// //   const [domain, setDomain] = useState<{ id: string; name: string } | null>(
// //     null,
// //   );
// //   const [domains, setDomains] = useState<{ _id: string; name: string }[]>([]);

// //   // // SubDomain
// //   // const [subDomain, setSubDomain] = useState<{
// //   //   id: string;
// //   //   name: string;
// //   // } | null>(null);
// //   // const [subDomains, setSubDomains] = useState<{ _id: string; name: string }[]>(
// //   //   []
// //   // );

// //   // -------------------- SAVE DOMAIN + SUBDOMAIN --------------------
// //   const handleContinue = async () => {
// //     if (!domain) {
// //       notify("Please select domain.");
// //       return;
// //     }

// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       notify("Session expired. Please login again.");
// //       navigate("/login");
// //       return;
// //     }

// //     try {
// //       setIsSubmitting(true);

// //       console.log("💾 Saving domain...");

// //       // ✅ Step 1: Save domain/subdomain
// //       const saveResponse = await API(
// //         "POST",
// //         URL_PATH.jobDomain,
// //         {
// //           userId,
// //           domainId: domain.id,
// //           // subDomainId: subDomain.id,
// //         },
// //         {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       );

// //       console.log("✅ Domain saved:", saveResponse);

// //       localStorage.setItem("domainId", domain.id);
// //       // localStorage.setItem("subDomainId", subDomain.id);
// //       localStorage.setItem("jobDomain", domain.name);
// //       // localStorage.setItem("subDomain", subDomain.name);

// //       // ✅ Step 2: Get updated navigation status
// //       console.log("🔍 Fetching updated navigation...");

// //       const statusResponse = await API("GET", URL_PATH.getUserStatus);

// //       if (!statusResponse?.success) {
// //         console.error("❌ Failed to get navigation:", statusResponse);
// //         notify("Failed to get next step");
// //         setIsSubmitting(false);
// //         return;
// //       }

// //       console.log("📊 Updated navigation:", statusResponse.navigation);

// //       // ✅ Step 3: Update Redux with new navigation
// //       dispatch(
// //         setNavigation({
// //           nextRoute: statusResponse.navigation.nextRoute,
// //           currentStep: statusResponse.navigation.currentStep,
// //           completedSteps: statusResponse.navigation.completedSteps,
// //           isOnboardingComplete: statusResponse.navigation.isOnboardingComplete,
// //           hasPayment: statusResponse.navigation.hasPayment,
// //         }),
// //       );

// //       // ✅ Step 4: Navigate to next step
// //       console.log("🚀 Navigating to:", statusResponse.navigation.nextRoute);
// //       navigate(statusResponse.navigation.nextRoute);
// //     } catch (err: any) {
// //       console.error("❌ Error:", err);
// //       notify(err?.response?.data?.message || "Failed to save job domain");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // -------------------- FETCH USER SELECTED DOMAIN --------------------
// //   useEffect(() => {
// //     const fetchUserSelectedDomain = async () => {
// //       if (!userId) return;

// //       try {
// //         console.log("📋 Fetching user selected domain...");

// //         const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
// //           "user-id": userId,
// //         });

// //         // API returns array
// //         if (Array.isArray(res) && res.length > 0) {
// //           const item = res[0];

// //           if (item.domainId) {
// //             setDomain({
// //               id: item.domainId._id,
// //               name: item.domainId.name,
// //             });
// //           }

// //           // if (item.subDomainId) {
// //           //   setSubDomain({
// //           //     id: item.subDomainId._id,
// //           //     name: item.subDomainId.name,
// //           //   });
// //           // }
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch job domain", err);
// //       }
// //     };

// //     fetchUserSelectedDomain();
// //   }, [userId]);

// //   // -------------------- FETCH ALL DOMAINS --------------------
// //   useEffect(() => {
// //     const fetchAvailableDomains = async () => {
// //       try {
// //         console.log("📋 Fetching available domains...");

// //         const res = await API("GET", URL_PATH.getJobDomain);

// //         const activeDomains = res.map((d: any) => ({
// //           _id: d._id,
// //           name: d.name,
// //         }));

// //         setDomains(activeDomains);
// //       } catch (err) {
// //         console.error("Failed to load domains", err);
// //         notify("Unable to load job domains");
// //       }
// //     };

// //     fetchAvailableDomains();
// //   }, []);

// //   // // -------------------- FETCH SUBDOMAINS BY DOMAIN --------------------
// //   // useEffect(() => {
// //   //   if (!domain) {
// //   //     setSubDomains([]);
// //   //     setSubDomain(null);
// //   //     return;
// //   //   }

// //   //   const fetchSubDomains = async () => {
// //   //     try {
// //   //       console.log("📋 Fetching subdomains for domain:", domain.id);

// //   //       const res = await API(
// //   //         "GET",
// //   //         `${URL_PATH.getSubDomain}?domainId=${domain.id}`
// //   //       );

// //   //       setSubDomains(
// //   //         res.data.map((item: any) => ({
// //   //           _id: item._id,
// //   //           name: item.name,
// //   //         }))
// //   //       );
// //   //     } catch (err) {
// //   //       console.error("Failed to fetch sub domains", err);
// //   //       notify("Unable to load sub domains");
// //   //     }
// //   //   };

// //   //   fetchSubDomains();
// //   // }, [domain]);

// //   // -------------------- UI --------------------
// //   return (
// //     <>
// //       <Navbar />
// //       {/* 🎨 Linear gradient background - fixed behind everything */}
// //       <div
// //         className="pointer-events-none fixed inset-0 -z-10"
// //         style={{
// //           background: `linear-gradient(
// //           to bottom,
// //           #d9d9d9 0%,
// //           #cfd3d6 25%,
// //           #9aa6b2 55%,
// //           #2E4056 100%
// //         )`,
// //           width: "100%",
// //         }}
// //       />

// //       {/* Page */}
// //       <div className="min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex items-center justify-center">
// //         <div className="w-full max-w-[660px] mx-auto">
// //           <div
// //             className="flex w-full flex-col gap-6 sm:gap-8 rounded-3xl border px-5 sm:px-8 md:px-10 py-7 sm:py-8 shadow-xl backdrop-blur-md"
// //             style={{
// //               backgroundColor: `${colors.white}CC`,
// //               borderColor: colors.neutral[200],
// //             }}
// //           >
// //             {/* Header */}
// //             <div className="flex items-center gap-3 sm:gap-4">
// //               <IconButton
// //                 size="small"
// //                 icon={<FeatherArrowLeft />}
// //                 onClick={() => navigate(-1)}
// //               />

// //               <div className="flex flex-1 gap-2">
// //                 {[...Array(2)].map((_, i) => (
// //                   <div
// //                     key={`done-${i}`}
// //                     className="h-1 flex-1 rounded-full"
// //                     style={{ backgroundColor: colors.primary }}
// //                   />
// //                 ))}

// //                 {[...Array(3)].map((_, i) => (
// //                   <div
// //                     key={`todo-${i}`}
// //                     className="h-1 flex-1 rounded-full"
// //                     style={{ backgroundColor: colors.neutral[200] }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Title */}
// //             <div className="flex flex-col gap-1">
// //               <h2
// //                 className="text-[20px] sm:text-[22px] md:text-[26px] font-semibold"
// //                 style={{ color: colors.neutral[800] }}
// //               >
// //                 Choose your job domain
// //               </h2>

// //               <p
// //                 className="text-xs sm:text-sm"
// //                 style={{ color: colors.neutral[600] }}
// //               >
// //                 Your domain and skills will decide your assessment and rankings
// //               </p>
// //             </div>

// //             {/* Domain Dropdown */}
// //             <div className="flex flex-col gap-2">
// //               <label
// //                 className="text-sm font-medium"
// //                 style={{ color: colors.neutral[800] }}
// //               >
// //                 Job Domain <span className="text-red-500">*</span>
// //               </label>

// //               <SubframeCore.DropdownMenu.Root
// //                 open={isDomainOpen}
// //                 onOpenChange={setIsDomainOpen}
// //               >
// //                 <SubframeCore.DropdownMenu.Trigger asChild>
// //                   <div
// //                     className="flex h-10 sm:h-11 items-center justify-between rounded-3xl border px-4 cursor-pointer transition"
// //                     style={{
// //                       backgroundColor: `${colors.white}CC`,
// //                       borderColor: colors.neutral[200],
// //                     }}
// //                   >
// //                     <span
// //                       className="text-sm sm:text-base"
// //                       style={{
// //                         color: domain
// //                           ? colors.neutral[800]
// //                           : colors.neutral[400],
// //                       }}
// //                     >
// //                       {domain?.name || "Select your domain"}
// //                     </span>

// //                     <FeatherChevronDown
// //                       style={{ color: colors.neutral[600] }}
// //                     />
// //                   </div>
// //                 </SubframeCore.DropdownMenu.Trigger>

// //                 <SubframeCore.DropdownMenu.Content
// //                   asChild
// //                   align="start"
// //                   sideOffset={6}
// //                 >
// //                   <div
// //                     className="rounded-2xl z-10 shadow-lg py-2 max-h-[260px] overflow-y-auto border backdrop-blur-md"
// //                     style={{
// //                       backgroundColor: `${colors.white}F2`,
// //                       borderColor: colors.neutral[200],
// //                     }}
// //                   >
// //                     {domains.map((item) => {
// //                       const selected = domain?.id === item._id;

// //                       return (
// //                         <div
// //                           key={item._id}
// //                           onClick={() => {
// //                             console.log("🎯 Domain selected:", item.name);
// //                             setDomain({ id: item._id, name: item.name });
// //                             setIsDomainOpen(false);
// //                           }}
// //                           className="px-4 py-2 cursor-pointer text-sm sm:text-base transition"
// //                           style={{
// //                             backgroundColor: selected
// //                               ? colors.primaryGlow
// //                               : "transparent",
// //                             color: colors.neutral[800],
// //                             fontWeight: selected ? 600 : 400,
// //                           }}
// //                           onMouseEnter={(e) => {
// //                             if (!selected)
// //                               e.currentTarget.style.backgroundColor = `${colors.primaryGlow}99`;
// //                           }}
// //                           onMouseLeave={(e) => {
// //                             if (!selected)
// //                               e.currentTarget.style.backgroundColor =
// //                                 "transparent";
// //                           }}
// //                         >
// //                           {item.name}
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
// //                 </SubframeCore.DropdownMenu.Content>
// //               </SubframeCore.DropdownMenu.Root>
// //             </div>

// //             {/* SubDomain Dropdown */}
// //             {/* <div className="flex flex-col gap-2">
// //             <label className="text-sm font-medium text-neutral-900">
// //               Sub Domain <span className="text-red-500">*</span>
// //             </label>

// //             <SubframeCore.DropdownMenu.Root>
// //               <SubframeCore.DropdownMenu.Trigger asChild>
// //                 <div
// //                   className={`flex h-10 items-center justify-between rounded-3xl border border-neutral-300 px-4 cursor-pointer ${
// //                     !domain
// //                       ? "bg-neutral-100 cursor-not-allowed"
// //                       : "bg-neutral-50"
// //                   }`}
// //                 >
// //                   <span
// //                     className={
// //                       subDomain ? "text-neutral-600" : "text-neutral-400"
// //                     }
// //                   >
// //                     {subDomain?.name || "Select sub domain"}
// //                   </span>
// //                   <FeatherChevronDown />
// //                 </div>
// //               </SubframeCore.DropdownMenu.Trigger>

// //               {domain && (
// //                 <SubframeCore.DropdownMenu.Content
// //                   asChild
// //                   align="start"
// //                   sideOffset={4}
// //                 >
// //                   <div className="bg-white rounded-2xl shadow-lg py-2 max-h-[260px] overflow-y-auto">
// //                     {subDomains.map((item) => (
// //                       <div
// //                         key={item._id}
// //                         onClick={() => {
// //                           console.log("🎯 SubDomain selected:", item.name);
// //                           setSubDomain({ id: item._id, name: item.name });
// //                         }}
// //                         className={`px-4 py-2 cursor-pointer text-sm hover:bg-violet-50 ${
// //                           subDomain?.id === item._id
// //                             ? "bg-violet-100 font-semibold"
// //                             : ""
// //                         }`}
// //                       >
// //                         {item.name}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </SubframeCore.DropdownMenu.Content>
// //               )}
// //             </SubframeCore.DropdownMenu.Root>
// //           </div> */}

// //             {/* Footer */}
// //             <Button
// //               onClick={handleContinue}
// //               disabled={!domain || isSubmitting}
// //               className="w-full h-10 sm:h-11 rounded-2xl text-sm sm:text-base font-semibold transition active:scale-[0.99]"
// //               style={{
// //                 backgroundColor:
// //                   !domain || isSubmitting ? colors.neutral[200] : colors.accent,
// //                 color: colors.background,
// //                 cursor: !domain || isSubmitting ? "not-allowed" : "pointer",
// //                 opacity: !domain || isSubmitting ? 0.7 : 1,
// //               }}
// //             >
// //               {isSubmitting ? "Saving..." : "Continue"}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }

// export default JobDomain;
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import HeaderLogo from "src/ui/components/HeaderLogo";
import {
  FeatherArrowLeft,
  FeatherChevronDown,
  FeatherBriefcase,
  FeatherTarget,
  FeatherZap,
  FeatherStar,
  FeatherCheckSquare,
} from "@subframe/core";
import { useNavigate } from "react-router-dom";
import * as SubframeCore from "@subframe/core";
import API, { URL_PATH } from "src/common/API";
import { useAppDispatch } from "src/store/hooks";
import { setNavigation, completeStep } from "src/store/slices/onboardingSlice";
import { colors } from "src/common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";

// Define types
interface Domain {
  _id: string;
  name: string;
}

interface SelectedDomain {
  id: string;
  name: string;
}

// ============================================
// ILLUSTRATION COMPONENT WITH BLUE, GREEN, PINK BORDERS
// ============================================
const DomainIllustration: React.FC<{ className?: string }> = ({
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

      {/* Background glow circles with different colors */}
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

      {/* Main domain/concentric circles with colored borders */}
      <motion.circle
        cx="200"
        cy="200"
        r="120"
        stroke="url(#blueGradient)"
        strokeWidth="2"
        strokeDasharray="8 8"
        fill="none"
        opacity="0.5"
        filter="url(#glow)"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="90"
        stroke="url(#pinkGradient)"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
        opacity="0.5"
        filter="url(#glow)"
        animate={{
          rotate: -360,
          scale: [1, 1.03, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="60"
        stroke="url(#greenGradient)"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.5"
        filter="url(#glow)"
        animate={{
          rotate: 180,
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Domain icons/symbols with colored borders */}
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
        {/* Technology domain symbol - Blue */}
        <rect
          x="140"
          y="140"
          width="30"
          height="30"
          rx="8"
          fill="url(#blueGradient)"
          fillOpacity="0.15"
          stroke="url(#blueGradient)"
          strokeWidth="2"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
        <path
          d="M155 150 L155 160 M150 155 L160 155"
          stroke="url(#blueGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Business domain symbol - Pink */}
        <circle
          cx="260"
          cy="160"
          r="15"
          fill="url(#pinkGradient)"
          fillOpacity="0.15"
          stroke="url(#pinkGradient)"
          strokeWidth="2"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
        <path
          d="M260 155 L260 165 M255 160 L265 160"
          stroke="url(#pinkGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Design domain symbol - Green */}
        <path
          d="M150 260 L165 245 L180 260 L165 275 L150 260"
          fill="url(#greenGradient)"
          fillOpacity="0.15"
          stroke="url(#greenGradient)"
          strokeWidth="2"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />

        {/* Marketing domain symbol - Purple */}
        <path
          d="M250 260 L265 245 L280 260 L265 275 L250 260"
          fill="url(#purpleGradient)"
          fillOpacity="0.15"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
      </motion.g>

      {/* Connection lines with colored gradients */}
      <motion.path
        d="M155 155 L200 200 L260 160 L200 200 L165 260 L200 200 L250 260"
        stroke="url(#blueGradient)"
        strokeWidth="1"
        opacity="0.2"
        strokeDasharray="4 4"
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

      {/* Floating particles with colors */}
      <motion.circle
        cx="100"
        cy="120"
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
        cy="280"
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
        cy="100"
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

      {/* Central glow */}
      <motion.circle
        cx="200"
        cy="200"
        r="30"
        fill="url(#purpleGradient)"
        opacity="0.1"
        filter="url(#glow)"
        animate={{
          r: [30, 40, 30],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
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
function JobDomain() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [domain, setDomain] = useState<SelectedDomain | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const userId = React.useMemo(() => localStorage.getItem("userId"), []);

  // Steps for progress
  const steps = [
    { label: "Domain", active: true },
    { label: "Skills", active: false },
    { label: "Assessment", active: false },
    { label: "Complete", active: false },
  ];

  // -------------------- HANDLE BACK BUTTON --------------------
  const handleBack = () => {
    navigate("/paywall");
  };

  // -------------------- SAVE DOMAIN --------------------
  const handleContinue = async () => {
    if (!domain) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);

      const saveResponse = await API(
        "POST",
        URL_PATH.jobDomain,
        {
          userId,
          domainId: domain.id,
        },
        {
          Authorization: `Bearer ${token}`,
        },
      );

      localStorage.setItem("domainId", domain.id);
      localStorage.setItem("jobDomain", domain.name);

      dispatch(completeStep("job-domain"));

      const statusResponse = await API("GET", URL_PATH.getUserStatus);

      if (statusResponse?.success) {
        dispatch(
          setNavigation({
            nextRoute: statusResponse.navigation.nextRoute,
            currentStep: statusResponse.navigation.currentStep,
            completedSteps: statusResponse.navigation.completedSteps,
            isOnboardingComplete:
              statusResponse.navigation.isOnboardingComplete,
            hasPayment: statusResponse.navigation.hasPayment,
          }),
        );
      }

      setTimeout(() => {
        navigate("/skills");
      }, 100);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------- FETCH USER SELECTED DOMAIN --------------------
  useEffect(() => {
    const fetchUserSelectedDomain = async () => {
      if (!userId) return;

      try {
        const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
          "user-id": userId,
        });

        if (Array.isArray(res) && res.length > 0) {
          const item = res[0];

          if (item.domainId) {
            setDomain({
              id: item.domainId._id,
              name: item.domainId.name,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch job domain", err);
      }
    };

    fetchUserSelectedDomain();
  }, [userId]);

  // -------------------- FETCH ALL DOMAINS --------------------
  useEffect(() => {
    const fetchAvailableDomains = async () => {
      try {
        const res = await API("GET", URL_PATH.getJobDomain);
        const activeDomains: Domain[] = res.map((d: any) => ({
          _id: d._id,
          name: d.name,
        }));
        setDomains(activeDomains);
      } catch (err) {
        console.error("Failed to load domains", err);
      }
    };

    fetchAvailableDomains();
  }, []);

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
                <DomainIllustration />

                {/* Benefit cards */}
                <motion.div
                  className="mt-12 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    {
                      icon: FeatherTarget,
                      title: "Personalized Path",
                      desc: "Your domain determines your assessment and career trajectory",
                      color: "#3B82F6",
                    },
                    {
                      icon: FeatherBriefcase,
                      title: "Industry Aligned",
                      desc: "Choose from domains that match real industry roles",
                      color: "#EC4899",
                    },
                    {
                      icon: FeatherZap,
                      title: "Accelerated Growth",
                      desc: "Focus on skills that matter most for your chosen field",
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
                                  index === 0
                                    ? colors.primary
                                    : colors.neutral[200],
                                width: index === 0 ? "100%" : "0%",
                              }}
                              initial={{ width: "0%" }}
                              animate={{ width: index === 0 ? "100%" : "0%" }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          {index < steps.length - 1 && <div className="w-1" />}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="text-xs text-neutral-400 ml-2">1/4</span>
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
                      Choose your job domain
                    </h1>
                    <p
                      className="text-sm"
                      style={{ color: colors.neutral[600] }}
                    >
                      Your domain and skills will decide your assessment and
                      rankings
                    </p>
                  </motion.div>

                  {/* Domain Dropdown */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      className="text-xs font-medium mb-2 block"
                      style={{ color: colors.neutral[500] }}
                    >
                      JOB DOMAIN <span className="text-red-500">*</span>
                    </label>

                    <SubframeCore.DropdownMenu.Root
                      open={isDomainOpen}
                      onOpenChange={setIsDomainOpen}
                    >
                      <SubframeCore.DropdownMenu.Trigger asChild>
                        <motion.div
                          className="flex items-center justify-between cursor-pointer py-2 border-b"
                          style={{
                            borderColor:
                              focusedField === "domain"
                                ? colors.primary
                                : colors.neutral[200],
                          }}
                          onFocus={() => setFocusedField("domain")}
                          onBlur={() => setFocusedField(null)}
                          whileHover={{ borderColor: colors.primary }}
                          transition={{ duration: 0.2 }}
                        >
                          <span
                            className="text-sm"
                            style={{
                              color: domain
                                ? colors.accent
                                : colors.neutral[400],
                            }}
                          >
                            {domain?.name || "Select your domain"}
                          </span>
                          <motion.div
                            animate={{ rotate: isDomainOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FeatherChevronDown
                              style={{ color: colors.neutral[600] }}
                            />
                          </motion.div>
                        </motion.div>
                      </SubframeCore.DropdownMenu.Trigger>

                      <SubframeCore.DropdownMenu.Content
                        asChild
                        align="start"
                        sideOffset={6}
                      >
                        <motion.div
                          className="rounded-xl shadow-lg py-2 max-h-[260px] overflow-y-auto border backdrop-blur-md z-50"
                          style={{
                            backgroundColor: `${colors.white}F2`,
                            borderColor: colors.neutral[200],
                          }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {domains.map((item) => {
                            const selected = domain?.id === item._id;

                            return (
                              <motion.div
                                key={item._id}
                                onClick={() => {
                                  setDomain({ id: item._id, name: item.name });
                                  setIsDomainOpen(false);
                                }}
                                className="px-4 py-3 cursor-pointer text-sm transition-all"
                                style={{
                                  backgroundColor: selected
                                    ? `${colors.primary}10`
                                    : "transparent",
                                  color: selected
                                    ? colors.primary
                                    : colors.neutral[600],
                                  borderLeft: selected
                                    ? `2px solid ${colors.primary}`
                                    : "2px solid transparent",
                                }}
                                whileHover={{
                                  backgroundColor: `${colors.primary}05`,
                                  x: 5,
                                }}
                              >
                                {item.name}
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Root>
                  </motion.div>

                  {/* Continue Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <GlassButton
                      onClick={handleContinue}
                      disabled={!domain || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Saving..." : "Continue"}
                    </GlassButton>
                  </motion.div>

                  {/* Domain count */}
                  {domains.length > 0 && (
                    <motion.p
                      className="text-xs text-center mt-4"
                      style={{ color: colors.neutral[400] }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {domains.length} domains available
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

export default JobDomain;

// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "../ui/components/Button";
// import { IconButton } from "../ui/components/IconButton";
// import {
//   FeatherArrowLeft,
//   FeatherChevronDown,
//   FeatherBriefcase,
// } from "@subframe/core";
// import { useNavigate } from "react-router-dom";
// import * as SubframeCore from "@subframe/core";
// import API, { URL_PATH } from "src/common/API";
// import { useAppDispatch } from "src/store/hooks";
// import { setNavigation, completeStep } from "src/store/slices/onboardingSlice";
// import { colors } from "src/common/Colors";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "../ui/components/Footer";

// // Define types
// interface Domain {
//   _id: string;
//   name: string;
// }

// interface SelectedDomain {
//   id: string;
//   name: string;
// }

// const notify = (msg: string) => {
//   console.warn(msg);
// };

// function JobDomain() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [isDomainOpen, setIsDomainOpen] = useState(false);

//   console.log("📍 [JobDomain] ==================");
//   console.log("📍 [JobDomain] Component mounted");
//   console.log("📍 [JobDomain] Current path:", window.location.pathname);

//   const userId = React.useMemo(() => localStorage.getItem("userId"), []);
//   console.log("📍 [JobDomain] User ID from localStorage:", userId);

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Domain
//   const [domain, setDomain] = useState<SelectedDomain | null>(null);
//   const [domains, setDomains] = useState<Domain[]>([]);

//   // -------------------- HANDLE BACK BUTTON --------------------
//   const handleBack = () => {
//     console.log("⬅️ [JobDomain] ===== BACK BUTTON CLICKED =====");
//     console.log("⬅️ [JobDomain] Navigating to /paywall");
//     navigate("/paywall");
//   };

//   // -------------------- SAVE DOMAIN --------------------
//   const handleContinue = async () => {
//     console.log("🔄 [JobDomain] ===== CONTINUE BUTTON CLICKED =====");
//     console.log("🔄 [JobDomain] Selected domain:", domain);

//     if (!domain) {
//       console.log("⚠️ [JobDomain] No domain selected");
//       notify("Please select domain.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     console.log("🔑 [JobDomain] Token present:", !!token);

//     if (!token) {
//       console.log("🚫 [JobDomain] No token found");
//       notify("Session expired. Please login again.");
//       navigate("/login");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       console.log("⏳ [JobDomain] Saving domain to API...");

//       // ✅ Step 1: Save domain
//       const saveResponse = await API(
//         "POST",
//         URL_PATH.jobDomain,
//         {
//           userId,
//           domainId: domain.id,
//         },
//         {
//           Authorization: `Bearer ${token}`,
//         },
//       );

//       console.log("✅ [JobDomain] Domain saved:", saveResponse);

//       // Save to localStorage
//       localStorage.setItem("domainId", domain.id);
//       localStorage.setItem("jobDomain", domain.name);
//       console.log("💾 [JobDomain] Saved to localStorage:", {
//         domainId: domain.id,
//         jobDomain: domain.name,
//       });

//       // ✅ Step 2: Mark job-domain as completed in Redux
//       console.log("🔄 [JobDomain] Marking job-domain as completed in Redux");
//       dispatch(completeStep("job-domain"));

//       // ✅ Step 3: Get updated navigation status (for Redux update)
//       console.log("🔍 [JobDomain] Fetching updated navigation...");
//       const statusResponse = await API("GET", URL_PATH.getUserStatus);

//       if (statusResponse?.success) {
//         console.log(
//           "📊 [JobDomain] Updating Redux with navigation:",
//           statusResponse.navigation,
//         );
//         dispatch(
//           setNavigation({
//             nextRoute: statusResponse.navigation.nextRoute,
//             currentStep: statusResponse.navigation.currentStep,
//             completedSteps: statusResponse.navigation.completedSteps,
//             isOnboardingComplete:
//               statusResponse.navigation.isOnboardingComplete,
//             hasPayment: statusResponse.navigation.hasPayment,
//           }),
//         );
//       }

//       // ✅ Step 4: Navigate to /skills
//       console.log("🚀 [JobDomain] NAVIGATING TO: /skills");
//       setTimeout(() => {
//         navigate("/skills");
//       }, 100);
//     } catch (err: any) {
//       console.error("❌ [JobDomain] Error:", err);
//       notify(err?.response?.data?.message || "Failed to save job domain");
//     } finally {
//       setIsSubmitting(false);
//       console.log("🏁 [JobDomain] Submission complete");
//     }
//   };

//   // -------------------- FETCH USER SELECTED DOMAIN --------------------
//   useEffect(() => {
//     const fetchUserSelectedDomain = async () => {
//       if (!userId) return;

//       try {
//         console.log("📋 [JobDomain] Fetching user selected domain...");

//         const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
//           "user-id": userId,
//         });

//         if (Array.isArray(res) && res.length > 0) {
//           const item = res[0];

//           if (item.domainId) {
//             console.log(
//               "✅ [JobDomain] Found existing domain:",
//               item.domainId.name,
//             );
//             setDomain({
//               id: item.domainId._id,
//               name: item.domainId.name,
//             });
//           }
//         }
//       } catch (err) {
//         console.error("❌ [JobDomain] Failed to fetch job domain", err);
//       }
//     };

//     fetchUserSelectedDomain();
//   }, [userId]);

//   // -------------------- FETCH ALL DOMAINS --------------------
//   useEffect(() => {
//     const fetchAvailableDomains = async () => {
//       try {
//         console.log("📋 [JobDomain] Fetching available domains...");

//         const res = await API("GET", URL_PATH.getJobDomain);

//         const activeDomains: Domain[] = res.map((d: any) => ({
//           _id: d._id,
//           name: d.name,
//         }));

//         console.log(
//           "✅ [JobDomain] Available domains:",
//           activeDomains.map((d) => d.name).join(", "),
//         );
//         setDomains(activeDomains);
//       } catch (err) {
//         console.error("❌ [JobDomain] Failed to load domains", err);
//         notify("Unable to load job domains");
//       }
//     };

//     fetchAvailableDomains();
//   }, []);

//   // -------------------- UI --------------------
//   return (
//     <div className="min-h-screen bg-neutral-50 relative overflow-hidden flex flex-col">
//       {/* Background Gradient Effects for Glass */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Large blurred circles */}
//         <div
//           className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//           style={{ backgroundColor: colors.primary }}
//         />
//         <div
//           className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//           style={{ backgroundColor: colors.secondary || colors.primary }}
//         />

//         {/* Decorative Shapes */}
//         <div className="absolute top-20 left-20 opacity-10">
//           <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
//             <circle
//               cx="60"
//               cy="60"
//               r="40"
//               stroke={colors.primary}
//               strokeWidth="2"
//               strokeDasharray="4 4"
//             />
//             <circle
//               cx="60"
//               cy="60"
//               r="20"
//               fill={colors.primary}
//               opacity="0.2"
//             />
//           </svg>
//         </div>

//         <div className="absolute bottom-20 right-20 opacity-10">
//           <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
//             <rect
//               x="25"
//               y="25"
//               width="100"
//               height="100"
//               rx="20"
//               stroke={colors.primary}
//               strokeWidth="2"
//               strokeDasharray="6 6"
//             />
//             <rect
//               x="45"
//               y="45"
//               width="60"
//               height="60"
//               rx="12"
//               fill={colors.primary}
//               opacity="0.2"
//             />
//           </svg>
//         </div>
//       </div>

//       <Navbar />

//       <div className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
//         {/* Header with back button - matching Paywall */}
//         <div className="flex items-center gap-3 mb-8 max-w-[660px] mx-auto">
//           <button
//             onClick={handleBack}
//             className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 bg-white/50 backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
//           >
//             <FeatherArrowLeft className="w-4 h-4" />
//           </button>
//           <div className="flex-1 flex items-center gap-1">
//             <div className="h-1 flex-1 bg-neutral-200/50 backdrop-blur-sm rounded-full overflow-hidden">
//               <div
//                 className="h-full rounded-full transition-all duration-500"
//                 style={{ width: "40%", backgroundColor: colors.primary }}
//               />
//             </div>
//             <span className="text-xs text-neutral-500 ml-2 bg-white/30 backdrop-blur-sm px-2 py-1 rounded-full">
//               Domain
//             </span>
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <div className="w-full max-w-[660px]">
//             {/* Glass Card - matching Paywall */}
//             <div
//               className="backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
//               style={{
//                 backgroundColor: `${colors.white}CC`,
//                 border: `1px solid ${colors.white}`,
//                 boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)",
//               }}
//             >
//               {/* Inner Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//               {/* Decorative Icon */}
//               <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
//                 <FeatherBriefcase
//                   className="w-12 h-12"
//                   style={{ color: colors.primary }}
//                 />
//               </div>

//               {/* Content */}
//               <div className="relative z-10">
//                 {/* Illustration Image */}
//                 <div className="flex justify-center mb-6">
//                   <div className="p-4 rounded-2xl bg-white/30 backdrop-blur-sm">
//                     <img
//                       src="/job-domain-illustration.svg"
//                       alt="Job Domain Illustration"
//                       className="w-32 h-32 object-contain drop-shadow-lg"
//                       onError={(e) => {
//                         e.currentTarget.style.display = "none";
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Title - matching Paywall typography */}
//                 <div className="flex flex-col items-center gap-2 text-center mb-8">
//                   <h1 className="text-2xl sm:text-3xl font-light text-neutral-900">
//                     Choose your job domain
//                   </h1>
//                   <p className="text-sm text-neutral-500 max-w-md backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full">
//                     Your domain and skills will decide your assessment and
//                     rankings
//                   </p>
//                 </div>

//                 {/* Domain Dropdown */}
//                 <div className="flex flex-col gap-2 mb-8">
//                   <label
//                     className="text-sm font-medium ml-1"
//                     style={{ color: colors.neutral[700] }}
//                   >
//                     Job Domain <span className="text-red-500">*</span>
//                   </label>

//                   <SubframeCore.DropdownMenu.Root
//                     open={isDomainOpen}
//                     onOpenChange={setIsDomainOpen}
//                   >
//                     <SubframeCore.DropdownMenu.Trigger asChild>
//                       <div
//                         className="group flex h-12 sm:h-13 items-center justify-between rounded-2xl border-2 px-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
//                         style={{
//                           backgroundColor: domain
//                             ? `${colors.primary}08`
//                             : "rgba(255,255,255,0.3)",
//                           borderColor: domain
//                             ? colors.primary
//                             : "rgba(255,255,255,0.5)",
//                         }}
//                       >
//                         <span
//                           className="text-base sm:text-lg"
//                           style={{
//                             color: domain ? colors.accent : colors.neutral[400],
//                           }}
//                         >
//                           {domain?.name || "Select your domain"}
//                         </span>

//                         <FeatherChevronDown
//                           className="w-5 h-5 transition-transform group-hover:rotate-180"
//                           style={{ color: colors.neutral[600] }}
//                         />
//                       </div>
//                     </SubframeCore.DropdownMenu.Trigger>

//                     <SubframeCore.DropdownMenu.Portal>
//                       <SubframeCore.DropdownMenu.Content
//                         align="start"
//                         sideOffset={8}
//                         className="z-50"
//                       >
//                         <div
//                           className="rounded-2xl shadow-xl py-2 max-h-[280px] overflow-y-auto border-2 backdrop-blur-xl"
//                           style={{
//                             backgroundColor: `${colors.white}F2`,
//                             borderColor: colors.neutral[200],
//                             width: "var(--radix-dropdown-menu-trigger-width)",
//                           }}
//                         >
//                           {domains.map((item) => {
//                             const selected = domain?.id === item._id;

//                             return (
//                               <div
//                                 key={item._id}
//                                 onClick={() => {
//                                   console.log(
//                                     "🎯 [JobDomain] Domain selected:",
//                                     item.name,
//                                   );
//                                   setDomain({ id: item._id, name: item.name });
//                                   setIsDomainOpen(false);
//                                 }}
//                                 className="px-5 py-3 cursor-pointer text-base transition-all duration-200 hover:pl-7"
//                                 style={{
//                                   backgroundColor: selected
//                                     ? `${colors.primary}15`
//                                     : "transparent",
//                                   color: selected
//                                     ? colors.primary
//                                     : colors.neutral[700],
//                                   fontWeight: selected ? 600 : 400,
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   if (!selected) {
//                                     e.currentTarget.style.backgroundColor = `${colors.primary}08`;
//                                   }
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   if (!selected) {
//                                     e.currentTarget.style.backgroundColor =
//                                       "transparent";
//                                   }
//                                 }}
//                               >
//                                 {item.name}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </SubframeCore.DropdownMenu.Content>
//                     </SubframeCore.DropdownMenu.Portal>
//                   </SubframeCore.DropdownMenu.Root>
//                 </div>

//                 {/* Continue Button - matching Paywall style */}
//                 <button
//                   onClick={handleContinue}
//                   disabled={!domain || isSubmitting}
//                   className="group relative w-full h-12 sm:h-14 rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 overflow-hidden"
//                   style={{
//                     cursor: !domain || isSubmitting ? "not-allowed" : "pointer",
//                     opacity: !domain || isSubmitting ? 0.75 : 1,
//                   }}
//                 >
//                   {/* Button Background with Gradient */}
//                   <div
//                     className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
//                     style={{
//                       background:
//                         !domain || isSubmitting
//                           ? colors.neutral[200]
//                           : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary || colors.primary})`,
//                     }}
//                   />

//                   {/* Button Content */}
//                   <div className="relative z-10 flex items-center justify-center gap-2 text-white">
//                     {isSubmitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
//                         Saving...
//                       </>
//                     ) : domain ? (
//                       "Continue"
//                     ) : (
//                       "Select a Domain to Continue"
//                     )}
//                   </div>

//                   {/* Hover Glow Effect */}
//                   {domain && !isSubmitting && (
//                     <div
//                       className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
//                       style={{
//                         background: colors.primary,
//                         filter: "blur(20px)",
//                       }}
//                     />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default JobDomain;

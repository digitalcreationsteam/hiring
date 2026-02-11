
// "use client";

// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import API, { URL_PATH, BASE_URL } from "src/common/API";
// import { colors } from "../common/Colors";
// import { Button } from "../ui/components/Button";
// import { Avatar } from "../ui/components/Avatar";
// import {
//   FeatherArrowLeft,
//   FeatherArrowRight,
//   FeatherClock,
//   FeatherFileText,
//   FeatherGlobe,
//   FeatherMapPin,
//   FeatherTarget,
// } from "@subframe/core";

// /* ==================== TYPES ==================== */

// type Difficulty = "Easy" | "Medium" | "Hard";

// // type CaseItem = {
// //   id: string;
// //   title: string;
// //   desc: string;
// //   difficulty: Difficulty;
// //   points: number;
// //   minutes: number;
// //   icon: React.ReactNode;
// // };

// type BackendCase = {
//   _id: string;
//   title: string;
//   description?: string;
//   totalQuestions: number;
//   maxAttempts: number;
//   isActive: boolean;
//   createdAt: string;
// };

// type CaseItem = {
//   _id: string;
//   title: string;
//   description: string;
//   difficulty: Difficulty;
//   points: number;
//   minutes: number;
//   icon: React.ReactNode;
// };


// type StudentProfile = {
//   name: string;
//   email: string;
//   location: string;
//   avatar: string;
// };

// /* ==================== CONSTANTS ==================== */

// const DEFAULT_AVATAR =
//   "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

// // const cases: CaseItem[] = [
// //   {
// //     id: "1",
// //     title: "Product Metrics Analysis",
// //     desc: "Analyze user engagement metrics for a mobile app and recommend improvements.",
// //     difficulty: "Easy",
// //     points: 15,
// //     minutes: 45,
// //     icon: (
// //       <div
// //         className="h-10 w-10 rounded-2xl grid place-items-center"
// //         style={{ backgroundColor: colors.cream, color: colors.accent }}
// //       >
// //         ⌁
// //       </div>
// //     ),
// //   },
// //   {
// //     id: "2",
// //     title: "Feature Prioritization",
// //     desc: "Prioritize a backlog of features with limited engineering resources.",
// //     difficulty: "Medium",
// //     points: 25,
// //     minutes: 60,
// //     icon: (
// //       <div
// //         className="h-10 w-10 rounded-2xl grid place-items-center"
// //         style={{ backgroundColor: colors.mint, color: colors.secondary }}
// //       >
// //         ✦
// //       </div>
// //     ),
// //   },
// //   {
// //     id: "3",
// //     title: "Product Strategy & Vision",
// //     desc: "Develop a 3-year product strategy for a declining B2B SaaS platform.",
// //     difficulty: "Hard",
// //     points: 40,
// //     minutes: 90,
// //     icon: (
// //       <div
// //         className="h-10 w-10 rounded-2xl grid place-items-center"
// //         style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
// //       >
// //         ◈
// //       </div>
// //     ),
// //   },
// //   {
// //     id: "4",
// //     title: "User Research Synthesis",
// //     desc: "Review interview transcripts and synthesize insights into actionable recommendations.",
// //     difficulty: "Easy",
// //     points: 18,
// //     minutes: 50,
// //     icon: (
// //       <div
// //         className="h-10 w-10 rounded-2xl grid place-items-center"
// //         style={{ backgroundColor: colors.cream, color: colors.accent }}
// //       >
// //         ⟡
// //       </div>
// //     ),
// //   },
// //   {
// //     id: "5",
// //     title: "Go-to-Market Planning",
// //     desc: "Create a GTM plan for a new feature, including positioning and launch tactics.",
// //     difficulty: "Medium",
// //     points: 28,
// //     minutes: 75,
// //     icon: (
// //       <div
// //         className="h-10 w-10 rounded-2xl grid place-items-center"
// //         style={{ backgroundColor: colors.mint, color: colors.secondary }}
// //       >
// //         ⬣
// //       </div>
// //     ),
// //   },
// //   {
// //     id: "6",
// //     title: "Crisis Management",
// //     desc: "Handle a critical incident affecting thousands of users. Coordinate comms and recovery.",
// //     difficulty: "Hard",
// //     points: 45,
// //     minutes: 120,
// //     icon: (
// //       <div
// //         className="h-10 w-10 rounded-2xl grid place-items-center"
// //         style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
// //       >
// //         ⚑
// //       </div>
// //     ),
// //   },
// // ];


// /* ==================== HELPERS ==================== */

// const formatLocation = (city?: string, state?: string): string =>
//   `${city || ""}, ${state || ""}`.trim().replace(/^,\s*|,\s*$/g, "");

// const normalizeAvatarUrl = (raw?: string): string => {
//   if (!raw) return DEFAULT_AVATAR;
//   const origin = BASE_URL.replace(/\/api\/?$/, "");
//   if (/^https?:\/\//.test(raw)) return raw;
//   if (raw.startsWith("/")) return origin + raw;
//   return origin + "/" + raw;
// };

// const difficultyBadge = (d: Difficulty) => {
//   if (d === "Easy") return { bg: colors.primary, text: colors.secondary };
//   if (d === "Medium") return { bg: colors.primary, text: colors.accent };
//   return { bg: "#FEE2E2", text: "#B91C1C" };
// };

// function DifficultyChip({ label }: { label: Difficulty }) {
//   const s = difficultyBadge(label);
//   return (
//     <span
//       className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
//       style={{ backgroundColor: s.bg, color: s.text }}
//     >
//       {label}
//     </span>
//   );
// }

// function StepCard({
//   title,
//   desc,
//   icon,
// }: {
//   title: string;
//   desc: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div
//       className="flex gap-3 rounded-[1.75rem] border shadow-sm px-5 py-4"
//       style={{ backgroundColor: colors.white, borderColor: colors.primary }}
//     >
//       <div
//         className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0"
//         style={{ backgroundColor: colors.primary, color: colors.accent }}
//       >
//         {icon}
//       </div>
//       <div className="min-w-0">
//         <p className="text-sm font-extrabold" style={{ color: colors.primary }}>
//           {title}
//         </p>
//         <p
//           className="mt-1 text-xs leading-relaxed"
//           style={{ color: colors.secondary }}
//         >
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// }

// function CaseCard({
//   item,
//   onStart,
// }: {
//   item: CaseItem;
//   onStart: (id: string) => void;
// }) {
//   return (
//     <div
//       className="bg-white border p-5 sm:p-6 rounded-3xl sm:rounded-[2rem] shadow-sm hover:shadow-md transition-all"
//       style={{ borderColor: colors.primary }}
//     >
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-center gap-3 min-w-0">
//           {item.icon}
//           <div className="min-w-0">
//             <p
//               className="text-sm sm:text-base font-extrabold truncate"
//               style={{ color: colors.primary }}
//             >
//               {item.title}
//             </p>
//             <p
//               className="mt-1 text-xs leading-relaxed line-clamp-2"
//               style={{ color: colors.secondary }}
//             >
//               {item.description}
//             </p>
//           </div>
//         </div>

//         <DifficultyChip label={item.difficulty} />
//       </div>

//       <div className="mt-5 grid grid-cols-2 gap-3">
//         <div
//           className="rounded-2xl border px-4 py-3"
//           style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
//         >
//           <p
//             className="text-[10px] font-black uppercase tracking-widest opacity-60"
//             style={{ color: colors.primary }}
//           >
//             Points Awarded
//           </p>
//           <p className="mt-1 text-sm font-extrabold" style={{ color: colors.accent }}>
//             +{item.points}
//           </p>
//         </div>

//         <div
//           className="rounded-2xl border px-4 py-3"
//           style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
//         >
//           <p
//             className="text-[10px] font-black uppercase tracking-widest opacity-60"
//             style={{ color: colors.primary }}
//           >
//             Time Required
//           </p>
//           <p className="mt-1 text-sm font-extrabold" style={{ color: colors.primary }}>
//             {item.minutes} min
//           </p>
//         </div>
//       </div>

//       <Button
//         variant="brand-primary"
//         className="mt-5 w-full rounded-2xl px-6 bg-violet-700 hover:bg-violet-800"
//         // onClick={() => onStart(item._id)}
//         onClick={() => onStart(item._id)}
//       >
//         Start Case Study <FeatherArrowRight className="ml-2 w-4 h-4" />
//       </Button>

//       <div
//         className="mt-5 h-1.5 rounded-full"
//         style={{ backgroundColor: difficultyBadge(item.difficulty).bg }}
//       />
//     </div>
//   );
// }

// /* ==================== MAIN COMPONENT ==================== */

// export default function CaseAssessmentsPage() {
//   const navigate = useNavigate();

//   /* ==================== STATE ==================== */

//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState<"All" | Difficulty>("All");
//   const [cases, setCases] = useState<BackendCase[]>([]);
//   const [loadingCases, setLoadingCases] = useState(true);


//   const [student, setStudent] = useState<StudentProfile>({
//     name: "",
//     email: "",
//     location: "",
//     avatar: DEFAULT_AVATAR,
//   });

//   const [loadingProfile, setLoadingProfile] = useState(true);

//   /* ==================== API CALLS ==================== */

//   const fetchStudentProfile = useCallback(async () => {
//     try {
//       setLoadingProfile(true);

//       // ✅ SAME endpoint you already use in dashboard
//       const res = await API("GET", URL_PATH.calculateExperienceIndex);

//       const demo = res?.data?.demographics?.[0];

//       const avatarFromServer = res?.documents?.profileUrl;

//       setStudent({
//         name: demo?.fullName || "",
//         email: demo?.email || "",
//         location: formatLocation(demo?.city, demo?.state),
//         avatar: normalizeAvatarUrl(avatarFromServer),
//       });
//     } catch (err) {
//       console.log("fetchStudentProfile failed:", err);
//       setStudent((p) => ({ ...p, avatar: DEFAULT_AVATAR }));
//     } finally {
//       setLoadingProfile(false);
//     }
//   }, []);

//   const fetchCases = useCallback(async () => {
//   try {
//     setLoadingCases(true);

//     const res = await API("GET", URL_PATH.getAllCases, {
//       page: 1,
//       limit: 20
//     });
//     setCases(res?.data || []);
//   } catch (err) {
//     console.error("fetchCases failed:", err);
//   } finally {
//     setLoadingCases(false);
//   }
// }, []);


//   const handleAssessmentClick = (caseId: string) => {
//     navigate("/case-assessment-opening", {
//       state: {
//         source: "dashboard",
//         caseId,
//       },
//     });
//   };



//   /* ==================== EFFECTS ==================== */

//   // useEffect(() => {
//   //   fetchStudentProfile();
//   // }, [fetchStudentProfile]);

//   useEffect(() => {
//   fetchStudentProfile();
//   fetchCases();
// }, [fetchStudentProfile, fetchCases]);


// const mappedCases: CaseItem[] = useMemo(() => {
//   return cases.map((c) => {
//     let difficulty: Difficulty = "Easy";

//     if (c.totalQuestions > 10 && c.totalQuestions <= 20) difficulty = "Medium";
//     if (c.totalQuestions > 20) difficulty = "Hard";

//     return {
//       _id: c._id,
//       title: c.title,
//       description: c.description || "No description provided",
//       difficulty,
//       points: c.totalQuestions * 2,
//       minutes: c.totalQuestions * 5,
//       icon: (
//         <div
//           className="h-10 w-10 rounded-2xl grid place-items-center"
//           style={{ backgroundColor: colors.primary, color: colors.accent }}
//         >
//           ⌁
//         </div>
//       ),
//     };
//   });
// }, [cases]);


//   /* ==================== MEMOS ==================== */

//   // const filteredCases = useMemo(() => {
//   //   const q = query.trim().toLowerCase();
//   //   return cases.filter((c) => {
//   //     const okFilter = filter === "All" ? true : c.difficulty === filter;
//   //     const okQuery = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
//   //     return okFilter && okQuery;
//   //   });
//   // }, [query, filter]);
//   const filteredCases = useMemo(() => {
//   const q = query.trim().toLowerCase();

//   return mappedCases.filter((c) => {
//     const okFilter = filter === "All" ? true : c.difficulty === filter;
//     const okQuery =
//       !q ||
//       c.title.toLowerCase().includes(q) ||
//       (c.description || "").toLowerCase().includes(q);

//     return okFilter && okQuery;
//   });
// }, [mappedCases, query, filter]);

//   /* ==================== HANDLERS ==================== */

// //   const onStart = (caseId: string) => {
// //   navigate("/case-assessment-opening", {
// //     state: {
// //       source: "dashboard",
// //       caseId,
// //     },
// //   });
// // };

// //   const onStart = async (caseId: string) => {
// //   try {
// //     const res = await API(
// //       "POST",
// //       URL_PATH.startCase(caseId), {}
// //     );

// //     const { attemptId } = res.data;

// //     navigate("/case-assessment-opening", {
// //       state: {
// //         caseId,
// //         attemptId,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Start case failed:", err);
// //   }
// // };

// // const onStart = async (caseId: string) => {
// //   try {
// //     const res = await API(
// //       "POST",
// //       URL_PATH.startCase(caseId),
// //       {}
// //     );

// //     const { attemptId, opening } = res.data;
// //     console.log(attemptId, opening);

// //     navigate("/case-assessment-opening", {
// //       state: {
// //         caseId,
// //         attemptId,
// //         opening,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Start case failed:", err);
// //   }
// // };

// const onStart = async (caseId: string) => {
//   try {
//     const res = await API(
//       "POST",
//       URL_PATH.startCase(caseId),
//       {}
//     );

//     // ✅ res IS the payload
//     const { attemptId, opening } = res;

//     navigate("/case-assessment-opening", {
//       state: {
//         caseId,
//         attemptId,
//         opening,
//       },
//     });
//   } catch (err) {
//     console.error("Start case failed:", err);
//   }
// };


//   const avatarLetter = (student.name?.trim()?.[0] || "S").toUpperCase();

//   /* ==================== UI ==================== */

//   return (
//     <div className="min-h-screen w-full pb-12" style={{ backgroundColor: colors.white }}>
//       {/* Top bar */}
//       <div className="sticky top-0 z-20 border-b backdrop-blur bg-white/70" style={{ borderColor: colors.primary }}>
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3 min-w-0">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="h-10 w-10 rounded-2xl border flex items-center justify-center hover:shadow-sm transition"
//               style={{ backgroundColor: colors.white, borderColor: colors.primary, color: colors.primary }}
//               title="Back"
//             >
//               <FeatherArrowLeft className="w-4 h-4" />
//             </button>

//             <div className="min-w-0">
//               <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: colors.primary }}>
//                 Case Studies
//               </p>
//               <h1 className="text-base sm:text-lg font-extrabold truncate" style={{ color: colors.primary }}>
//                 Product Management Case Assessments
//               </h1>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="hidden sm:flex flex-col items-end leading-tight">
//               <span className="text-xs font-extrabold" style={{ color: colors.primary }}>
//                 {loadingProfile ? "Loading..." : student.name || "Student"}
//               </span>
//               <span className="text-[11px] font-bold opacity-70" style={{ color: colors.secondary }}>
//                 {student.location || ""}
//               </span>
//             </div>

//             <Avatar size="large" image={student.avatar} style={{ boxShadow: `0 0 0 2px ${colors.primary}` }}>
//               {avatarLetter}
//             </Avatar>
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
//         {/* Hero */}
//         <div className="rounded-[2.5rem] border shadow-sm p-6 sm:p-8" style={{ backgroundColor: colors.white, borderColor: colors.primary }}>
//           <div className="mt-2 flex justify-center">
//             <div className="max-w-3xl text-center">
//               <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: colors.primary }}>
//                 Product Management Case Assessments
//               </h2>
//               <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.secondary }}>
//                 Complete real-world product case studies to showcase your skills and boost your Hireability Index.
//                 Each case you complete adds points to your profile, making you more visible to recruiters.
//               </p>
//             </div>
//           </div>

//           <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
//             <StepCard
//               title="Complete the Case"
//               desc="Work through realistic scenarios that mirror actual PM challenges."
//               icon={<FeatherFileText className="w-5 h-5" />}
//             />
//             <StepCard
//               title="Get Evaluated"
//               desc="Receive a score on your approach and decision-making."
//               icon={<FeatherTarget className="w-5 h-5" />}
//             />
//             <StepCard
//               title="Boost Your Index"
//               desc="Points are added to your profile and visible to recruiters."
//               icon={<FeatherGlobe className="w-5 h-5" />}
//             />
//           </div>

//           <div className="mt-6 flex flex-wrap gap-2">
//             {(["All", "Easy", "Medium", "Hard"] as const).map((t) => {
//               const active = filter === t;
//               return (
//                 <button
//                   key={t}
//                   onClick={() => setFilter(t)}
//                   className="px-4 py-2 rounded-full text-[11px] font-extrabold border transition"
//                   style={{
//                     borderColor: colors.primary,
//                     backgroundColor: active ? colors.primary : colors.white,
//                     color: active ? colors.white : colors.primary,
//                   }}
//                 >
//                   {t}
//                 </button>
//               );
//             })}

//             <div className="ml-auto hidden sm:flex items-center gap-2 text-xs font-bold" style={{ color: colors.neutral?.[400] ?? "#9CA3AF" }}>
//               <FeatherClock className="w-4 h-4" /> Choose a case & start
//             </div>
//           </div>
//         </div>

//         {/* List */}
//         <div className="mt-8">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg sm:text-xl font-bold" style={{ color: colors.primary }}>
//               Available Case Assessments
//             </h3>

//             <span className="text-xs font-bold flex items-center gap-2" style={{ color: colors.neutral?.[400] ?? "#9CA3AF" }}>
//               <FeatherMapPin className="w-4 h-4" /> Recommended for your domain
//             </span>
//           </div>

//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredCases.map((c) => (
//               <CaseCard key={c._id} item={c} onStart={onStart} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API, { URL_PATH, BASE_URL } from "src/common/API";
import { colors } from "../common/Colors";
import { Button } from "../ui/components/Button";
import { Avatar } from "../ui/components/Avatar";
import {
  FeatherArrowLeft,
  FeatherArrowRight,
  FeatherClock,
  FeatherFileText,
  FeatherGlobe,
  FeatherMapPin,
  FeatherTarget,
} from "@subframe/core";
import HeaderLogo from "src/ui/components/HeaderLogo";
import { useRef } from "react";


/* ==================== TYPES ==================== */

type Difficulty = "Easy" | "Medium" | "Hard";

type BackendCase = {
  _id: string;
  title: string;
  description?: string;
  totalQuestions: number;
  maxAttempts: number;
  isActive: boolean;
  createdAt: string;
  isSubmitted?: boolean; 
};

type CaseItem = {
  _id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  points: number;
  minutes: number;
  icon: React.ReactNode;
  isSubmitted?: boolean;
};

type StudentProfile = {
  name: string;
  email: string;
  location: string;
  avatar: string;
};

/* ==================== CONSTANTS ==================== */

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

/* ==================== HELPERS ==================== */

const formatLocation = (city?: string, state?: string): string =>
  `${city || ""}, ${state || ""}`.trim().replace(/^,\s*|,\s*$/g, "");

const normalizeAvatarUrl = (raw?: string): string => {
  if (!raw) return DEFAULT_AVATAR;
  const origin = BASE_URL.replace(/\/api\/?$/, "");
  if (/^https?:\/\//.test(raw)) return raw;
  if (raw.startsWith("/")) return origin + raw;
  return origin + "/" + raw;
};

const difficultyBadge = (d: Difficulty) => {
  if (d === "Easy") return { bg: colors.primary + "20", text: colors.primary };
  if (d === "Medium") return { bg: colors.secondary + "20", text: colors.secondary };
  return { bg: colors.accent + "20", text: colors.accent };
};

function DifficultyChip({ label }: { label: Difficulty }) {
  const s = difficultyBadge(label);
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
      style={{ backgroundColor: colors.primary }}
    >
      {label}
    </span>
  );
}

function StepCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-solid border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
      <div className="flex w-full items-center gap-3">
        <div
          className="h-10 w-10 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: colors.primary, color: "black" }}
        >
          {icon}
        </div>
        <span className="text-heading-3 font-heading-3 text-default-font">
          {title}
        </span>
      </div>
      <p className="text-sm text-subtext-color">
        {desc}
      </p>
    </div>
  );
}

function CaseCard({
  item,
  onStart,
   loading
}: {
  item: CaseItem;
  onStart: (id: string) => void;
  loading: boolean;
}) {
  return (
    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-3xl border border-solid border-neutral-border bg-white px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
      <div style={{color: "black"}} className="flex justify-between w-full items-center gap-3 ">
        {item.icon}
        <DifficultyChip label={item.difficulty} />
      </div>
      
      <div className="flex flex-col items-start gap-2">
        <span className="text-heading-3 font-heading-3 text-default-font">
          {item.title}
        </span>
        <span className="text-sm text-subtext-color">
          {item.description}
        </span>
      </div>

      <div className="flex w-full items-center gap-4">
        <div className="flex items-center gap-2">
          <FeatherClock className="text-body font-body text-subtext-color" />
          <span className="text-sm text-subtext-color">{item.minutes} min</span>
        </div>
        <div className="h-4 w-px bg-neutral-border" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-default-font">+{item.points} points</span>
        </div>
      </div>

      {/* <Button
        variant="brand-primary"
        style={{ backgroundColor: colors.primary, color: "black" }}
        className="w-full rounded-2xl hover:opacity-90"
        onClick={() => onStart(item._id)}
        iconRight={<FeatherArrowRight className="ml-2 w-4 h-4" />}
      >
        Start Case Study
      </Button> */}
      {/* <Button
  variant="brand-primary"
  style={{ backgroundColor: colors.accent }}
  className="
    w-full rounded-2xl hover:opacity-90
    [&_span]:!text-white
    [&_svg]:!text-white
  "
  onClick={() => onStart(item._id)}
  iconRight={<FeatherArrowRight className="ml-2 w-4 h-4" />}
>
  Start Case Study
</Button> */}

    <Button
  variant="brand-primary"
  disabled={item.isSubmitted}
  style={{
    backgroundColor: item.isSubmitted ? "#D1D5DB" : colors.accent
  }}
  className="
    w-full rounded-2xl hover:opacity-90
    [&_span]:!text-white
    [&_svg]:!text-white
  "
  onClick={() => onStart(item._id)}
  iconRight={!item.isSubmitted && <FeatherArrowRight className="ml-2 w-4 h-4" />}
>
  {item.isSubmitted ? "Already Submitted" : "Start Case Study"}
</Button>



    </div>
  );
}

/* ==================== MAIN COMPONENT ==================== */

export default function CaseAssessmentsPage() {
  const navigate = useNavigate();

  /* ==================== STATE ==================== */
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | Difficulty>("All");
  const [cases, setCases] = useState<BackendCase[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [student, setStudent] = useState<StudentProfile>({
    name: "",
    email: "",
    location: "",
    avatar: DEFAULT_AVATAR,
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  // const [startingCaseId, setStartingCaseId] = useState<string | null>(null);
  const isStartingRef = useRef(false);
const [startingCaseId, setStartingCaseId] = useState<string | null>(null);


  /* ==================== API CALLS ==================== */
  const fetchStudentProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const res = await API("GET", URL_PATH.calculateExperienceIndex);
      const demo = res?.data?.demographics?.[0];
      const avatarFromServer = res?.documents?.profileUrl;

      setStudent({
        name: demo?.fullName || "",
        email: demo?.email || "",
        location: formatLocation(demo?.city, demo?.state),
        avatar: normalizeAvatarUrl(avatarFromServer),
      });
    } catch (err) {
      console.log("fetchStudentProfile failed:", err);
      setStudent((p) => ({ ...p, avatar: DEFAULT_AVATAR }));
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  const fetchCases = useCallback(async () => {
    try {
      setLoadingCases(true);
      const res = await API("GET", URL_PATH.getAllCases, {
        page: 1,
        limit: 20
      });
      setCases(res?.data || []);
    } catch (err) {
      console.error("fetchCases failed:", err);
    } finally {
      setLoadingCases(false);
    }
  }, []);

  const onStart = async (caseId: string) => {
    if (startingCaseId) return;
    try {
      const res = await API("POST", URL_PATH.startCase(caseId), {});
      const { attemptId, opening } = res;
      navigate("/case-assessment-opening", {
        state: {
          caseId,
          attemptId,
          opening,
        },
      });
    } catch (err) {
      console.error("Start case failed:", err);
    }
  };

  

  /* ==================== EFFECTS ==================== */
  useEffect(() => {
    fetchStudentProfile();
    fetchCases();
  }, [fetchStudentProfile, fetchCases]);

  const mappedCases: CaseItem[] = useMemo(() => {
    return cases.map((c) => {
      let difficulty: Difficulty = "Easy";
      if (c.totalQuestions > 10 && c.totalQuestions <= 20) difficulty = "Medium";
      if (c.totalQuestions > 20) difficulty = "Hard";

      return {
        _id: c._id,
        title: c.title,
        description: c.description || "No description provided",
        difficulty,
        points: c.totalQuestions * 2,
        minutes: c.totalQuestions * 5,
        isSubmitted: c.isSubmitted,
        icon: (
          <div
            className="h-10 w-10 rounded-2xl grid place-items-center"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            ⌁
          </div>
        ),
      };
    });
  }, [cases]);

  const filteredCases = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mappedCases.filter((c) => {
      const okFilter = filter === "All" ? true : c.difficulty === filter;
      const okQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q);
      return okFilter && okQuery;
    });
  }, [mappedCases, query, filter]);

  const avatarLetter = (student.name?.trim()?.[0] || "S").toUpperCase();

  /* ==================== UI ==================== */
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blended background - Covers entire page */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: colors.background || "#f8fafc" }}
        />

        <div
          className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-55"
          style={{
            background: `radial-gradient(circle at 60% 60%, ${colors.primary || "#7c3aed"}AA, transparent 52%)`,
          }}
        />

        <div
          className="absolute -top-48 right-[-220px] h-[680px] w-[680px] rounded-full blur-3xl opacity-35"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${colors.secondary || "#4f46e5"}99, transparent 62%)`,
          }}
        />

        <div
          className="absolute bottom-[-260px] left-[15%] h-[760px] w-[760px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.accent || "#ec4899"}44, transparent 62%)`,
          }}
        />
      </div>

      {/* Header and content with z-index to stay above background */}
      <div className="relative z-10">
        <HeaderLogo />
        
        <div className="flex min-h-screen w-full justify-center px-4 sm:px-6 lg:px-8 py-0 sm:py-0">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 sm:gap-8 py-8">
            <Button
              variant="neutral-tertiary"
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={() => navigate(-1)}
            />

            {/* Hero Section */}
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <span className="text-xl sm:text-2xl md:text-[30px] font-heading-1 text-default-font text-center">
                  Product Management Case Assessments
                </span>
                <span className="max-w-[90%] sm:max-w-[800px] text-sm font-body text-center">
                  Complete real-world product case studies to showcase your skills and boost your Hireability Index.
                  Each case you complete adds points to your profile, making you more visible to recruiters.
                </span>
              </div>
            </div>

            {/* Steps Cards */}
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
              <StepCard
                title="Complete the Case"
                desc="Work through realistic scenarios that mirror actual PM challenges."
                icon={<FeatherFileText className="w-5 h-5" />}
              />
              <StepCard
                title="Get Evaluated"
                desc="Receive a score on your approach and decision-making."
                icon={<FeatherTarget className="w-5 h-5" />}
              />
              <StepCard
                title="Boost Your Index"
                desc="Points are added to your profile and visible to recruiters."
                icon={<FeatherGlobe className="w-5 h-5" />}
              />
            </div>

            {/* Filter Section */}
            {/* <div className="flex w-full flex-wrap items-center gap-2">
              {(["All", "Easy", "Medium", "Hard"] as const).map((t) => {
                const active = filter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition"
                    style={{
                      // borderColor: active ? colors.primary : colors.background,
                      backgroundColor: active ? colors.accent : "white",
                      color: active ? "white" : colors.background,
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div> */}
            <div className="flex w-full flex-wrap items-center gap-2">
  {(["All", "Easy", "Medium", "Hard"] as const).map((t) => {
    const active = filter === t;

    return (
      <button
        key={t}
        onClick={() => setFilter(t)}
        className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
        style={{
          backgroundColor: active ? colors.accent : colors.primaryGlow,
          color: active ? "white" : "#444",
          borderColor: active ? colors.accent : "#E5E7EB", // light gray border
        }}
      >
        {t}
      </button>
    );
  })}
</div>

            {/* Cases Grid */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-default-font">
                  Available Case Assessments
                </h3>
                <span className="text-xs text-subtext-color flex items-center gap-2">
                  <FeatherMapPin className="w-4 h-4" /> Recommended for your domain
                </span>
              </div>

              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCases.map((c) => (
                  <CaseCard key={c._id} item={c} onStart={onStart}  loading={startingCaseId === c._id} />
                ))}
              </div>

              {filteredCases.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-subtext-color">No case assessments found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
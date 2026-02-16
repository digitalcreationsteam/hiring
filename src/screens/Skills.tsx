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
import { useNavigate, useLocation } from "react-router-dom";
import { FeatherArrowLeft, FeatherX } from "@subframe/core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { completeStep } from "../store/slices/onboardingSlice";

import HeaderLogo from "src/ui/components/HeaderLogo";
import { IconButton } from "../ui/components/IconButton";
import { TextField } from "../ui/components/TextField";
import { Button } from "../ui/components/Button";

import API, { URL_PATH } from "src/common/API";
import { colors } from "../common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";

export default function Skills() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const source = location.state?.source; // "dashboard" | undefined

  console.log("📍 [Skills] ==================");
  console.log("📍 [Skills] Component mounted");
  console.log("📍 Source:", source);
  console.log("📍 Location state:", location.state);
  console.log("📍 ==================");

  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);

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

  const scTextFieldClass =
    "w-full [&>label]:text-[12px] [&>label]:font-medium [&>div]:h-8 [&>div]:rounded-full [&>div]:bg-neutral-100 [&>div]:!border-none";

  const scInputClass =
    "rounded-full h-7 px-3 text-[16px] placeholder:text-[16px] bg-neutral-100 !border-none focus:ring-0 focus:outline-none w-full";

  const addSkill = (raw: string) => {
    const s = raw.trim();
    if (!s) return;

    const exists = skills.some((k) => k.toLowerCase() === s.toLowerCase());
    if (!exists) {
      console.log("➕ [Skills] Adding skill:", s);
      setSkills((prev) => [...prev, s]);
    }
  };

  const removeSkill = (s: string) => {
    console.log("➖ [Skills] Removing skill:", s);
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
    console.log("⬅️ [Skills] Back button clicked");
    console.log("📍 Current source:", source);

    if (source === "dashboard") {
      console.log("🔄 [Skills] Source is dashboard - going to /dashboard");
      navigate("/dashboard");
    } else {
      // In the onboarding flow, go back to job-domain
      console.log("🔄 [Skills] In onboarding flow - going to /job-domain");
      navigate("/job-domain");
    }
  };

  const handleContinue = async () => {
    console.log("🔄 [Skills] ===== CONTINUE CLICKED =====");
    console.log("📊 Current skills:", skills);
    console.log("📊 Source:", source);
    console.log("📊 Skills count:", skills.length);

    if (skills.length === 0) {
      console.log("⚠️ [Skills] No skills added - showing alert");
      alert("Add at least one skill to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("⏳ [Skills] Submitting skills to API...");

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const domainId = localStorage.getItem("domainId");

      console.log("📦 Request data:", {
        userId: userId ? "present" : "missing",
        domainId: domainId ? "present" : "missing",
        skillsCount: skills.length,
      });

      if (!domainId) {
        console.log("🚫 [Skills] Domain ID missing");
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

      console.log("✅ [Skills] API Response:", response);

      // Mark skills as completed in Redux
      console.log("🔄 [Skills] Dispatching completeStep for 'skills'");
      dispatch(completeStep("skills"));

      // ✅ FIX: Navigate to the correct next step based on your flow
      // Based on your image, there are TWO more steps after skills
      console.log("🔍 [Skills] Determining next step based on flow...");

      if (source === "dashboard") {
        console.log(
          "🔄 [Skills] Source is dashboard - navigating to /dashboard",
        );
        navigate("/dashboard");
      } else {
        // In onboarding flow, after skills, there should be two more steps
        // Let's check what the next step should be from your step sequence
        console.log("🔄 [Skills] Onboarding flow - checking next step");

        // Fetch updated navigation to see what the API says is next
        try {
          const statusResponse = await API("GET", URL_PATH.getUserStatus);
          console.log("📊 [Skills] API navigation response:", statusResponse);

          if (statusResponse?.success && statusResponse.navigation?.nextRoute) {
            console.log(
              "🚀 [Skills] API says next route is:",
              statusResponse.navigation.nextRoute,
            );

            // Use the API's next route if available
            console.log(
              "🔄 [Skills] Navigating to:",
              statusResponse.navigation.nextRoute,
            );
            navigate(statusResponse.navigation.nextRoute);
          } else {
            // Fallback - based on your flow, after skills should go to something else
            // Let's check the step sequence from your logs
            console.log("⚠️ [Skills] No next route from API, using fallback");

            // Based on your earlier logs, the step sequence might be:
            // skills → [step8] → [step9] → assessment-intro
            // For now, let's go to a placeholder - you need to update this
            console.log("❌ [Skills] NEED TO UPDATE: What comes after skills?");
            console.log(
              "📋 Please check your step sequence and update this line",
            );

            // TEMPORARY: This should be updated to whatever comes after skills
            navigate("/next-step-after-skills"); // YOU NEED TO UPDATE THIS!
          }
        } catch (error) {
          console.error("❌ [Skills] Failed to fetch navigation:", error);
          // Fallback - but you need to update this!
          navigate("/next-step-after-skills"); // YOU NEED TO UPDATE THIS!
        }
      }
    } catch (error: any) {
      console.error("❌ [Skills] Skill save failed:", error);
      console.error("❌ Error response:", error?.response?.data);
      alert(
        error?.response?.data?.message ||
          "Failed to save skills. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
      console.log("🏁 [Skills] Submission complete");
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      console.log("🔄 [Skills] Fetching existing skills...");
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        console.log("📡 Fetching from:", URL_PATH.getUserDomainSkils);

        const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
          Authorization: `Bearer ${token}`,
          "user-id": userId,
        });

        console.log("📥 [Skills] Fetch response:", res);

        const skillsFromApi = res?.[0]?.skills;
        if (Array.isArray(skillsFromApi)) {
          console.log("✅ [Skills] Loaded skills from API:", skillsFromApi);
          setSkills(skillsFromApi);
        } else {
          console.log("ℹ️ [Skills] No existing skills found");
        }
      } catch (err) {
        console.error("❌ [Skills] Failed to fetch skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const isDisabled = skills.length === 0 || isSubmitting;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🎨 Linear gradient background - fixed behind everything */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            #d9d9d9 0%,
            #cfd3d6 25%,
            #9aa6b2 55%,
            #2E4056 100%
          )`,
          width: "100%",
        }}
      />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 flex justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <main
          className="w-full max-w-[720px] rounded-3xl shadow-xl border px-6 sm:px-8 md:px-10 py-6 sm:py-8 backdrop-blur-md"
          style={{
            backgroundColor: `${colors.white}CC`,
            borderColor: colors.neutral[200],
          }}
        >
          {/* Top row - FIXED BACK BUTTON */}
          <div className="flex items-center gap-3 sm:gap-4">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={handleBack}
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`p-${i}`}
                    className="flex-1 rounded-full h-1.5 sm:h-2"
                    style={{ backgroundColor: colors.primary }}
                  />
                ))}
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={`n-${i}`}
                    className="flex-1 rounded-full h-1.5 sm:h-2"
                    style={{ backgroundColor: colors.neutral[200] }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-1">
            <h2
              className="text-[20px] sm:text-[22px] md:text-[26px] font-semibold"
              style={{ color: colors.neutral[800] }}
            >
              Add your skills
            </h2>

            <p
              className="text-xs sm:text-sm leading-relaxed"
              style={{ color: colors.neutral[600] }}
            >
              Add your key skills to help recruiters discover your profile and
              match you with relevant opportunities
            </p>
          </div>

          {/* Your Skills */}
          <div className="mt-8 flex flex-col gap-2">
            <span
              className="text-[16px]"
              style={{ color: colors.neutral[800] }}
            >
              Your Skills *
            </span>

            <TextField className={scTextFieldClass} label="">
              <TextField.Input
                placeholder="Type a skill and press Enter"
                value={input}
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={scInputClass}
              />
            </TextField>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              {skills.map((s) => (
                <div
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                  style={{ backgroundColor: colors.neutral[100] }}
                >
                  <span
                    className="text-[16px]"
                    style={{ color: colors.neutral[600] }}
                  >
                    {s}
                  </span>

                  <IconButton
                    size="small"
                    icon={<FeatherX />}
                    onClick={() => removeSkill(s)}
                    className="!bg-transparent !w-6 !h-6 [&>svg]:w-3 [&>svg]:h-3"
                    style={{ color: colors.neutral[600] }}
                    aria-label={`Remove ${s}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Skills */}
          <div className="mt-8">
            <div
              className="rounded-3xl px-4 py-4 flex flex-col gap-3"
              style={{ backgroundColor: colors.neutral[200] }}
            >
              <span
                className="text-[18px]"
                style={{ color: colors.neutral[800] }}
              >
                Suggested Skills for Product Managers
              </span>

              <div className="flex flex-wrap gap-3 mt-2">
                {suggested.map((s) => {
                  const isAdded = skills.some(
                    (k) => k.toLowerCase() === s.toLowerCase(),
                  );

                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={isAdded}
                      onClick={() => addSkill(s)}
                      className="px-3 py-1 rounded-full text-sm transition-all border"
                      style={{
                        backgroundColor: isAdded
                          ? colors.neutral[100]
                          : colors.neutral[200],
                        borderColor: colors.neutral[200],
                        color: isAdded
                          ? colors.neutral[400]
                          : colors.neutral[600],
                        cursor: isAdded ? "default" : "pointer",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px my-8"
            style={{ backgroundColor: colors.secondary }}
          />

          <footer>
            <Button
              onClick={handleContinue}
              disabled={isDisabled}
              className="w-full h-10 sm:h-11 rounded-full text-sm sm:text-base font-semibold transition active:scale-[0.99]"
              style={{
                backgroundColor: isDisabled
                  ? colors.neutral[200]
                  : colors.accent,
                color: colors.background,
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.75 : 1,
                boxShadow: isDisabled ? "none" : "0 10px 24px rgba(0,0,0,0.08)",
              }}
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </footer>
        </main>
      </div>
      <Footer />
    </div>
  );
}

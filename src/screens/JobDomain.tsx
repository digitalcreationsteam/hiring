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
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import HeaderLogo from "src/ui/components/HeaderLogo";
import { FeatherArrowLeft, FeatherChevronDown } from "@subframe/core";
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

const notify = (msg: string) => {
  console.warn(msg);
};

function JobDomain() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDomainOpen, setIsDomainOpen] = useState(false);

  console.log("📍 [JobDomain] ==================");
  console.log("📍 [JobDomain] Component mounted");
  console.log("📍 [JobDomain] Current path:", window.location.pathname);
  console.log("📍 [JobDomain] ==================");

  const userId = React.useMemo(() => localStorage.getItem("userId"), []);
  console.log("📍 [JobDomain] User ID from localStorage:", userId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Domain
  const [domain, setDomain] = useState<SelectedDomain | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);

  // -------------------- HANDLE BACK BUTTON --------------------
  const handleBack = () => {
    console.log("⬅️ [JobDomain] ===== BACK BUTTON CLICKED =====");
    console.log("⬅️ [JobDomain] Navigating to /paywall");
    navigate("/paywall");
  };

  // -------------------- SAVE DOMAIN --------------------
  const handleContinue = async () => {
    console.log("🔄 [JobDomain] ===== CONTINUE BUTTON CLICKED =====");
    console.log("🔄 [JobDomain] Selected domain:", domain);

    if (!domain) {
      console.log("⚠️ [JobDomain] No domain selected");
      notify("Please select domain.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("🔑 [JobDomain] Token present:", !!token);

    if (!token) {
      console.log("🚫 [JobDomain] No token found");
      notify("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("⏳ [JobDomain] Saving domain to API...");

      // ✅ Step 1: Save domain
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

      console.log("✅ [JobDomain] Domain saved:", saveResponse);

      // Save to localStorage
      localStorage.setItem("domainId", domain.id);
      localStorage.setItem("jobDomain", domain.name);
      console.log("💾 [JobDomain] Saved to localStorage:", {
        domainId: domain.id,
        jobDomain: domain.name,
      });

      // ✅ Step 2: Mark job-domain as completed in Redux
      console.log("🔄 [JobDomain] Marking job-domain as completed in Redux");
      dispatch(completeStep("job-domain"));

      // ✅ Step 3: Get updated navigation status (for Redux update)
      console.log("🔍 [JobDomain] Fetching updated navigation...");
      const statusResponse = await API("GET", URL_PATH.getUserStatus);

      if (statusResponse?.success) {
        console.log(
          "📊 [JobDomain] Updating Redux with navigation:",
          statusResponse.navigation,
        );
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

      // ✅ Step 4: HARDCODE navigation to /skills (correct next step)
      console.log("🚀 [JobDomain] NAVIGATING TO: /skills");
      console.log("📋 [JobDomain] Flow: job-domain → skills ✓");

      // Use setTimeout to ensure Redux updates complete
      setTimeout(() => {
        navigate("/skills");
      }, 100);
    } catch (err: any) {
      console.error("❌ [JobDomain] Error:", err);
      notify(err?.response?.data?.message || "Failed to save job domain");
    } finally {
      setIsSubmitting(false);
      console.log("🏁 [JobDomain] Submission complete");
    }
  };

  // -------------------- FETCH USER SELECTED DOMAIN --------------------
  useEffect(() => {
    const fetchUserSelectedDomain = async () => {
      if (!userId) return;

      try {
        console.log("📋 [JobDomain] Fetching user selected domain...");

        const res = await API("GET", URL_PATH.getUserDomainSkils, undefined, {
          "user-id": userId,
        });

        if (Array.isArray(res) && res.length > 0) {
          const item = res[0];

          if (item.domainId) {
            console.log(
              "✅ [JobDomain] Found existing domain:",
              item.domainId.name,
            );
            setDomain({
              id: item.domainId._id,
              name: item.domainId.name,
            });
          }
        }
      } catch (err) {
        console.error("❌ [JobDomain] Failed to fetch job domain", err);
      }
    };

    fetchUserSelectedDomain();
  }, [userId]);

  // -------------------- FETCH ALL DOMAINS --------------------
  useEffect(() => {
    const fetchAvailableDomains = async () => {
      try {
        console.log("📋 [JobDomain] Fetching available domains...");

        const res = await API("GET", URL_PATH.getJobDomain);

        const activeDomains: Domain[] = res.map((d: any) => ({
          _id: d._id,
          name: d.name,
        }));

        console.log(
          "✅ [JobDomain] Available domains:",
          activeDomains.map((d) => d.name).join(", "),
        );
        setDomains(activeDomains);
      } catch (err) {
        console.error("❌ [JobDomain] Failed to load domains", err);
        notify("Unable to load job domains");
      }
    };

    fetchAvailableDomains();
  }, []);

  // -------------------- UI --------------------
  return (
    <>
      <Navbar />
      {/* 🎨 Linear gradient background */}
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

      {/* Page */}
      <div className="min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex items-center justify-center">
        <div className="w-full max-w-[660px] mx-auto">
          <div
            className="flex w-full flex-col gap-6 sm:gap-8 rounded-3xl border px-5 sm:px-8 md:px-10 py-7 sm:py-8 shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: `${colors.white}CC`,
              borderColor: colors.neutral[200],
            }}
          >
            {/* Header with FIXED back button */}
            <div className="flex items-center gap-3 sm:gap-4">
              <IconButton
                size="small"
                icon={<FeatherArrowLeft />}
                onClick={handleBack}
              />

              <div className="flex flex-1 gap-2">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={`done-${i}`}
                    className="h-1 flex-1 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                ))}

                {[...Array(3)].map((_, i) => (
                  <div
                    key={`todo-${i}`}
                    className="h-1 flex-1 rounded-full"
                    style={{ backgroundColor: colors.neutral[200] }}
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <h2
                className="text-[20px] sm:text-[22px] md:text-[26px] font-semibold"
                style={{ color: colors.neutral[800] }}
              >
                Choose your job domain
              </h2>

              <p
                className="text-xs sm:text-sm"
                style={{ color: colors.neutral[600] }}
              >
                Your domain and skills will decide your assessment and rankings
              </p>
            </div>

            {/* Domain Dropdown */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium"
                style={{ color: colors.neutral[800] }}
              >
                Job Domain <span className="text-red-500">*</span>
              </label>

              <SubframeCore.DropdownMenu.Root
                open={isDomainOpen}
                onOpenChange={(open) => {
                  console.log(
                    `📋 [JobDomain] Dropdown ${open ? "opened" : "closed"}`,
                  );
                  setIsDomainOpen(open);
                }}
              >
                <SubframeCore.DropdownMenu.Trigger asChild>
                  <div
                    className="flex h-10 sm:h-11 items-center justify-between rounded-3xl border px-4 cursor-pointer transition"
                    style={{
                      backgroundColor: `${colors.white}CC`,
                      borderColor: colors.neutral[200],
                    }}
                  >
                    <span
                      className="text-sm sm:text-base"
                      style={{
                        color: domain
                          ? colors.neutral[800]
                          : colors.neutral[400],
                      }}
                    >
                      {domain?.name || "Select your domain"}
                    </span>

                    <FeatherChevronDown
                      style={{ color: colors.neutral[600] }}
                    />
                  </div>
                </SubframeCore.DropdownMenu.Trigger>

                <SubframeCore.DropdownMenu.Content
                  asChild
                  align="start"
                  sideOffset={6}
                >
                  <div
                    className="rounded-2xl z-10 shadow-lg py-2 max-h-[260px] overflow-y-auto border backdrop-blur-md"
                    style={{
                      backgroundColor: `${colors.white}F2`,
                      borderColor: colors.neutral[200],
                    }}
                  >
                    {domains.map((item) => {
                      const selected = domain?.id === item._id;

                      return (
                        <div
                          key={item._id}
                          onClick={() => {
                            console.log(
                              "🎯 [JobDomain] Domain selected:",
                              item.name,
                            );
                            setDomain({ id: item._id, name: item.name });
                            setIsDomainOpen(false);
                          }}
                          className="px-4 py-2 cursor-pointer text-sm sm:text-base transition"
                          style={{
                            backgroundColor: selected
                              ? colors.primaryGlow
                              : "transparent",
                            color: colors.neutral[800],
                            fontWeight: selected ? 600 : 400,
                          }}
                          onMouseEnter={(e) => {
                            if (!selected)
                              e.currentTarget.style.backgroundColor = `${colors.primaryGlow}99`;
                          }}
                          onMouseLeave={(e) => {
                            if (!selected)
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Root>
            </div>

            {/* Footer */}
            <Button
              onClick={handleContinue}
              disabled={!domain || isSubmitting}
              className="w-full h-10 sm:h-11 rounded-2xl text-sm sm:text-base font-semibold transition active:scale-[0.99]"
              style={{
                backgroundColor:
                  !domain || isSubmitting ? colors.neutral[200] : colors.accent,
                color: colors.background,
                cursor: !domain || isSubmitting ? "not-allowed" : "pointer",
                opacity: !domain || isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
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

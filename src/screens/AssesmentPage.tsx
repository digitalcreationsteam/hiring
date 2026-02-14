// "use client";

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { Button } from "../ui/components/Button";
// import { CheckboxCard } from "../ui/components/CheckboxCard";
// import { FeatherAlertCircle } from "@subframe/core";
// import { FeatherArrowRight } from "@subframe/core";
// import { FeatherClock } from "@subframe/core";
// import { FeatherSidebar } from "@subframe/core";
// import { FeatherX } from "@subframe/core";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import API, { URL_PATH } from "src/common/API";
// import { colors } from "src/common/Colors";
// import Footer from "src/ui/components/Footer";
// import Navbar from "src/ui/components/Navbar";
// // import API from "@/utils/API"; // or axios/fetch wrapper

// type OptionKey = 1 | 2 | 3 | 4;

// type Question = {
//   id: string;
//   prompt: string;
//   marks: number;
//   options: {
//     key: OptionKey;
//     title: string;
//     description: string;
//   }[];
// };

// function pad2(n: number) {
//   return n.toString().padStart(2, "0");
// }

// function AssessmentPage() {
//   const navigate = useNavigate();
//   const submitLockRef = useRef(false);

//   const saveVersionRef = useRef<Record<string, number>>({});

//   const location = useLocation();
//   const userId = useMemo(() => localStorage.getItem("userId"), []);

//   const [attemptId, setAttemptId] = useState<string | null>(
//     location.state?.attemptId ?? null,
//   );

//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [answers, setAnswers] = useState<(OptionKey | null)[]>([]);
//   const [remainingSeconds, setRemainingSeconds] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const saveTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>(
//     {},
//   );
//   const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
//   const [expiryReady, setExpiryReady] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   const [warningOpen, setWarningOpen] = useState(false);
//   const [warningMsg, setWarningMsg] = useState("");
//   const [violations, setViolations] = useState(0);
//   const [isLocked, setIsLocked] = useState(false);

//   const violationLockRef = useRef(false);

//   const registerViolation = (msg: string) => {
//     // prevent spamming multiple triggers in same moment
//     if (violationLockRef.current) return;
//     violationLockRef.current = true;

//     setViolations((v) => v + 1);
//     setWarningMsg(msg);
//     setWarningOpen(true);
//     setIsLocked(true);

//     // unlock after a short delay so next real violation counts
//     setTimeout(() => {
//       violationLockRef.current = false;
//     }, 800);
//   };

//   //   // --- TIMER EFFECT FOR BACKEND ---
//   //   useEffect(() => {
//   //     if (!location.state?.expiresAt) return;

//   //     const expiresAt = new Date(location.state.expiresAt).getTime();

//   //     const tick = () => {
//   //       const now = Date.now();
//   //       const diff = Math.max(0, Math.floor((expiresAt - now) / 1000));

//   //       setRemainingSeconds(diff);

//   //      if (diff === 0 && !submitLockRef.current) {
//   //   handleSubmit();
//   // }

//   //     };

//   //     tick();
//   //     const id = setInterval(tick, 1000);

//   //     return () => clearInterval(id);
//   //   }, [location.state?.expiresAt]);

//   const reportViolation = async (type: string) => {
//     if (!attemptId) return;

//     try {
//       const res = await API(
//         "POST",
//         URL_PATH.reportViolation + `/${attemptId}`,
//         { type },
//         {
//           "user-id": localStorage.getItem("userId"),
//         },
//       );

//       console.log("Integrity Update:", res);

//       // Update violations count from backend response
//       if (res.totalViolations !== undefined) {
//         setViolations(res.totalViolations);

//         // Auto-submit if violations reach 4
//         if (res.totalViolations >= 4) {
//           setWarningMsg(
//             "⚠️ Maximum violations reached! Your exam is being auto-submitted.",
//           );
//           setWarningOpen(true);

//           // Auto-submit after 2 seconds
//           setTimeout(() => {
//             handleSubmit();
//           }, 2000);
//         }
//       }

//       // If cheating alert triggered, update warning message
//       if (res.cheatAlert) {
//         setWarningMsg(
//           "⚠️ Multiple violations detected! This attempt may be flagged for review.",
//         );
//       }

//       return res;
//     } catch (err) {
//       console.error("Violation report failed", err);
//     }
//   };
//   //============ SAVE ANSWERS ON REFRESH / CRASH =================//
//   useEffect(() => {
//     if (!attemptId) return;

//     sessionStorage.setItem(
//       `attempt-${attemptId}`,
//       JSON.stringify({
//         answers,
//         currentIndex,
//       }),
//     );
//   }, [answers, currentIndex, attemptId]);

//   useEffect(() => {
//     if (!attemptId) return;

//     const saved = sessionStorage.getItem(`attempt-${attemptId}`);
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setAnswers(parsed.answers);
//       setCurrentIndex(parsed.currentIndex);
//     }
//   }, [attemptId]);

//   //====== USE EFFECT TO PREVENT ACCIDENTAL REFRESH / TAB CLOSE ====//
//   useEffect(() => {
//     const handler = (e: BeforeUnloadEvent) => {
//       e.preventDefault();
//       e.returnValue = "";
//     };

//     window.addEventListener("beforeunload", handler);
//     return () => window.removeEventListener("beforeunload", handler);
//   }, []);

//   useEffect(() => {
//     const reportTabSwitch = async () => {
//       if (attemptId) {
//         await reportViolation("TAB_SWITCH");
//       }
//     };

//     const reportCopy = async () => {
//       if (attemptId) {
//         await reportViolation("COPY");
//       }
//     };

//     const reportPaste = async () => {
//       if (attemptId) {
//         await reportViolation("PASTE");
//       }
//     };

//     // -------- Tab switch / leaving page detection ----------
//     const onVisibilityChange = () => {
//       if (document.hidden) {
//         registerViolation(
//           "Warning: You switched tabs / minimized the exam window. Otherwise the exam will be auto-submitted after 4 violations.",
//         );
//         reportTabSwitch();
//       }
//     };

//     const onBlur = () => {
//       registerViolation(
//         "Warning: You moved away from the exam window. Otherwise the exam will be auto-submitted after 4 violations.",
//       );
//       reportTabSwitch();
//     };

//     // -------- Block copy/cut/paste/right click ----------
//     const onCopy = (e: ClipboardEvent) => {
//       e.preventDefault();
//       registerViolation(
//         "Copy is disabled during the exam. Otherwise the exam will be auto-submitted after 4 violations.",
//       );
//       reportCopy();
//     };

//     const onCut = (e: ClipboardEvent) => {
//       e.preventDefault();
//       registerViolation(
//         "Cut is disabled during the exam. Otherwise the exam will be auto-submitted after 4 violations.",
//       );
//       reportCopy();
//     };

//     const onPaste = (e: ClipboardEvent) => {
//       e.preventDefault();
//       registerViolation(
//         "Paste is disabled during the exam. Otherwise the exam will be auto-submitted after 4 violations.",
//       );
//       reportPaste();
//     };

//     // ... rest of your event listeners
//     const onKeyDown = (e: KeyboardEvent) => {
//       const key = e.key.toLowerCase();
//       const ctrlOrCmd = e.ctrlKey || e.metaKey;

//       // Block DevTools shortcuts too (not perfect, but helps)
//       const blocked =
//         (ctrlOrCmd && ["c", "x", "v", "a", "p", "s", "u"].includes(key)) || // copy/cut/paste/select all/print/save/view source
//         e.key === "F12" ||
//         (ctrlOrCmd && e.shiftKey && ["i", "j", "c"].includes(key)); // devtools

//       if (blocked) {
//         e.preventDefault();
//         registerViolation("That action is not allowed during the exam.");
//       }
//     };

//     document.addEventListener("visibilitychange", onVisibilityChange);
//     window.addEventListener("blur", onBlur);

//     document.addEventListener("copy", onCopy);
//     document.addEventListener("cut", onCut);
//     document.addEventListener("paste", onPaste);
//     document.addEventListener("keydown", onKeyDown);

//     return () => {
//       document.removeEventListener("visibilitychange", onVisibilityChange);
//       window.removeEventListener("blur", onBlur);

//       document.removeEventListener("copy", onCopy);
//       document.removeEventListener("cut", onCut);
//       document.removeEventListener("paste", onPaste);
//       document.removeEventListener("keydown", onKeyDown);
//     };
//   }, [violations, attemptId]); // Add attemptId to dependencies

//   // --- COMPUTED VALUES ---
//   const answeredCount = useMemo(
//     () => answers.filter((a) => a !== null).length,
//     [answers],
//   );
//   const progressPercent = questions.length
//     ? Math.round((answeredCount / questions.length) * 100)
//     : 0;

//   // --- HANDLERS ---
//   const selectOption = (key: OptionKey) => {
//     const question = questions[currentIndex];
//     if (!question) return;

//     setAnswers((prev) => {
//       const copy = [...prev];
//       copy[currentIndex] = key;
//       return copy;
//     });

//     saveAnswerToServer(question.id, key);
//   };

//   const clearAnswer = (index: number) => {
//     const question = questions[index];
//     if (!question) return;

//     setAnswers((prev) => {
//       const copy = [...prev];
//       copy[index] = null;
//       return copy;
//     });

//     saveAnswerToServer(question.id, null);
//   };

//   const goToQuestion = (index: number) => {
//     if (index < 0 || index >= questions.length) return;
//     setCurrentIndex(index);
//   };

//   const skipQuestion = () => {
//     const next = Math.min(currentIndex + 1, questions.length - 1);
//     setCurrentIndex(next);
//   };

//   const nextQuestion = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex((i: number) => i + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const prevQuestion = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((i) => i - 1);
//     }
//   };

//   //=============== POST API FOR START ASSESSMENT============//
//   useEffect(() => {
//     if (!userId) {
//       navigate("/login");
//       return;
//     }
//     if (attemptId) return;

//     const startAssessment = async () => {
//       const res = await API(
//         "POST",
//         URL_PATH.startAssessment,
//         {},
//         { "user-id": userId },
//       );

//       setAttemptId(res.attemptId);

//       // ✅ ADD THIS
//       sessionStorage.setItem(
//         `startedAt-${res.attemptId}`,
//         Date.now().toString(),
//       );
//       sessionStorage.setItem("attemptId", res.attemptId);

//       navigate("/assessment", {
//         replace: true,
//         state: {
//           attemptId: res.attemptId,
//           expiresAt: res.expiresAt,
//         },
//       });
//     };

//     startAssessment();
//   }, [attemptId, userId, navigate]);

//   //=============== GET API FOR TO FETCH QUESTIONS============//

//   const startTimer = (expiryTime: number) => {
//     const tick = () => {
//       const now = Date.now();
//       const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));

//       setRemainingSeconds(diff);

//       if (diff === 0 && !submitLockRef.current) {
//         handleSubmit();
//       }
//     };

//     tick();
//     const id = setInterval(tick, 1000);

//     return () => clearInterval(id);
//   };

//   useEffect(() => {
//     if (!attemptId || !expiryReady) return;

//     let expiry: number | null = null;

//     if (location.state?.expiresAt) {
//       expiry = new Date(location.state.expiresAt).getTime();
//     }

//     if (!expiry) {
//       const saved = sessionStorage.getItem(`expiresAt-${attemptId}`);
//       if (saved) expiry = Number(saved);
//     }

//     if (!expiry) return;

//     return startTimer(expiry);
//   }, [attemptId, expiryReady]);

//   useEffect(() => {
//     if (!attemptId || !userId) return;

//     // ✅ ADD THIS (store start time only once per attempt)
//     const startedKey = `startedAt-${attemptId}`;
//     if (!sessionStorage.getItem(startedKey)) {
//       sessionStorage.setItem(startedKey, Date.now().toString());
//     }
//     // optional safety
//     sessionStorage.setItem("attemptId", attemptId);

//     const fetchQuestions = async () => {
//       const res = await API(
//         "GET",
//         `${URL_PATH.getAttemptQuestions}/${attemptId}`,
//         undefined,
//         { "user-id": userId },
//       );

//       setDurationMinutes(res.durationMinutes);

//       // ✅ Create expiresAt if not coming from route state
//       if (!location.state?.expiresAt) {
//         const expiry = Date.now() + res.durationMinutes * 60 * 1000;

//         sessionStorage.setItem(`expiresAt-${attemptId}`, expiry.toString());
//       }
//       setExpiryReady(true);

//       // const mapped: Question[] = res.questions.map((q: any) => ({
//       //   id: q._id,
//       //   prompt: q.question,
//       //   options: q.options.map((opt: string, i: number) => ({
//       //     key: (i + 1) as OptionKey,
//       //     title: `${["A", "B", "C", "D"][i]}. ${opt}`,
//       //     description: "",
//       //   })),
//       // }));

//       const mapped: Question[] = res.questions.map((q: any, idx: number) => ({
//         id: q._id,
//         prompt: q.question,

//         // ✅ 1st priority: backend sends marks
//         // common keys: marks / points / score
//         // ✅ fallback: 5 marks default (you can change)
//         marks: Number(q.marks ?? q.points ?? q.score ?? 5),

//         options: q.options.map((opt: string, i: number) => ({
//           key: (i + 1) as OptionKey,
//           title: `${["A", "B", "C", "D"][i]}. ${opt}`,
//           description: "",
//         })),
//       }));

//       setQuestions(mapped);
//       setAnswers((prev) =>
//         prev.length ? prev : Array(mapped.length).fill(null),
//       );
//       setLoading(false);
//     };

//     fetchQuestions();
//   }, [attemptId, userId, location.state?.expiresAt]);

//   //=============== POST API FOR SAVE Q OPTION ==============//
//   const saveAnswerToServer = (
//     questionId: string,
//     selectedOption: OptionKey | null,
//   ) => {
//     if (!attemptId || !userId) return;

//     if (saveTimeoutRef.current[questionId]) {
//       clearTimeout(saveTimeoutRef.current[questionId]);
//     }

//     saveTimeoutRef.current[questionId] = setTimeout(async () => {
//       const version = (saveVersionRef.current[questionId] || 0) + 1;
//       saveVersionRef.current[questionId] = version;

//       try {
//         await API(
//           "POST",
//           URL_PATH.saveAnswer,
//           { attemptId, questionId, selectedOption, version },
//           { "user-id": userId },
//         );

//         if (saveVersionRef.current[questionId] !== version) return;
//       } catch (err) {
//         console.warn("Save answer failed", err);
//       }
//     }, 400);
//   };

//   //=============== GET API FOR SUBMIT ASSESSMENT============//
//   const handleSubmit = async () => {
//     if (!attemptId || submitLockRef.current) return;

//     submitLockRef.current = true;
//     setSaving(true);

//     try {
//       await API(
//         "POST",
//         URL_PATH.submitAssessment,
//         { attemptId },
//         { "user-id": userId },
//       );
//       localStorage.setItem("assessmentCompleted", "true");
//       localStorage.setItem("attemptId", attemptId);
//       sessionStorage.setItem("attemptId", attemptId);

//       sessionStorage.setItem(`submittedAt-${attemptId}`, Date.now().toString());

//       navigate("/assessment-results", { state: { attemptId } });
//     } catch (err) {
//       submitLockRef.current = false;
//       console.error("Submit failed", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // --- RENDER NAVIGATOR NUMBERS (keeps UI markup/style) ---
//   const renderNavigatorItem = (qIndex: number) => {
//     const isCurrent = qIndex === currentIndex;
//     const isAnswered = answers[qIndex] !== null;
//     // replicate the same class names used in UI for each visual state
//     if (isCurrent) {
//       return (
//         <div
//           style={{ backgroundColor: colors.primaryGlow, color: "accent" }}
//           key={qIndex}
//           onClick={() => {
//             if (!saving) goToQuestion(qIndex);
//           }}
//           className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl cursor-pointer"
//         >
//           <span className="text-body-bold font-body-bold text-brand-600">
//             {qIndex + 1}
//           </span>
//         </div>
//       );
//     }

//     if (isAnswered) {
//       return (
//         <div
//           style={{ backgroundColor: colors.secondary, color: colors.white }}
//           key={qIndex}
//           onClick={() => {
//             if (!saving) goToQuestion(qIndex);
//           }}
//           className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl cursor-pointer"
//         >
//           <span className="text-body-bold font-body-bold text-success-700">
//             {qIndex + 1}
//           </span>
//         </div>
//       );
//     }

//     // unanswered default
//     return (
//       <div
//         key={qIndex}
//         onClick={() => {
//           if (!saving) goToQuestion(qIndex);
//         }}
//         className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border-2 border-solid border-neutral-border bg-default-background cursor-pointer"
//       >
//         <span className="text-body-bold font-body-bold text-subtext-color">
//           {qIndex + 1}
//         </span>
//       </div>
//     );
//   };

//   // For display: mm:ss
//   const minutes = Math.floor(remainingSeconds / 60);
//   const seconds = remainingSeconds % 60;

//   // Current question to show
//   const currentQuestion = questions[currentIndex];

//   const currentMarks = currentQuestion?.marks ?? 0;

//   const totalMarks = useMemo(() => {
//     return questions.reduce((sum, q) => sum + (q.marks ?? 0), 0);
//   }, [questions]);

//   if (loading) return <div>Loading assessment...</div>;

//   return (
//     <div
//       className="min-h-screen relative overflow-hidden"
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
//     >
//       <div className="w-full relative" style={{ borderColor: colors.aqua }}>
//         <Navbar />
//       </div>
//       {/* Header and content with z-index to stay above background */}
//       <div className="relative z-10">
//         <div className="min-h-screen w-full flex justify-center px-4 py-4 sm:py-6 lg:py-12">
//           <div className="flex w-full max-w-[1024px] flex-col lg:flex-row items-stretch gap-4 lg:gap-6">
//             <div
//               style={{ backgroundColor: colors.white }}
//               className="
//   hidden lg:flex
//   w-full lg:w-64
//   flex-none flex-col items-start gap-4
//   self-stretch rounded-2xl
//   border border-neutral-border
//   0 px-6 lg:px-8 py-6
//   overflow-y-auto
// "
//             >
//               <div className="flex w-full items-start gap-4">
//                 <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
//                   <span className="text-heading-3 font-heading-3 text-default-font">
//                     Question Navigator
//                   </span>
//                   <span className="text-sm font-caption text-subtext-color">
//                     {answeredCount} of {questions.length} answered
//                   </span>
//                 </div>
//                 <FeatherSidebar className="mt-2 text-body font-body text-subtext-color cursor-pointer" />
//               </div>
//               <div
//                 style={{ border: "2px solod black" }}
//                 className="flex items-center gap-2 flex-wrap mt-3"
//               >
//                 {questions.map((_, idx) => renderNavigatorItem(idx))}
//               </div>

//               {/* Bottom horizontal line */}
//               <div className="w-full h-[1px] bg-gray-300 my-4 flex-shrink-0" />

//               <div className="flex w-full flex-col items-start gap-2">
//                 <div className="flex w-full items-center gap-2">
//                   <div
//                     style={{ backgroundColor: colors.primaryGlow }}
//                     className="flex h-3 w-3 flex-none items-start rounded-full"
//                   />
//                   <span className="text-caption font-caption text-default-font">
//                     Current
//                   </span>
//                 </div>
//                 <div className="flex w-full items-center gap-2">
//                   <div
//                     style={{ backgroundColor: colors.secondary }}
//                     className="flex h-3 w-3 flex-none items-start rounded-full"
//                   />
//                   <span className="text-caption font-caption text-default-font">
//                     Answered
//                   </span>
//                 </div>
//                 <div className="flex w-full items-center gap-2">
//                   <div className="flex h-3 w-3 flex-none items-start rounded-full border border-solid border-neutral-border bg-default-background" />
//                   <span className="text-caption font-caption text-default-font">
//                     Unanswered
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT PANNEL */}

//             <div className="flex w-full flex-col items-start justify-start gap-4">
//               <div
//                 className="
//   flex w-full flex-wrap items-center gap-2
//   justify-between rounded-xl
//   border bg-yellow-50
//   px-3 py-2
// "
//               >
//                 <div className="flex items-center gap-2">
//                   <FeatherAlertCircle className="text-caption font-caption text-yellow-700" />
//                   <span className="text-xs text-yellow-700">
//                     Your Skill Index is built from this score
//                   </span>
//                 </div>
//                 <FeatherX className="text-caption font-caption text-yellow-700" />
//               </div>

//               <div
//                 className="
//   flex w-full flex-col items-start gap-5
//   rounded-2xl border bg-white shadow-sm
//   px-4 py-5
//   sm:px-6 sm:py-6
//   lg:px-8 lg:py-8
// "
//               >
//                 <div className="flex w-full items-center justify-between">
//                   <span className="text-sm text-subtext-color">
//                     Question {currentIndex + 1} of {questions.length}
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <FeatherClock className="text-body font-body text-default-font" />
//                     <div className="flex items-center gap-1">
//                       <span className="text-sm font-body-bold text-default-font">
//                         {pad2(minutes)}:{pad2(seconds)}
//                       </span>
//                       <span className="text-sm text-default-font">
//                         remaining
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* progress bar (custom accessible) */}
//                 <div className="flex w-full flex-col items-start gap-2">
//                   <div
//                     role="progressbar"
//                     aria-valuemin={0}
//                     aria-valuemax={100}
//                     aria-valuenow={progressPercent}
//                     className="w-full rounded-full bg-neutral-200 h-2 overflow-hidden"
//                     title={`${progressPercent}% complete`}
//                   >
//                     <div
//                       className="h-full rounded-full"
//                       style={{
//                         width: `${progressPercent}%`,
//                         backgroundColor: colors.primary,
//                       }}
//                     />
//                   </div>

//                   <span className="text-caption font-caption text-neutral-600">
//                     {progressPercent}% complete
//                   </span>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-3 flex-wrap">
//                       {/* ✅ Title */}
//                       <span className="text-lg sm:text-xl lg:text-heading-3 font-heading-3 text-neutral-700">
//                         Product Management Fundamentals Assessment
//                       </span>
//                     </div>
//                     <span
//                       className="px-3 py-1 rounded-full text-xs font-bold border"
//                       style={{
//                         backgroundColor: colors.primary,
//                         color: colors.white,
//                       }}
//                     >
//                       {currentMarks} Marks
//                     </span>
//                   </div>
//                 </div>

//                 {/* Bottom horizontal line */}
//                 <div className="w-full h-[1px] bg-gray-300 my-2 flex-shrink-0" />

//                 <div className="flex w-full flex-col items-start gap-4">
//                   <span className="font-['Nunito_Sans'] text-[16px] font-[500] leading-[24px] text-default-font">
//                     {currentQuestion.prompt}
//                   </span>

//                   {/* <div className="flex w-full flex-col items-start gap-3">
//                   {currentQuestion.options.map((opt) => (
//                     <CheckboxCard
//                       key={opt.key}
//                       className={` h-auto w-full rounded-xl sm:rounded-2xl
//                       border px-3 py-3 sm:px-4
//                         ${
//                           answers[currentIndex] === opt.key
//                             ? "bg-[#E9EAE9]"
//                             : " bg-white"
//                         }
//                       `}
//                       hideCheckbox={true}
//                       checked={answers[currentIndex] === opt.key}
//                       onCheckedChange={(checked: boolean) => {
//                         // CheckboxCard's onCheckedChange passes boolean;
//                         // treat any truthy as selection
//                         if (checked) selectOption(opt.key);
//                         else {
//                           // uncheck (if the component allows toggling)
//                           setAnswers((prev) => {
//                             const copy = [...prev];
//                             // only clear if the same option being toggled off
//                             if (copy[currentIndex] === opt.key)
//                               copy[currentIndex] = null;
//                             return copy;
//                           });
//                         }
//                       }}
//                     >
//                       <div className="flex flex-col items-start gap-1">
//                         <span className="text-body-bold font-body-bold text-default-font">
//                           {opt.title}
//                         </span>

//                         <span className="text-xs font-body text-subtext-color">
//                           {opt.description}
//                         </span>
//                       </div>
//                     </CheckboxCard>
//                   ))}
//                 </div> */}

//                   <div className="flex w-full flex-col items-start gap-3">
//                     {currentQuestion.options.map((opt) => {
//                       const isSelected = answers[currentIndex] === opt.key;

//                       return (
//                         <CheckboxCard
//                           key={opt.key}
//                           className={`
//           h-auto w-full rounded-xl sm:rounded-2xl
//           border px-3 py-3 sm:px-4
//           transition-colors duration-200
//           ${isSelected ? "bg-[var(--primary-color)]" : "bg-white"}
//         `}
//                           style={
//                             isSelected
//                               ? { backgroundColor: colors.background }
//                               : {}
//                           }
//                           hideCheckbox={true}
//                           checked={isSelected}
//                           onCheckedChange={(checked: boolean) => {
//                             if (checked) selectOption(opt.key);
//                             else {
//                               setAnswers((prev) => {
//                                 const copy = [...prev];
//                                 if (copy[currentIndex] === opt.key)
//                                   copy[currentIndex] = null;
//                                 return copy;
//                               });
//                             }
//                           }}
//                         >
//                           <div className="flex flex-col items-start gap-1">
//                             <span
//                               className={`text-body-bold font-body-bold ${
//                                 isSelected ? "text-black" : "text-default-font"
//                               }`}
//                             >
//                               {opt.title}
//                             </span>

//                             <span
//                               className={`text-xs font-body ${
//                                 isSelected ? "text-black" : "text-subtext-color"
//                               }`}
//                             >
//                               {opt.description}
//                             </span>
//                           </div>
//                         </CheckboxCard>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Bottom horizontal line */}
//                 <div className="w-full h-[1px] bg-gray-300 my-2 flex-shrink-0" />
//                 <div className="flex w-full flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
//                   <div className="flex gap-3 w-full sm:w-auto">
//                     <Button
//                       disabled={saving || currentIndex === 0}
//                       style={{
//                         backgroundColor: colors.primary,
//                         color: colors.white,
//                       }}
//                       className="
//                     h-10 px-6 rounded-full hover:opacity-90
//                     shadow-[0_6px_18px_rgba(99,52,237,0.18)]
//                   "
//                       size="large"
//                       onClick={prevQuestion}
//                     >
//                       Previous
//                     </Button>

//                     <Button
//                       disabled={saving}
//                       className="h-10 px-6 rounded-full"
//                       variant="neutral-secondary"
//                       size="large"
//                       onClick={skipQuestion}
//                     >
//                       Skip Question
//                     </Button>
//                   </div>
//                   <Button
//                     disabled={saving}
//                     style={{
//                       backgroundColor: colors.primary,
//                       color: colors.white,
//                     }}
//                     className="
//                     h-10 px-6 rounded-full hover:opacity-90
//                     shadow-[0_6px_18px_rgba(99,52,237,0.18)]
//                   "
//                     size="large"
//                     iconRight={
//                       <FeatherArrowRight style={{ color: colors.white }} />
//                     }
//                     onClick={nextQuestion}
//                   >
//                     {currentIndex < questions.length - 1
//                       ? "Next Question"
//                       : "Submit"}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {warningOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//             <div className="w-[360px] rounded-2xl bg-white p-6 shadow-xl">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-neutral-900">
//                   Exam Warning
//                 </h3>
//               </div>

//               <p className="text-sm text-neutral-600 mb-2">{warningMsg}</p>

//               <p className="text-xs text-neutral-500 mb-6">
//                 Violations: <b>{violations}</b> / 4
//                 <br />
//                 Switching tabs or copying may auto-submit your exam.
//               </p>

//               <div className="flex gap-3">
//                 <Button
//                   variant="neutral-secondary"
//                   className="flex-1"
//                   onClick={async () => {
//                     // Unlock the exam
//                     setIsLocked(false);

//                     // You could also send an acknowledgment to backend if needed
//                     // await API("POST", `/api/test-attempts/${attemptId}/warning-ack`, {}, {
//                     //   "user-id": localStorage.getItem("userId"),
//                     // });

//                     setWarningOpen(false);
//                   }}
//                 >
//                   Continue Exam
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default AssessmentPage;

"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "../ui/components/Button";
import { CheckboxCard } from "../ui/components/CheckboxCard";
import { FeatherAlertCircle } from "@subframe/core";
import { FeatherArrowRight } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { FeatherSidebar } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import API, { URL_PATH } from "src/common/API";
import { colors } from "src/common/Colors";
import Footer from "src/ui/components/Footer";
import Navbar from "src/ui/components/Navbar";
// import API from "@/utils/API"; // or axios/fetch wrapper

type OptionKey = 1 | 2 | 3 | 4;

type Question = {
  id: string;
  prompt: string;
  marks: number;
  options: {
    key: OptionKey;
    title: string;
    description: string;
  }[];
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function AssessmentPage() {
  const navigate = useNavigate();
  const submitLockRef = useRef(false);

  const saveVersionRef = useRef<Record<string, number>>({});

  const location = useLocation();
  const userId = useMemo(() => localStorage.getItem("userId"), []);

  const [attemptId, setAttemptId] = useState<string | null>(
    location.state?.attemptId ?? null,
  );

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(OptionKey | null)[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const saveTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
  const [expiryReady, setExpiryReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [violations, setViolations] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showSkillBanner, setShowSkillBanner] = useState(true);

  const violationLockRef = useRef(false);

  const registerViolation = (msg: string) => {
    // prevent spamming multiple triggers in same moment
    if (violationLockRef.current) return;
    violationLockRef.current = true;

    setViolations((v) => v + 1);
    setWarningMsg(msg);
    setWarningOpen(true);
    setIsLocked(true);

    // unlock after a short delay so next real violation counts
    setTimeout(() => {
      violationLockRef.current = false;
    }, 800);
  };

  const reportViolation = async (type: string) => {
    if (!attemptId) return;

    try {
      const res = await API(
        "POST",
        URL_PATH.reportViolation + `/${attemptId}`,
        { type },
        {
          "user-id": localStorage.getItem("userId"),
        },
      );

      console.log("Integrity Update:", res);

      // Update violations count from backend response
      if (res.totalViolations !== undefined) {
        setViolations(res.totalViolations);

        // Auto-submit if violations reach 4
        if (res.totalViolations >= 4) {
          setWarningMsg(
            "⚠️ Maximum violations reached! Your exam is being auto-submitted.",
          );
          setWarningOpen(true);

          // Auto-submit after 2 seconds
          setTimeout(() => {
            handleSubmit();
          }, 2000);
        }
      }

      // If cheating alert triggered, update warning message
      if (res.cheatAlert) {
        setWarningMsg(
          "⚠️ Multiple violations detected! This attempt may be flagged for review.",
        );
      }

      return res;
    } catch (err) {
      console.error("Violation report failed", err);
    }
  };
  //============ SAVE ANSWERS ON REFRESH / CRASH =================//
  useEffect(() => {
    if (!attemptId) return;

    sessionStorage.setItem(
      `attempt-${attemptId}`,
      JSON.stringify({
        answers,
        currentIndex,
      }),
    );
  }, [answers, currentIndex, attemptId]);

  useEffect(() => {
    if (!attemptId) return;

    const saved = sessionStorage.getItem(`attempt-${attemptId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers);
      setCurrentIndex(parsed.currentIndex);
    }
  }, [attemptId]);

  //====== USE EFFECT TO PREVENT ACCIDENTAL REFRESH / TAB CLOSE ====//
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  useEffect(() => {
    const reportTabSwitch = async () => {
      if (attemptId) {
        await reportViolation("TAB_SWITCH");
      }
    };

    const reportCopy = async () => {
      if (attemptId) {
        await reportViolation("COPY");
      }
    };

    const reportPaste = async () => {
      if (attemptId) {
        await reportViolation("PASTE");
      }
    };

    // -------- Tab switch / leaving page detection ----------
    const onVisibilityChange = () => {
      if (document.hidden) {
        registerViolation(
          "Warning: You switched tabs / minimized the exam window. Otherwise the exam will be auto-submitted after 4 violations.",
        );
        reportTabSwitch();
      }
    };

    const onBlur = () => {
      registerViolation(
        "Warning: You moved away from the exam window. Otherwise the exam will be auto-submitted after 4 violations.",
      );
      reportTabSwitch();
    };

    // -------- Block copy/cut/paste/right click ----------
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      registerViolation(
        "Copy is disabled during the exam. Otherwise the exam will be auto-submitted after 4 violations.",
      );
      reportCopy();
    };

    const onCut = (e: ClipboardEvent) => {
      e.preventDefault();
      registerViolation(
        "Cut is disabled during the exam. Otherwise the exam will be auto-submitted after 4 violations.",
      );
      reportCopy();
    };

    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      registerViolation(
        "Paste is disabled during the exam. Otherwise the exam will be auto-submitted after 4 violations.",
      );
      reportPaste();
    };

    // ... rest of your event listeners
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      // Block DevTools shortcuts too (not perfect, but helps)
      const blocked =
        (ctrlOrCmd && ["c", "x", "v", "a", "p", "s", "u"].includes(key)) || // copy/cut/paste/select all/print/save/view source
        e.key === "F12" ||
        (ctrlOrCmd && e.shiftKey && ["i", "j", "c"].includes(key)); // devtools

      if (blocked) {
        e.preventDefault();
        registerViolation("That action is not allowed during the exam.");
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);

    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("paste", onPaste);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);

      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [violations, attemptId]); // Add attemptId to dependencies

  // --- COMPUTED VALUES ---
  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers],
  );
  const progressPercent = questions.length
    ? Math.round((answeredCount / questions.length) * 100)
    : 0;

  // Track skipped questions - FIX: Initialize as empty array
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);

  // --- HANDLERS ---
  const selectOption = (key: OptionKey) => {
    const question = questions[currentIndex];
    if (!question) return;

    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = key;
      return copy;
    });

    // Remove from skipped questions if it was skipped before
    if (skippedQuestions.includes(currentIndex)) {
      setSkippedQuestions((prev) => prev.filter((idx) => idx !== currentIndex));
    }

    saveAnswerToServer(question.id, key);
  };

  const clearAnswer = (index: number) => {
    const question = questions[index];
    if (!question) return;

    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });

    saveAnswerToServer(question.id, null);
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setCurrentIndex(index);
  };

  const skipQuestion = () => {
    // Mark current question as skipped (RED)
    setSkippedQuestions((prev) => {
      if (!prev.includes(currentIndex)) {
        return [...prev, currentIndex];
      }
      return prev;
    });

    // Move to next question
    const next = Math.min(currentIndex + 1, questions.length - 1);
    setCurrentIndex(next);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i: number) => i + 1);
    } else {
      handleSubmit();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  //=============== POST API FOR START ASSESSMENT============//
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (attemptId) return;

    const startAssessment = async () => {
      const res = await API(
        "POST",
        URL_PATH.startAssessment,
        {},
        { "user-id": userId },
      );

      setAttemptId(res.attemptId);

      // ✅ ADD THIS
      sessionStorage.setItem(
        `startedAt-${res.attemptId}`,
        Date.now().toString(),
      );
      sessionStorage.setItem("attemptId", res.attemptId);

      navigate("/assessment", {
        replace: true,
        state: {
          attemptId: res.attemptId,
          expiresAt: res.expiresAt,
        },
      });
    };

    startAssessment();
  }, [attemptId, userId, navigate]);

  //=============== GET API FOR TO FETCH QUESTIONS============//

  const startTimer = (expiryTime: number) => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));

      setRemainingSeconds(diff);

      if (diff === 0 && !submitLockRef.current) {
        handleSubmit();
      }
    };

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  };

  useEffect(() => {
    if (!attemptId || !expiryReady) return;

    let expiry: number | null = null;

    if (location.state?.expiresAt) {
      expiry = new Date(location.state.expiresAt).getTime();
    }

    if (!expiry) {
      const saved = sessionStorage.getItem(`expiresAt-${attemptId}`);
      if (saved) expiry = Number(saved);
    }

    if (!expiry) return;

    return startTimer(expiry);
  }, [attemptId, expiryReady]);

  useEffect(() => {
    if (!attemptId || !userId) return;

    // ✅ ADD THIS (store start time only once per attempt)
    const startedKey = `startedAt-${attemptId}`;
    if (!sessionStorage.getItem(startedKey)) {
      sessionStorage.setItem(startedKey, Date.now().toString());
    }
    // optional safety
    sessionStorage.setItem("attemptId", attemptId);

    const fetchQuestions = async () => {
      const res = await API(
        "GET",
        `${URL_PATH.getAttemptQuestions}/${attemptId}`,
        undefined,
        { "user-id": userId },
      );

      setDurationMinutes(res.durationMinutes);

      // ✅ Create expiresAt if not coming from route state
      if (!location.state?.expiresAt) {
        const expiry = Date.now() + res.durationMinutes * 60 * 1000;

        sessionStorage.setItem(`expiresAt-${attemptId}`, expiry.toString());
      }
      setExpiryReady(true);

      const mapped: Question[] = res.questions.map((q: any, idx: number) => ({
        id: q._id,
        prompt: q.question,

        // ✅ 1st priority: backend sends marks
        // common keys: marks / points / score
        // ✅ fallback: 5 marks default (you can change)
        marks: Number(q.marks ?? q.points ?? q.score ?? 5),

        options: q.options.map((opt: string, i: number) => ({
          key: (i + 1) as OptionKey,
          title: `${["A", "B", "C", "D"][i]}. ${opt}`,
          description: "",
        })),
      }));

      setQuestions(mapped);
      setAnswers((prev) =>
        prev.length ? prev : Array(mapped.length).fill(null),
      );
      setLoading(false);
    };

    fetchQuestions();
  }, [attemptId, userId, location.state?.expiresAt]);

  //=============== POST API FOR SAVE Q OPTION ==============//
  const saveAnswerToServer = (
    questionId: string,
    selectedOption: OptionKey | null,
  ) => {
    if (!attemptId || !userId) return;

    if (saveTimeoutRef.current[questionId]) {
      clearTimeout(saveTimeoutRef.current[questionId]);
    }

    saveTimeoutRef.current[questionId] = setTimeout(async () => {
      const version = (saveVersionRef.current[questionId] || 0) + 1;
      saveVersionRef.current[questionId] = version;

      try {
        await API(
          "POST",
          URL_PATH.saveAnswer,
          { attemptId, questionId, selectedOption, version },
          { "user-id": userId },
        );

        if (saveVersionRef.current[questionId] !== version) return;
      } catch (err) {
        console.warn("Save answer failed", err);
      }
    }, 400);
  };

  //=============== GET API FOR SUBMIT ASSESSMENT============//
  const handleSubmit = async () => {
    if (!attemptId || submitLockRef.current) return;

    submitLockRef.current = true;
    setSaving(true);

    try {
      await API(
        "POST",
        URL_PATH.submitAssessment,
        { attemptId },
        { "user-id": userId },
      );
      localStorage.setItem("assessmentCompleted", "true");
      localStorage.setItem("attemptId", attemptId);
      sessionStorage.setItem("attemptId", attemptId);

      sessionStorage.setItem(`submittedAt-${attemptId}`, Date.now().toString());

      navigate("/assessment-results", { state: { attemptId } });
    } catch (err) {
      submitLockRef.current = false;
      console.error("Submit failed", err);
    } finally {
      setSaving(false);
    }
  };

  // --- RENDER NAVIGATOR NUMBERS (with animations) ---
  const renderNavigatorItem = (qIndex: number) => {
    const isCurrent = qIndex === currentIndex;
    const isAnswered = answers[qIndex] !== null;
    const isSkipped = skippedQuestions.includes(qIndex);

    // Animation keyframes
    const animationStyles = `
      @keyframes navSlideIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes navPulseGreen {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
        }
      }
      
      @keyframes navPulseBlue {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(99, 52, 237, 0.5);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(99, 52, 237, 0);
        }
      }
      
      @keyframes navPulseRed {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
        }
      }
      
      .nav-answered {
        animation: navSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), navPulseGreen 2s ease-in-out infinite;
      }
      
      .nav-current {
        animation: navSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), navPulseBlue 2s ease-in-out infinite;
      }
      
      .nav-skipped {
        animation: navSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), navPulseRed 2s ease-in-out infinite;
      }
      
      .nav-unanswered {
        animation: navSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    `;

    // Current question - Blue
    if (isCurrent) {
      return (
        <div key={qIndex}>
          <style>{animationStyles}</style>
          <div
            onClick={() => {
              if (!saving) goToQuestion(qIndex);
            }}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl cursor-pointer nav-current transition-all duration-300 active:scale-95"
            style={{
              backgroundColor: colors.primaryGlow,
              color: "accent",
            }}
          >
            <span className="text-body-bold font-body-bold text-brand-600">
              {qIndex + 1}
            </span>
          </div>
        </div>
      );
    }

    // Answered question - Green
    if (isAnswered) {
      return (
        <div key={qIndex}>
          <style>{animationStyles}</style>
          <div
            onClick={() => {
              if (!saving) goToQuestion(qIndex);
            }}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl cursor-pointer nav-answered transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: "#22c55e",
              color: "white",
            }}
          >
            <span className="text-body-bold font-body-bold text-white font-semibold">
              {qIndex + 1}
            </span>
          </div>
        </div>
      );
    }

    // Skipped question - Red
    if (isSkipped) {
      return (
        <div key={qIndex}>
          <style>{animationStyles}</style>
          <div
            onClick={() => {
              if (!saving) goToQuestion(qIndex);
            }}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl cursor-pointer nav-skipped transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: "#ef4444",
              color: "white",
            }}
          >
            <span className="text-body-bold font-body-bold text-white font-semibold">
              {qIndex + 1}
            </span>
          </div>
        </div>
      );
    }

    // Default unanswered - Grey
    return (
      <div
        key={qIndex}
        onClick={() => {
          if (!saving) goToQuestion(qIndex);
        }}
        className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border-2 border-solid border-neutral-border bg-gray-200 cursor-pointer nav-unanswered"
        style={{
          backgroundColor: "#e5e7eb", // Grey color
          color: "#4b5563", // Dark grey text
        }}
      >
        <span className="text-body-bold font-body-bold text-gray-700">
          {qIndex + 1}
        </span>
      </div>
    );
  };

  // For display: mm:ss
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  // Current question to show
  const currentQuestion = questions[currentIndex];

  const currentMarks = currentQuestion?.marks ?? 0;

  const totalMarks = useMemo(() => {
    return questions.reduce((sum, q) => sum + (q.marks ?? 0), 0);
  }, [questions]);

  if (loading) return <div>Loading assessment...</div>;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
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
    >
      <div className="w-full relative" style={{ borderColor: colors.aqua }}>
        <Navbar />
      </div>
      {/* Header and content with z-index to stay above background */}
      <div className="relative z-10">
        <div className="min-h-screen w-full flex justify-center px-4 py-4 sm:py-6 lg:py-12">
          <div className="flex w-full max-w-[1024px] flex-col lg:flex-row items-stretch gap-4 lg:gap-6">
            <div
              style={{ backgroundColor: colors.white }}
              className="
  hidden lg:flex
  w-full lg:w-64
  flex-none flex-col items-start gap-4
  self-stretch rounded-2xl
  border border-neutral-border
  0 px-6 lg:px-8 py-6
  overflow-y-auto
"
            >
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Question Navigator
                  </span>
                  <span className="text-sm font-caption text-subtext-color">
                    {answeredCount} of {questions.length} answered
                  </span>
                </div>
                <FeatherSidebar className="mt-2 text-body font-body text-subtext-color cursor-pointer" />
              </div>
              <div
                style={{ border: "2px solod black" }}
                className="flex items-center gap-2 flex-wrap mt-3"
              >
                {questions.map((_, idx) => renderNavigatorItem(idx))}
              </div>

              {/* Bottom horizontal line */}
              <div className="w-full h-[1px] bg-gray-300 my-4 flex-shrink-0" />

              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center gap-2">
                  <div
                    style={{ backgroundColor: colors.primaryGlow }}
                    className="flex h-3 w-3 flex-none items-start rounded-full"
                  />
                  <span className="text-caption font-caption text-default-font">
                    Current
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div
                    style={{ backgroundColor: "#22c55e" }}
                    className="flex h-3 w-3 flex-none items-start rounded-full"
                  />
                  <span className="text-caption font-caption text-default-font">
                    Answered
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div
                    style={{ backgroundColor: "#ef4444" }}
                    className="flex h-3 w-3 flex-none items-start rounded-full"
                  />
                  <span className="text-caption font-caption text-default-font">
                    Skipped
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div
                    className="flex h-3 w-3 flex-none items-start rounded-full"
                    style={{
                      backgroundColor: "#e5e7eb",
                      border: "1px solid #9ca3af",
                    }}
                  />
                  <span className="text-caption font-caption text-default-font">
                    Not Visited
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT PANNEL */}

            <div className="flex w-full flex-col items-start justify-start gap-4">
              {showSkillBanner && (
                <div
                  className="
      flex w-full flex-wrap items-center gap-2
      justify-between rounded-xl
      border bg-yellow-50
      px-3 py-2
    "
                >
                  <div className="flex items-center gap-2">
                    <FeatherAlertCircle className="text-caption font-caption text-yellow-700" />
                    <span className="text-xs text-yellow-700">
                      Your Skill Index is built from this score
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSkillBanner(false)}
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <FeatherX className="text-caption font-caption text-yellow-700" />
                  </button>
                </div>
              )}
              <div
                className="
                      flex w-full flex-col items-start gap-5
                      rounded-2xl border bg-white shadow-sm
                      px-4 py-5
                      sm:px-6 sm:py-6
                      lg:px-8 lg:py-8
                    "
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-subtext-color">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <FeatherClock className="text-body font-body text-default-font animate-pulse-slow" />
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full">
                        {/* Animated timer display */}
                        <span className="text-sm font-body-bold text-default-font relative">
                          <span className="relative">
                            {pad2(minutes)}:{pad2(seconds)}
                            {/* Small dot indicator for active timer */}
                            <span className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping-slow" />
                          </span>
                        </span>
                        <span className="text-sm text-default-font">
                          remaining
                        </span>

                        {/* Animated emoji based on time remaining */}
                        <span className="inline-block animate-bounce-slow text-lg ml-1">
                          {remainingSeconds > 300 && "⏳"}{" "}
                          {/* More than 5 minutes */}
                          {remainingSeconds <= 300 &&
                            remainingSeconds > 120 &&
                            "⌛"}{" "}
                          {/* 2-5 minutes */}
                          {remainingSeconds <= 120 &&
                            remainingSeconds > 60 &&
                            "⚡"}{" "}
                          {/* 1-2 minutes */}
                          {remainingSeconds <= 60 &&
                            remainingSeconds > 30 &&
                            "🔥"}{" "}
                          {/* 30-60 seconds */}
                          {remainingSeconds <= 30 &&
                            remainingSeconds > 10 &&
                            "⚠️"}{" "}
                          {/* 10-30 seconds */}
                          {remainingSeconds <= 10 &&
                            remainingSeconds > 0 &&
                            "🚨"}{" "}
                          {/* Last 10 seconds */}
                          {remainingSeconds === 0 && "⏰"} {/* Time's up */}
                        </span>
                      </div>

                      {/* Urgency indicator for low time */}
                      {remainingSeconds <= 60 && (
                        <span className="flex gap-0.5">
                          <span className="text-red-500 animate-ping-slow">
                            !
                          </span>
                          <span className="text-red-500 animate-ping-slow delay-100">
                            !
                          </span>
                          <span className="text-red-500 animate-ping-slow delay-200">
                            !
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Add these animations to your existing style tag or create new ones */}
                    <style>{`
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  
  @keyframes ping-slow {
    75%, 100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  
  @keyframes countdown-pulse {
    0%, 100% { 
      color: #ef4444;
      transform: scale(1);
    }
    50% { 
      color: #dc2626;
      transform: scale(1.1);
    }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }
  
  .animate-ping-slow {
    animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 1s ease-in-out infinite;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out infinite;
  }
  
  .animate-countdown-pulse {
    animation: countdown-pulse 1s ease-in-out infinite;
  }
  
  .delay-100 {
    animation-delay: 0.1s;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  
  .delay-300 {
    animation-delay: 0.3s;
  }
`}</style>
                  </div>
                </div>

                {/* progress bar (custom accessible) */}
                <div className="flex w-full flex-col items-start gap-2">
                  <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progressPercent}
                    className="w-full rounded-full bg-neutral-200 h-2 overflow-hidden relative group cursor-pointer"
                    title={`${progressPercent}% complete`}
                  >
                    {/* Animated progress bar with bouncing effect */}
                    <div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        width: `${progressPercent}%`,
                        background: `linear-gradient(90deg, ${colors.primary}, #8b5cf6, #ff6b6b, ${colors.primary})`,
                        backgroundSize: "300% 100%",
                        animation:
                          "rainbowShift 4s ease infinite, bounceWidth 0.5s ease-out, glowPulse 2s ease-in-out infinite",
                        boxShadow: `0 0 10px ${colors.primary}80`,
                      }}
                    >
                      {/* Sparkle effects */}
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-sparkle" />
                        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-sparkle-delay" />
                        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-300 rounded-full animate-sparkle-slow" />
                      </div>

                      {/* Bubble effect at the end */}
                      {progressPercent > 0 && progressPercent < 100 && (
                        <>
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-75"
                            style={{
                              animation:
                                "ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }}
                          />
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full"
                            style={{
                              animation:
                                "pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Fun percentage display with animated emoji */}
                  <span className="text-caption font-caption text-neutral-600 flex items-center gap-2 flex-wrap">
                    <span className="relative flex items-center gap-1">
                      {/* Animated percentage */}
                      <span
                        className="font-bold text-lg transition-all duration-300 hover:scale-110 inline-block"
                        style={{
                          color: colors.primary,
                          animation:
                            progressPercent === 100
                              ? "bounce 0.5s ease infinite"
                              : "none",
                        }}
                      >
                        {progressPercent}%
                      </span>

                      {/* Floating motivational message */}
                      <span className="relative">
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-white px-2 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap animate-float border border-gray-200">
                          {progressPercent < 30 && "💪 Keep pushing forward!"}
                          {progressPercent >= 30 &&
                            progressPercent < 60 &&
                            "👍 You're doing great!"}
                          {progressPercent >= 60 &&
                            progressPercent < 80 &&
                            "🚀 Almost halfway there!"}
                          {progressPercent >= 80 &&
                            progressPercent < 90 &&
                            "🎯 So close!"}
                          {progressPercent >= 90 &&
                            progressPercent < 100 &&
                            "⚡ Finishing strong!"}
                          {progressPercent === 100 && "✨ Perfect score!"}
                        </span>
                      </span>
                    </span>

                    <span>complete</span>

                    {/* Animated emoji based on progress */}
                    <span className="inline-block animate-bounce-slow text-lg">
                      {progressPercent < 30 && "🌱"}
                      {progressPercent >= 30 && progressPercent < 60 && "🌿"}
                      {progressPercent >= 60 && progressPercent < 80 && "🌳"}
                      {progressPercent >= 80 && progressPercent < 100 && "🏃"}
                      {progressPercent === 100 && "🏆"}
                    </span>

                    {/* Celebration confetti for 100% */}
                    {progressPercent === 100 && (
                      <span className="inline-flex gap-1 ml-1">
                        <span className="animate-bounce delay-100">🎉</span>
                        <span className="animate-bounce delay-200">🎊</span>
                        <span className="animate-bounce delay-300">🎈</span>
                      </span>
                    )}
                  </span>

                  {/* Progress milestone indicators */}
                  <div className="w-full flex justify-between px-1 mt-1">
                    {[25, 50, 75, 100].map((milestone) => (
                      <div key={milestone} className="relative group">
                        <div
                          className={`w-1 h-1 rounded-full transition-all duration-300 ${
                            progressPercent >= milestone
                              ? "bg-green-500 scale-150"
                              : "bg-gray-300"
                          }`}
                        />
                        {progressPercent >= milestone && (
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-green-100 px-1 rounded">
                            {milestone}% ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <style>{`
    @keyframes rainbowShift {
      0% { background-position: 0% 50%; }
      33% { background-position: 50% 50%; }
      66% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes bounceWidth {
      0% { transform: scaleX(0.95); opacity: 0.8; }
      50% { transform: scaleX(1.02); opacity: 1; }
      100% { transform: scaleX(1); opacity: 1; }
    }
    
    @keyframes ping-slow {
      0% { transform: scale(1); opacity: 1; }
      75% { transform: scale(2.5); opacity: 0; }
      100% { transform: scale(3); opacity: 0; }
    }
    
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 0.5; }
      50% { transform: scale(1.5); opacity: 0.2; }
      100% { transform: scale(2); opacity: 0; }
    }
    
    @keyframes sparkle {
      0% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1.5); }
      100% { opacity: 0; transform: scale(2); }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes glowPulse {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.2); }
    }
    
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    
    .animate-sparkle {
      animation: sparkle 2s ease-in-out infinite;
    }
    
    .animate-sparkle-delay {
      animation: sparkle 2.5s ease-in-out infinite 0.5s;
    }
    
    .animate-sparkle-slow {
      animation: sparkle 3s ease-in-out infinite 1s;
    }
    
    .animate-bounce-slow {
      animation: bounce-slow 1s ease-in-out infinite;
    }
    
    .animate-float {
      animation: float 2s ease-in-out infinite;
    }
    
    .delay-100 {
      animation-delay: 0.1s;
    }
    
    .delay-200 {
      animation-delay: 0.2s;
    }
    
    .delay-300 {
      animation-delay: 0.3s;
    }
  `}</style>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* ✅ Title */}
                      <span className="text-lg sm:text-xl lg:text-heading-3 font-heading-3 text-neutral-700">
                        Product Management Fundamentals Assessment
                      </span>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold border"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.white,
                      }}
                    >
                      {currentMarks} Marks
                    </span>
                  </div>
                </div>

                {/* Bottom horizontal line */}
                <div className="w-full h-[1px] bg-gray-300 my-2 flex-shrink-0" />

                <div className="flex w-full flex-col items-start gap-4">
                  <span className=" text-[16px] font-[500] leading-[24px] text-default-font">
                    {currentQuestion.prompt}
                  </span>

                  <div className="flex w-full flex-col items-start gap-3">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = answers[currentIndex] === opt.key;

                      return (
                        <CheckboxCard
                          key={opt.key}
                          className={`
          h-auto w-full rounded-xl sm:rounded-2xl
          border px-3 py-3 sm:px-4
          transition-all duration-300 ease-in-out
          ${isSelected ? "bg-green-100 border-green-500 scale-[1.02]" : "bg-white"}
          hover:bg-green-50 hover:scale-[1.01] active:scale-[0.99]
          cursor-pointer
        `}
                          style={
                            isSelected
                              ? {
                                  backgroundColor: "#dcfce7",
                                  borderColor: "#22c55e",
                                }
                              : {}
                          }
                          hideCheckbox={true}
                          checked={isSelected}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) selectOption(opt.key);
                            else {
                              setAnswers((prev) => {
                                const copy = [...prev];
                                if (copy[currentIndex] === opt.key)
                                  copy[currentIndex] = null;
                                return copy;
                              });
                            }
                          }}
                        >
                          <div className="flex items-start justify-between w-full gap-2">
                            <div className="flex flex-col items-start gap-1 flex-1">
                              <span
                                className={`text-body-bold font-body-bold ${
                                  isSelected
                                    ? "text-green-700"
                                    : "text-default-font"
                                }`}
                              >
                                {opt.title}
                              </span>

                              <span
                                className={`text-xs font-body ${
                                  isSelected
                                    ? "text-green-600"
                                    : "text-subtext-color"
                                }`}
                              >
                                {opt.description}
                              </span>
                            </div>

                            {/* Single animated emoji on the right */}
                            <div
                              className={`
              transition-all duration-500 ease-bounce
              ${
                isSelected
                  ? "opacity-100 translate-x-0 scale-100 rotate-0"
                  : "opacity-0 translate-x-10 scale-0 -rotate-45"
              }
            `}
                            >
                              <span className="text-2xl inline-block animate-pop">
                                ✓
                              </span>
                            </div>
                          </div>
                        </CheckboxCard>
                      );
                    })}
                    <style>
                      {`/* Add to your global CSS file */
@keyframes pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-pop {
  animation: pop 0.4s ease-out forwards;
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}

.ease-bounce {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}`}
                    </style>
                  </div>
                </div>

                {/* Bottom horizontal line */}
                <div className="w-full h-[1px] bg-gray-300 my-2 flex-shrink-0" />
                <div className="flex w-full flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      disabled={saving || currentIndex === 0}
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.white,
                      }}
                      className="
                    h-10 px-6 rounded-full hover:opacity-90
                    shadow-[0_6px_18px_rgba(99,52,237,0.18)]
                  "
                      size="large"
                      onClick={prevQuestion}
                    >
                      Previous
                    </Button>

                    <Button
                      disabled={saving}
                      className="h-10 px-6 rounded-full"
                      variant="neutral-secondary"
                      size="large"
                      onClick={skipQuestion}
                    >
                      Skip Question
                    </Button>
                  </div>
                  <Button
                    disabled={saving}
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                    }}
                    className="
                    h-10 px-6 rounded-full hover:opacity-90
                    shadow-[0_6px_18px_rgba(99,52,237,0.18)]
                  "
                    size="large"
                    iconRight={
                      <FeatherArrowRight style={{ color: colors.white }} />
                    }
                    onClick={nextQuestion}
                  >
                    {currentIndex < questions.length - 1
                      ? "Next Question"
                      : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {warningOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[360px] rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Exam Warning
                </h3>
              </div>

              <p className="text-sm text-neutral-600 mb-2">{warningMsg}</p>

              <p className="text-xs text-neutral-500 mb-6">
                Violations: <b>{violations}</b> / 4
                <br />
                Switching tabs or copying may auto-submit your exam.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="neutral-secondary"
                  className="flex-1"
                  onClick={async () => {
                    // Unlock the exam
                    setIsLocked(false);

                    // You could also send an acknowledgment to backend if needed
                    // await API("POST", `/api/test-attempts/${attemptId}/warning-ack`, {}, {
                    //   "user-id": localStorage.getItem("userId"),
                    // });

                    setWarningOpen(false);
                  }}
                >
                  Continue Exam
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AssessmentPage;

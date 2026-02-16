"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Badge } from "../ui/components/Badge";
import { Button } from "../ui/components/Button";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowRight } from "@subframe/core";
import { FeatherAward } from "@subframe/core";
import { FeatherBookOpen } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { FeatherGlobe } from "@subframe/core";
import { FeatherMap } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherShield } from "@subframe/core";
import { FeatherTarget } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherArrowLeft } from "@subframe/core";
import { useNavigate, useLocation } from "react-router-dom";
import API, { URL_PATH } from "src/common/API";
import { colors } from "src/common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "src/ui/components/Footer";
import { useAppDispatch } from "src/store/hooks";
import { setNavigation, completeStep } from "src/store/slices/onboardingSlice";

type RankItem = {
  rank: number | string;
};

type Violation = {
  type: "COPY" | "PASTE" | "TAB_SWITCH";
  at: string;
};

type IntegrityReport = {
  attemptId: string;
  integrityScore: number;
  integrityLevel: string;
  cheatAlertSent: boolean;
  totalViolations: number;
  level: string;
  violationBreakdown: {
    COPY: number;
    PASTE: number;
    TAB_SWITCH: number;
  };
  violationTimeline: Violation[];
};

function AssessmentResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isResultLoading, setIsResultLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [scoreAnimating, setScoreAnimating] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const [result, setResult] = useState<{
    skillIndex: number;
    maxSkillIndex: number;
  } | null>(null);

  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState<number | null>(null);
  const [report, setReport] = useState<IntegrityReport | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = sessionStorage.getItem("userId");

  const [rankData, setRankData] = useState<{
    global: RankItem;
    country: RankItem;
    state: RankItem;
    city: RankItem;
    university: RankItem;
  }>({
    global: { rank: "-" },
    country: { rank: "-" },
    state: { rank: "-" },
    city: { rank: "-" },
    university: { rank: "-" },
  });

  // ============================================
  // MARK ONBOARDING AS COMPLETE
  // ============================================
  useEffect(() => {
    console.log("📍 [AssessmentResult] ==================");
    console.log("📍 [AssessmentResult] Component mounted");
    console.log("📍 [AssessmentResult] Marking onboarding as complete");

    // Mark assessment-results as completed
    dispatch(completeStep("assessment-results"));

    // Fetch updated navigation to confirm completion
    const markOnboardingComplete = async () => {
      try {
        const statusResponse = await API("GET", URL_PATH.getUserStatus);

        if (statusResponse?.success && statusResponse.navigation) {
          console.log(
            "✅ [AssessmentResult] Updating Redux with completed status",
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

          if (statusResponse.navigation.isOnboardingComplete) {
            console.log("🎉 [AssessmentResult] Onboarding is now complete!");
          }
        }
      } catch (error) {
        console.error(
          "❌ [AssessmentResult] Failed to fetch navigation:",
          error,
        );
      }
    };

    markOnboardingComplete();
    console.log("📍 [AssessmentResult] ==================");
  }, [dispatch]);

  // Trigger celebration animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(true);

      // Remove after animation
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animate score on load
  useEffect(() => {
    if (result?.skillIndex) {
      setScoreAnimating(true);
      let start = 0;
      const end = result.skillIndex;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedScore(end);
          setScoreAnimating(false);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [result?.skillIndex]);

  const fetchResult = useCallback(async () => {
    const attemptId =
      location.state?.attemptId ||
      localStorage.getItem("attemptId") ||
      sessionStorage.getItem("attemptId");

    if (!attemptId) {
      setIsResultLoading(false);
      return;
    }

    const localSubmitted = sessionStorage.getItem(`submittedAt-${attemptId}`);
    if (localSubmitted) {
      setSubmittedAt(new Date(Number(localSubmitted)).toISOString());
    }

    const localStart = sessionStorage.getItem(`startedAt-${attemptId}`);
    if (localStart && localSubmitted) {
      const diff = Math.max(
        0,
        Math.floor((Number(localSubmitted) - Number(localStart)) / 1000),
      );
      setTimeTakenSeconds(diff);
    }

    try {
      const res = await API("GET", `${URL_PATH.result}?attemptId=${attemptId}`);

      console.log("FINAL RESPONSE:", res);

      if (res?.integrity) {
        setReport({
          attemptId: res?.attempt?._id || "",
          integrityScore: res.integrity.score,
          integrityLevel: res.integrity.level,
          cheatAlertSent: res.integrity.cheatAlertSent,
          totalViolations: res.integrity.totalViolations,
          level: res.integrity.level,
          violationBreakdown: {
            COPY: 0,
            PASTE: 0,
            TAB_SWITCH: 0,
          },
          violationTimeline: [],
        });
      }

      setResult({
        skillIndex: res?.hireabilityIndex?.skillIndexScore ?? 0,
        maxSkillIndex: res?.hireabilityIndex?.skillIndexTotal ?? 0,
      });

      const submitted: string | null =
        res?.attempt?.submittedAt ||
        res?.submittedAt ||
        res?.attempt?.endedAt ||
        null;

      if (submitted) {
        setSubmittedAt(submitted);
      } else {
        const localSubmitted = sessionStorage.getItem(
          `submittedAt-${attemptId}`,
        );
        if (localSubmitted) {
          setSubmittedAt(new Date(Number(localSubmitted)).toISOString());
        }
      }

      const takenSeconds: number | null =
        res?.attempt?.timeTakenSeconds ??
        res?.timeTakenSeconds ??
        res?.attempt?.durationSeconds ??
        null;

      if (typeof takenSeconds === "number") {
        setTimeTakenSeconds(takenSeconds);
      } else {
        const start = sessionStorage.getItem(`startedAt-${attemptId}`);
        const end = sessionStorage.getItem(`submittedAt-${attemptId}`);
        if (start && end) {
          const diff = Math.max(
            0,
            Math.floor((Number(end) - Number(start)) / 1000),
          );
          setTimeTakenSeconds(diff);
        }
      }
    } catch (error) {
      console.error("Failed to fetch result", error);
      setResult(null);
    } finally {
      setIsResultLoading(false);
    }
  }, [location.state?.attemptId]);

  const fetchRanks = useCallback(async () => {
    try {
      const res = await API("GET", URL_PATH.calculateExperienceIndex);

      console.log("fetchRanks response:", res);
      if (!res) return;

      const rank = res?.rank ?? {};

      setRankData({
        global: { rank: rank?.globalRank ?? "-" },
        country: { rank: rank?.countryRank ?? "-" },
        state: { rank: rank?.stateRank ?? "-" },
        city: { rank: rank?.cityRank ?? "-" },
        university: {
          rank: rank?.universityRank ?? rank?.universityrank ?? "-",
        },
      });
    } catch (err) {
      console.error("fetchRanks failed:", err);
    }
  }, []);

  useEffect(() => {
    fetchResult();
    fetchRanks();
  }, [fetchResult, fetchRanks, navigate]);

  const handleGoToDashboard = () => {
    console.log("🚀 [AssessmentResult] Go to Dashboard clicked");
    console.log("📍 Navigating to /dashboard");

    // Add a small delay to ensure Redux updates are processed
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  };

  const formatDate = (iso?: string | null) => {
    if (!iso) return "--";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDuration = (seconds?: number | null) => {
    if (typeof seconds !== "number" || seconds < 0) return "--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} min ${s} sec`;
  };

  const formattedSubmittedDate = formatDate(submittedAt);
  const formattedTimeTaken = formatDuration(timeTakenSeconds);

  const getIntegrityColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "excellent":
        return "#10b981";
      case "good":
        return "#3b82f6";
      case "fair":
        return "#f59e0b";
      case "poor":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  if (isResultLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-sm">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(
        to bottom,
        #d9d9d9 0%,
        #cfd3d6 25%,
        #9aa6b2 55%,
        #2E4056 100%
      )`,
      }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* CSS-only confetti effect */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `hsl(${Math.random() * 360}, 80%, 60%)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10">
        <div className="w-full py-12">
          <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-8 px-4">
            {/* Header with celebration animation */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between animate-slideDown">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-default-font">
                    Assessment Results
                  </h1>
                  {showCelebration && (
                    <span className="text-3xl animate-bounce">🎉</span>
                  )}
                </div>
                <span className="text-sm text-subtext-color flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Product Management · Skill Index
                </span>
              </div>

              {/* Floating badge */}
              <div className="relative group">
                <div className="absolute inset-0 bg-accent rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative px-4 py-2 bg-white rounded-lg shadow-lg">
                  <span
                    style={{ color: colors.accent }}
                    className="text-sm font-semibold"
                  >
                    🏆 Top Performer
                  </span>
                </div>
              </div>
            </div>

            {/* Main Score Card */}
            <div
              style={{ backgroundColor: colors.white }}
              className="relative w-full overflow-hidden rounded-3xl border-[3px] bg-gradient-to-b from-[#F4F2FF] to-white px-4 py-8 sm:px-12 sm:py-14 shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
            >
              {/* Animated gradient border */}
              <div
                style={{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.primary}, ${colors.aqua})`,
                  opacity: 0,
                }}
                className="absolute inset-0 group-hover:opacity-30 transition-opacity duration-500"
              ></div>

              {/* Score with animation */}
              <div className="flex flex-col items-center gap-6 relative">
                <div className="flex items-end gap-3">
                  <span
                    style={{ color: colors.accent }}
                    className={`text-[64px] sm:text-[80px] lg:text-[96px] font-bold leading-none transition-all duration-300 ${
                      scoreAnimating ? "scale-110" : ""
                    }`}
                  >
                    {animatedScore || result?.skillIndex || "--"}
                  </span>
                  <span className="text-[20px] sm:text-[28px] lg:text-[32px] font-medium text-subtext-color pb-2 sm:pb-4">
                    / {result?.maxSkillIndex || "--"}
                  </span>
                </div>

                {/* Achievement badges */}
                <div className="flex gap-3 mt-2">
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium animate-pulse">
                    ⭐ Top 15%
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    🎯 Excellent
                  </div>
                </div>
              </div>

              {/* Performance Tier */}
              <div className="mt-8 flex w-full max-w-[768px] flex-col items-center gap-6 mx-auto">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-subtext-color">
                    Performance Tier
                  </span>
                  <span
                    style={{ color: colors.accent }}
                    className="text-base font-semibold"
                  >
                    Elite Performer
                  </span>
                </div>

                {/* Animated tier progress */}
                <div className="flex w-full items-center gap-4 overflow-x-auto sm:overflow-visible px-2 sm:px-0">
                  {[
                    { name: "Development", percent: 40, color: "gray" },
                    { name: "Competent", percent: 25, color: "gray" },
                    {
                      name: "You are here",
                      percent: 15,
                      color: "accent",
                      active: true,
                    },
                    { name: "Advanced", percent: 10, color: "accent" },
                    { name: "Master", percent: 10, color: "gray" },
                  ].map((tier, index) => (
                    <React.Fragment key={tier.name}>
                      <div className="flex flex-col items-center gap-2 shrink-0 group">
                        <div
                          className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${
                            tier.active
                              ? "bg-accent shadow-lg animate-soft-blink"
                              : tier.color === "accent"
                                ? "bg-accent/70"
                                : "bg-neutral-300"
                          }`}
                          style={{
                            backgroundColor: tier.active
                              ? colors.accent
                              : tier.color === "accent"
                                ? colors.accent + "70"
                                : colors.primaryGlow,
                            boxShadow: tier.active
                              ? `0 0 20px ${colors.accent}`
                              : "none",
                          }}
                        >
                          <span className="text-xs font-medium text-white">
                            {tier.percent}%
                          </span>
                          {tier.active && (
                            <>
                              <div className="absolute inset-0 rounded-full animate-ping bg-accent opacity-20"></div>
                              <div
                                className="absolute -inset-1 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"
                                style={{
                                  background: `linear-gradient(to right, ${colors.accent}, ${colors.primary})`,
                                }}
                              ></div>
                            </>
                          )}
                        </div>
                        <span
                          className={`text-xs ${tier.active ? "text-accent font-medium" : "text-subtext-color"}`}
                          style={{
                            color: tier.active ? colors.accent : undefined,
                          }}
                        >
                          {tier.name}
                        </span>
                        {tier.active && (
                          <span
                            className="absolute -bottom-6 text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{
                              backgroundColor: colors.primaryGlow,
                              color: "black",
                            }}
                          >
                            ← You are here
                          </span>
                        )}
                      </div>
                      {index < 4 && (
                        <div
                          className={`hidden sm:block h-1 flex-1 rounded-full ${
                            index === 2 ? "bg-accent" : "bg-neutral-300"
                          }`}
                          style={{
                            backgroundColor:
                              index === 2 ? colors.accent : undefined,
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Info Bar with glow effect */}
                <div className="mt-6 relative group w-full">
                  <div
                    className="absolute inset-0 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.primary})`,
                    }}
                  ></div>
                  <div
                    className="relative flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3"
                    style={{ backgroundColor: colors.primaryGlow }}
                  >
                    <span
                      className="text-sm font-medium animate-pulse"
                      style={{ color: "black" }}
                    >
                      ✨ Just 3 points away from Top 10%! Keep going!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div
              style={{ backgroundColor: colors.white }}
              className="w-full rounded-3xl shadow-md transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-8 px-4 sm:px-8 py-4">
                {[
                  {
                    icon: FeatherCalendar,
                    label: "Completed",
                    value: formattedSubmittedDate,
                    color: "green",
                  },
                  {
                    icon: FeatherClock,
                    label: "Time Taken",
                    value: formattedTimeTaken,
                    color: "accent",
                  },
                  {
                    icon: FeatherShield,
                    label: "Integrity Score",
                    value: report ? report.integrityLevel : "—",
                    color: getIntegrityColor(report?.integrityLevel || ""),
                  },
                ].map((item, index) => (
                  <React.Fragment key={item.label}>
                    <div className="flex items-center gap-3 sm:gap-2 group">
                      <div
                        className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: colors.primaryGlow }}
                      >
                        <item.icon
                          style={{
                            color:
                              item.color === "accent"
                                ? colors.accent
                                : item.color,
                          }}
                          className="text-sm"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-medium text-default-font truncate">
                          {item.value}
                        </span>
                        <span className="text-xs text-subtext-color">
                          {item.label}
                        </span>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="h-px w-full bg-neutral-200 sm:h-6 sm:w-px" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Ranking Cards */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: FeatherMapPin,
                  title: "City Ranking",
                  value: rankData.city.rank,
                },
                {
                  icon: FeatherMap,
                  title: "Country Ranking",
                  value: rankData.country.rank,
                },
                {
                  icon: FeatherGlobe,
                  title: "Global Ranking",
                  value: rankData.global.rank,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group perspective"
                  onMouseEnter={() => setHoveredCard(item.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`relative preserve-3d transition-all duration-500 ${
                      hoveredCard === item.title ? "rotate-y-6 scale-105" : ""
                    }`}
                  >
                    <div className="flex min-w-[220px] grow flex-col items-center gap-3 rounded-3xl border border-violet-200 bg-gradient-to-b from-[#F4F2FF] to-white px-6 py-8 shadow-md transform transition-all duration-300 hover:shadow-xl">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                          style={{ backgroundColor: colors.accent }}
                        ></div>
                        <IconWithBackground
                          style={{
                            backgroundColor: colors.primary,
                            color: colors.white,
                          }}
                          className="rounded-full text-[20px] transform group-hover:scale-110 transition-transform duration-300"
                          variant="brand"
                          size="large"
                          icon={<item.icon />}
                        />
                      </div>
                      <span className="text-lg font-semibold text-default-font">
                        {item.value !== "-" ? `#${item.value}` : "--"}
                      </span>
                      <span className="text-sm text-subtext-color">
                        {item.title}
                      </span>

                      {/* Animated shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Button */}
            <div className="flex w-full items-center justify-center relative group">
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"
                style={{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.primary})`,
                }}
              ></div>
              <Button
                style={{ backgroundColor: colors.primary }}
                className="
                  w-full max-w-[200px] h-12 rounded-2xl font-semibold
                  transform transition-all duration-300 
                  hover:scale-110 hover:shadow-2xl
                  relative overflow-hidden
                  [&_span]:!text-white
                  [&_svg]:!text-white
                  group
                "
                size="large"
                iconRight={
                  <FeatherArrowRight className="group-hover:translate-x-1 transition-transform" />
                }
                onClick={handleGoToDashboard}
              >
                <span className="relative z-10">Go to Dashboard</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        
        .animate-soft-blink {
          animation: softBlink 2s infinite;
        }
        
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
        
        @keyframes softBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .bg-accent {
          background-color: ${colors.accent};
        }
        
        .text-accent {
          color: ${colors.accent};
        }
      `}</style>
    </div>
  );
}

export default AssessmentResult;

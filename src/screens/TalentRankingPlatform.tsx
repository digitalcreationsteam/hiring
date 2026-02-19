"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "../ui/components/Badge";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { Table } from "../ui/components/Table";
import { FeatherAward } from "@subframe/core";
import { FeatherBookOpen } from "@subframe/core";
import { FeatherBriefcase } from "@subframe/core";
import { FeatherCheckCircle } from "@subframe/core";
import { FeatherCheckSquare } from "@subframe/core";
import { FeatherCode } from "@subframe/core";
import { FeatherCrosshair } from "@subframe/core";
import { FeatherGlobe } from "@subframe/core";
import { FeatherInstagram } from "@subframe/core";
import { FeatherLayers } from "@subframe/core";
import { FeatherLinkedin } from "@subframe/core";
import { FeatherMap } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherMedal } from "@subframe/core";
import { FeatherScale } from "@subframe/core";
import { FeatherSliders } from "@subframe/core";
import { FeatherTarget } from "@subframe/core";
import { FeatherTrophy } from "@subframe/core";
import { FeatherTwitter } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { useNavigate } from "react-router-dom";
import { colors } from "src/common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";

// ============================================
// LOGGER UTILITY - For cleaner console output
// ============================================
const Logger = {
  section: (title: string) =>
    console.log(`\n${"═".repeat(50)}\n📍 ${title}\n${"═".repeat(50)}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`),
  info: (msg: string) => console.log(`ℹ️ ${msg}`),
  warning: (msg: string) => console.warn(`⚠️ ${msg}`),
  event: (msg: string) => console.log(`🔔 ${msg}`),
  render: (msg: string) => console.log(`🎨 ${msg}`),
  debug: (msg: string, data?: any) => console.log(`🐛 ${msg}`, data || ""),
  timer: (label: string) => {
    console.time(`⏱️  ${label}`);
    return () => console.timeEnd(`⏱️  ${label}`);
  },
};

function TalentRankingPlatform() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ============================================
  // LIFECYCLE HOOKS WITH LOGGING
  // ============================================
  useEffect(() => {
    Logger.section("COMPONENT INITIALIZATION");
    Logger.render("TalentRankingPlatform component mounted");
    Logger.info(`Navigation available: ${!!navigate}`);
    Logger.info(`Colors loaded: ${!!colors}`);
    Logger.debug("Initial state", { mousePos });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Uncomment next line for detailed mouse tracking
      // Logger.debug(`Mouse position update`, { x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    Logger.success("Mouse move listener attached");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      Logger.success("Mouse move listener removed");
    };
  }, [navigate]);

  useEffect(() => {
    Logger.render("Component re-rendered");
    Logger.debug("Current mouse position", mousePos);
  }, [mousePos]);

  // ============================================
  // GLASS CARD COMPONENT WITH LOGGING
  // ============================================
  const GlassCard = ({
    children,
    className = "",
    delay = 0,
    cardId = "default",
  }: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    cardId?: string;
  }) => {
    useEffect(() => {
      Logger.render(
        `GlassCard [${cardId}] rendered with animation delay: ${delay}s`,
      );
      return () => {
        Logger.info(`GlassCard [${cardId}] unmounted`);
      };
    }, [delay, cardId]);

    return (
      <div
        className={`relative group transition-all duration-500 ${className}`}
        style={{
          animation: `slideUp 0.8s ease-out ${delay}s both`,
        }}
        onMouseEnter={() =>
          Logger.event(`GlassCard [${cardId}] hover triggered`)
        }
        onMouseLeave={() => Logger.event(`GlassCard [${cardId}] hover ended`)}
      >
        {/* 3D Glass Background Layer */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3) 0%, transparent 80%)`,
            zIndex: -1,
          }}
        />

        {/* Glass Morphism Card */}
        <div
          className="relative rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          {/* Gradient Border Effect */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)`,
              pointerEvents: "none",
            }}
          />

          {/* Inner Content */}
          <div className="relative z-10">{children}</div>
        </div>

        <style>{`
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

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
        `}</style>
      </div>
    );
  };

  // ============================================
  // SECTION RENDER HANDLERS WITH LOGGING
  // ============================================
  const handleCTAClick = () => {
    Logger.section("USER ACTION");
    Logger.event("CTA Button clicked - 'Finish Profile Setup'");
    Logger.info("Navigating to /paywall route");
    Logger.debug("Navigation function called", {
      timestamp: new Date().toISOString(),
    });
    // navigate("/paywall");
    navigate("/upload-resume");
  };

  // Log each major section render
  useEffect(() => {
    Logger.render("Hero section loaded");
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden relative">
        {(Logger.render("Main container rendered"), null)}

        {/* 🎨 Premium 3D Glass Background */}
        <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
          {/* Main Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 50%),
        radial-gradient(circle at 80% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
        linear-gradient(
          135deg,
          #e5e7eb 0%,
          #d9dce1 25%,
          #c4cad1 50%,
          #94a3b8 75%,
          #1e293b 100%
        )
      `,
            }}
          />

          {/* Animated Glass Orbs */}
          <div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)",
              top: "-10%",
              left: "-5%",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)",
              bottom: "-5%",
              right: "10%",
              animation: "float 10s ease-in-out infinite 2s",
            }}
          />
        </div>

        {/* ============ HERO SECTION ============ */}
        {/* ============ HERO SECTION ============ */}
        <div className="flex w-full flex-col items-center px-4 sm:px-6 py-16 sm:py-24 lg:py-32 relative z-10">
          {(Logger.render("Hero section initialized"), null)}

          <div className="flex w-full max-w-3xl lg:max-w-3xl xl:max-w-4xl flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-6 animate-fadeIn">
              <Badge
                className="text-[14px] backdrop-blur-md border border-white/30"
                variant="neutral"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  color: colors.accent,
                }}
              >
                ✨ Standardized Talent Infrastructure
              </Badge>

              <span
                className="font-['Sora']
        text-[28px] sm:text-[36px] md:text-[40px] lg:text-[56px]
        font-[700]
        leading-tight sm:leading-[44px] lg:leading-[64px]
        -tracking-[0.02em] max-w-2xl lg:max-w-3xl"
                style={{ color: colors.accent }}
              >
                Welcome to UniTalent
                <span style={{ color: colors.primary }}>:</span> A New
                Data-Driven Approach To Early-Career Hiring
              </span>

              <div className="flex flex-col items-start gap-6 w-full">
                <GlassCard className="w-full" cardId="hero-paradox">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-3 p-6 md:p-8">
                    <span
                      className="font-['Sora'] text-[18px] font-[600] leading-[24px] -tracking-[0.01em]"
                      style={{ color: colors.accent }}
                    >
                      The Traditional Résumé Paradox
                    </span>

                    <span
                      className="whitespace-pre-wrap font-['Inter'] text-[15px] leading-[22px] text-opacity-90 max-w-2xl"
                      style={{ color: colors.neutral[600] }}
                    >
                      {`High-performing students today often do everything the system asks of them. They maintain strong academic records, participate in competitive programs, build projects, gain practical experience through internships, and prepare rigorously for interviews. Years of consistent effort are invested with the reasonable expectation that this work will translate into opportunity.

In practice, that connection is increasingly weak.

Modern hiring processes frequently (and unfortunately) reward résumé optimisation, keyword alignment, and access to informal networks rather than demonstrated capability. Candidates who are adept at self-presentation or who benefit from the right introductions can advance more quickly, even when their underlying skills are comparable or weaker. As a result, many capable students are not filtered out because they lack ability, but because their effort is difficult to observe or compare at scale.

This is not an isolated issue. Across universities and early-career pipelines, a structural gap has emerged between the work candidates put in and the signals employers are able to rely on. Talent is abundant, but visibility is uneven. Effort is real, but difficult to quantify.

So we built UniTalent to fix this.

Instead of rewarding résumé tricks, we quantify the work you've actually done — your projects, your experience, your consistency, your growth. Every hour you've invested counts for something measurable. And once quantified, your profile is benchmarked against peers in your university, your city, and nationwide.

Recruiters can immediately identify real talent with data, not guesswork.

No shortcuts.
No keyword-hunting.
No inflated résumés.

Just genuine, deserving, hardworking talent rising to the top — exactly where it should be.`}
                    </span>
                  </div>
                </GlassCard>

                <span
                  className="font-['Inter'] text-[18px] font-[400] leading-[28px] -tracking-[0.01em] max-w-2xl"
                  style={{ color: colors.neutral[600] }}
                >
                  UniTalent introduces a standardized ranking framework, through
                  test assesments, designed to address structural
                  inconsistencies in résumé-based evaluation. By shifting from
                  narrative description to measured indicators of capability,
                  the platform provides recruiters with transparent, data-backed
                  methods for identifying qualified candidates while improving
                  visibility for early-career talent.
                </span>
              </div>
            </div>

            <div
              className="flex h-px w-full flex-none flex-col items-center gap-2 my-8"
              style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
            />

            <div className="flex flex-col items-start gap-4 animate-fadeIn w-full">
              <span
                className="font-['Sora'] text-[18px] font-[600] leading-[20px] uppercase -tracking-[0.02em] text-opacity-80"
                style={{ color: colors.accent }}
              >
                Core Principles
              </span>

              <div className="flex flex-col items-start gap-3 w-full max-w-2xl">
                {[
                  "Eliminates subjectivity and keyword optimization in candidate screening",
                  "Provides verifiable, standardized capability metrics",
                  "Supports signal-driven hiring with reduced ambiguity",
                  "Enables fair, merit-based candidate discovery at scale",
                ].map((text, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                    onMouseEnter={() =>
                      Logger.event(`Core principle ${idx + 1} hovered`)
                    }
                  >
                    <FeatherCheckSquare
                      style={{ color: colors.primary }}
                      className="flex-shrink-0 mt-1"
                    />
                    <span
                      className="font-['Inter'] text-[16px] font-[400] leading-[24px] -tracking-[0.01em]"
                      style={{ color: colors.neutral[800] }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ============ HOW IT WORKS SECTION ============ */}
        <div className="flex w-full flex-col items-center px-6 py-24 relative z-10">
          {(Logger.render("How It Works section initialized"), null)}

          <div className="flex w-full max-w-[1280px] flex-col items-start gap-12">
            {/* Heading */}
            <div className="flex flex-col items-start gap-3">
              <span
                className="font-['Sora'] text-[32px] sm:text-[40px] lg:text-[48px]
  font-[700] leading-tight sm:leading-[48px] lg:leading-[56px]
  tracking-tight"
                style={{ color: colors.accent }}
              >
                How UniTalent Works
              </span>

              <span
                className="font-['Inter'] text-[18px] font-[400] leading-[26px]"
                style={{ color: colors.neutral[600] }}
              >
                A structured system that converts candidate data into clear,
                standardized measures of capability
              </span>
            </div>

            {/* Cards */}
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: 1,
                  title: "Profile Creation",
                  desc: "Candidates submit academic background, work experience, certifications, and project involvement through structured data fields.",
                  cardId: "step-profile",
                },
                {
                  num: 2,
                  title: "Score Generation",
                  desc: "The system processes inputs to generate your Experience Index.",
                  cardId: "step-score",
                },
                {
                  num: 3,
                  title: "Skill Assessment",
                  desc: "A role-specific assessment measures current job-ready capability and provides you with the Skill Index.",
                  cardId: "step-skill",
                },
                {
                  num: 4,
                  title: "Recruiter Access",
                  desc: "Your aggregated indexes feed into UniTalent's ranking system, enabling recruiters to efficiently discover high-performing candidates.",
                  cardId: "step-recruiter",
                },
              ].map((item, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} cardId={item.cardId}>
                  <div className="flex grow flex-col items-start gap-4 p-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.accent,
                      }}
                    >
                      {item.num}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <span
                        className="font-['Sora'] text-[20px] font-[600] leading-[24px]"
                        style={{ color: colors.accent }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="font-['Inter'] text-[15px] leading-[22px]"
                        style={{ color: colors.neutral[600] }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* ============ THREE-SCORE ARCHITECTURE SECTION ============ */}
        <div className="flex w-full flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:py-32 relative z-10">
          {
            (Logger.render("Three-Score Architecture section initialized"),
            null)
          }

          <div className="flex w-full max-w-[1280px] flex-col items-start gap-16">
            <div className="flex flex-col items-start gap-4">
              <span
                className="font-['Sora'] text-[32px] sm:text-[40px] lg:text-[48px] font-[700] leading-tight sm:leading-[48px] lg:leading-[56px] -tracking-[0.02em]"
                style={{ color: colors.accent }}
              >
                The Three-Score Architecture
              </span>

              <span
                className="w-full max-w-[768px] font-['Inter'] text-[18px] font-[400] leading-[26px] -tracking-[0.01em]"
                style={{ color: colors.neutral[600] }}
              >
                UniTalent evaluates candidates using two standardized dimensions
                — a Skill Index (from assessments) and an Experience Index (from
                education, work, projects and awards) — which are combined into
                a single Hireability Index
              </span>
            </div>

            <div className="flex w-full flex-col items-start gap-12">
              {/* Experience Index Card */}
              <GlassCard className="w-full" cardId="index-experience">
                <div className="flex w-full flex-col items-start gap-6 p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${colors.primary}15`,
                      }}
                    >
                      <FeatherBriefcase
                        style={{ color: colors.accent, width: 32, height: 32 }}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <span
                        className="font-['Sora'] text-[28px] font-[700] leading-[32px]"
                        style={{ color: colors.accent }}
                      >
                        Experience Index
                      </span>
                      <Badge
                        className="rounded-full text-[12px] backdrop-blur-md border border-white/30"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                          color: colors.accent,
                        }}
                      >
                        Quantifying Your Effort and Visibility
                      </Badge>
                    </div>
                  </div>

                  <div
                    className="flex h-px w-full"
                    style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                  />

                  <span
                    className="font-['Inter'] text-[16px] font-[400] leading-[24px] whitespace-pre-wrap"
                    style={{ color: colors.neutral[600] }}
                  >
                    {
                      "Every project you built, every hackathon you joined, every award you earned — all the effort that deserves recognition. On our platform, every bit counts. Every internship, certification, and late-night project gets quantified because your hard work should matter."
                    }
                  </span>

                  <div
                    className="flex h-px w-full"
                    style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                  />

                  <div className="flex flex-col items-start gap-3 w-full">
                    <span
                      className="font-['Sora'] text-[16px] font-[600] leading-[20px]"
                      style={{ color: colors.accent }}
                    >
                      What Gets Measured
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                      {[
                        {
                          icon: FeatherBookOpen,
                          text: "Education & coursework",
                        },
                        {
                          icon: FeatherBriefcase,
                          text: "Internships & work experience",
                        },
                        {
                          icon: FeatherCode,
                          text: "Projects & technical builds",
                        },
                        {
                          icon: FeatherAward,
                          text: "Certifications & training",
                        },
                        { icon: FeatherTrophy, text: "Awards & competitions" },
                        {
                          icon: FeatherUsers,
                          text: "Leadership & campus involvement",
                        },
                      ].map(({ icon: Icon, text }, idx) => (
                        <div
                          key={text}
                          className="flex items-start gap-3 group cursor-pointer transition-all duration-300 hover:translate-x-1"
                          onMouseEnter={() =>
                            Logger.event(
                              `Experience metric ${idx + 1} hovered: ${text}`,
                            )
                          }
                        >
                          <Icon
                            style={{ color: colors.primary }}
                            className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className="font-['Inter'] text-[15px] font-[400] leading-[20px]"
                            style={{ color: colors.neutral[600] }}
                          >
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Skill Index Card */}
              <GlassCard className="w-full" delay={0.1} cardId="index-skill">
                <div className="flex w-full flex-col items-start gap-6 p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${colors.primary}15`,
                      }}
                    >
                      <FeatherCrosshair
                        style={{ color: colors.accent, width: 32, height: 32 }}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <span
                        className="font-['Sora'] text-[28px] font-[700] leading-[32px]"
                        style={{ color: colors.accent }}
                      >
                        Skill Index
                      </span>
                      <Badge
                        className="rounded-full text-[12px] backdrop-blur-md border border-white/30"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                          color: colors.accent,
                        }}
                      >
                        Job-Ready Capability Assessment
                      </Badge>
                    </div>
                  </div>

                  <div
                    className="flex h-px w-full"
                    style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                  />

                  <span
                    className="whitespace-pre-wrap font-['Inter'] text-[16px] font-[400] leading-[24px]"
                    style={{ color: colors.neutral[600] }}
                  >
                    {
                      "Impressive wording proves nothing about your actual ability. We created the Skill Index — a concise, role-specific assessment that reveals how strong you really are. No buzzwords. No padding. Just a clean, verifiable measure of actual capability."
                    }
                  </span>

                  <div
                    className="flex h-px w-full"
                    style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                  />

                  <div className="flex flex-col items-start gap-3 w-full">
                    <span
                      className="font-['Sora'] text-[16px] font-[600] leading-[20px]"
                      style={{ color: colors.accent }}
                    >
                      How We Measure It
                    </span>

                    <div className="flex flex-col items-start gap-3 w-full">
                      {[
                        {
                          icon: FeatherTarget,
                          text: "A short, targeted assessment built around the core tasks of desired role",
                        },
                        {
                          icon: FeatherCheckCircle,
                          text: "Evaluation based on correctness, clarity of thinking, and applied skill",
                        },
                        {
                          icon: FeatherScale,
                          text: "Standardized scoring to ensure fairness across varied educational backgrounds",
                        },
                      ].map(({ icon: Icon, text }, idx) => (
                        <div
                          key={text}
                          className="flex items-start gap-3 group cursor-pointer transition-all duration-300 hover:translate-x-1"
                          onMouseEnter={() =>
                            Logger.event(
                              `Skill metric ${idx + 1} hovered: ${text}`,
                            )
                          }
                        >
                          <Icon
                            style={{ color: colors.primary }}
                            className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className="font-['Inter'] text-[15px] font-[400] leading-[20px]"
                            style={{ color: colors.neutral[600] }}
                          >
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Hireability Index Card */}
              <GlassCard
                className="w-full"
                delay={0.2}
                cardId="index-hireability"
              >
                <div className="flex w-full flex-col items-start gap-6 p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${colors.primary}15`,
                      }}
                    >
                      <FeatherMedal
                        style={{ color: colors.accent, width: 32, height: 32 }}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <span
                        className="font-['Sora'] text-[28px] font-[700] leading-[32px]"
                        style={{ color: colors.accent }}
                      >
                        Hireability Index
                      </span>
                      <Badge
                        className="rounded-full text-[12px] backdrop-blur-md border border-white/30"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                          color: colors.accent,
                        }}
                      >
                        Unified Talent Benchmark
                      </Badge>
                    </div>
                  </div>

                  <div
                    className="flex h-px w-full"
                    style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                  />

                  <span
                    className="font-['Inter'] text-[16px] font-[400] leading-[24px]"
                    style={{ color: colors.neutral[600] }}
                  >
                    The Hireability Index is your central score — the unified
                    measure that combines your skills and hard-earned experience
                    to show how job-ready you truly are. It determines your rank
                    across universities, cities, states, and nationally —
                    helping recruiters instantly spot the best talent. Your
                    ability finally has a spotlight.
                  </span>

                  <div
                    className="flex h-px w-full"
                    style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                  />

                  <div className="flex flex-col items-start gap-3 w-full">
                    <span
                      className="font-['Sora'] text-[16px] font-[600] leading-[20px]"
                      style={{ color: colors.accent }}
                    >
                      How It's Measured
                    </span>

                    <div className="flex flex-col items-start gap-3 w-full">
                      {[
                        {
                          icon: FeatherLayers,
                          text: "A weighted blend of the Skill Index and Experience Index",
                        },
                        {
                          icon: FeatherSliders,
                          text: "Normalization to remove biases from background and institution",
                        },
                      ].map(({ icon: Icon, text }, idx) => (
                        <div
                          key={text}
                          className="flex items-start gap-3 group cursor-pointer transition-all duration-300 hover:translate-x-1"
                          onMouseEnter={() =>
                            Logger.event(
                              `Hireability metric ${idx + 1} hovered: ${text}`,
                            )
                          }
                        >
                          <Icon
                            style={{ color: colors.primary }}
                            className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className="font-['Inter'] text-[15px] font-[400] leading-[20px]"
                            style={{ color: colors.neutral[600] }}
                          >
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* ============ GLOBAL BENCHMARKING SECTION ============ */}
        <div className="flex w-full flex-col items-center px-6 py-24 relative z-10">
          {(Logger.render("Global Benchmarking section initialized"), null)}

          <div className="flex w-full max-w-[1280px] flex-col items-start gap-12">
            <div className="flex flex-col items-start gap-4">
              <span
                className="font-['Sora'] text-[14px] font-[600] leading-[20px] uppercase -tracking-[0.02em]"
                style={{ color: colors.primary }}
              >
                Global Benchmarking Layer
              </span>

              <span
                className="font-['Sora'] text-[32px] sm:text-[40px] lg:text-[48px] font-[700] leading-tight sm:leading-[48px] lg:leading-[56px]"
                style={{ color: colors.accent }}
              >
                Ranking Methodology
              </span>

              <span
                className="w-full max-w-[768px] font-['Inter'] text-[16px] font-[400] leading-[24px]"
                style={{ color: colors.neutral[600] }}
              >
                Candidates are ranked across multi-layer cohorts within their
                chosen job role. Rankings update automatically when scores
                change, providing recruiters with granular visibility and
                supporting targeted talent discovery.
              </span>
            </div>

            <GlassCard className="w-full" cardId="ranking-methodology">
              <div className="flex flex-col items-start gap-6 p-8">
                <div className="flex flex-col items-start gap-2">
                  <span
                    className="font-['Sora'] text-[22px] font-[600] leading-[28px]"
                    style={{ color: colors.accent }}
                  >
                    Ranking Structure
                  </span>

                  <span
                    className="font-['Inter'] text-[14px] font-[400] leading-[20px]"
                    style={{ color: colors.neutral[600] }}
                  >
                    Candidates are positioned across four hierarchical levels
                    for each job role
                  </span>
                </div>

                <div className="flex w-full flex-col items-start overflow-x-auto">
                  <Table
                    header={
                      <Table.HeaderRow>
                        <Table.HeaderCell>Ranking Level</Table.HeaderCell>
                        <Table.HeaderCell>Cohort Scope</Table.HeaderCell>
                        <Table.HeaderCell>Update Frequency</Table.HeaderCell>
                        <Table.HeaderCell>Recruiter Use Case</Table.HeaderCell>
                      </Table.HeaderRow>
                    }
                  >
                    {[
                      {
                        icon: FeatherGlobe,
                        level: "Global",
                        scope: "All candidates within job role",
                        freq: "Real-time",
                        use: "Top-tier talent identification",
                      },
                      {
                        icon: FeatherMap,
                        level: "State",
                        scope: "Candidates within specific state",
                        freq: "Real-time",
                        use: "Regional hiring strategies",
                      },
                      {
                        icon: FeatherMapPin,
                        level: "City",
                        scope: "Candidates within specific city",
                        freq: "Real-time",
                        use: "Local market recruitment",
                      },
                      {
                        icon: FeatherBookOpen,
                        level: "University",
                        scope: "Candidates within specific university",
                        freq: "Real-time",
                        use: "Campus recruitment programs",
                      },
                    ].map((item) => (
                      <Table.Row
                        key={item.level}
                        onMouseEnter={() =>
                          Logger.event(`Ranking level ${item.level} hovered`)
                        }
                      >
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <item.icon style={{ color: colors.primary }} />
                            <span
                              className="whitespace-nowrap text-body-bold font-body-bold"
                              style={{ color: colors.accent }}
                            >
                              {item.level}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className="whitespace-nowrap text-body font-body"
                            style={{ color: colors.neutral[600] }}
                          >
                            {item.scope}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className="whitespace-nowrap text-body font-body"
                            style={{ color: colors.neutral[600] }}
                          >
                            {item.freq}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className="whitespace-nowrap text-body font-body"
                            style={{ color: colors.neutral[600] }}
                          >
                            {item.use}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table>
                </div>

                <div
                  className="flex h-px w-full"
                  style={{ backgroundColor: "rgba(255,255,255, 0.2)" }}
                />

                <div className="flex flex-col items-start gap-3 w-full">
                  <span
                    className="font-['Sora'] text-[14px] font-[600] leading-[20px]"
                    style={{ color: colors.accent }}
                  >
                    Key Characteristics
                  </span>

                  {[
                    "Rankings update automatically upon score recalculation",
                    "All rankings are role-specific and maintain separate hierarchies per job track",
                    "Recruiters can filter and search across all ranking levels simultaneously",
                  ].map((text, idx) => (
                    <div
                      key={text}
                      className="flex items-start gap-3 cursor-pointer group transition-all duration-300 hover:translate-x-1"
                      onMouseEnter={() =>
                        Logger.event(
                          `Ranking characteristic ${idx + 1} hovered`,
                        )
                      }
                    >
                      <FeatherCheckSquare
                        style={{ color: colors.primary }}
                        className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                      />
                      <span
                        className="font-['Inter'] text-[14px] font-[400] leading-[20px]"
                        style={{ color: colors.neutral[600] }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ============ IMPACT ON HIRING SECTION ============ */}
        <div className="flex w-full flex-col items-center px-6 py-24 relative z-10">
          {(Logger.render("Impact on Hiring section initialized"), null)}

          <div className="flex w-full max-w-[768px] flex-col items-start gap-12">
            <span
              className="font-['Sora'] text-[32px] sm:text-[40px] lg:text-[48px] font-[700] leading-tight sm:leading-[48px] lg:leading-[56px]"
              style={{ color: colors.accent }}
            >
              Impact on Hiring Operations
            </span>

            <GlassCard className="w-full" cardId="impact-hiring">
              <div className="flex flex-col items-start gap-6 p-8">
                {[
                  {
                    title: "Increased Transparency",
                    desc: "Standardized metrics eliminate ambiguity in candidate evaluation",
                  },
                  {
                    title: "Reduced Signal Noise",
                    desc: "Verified capability indicators replace unverifiable résumé claims",
                  },
                  {
                    title: "Accelerated Shortlisting",
                    desc: "National rankings enable rapid candidate identification without manual screening",
                  },
                  {
                    title: "Merit-Based Discovery",
                    desc: "Capability gains visibility regardless of institutional affiliation",
                  },
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-1 cursor-pointer"
                    onMouseEnter={() =>
                      Logger.event(
                        `Impact item ${idx + 1} hovered: ${item.title}`,
                      )
                    }
                  >
                    <div
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <FeatherCheckCircle style={{ color: colors.primary }} />
                    </div>

                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span
                        className="font-['Sora'] text-[16px] font-[600] leading-[24px]"
                        style={{ color: colors.accent }}
                      >
                        {item.title}
                      </span>

                      <span
                        className="font-['Inter'] text-[14px] font-[400] leading-[20px]"
                        style={{ color: colors.neutral[600] }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ============ CTA SECTION ============ */}
        <div className="flex w-full flex-col items-center px-6 py-32 relative z-10">
          {(Logger.render("CTA section initialized"), null)}

          <div className="flex w-full max-w-[768px] flex-col items-center gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <span
                className="font-['Sora'] text-[32px] sm:text-[40px] lg:text-[48px] font-[700] leading-[56px]"
                style={{ color: colors.accent }}
              >
                Generate Your Hireability Index
              </span>

              <span
                className="font-['Inter'] text-[16px] font-[400] leading-[24px]"
                style={{ color: colors.neutral[600] }}
              >
                Be part of a new, merit-first way of showcasing talent
              </span>
            </div>

            {/* Circular Magnetic Button with Rotating Text */}
            <div className="relative w-32 h-32 mx-auto group">
              <button
                onClick={handleCTAClick}
                onMouseEnter={() =>
                  Logger.event(
                    "Circular CTA button hover - magnetic animation triggered",
                  )
                }
                className="magnetic-btn relative w-full h-full rounded-full overflow-hidden focus:outline-none transition-all duration-500"
                style={{
                  backgroundColor: colors.primary,
                  boxShadow: `0 0 40px ${colors.primary}40, 0 0 80px ${colors.primary}20`,
                }}
              >
                {/* Outer rotating ring with text */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{
                    animation: "spin 8s linear infinite",
                  }}
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    className="font-['Sora']"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      fill: "white",
                      letterSpacing: "3px",
                      stroke: "white",
                      strokeWidth: "0.2",
                    }}
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      FINISH • THE • SETUP • FINISH
                    </textPath>
                  </text>
                </svg>

                {/* Center icon and text */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-full group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)`,
                  }}
                >
                  {/* Arrow Icon */}
                  <svg
                    className="w-8 h-8 mb-1 text-white transform group-hover:scale-125 group-hover:rotate-45 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>

                  {/* Ripple effect on hover */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                    style={{ borderColor: "rgba(255,255,255,0.5)" }}
                  />
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"
                  style={{
                    background: `radial-gradient(circle, ${colors.primary}60, transparent)`,
                  }}
                />
              </button>

              {/* Decorative orbiting dots on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    animation: "orbit 3s linear infinite",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    animation: "orbit 3s linear infinite 1.5s",
                  }}
                />
              </div>
            </div>

            {/* Smaller alternative rectangular button below */}
            <Button
              size="large"
              onClick={handleCTAClick}
              className="w-full sm:w-auto px-8 h-12 rounded-full text-[16px] font-semibold transition active:scale-[0.98] shadow-lg hover:shadow-xl backdrop-blur-md relative group overflow-hidden"
              style={{
                backgroundColor: `${colors.primary}15`,
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
              }}
              onMouseEnter={() => Logger.event("Secondary CTA button hover")}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: colors.primary }}
              />
              <span className="relative z-10 font-['Sora']">
                Continue with Profile
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

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

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1) translateY(-20px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .magnetic-btn {
          position: relative;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .magnetic-btn:hover {
          transform: scale(1.08);
        }

        .magnetic-btn:active {
          transform: scale(0.95);
        }

        /* Smooth scrolling behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.4);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </>
  );
}

export default TalentRankingPlatform;

"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/components/Button";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherCheckSquare } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { FeatherFileText } from "@subframe/core";
import { FeatherTrendingUp } from "@subframe/core";

type MaybePromise<T> = T | Promise<T>;

type Props = {
  onBack?: () => void;
  onStart?: () => MaybePromise<void>;
  onSkip?: () => MaybePromise<void>;
  title?: string;
  description?: string;
  duration?: string;
  questionsCount?: number;
  showIndexNote?: string;

  // optional overrides for routing (defaults used if not provided)
  startPath?: string; // default: "/assessment"
  skipPath?: string; // default: "/skill-index"
  backTo?: string | null; // if provided and is a string path, navigate to that; otherwise use history.back()
};

export const SkillAssessmentCard: React.FC<Props> = ({
  onBack,
  onStart,
  onSkip,
  title = "Skill Assessment",
  description = `This 30 minute test checks your core abilities in the domain you selected. Your score builds your Skill Index and helps you see where you stand.`,
  duration = "30 minutes",
  questionsCount = 20,
  showIndexNote = "Counts toward your Skill Index",
  startPath = "/assessment",
  skipPath = "/skill-index",
  backTo = null,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBack = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (onBack) {
      onBack();
      return;
    }

    if (backTo && typeof backTo === "string") {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const handleStart = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // If parent provided onStart, allow it to run. It can be sync or return a Promise.
      if (onStart) {
        // Avoid `instanceof Promise` — normalize with Promise.resolve
        await Promise.resolve(onStart());
      }

      // navigate to assessment page once any pre-start logic completes
      navigate(startPath);
    } catch (err) {
      console.error("Failed to start assessment:", err);
      setLoading(false);
    }
  };

  const handleSkip = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (onSkip) {
        await Promise.resolve(onSkip());
      }

      navigate(skipPath);
    } catch (err) {
      console.error("Failed to skip assessment:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-12">
      <div className="w-full max-w-[380px] rounded-3xl border border-neutral-border bg-white p-8 shadow-lg">
        {/* back button */}
        <div>
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherArrowLeft />}
            onClick={handleBack}
            className="!px-2 !py-1"
          >
            Back
          </Button>
        </div>

        {/* header */}
        <div className="mt-6 flex flex-col items-start gap-4">
          {/* SC2 Icon */}
          <div className="w-10 h-10 rounded-2xl bg-violet-100 flex items-center justify-center">
            <FeatherFileText className="w-4 h-6 text-violet-800" />
          </div>

          <div>
            <h2 className="text-xl text-default-font mb-4">{title}</h2>
            <p className="text-xs text-subtext-color mt-1">{description}</p>
          </div>
        </div>

        {/* divider */}
        <div className="my-6 border-t border-neutral-border" />

        {/* list */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="text-xs">
              <FeatherClock />
            </div>
            <div className="text-xs text-default-font">{duration}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs">
              <FeatherCheckSquare />
            </div>
            <div className="text-xs text-default-font">
              {questionsCount} scenario questions
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs">
              <FeatherTrendingUp />
            </div>
            <div className="text-xs text-default-font">{showIndexNote}</div>
          </div>
        </div>

        {/* divider */}
        <div className="my-6 border-t border-neutral-border" />

        {/* actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleStart}
            disabled={loading}
            aria-disabled={loading}
            className={`h-9 rounded-full text-white transition-all duration-200 ${
              loading
                ? "opacity-60 cursor-wait"
                : "bg-gradient-to-r from-violet-600 to-violet-600 hover:from-violet-500 hover:to-violet-500 hover:shadow-md"
            }`}
          >
            {loading ? "Starting…" : "Start assessment"}
          </button>

          <Button
            variant="neutral-tertiary"
            size="small"
            onClick={handleSkip}
            disabled={loading}
            className={`h-9 rounded-2xl bg-gray-100 border border-transparent transition-all duration-200
              hover:bg-gray-200 hover:border-gray-300`}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentCard;

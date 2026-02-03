"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import {
  FeatherArrowLeft,
  FeatherAward,
  FeatherTarget,
  FeatherCheck,
} from "@subframe/core";

function HowItWorks() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="w-full max-w-xl flex flex-col items-center gap-4 rounded-2xl border border-neutral-border bg-white px-7 py-8 shadow-[0_6px_20px_rgba(15,15,15,0.05)]">
        {/* Top: back arrow + progress */}
        <div className="flex w-full items-center gap-3">
          <IconButton
            size="small"
            icon={<FeatherArrowLeft />}
            className="!bg-transparent !text-neutral-600"
          />

          {/* Progress Bar — Smaller + Centered */}
          <div className="flex grow items-center justify-center">
            <div className="flex w-full max-w-[460px] items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-purple-300" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              <div className="h-1 flex-1 rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-1 px-1 text-left w-full">
          <h2 className="text-xl text-neutral-900">How the platform works</h2>
          <p className="text-xs text-neutral-500">
            Your profile is built on clear signals that show what you can do
          </p>
        </div>

        {/* Feature Cards — FIXED WIDTH, PADDING, RADIUS */}
        <div className="flex w-full items-start gap-4 px-1">
          <div className="flex flex-1 flex-col gap-3 rounded-3xl border border-neutral-border bg-white px-4 py-4">
            <IconWithBackground
              size="large"
              icon={<FeatherAward className="w-4 h-4 text-purple-800" />}
              className="!bg-purple-50 !rounded-full !p-2"
            />
            <span className="text-sm text-align text-neutral-900">
              Your background, scored with structure
            </span>
            <p className="text-xs text-align text-neutral-500">
              Education, roles, projects, awards, and certifications
            </p>
            <button className="text-sm font-medium text-left text-purple-600">
              Learn more
            </button>
          </div>

          {/* Middle Card */}
          <div className="flex flex-1 flex-col gap-3 rounded-3xl border border-neutral-border bg-white px-4 py-4">
            <IconWithBackground
              size="large"
              icon={<FeatherCheck className="w-4 h-4 text-green-900" />}
              className="!bg-green-100 !rounded-full !p-3"
            />

            <span className="text-sm text-align text-neutral-900">
              Your current ability, measured through a test
            </span>
            <p className="text-xs text-align text-neutral-500">
              A short assessment built around your chosen skills
            </p>
            <button className="text-sm font-medium text-left text-purple-600">
              Learn more
            </button>
          </div>

          {/* Right Card */}
          <div className="flex flex-1 flex-col justify-between gap-3 rounded-3xl border border-neutral-border bg-white px-4 py-4">

            <IconWithBackground
              size="large"
              icon={<FeatherTarget className="w-4 h-4 text-purple-800" />}
              className="!bg-purple-50 !rounded-full !p-2"
            />
            <span className="text-sm text-align text-neutral-900">
              Your combined score
            </span>
            <p className="text-xs gap-4 h-18 text-align text-neutral-400">
              See where you stand in your school, city, state, and country
            </p>
            <button className="text-sm gap-3 font-medium text-left text-purple-600">
              Learn more
            </button>
          </div>
        </div>

        {/* Bottom Button — FIXED WIDTH & CENTERED */}
        <div className="flex w-full justify-center border-t border-neutral-border pt-5">
          <Button className="h-10 w-full max-w-[500px] rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-md">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;

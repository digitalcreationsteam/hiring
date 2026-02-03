"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherBuilding } from "@subframe/core";
import { FeatherGlobe } from "@subframe/core";
import { FeatherGraduationCap } from "@subframe/core";
import { FeatherMap } from "@subframe/core";

function HireabilityIndex() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-50 px-6 py-6">
      <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-center justify-center gap-6 rounded-lg border border-solid border-neutral-border bg-default-background px-8 py-8 shadow-lg">
        <div className="flex w-full items-center justify-center gap-4">
          <IconButton
            size="small"
            icon={<FeatherArrowLeft />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          />
          <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-300" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start">
          <span className="text-heading-2 font-heading-2 text-default-font">
            Hireability Index
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-body font-body text-default-font">
            Your Hireability Index brings your skills and experience into one
            number.
          </span>
          <span className="text-body font-body text-default-font">
            You will see how you compare with others in your school, city,
            state, and country.
          </span>
          <span className="text-body font-body text-default-font">
            Recruiters use this to spot candidates who are ready for the role.
          </span>
        </div>
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-12 py-8">
            <span className="font-['Nunito_Sans'] text-[48px] font-[500] leading-[56px] text-neutral-400">
              345
            </span>
            <span className="text-caption font-caption text-subtext-color text-center">
              Your score will appear in the dashboard
            </span>
          </div>
          <div className="flex w-full items-center gap-3">
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
              <IconWithBackground
                size="small"
                icon={<FeatherGraduationCap />}
              />
              <span className="text-caption-bold font-caption-bold text-default-font">
                University
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
              <IconWithBackground size="small" icon={<FeatherBuilding />} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                City
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
              <IconWithBackground size="small" icon={<FeatherMap />} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                State
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
              <IconWithBackground size="small" icon={<FeatherGlobe />} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                Country
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-t border-solid border-neutral-border pt-4">
          <Button
            className="h-8 grow shrink-0 basis-0"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HireabilityIndex;
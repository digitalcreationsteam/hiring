"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherAward } from "@subframe/core";
import { FeatherBriefcase } from "@subframe/core";
import { FeatherFileCheck } from "@subframe/core";
import { FeatherGraduationCap } from "@subframe/core";
import { FeatherPackage } from "@subframe/core";

function ExperienceIndex() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-50 px-6 py-6">
      <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-start gap-6 rounded-lg border border-solid border-neutral-border bg-default-background px-8 py-8 shadow-lg">
        <div className="flex w-full items-center justify-center gap-4">
          <IconButton
            size="small"
            icon={<FeatherArrowLeft />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          />
          <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-300" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start">
          <span className="text-heading-2 font-heading-2 text-default-font">
            Experience Index
          </span>
        </div>
        <div className="flex w-full items-start gap-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
            <span className="text-body font-body text-default-font">
              Your Experience Index collects the key parts of your background
              and turns them into a clear score.
            </span>
            <span className="text-body font-body text-default-font">
              Every detail adds points.
            </span>
            <span className="text-body font-body text-default-font">
              This gives recruiters a quick and honest view of the depth of your
              past work and achievements.
            </span>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-3">
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground
                size="small"
                icon={<FeatherGraduationCap />}
              />
              <span className="text-body-bold font-body-bold text-default-font">
                Education
              </span>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground size="small" icon={<FeatherBriefcase />} />
              <span className="text-body-bold font-body-bold text-default-font">
                Work
              </span>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground size="small" icon={<FeatherPackage />} />
              <span className="text-body-bold font-body-bold text-default-font">
                Projects
              </span>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground size="small" icon={<FeatherAward />} />
              <span className="text-body-bold font-body-bold text-default-font">
                Awards
              </span>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground size="small" icon={<FeatherFileCheck />} />
              <span className="text-body-bold font-body-bold text-default-font">
                Certifications
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-t border-solid border-neutral-border pt-4">
          <Button
            className="h-8 grow shrink-0 basis-0"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceIndex;
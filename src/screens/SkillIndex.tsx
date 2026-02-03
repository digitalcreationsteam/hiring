"use client";

import React from "react";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { FeatherArrowLeft } from "@subframe/core";
import { FeatherCheckCircle } from "@subframe/core";
import { FeatherMessageSquare } from "@subframe/core";
import { FeatherTarget } from "@subframe/core";

function SkillIndex() {
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
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-primary" />
              <div className="flex h-1 grow shrink-0 basis-0 items-start rounded-full bg-brand-300" />
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
            Skill Index
          </span>
        </div>
        <div className="flex w-full items-start gap-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
            <span className="text-body font-body text-default-font">
              The Skill Index reflects your real ability today.
            </span>
            <span className="text-body font-body text-default-font">
              You will take a short assessment based on the skills you select.
            </span>
            <span className="text-body font-body text-default-font">
              Your answers help recruiters see your strength with clarity, not
              guesswork.
            </span>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-3">
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground
                size="small"
                icon={<FeatherMessageSquare />}
              />
              <span className="text-body-bold font-body-bold text-default-font">
                Scenario questions
              </span>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground size="small" icon={<FeatherTarget />} />
              <span className="text-body-bold font-body-bold text-default-font">
                Role aligned
              </span>
            </div>
            <div className="flex w-full items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3">
              <IconWithBackground size="small" icon={<FeatherCheckCircle />} />
              <span className="text-body-bold font-body-bold text-default-font">
                Based on your skills
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

export default SkillIndex;
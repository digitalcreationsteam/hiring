"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { FeatherArrowLeft, FeatherChevronDown } from "@subframe/core";
import { useNavigate } from "react-router-dom";
import * as SubframeCore from "@subframe/core";
import API, { URL_PATH } from "src/common/API";



const notify = (msg: string) => {
  console.warn(msg);
};

function JobDomain() {


  const navigate = useNavigate();

  const userId = React.useMemo(() => localStorage.getItem("userId"), []);

  const [domain, setDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const domains = [
    "Product Management",
    "Design",
    "Data Analytics",
    "Marketing",
    "Software Engineering",
    "Human Resources",
    "Sales",
    "Finance",
    "Operations",
    "Customer Support",
    "Content Writing",
    "Quality Assurance",
    "Business Analysis",
    "Digital Marketing",
    "UI/UX Design",
    "Project Management",
    "Data Science",
    "Machine Learning",
    "AI Research",
    "Legal",
    "Administration",
    "Healthcare",
    "Education",
    "Supply Chain",
    "Hospitality",
    "Other",
  ];

  ///POST API ////
  const handleContinue = async () => {
  if (!domain) {
    notify("Please select a job domain.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    notify("Session expired. Please login again.");
    navigate("/login");
    return;
  }

  try {
    setIsSubmitting(true);

    await API(
      "POST",
      URL_PATH.jobDomain,
      { name:domain }, 
      {
        Authorization: `Bearer ${token}`, 
      }
    );
    localStorage.setItem("jobDomain", domain);


    navigate("/skills");
  } catch (err: any) {
    console.error(err);
    notify(
      err?.response?.data?.message ||
      "Failed to save job domain"
    );
  } finally {
    setIsSubmitting(false);
  }
};


useEffect(() => {
  const saved = localStorage.getItem("jobDomain");

  if (saved) {
    setDomain(saved);
  }

  setIsLoading(false);
}, []);

  

  return (
    <div className="min-h-screen bg-neutral-50 px-8 py-10 flex items-center justify-center">
      <div className="flex max-w-[660px] w-full mx-auto">
        <div className="flex w-full flex-col gap-8 rounded-3xl border border-neutral-border bg-white px-10 py-8 shadow-lg">
          {/* Header */}
          <div className="flex w-full items-center gap-4">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={() => navigate(-1)}
            />

            {/* Progress */}
            <div className="flex flex-1 gap-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full bg-violet-700"
                />
              ))}
              <div className="h-1 flex-1 rounded-full bg-violet-300" />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <h2 className="text-[24px] text-neutral-900">
              Choose your job domain
            </h2>
            <p className="text-xs text-neutral-500">
              Your domain and skills will decide your assessment and rankings
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-900">
                Job Domain <span className="text-red-500">*</span>
              </label>

              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild>
                  <div className=" flex w-full h-10 items-center justify-between rounded-3xl border border-neutral-200 bg-neutral-50 px-4 cursor-pointer shadow-sm hover:shadow-md transitio ">
                    <span
                      className={`text-sm truncate ${
                        domain ? "text-neutral-900" : "text-neutral-400"
                      }`}
                    >
                      {domain || "Select your domain"}
                    </span>

                    <FeatherChevronDown className="text-neutral-600 shrink-0" />
                  </div>
                </SubframeCore.DropdownMenu.Trigger>

                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    sideOffset={6}
                    align="start"
                    side="bottom"
                    collisionPadding={18}
                    asChild
                  >
                    <div
                      className="
      bg-white
      rounded-2xl
      shadow-lg
      py-2
      w-full
      max-h-[260px]
      overflow-y-auto
      animate-fade-out
    "
                    >
                      {domains.map((item) => (
                        <div
                          key={item}
                          onClick={() => setDomain(item)}
                          className={`px-4 py-2 cursor-pointer text-sm rounded-lg hover:bg-violet-50 ${
                            domain === item ? "bg-violet-100 font-semibold" : ""
                          } transition`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </div>
          </div>

          {/* Footer */}
          <div className="flex w-full border-t border-neutral-200 pt-6">
            <Button
              className={`h-9 w-full rounded-2xl text-sm font-medium text-white transition
    ${
      isSubmitting
        ? "bg-violet-300 cursor-not-allowed"
        : "bg-violet-600 hover:bg-violet-700"
    }`}
              onClick={handleContinue}
              disabled={!domain || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDomain;

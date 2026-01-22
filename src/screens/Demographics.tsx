// components/Demographics.tsx
// ✅ TYPESCRIPT VERSION (All errors fixed)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { IconWithBackground } from "../ui/components/IconWithBackground";
import { Switch } from "../ui/components/Switch";
import { TextField } from "../ui/components/TextField";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { setNavigation } from "src/store/slices/onboardingSlice";
import {
  FeatherArrowLeft,
  FeatherUser,
  FeatherGraduationCap,
  FeatherBriefcase,
  FeatherFileCheck,
  FeatherAward,
  FeatherPackage,
} from "@subframe/core";
import API, { URL_PATH } from "src/common/API";

interface DemographicsData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  city: string;
  state: string;
  country: string;
  phoneVisibleToRecruiters?: boolean;
}

interface ApiError {
  message?: string;
  success?: boolean;
}

interface StepItem {
  label: string;
  icon: React.ReactNode;
}

export default function Demographics() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* ============================================
     REDUX STATE
  ============================================ */
  const currentStep = useAppSelector(
    (state) => state.onboarding.navigation.currentStep
  );
  const nextRoute = useAppSelector(
    (state) => state.onboarding.navigation.nextRoute
  );

  /* ============================================
     GUARD: Redirect if not on demographics step
  ============================================ */
  useEffect(() => {
    if (currentStep && currentStep !== "demographics") {
      console.warn("User tried to access demographics but on", currentStep);
      navigate(nextRoute || "/demographics");
    }
  }, [currentStep, nextRoute, navigate]);

  /* ============================================
     LOCAL STATE
  ============================================ */
  const [phoneVisible, setPhoneVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [experienceIndex, setExperienceIndex] = useState<number | null>(null);

  const [form, setForm] = useState<DemographicsData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
  });

  /* ============================================
     VALIDATION HELPERS
  ============================================ */
  const normalizeText = (value: string): string => {
    return value
      .replace(/\s+/g, " ")
      .trimStart()
      .split(" ")
      .map((word: string) =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
      )
      .join(" ");
  };

  const validateForm = (): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s]{10,15}$/;
    const textRegex = /^[A-Za-z\s.'-]{2,}$/;

    if (!textRegex.test(form.fullName.trim())) {
      return "Please enter a valid full name.";
    }

    if (!emailRegex.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }

    // ✅ FIX: Check if phoneNumber exists AND is not empty before testing regex
    const phoneValue = form.phoneNumber ? form.phoneNumber.trim() : "";
    if (phoneValue && !phoneRegex.test(phoneValue)) {
      return "Please enter a valid phone number (10–15 digits).";
    }

    if (!textRegex.test(form.city.trim())) {
      return "Please enter a valid city.";
    }

    if (!textRegex.test(form.state.trim())) {
      return "Please enter a valid state.";
    }

    if (!textRegex.test(form.country.trim())) {
      return "Please enter a valid country.";
    }

    return null;
  };

  /* ============================================
     FORM HANDLERS
  ============================================ */
  const handleInputChange = (key: keyof DemographicsData, value: string): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleContinue = async (): Promise<void> => {
    // Validate
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    const payload = {
      fullName: normalizeText(form.fullName),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber ? form.phoneNumber.trim() : null,
      city: normalizeText(form.city),
      state: normalizeText(form.state),
      country: normalizeText(form.country),
      phoneVisibleToRecruiters: phoneVisible,
    };

    try {
      // ✅ Step 1: Save demographics to backend
      const saveResponse = await API("POST", URL_PATH.demographics, payload);

      if (!saveResponse?.data) {
        setError(saveResponse?.message || "Failed to save demographics");
        setIsSubmitting(false);
        return;
      }

      // ✅ Step 2: Get updated navigation status
      const statusResponse = await API("GET", URL_PATH.getUserStatus);

      if (!statusResponse?.success) {
        setError("Failed to get next step");
        setIsSubmitting(false);
        return;
      }

      // ✅ Step 3: Update Redux with new navigation
      dispatch(
        setNavigation({
          nextRoute: statusResponse.navigation.nextRoute,
          currentStep: statusResponse.navigation.currentStep,
          completedSteps: statusResponse.navigation.completedSteps,
          isOnboardingComplete: statusResponse.navigation.isOnboardingComplete,
          hasPayment: statusResponse.navigation.hasPayment,
        })
      );

      // ✅ Step 4: Navigate to next step
      navigate(statusResponse.navigation.nextRoute);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      console.error("❌ Error saving demographics:", err);
      setError(apiError?.message || "Failed to submit demographics");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================================
     DATA FETCHING
  ============================================ */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Fetch existing demographics
        const demographicsRes = await API("GET", URL_PATH.getDemographics);

        if (demographicsRes?.fullName) {
          setForm({
            fullName: demographicsRes.fullName,
            email: demographicsRes.email || "",
            phoneNumber: demographicsRes.phoneNumber || "",
            city: demographicsRes.city || "",
            state: demographicsRes.state || "",
            country: demographicsRes.country || "",
          });

          setPhoneVisible(!!demographicsRes.phoneVisibleToRecruiters);
        }

        // Fetch experience index
        const expRes = await API("GET", URL_PATH.calculateExperienceIndex);
        setExperienceIndex(expRes?.points?.demographics || 0);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ============================================
     RENDER
  ============================================ */
  const fieldClass =
    "w-full [&>label]:text-[8px] [&>label]:font-small [&>div]:rounded-full [&>div]:border [&>div]:border-neutral-300 [&>div]:h-8 focus:border-black";

  const inputClass =
    "w-full h-7 rounded-full px-2 text-[12px] leading-none bg-transparent focus:bg-transparent focus:outline-none focus:ring-0";

  const steps: StepItem[] = [
    { label: "Education", icon: <FeatherGraduationCap key="edu" /> },
    { label: "Experience", icon: <FeatherBriefcase key="exp" /> },
    { label: "Certifications", icon: <FeatherFileCheck key="cert" /> },
    { label: "Awards", icon: <FeatherAward key="award" /> },
    { label: "Projects", icon: <FeatherPackage key="proj" /> },
  ];

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-50 via-white to-neutral-50 px-4 sm:px-6 py-10 sm:py-22">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
        {/* LEFT CARD */}
        <main className="w-full md:max-w-[480px] bg-white rounded-3xl border border-neutral-300 px-4 sm:px-6 md:px-8 py-6 shadow-[0_10px_30px_rgba(40,0,60,0.06)]">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <IconButton
              size="small"
              icon={<FeatherArrowLeft />}
              onClick={() => navigate(-1)}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[5px] rounded-full bg-violet-700" />
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[5px] rounded-full bg-neutral-300"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-[22px] text-neutral-900 font-semibold">
              Let's Calculate Your Experience Index
            </h2>
            <p className="text-xs text-neutral-500 mt-2">
              This information helps us create rankings and connect you with
              relevant recruiters
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 mb-6">
            <TextField label="Name *" className={fieldClass}>
              <TextField.Input
                value={form.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Smith"
                className={inputClass}
              />
            </TextField>

            <TextField
              label="Email *"
              helpText="Used for account access and recruiter outreach"
              className={fieldClass}
            >
              <TextField.Input
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </TextField>

            <TextField
              label="Phone Number"
              helpText="Optional for recruiter contact"
              className={fieldClass}
            >
              <TextField.Input
                value={form.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="+1 (555) 123-4567"
                className={inputClass}
              />
            </TextField>

            <div className="flex items-center gap-3">
              <Switch
                checked={phoneVisible}
                onCheckedChange={setPhoneVisible}
                className="h-5 w-9 data-[state=checked]:bg-violet-700 data-[state=unchecked]:bg-neutral-300"
              />
              <span className="text-sm text-neutral-700">
                Make phone number visible to recruiters
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField label="City *" className={fieldClass}>
                <TextField.Input
                  value={form.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="San Francisco"
                  className={inputClass}
                />
              </TextField>

              <TextField label="State *" className={fieldClass}>
                <TextField.Input
                  value={form.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="California"
                  className={inputClass}
                />
              </TextField>
            </div>

            <TextField label="Country *" className={fieldClass}>
              <TextField.Input
                value={form.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="United States"
                className={inputClass}
              />
            </TextField>
          </div>

          <div className="w-full h-px bg-neutral-200 my-5" />

          {/* Error Message */}
          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleContinue}
            disabled={isSubmitting || isLoading}
            className={`w-full h-10 rounded-full font-semibold text-white transition ${
              isSubmitting || isLoading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-violet-700 hover:bg-violet-800 shadow-lg"
            }`}
          >
            {isLoading ? "Loading..." : isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </main>

        {/* RIGHT PANEL */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="md:sticky md:top-6 bg-white rounded-[20px] px-6 py-6 shadow-lg border border-neutral-300">
            <h3 className="text-[20px] font-semibold text-neutral-900">
              Your Experience Index
            </h3>

            <div className="flex items-center justify-center py-8">
              <span className="text-[48px] font-medium text-neutral-300">
                {experienceIndex ?? 0}
              </span>
            </div>

            <div className="h-px bg-neutral-300 mb-4" />

            <div className="text-[16px] font-semibold text-neutral-800 mb-3">
              Progress Steps
            </div>

            {/* Current Step */}
            <button className="w-full flex items-center gap-3 rounded-2xl border border-violet-300 bg-violet-100 px-4 py-2 mb-3">
              <IconWithBackground size="small" icon={<FeatherUser />} />
              <span className="text-sm font-medium text-neutral-900">
                Demographics
              </span>
            </button>

            {/* Other Steps */}
            {steps.map((step) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-2xl border border-neutral-300 px-4 py-2 mb-3"
              >
                <IconWithBackground size="small" variant="neutral" icon={step.icon} />
                <span className="text-sm text-neutral-500">{step.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store/hooks";
import { setNavigation } from "src/store/slices/onboardingSlice";
import { Button } from "../ui/components/Button";
import { FeatherCheck, FeatherStar } from "@subframe/core";
import API, { URL_PATH } from "src/common/API";

// Type definitions
interface SubscriptionPlan {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: string;
  features: string[];
  maxAssessments: number;
  maxCandidates: number;
  skillIndexAccess: boolean;
  advancedAnalytics: boolean;
  prioritySupport: boolean;
  trialPeriod: number;
  isActive: boolean;
}

interface ApiError {
  success?: boolean;
  message?: string;
  status?: number;
}

function Paywall() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async (): Promise<void> => {
      try {
        setIsLoadingPlans(true);
        setError("");
        console.log("📋 Fetching subscription plans...");

        const response = await API("GET", URL_PATH.getPlans);

        if (response?.success && Array.isArray(response.data)) {
          const plansData = response.data.filter((plan: any) => plan.isActive);
          console.log("✅ Plans fetched:", plansData);

          setPlans(plansData);

          // Auto-select first plan
          if (plansData.length > 0) {
            setSelectedPlanId(plansData[0]._id);
          }
        } else {
          setError("Failed to load subscription plans");
          console.error("❌ Invalid response format:", response);
        }
      } catch (err: any) {
        console.error("❌ Error fetching plans:", err);
        setError(err?.message || "Failed to load subscription plans");
      } finally {
        setIsLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // Get selected plan details
  const getSelectedPlan = (): SubscriptionPlan | undefined => {
    return plans.find((plan) => plan._id === selectedPlanId);
  };

  const handleContinue = async (): Promise<void> => {
    // Validate
    if (!selectedPlanId) {
      setError("Please select a plan");
      return;
    }

    setError("");
    setIsLoading(true);

    const selectedPlan = getSelectedPlan();

    if (!selectedPlan) {
      setError("Selected plan not found");
      setIsLoading(false);
      return;
    }

    try {
      console.log("🚀 Creating subscription for plan:", selectedPlan.name);

      // Step 1: Create subscription
      const subscriptionResponse = await API(
        "POST",
        URL_PATH.createSubscription,
        {
          planId: selectedPlanId,
          paymentMethod: "razorpay",
        },
      );

      console.log("📦 Subscription response:", subscriptionResponse);

      if (!subscriptionResponse?.success) {
        setError(
          subscriptionResponse?.message || "Failed to create subscription",
        );
        setIsLoading(false);
        return;
      }

      // ✅ Step 2: Get updated navigation status (after subscription created)
      const statusResponse = await API("GET", URL_PATH.getUserStatus);

      if (!statusResponse?.success) {
        setError("Failed to get next step");
        setIsLoading(false);
        return;
      }

      console.log("📊 Updated navigation:", statusResponse.navigation);

      // ✅ Step 3: Update Redux with new navigation
      dispatch(
        setNavigation({
          nextRoute: statusResponse.navigation.nextRoute,
          currentStep: statusResponse.navigation.currentStep,
          completedSteps: statusResponse.navigation.completedSteps,
          isOnboardingComplete: statusResponse.navigation.isOnboardingComplete,
          hasPayment: true,
        }),
      );

      // ✅ Step 4: Navigate to next step (skips intro screens automatically)
      console.log(
        "✅ Subscription complete - navigating to:",
        statusResponse.navigation.nextRoute,
      );
      // navigate(statusResponse.navigation.nextRoute);
      if (
        subscriptionResponse?.message === "Subscription created successfully"
      ) {
        navigate("/assessment");
      } else {
        navigate(statusResponse.navigation.nextRoute);
      }
    } catch (err: any) {
      console.error("❌ Error processing subscription:", err);
      setError(err?.message || "Failed to process subscription");
    } finally {
      setIsLoading(false);
    }
  };

  // Format price display
  const formatPrice = (plan: SubscriptionPlan | undefined): string => {
    if (!plan) return "";

    if (plan.price === 0) return "Free";

    const price =
      plan.currency === "INR" ? plan.price : Math.round(plan.price * 83); // Convert USD to INR approx

    const period = plan.billingPeriod === "yearly" ? "year" : "month";
    return `₹${price}/${period}`;
  };

  // Check if plan is popular
  const isPopularPlan = (plan: SubscriptionPlan): boolean => {
    return plan?.name?.toLowerCase() === "premium";
  };

  // Get plan features (handle array format)
  const getPlanFeatures = (plan: SubscriptionPlan): string[] => {
    if (!plan?.features || !Array.isArray(plan.features)) {
      return ["No features listed"];
    }
    return plan.features.map((feature: any) => {
      if (typeof feature === "string") return feature;
      if (typeof feature === "object" && feature.name) return feature.name;
      return "Feature";
    });
  };

  if (isLoadingPlans) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-50 px-4 sm:px-6 md:px-8 py-10">
      <div className="w-full max-w-[760px] flex flex-col items-center gap-8 sm:gap-10">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Pick your plan
          </h1>
          <p className="text-sm text-gray-500 max-w-md">
            Choose how you want to use the platform. You can switch later.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {plans.length > 0 ? (
            plans.map((plan: SubscriptionPlan) => (
              <div
                key={plan._id}
                onClick={() => {
                  console.log("📌 Selected plan:", plan.name, plan._id);
                  setSelectedPlanId(plan._id);
                }}
                className={`cursor-pointer w-full max-w-[320px] rounded-3xl p-6 flex flex-col gap-6 shadow-sm border-2 transition-all duration-200 ${
                  selectedPlanId === plan._id
                    ? "border-violet-600 ring-2 ring-violet-200 bg-white transform scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-md"
                }`}
              >
                {/* Plan Header */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {plan.description}
                      </p>
                    </div>
                    {isPopularPlan(plan) && (
                      <div className="flex items-center gap-1 bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full">
                        <FeatherStar className="w-3 h-3" />
                        <span>Popular</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <p className="text-2xl font-bold text-gray-900 mt-4">
                    {formatPrice(plan)}
                  </p>

                  {/* Trial period */}
                  {plan.trialPeriod > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      {plan.trialPeriod}-day free trial
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-col gap-3">
                  {getPlanFeatures(plan).map(
                    (feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            selectedPlanId === plan._id
                              ? "bg-violet-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <FeatherCheck
                            className={`w-3 h-3 ${
                              selectedPlanId === plan._id
                                ? "text-violet-600"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                        <span className="text-sm text-gray-800">{feature}</span>
                      </div>
                    ),
                  )}
                </div>

                {/* Limits */}
                <div className="pt-4 border-t border-gray-100">
                  {plan.maxAssessments > 0 && (
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">{plan.maxAssessments}</span>{" "}
                      assessments/month
                    </p>
                  )}
                  {plan.maxCandidates > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">{plan.maxCandidates}</span>{" "}
                      candidates
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No plans available</p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-[820px] p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Continue Button */}
        <Button
          disabled={isLoading || !selectedPlanId}
          onClick={handleContinue}
          className={`w-full max-w-[820px] h-12 rounded-full font-semibold text-base transition ${
            isLoading
              ? "bg-violet-400 cursor-not-allowed text-white"
              : selectedPlanId
                ? "bg-violet-600 hover:bg-violet-700 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </div>
          ) : selectedPlanId ? (
            getSelectedPlan()?.price === 0 ? (
              "Continue with Free Plan"
            ) : (
              `Subscribe to ${getSelectedPlan()?.name}`
            )
          ) : (
            "Select a Plan to Continue"
          )}
        </Button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-800 transition"
        >
          ← Go back
        </button>
      </div>
    </div>
  );
}

export default Paywall;

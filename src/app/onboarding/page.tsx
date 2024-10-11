"use client";

import React from "react";
import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";
import ProgressBar from "./ProgressBar";
import PhoneNumberStep from "./PhoneNumberStep";
import PhoneVerificationStep from "./PhoneVerificationStep";
import ProfileStep from "./ProfileStep";

const OnboardingSteps = () => {
  const { step } = useOnboarding();

  switch (step) {
    case 0:
      return <PhoneNumberStep />;
    case 1:
      return <PhoneVerificationStep />;
    case 2:
      return <ProfileStep />;
    default:
      return <PhoneNumberStep />;
  }
};

const OnboardingContent = () => {
  const { percentageComplete } = useOnboarding();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="w-full px-2 mt-6">
        <div className="flex flex-col justify-between w-full items-center mb-6">
          <ProgressBar percentage={percentageComplete} />
        </div>
        <OnboardingSteps />
      </div>
    </div>
  );
};

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}

"use client";

import React from "react";
import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";
import Step1 from "./Step1";
import Step2 from "./Step2";
import ProgressBar from "./ProgressBar";

const OnboardingSteps = () => {
  const { step } = useOnboarding();

  switch (step) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    default:
      return <Step1 />;
  }
};

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <div className="bg-white min-h-screen flex flex-col items-center">
        <div className="w-full px-2 mt-6">
          <div className="flex flex-col justify-between w-full items-center mb-6">
            <ProgressBar percentage={75} />
          </div>
          <OnboardingSteps />
        </div>
      </div>
    </OnboardingProvider>
  );
}

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
    // Add more steps as needed
    default:
      return <Step1 />;
  }
};

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <div className="bg-white min-h-screen flex flex-col items-center">
        <div className="w-full px-12 mt-6">
          <div className="flex flex-col justify-between w-full items-center mb-6">
            <ProgressBar percentage={75} />
            <h1 className="text-textPrimary text-2xl font-bold">Onboarding</h1>
          </div>
          <OnboardingSteps />
        </div>
      </div>
    </OnboardingProvider>
  );
}

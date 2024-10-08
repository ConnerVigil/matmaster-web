import React from "react";
import { useOnboarding } from "./OnboardingProvider";
import StepButtons from "./StepButtons";

function DigitThing() {
  return (
    <div className="w-16 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-16 p-2 bg-white rounded-lg shadow border border-[#cfd4dc] justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 text-center text-[#cfd4dc] text-5xl font-medium font-['Work Sans'] leading-[60px]">
          0
        </div>
      </div>
    </div>
  );
}

const Step2 = () => {
  const { nextStep, prevStep } = useOnboarding();

  const handleNext = () => {
    // Validate profile setup
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-textPrimary text-xl font-bold mb-2">Verification</h1>
      <p className="text-textSecondary mb-6">
        You have received an sms message with a verification code.
      </p>
      <div className="flex justify-center items-center py-6 gap-1.5">
        <DigitThing />
        <DigitThing />
        <DigitThing />
        <DigitThing />
      </div>
      <StepButtons nextStep={handleNext} prevStep={prevStep} />
    </div>
  );
};

export default Step2;

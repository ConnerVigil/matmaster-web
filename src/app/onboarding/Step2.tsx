import React from "react";
import { useOnboarding } from "./OnboardingProvider";

const Step2 = () => {
  const { nextStep, prevStep } = useOnboarding();

  const handleNext = () => {
    // Validate profile setup
    nextStep();
  };

  return (
    <div>
      <h2>Step 2: Set Up Profile</h2>
      {/* Profile setup form */}
      <button onClick={prevStep}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step2;

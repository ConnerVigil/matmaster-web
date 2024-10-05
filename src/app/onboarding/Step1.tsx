import React, { useState } from "react";
import { useOnboarding } from "./OnboardingProvider";

const Step1 = () => {
  const { nextStep } = useOnboarding();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    // Validate phone number and send verification code
    nextStep();
  };

  return (
    <div>
      <h2>Step 1: Enter Phone Number</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step1;

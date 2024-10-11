import React, { useState } from "react";
import { useOnboarding } from "./OnboardingProvider";
import { ChevronDown } from "@untitled-ui/icons-react";
import StepButtons from "./StepButtons";

const PhoneNumberStep = () => {
  const { nextStep, prevStep } = useOnboarding();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    // Validate phone number and send verification code
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-textPrimary text-xl font-bold mb-2">Phone Number</h1>
      <p className="text-textSecondary mb-6">
        This will not be shared with anyone and is used for account security and
        authorization.
      </p>
      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-textPrimary mb-1"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              type="button"
              className="flex items-center px-3 border-r border-gray-300 text-textSecondary sm:text-sm"
            >
              US <ChevronDown className="ml-1" />
            </button>
          </div>
          <input
            type="tel"
            id="phone"
            className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="+1 (xxx)-xxx-xxxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <StepButtons nextStep={handleNext} prevStep={prevStep} />
    </div>
  );
};

export default PhoneNumberStep;

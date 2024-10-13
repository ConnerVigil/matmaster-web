import React, { useState } from "react";
import { useOnboarding } from "./OnboardingProvider";
import { ChevronDown } from "@untitled-ui/icons-react";
import StepButtons from "./StepButtons";
import { z } from "zod";
import { userService } from "@/lib/frontend/services/userService";

const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number is required and must be at least 10 digits long",
    })
    .max(10, {
      message: "Phone number must be at most 10 digits long",
    }),
});

const PhoneNumberStep = () => {
  const {
    nextStep,
    prevStep,
    phoneNumber,
    setPhoneNumber,
    // setVerificationCode,
  } = useOnboarding();
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    const validationResult = phoneNumberSchema.safeParse({ phoneNumber });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }
    setError(null);

    try {
      const code = await userService.sendVerificationCode(phoneNumber);
      // setVerificationCode(code);
      nextStep();
    } catch (error) {
      console.error(error);
      setError("Failed to send verification code. Please try again.");
    }
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
            className={`text-black block w-full pl-24 pr-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="1234567890"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setError(null);
            }}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <StepButtons nextStep={handleNext} prevStep={prevStep} />
    </div>
  );
};

export default PhoneNumberStep;

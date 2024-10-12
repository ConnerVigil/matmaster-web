import React, { useState, useRef, useEffect } from "react";
import { useOnboarding } from "./OnboardingProvider";
import StepButtons from "./StepButtons";

interface DigitDisplayProps {
  value: string;
  isFocused: boolean;
}

function DigitDisplay({ value, isFocused }: DigitDisplayProps) {
  return (
    <div
      className={`w-16 h-16 rounded-lg flex items-center justify-center border ${
        isFocused ? "border-blue-500" : "border-[#cfd4dc]"
      } bg-white shadow`}
    >
      <span
        className={`text-5xl font-medium font-['Work Sans'] ${
          value ? "text-primaryLight" : "text-[#cfd4dc]"
        }`}
      >
        {value || "0"}
      </span>
    </div>
  );
}

const PhoneVerificationStep = () => {
  const { nextStep, prevStep } = useOnboarding();
  const [code, setCode] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCode(newCode);
  };

  const handleNext = () => {
    console.log("Verification code:", code);
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-textPrimary text-xl font-bold mb-2">Verification</h1>
      <p className="text-textSecondary mb-6">
        You have received an SMS message with a verification code.
      </p>
      <div className="relative">
        <div className="flex justify-center items-center py-6 gap-1.5">
          {[0, 1, 2, 3].map((index) => (
            <DigitDisplay
              key={index}
              value={code[index] || ""}
              isFocused={isFocused && index === code.length}
            />
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={code}
          onChange={handleCodeChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="opacity-0 absolute inset-0 w-full h-full cursor-default"
          maxLength={4}
          inputMode="numeric"
          pattern="\d*"
        />
      </div>
      <StepButtons nextStep={handleNext} prevStep={prevStep} />
    </div>
  );
};

export default PhoneVerificationStep;

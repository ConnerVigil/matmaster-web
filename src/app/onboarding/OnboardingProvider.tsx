import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface OnboardingContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  percentageComplete: number;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  step: 0,
  nextStep: () => {},
  prevStep: () => {},
  percentageComplete: 0,
  phoneNumber: "",
  setPhoneNumber: () => {},
});

interface Props {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<Props> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const totalSteps = 3;

  const nextStep = () =>
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const percentageComplete = (step / totalSteps) * 100;

  return (
    <OnboardingContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        percentageComplete,
        phoneNumber,
        setPhoneNumber,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

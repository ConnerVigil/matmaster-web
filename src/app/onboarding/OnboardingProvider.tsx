import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

const OnboardingContext = createContext({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
  percentageComplete: 0,
});

interface Props {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<Props> = ({ children }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const nextStep = () =>
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const percentageComplete = (step / totalSteps) * 100;

  return (
    <OnboardingContext.Provider
      value={{ step, nextStep, prevStep, percentageComplete }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

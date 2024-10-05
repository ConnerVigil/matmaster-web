import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

const OnboardingContext = createContext({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
});

interface Props {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<Props> = ({ children }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <OnboardingContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

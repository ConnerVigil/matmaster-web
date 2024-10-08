interface StepButtonsProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepButtons({ nextStep, prevStep }: StepButtonsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={nextStep}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue
      </button>
      <button
        onClick={prevStep}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
    </div>
  );
}
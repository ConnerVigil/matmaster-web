interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full px-4">
      <div className="mb-8">
        <div className="bg-gray-200 bg-stroke dark:bg-dark-3 relative h-2.5 w-full rounded-2xl">
          <div
            className="bg-primary absolute top-0 left-0 h-full rounded-2xl"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

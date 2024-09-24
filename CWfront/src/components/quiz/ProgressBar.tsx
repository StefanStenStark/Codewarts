export default function ProgressBar({
  currQuestion,
  totalQuestions,
}: {
  currQuestion: number;
  totalQuestions: number;
}) {
  const progress = (currQuestion / totalQuestions) * 100;

  return (
    <div>
      <span className="text-sm font-mono">
        Question {currQuestion} of {totalQuestions}
      </span>
      <progress
        className="progress progress-error"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
}

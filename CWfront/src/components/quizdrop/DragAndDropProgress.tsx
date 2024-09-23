export default function DragAndDropProgressBar({
  currQuestion,
  totalQuestions,
}: {
  currQuestion: number;
  totalQuestions: number;
}) {
  const progress = (currQuestion / totalQuestions) * 100;

  return (
    <div className="m-4">
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

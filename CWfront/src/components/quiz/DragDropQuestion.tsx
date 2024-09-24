import { IDragDropQuestion } from "../../data/types.ts";
import { useEffect, useState } from "react";

type DragDropQuestionProps = {
  question: IDragDropQuestion;
  showError: boolean;
  onClearError: () => void;
  onValidationChanged: (isValid: boolean) => void;
  onSetShowSubmit: (show: boolean) => void;
};

export default function DragDropQuestion({
  question,
  //   showError,
  //   onClearError,
  onValidationChanged,
  onSetShowSubmit,
}: DragDropQuestionProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  useEffect(() => {
    validate();
  }, [draggedItem]);

  useEffect(() => {
    onSetShowSubmit(true);
  }, [onSetShowSubmit]);

  const validate = () => {
    const isValid = question.options.every(
      (answer: unknown, index: number) =>
        answer === question.correctOrder[index]
    );
    onValidationChanged(isValid);
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (answerIndex: number) => {
    if (draggedItem === null || draggedItem === answerIndex) return;

    const reorderedOptions = [...question.options];
    const [draggedAnswer] = reorderedOptions.splice(draggedItem, 1);
    reorderedOptions.splice(answerIndex, 0, draggedAnswer);

    question.options = reorderedOptions;
    setDraggedItem(answerIndex);
  };

  const handleDrop = () => {
    setDraggedItem(null);
  };

  return (
    <div key={question.id}>
      <ul>
        {question.options.map((answer, answerIndex) => (
          <li
            className="cursor-grab justify-start gap-8 bg-base-300 rounded-lg p-4 label-text font-mono m-2"
            key={answer}
            draggable
            onDragStart={() => handleDragStart(answerIndex)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(answerIndex);
            }}
            onDrop={handleDrop}
          >
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

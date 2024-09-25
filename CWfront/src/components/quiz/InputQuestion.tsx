import {IInputQuestion} from "../../data/types.ts";
import {useEffect, useState} from "react";

type InputQuestionProps = {
  question: IInputQuestion,
  showError: boolean,
  onClearError: () => void,
  onValidationChanged: (isValid: boolean) => void,
  onSetShowSubmit: (show: boolean) => void,
}

export default function InputQuestion({
                                        question,
                                        showError,
                                        onClearError,
                                        onValidationChanged,
                                        onSetShowSubmit
                                      }: InputQuestionProps) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    validate();
    onSetShowSubmit(answer.length > 0);
  }, [answer]);

  const validate = () => {
    const isValid = answer === question.correctAnswer;
    onValidationChanged(isValid);
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3 ">
        {question.options.map((opt) => (
          <div
            key={question.id}
            className={`bg-base-300 rounded-lg p-4 font-mono`}>
            {opt}
          </div>
        ))}
      </div>
      <textarea
        className={`textarea textarea-bordered font-mono mt-8 w-full ${showError ? "border-error" : "border-secondary"}`}
        placeholder="Type your answer here"
        onChange={e => {
          setAnswer(e.target.value);
          onClearError();
        }}></textarea>
    </div>
  );
}
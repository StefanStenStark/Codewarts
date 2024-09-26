import { ISingleChoiceQuestion } from "../../data/types.ts";
import { useEffect, useState } from "react";

type SingleChoiceQuestionProps = {
  question: ISingleChoiceQuestion;
  showError: boolean;
  onClearError: () => void;
  onValidationChanged: (isValid: boolean) => void;
  onSetShowSubmit: (show: boolean) => void;
};

export default function SingleChoiceQuestion({
  question,
  showError,
  onClearError,
  onValidationChanged,
  onSetShowSubmit,
}: SingleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    validate();
    onSetShowSubmit(!!selectedOption);
  }, [selectedOption]);

  const validate = () => {
    const isValid = selectedOption === question.correctOption;
    onValidationChanged(isValid);
  };

  return (
    <fieldset name="options" className="flex flex-col gap-3 mt-12">
      {question.options.map((opt, i) => (
        <div key={i} className="form-control">
          <label
            className={`label cursor-pointer justify-start gap-8 bg-base-300 rounded-lg p-4 has-[:checked]:border ${showError ? opt === selectedOption && "border-error" : "border-secondary"}`}
          >
            <input
              type="radio"
              name="option"
              className={`radio radio-secondary disabled:opacity-100 ${showError && opt == selectedOption && "radio-error"}`}
              checked={selectedOption ? selectedOption === opt : false}
              onChange={() => {
                setSelectedOption(opt);
                onClearError();
              }}
            />
            <span className="label-text text-lg font-mono">{opt}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

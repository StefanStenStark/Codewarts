import { IMultiChoiceQuestion } from "../../data/types.ts";
import { useEffect, useState } from "react";

type MultiChoiceQuestionProps = {
  question: IMultiChoiceQuestion;
  showError: boolean;
  onClearError: () => void;
  onValidationChanged: (isValid: boolean) => void;
  onSetShowSubmit: (show: boolean) => void;
};

export default function MultiChoiceQuestion({
  question,
  onClearError,
  onValidationChanged,
  onSetShowSubmit,
}: MultiChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    validate();
    onSetShowSubmit(selectedOptions.length > 0);
  }, [selectedOptions]);

  const validate = () => {
    const isValid =
      selectedOptions.sort().join(",") ===
      question.correctOptions.sort().join(",");
    onValidationChanged(isValid);
  };

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((e) => e !== opt) : [...prev, opt]
    );
  };

  return (
    <fieldset name="options" className="flex flex-col gap-3 mt-12">
      {question.options.map((opt, i) => {
        return (
          <div key={i} className="form-control">
            <label className="label cursor-pointer justify-start gap-8 bg-base-300 rounded-lg p-4 border-secondary has-[:checked]:border">
              <input
                type="checkbox"
                name="option"
                className="checkbox checkbox-secondary disabled:opacity-100"
                onChange={() => {
                  toggleOption(opt);
                  onClearError();
                }}
              />
              <span className="label-text font-lg font-mono">{opt}</span>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

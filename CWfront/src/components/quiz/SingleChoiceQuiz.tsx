import {useState} from "react";
import {Option, Question} from "../../data/types.ts";
import {toast} from "react-toastify";
import ProgressBar from "./ProgressBar.tsx";

type SingleChoiceQuizProps = {
  questions: Question[];
  heartsCount: number;
  onDeductHearts: () => void;
  onQuizComplete: () => void;
  onQuizFailed: () => void;
};

export default function SingleChoiceQuiz({
                                           questions,
                                           heartsCount,
                                           onDeductHearts,
                                           onQuizComplete,
                                           onQuizFailed,
                                         }: SingleChoiceQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questionIndex = questions.indexOf(currentQuestion);
  const questionNumber = questionIndex + 1;
  const isLastQuestion = questionNumber === questions.length;

  const handleSubmit = () => {
    if (selectedOption!.isCorrect) {
      // TODO: Increase user XP
      if (isLastQuestion) {
        onQuizComplete();
        return;
      }
      
      showCorrectAnswerToast();

      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      if (heartsCount === 1) {
        onQuizFailed();
        return;
      }
      
      showWrongAnswerToast();
      onDeductHearts();
      setIsSubmitted(true);
    }
  };

  const showCorrectAnswerToast = () => {
    toast.dismiss();
    toast("Well done! You have gained +50 XP", {
      icon: () => "👏",
    });
  }

  const showWrongAnswerToast = () => {
    toast.dismiss();
    toast(
      heartsCount === 2
        ? "Not quite right. You have one heart left"
        : "Not quite right. You lost a heart",
      {
        icon: () => "❌",
      }
    );
  };

  return (
    <section className="max-w-2xl bg-base-200 rounded-3xl p-12 mt-16">
      <ProgressBar currQuestion={questionNumber} totalQuestions={questions.length}/>
      <h2 className="font-serif text-3xl mt-8">
        {currentQuestion.questionText}
      </h2>
      <fieldset name="options" className="flex flex-col gap-3 mt-12">
        {currentQuestion.options.map((opt) => (
          <div key={opt.id} className="form-control">
            <label
              className={`label cursor-pointer justify-start gap-8 bg-base-300 rounded-lg p-4 has-[:checked]:border ${isSubmitted ? opt.id === selectedOption!.id && "border-error" : "border-secondary"}`}
            >
              <input
                type="radio"
                name="option"
                className={`radio radio-secondary disabled:opacity-100 ${isSubmitted && opt.id == selectedOption!.id && "radio-error"}`}
                checked={selectedOption ? selectedOption.id === opt.id : false}
                onChange={() => {
                  setIsSubmitted(false);
                  setSelectedOption(opt);
                }}
              />
              <span className="label-text font-mono">{opt.optionText}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <button
        disabled={!selectedOption}
        onClick={handleSubmit}
        className="btn btn-primary btn-block mt-14"
      >
        Submit
      </button>
    </section>
  );
}
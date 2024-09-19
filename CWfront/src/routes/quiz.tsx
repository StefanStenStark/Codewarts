import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";
import {Question, Option} from "../data/types";
import {fetchUser} from '../data/Api';

const questions: Question[] = [
  {
    id: 1,
    questionText: "Which is the correct syntax for string interpolation?",
    options: [
      {
        id: 1,
        optionText: '$"Hello, World"',
        isCorrect: true,
      },
      {
        id: 2,
        optionText: '$"Hello, There"',
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    questionText: "Which is the correct syntax for something?",
    options: [
      {
        id: 1,
        optionText: '$"Hello, World"',
        isCorrect: false,
      },
      {
        id: 2,
        optionText: '$"Hello, There"',
        isCorrect: true,
      },
    ],
  },
];
export const Route = createFileRoute("/quiz")({
  component: () => <Quiz/>,
});

function Quiz() {
  const user = fetchUser();
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [heartsCount, setHeartsCount] = useState(user.maximumHearts);
  
  const questionIndex = questions.indexOf(currentQuestion);
  const questionNumber = questionIndex + 1;
  const isLastQuestion = questionNumber === questions.length;
  const progress = (questionNumber / questions.length) * 100;

  const handleSubmit = () => {
    if (selectedOption!.isCorrect) {
      if (isLastQuestion) {
        handleFinish();
        return;
      }
      // TODO: Increase user XP
      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // TODO: lose health
      if (heartsCount === 1) {
        // TODO: handle retry
        return;
      }
      setIsSubmitted(true);
      setHeartsCount(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    // TOOD: Finish the quiz
    alert("Quiz finished!");
  };

  return (
    <main className="grid place-items-center h-screen p-6">
      <div className="flex gap-4">
        {Array(heartsCount).fill(0).map(_ => <HeartIcon/>)}
      </div>

      <section className="max-w-2xl bg-base-200 rounded-3xl p-12">
        <div>
          <span className="text-sm">
            Question {questionNumber} of {questions.length}
          </span>
          <progress
            className="progress progress-secondary"
            value={progress}
            max="100"
          ></progress>
        </div>
        <h2 className="font-serif text-3xl mt-8">
          {currentQuestion.questionText}
        </h2>
        <fieldset
          name="options"
          className="flex flex-col gap-3 mt-12">
          {currentQuestion.options.map((opt) => (
            <div key={opt.id} className="form-control">
              <label
                className={`label cursor-pointer justify-start gap-8 bg-base-300 rounded-lg p-4 has-[:checked]:border ${isSubmitted ? ((opt.id === selectedOption!.id) && "border-error") : "border-secondary"}`}>
                <input
                  type="radio"
                  name="option"
                  className={`radio radio-secondary disabled:opacity-100 ${isSubmitted && (opt.id == selectedOption!.id) && "radio-error"}`}
                  checked={
                    selectedOption ? selectedOption.id === opt.id : false
                  }
                  onChange={() => {
                    setIsSubmitted(false);
                    setSelectedOption(opt)
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
          className="btn btn-primary btn-block mt-14">
          Submit
        </button>
      </section>
    </main>
  );
}

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="fill-error"
    width="48"
    height="48"
    viewBox="0 0 512 512">
    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68
    47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244
    84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
  </svg>
);

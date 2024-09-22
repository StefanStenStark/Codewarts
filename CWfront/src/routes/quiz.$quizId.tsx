import {createFileRoute, useNavigate} from "@tanstack/react-router";
import {useState} from "react";
import {Question, Option} from "../data/types";
import {fetchUser} from "../data/Api";
import {toast} from "react-toastify";

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
export const Route = createFileRoute("/quiz/$quizId")({
  component: () => <Quiz/>,
});

function Quiz() {
  const {quizId} = Route.useParams();
  const navigate = useNavigate();
  const user = fetchUser();
  const [heartsCount, setHeartsCount] = useState(user.maximumHearts);
  const handleQuizComplete = () => {
    navigate({
      to: "/quiz/passed",
      search: {
        id: quizId,
      },
    });
  };
  const handleQuizFailed = () => {
    navigate({
      to: "/quiz/failed",
      search: {
        quizId: quizId,
      },
    });
  };

  return (
    <>
      <main className="h-screen p-6 pt-8 flex flex-col">
        <div className="grid place-items-center py-16 flex-1">
          <div>
            <HealthBar heartsCount={heartsCount}/>
            <SingleChoiceQuiz
              heartsCount={heartsCount}
              onDeductHearts={() => setHeartsCount((prev) => prev - 1)}
              onQuizComplete={handleQuizComplete}
              onQuizFailed={handleQuizFailed}
            />
          </div>
        </div>
      </main>
    </>
  );
}

function HealthBar({heartsCount}: { heartsCount: number }) {
  return (
    <div className="flex gap-4 justify-center">
      {Array(heartsCount)
        .fill(0)
        .map((_) => (
          <HeartIcon/>
        ))}
    </div>
  );
}

function LevelBar() {
  return (
    <div className="w-full max-w-md bg-base-200 rounded-3xl p-6 pb-8 flex gap-6 items-center prose">
      <BoltIcon/>
      <div className="w-full">
        <div className="flex justify-between font-medium">
          <span>Level 5</span>
          <span>300/500 XP</span>
        </div>
        <progress
          className="progress progress-secondary"
          value="50"
          max="100"
        ></progress>
      </div>
    </div>
  );
}


type SingleChoiceQuizProps = {
  heartsCount: number;
  onDeductHearts: () => void;
  onQuizComplete: () => void;
  onQuizFailed: () => void;
};

function SingleChoiceQuiz({
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
      if (isLastQuestion) {
        onQuizComplete();
        return;
      }
      // TODO: Increase user XP
      toast.dismiss("quiz-feedback-wrong");
      toast("Well done! You have gained +50 XP", {
        toastId: "quiz-feedback-correct",
        icon: () => "👏",
      });

      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      if (heartsCount === 1) {
        onQuizFailed();
        return;
      }

      toast.dismiss("quiz-feedback-correct");
      toast(
        heartsCount === 2
          ? "Not quite right. You have one heart left"
          : "Not quite right. You lost a heart",
        {
          toastId: "quiz-feedback-wrong",
          icon: () => "❌",
        }
      );

      setIsSubmitted(true);
      onDeductHearts();
    }
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

function ProgressBar({currQuestion, totalQuestions}: { currQuestion: number, totalQuestions: number }) {
  const progress = (currQuestion / totalQuestions) * 100;

  return (
    <div>
        <span className="text-sm">
          Question {currQuestion} of {totalQuestions}
        </span>
      <progress
        className="progress progress-secondary"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
}

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="fill-error"
    width="48"
    height="48"
    viewBox="0 0 512 512"
  >
    <path
      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68
    47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244
    84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
    />
  </svg>
);

const BoltIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="fill-secondary"
    width="32"
    height="32"
    viewBox="0 0 448 512"
  >
    <path
      d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/>
  </svg>
);

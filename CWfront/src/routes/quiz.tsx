import {createFileRoute, Link} from "@tanstack/react-router";
import {useState} from "react";
import {Question, Option} from "../data/types";
import {fetchUser} from '../data/Api';
import {toast} from 'react-toastify';

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
        showCompletedModal();
        return;
      }
      // TODO: Increase user XP
      toast.dismiss("quiz-feedback-wrong");
      toast("Well done! You have gained +50 XP", {
        toastId: "quiz-feedback-correct",
        icon: () => "👏"
      })

      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      if (heartsCount === 1) {
        showRetryModal();
        return;
      }

      toast.dismiss("quiz-feedback-correct");
      toast(heartsCount === 2
          ? "Not quite right. You have one heart left"
          : "Not quite right. You lost a heart",
        {
          toastId: "quiz-feedback-wrong",
          icon: () => "❌"
        });

      setIsSubmitted(true);
      setHeartsCount(prev => prev - 1);
    }
  };

  const showCompletedModal = () => {
    // TOOD: Finish the quiz
    (document.getElementById("quiz-complete-modal") as HTMLDialogElement).showModal();
  };

  const showRetryModal = () => {
    (document.getElementById("quiz-failed-modal") as HTMLDialogElement).showModal();
  }

  const handleRetry = () => {
    // Reset all state
    setCurrentQuestion(questions[0]);
    setSelectedOption(null);
    setIsSubmitted(false);
    setHeartsCount(user.maximumHearts);
  };

  return (
    <>
      <main className="h-screen p-6 pt-8 flex flex-col">
        <div className="w-full max-w-md mx-auto bg-base-200 rounded-3xl p-6 pb-8 flex gap-6 items-center prose">
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
        <div className="grid place-items-center py-16 flex-1">
          <div>
            <div className="flex gap-4 justify-center">
              {Array(heartsCount).fill(0).map(_ => <HeartIcon/>)}
            </div>
            <section className="max-w-2xl bg-base-200 rounded-3xl p-12 mt-16">
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
          </div>
        </div>
      </main>
      <dialog id="quiz-complete-modal" className="modal">
        <div className="modal-box p-8">
          <div className="text-center p-6 prose">
            <h3 className="font-serif font-bold text-3xl text-center">👏 Well done wizard!</h3>
            <p>You have completed the quest. <br/> Press quit and start another quest!</p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <Link className="btn btn-primary" to="/adventures">Quit</Link>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="quiz-failed-modal" className="modal">
        <div className="modal-box p-8">
          <div className="text-center p-6 prose">
            <h3 className="font-serif font-bold text-3xl text-center">You have run out of hearts</h3>
            <p>And such have failed the quest. <br/> Dare to retry?</p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary" onClick={handleRetry}>Retry</button>
              <Link className="btn btn-primary ml-2" to="/adventures">Quit</Link>
            </form>
          </div>
        </div>
      </dialog>
    </>
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

const BoltIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="fill-secondary"
    width="32"
    height="32"
    viewBox="0 0 448 512">
    <path
      d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/>
  </svg>
);

import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";

type Option = {
  id: number,
  optionText: string,
  isCorrect: boolean
}

type Question = {
  id: number,
  questionText: string,
  options: Option[]
}

const questions: Question[] = [
  {
    id: 1,
    questionText: "Which is the correct syntax for string interpolation?",
    options: [
      {
        id: 1,
        optionText: "$\"Hello, World\"",
        isCorrect: true
      },
      {
        id: 2,
        optionText: "$\"Hello, There\"",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    questionText: "Which is the correct syntax for something?",
    options: [
      {
        id: 1,
        optionText: "$\"Hello, World\"",
        isCorrect: false
      },
      {
        id: 2,
        optionText: "$\"Hello, There\"",
        isCorrect: true
      }
    ]
  }
]
export const Route = createFileRoute('/quiz')({
  component: () => <Quiz/>
})

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const questionIndex = questions.indexOf(currentQuestion);
  const questionNumber = questionIndex + 1;
  const isLastQuestion = questionNumber === questions.length;
  const progress = (questionNumber / questions.length) * 100;

  const handleSubmit = () => {
    if (submitted) {
      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  const handleFinish = () => {
    // TOOD: Finish the quiz
  }

  return (
    <main className="grid place-items-center h-screen p-6">
      <section className="max-w-2xl bg-base-200 rounded-3xl p-12">
        <div>
          <span className="text-sm">Question {questionNumber} of {questions.length}</span>
          <progress className="progress progress-secondary" value={progress} max="100"></progress>
        </div>
        <h2 className="font-serif text-3xl mt-8">{currentQuestion.questionText}</h2>
        <fieldset name="options" className="flex flex-col gap-3 mt-12" disabled={submitted}>
          {currentQuestion.options.map(opt => (
            <div
              key={opt.id}
              className="form-control">
              <label
                className={`label cursor-pointer justify-start gap-8 bg-base-300 rounded-lg p-4 border-secondary has-[:checked]:border ${submitted && (opt.isCorrect ? "border border-success" : "border border-error")}`}>
                <input
                  type="radio"
                  name="option"
                  className={`radio radio-secondary disabled:opacity-100 ${submitted && (opt.isCorrect ? "radio-success" : "radio-error")}`}
                  checked={selectedOption ? selectedOption.id === opt.id : false}
                  onChange={(_) => setSelectedOption(opt)}/>
                <span className="label-text font-mono">{opt.optionText}</span>
              </label>
            </div>
          ))}
        </fieldset>
        {(submitted && isLastQuestion)
          ?
          <button onClick={handleFinish} className="btn btn-primary btn-block mt-14">Finish</button>
          :
          <button
            disabled={!selectedOption}
            onClick={handleSubmit}
            className="btn btn-primary btn-block mt-14">
            {submitted ? "Next" : "Submit"}
          </button>
        }
      </section>
    </main>
  );
}
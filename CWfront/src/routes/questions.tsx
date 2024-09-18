import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import fetchQuestions, { QuestionsChoice } from "../Api";

export const Route = createFileRoute("/questions")({
  component: Questions,
});

function Questions() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [allQuestions, setAllQuestions] = useState<QuestionsChoice[]>([]);

  useEffect(() => {
    setLoading(true);
    setAllQuestions(fetchQuestions());
    setLoading(false);
  }, []);

  function CheckAnswer(chosenAnswer: string) {
    if (chosenAnswer === allQuestions[0].optionCorrect) {
      setFeedback("Well Done Wizard");
    } else {
      setFeedback("You need more powerful magic!!!");
    }
  }

  return (
    <>
      <h1 className="font-serif text-4xl">Which is the correct syntax for string interpolation?</h1>
      {loading ? (
        <p>Loading Magic... </p>
      ) : (
        <div className="p-2">
          <h2>Here is the 5 questions</h2>
          {allQuestions[0].question}
          {allQuestions[0].options.map((options) => (
            <button
              className="btn btn-success"
              onClick={() => CheckAnswer(options)}
            >
              {options}
            </button>
          ))}

          {/* <button
            className="btn btn-success"
            onClick={() => CheckAnswer("FirstOrDefault")}
          >
            FirstOrDefault
          </button>
          <button
            className="btn btn-success"
            onClick={() => CheckAnswer("FirstSelect")}
          >
            FirstSelect
          </button>
          <button
            className="btn btn-success"
            onClick={() => CheckAnswer("Select")}
          >
            SelectDefault
          </button>
          <button
            className="btn btn-success"
            onClick={() => CheckAnswer("FirstDefault")}
          >
            FirstDefault
          </button> */}

          <p>{feedback}</p>
        </div>
      )}
    </>
  );
}

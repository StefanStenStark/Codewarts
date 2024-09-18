import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/questions")({
  component: Questions,
});

function Questions() {
  const [feedback, setFeedback] = useState("");
  const correctAnswer = "FirstOrDefault";

  function CheckAnswer(chosenAnswer: string) {
    if (chosenAnswer === correctAnswer) {
      setFeedback("Well Done Wizard");
    } else {
      setFeedback("You need more powerful magic!!!");
    }
  }

  return (
    <>
      <div className="p-2">
        <h2>Here is the 5 questions</h2>
        <p>
          Question 1 choose the Linq Method that will pick the first of the
          found results:
        </p>

        <button
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
        </button>

        <p>{feedback}</p>
      </div>
    </>
  );
}

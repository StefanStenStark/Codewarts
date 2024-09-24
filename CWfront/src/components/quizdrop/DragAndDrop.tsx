import { useState } from "react";

interface Question {
  id: number;
  text: string;
}

const DragDropQuestions = () => {
  const initialQuestions: Question[] = [
    { id: 2, text: "public int AddNumbers" },
    { id: 1, text: "public class Calculator {" },
    { id: 4, text: "{ return number1 + number2; } }" },
    { id: 3, text: "(int number1, int number2)" },
  ];

  const correctOrder = [1, 2, 3, 4];

  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedItem === null) return;

    const reorderedQuestions = [...questions];
    const draggedQuestion = reorderedQuestions.splice(draggedItem, 1)[0];
    reorderedQuestions.splice(index, 0, draggedQuestion);

    setDraggedItem(index);
    setQuestions(reorderedQuestions);
  };

  const handleDrop = () => {
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    const currentOrder = questions.map((q) => q.id);
    const isCorrect = currentOrder.every(
      (id, index) => id === correctOrder[index]
    );
    setIsCorrectOrder(isCorrect);
  };

  return (
    <section className="max-w-2xl bg-base-200 rounded-3xl p-12 mt-16">
      <div>
        <h2 className="font-serif text-3xl mt-8">
          Please Order the code snippets to build a C# method:
        </h2>
        <ul className="">
          {questions.map((question, index) => (
            <li
              className="cursor-pointer justify-start gap-8 bg-base-300 rounded-lg p-4 label-text font-mono m-2"
              key={question.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(index);
              }}
              onDrop={handleDrop}
            >
              {question.text}
            </li>
          ))}
        </ul>

        <button onClick={checkAnswer} className="btn btn-warning font-mono">
          Check Answer
        </button>

        {isCorrectOrder !== null && (
          <div className="mt-4">
            {isCorrectOrder ? (
              <p className="text-green-500">Correct order! 🎉</p>
            ) : (
              <p className="text-red-500">Incorrect order. Try again.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DragDropQuestions;

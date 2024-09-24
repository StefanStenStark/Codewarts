import { useEffect, useState } from "react";
import fetchDragDropQuestions, { Question } from "./DragAndDropAPI";
import DragAndDropProgressBar from "./DragAndDropProgress";

interface DragAndDropProps {
  onDeductHearts: () => void;
}

export default function DragDropQuestions({
  onDeductHearts,
}: DragAndDropProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchedQuestions = fetchDragDropQuestions();
    setQuestions(fetchedQuestions);
  }, []);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (answerIndex: number) => {
    if (draggedItem === null) return;

    setQuestions((prevQuestions) => {
      const currentQuestion = prevQuestions[currentQuestionIndex];
      const reorderedAnswers = [...currentQuestion.option];

      const [draggedAnswer] = reorderedAnswers.splice(draggedItem, 1);
      reorderedAnswers.splice(answerIndex, 0, draggedAnswer);

      const updatedQuestions = prevQuestions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return { ...question, option: reorderedAnswers };
        }
        return question;
      });
      return updatedQuestions;
    });
    setDraggedItem(answerIndex);
  };

  const handleDrop = () => {
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const currentOrder = currentQuestion.option;
    const correctOrder = currentQuestion.correctOrder;
    const isCorrect = currentOrder.every(
      (answer, index) => answer === correctOrder[index]
    );

    setIsCorrectOrder(isCorrect);

    if (!isCorrect) {
      onDeductHearts();
    }
  };

  const handleNext = () => {
    setIsCorrectOrder(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setIsCorrectOrder(null);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="max-w-2xl bg-base-200 rounded-3xl p-12 mt-16">
      <DragAndDropProgressBar
        currQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      <div key={currentQuestion.id} className="mb-8 flex flex-col">
        <h2 className="font-serif text-3xl mt-8 m-2">
          {currentQuestion.title}
        </h2>
        <ul>
          {currentQuestion.option.map((answer, answerIndex) => (
            <li
              className="cursor-grab justify-start gap-8 bg-base-300 rounded-lg p-4 label-text font-mono m-2"
              key={answer}
              draggable
              onDragStart={() => handleDragStart(answerIndex)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(answerIndex);
              }}
              onDrop={handleDrop}
            >
              {answer}
            </li>
          ))}
        </ul>

        {/* this will be handled in the quiz root */}
        <button onClick={checkAnswer} className="btn btn-warning m-2 font-mono">
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

        <div className="mt-4">
          <button
            onClick={handlePrevious}
            className="btn btn-outline btn-sm mr-2 font-mono m-2"
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="btn btn-outline btn-sm font-mono m-2"
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Forward
          </button>
        </div>
      </div>
    </section>
  );
}

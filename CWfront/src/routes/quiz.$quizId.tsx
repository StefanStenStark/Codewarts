import {createFileRoute, useNavigate} from "@tanstack/react-router";
import {useState} from "react";
import {Question } from "../data/types";
import {fetchUser} from "../data/Api";
import HealthBar from "../components/quiz/HealthBar.tsx";
import SingleChoiceQuiz from "../components/quiz/SingleChoiceQuiz.tsx";

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
              questions={questions}
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
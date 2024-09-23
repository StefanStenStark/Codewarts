import {createFileRoute, useNavigate} from "@tanstack/react-router";
import {useState} from "react";
import {fetchTempQuestions, fetchUser} from "../data/Api";
import HealthBar from "../components/quiz/HealthBar.tsx";
import SingleChoiceQuiz from "../components/quiz/SingleChoiceQuiz.tsx";

export const Route = createFileRoute("/quiz/$quizId")({
  component: () => <Quiz/>,
  loader: () => fetchTempQuestions()
});

function Quiz() {
  const questions = Route.useLoaderData();
  const {quizId} = Route.useParams();
  const navigate = useNavigate();
  const user = fetchUser();
  const [heartsCount, setHeartsCount] = useState(user.maximumHearts);
  const handleQuizComplete = (gainedXP: number) => {
    // TODO: update user XP
    console.log(gainedXP);
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
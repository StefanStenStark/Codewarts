import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchTempQuestions, fetchUser } from "../data/Api";
import HealthBar from "../components/quiz/HealthBar.tsx";
import SingleChoiceQuiz from "../components/quiz/SingleChoiceQuiz.tsx";
import { User } from "../data/types.ts";

export const Route = createFileRoute("/quiz/$quizId")({
  component: () => <Quiz />,
  loader: () => fetchTempQuestions(),
});

function Quiz() {
  const questions = Route.useLoaderData();
  const { quizId } = Route.useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [heartsCount, setHeartsCount] = useState(10);
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
  useEffect(() => {});

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const fetchedUser = await fetchUser(1);
      setUser(fetchedUser);
      setLoading(false);
      setHeartsCount(fetchedUser.maximumHearts);
    }
    getUser();
  }, []);

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
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <main className="h-screen p-6 pt-8 flex flex-col">
          <div className="grid place-items-center py-16 flex-1">
            <div>
              <p>{user?.name}</p>
              <HealthBar heartsCount={heartsCount} />
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
      )}
    </>
  );
}

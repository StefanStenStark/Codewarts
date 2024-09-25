import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchDragDropQuestions, fetchUser, updateUser } from "../data/Api";
import HealthBar from "../components/quiz/HealthBar.tsx";
import ProgressBar from "../components/quiz/ProgressBar.tsx";
import {
  IDragDropQuestion,
  IQuestion,
  ISingleChoiceQuestion,
  QuestionType,
} from "../data/types.ts";
import { toast } from "react-toastify";
import SingleChoiceQuestion from "../components/quiz/SingleChoiceQuestion.tsx";
import { User } from "../data/types.ts";
import DragDropQuestion from "../components/quiz/DragDropQuestion.tsx";
import { useMutation } from "@tanstack/react-query";

// TODO: get amount from question/type
const XP_GAIN_AMOUNT = 50;

export const Route = createFileRoute("/quiz/$quizId")({
  component: () => <Quiz />,
  loader: () => fetchDragDropQuestions(),
});

function Quiz() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const questions = Route.useLoaderData();
  const { quizId } = Route.useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(
    questions[0]
  );
  const [showSubmit, setShowSubmit] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [gainedXP, setGainedXP] = useState(0);
  const [heartsCount, setHeartsCount] = useState(10);

  const questionIndex = questions.indexOf(currentQuestion);
  const questionNumber = questionIndex + 1;
  const isLastQuestion = questionNumber === questions.length;

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      return await updateUser(updatedUser.id, updatedUser);
    },
    onSuccess: () => {
      navigate({
        to: "/quiz/passed",
        search: { id: quizId },
      });
    },
    onError: (error: unknown) => {
      console.error("Error updating user:", error);
    },
  });

  const handleQuizComplete = (gainedXP: number) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      adventuresCompleted: user.adventuresCompleted + 1,
      experiencePoints: user.experiencePoints + gainedXP,
    };

    updateUserMutation.mutate(updatedUser);
  };

  const handleQuizFailed = () => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      experiencePoints: user.experiencePoints + gainedXP,
    };

    updateUserMutation.mutate(updatedUser, {
      onSuccess: () => {
        navigate({
          to: "/quiz/failed",
          search: { quizId: quizId },
        });
      },
      onError: (error: unknown) => {
        console.error("Error updating user:", error);
      },
    });
  };

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const fetchedUser = await fetchUser(5);
      const fetchedUser = await fetchUser(5);
      setUser(fetchedUser);
      setLoading(false);
    }
    getUser();
  }, []);

  const handleSubmit = () => {
    if (isValid) {
      if (isLastQuestion) {
        handleQuizComplete(gainedXP + XP_GAIN_AMOUNT);
        return;
      }

      setGainedXP((prev) => prev + 50);

      showCorrectAnswerToast();

      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion);
      setIsValid(false);
      setShowError(false);
      setShowSubmit(false);
    } else {
      if (heartsCount === 1) {
        handleQuizFailed();
        return;
      }

      showWrongAnswerToast();
      setHeartsCount((prev) => prev - 1);
      setShowError(true);
    }
  };

  const showCorrectAnswerToast = () => {
    toast.dismiss();
    toast("Well done! You have gained +50 XP", {
      icon: () => "👏",
    });
  };

  const showWrongAnswerToast = () => {
    toast.dismiss();
    toast(
      heartsCount === 2
        ? "Not quite right. You have one heart left"
        : "Not quite right. You lost a heart",
      {
        icon: () => "❌",
      }
    );
  };

  const renderQuestionBasedOnType = () => {
    if (currentQuestion.type === QuestionType.SingleChoice) {
      return (
        <SingleChoiceQuestion
          question={currentQuestion as ISingleChoiceQuestion}
          showError={showError}
          onClearError={() => setShowError(false)}
          onValidationChanged={setIsValid}
          onSetShowSubmit={setShowSubmit}
        />
      );
    } else if (currentQuestion.type === QuestionType.DragDrop) {
      return (
        <DragDropQuestion
          key={currentQuestion.id}
          question={currentQuestion as IDragDropQuestion}
          showError={showError}
          onClearError={() => setShowError(false)}
          onValidationChanged={setIsValid}
          onSetShowSubmit={setShowSubmit}
        />
      );
    }
    return null;
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
              <section className="max-w-2xl bg-base-200 rounded-3xl p-12 mt-16">
                <ProgressBar
                  currQuestion={questionNumber}
                  totalQuestions={questions.length}
                />
                <h2 className="font-serif text-3xl mt-8">
                  {currentQuestion.title}
                </h2>
                <div className="mt-12">{renderQuestionBasedOnType()}</div>
                <button
                  disabled={!showSubmit}
                  onClick={handleSubmit}
                  className="btn btn-warning btn-block font-mono mt-14"
                >
                  Submit
                </button>
              </section>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

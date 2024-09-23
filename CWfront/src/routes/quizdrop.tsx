import { createFileRoute } from "@tanstack/react-router";
import HealthHeart from "../components/quizdrop/HealthHeart";
import DragDropQuestions from "../components/quizdrop/DragAndDrop";
import { fetchUser } from "../data/Api";
import { useState } from "react";

export const Route = createFileRoute("/quizdrop")({
  component: QuizDrop,
});

export default function QuizDrop() {
  const user = fetchUser();
  const [heartsCount, setHeartsCount] = useState(user.maximumHearts);

  return (
    <>
      <main className="h-screen p-6 pt-8 flex flex-col cursor-grab">
        <div className="grid place-items-center py-16 flex-1 cursor-grab">
          <HealthHeart heartsCount={heartsCount} />
          <DragDropQuestions
            onDeductHearts={() => setHeartsCount((prev) => prev - 1)}
          />
        </div>
      </main>
    </>
  );
}

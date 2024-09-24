import { createFileRoute } from "@tanstack/react-router";
import HealthHeart from "../components/quizdrop/HealthHeart";
import DragDropQuestions from "../components/quizdrop/DragAndDrop";

export const Route = createFileRoute("/quizdrop")({
  component: QuizDrop,
});

export default function QuizDrop() {
  return (
    <>
      <main className="h-screen p-6 pt-8 flex flex-col">
        <div className="grid place-items-center py-16 flex-1">
          <HealthHeart heartsCount={3} />
          <DragDropQuestions />
        </div>
      </main>
    </>
  );
}

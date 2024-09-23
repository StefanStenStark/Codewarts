import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quizdrop")({
  component: () => <div>Hello /quizdrop!</div>,
});

export default function QuizDrop() {
  return (
    <>
      <h1>Quiz questions</h1>
    </>
  );
}

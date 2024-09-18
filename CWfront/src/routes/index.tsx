import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <p>Maka mak fone. Free stila whakwa</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <p>Welcome to codewarts. Place of coding and bugs</p>
    </div>
  );
}

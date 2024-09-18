import { createFileRoute } from "@tanstack/react-router";
import AdventureCard from "../components/adventures/adventureCard";

export const Route = createFileRoute("/adventures")({
  component: Adventures,
});

function Adventures() {
  return (
    <>
      <div className="p-2">
        <p>May your adventure begin...</p>
      </div>
      <AdventureCard />
    </>
  );
}

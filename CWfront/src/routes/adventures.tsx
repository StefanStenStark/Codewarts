import { createFileRoute } from "@tanstack/react-router";
import AdventureCard from "../components/adventures/adventureCard";

export const Route = createFileRoute("/adventures")({
  component: Adventures,
});

function Adventures() {
  return (
    <>
      <div className="p-2">
        <h1>May your adventure begin...</h1>
      </div>
      <h1>here the book icon goes</h1>

      <AdventureCard />
    </>
  );
}

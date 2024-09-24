import { createFileRoute } from "@tanstack/react-router";
import AdventureCard from "../components/adventures/adventureCard";

export const Route = createFileRoute("/adventures")({
  component: Adventures,
});

function Adventures() {
  return (
    <>
      <div className="font-serif text-3xl mt-8 p-40 bg-green-950">
        <h1 className="m-4">May your adventure begin...</h1>
      </div>
      <AdventureCard />
    </>
  );
}

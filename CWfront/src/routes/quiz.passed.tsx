import {createFileRoute, Link} from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/passed")({
  component: () => <Passed/>,
});

// TOOD: display rewards
function Passed() {
  return (
    <main className="h-screen p-6 pt-8 grid place-items-center">
      <section className="prose text-center">
        <h1 className="font-serif font-bold text-4xl text-center">
          👏 <br/> Well done wizard/sorcerer!
        </h1>
        <p>
          You have completed the quest. <br/> Press continue and continue on
          with your adventure!
        </p>
        <Link className="btn btn-primary" to="/adventures">Continue</Link>
      </section>
    </main>
  );
}

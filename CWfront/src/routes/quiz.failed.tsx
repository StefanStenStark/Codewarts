import {createFileRoute, Link} from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/failed")({
  component: () => <Failed/>,
});

function Failed() {
  const {quizId} = Route.useSearch<{ quizId: string }>();

  return (
    <main className="h-screen p-6 pt-8 grid place-items-center">
      <section className="prose text-center">
        <h1 className="font-serif font-bold text-4xl text-center">
          💔 <br/> You have run out of hearts
        </h1>
        <p>And such have failed the quest. Dare to retry?</p>
        <Link className="btn btn-primary min-w-[80px]" to={`/quiz/${quizId}`}>
          Retry
        </Link>
        <Link className="btn btn-primary min-w-[80px] ml-2" to="/adventures">
          Quit
        </Link>
      </section>
    </main>
  );
}

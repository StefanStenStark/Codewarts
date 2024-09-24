import { createFileRoute, Link } from "@tanstack/react-router";
import AdventureCard from "../components/adventures/adventureCard";
import { fetchUser } from "../data/Api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/adventures")({
  component: Adventures,
});

function Adventures() {
  const userId = 5;
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <>
      <div className="font-serif text-3xl mt-8 p-20 bg-green-950">
        <h1 className="text-5xl m-4 mb-10">Welcome {user?.name},</h1>
        <h2 className="m-4 text-1xl">
          I will let you in on a little secret... learning code magic takes time
          and determination. Even the most powerful code mages from house{" "}
          {user?.house} were once beginner spell casters.<br></br>
          <br /> Below you will see the quests awaiting you, click on the
          grimoire icon for some hints... good luck{" "}
        </h2>
        <Link to="/" className="btn btn-neutral font-mono m-4">
          Abort Mission
        </Link>
      </div>
      <AdventureCard />
    </>
  );
}

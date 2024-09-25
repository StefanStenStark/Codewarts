import { createFileRoute, Link } from "@tanstack/react-router";
import AdventureCard from "../components/adventures/adventureCard";
import { fetchUser } from "../data/Api";
import { useQuery } from "@tanstack/react-query";
import { User } from "./../data/types";

export const Route = createFileRoute("/adventures")({
  component: Adventures,
});

function Adventures() {
  const userId = 1;
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
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
      <div className="font-serif text-3xl mt-8 pt-20 mb-20">
        <h1 className="text-5xl mb-10">Welcome {user?.name},</h1>
        <h2 className=" text-lg">
          Learning code magic takes time and determination. Even the most
          powerful code mages from house {user?.house} were once beginner spell
          casters.<br></br>
          <br /> Below you will see the quests awaiting you. Click on the
          grimoire icon for some hints... good luck{" "}
        </h2>

        <Link to="/" className="btn btn-outline w-40 font-mono mt-20 m-2">
          Abort Mission
        </Link>
        <Link
          to="/profile"
          className="btn btn-outline w-40 btn-md font-mono mt-20 m-2"
        >
          To Profile
        </Link>
      </div>
      <AdventureCard user={user!} />
    </>
  );
}

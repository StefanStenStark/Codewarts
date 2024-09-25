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
      <div className="flex justify-center m-2">
        {/* <img src="./logo-white.png" width={200} /> */}
        <img src="./logo-scrollMono.png" width={200}></img>
      </div>
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
      <AdventureCard />
    </>
  );
}

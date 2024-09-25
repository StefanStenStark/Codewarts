import { createFileRoute } from "@tanstack/react-router";
import AdventureCard from "../components/adventures/adventureCard";
import { fetchUser } from "../data/Api";
import { useQuery } from "@tanstack/react-query";
import { User } from "./../data/types";
import GoToProfileButton from "../components/profile/GoToProfileButton";
import { SignedIn, SignOutButton } from "@clerk/clerk-react";

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
      <div className="font-serif text-3xl mt-8 pt-20 mb-10">
        <h1 className="text-4xl mb-10">Welcome {user?.name},</h1>
        <h2 className=" text-2xl">
          Learning code magic takes time and determination. <br></br>Even the
          most powerful code mages from house{" "}
          <span className="text-amber-300">{user?.house}</span> were once
          beginner spell casters.<br></br>
          <br /> Below you will see the quests awaiting you.<br></br> Click on
          the grimoire icon for some hints... good luck{" "}
        </h2>
      </div>
      <div className="mb-20">
        <SignedIn>
          <div className="absolute top-0 left-0 m-4">
            <SignOutButton>
              <img src="/logout.png" alt="logout" width={30} />
            </SignOutButton>
          </div>
        </SignedIn>
        <GoToProfileButton linkTo="/profile" text="Profile" />
      </div>

      <AdventureCard user={user!} />
    </>
  );
}

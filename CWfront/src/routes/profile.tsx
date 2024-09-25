import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../data/Api";
import LevelBar from "../components/levelBar";
import { User } from "../data/types";
import ChangeProfileModal from "../components/ChangeProfileModal";
import ChangeHouseModal from "../components/ChangeHouseModal";
import TalentModal from "../components/TalentModal";
import ReturnMapImage from "../components/ReturnMapImage";
import ReturnHeartImage from "../components/ReturnHeartImage";
import GoToAdventureButton from "../components/GoToAdventureButton";
import { SignOutButton, SignedIn } from "@clerk/clerk-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const fetchedUser = await fetchUser(5);
      setUser(fetchedUser);
      setLoading(false);
    }
    getUser();
  }, []);

  const updateUserProfile = async (newName: string, newAvatar: number) => {
    if (user) {
      const updatedUser = { ...user, name: newName, avatar: newAvatar };
      setUser(updatedUser);
      await updateUser(user.id, updatedUser);
    }
  };

  const updateUserHouse = async (newHouse: string) => {
    if (user) {
      const updatedUser = { ...user, house: newHouse };
      setUser(updatedUser);
      await updateUser(user.id, updatedUser);
    }
  };

  const updateUserSkills = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <>
      <section className="flex justify-between items-stretch p-6 bg-purple-950 bg-center bg-opacity-30">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <>
            <div className="relative w-1/2 p-6 bg-base-100 shadow-md">
              <div className="flex flex-col items-center">
                <SignedIn>
                  <div className="absolute top-0 left-0 m-4">
                    <SignOutButton>
                      <button className="bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-12 text-white font-bold py-2 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white rounded">
                        Sign out
                      </button>
                    </SignOutButton>
                  </div>
                </SignedIn>
                <h2 className="text-2xl font-bold text-center font-serif">
                  {user?.name}
                </h2>
                <h2 className="text-center font-serif ">of</h2>
                <h2 className="text-center text-xl font-semibold font-serif mb-8">
                  {user!.house}
                </h2>

                <div className="flex justify-center space-x-4">
                  <ChangeProfileModal
                    currentName={user?.name || ""}
                    currentProfile={user!.avatar}
                    onSave={updateUserProfile}
                  />

                  <ChangeHouseModal
                    currenHouse={user!.house}
                    onSave={updateUserHouse}
                  />
                </div>

                <div className="flex flex-row items-center mt-10 space-x-4">
                  <GoToAdventureButton linkTo="/adventures" text="Adventures" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center  pr-4 shadow-lg"></div>

            <div className="w-1/2 p-6 bg-base-100  shadow-lg text-left">
              <ReturnMapImage adventuresCompleted={user!.adventuresCompleted} />
              <LevelBar user={user!} />
              <TalentModal user={user!} onSave={updateUserSkills} />
              <ReturnHeartImage maxHearts={user!.maximumHearts} />
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;

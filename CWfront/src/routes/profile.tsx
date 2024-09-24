import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../data/Api";
import LevelBar from "../components/levelBar";
import { User } from "../data/types";
import ChangeProfileModal from "../components/ChangeProfileModal";
import ChangeHouseModal from "../components/ChangeHouseModal";
import TalentModal from "../components/TalentModal";
import ReturnMapImage from "../components/ReturnMapImage";
import ReturnHeartImage from "../components/ReturnHeartImage";

export const Route = createFileRoute("/profile")({
  component: Profile,
});
const svgPath =
  "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z";

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
      <section className="flex justify-between items-stretch p-6 bg-[url(./moroccan-flower-dark.png)] bg-center bg-opacity-30">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <>
            <div className="w-1/2 p-6 bg-base-100  shadow-md">
              <div className="flex flex-col items-center">
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
                  <Link
                    to="/adventures"
                    className="bg-transparent hover:bg-[rgba(255,246,85,0.55)] text-white hover:text-white border border-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={svgPath}
                      />
                    </svg>
                    <p>New adventure</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center  pr-4 shadow-lg"></div>

            <div className="w-1/2 p-6 bg-base-100  shadow-lg text-left">
              <ReturnMapImage adventuresCompleted={user!.adventuresCompleted} />
              <LevelBar experience={user!.experiencePoints} />
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

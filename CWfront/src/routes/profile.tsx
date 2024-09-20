import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchUser } from "../data/Api";
import LevelBar from "../components/levelBar";
import { User } from "../data/types";
import ReturnImages from "../components/returnImages";
import ChangeProfileModal from "../components/ChangeProfileModal";
import ChangeHouseModal from "../components/ChangeHouseModal";
import TalentModal from "../components/TalentModal";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
      setLoading(false);
    }
    getUser();
  }, []);

  const updateUserProfile = (newName: string, newAvatar: number) => {
    if (user) {
      setUser({ ...user, name: newName, avatar: newAvatar });
    }
  };
  const updateUserHouse = (newHouse: string) => {
    if (user) {
      setUser({ ...user, house: newHouse });
    }
  };

  return (
    <>
      <section className="flex justify-between items-stretch p-6">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <>
            <div className="w-1/2 p-6 bg-base-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2 text-center flex-1">
                {user?.name}
              </h2>

              <img
                src={`./Avatar${user?.avatar}.png`}
                alt="Profile"
                className="max-w-[150px] rounded-lg mt-4 mx-auto"
              />
              <ChangeProfileModal
                currentName={user?.name || ""}
                currentProfile={user!.avatar}
                onSave={updateUserProfile}
              />

              <hr />

              <p className="text-lg mb-4 text-center flex-1">{user!.house}</p>

              <img
                src={`./${user?.house}.png`}
                alt="House emblem"
                className="max-w-[150px] rounded-lg mt-4 mx-auto"
              />
              <ChangeHouseModal
                currenHouse={user!.house}
                onSave={updateUserHouse}
              />
            </div>

            <div className="w-1/2 p-6 bg-base-100 rounded-lg shadow-lg text-left">
              <p>Adventures completed: {user!.adventuresCompleted}</p>
              <ReturnImages
                howMany={user!.adventuresCompleted}
                image={`./${user?.house}.png`}
              />
              <p>Hearts: {user!.maximumHearts}</p>
              <ReturnImages howMany={user!.maximumHearts} image="./Heart.png" />
              <hr />
              <h2 className="text-xl font-semibold mb-2">
                Experience points: {user!.experiencePoints}
              </h2>
              <LevelBar experience={user!.experiencePoints} />
              <div className="flex justify-center mt-6">
                <img
                  src="./magicSkills.webp"
                  alt="adventure img"
                  className="h-40"
                />
                <TalentModal />
              </div>
              <div className="flex flex-row items-center mt-6 space-x-4">
                <img
                  src="./digital-art-magical-fairy.jpg"
                  alt="adventure img"
                  className="h-40 rounded-lg shadow-lg"
                />

                <Link
                  to="/adventures"
                  className="bg-blue-500 hover:bg-blue-600 h-40 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
                >
                  Adventure
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchUser } from "../data/Api";
import LevelBar from "../components/levelBar";
import { User } from "../data/types";
import ReturnImages from "../components/returnImages";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getUser() {
      setLoading(true);
      setUser(fetchUser());
      setLoading(false);
    }
    getUser();
  }, []);

  return (
    <>
      <section className="flex justify-between items-stretch p-6">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <>
            <div className="w-1/2 p-6 bg-base-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
              <img
                src="./profiletest.jpg"
                alt="Profile"
                className="max-w-[150px] rounded-lg mt-4 mx-auto"
              />
              <p className="text-lg mb-4">House: {user!.house}</p>
              <img
                src="./Ravenclaw.webp"
                alt="House emblem"
                className="max-w-[150px] rounded-lg mt-4 mx-auto"
              />
            </div>

            <div className="w-1/2 p-6 bg-base-100 rounded-lg shadow-lg text-left">
              <ReturnImages
                howMany={user!.adventuresCompleted}
                image="./MagicWant.png"
              />
              <hr />
              <h2 className="text-xl font-semibold mb-2">
                Experience points: {user!.experiencePoints}
              </h2>
              <LevelBar experience={user!.experiencePoints} />
              <ReturnImages
                howMany={user!.maximumHearts}
                image="./heart.webp"
              />
              <h1>Talento tree..</h1>
              <h1>Go go to adventure time..</h1>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;

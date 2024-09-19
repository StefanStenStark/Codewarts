import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchUser } from "../data/Api";
import LevelBar from "../components/levelBar";
import { User } from "../data/types";

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
              <h2 className="text-xl font-semibold mb-2">
                Adventures completed: {user!.adventuresCompleted}
              </h2>
              <hr />
              <h2 className="text-xl font-semibold mb-2">
                Experience points: {user!.experiencePoints}
              </h2>
              <LevelBar experience={user!.experiencePoints} />

              <div className="flex space-x-1">
                <p>Health: {user?.maximumHearts}</p>
                {(() => {
                  const hearts = [];
                  for (let i = 0; i < (user?.maximumHearts || 0); i++) {
                    hearts.push(
                      <img
                        key={i}
                        src="./heart.webp"
                        alt="Heart"
                        className="w-[30px] h-[30px]"
                      />
                    );
                  }
                  return hearts;
                })()}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;

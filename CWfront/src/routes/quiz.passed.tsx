import { createFileRoute } from "@tanstack/react-router";
import ValueBar from "../components/ValueBar";
import { useEffect, useState } from "react";
import { fetchUser } from "../data/Api";
import { User } from "../data/types";
import GoToAdventureButton from "../components/profile/GoToAdventureButton";

export const Route = createFileRoute("/quiz/passed")({
  component: () => <Passed />,
});

function Passed() {
  const [xp, setXp] = useState(0);
  const [gainedXP, setGainedXP] = useState(0);
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
  useEffect(() => {
    if (user) {
      setXp(user.experiencePoints);
    }
  }, [user]);

  useEffect(() => {
    const storedXP = localStorage.getItem("gainedXP");
    if (storedXP) {
      setGainedXP(parseInt(storedXP));
    }
  }, []);

  return (
    <main className="h-screen p-6 pt-8 grid place-items-center">
      <section className="prose text-center">
        <h1 className="font-serif font-bold text-4xl text-center">
          👏 <br /> Well done wizard/sorcerer!
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ValueBar gainedXP={gainedXP} initialValue={xp} label="Experience" />
        )}

        <p>
          You have completed the quest. <br /> Press continue and continue on
          with your adventure!
        </p>
        <div className="w-1/2 mx-auto">
          <GoToAdventureButton linkTo="/adventures" text="Continue" />
        </div>
      </section>
    </main>
  );
}

export default Passed;

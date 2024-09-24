import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Grimoire from "./grimoire";
import { fetchAdventures } from "../../data/Api";

const getAdventureImage = (id: number) => {
  const images: { [key: number]: string } = {
    1: "./tree.jpg",
    2: "./portal.jpg",
    3: "./school.jpg",
    4: "./keys.webp",
    5: "./library-data.jpg",
    // Add more id-to-image mappings here
  };
  return images[id] || "./tree.jpg"; // Fallback image if id is not found
};

export default function AdventureCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adventures"],
    queryFn: fetchAdventures,
  });

  if (isLoading) {
    return <div className="font-serif">Loading adventures...</div>;
  }

  if (isError) {
    return <div className="font-serif">Sorry no adventures were found</div>;
  }
  return (
    <>
      {data?.map((adventure) => (
        <div
          key={adventure.id}
          className="card card-side bg-purple-950 shadow-xl h-96 m-8"
        >
          <figure className="w-96 h-96">
            <img
              src={getAdventureImage(adventure.id)}
              alt={`${adventure.name} image`}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body w-96">
            <p className="badge badge-outline badge-xs font-mono m-2">
              Level: {adventure.level}
            </p>
            <h2 className="card-title text-left text-3xl font-serif m-2">
              {adventure.name}
            </h2>

            <p className="text-left font-serif m-2">{adventure.description}</p>

            <div className="cursor-pointer transition-transform transform hover:scale-105 ease-in-out duration-300 ms-6 m-2">
              <Grimoire adventure={adventure} />
            </div>

            <div className="card-actions justify-end">
              <div>
                <Link
                  to={adventure.level > 1 ? "#" : "/quiz/$quizId"}
                  params={{ quizId: "2" }}
                >
                  <button
                    className={`btn btn-warning m-2 font-mono ${
                      adventure.level > 1 ? "btn-disabled opacity-50" : ""
                    }`}
                    disabled={adventure.level > 2}
                  >
                    <img src="./magic-wand-cursor.png" width={12} alt="wand" />
                    Start Quest
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

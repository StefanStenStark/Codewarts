import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Grimoire from "./grimoire";
import { fetchAdventures } from "../../data/Api";

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
    <div className="m-20">
      {data?.map((adventure) => (
        <>
          <div
            key={adventure.id}
            className="card card-side bg-base-100 shadow-xl m-2"
          >
            <figure>
              <img
                src="./magicSkills.webp"
                alt="adventure img"
                className="h-60"
              />
            </figure>

            <div className="card-body">
              <p className="badge badge-outline badge-sm font-mono">
                Level: {adventure.level}
              </p>
              <h2 className="card-title text-left font-serif">
                {adventure.name}
              </h2>

              <p className="text-left font-serif">{adventure.description}</p>

              <div className="cursor-pointer p-2 transition-transform transform hover:scale-105 ease-in-out duration-300">
                <Grimoire adventure={adventure} />
              </div>

              <div className="card-actions justify-end">
                <div>
                  <Link to="/">
                    <button className="btn btn-ghost m-2 font-mono">
                      Abort Mission
                    </button>
                  </Link>
                  <Link
                    to={adventure.level > 2 ? "#" : "/quiz/$quizId"}
                    params={{ quizId: "2" }}
                  >
                    <button
                      className={`btn btn-primary m-2 font-mono ${
                        adventure.level > 1 ? "btn-disabled opacity-50" : ""
                      }`}
                      disabled={adventure.level > 2}
                    >
                      <img
                        src="./magic-wand-cursor.png"
                        width={12}
                        alt="wand"
                      />
                      Start Quest
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
      <a
        className="text-xs text-zinc-800"
        href="https://www.flaticon.com/free-icons/magic-book"
        title="magic book icons"
      >
        Magic book icons created by designbydai - Flaticon
      </a>
    </div>
  );
}

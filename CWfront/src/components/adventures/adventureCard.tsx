import { useQuery } from "@tanstack/react-query";
import { fetchAdventures } from "./adventureAPI";
import { Link } from "@tanstack/react-router";

export default function AdventureCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adventures"],
    queryFn: fetchAdventures,
  });

  if (isLoading) {
    return <div>Loading adventures...</div>;
  }

  if (isError) {
    return <div>Sorry no adventures were found</div>;
  }
  return (
    <div className="m-10">
      {data?.map((adventure) => (
        <div
          key={adventure.id}
          className="card card-side bg-base-100 shadow-xl m-2"
        >
          <figure>
            <img
              src="../src/Assets/digital-art-magical-fairy.jpg"
              alt="adventure img"
              className="w-72"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title text-left">{adventure.name}</h2>
            <p className="text-left">{adventure.description}</p>
            <p className="badge badge-info">Level: {adventure.level}</p>
            <div className="card-actions justify-end">
              <Link to="/questions">
                <button className="btn btn-primary">Start Quest</button>
              </Link>
              <Link to="/">
                <button className="btn btn-ghost">Abort Mission</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <a
        href="https://www.flaticon.com/free-icons/magic-book"
        title="magic book icons"
      >
        Magic book icons created by designbydai - Flaticon
      </a>
    </div>
  );
}

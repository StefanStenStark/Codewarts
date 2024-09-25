import { Link } from "@tanstack/react-router";

export default function GoToProfileButton({
  linkTo,
  text,
}: {
  linkTo: string;
  text: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center mt-10 space-x-4">
        <Link
          to={linkTo}
          className="bg-transparent hover:bg-[rgba(255,246,85,0.55)] text-white hover:text-white border border-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 mr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>

          <p>{text}</p>
        </Link>
      </div>
    </>
  );
}

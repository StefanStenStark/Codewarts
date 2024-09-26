import { Link } from "@tanstack/react-router";

export default function GoToAdventureButton({
  linkTo,
  text,
}: {
  linkTo: string;
  text: string;
}) {
  const svgPath =
    "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z";

  return (
    <>
      <div className="w-full">
        <Link
          to={linkTo}
          className="bg-transparent text-white hover:text-white border border-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center w-full"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 mr-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
          </svg>
          <p className="leading-none">{text}</p>
        </Link>
      </div>
    </>
  );
}

export default function ReturnHeartImage({ maxHearts }: { maxHearts: number }) {
  const svgPath =
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-t-full border border-current mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
        </svg>
      </div>

      <hr className="w-full border border-gray-300 mb-4" />

      <div className="flex justify-center items-center space-x-1 mb-10">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
          </svg>
        ))}
      </div>
    </div>
  );
}

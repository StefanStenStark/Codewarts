export default function ReturnMapImage({
  adventuresCompleted,
}: {
  adventuresCompleted: number;
}) {
  const svgPath =
    "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-t-full border border-current mt-2">
        {" "}
        <svg
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
        {Array.from({ length: adventuresCompleted }).map((_, i) => (
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

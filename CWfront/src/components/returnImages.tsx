export default function RaturnImages({
  howMany,
  image,
}: {
  howMany: number;
  image: string;
}) {
  return (
    <div className="flex space-x-1">
      <p>Adventures completed: {howMany}</p>
      {(() => {
        const hearts = [];
        for (let i = 0; i < (howMany || 0); i++) {
          hearts.push(
            <img
              key={i}
              src={image}
              alt="Heart"
              className="w-[30px] h-[30px]"
            />
          );
        }
        return hearts;
      })()}
    </div>
  );
}

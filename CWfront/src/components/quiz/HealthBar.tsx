export default function HealthBar({ heartsCount }: { heartsCount: number }) {
  return (
    <div className="flex gap-4 justify-center">
      {Array(heartsCount)
        .fill(0)
        .map((_, i) => (
          <HeartIcon key={i} />
        ))}
    </div>
  );
}

const HeartIcon = () => <img src="/pixel-heart-sm.png" />;

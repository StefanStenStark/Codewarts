export default function LevelBar() {
  return (
    <div className="w-full max-w-md bg-base-200 rounded-3xl p-6 pb-8 flex gap-6 items-center prose">
      <BoltIcon />
      <div className="w-full">
        <div className="flex justify-between font-medium">
          <span>Level 5</span>
          <span>300/500 XP</span>
        </div>
        <progress
          className="progress progress-secondary font-mono"
          value="50"
          max="100"
        ></progress>
      </div>
    </div>
  );
}

const BoltIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="fill-secondary"
    width="32"
    height="32"
    viewBox="0 0 448 512"
  >
    <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z" />
  </svg>
);

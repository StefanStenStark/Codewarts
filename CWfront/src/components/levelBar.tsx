export default function LevelBar({ experience }: { experience: number }) {
  const getLevelAndProgress = (experience: number) => {
    let level = 1;
    let minXP = 0;
    let maxXP = 1000;

    if (experience >= 1000 && experience < 2500) {
      level = 2;
      minXP = 1000;
      maxXP = 2500;
    } else if (experience >= 2500 && experience < 4000) {
      level = 3;
      minXP = 2500;
      maxXP = 4000;
    } else if (experience >= 4000 && experience < 6000) {
      level = 4;
      minXP = 4000;
      maxXP = 6000;
    } else if (experience >= 6000) {
      level = 5;
      minXP = 6000;
      maxXP = 10000;
    }

    const progress = ((experience - minXP) / (maxXP - minXP)) * 100;
    return { level, progress };
  };

  const levelData = getLevelAndProgress(experience);

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">
        Current Level: {levelData.level}
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${levelData.progress}%` }}
        ></div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { User } from "../data/types";
import { updateUser } from "../data/Api";

export default function LevelBar({ user }: { user: User }) {
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
    } else if (experience >= 6000 && experience < 10000) {
      level = 5;
      minXP = 6000;
      maxXP = 10000;
    } else if (experience >= 10000 && experience < 15000) {
      level = 6;
      minXP = 10000;
      maxXP = 15000;
    } else if (experience >= 15000) {
      level = 7;
      minXP = 15000;
      maxXP = 9999999999;
    }

    const progress = ((experience - minXP) / (maxXP - minXP)) * 100;
    return { level, progress, minXP, maxXP };
  };

  const levelData = getLevelAndProgress(user.experiencePoints);

  useEffect(() => {
    async function updateUserLevel() {
      if (user) {
        const { level } = getLevelAndProgress(user.experiencePoints);

        if (user.level !== level) {
          const updatedUser = { ...user, level };
          await updateUser(user.id, updatedUser);
        }
      }
    }

    updateUserLevel();
  }, [user]);

  return (
    <>
      <div className="flex justify-center">
        <p className="text-center border border-gray-300 rounded-t-full px-2 inline-block">
          {levelData.level}
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 relative">
        <div
          className="bg-orange-200 h-4 rounded-full border border-black"
          style={{ width: `${levelData.progress}%` }}
        ></div>
        <p className="absolute inset-0 text-black text-xs font-semibold text-center flex items-center justify-center">
          XP: {user.experiencePoints} / {levelData.maxXP}
        </p>
      </div>
    </>
  );
}

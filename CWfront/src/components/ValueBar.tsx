import { useEffect, useState } from "react";

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
    maxXP = 800000;
  }

  return { level, minXP, maxXP };
};

function ValueBar({
  gainedXP,
  initialValue,
  label,
}: {
  gainedXP: number;
  initialValue: number;
  label: string;
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const modifiedInitialValue = initialValue - gainedXP;
  const finalValue = modifiedInitialValue + gainedXP;
  const { level, minXP, maxXP } = getLevelAndProgress(finalValue);

  useEffect(() => {
    let animationFrame: number;

    const animateValue = () => {
      setCurrentValue((prevValue) => {
        const nextValue = prevValue + 1;

        if (nextValue >= gainedXP) {
          return gainedXP;
        }

        return nextValue;
      });

      animationFrame = requestAnimationFrame(animateValue);
    };

    animationFrame = requestAnimationFrame(animateValue);

    return () => cancelAnimationFrame(animationFrame);
  }, [gainedXP]);

  const progress =
    ((modifiedInitialValue + currentValue - minXP) / (maxXP - minXP)) * 100;

  return (
    <>
      <h2>Gained: {currentValue} XP</h2>
      <div className="w-full bg-gray-200 rounded-full h-7 relative">
        <p className="absolute inset-0 text-black text-xs font-semibold flex items-center justify-center">
          {label}: {modifiedInitialValue + currentValue} / {maxXP} | Level:{" "}
          {level}
        </p>
        <div
          className="bg-orange-200 h-7 rounded-full border border-black"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </>
  );
}

export default ValueBar;

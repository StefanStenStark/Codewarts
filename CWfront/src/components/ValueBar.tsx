import { useEffect, useState } from "react";
import "../styles/animations.css";

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

  const [svgPositions, setSvgPositions] = useState<
    { top: number; left: number; scale: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generateRandomPositions = () => {
      const positions = [];
      for (let i = 0; i < 30; i++) {
        const top = Math.random() * 80;
        const left =
          Math.random() > 0.5 ? Math.random() * 20 : Math.random() * 20 + 55;
        const scale = Math.random() * 1.5 + 0.5;
        const delay = Math.random() * 5;
        positions.push({ top, left, scale, delay });
      }
      return positions;
    };

    setSvgPositions(generateRandomPositions());
  }, []);

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

  const h2Style = {
    borderTop: currentValue === gainedXP ? "4px solid gold" : "none",
    borderRadius: "50% 50% 0 0",
    backgroundColor: "transparent",
    transition: "border 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
    paddingTop: "20px",
    paddingBottom: "5px",
    fontSize: "16px",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "inline-block",
    margin: "0 auto",
    boxShadow:
      currentValue === gainedXP ? "0 -5px 15px rgba(255, 215, 0, 0.7)" : "none",
  };

  const svg = (delay: number) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="purple"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="gold"
      className="w-6 h-6 text-gold animate-blink"
      style={{
        animation: `fade 2s ease-in-out infinite`,
        animationDelay: `${delay}s`, // Apply random delay for blinking effect
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );

  return (
    <>
      {svgPositions.map((position, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${position.top}vh`,
            left: `${position.left}vw`,
            transform: `scale(${position.scale})`,
          }}
        >
          {svg(position.delay)}
        </div>
      ))}

      <div style={h2Style} className="flex flex-row">
        <h5>XP gained:</h5>
        <h2 style={{ margin: 5 }}> {currentValue}</h2>
      </div>
      <div
        className="w-full bg-gray-200 rounded-full h-7 relative"
        style={{
          boxShadow:
            currentValue === gainedXP
              ? "0 0 15px 5px rgba(255, 215, 0, 0.7)"
              : "none",
          transition: "box-shadow 0.5s ease-in-out",
        }}
      >
        <p className="absolute inset-0 text-black text-xs font-semibold flex items-center justify-center">
          {label}: {modifiedInitialValue + currentValue} / {maxXP} | Level:{" "}
          {level}
        </p>
        <div
          className="bg-orange-200 h-7 rounded-full border border-black"
          style={{
            width: `${Math.min(progress, 100)}%`,
            boxShadow:
              currentValue === gainedXP
                ? "0 0 10px 2px rgba(255, 215, 0, 0.7)"
                : "none",
            transition: "box-shadow 0.5s ease-in-out",
          }}
        ></div>
      </div>
    </>
  );
}

export default ValueBar;

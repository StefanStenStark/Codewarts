import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../styles/BlinkingLogo.css";

const BlinkingLogo: React.FC = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  const [showSvgs, setShowSvgs] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const svgDelays: number[] = [0, 200, 1000, 1500];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowSvgs(false), 2000);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  interface Position {
    top: string;
    left: string;
  }

  const renderBlinkingSvg = (
    position: Position,
    delay: number
  ): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="purple"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="gold"
      className={`w-6 h-6 text-gold animate-blink ${fadeOut ? "fade-out" : ""}`}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        animation: `fade 3s ease-in-out 2 forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
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
    <div style={{ position: "relative", textAlign: "center" }}>
      {isIndexPage &&
        showSvgs &&
        renderBlinkingSvg({ top: "30%", left: "25%" }, svgDelays[0])}
      {isIndexPage &&
        showSvgs &&
        renderBlinkingSvg({ top: "30%", left: "75%" }, svgDelays[1])}
      {isIndexPage &&
        showSvgs &&
        renderBlinkingSvg({ top: "80%", left: "120%" }, svgDelays[2])}
      {isIndexPage &&
        showSvgs &&
        renderBlinkingSvg({ top: "100%", left: "10%" }, svgDelays[3])}
      <Link to="/" className="[&.active]:font-bold z-50 ">
        <img
          src="./logo-gold.png"
          width={160}
          alt="Logo"
          style={{ position: "relative", zIndex: 10 }}
        />
      </Link>
    </div>
  );
};

export default BlinkingLogo;

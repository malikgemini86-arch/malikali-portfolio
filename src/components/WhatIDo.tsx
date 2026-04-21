import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WHAT_I_DO_CARDS = [
  {
    title: "AI VISUAL DIRECTION",
    description: "Scripts to hyper-realistic cinematic videos.",
  },
  {
    title: "AI FASHION & VIRTUAL TRY-ON",
    description: "Virtual clothing transformations for brands.",
  },
  {
    title: "YOUTUBE ENGINE TUNING",
    description: "Full channel SEO and monetization management.",
  },
  {
    title: "MASTER PROMPT ENGINEERING",
    description: "Rules for brand visual consistency.",
  },
  {
    title: "AI WEB DEVELOPMENT",
    description: "Building premium 3D landing pages using Cursor.",
  },
] as const;

const borderLinesFull = (
  <>
    <line
      x1="0"
      y1="0"
      x2="100%"
      y2="0"
      stroke="white"
      strokeWidth="2"
      strokeDasharray="6,6"
    />
    <line
      x1="0"
      y1="100%"
      x2="100%"
      y2="100%"
      stroke="white"
      strokeWidth="2"
      strokeDasharray="6,6"
    />
  </>
);

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (!ScrollTrigger.isTouch) return;
    const cleanups: (() => void)[] = [];
    containerRef.current.forEach((container) => {
      if (!container) return;
      container.classList.remove("what-noTouch");
      const onClick = () => handleClick(container);
      container.addEventListener("click", onClick);
      cleanups.push(() => container.removeEventListener("click", onClick));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div className="what-cards-grid">
            {WHAT_I_DO_CARDS.map((card, index) => (
              <div
                key={card.title}
                className="what-content what-noTouch"
                ref={(el) => setRef(el, index)}
              >
                <div className="what-border1">
                  <svg height="100%">{borderLinesFull}</svg>
                </div>
                <div className="what-corner"></div>
                <div className="what-content-in">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="what-arrow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  const parent = container.parentElement;
  if (!parent) return;
  const expanded = container.classList.contains("what-content-active");
  Array.from(parent.children).forEach((sibling) => {
    if (sibling === container) return;
    sibling.classList.remove("what-content-active");
    sibling.classList.toggle("what-sibling", expanded);
  });
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./styles/Landing.css";

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Split text for animation
    const text = "MALIK ALI";
    const chars = text.split("");
    
    // Create split text HTML
    heroRef.current.innerHTML = chars.map((char, i) => 
      `<span class="hero-char" style="display: inline-block; overflow: hidden;">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");

    // GSAP split-text animation - slide up from overflow
    gsap.fromTo(
      ".hero-char",
      { 
        opacity: 0, 
        y: 100,
        rotationX: 90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.05,
        delay: 0.2
      }
    );

    // Elastic entrance for subtitle
    gsap.fromTo(
      ".hero-subtitle",
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: "elastic.out(1, 0.5)"
      }
    );
  }, []);

  return (
    <div className="landing-section" id="landingDiv">
      <div className="hero-container">
        <div className="hero-content" ref={heroRef}>
          <div className="hero-title">
            {/* Split text will be inserted here by JS */}
            <div className="hero-text">MALIK ALI</div>
          </div>
          <div className="hero-subtitle">
            Premium AI Visual Director
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

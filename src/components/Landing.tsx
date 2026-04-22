import { useEffect } from "react";
import { gsap } from "gsap";
import "./styles/Landing.css";

const Landing = () => {
  useEffect(() => {
    // Name entrance animation with stagger
    gsap.fromTo(
      ".landing-intro h2",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05
      }
    );

    gsap.fromTo(
      ".landing-intro h1",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
      }
    );

    gsap.fromTo(
      ".landing-info h3",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        delay: 0.3
      }
    );

    gsap.fromTo(
      ".landing-title-word",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05
      }
    );
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MALIK
              <br />
              <span>ALI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Premium AI</h3>
            <div className="landing-title">
              <div className="landing-title-main">
                <span className="landing-title-word">Visual</span>
                <span className="landing-title-word">Director</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

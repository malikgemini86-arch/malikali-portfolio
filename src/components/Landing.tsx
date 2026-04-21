import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
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
        {children}
      </div>
    </>
  );
};

export default Landing;

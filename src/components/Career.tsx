import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Visual Storyteller & Motion Designer</h4>
                <h5>Digital Media Labs</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Crafted viral interactive narratives using a hybrid pipeline of Sora/Luma and After Effects for seamless visual consistency.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Content Architect (Exit)</h4>
                <h5>Automated Ventures</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Scaled and sold faceless channels by bridging the gap between AI video tools and professional editing workflows for maximum retention.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior AI Compositor & Editor</h4>
                <h5>Independent Creative</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Combining Generative AI with Adobe After Effects for high-end post-production. Expert in motion graphics, VFX cleanup, and cinematic color grading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

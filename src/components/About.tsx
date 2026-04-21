import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="about-body">
          <p className="para">
            Hi, I&apos;m Ali—an AI Visual Director and Digital Content Strategist.
            I engineer sophisticated visual experiences through strict, rule-based
            prompting and precise aesthetic control.
          </p>
          <ul className="about-highlights" aria-label="Focus areas">
            <li>
              Hyper-realistic AI fashion lookbooks and cinematic brand campaigns.
            </li>
            <li>
              Full YouTube architecture—SEO, content systems, and monetization—for
              US and UK markets.
            </li>
            <li>
              Advanced AI workflows fused with high-end post-production to elevate
              your brand.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

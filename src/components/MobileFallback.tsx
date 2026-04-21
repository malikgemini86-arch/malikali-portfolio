import { useEffect } from "react";
import "./styles/MobileFallback.css";

const MobileFallback = () => {
  useEffect(() => {
    // Auto-hide loader after 3 seconds
    const timer = setTimeout(() => {
      const loadingElement = document.querySelector('.loading-screen');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-fallback">
      <div className="mobile-fallback-content">
        <h1 className="mobile-title">MALIK ALI</h1>
        <h2 className="mobile-subtitle">Premium AI Visual Director</h2>
        <div className="mobile-description">
          <p>Welcome to my portfolio</p>
          <p>Experience cutting-edge AI visuals and digital content strategy</p>
        </div>
        <div className="mobile-features">
          <div className="feature">
            <h3>🎨 Visual Design</h3>
            <p>Fashion lookbooks & campaigns</p>
          </div>
          <div className="feature">
            <h3>🚀 Content Strategy</h3>
            <p>YouTube architecture & monetization</p>
          </div>
          <div className="feature">
            <h3>💡 AI Innovation</h3>
            <p>Hyper-realistic AI generation</p>
          </div>
        </div>
        <div className="mobile-cta">
          <p>Scroll down to explore my work</p>
        </div>
      </div>
    </div>
  );
};

export default MobileFallback;

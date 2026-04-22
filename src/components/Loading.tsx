import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0);

  
  // Fail-safe: if stuck at 0% for 2 seconds, start fake progress
  useEffect(() => {
    let stuckTimer: number;
    let forceCompleteTimer: number;
    
    if (percent === 0 && !isStuck) {
      stuckTimer = window.setTimeout(() => {
        setIsStuck(true);
        setFakeProgress(1);
        
        // Force complete after 4 seconds total
        forceCompleteTimer = window.setTimeout(() => {
          setFakeProgress(100);
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }, 2000);
      }, 2000);
    } else if (percent > 0) {
      setIsStuck(false);
      setFakeProgress(0);
    }

    return () => {
      if (stuckTimer) clearTimeout(stuckTimer);
      if (forceCompleteTimer) clearTimeout(forceCompleteTimer);
    };
  }, [percent, isStuck]);

  // Smooth fake progress animation
  useEffect(() => {
    if (isStuck && fakeProgress < 100) {
      const interval = setInterval(() => {
        setFakeProgress(prev => {
          const next = prev + Math.random() * 3 + 1;
          return next >= 100 ? 100 : next;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isStuck, fakeProgress]);

  const displayPercent = isStuck || fakeProgress > 0 ? fakeProgress : percent;

  if (displayPercent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div id="global-loader" className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          MALIK ALI
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen" style={{ backgroundColor: 'white' }}>
        <div className="loading-marquee">
          <Marquee>
            <span> PREMIUM AI VISUALS · MALIK ALI · CONTENT CREATOR</span> 
            <span> PREMIUM AI VISUALS · MALIK ALI · CONTENT CREATOR</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.round(displayPercent)}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};

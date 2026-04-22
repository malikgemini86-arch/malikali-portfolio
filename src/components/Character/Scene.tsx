import { useEffect } from "react";
import DesktopModel from "./DesktopModel";
import MobileModel from "./MobileModel";

const Scene = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // Empty effect for component lifecycle
  }, []);

  return (
    <>
      {isMobile ? <MobileModel /> : <DesktopModel />}
    </>
  );
};

export default Scene;

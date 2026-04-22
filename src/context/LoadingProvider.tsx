import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const [forceClose, setForceClose] = useState(false);

  // Mobile bypass: Completely disable loader on mobile to prevent 3D crashes
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) {
    return <>{children}</>;
  }

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {
    // Strict safety timeout: Force complete in 3 seconds if stuck at 0%
    const safetyTimeout = setTimeout(() => {
      if (loading < 100) {
        setLoading(100);
        setIsLoading(false);
      }
    }, 3000);
    
    return () => clearTimeout(safetyTimeout);
  }, [loading]);

  // NUCLEAR OPTION: Independent timeout that completely ignores progress
  useEffect(() => {
    const nuclearTimeout = setTimeout(() => {
      setForceClose(true);
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(nuclearTimeout);
  }, []); // Empty dependency array - runs once and never depends on progress

  // PURE CSS GPU-ACCELERATED REMOVAL: Inject CSS animation directly
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes killLoader {
        0%, 99% { opacity: 1; visibility: visible; z-index: 9999; }
        100% { opacity: 0; visibility: hidden; z-index: -9999; display: none; }
      }
      #global-loader {
        animation: killLoader 3.5s forwards;
      }
    `;
    document.head.appendChild(style);
    
    const vanillaTimeout = setTimeout(() => {
      const loader = document.getElementById('global-loader');
      if (loader) {
        loader.style.display = 'none';
      }
    }, 3500);
    
    return () => clearTimeout(vanillaTimeout);
  }, []); // Empty dependency array - runs once and never depends on progress

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {!forceClose && isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

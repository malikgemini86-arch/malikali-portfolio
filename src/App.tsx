import { lazy, Suspense, useEffect } from "react";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  useEffect(() => {
    // Empty effect for component lifecycle
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={null}>
          <MainContainer />
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;

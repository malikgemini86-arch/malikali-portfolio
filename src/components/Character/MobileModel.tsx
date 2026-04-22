import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Bounds, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

function Model() {
  const mobileScene = useGLTF("/models/mobile-character.glb");
  
  return (
    <Bounds fit clip observe>
      <Center>
        <primitive object={mobileScene.scene} />
      </Center>
    </Bounds>
  );
}

function DiagnosticCube() {
  return (
    <mesh position={[0, 0, -2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
}

const MobileModel = () => {
  return (
    <div className="character-container" style={{ zIndex: 50 }}>
      <div className="character-model">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "low-power"
          }}
          dpr={Math.min(window.devicePixelRatio, 1.2)}
        >
          <Suspense fallback={null}>
            {/* Lighting for Tripo3D models */}
            <Environment preset="city" />
            <directionalLight position={[0, 10, 5]} intensity={3} color="white" />
            
            {/* Auto-scaling model */}
            <Model />
            
            {/* Diagnostic hot pink cube */}
            <DiagnosticCube />
          </Suspense>
        </Canvas>
        <div className="character-rim"></div>
        <div className="character-hover"></div>
      </div>
    </div>
  );
};

export default MobileModel;

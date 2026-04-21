import * as THREE from "three";
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";
import "./styles/TechStack.css";

// Tech Stack Component
const TechStack = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      {isMobile ? (
        // Mobile: Clean horizontal row - no cards, no backgrounds
        <div className="mobile-tech-row">
          <div className="tech-item">
            <img src="/images/ae.png" alt="After Effects" className="tech-icon" />
            <span className="tech-name">After Effects</span>
          </div>
          <div className="tech-item">
            <img src="/images/pr.png" alt="Premiere Pro" className="tech-icon" />
            <span className="tech-name">Premiere Pro</span>
          </div>
          <div className="tech-item">
            <img src="/images/grok.png" alt="Grok" className="tech-icon" />
            <span className="tech-name">Grok</span>
          </div>
          <div className="tech-item">
            <img src="/images/sora.png" alt="Sora" className="tech-icon" />
            <span className="tech-name">Sora</span>
          </div>
          <div className="tech-item">
            <img src="/images/veo.png" alt="Veo" className="tech-icon" />
            <span className="tech-name">Veo</span>
          </div>
          <div className="tech-item">
            <img src="/images/youtube.png" alt="YouTube" className="tech-icon" />
            <span className="tech-name">YouTube</span>
          </div>
        </div>
      ) : (
        // Desktop: Full 3D Canvas
        <Canvas
          shadows={window.innerWidth >= 768}
          gl={{ 
            alpha: true, 
            stencil: false, 
            depth: true, 
            antialias: window.innerWidth >= 768
          }}
          dpr={window.innerWidth >= 768 ? [1, 1.5] : 1}
          camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 1000 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          {window.innerWidth >= 768 && (
            <>
              <ambientLight intensity={1} />
              <spotLight
                position={[20, 20, 25]}
                penumbra={1}
                angle={0.2}
                color="white"
                castShadow
                shadow-mapSize={[512, 512]}
              />
              <directionalLight position={[10, 10, 10]} intensity={3} />
              <Pointer isActive={false} />
              <Suspense fallback={null}>
                <TechModels />
              </Suspense>
              {window.innerWidth > 768 && (
                <EffectComposer>
                  <N8AO aoRadius={6} intensity={2} />
                </EffectComposer>
              )}
            </>
          )}
        </Canvas>
      )}
    </div>
  );
};

// Pointer Component
const Pointer = ({ isActive }: { isActive: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current && isActive) {
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        state.mouse.x * 10,
        0.1
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        state.mouse.y * 10,
        0.1
      );
    }
  });
  return (
    <RigidBody type="kinematicPosition" colliders={false}>
      <CylinderCollider args={[2, 2]} />
    </RigidBody>
  );
};

// Tech Models Component
const TechModels = () => {
  const isMobile = window.innerWidth < 768;
  const sphereSegments: [number, number, number] = isMobile ? [1, 12, 12] : [1, 32, 32];

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={sphereSegments} />
          <meshStandardMaterial color="#666" transparent={true} depthWrite={true} depthTest={true} />
        </mesh>
      </Float>
    </>
  );
};

export default TechStack;

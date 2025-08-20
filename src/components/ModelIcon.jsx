import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Model yuklovchi component
const Model = ({ path }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={2.5} />;
};

// Har bir icon uchun mini 3D canvas
const ModelIcon = ({ modelPath }) => {
  return (
    <div className="w-20 h-20">
      <Canvas camera={{ position: [3, 3, 3], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Suspense fallback={null}>
          <Model path={modelPath} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

export default ModelIcon;

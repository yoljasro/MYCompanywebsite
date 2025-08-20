import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

// 3D model komponenti
function ServiceModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

const services = [
  {
    title: "IT Xizmatlari",
    description: "Biznesingiz uchun dasturiy ta'minot va avtomatlashtirish.",
    modelUrl:
      "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
  },
  {
    title: "Marketing Xizmatlari",
    description: "Raqamli marketing, SEO va SMM xizmatlari.",
    modelUrl:
      "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Avocado/glTF/Avocado.gltf",
  },
  {
    title: "Investitsiya Loyihalari",
    description: "Kapitalingizni samarali investitsiya qilish imkoniyatlari.",
    modelUrl:
      "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Duck/glTF/Duck.gltf",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Bizning Xizmatlar</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="w-full h-64">
              <Canvas>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} />
                <Stage environment="city" intensity={0.6}>
                  <ServiceModel url={service.modelUrl} />
                </Stage>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
            <h2 className="text-xl font-semibold mt-4">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
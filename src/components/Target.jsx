import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Target = ({ position = [-6.5, -1.5, -2], ...props }) => {
  const targetRef = useRef();
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf"
  );

  // Yengil tebranish — cleanup bor
  useGSAP(
    () => {
      if (!targetRef.current) return;
      const tween = gsap.to(targetRef.current.position, {
        y: position[1] + 0.5,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      return () => tween.kill();
    },
    { dependencies: [position] }
  );

  return (
    <group ref={targetRef} position={position} rotation={[0, Math.PI / 5, 0]} scale={1.5} {...props}>
      <primitive object={scene} />
    </group>
  );
};

export default Target;

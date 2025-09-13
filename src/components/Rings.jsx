import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useCallback, useRef } from "react";
import { Center, useTexture } from "@react-three/drei";

const Rings = ({ position = [-7, 2, -2] }) => {
  const refList = useRef([]);
  const addRef = useCallback((m) => {
    if (m && !refList.current.includes(m)) refList.current.push(m);
  }, []);

  const texture = useTexture("/textures/rings.png");

  useGSAP(
    () => {
      if (!refList.current.length) return;
      refList.current.forEach((r) => r.position.set(position[0], position[1], position[2]));
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      tl.to(
        refList.current.map((r) => r.rotation),
        {
          y: `+=${Math.PI * 2}`,
          x: `-=${Math.PI * 2}`,
          duration: 5.5,
          stagger: { each: 0.2 },
          ease: "none",
        }
      );
      return () => tl.kill();
    },
    { dependencies: [position] }
  );

  return (
    <Center>
      <group scale={0.5}>
        {Array.from({ length: 4 }, (_, i) => (
          <mesh key={i} ref={addRef}>
            <torusGeometry args={[(i + 1) * 0.5, 0.1, 24, 64]} />
            {/* Matcap engil material */}
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Center>
  );
};

export default Rings;

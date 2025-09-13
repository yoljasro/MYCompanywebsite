import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useMemo } from "react";
import { Float, useGLTF, useTexture } from "@react-three/drei";

const Cube = ({ position = [9, -4, 0], ...props }) => {
  const { nodes } = useGLTF("/models/cube.glb");
  const texture = useTexture("/textures/cube.png");

  // sRGB ko‘rsatish (ba’zi brauzerlarda rang to‘g‘risi)
  useMemo(() => {
    if (texture) {
      texture.colorSpace = "srgb";
    }
  }, [texture]);

  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Infinite rotation — to‘xtamasdan ishlaydi; cleanup bor
  useGSAP(
    () => {
      if (!cubeRef.current) return;
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(cubeRef.current.rotation, { y: `+=${Math.PI * 2}`, duration: 6 })
        .to(cubeRef.current.rotation, { x: `-=${Math.PI * 2}`, duration: 6 }, 0);
      return () => tl.kill();
    },
    { dependencies: [] }
  );

  return (
    <Float floatIntensity={hovered ? 2.2 : 1.2} speed={hovered ? 2.2 : 1.4}>
      <group
        position={position}
        rotation={[2.6, 0.8, -1.8]}
        scale={hovered ? 0.88 : 0.74}
        dispose={null}
        {...props}
      >
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {/* Matcap bilan engil va chiroyli */}
          <meshMatcapMaterial matcap={texture} toneMapped={false} color={hovered ? "#a855f7" : "#ffffff"} />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload("/models/cube.glb");
export default Cube;

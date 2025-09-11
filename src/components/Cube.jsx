import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';

const Cube = ({ ...props }) => {
  const { nodes } = useGLTF('models/cube.glb');
  const texture = useTexture('textures/cube.png');

  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animatsiya (memory leak bo‘lmasligi uchun cleanup bilan)
  useGSAP(() => {
    if (!cubeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, repeatDelay: 0.4 })
        .to(cubeRef.current.rotation, {
          y: hovered ? '+=2' : `+=${Math.PI * 2}`,
          x: hovered ? '+=1.6' : `-=${Math.PI * 2}`,
          duration: hovered ? 3.2 : 2.3,
          ease: 'power1.inOut',
        });
    }, cubeRef);

    return () => ctx.revert();
  }, [hovered]);

  return (
    <Float floatIntensity={hovered ? 3 : 1.6} speed={hovered ? 3.5 : 2}>
      <group
        position={[9, -4, 0]}
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
          <meshMatcapMaterial
            matcap={texture}
            toneMapped={false}
            color={hovered ? '#a855f7' : '#ffffff'}
          />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload('models/cube.glb');

export default Cube;

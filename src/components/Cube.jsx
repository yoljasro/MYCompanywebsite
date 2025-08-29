import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';

const Cube = ({ ...props }) => {
  const { nodes } = useGLTF('models/cube.glb');
  const texture = useTexture('textures/cube.png');

  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animatsiya
  useGSAP(() => {
    if (!cubeRef.current) return;

    gsap.timeline({ repeat: -1, repeatDelay: 0.4 })
      .to(cubeRef.current.rotation, {
        y: hovered ? '+=2' : `+=${Math.PI * 2}`,
        x: hovered ? '+=1.6' : `-=${Math.PI * 2}`,
        duration: hovered ? 3.2 : 2.3,
        ease: 'power1.inOut',
        stagger: { each: 0.12 },
      });
  }, { dependencies: [hovered] });

  return (
    <Float floatIntensity={2.5} speed={hovered ? 4 : 2}>
      <group
        position={[9, -4, 0]}
        rotation={[2.6, 0.8, -1.8]}
        scale={hovered ? 0.9 : 0.74} // hover qilinganda biroz kattalashadi
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
          {/* Hover paytida rang va yorqinlik biroz o‘zgaradi */}
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

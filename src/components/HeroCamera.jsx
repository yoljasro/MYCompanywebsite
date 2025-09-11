import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();

  useFrame((state, delta) => {
    // Kamerani yumshoq yo'naltirish
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);

    if (!isMobile) {
      const rx = clamp(-state.pointer.y / 3, -0.4, 0.4);
      const ry = clamp(state.pointer.x / 5, -0.4, 0.4);
      easing.dampE(group.current.rotation, [rx, ry, 0], 0.25, delta);
    } else {
      // Mobil: tebranishsiz tinch holat
      easing.dampE(group.current.rotation, [0, 0, 0], 0.3, delta);
    }
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();

  useFrame((state, delta) => {
    // Kamera yumshoq joylashadi, lekin ko‘p “kuch ishlatmaydi”
    easing.damp3(state.camera.position, [0, 0, 20], 0.2, delta);

    const rx = isMobile ? 0 : clamp(-state.pointer.y / 3, -0.35, 0.35);
    const ry = isMobile ? 0 : clamp(state.pointer.x / 5, -0.35, 0.35);
    easing.dampE(group.current.rotation, [rx, ry, 0], 0.25, delta);
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;

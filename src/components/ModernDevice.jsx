// src/components/ModernDevice.jsx
import { useMemo } from 'react';
import { useGLTF, Float } from '@react-three/drei';

// Варианты моделей через CDN
const MODEL_URLS = {
  macbook: 'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/macbook.glb',
  iphone:  'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/iphone.glb',
  vr:      'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/vr_headset.glb',
};

export default function ModernDevice({ modelVariant = 'macbook', float = true, ...props }) {
  const url = MODEL_URLS[modelVariant] ?? MODEL_URLS.macbook;
  const { scene } = useGLTF(url);

  // Чуть «премиальнее» материалы
  useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh && o.material) {
        if ('metalness' in o.material) o.material.metalness = 0.6;
        if ('roughness' in o.material) o.material.roughness = 0.35;
      }
    });
  }, [scene]);

  const Device = <primitive object={scene} {...props} />;

  return float ? (
    <Float floatIntensity={1.2} speed={1.3} rotationIntensity={0.2}>
      {Device}
    </Float>
  ) : (
    Device
  );
}

useGLTF.preload(MODEL_URLS.macbook);
useGLTF.preload(MODEL_URLS.iphone);
useGLTF.preload(MODEL_URLS.vr);

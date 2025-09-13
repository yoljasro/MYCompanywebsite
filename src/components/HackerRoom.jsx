import { useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function HackerRoom(props) {
  const { nodes, materials } = useGLTF("/models/hacker-room.glb");

  const monitorTxt = useTexture("/textures/desk/monitor.png");
  const screenTxt = useTexture("/textures/desk/screen.png");

  // sRGB
  monitorTxt.colorSpace = "srgb";
  screenTxt.colorSpace = "srgb";

  // soyalar va tonemapping sozlash
  useEffect(() => {
    Object.values(materials).forEach((m) => {
      if (m) {
        if ("toneMapped" in m) m.toneMapped = true;
        m.needsUpdate = true;
      }
    });
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      {/* Ekranlar — oddiy basic/standard materiallar bilan yengilroq */}
      <mesh geometry={nodes.screen_screens_0.geometry} material={materials.screens}>
        <meshBasicMaterial map={screenTxt} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.screen_glass_glass_0.geometry} material={materials.glass} />

      <mesh geometry={nodes.table_table_mat_0_1.geometry} material={materials.table_mat} />
      <mesh geometry={nodes.table_table_mat_0_2.geometry} material={materials.computer_mat}>
        <meshBasicMaterial map={monitorTxt} toneMapped={false} />
      </mesh>

      <mesh geometry={nodes.table_table_mat_0_3.geometry} material={materials.server_mat} />
      <mesh geometry={nodes.table_table_mat_0_4.geometry} material={materials.vhsPlayer_mat} />
      <mesh geometry={nodes.table_table_mat_0_5.geometry} material={materials.stand_mat} />
      <mesh geometry={nodes.table_table_mat_0_6.geometry} material={materials.mat_mat} />
      <mesh geometry={nodes.table_table_mat_0_7.geometry} material={materials.arm_mat} />
      <mesh geometry={nodes.table_table_mat_0_8.geometry} material={materials.tv_mat}>
        <meshBasicMaterial map={monitorTxt} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.table_table_mat_0_9.geometry} material={materials.cables_mat} />
      <mesh geometry={nodes.table_table_mat_0_10.geometry} material={materials.props_mat} />
      <mesh geometry={nodes.table_table_mat_0_11.geometry} material={materials.ground_mat} />
      <mesh geometry={nodes.table_table_mat_0_12.geometry} material={materials.key_mat} />
    </group>
  );
}

useGLTF.preload("/models/hacker-room.glb");

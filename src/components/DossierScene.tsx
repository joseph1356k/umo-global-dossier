import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function seededRandom(seed: number) {
  const next = Math.sin(seed) * 10000;
  return next - Math.floor(next);
}

function ArchiveObject() {
  const group = useRef<Group>(null);
  const points = useMemo(() => {
    const vertices: number[] = [];
    for (let i = 0; i < 96; i += 1) {
      const radius = 1.2 + seededRandom(i + 1) * 2.5;
      const angle = seededRandom(i + 101) * Math.PI * 2;
      const height = (seededRandom(i + 201) - 0.5) * 1.5;
      vertices.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    }
    return new Float32Array(vertices);
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.08 + pointer.x * 0.18;
    group.current.rotation.x = -0.16 + pointer.y * 0.08;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.008, 10, 72]} />
        <meshBasicMaterial color="#e21f33" transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.7, 0.32]}>
        <torusGeometry args={[2.05, 0.006, 10, 88]} />
        <meshBasicMaterial color="#7cf6ff" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0.45, 0.2, 0.8]}>
        <torusGeometry args={[2.7, 0.004, 10, 96]} />
        <meshBasicMaterial color="#fff5d6" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.25, 0.78, 0.06]} />
        <meshBasicMaterial color="#151515" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0.12, 0.12, 0.05]}>
        <boxGeometry args={[1.25, 0.78, 0.03]} />
        <meshBasicMaterial color="#2b090c" transparent opacity={0.9} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#e21f33" transparent opacity={0.28} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#f5f2e8" size={0.018} transparent opacity={0.86} />
      </points>
    </group>
  );
}

export default function DossierScene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 5.4], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.25]}
      >
        <color attach="background" args={["#070707"]} />
        <fog attach="fog" args={["#070707", 4, 9]} />
        <ArchiveObject />
      </Canvas>
    </div>
  );
}

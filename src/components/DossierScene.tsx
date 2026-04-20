import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { Group } from "three";

function seededRandom(seed: number) {
  const next = Math.sin(seed) * 10000;
  return next - Math.floor(next);
}

type SceneMotion = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  velocityX: number;
  hoverX: number;
  hoverY: number;
  dragging: boolean;
  lastClientX: number;
  lastClientY: number;
};

function ArchiveObject({ motion }: { motion: React.MutableRefObject<SceneMotion> }) {
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

  useFrame((_, delta) => {
    if (!group.current) return;

    const sceneMotion = motion.current;

    if (!sceneMotion.dragging) {
      sceneMotion.targetY += delta * 0.42 + sceneMotion.velocityX;
      sceneMotion.velocityX *= 0.94;
      sceneMotion.targetX = -0.14 + sceneMotion.hoverY * 0.18;
    } else {
      sceneMotion.velocityX *= 0.88;
    }

    sceneMotion.currentY += (sceneMotion.targetY - sceneMotion.currentY) * 0.08;
    sceneMotion.currentX += (sceneMotion.targetX - sceneMotion.currentX) * 0.1;

    group.current.rotation.y = sceneMotion.currentY;
    group.current.rotation.x = sceneMotion.currentX;
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

function DossierScene() {
  const [dragging, setDragging] = useState(false);
  const motion = useRef<SceneMotion>({
    currentX: -0.14,
    currentY: 0,
    targetX: -0.14,
    targetY: 0,
    velocityX: 0,
    hoverX: 0,
    hoverY: 0,
    dragging: false,
    lastClientX: 0,
    lastClientY: 0,
  });

  const updateHover = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    motion.current.hoverX = (event.clientX - rect.left) / rect.width - 0.5;
    motion.current.hoverY = (event.clientY - rect.top) / rect.height - 0.5;
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    motion.current.dragging = true;
    motion.current.lastClientX = event.clientX;
    motion.current.lastClientY = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    updateHover(event);

    if (!motion.current.dragging) return;

    const deltaX = event.clientX - motion.current.lastClientX;
    const deltaY = event.clientY - motion.current.lastClientY;

    motion.current.targetY += deltaX * 0.018;
    motion.current.targetX = Math.max(-0.72, Math.min(0.72, motion.current.targetX + deltaY * 0.006));
    motion.current.velocityX = deltaX * 0.00042;
    motion.current.lastClientX = event.clientX;
    motion.current.lastClientY = event.clientY;
  }, [updateHover]);

  const endDrag = useCallback(() => {
    motion.current.dragging = false;
    setDragging(false);
  }, []);

  const handlePointerLeave = useCallback(() => {
    motion.current.hoverX = 0;
    motion.current.hoverY = 0;
    if (!motion.current.dragging) {
      motion.current.targetX = -0.14;
    }
  }, []);

  return (
    <div
      className={`scene-shell scene-interactive${dragging ? " is-dragging" : ""}`}
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0.2, 5.4], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.2]}
      >
        <color attach="background" args={["#070707"]} />
        <fog attach="fog" args={["#070707", 4, 9]} />
        <ArchiveObject motion={motion} />
      </Canvas>
    </div>
  );
}

export default memo(DossierScene);

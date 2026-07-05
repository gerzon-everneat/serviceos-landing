"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = new THREE.Color("#B8B8B2");
const LIME = new THREE.Color("#C8FF00");
const GRID = 7;
const SPACING = 0.72;

function TimeGrid({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  const { positions, centerIndex, colors } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const half = (GRID - 1) / 2;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const jitter = (Math.random() - 0.5) * 0.18;
        pts.push(new THREE.Vector3((x - half) * SPACING, (y - half) * SPACING, jitter));
      }
    }
    const center = Math.floor(pts.length / 2);
    const cols = pts.map((_, i) => (i === center ? LIME : INK));
    return { positions: pts, centerIndex: center, colors: cols };
  }, []);

  useEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      const scale = i === centerIndex ? 1.9 : 1;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, colors[i]);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [positions, colors, centerIndex]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (reduce) {
      group.current.rotation.set(0.18, -0.3, 0);
      return;
    }
    const targetX = 0.18 + pointer.current.y * 0.18;
    const targetY = -0.3 + pointer.current.x * 0.28 + scrollProgress.current * 1.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2.4);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2.4);
    group.current.rotation.z += delta * 0.03;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[0.052, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {[2.05, 2.75].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.3, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.0035, 8, 96]} />
          <meshBasicMaterial color={INK} transparent opacity={0.12} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ className }: { className?: string }) {
  const [reduce, setReduce] = useState(false);
  const [active, setActive] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        frameloop={active ? "always" : "never"}
      >
        <TimeGrid reduce={reduce} />
      </Canvas>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

/* One fixed canvas, five "acts" — each section's 3D element fades in/out
   based on where its DOM section sits in the page scroll. */

const progress = () => {
  const d = document.documentElement;
  return d.scrollTop / Math.max(d.scrollHeight - d.clientHeight, 1);
};

// 1 inside [a,b], feathered to 0 outside
const band = (t: number, a: number, b: number, f = 0.04) =>
  Math.min(
    THREE.MathUtils.smoothstep(t, a - f, a + f),
    1 - THREE.MathUtils.smoothstep(t, b - f, b + f)
  );

type Bands = Record<string, [number, number]>;

function useBands(): React.RefObject<Bands> {
  // fallback bands if sections aren't found (sub-pages)
  const bands = useRef<Bands>({
    hero: [0, 0.1],
    about: [0.08, 0.2],
    experience: [0.2, 0.45],
    projects: [0.45, 0.88],
    contact: [0.88, 1.01],
  });
  useEffect(() => {
    const measure = () => {
      const d = document.documentElement;
      const total = Math.max(d.scrollHeight - d.clientHeight, 1);
      const vh = window.innerHeight;
      for (const id of ["about", "experience", "projects", "contact"]) {
        const el = document.getElementById(id);
        if (!el) continue;
        bands.current[id] = [
          Math.max((el.offsetTop - vh * 0.75) / total, 0),
          Math.min((el.offsetTop + el.offsetHeight - vh * 0.4) / total, 1.01),
        ];
      }
      bands.current.hero = [0, bands.current.about[0] + 0.02];
      bands.current.contact[1] = 1.01;
    };
    measure();
    const t = setTimeout(measure, 800); // re-measure after lazy content settles
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);
  return bands;
}

/* ── Act 1: morphing particle cloud (hero) ───────────────────────
   1400 particles continuously morphing: sphere → torus knot → chaos */
function MorphCloud({ bands }: { bands: React.RefObject<Bands> }) {
  const N = 1400;
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const { pos, targets } = useMemo(() => {
    const sphere = new Float32Array(N * 3);
    const knot = new Float32Array(N * 3);
    const chaos = new Float32Array(N * 3);
    const rnd = (i: number, s: number) =>
      Math.abs((Math.sin(i * s) * 43758.5453) % 1);
    for (let i = 0; i < N; i++) {
      // fibonacci sphere
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.39996;
      sphere.set([Math.cos(th) * r * 2.4, y * 2.4, Math.sin(th) * r * 2.4], i * 3);
      // torus knot p=2 q=3
      const u = (i / N) * Math.PI * 4;
      const kr = 1.5 + 0.6 * Math.cos(3 * u);
      knot.set(
        [
          kr * Math.cos(2 * u) + (rnd(i, 12.9) - 0.5) * 0.4,
          kr * Math.sin(2 * u) + (rnd(i, 45.1) - 0.5) * 0.4,
          0.6 * Math.sin(3 * u) * 2 + (rnd(i, 78.2) - 0.5) * 0.4,
        ],
        i * 3
      );
      chaos.set(
        [(rnd(i, 91.7) - 0.5) * 7, (rnd(i, 33.3) - 0.5) * 7, (rnd(i, 57.5) - 0.5) * 7],
        i * 3
      );
    }
    return { pos: sphere.slice(), targets: [sphere, knot, chaos] };
  }, []);

  useFrame(({ clock }) => {
    const t = progress();
    const b = bands.current ? band(t, ...bands.current.hero, 0.03) : 1;
    if (mat.current) mat.current.opacity = 0.85 * b;
    if (!group.current || !points.current) return;
    group.current.visible = b > 0.01;
    if (b <= 0.01) return;

    const cycle = (clock.elapsedTime / 7) % 3; // 7s per shape
    const from = Math.floor(cycle);
    const frac = THREE.MathUtils.smoothstep(cycle - from, 0.55, 1); // hold, then morph
    const A = targets[from];
    const B = targets[(from + 1) % 3];
    for (let i = 0; i < pos.length; i++) {
      pos[i] = A[i] + (B[i] - A[i]) * frac;
    }
    (points.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    group.current.rotation.y += 0.0018;
    group.current.rotation.x = t * 2;
    group.current.position.z = -t * 10;
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={mat}
          size={0.045}
          color="#8888f5"
          transparent
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ── Act 2: gyroscope rings (about) ──────────────────────────────── */
function GyroRings({ bands }: { bands: React.RefObject<Bands> }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Mesh[]>([]);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);

  const CONF = [
    { r: 1.2, speed: 0.012, axis: "x", color: "#5b5bf0" },
    { r: 1.7, speed: -0.009, axis: "y", color: "#8888f5" },
    { r: 2.2, speed: 0.007, axis: "x", color: "#23ae23" },
    { r: 2.7, speed: -0.005, axis: "y", color: "#5b5bf0" },
  ] as const;

  useFrame(() => {
    const t = progress();
    const b = bands.current ? band(t, ...bands.current.about) : 0;
    if (group.current) {
      group.current.visible = b > 0.01;
      group.current.position.x = 2.6;
      group.current.rotation.z += 0.002;
      group.current.scale.setScalar(0.7 + b * 0.3);
    }
    rings.current.forEach((m, i) => {
      if (!m) return;
      if (CONF[i].axis === "x") m.rotation.x += CONF[i].speed;
      else m.rotation.y += CONF[i].speed;
    });
    mats.current.forEach((m) => { if (m) m.opacity = 0.6 * b; });
    if (coreMat.current) {
      coreMat.current.opacity = b;
      coreMat.current.emissiveIntensity = 0.3 + b * 0.5;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          ref={coreMat}
          color="#0f0f23"
          emissive="#5b5bf0"
          transparent
        />
      </mesh>
      {CONF.map((c, i) => (
        <mesh key={i} ref={(m) => { if (m) rings.current[i] = m; }} rotation={[i * 0.9, i * 0.5, 0]}>
          <torusGeometry args={[c.r, 0.015, 8, 90]} />
          <meshBasicMaterial
            ref={(m) => { if (m) mats.current[i] = m; }}
            color={c.color}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Act 3: data streams (experience) — particles flowing sideways,
   matching the horizontal scroll direction ─────────────────────── */
function StreamField({ bands }: { bands: React.RefObject<Bands> }) {
  const N = 900;
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const { pos, lane } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const lane = new Float32Array(N);
    const rnd = (i: number, s: number) =>
      Math.abs((Math.sin(i * s) * 43758.5453) % 1);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd(i, 12.9) - 0.5) * 28;
      pos[i * 3 + 1] = (rnd(i, 45.1) - 0.5) * 8;
      pos[i * 3 + 2] = (rnd(i, 78.2) - 0.5) * 6 - 1;
      lane[i] = 0.4 + rnd(i, 33.3) * 1.2; // per-particle speed
    }
    return { pos, lane };
  }, []);

  useFrame(({ clock }) => {
    const t = progress();
    const b = bands.current ? band(t, ...bands.current.experience) : 0;
    if (mat.current) mat.current.opacity = 0.65 * b;
    if (!points.current) return;
    points.current.visible = b > 0.01;
    if (b <= 0.01) return;
    const time = clock.elapsedTime;
    for (let i = 0; i < N; i++) {
      pos[i * 3] += lane[i] * (0.015 + b * 0.05);
      if (pos[i * 3] > 14) pos[i * 3] = -14;
      pos[i * 3 + 1] += Math.sin(time * 1.5 + i) * 0.0035; // gentle drift
    }
    (points.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.05}
        color="#5b5bf0"
        transparent
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Act 4: hyperspace warp streaks (projects) — speed scales with
   scroll through the card tunnel ─────────────────────────────────── */
function WarpStreaks({ bands }: { bands: React.RefObject<Bands> }) {
  const M = 280;
  const lines = useRef<THREE.LineSegments>(null);
  const mat = useRef<THREE.LineBasicMaterial>(null);

  const { seg, base } = useMemo(() => {
    const seg = new Float32Array(M * 6);
    const base = new Float32Array(M * 3); // x, y, z
    const rnd = (i: number, s: number) =>
      Math.abs((Math.sin(i * s) * 43758.5453) % 1);
    for (let i = 0; i < M; i++) {
      const ang = rnd(i, 12.9) * Math.PI * 2;
      const r = 1.2 + rnd(i, 45.1) * 4.5;
      base[i * 3] = Math.cos(ang) * r;
      base[i * 3 + 1] = Math.sin(ang) * r;
      base[i * 3 + 2] = -rnd(i, 78.2) * 50;
    }
    return { seg, base };
  }, []);

  useFrame(() => {
    const t = progress();
    const bb = bands.current?.projects ?? [0.45, 0.88];
    const b = band(t, bb[0], bb[1]);
    if (mat.current) mat.current.opacity = 0.55 * b;
    if (!lines.current) return;
    lines.current.visible = b > 0.01;
    if (b <= 0.01) return;

    const local = THREE.MathUtils.clamp((t - bb[0]) / (bb[1] - bb[0]), 0, 1);
    const speed = 0.12 + local * 0.55;
    const len = 0.8 + speed * 6; // streaks stretch with speed
    for (let i = 0; i < M; i++) {
      base[i * 3 + 2] += speed;
      if (base[i * 3 + 2] > 6) base[i * 3 + 2] = -50;
      const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2];
      seg.set([x, y, z, x, y, z - len], i * 6);
    }
    const attr = lines.current.geometry.attributes.position as THREE.BufferAttribute;
    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lines}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[seg, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={mat}
        color="#8888f5"
        transparent
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

/* ── Act 5: spiral galaxy (toolkit / contact / finale) — unchanged ── */
function Galaxy({ bands }: { bands: React.RefObject<Bands> }) {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const pos = useMemo(() => {
    const n = 2200;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const frac = i / n;
      const r = frac * 9;
      const theta = frac * 26 + (i % 3) * 2.1;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = (Math.sin(i * 91.7) * 0.5) * (1 - frac) * 1.6;
      arr[i * 3 + 2] = Math.sin(theta) * r - 2;
    }
    return arr;
  }, []);

  useFrame(() => {
    const t = progress();
    const b = bands.current ? band(t, ...bands.current.contact, 0.05) : 0;
    if (mat.current) mat.current.opacity = 0.85 * b;
    if (points.current) {
      points.current.visible = b > 0.01;
      points.current.rotation.y += 0.0015 + b * 0.003;
      points.current.rotation.x = -0.5 + b * 0.15;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={mat} size={0.05} color="#8888f5" transparent sizeAttenuation />
    </points>
  );
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ minimal = false }: { minimal?: boolean }) {
  const bands = useBands();
  const fullPage = useRef<Bands>({ ...bands.current, hero: [0, 1.01] });
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <CameraRig />
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={60} color="#5b5bf0" />
        <Stars radius={60} depth={40} count={3000} factor={3.5} fade speed={0.6} />
        {minimal ? (
          <MorphCloud bands={fullPage} />
        ) : (
          <>
            <MorphCloud bands={bands} />
            <GyroRings bands={bands} />
            <StreamField bands={bands} />
            <WarpStreaks bands={bands} />
            <Galaxy bands={bands} />
          </>
        )}
      </Canvas>
    </div>
  );
}

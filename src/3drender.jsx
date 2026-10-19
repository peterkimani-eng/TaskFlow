import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ──────────────────────────────────────────
// 1. The Glass Shell (~10cm on screen)
// ──────────────────────────────────────────
function GlassShell({ hovered, setHovered }) {
  const ref = useRef();

  const baseScale = [1.2, 1.2, 1.2];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const el = ref.current;

    el.rotation.x = Math.sin(t * 0.2) * 0.06;
    el.rotation.z = Math.sin(t * 0.15) * 0.04;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.15} floatIntensity={1.0}>
      <mesh
        ref={ref}
        scale={baseScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 10]} />
        <MeshTransmissionMaterial
          attenuationColor="#003366"
          attenuationDistance={3}
          transmission={0.92}
          thickness={1.8}
          roughness={0.05}
          ior={1.5}
          chromaticAberration={0.08}
          distortion={0.15}
          distortionScale={0.25}
          temporalDistortion={0.05}
          anisotropy={0.15}
          iridescence={0.7}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[0, 800]}
          backside
          backsideThickness={0.8}
        />
      </mesh>
    </Float>
  );
}

// ──────────────────────────────────────────
// 2. Text wrapped around the sphere — billboarded, always faces camera
// ──────────────────────────────────────────
function TaskFlowText() {
  const groupRef = useRef();

  const message = 'Task Flow • Task Flow • ';
  const radius = 1.8;
  const fontSize = 0.22;

  const charWidth = fontSize * 0.55;
  const maxChars = Math.floor((Math.PI * 2 * radius) / charWidth);
  const trimmed = message.slice(0, maxChars);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Front ring */}
      {[...trimmed].map((char, i) => {
        const angle = (i / trimmed.length) * Math.PI * 2;
        return (
          <Text
            key={`front-${i}`}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            fontSize={fontSize}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.006}
            outlineColor="#1d9bf0"
          >
            {char}
          </Text>
        );
      })}

      {/* Back ring — flip so text reads correctly */}
      {[...trimmed].map((char, i) => {
        const angle = (i / trimmed.length) * Math.PI * 2;
        return (
          <Text
            key={`back-${i}`}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
            rotation={[
              0,
              -angle - Math.PI / 2,
              Math.PI,
            ]}
            fontSize={fontSize}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.006}
            outlineColor="#1d9bf0"
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
}

// ──────────────────────────────────────────
// 3. Sparkle particles (animated)
// ──────────────────────────────────────────
function Sparkles({ count = 30 }) {
  const ref = useRef();

  const points = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.0 + Math.random() * 0.6;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref} geometry={points}>
      <pointsMaterial
        size={0.03}
        color="#1d9bf0"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ──────────────────────────────────────────
// 4. Scene
// ──────────────────────────────────────────
export default function TaskFlowScene() {
  const [hovered, setHovered] = useState(false);

  return (
    // Isolated container with its own stacking context
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#000',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{
          // Prevent Canvas from interfering with page CSS
          position: 'relative',
          zIndex: 1,
          touchAction: 'none', // critical for OrbitControls on mobile
        }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.3} />
        <spotLight position={[8, 10, 8]} angle={0.15} penumbra={1} intensity={80} color="#4da6ff" />
        <pointLight position={[-6, -4, 4]} intensity={30} color="#1d9bf0" />

        <GlassShell hovered={hovered} setHovered={setHovered} />
        <Sparkles />
        <TaskFlowText />

        {/* Cursor drag controls */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.6}
          dampingFactor={0.08}
          enableDamping
          // Prevent touch events from scrolling the page
          makeDefault
        />
      </Canvas>
    </div>
  );
}
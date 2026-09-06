import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Realistic Red Flame Embers & Fire Particles
function AtmosphereEmbers({ phase }) {
  const count = 350;
  const meshRef = useRef();

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 14;
      pos[i + 1] = (Math.random() - 0.5) * 12;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(time + i) * 0.006 + 0.004;
      if (positions[i * 3 + 1] > 7) positions[i * 3 + 1] = -7;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#ef4444"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CrowVortexCanvas({ scenePhase, progress }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 3, 4]} color="#ef4444" intensity={3.5} />
        <pointLight position={[-2, -1, 2]} color="#991b1b" intensity={2.5} />
        
        <AtmosphereEmbers phase={scenePhase} />
      </Canvas>
    </div>
  );
}

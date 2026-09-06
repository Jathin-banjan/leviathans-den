import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Realistic Black Crows Component
function CrowFlock({ progress }) {
  const meshRef = useRef();
  const count = 280;

  const crowGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -0.6, 0.1, -0.2,   0, 0, 0.4,   0, 0, -0.3,
      0, 0, 0.4,        0.6, 0.1, -0.2,  0, 0, -0.3,
      -0.1, 0, -0.3,    0.1, 0, -0.3,    0, -0.05, -0.7
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        spawnX: (Math.random() - 0.5) * 12,
        spawnY: -2 + (Math.random() - 0.5) * 8,
        spawnZ: (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 5,
        vy: 1.5 + Math.random() * 3,
        vz: (Math.random() - 0.5) * 5,
        vortexRadius: 1.0 + Math.random() * 4.0,
        vortexAngle: Math.random() * Math.PI * 2,
        vortexSpeed: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 2.5),
        scale: 0.15 + Math.random() * 0.25,
        flapSpeed: 12 + Math.random() * 18,
        flapOffset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    particles.forEach((p, i) => {
      let x = 0, y = 0, z = -100;
      let rotX = 0, rotY = 0, rotZ = 0;
      let scale = p.scale;

      // Crows fly during Phase 6 (30s - 37s, progress 0.60 to 0.74) and Phase 8 (43s - 47s, progress 0.86 to 0.94)
      const isCrowPhase = (progress >= 0.60 && progress < 0.74) || (progress >= 0.86 && progress < 0.94);

      if (isCrowPhase) {
        const pNorm = (progress - 0.60) / 0.34;
        const currentAngle = p.vortexAngle + time * p.vortexSpeed;
        const currentRadius = THREE.MathUtils.lerp(p.vortexRadius * 2, p.vortexRadius * 0.8, pNorm);

        x = Math.cos(currentAngle) * currentRadius;
        y = p.spawnY + Math.sin(time * 2 + i) * 0.3;
        z = Math.sin(currentAngle) * currentRadius + 1.0;

        rotY = -currentAngle + Math.PI / 2;
        rotZ = 0.3;
      } else {
        x = p.spawnX + Math.sin(time + i) * 0.05;
        y = -10; // Hide off-screen
        z = -50;
        scale = 0.001;
      }

      const wingFlap = Math.sin(time * p.flapSpeed + p.flapOffset) * 0.4;
      
      dummy.position.set(x, y, z);
      dummy.rotation.set(rotX + wingFlap * 0.2, rotY, rotZ + wingFlap * 0.1);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[crowGeometry, null, count]}>
      <meshStandardMaterial 
        color="#08080a" 
        roughness={0.8}
        metalness={0.2}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

// Realistic Red Flame Embers & Floating Ash
function AtmosphereEmbers() {
  const count = 250;
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
      positions[i * 3 + 1] += Math.sin(time + i) * 0.005 + 0.003;
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
        size={0.08}
        color="#ef4444"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig({ progress }) {
  useFrame(({ camera }) => {
    if (progress < 0.50) {
      const norm = progress / 0.50;
      camera.position.z = THREE.MathUtils.lerp(5.5, 4.0, norm);
    } else if (progress >= 0.50 && progress < 0.86) {
      const norm = (progress - 0.50) / 0.36;
      camera.position.z = THREE.MathUtils.lerp(4.0, 3.2, norm);
    } else {
      camera.position.z = 5.0;
    }
  });

  return null;
}

export default function CrowVortexCanvas({ scenePhase, progress }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 3, 4]} color="#ef4444" intensity={3.0} />
        <pointLight position={[-2, -1, 2]} color="#991b1b" intensity={2.0} />
        
        <CrowFlock progress={progress} />
        <AtmosphereEmbers />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}

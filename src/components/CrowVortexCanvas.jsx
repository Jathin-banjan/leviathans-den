import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom 3D Crow Instanced Mesh Component
function CrowFlock({ scenePhase, progress }) {
  const meshRef = useRef();
  const count = 350;

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
        spawnX: (Math.random() - 0.5) * 1.5,
        spawnY: -0.2 + (Math.random() - 0.5) * 1.8,
        spawnZ: (Math.random() - 0.5) * 0.8,
        vx: (Math.random() - 0.5) * 4,
        vy: 1.0 + Math.random() * 3,
        vz: (Math.random() - 0.5) * 4,
        vortexRadius: 0.8 + Math.random() * 3.5,
        vortexAngle: Math.random() * Math.PI * 2,
        vortexSpeed: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 2.5),
        vortexY: (Math.random() - 0.5) * 3,
        targetX: (Math.random() - 0.5) * 16,
        targetY: (Math.random() - 0.5) * 10,
        targetZ: -2 - Math.random() * 10,
        scale: 0.15 + Math.random() * 0.25,
        flapSpeed: 10 + Math.random() * 20,
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

      if (progress < 0.36) {
        x = p.spawnX + Math.sin(time + i) * 0.05;
        y = p.spawnY + Math.cos(time * 0.8 + i) * 0.05;
        z = p.spawnZ + Math.sin(time * 0.5) * 0.05;
        scale = p.scale * 0.2 * (progress / 0.36);
      } else if (progress >= 0.36 && progress < 0.60) {
        const pNorm = (progress - 0.36) / 0.24;
        const currentAngle = p.vortexAngle + time * p.vortexSpeed;
        const currentRadius = THREE.MathUtils.lerp(p.vortexRadius * 2, p.vortexRadius * 0.6, pNorm);

        x = Math.cos(currentAngle) * currentRadius;
        y = p.vortexY * (1 - pNorm * 0.5) + Math.sin(time * 3 + i) * 0.2;
        z = Math.sin(currentAngle) * currentRadius + 1.0;

        rotY = -currentAngle + Math.PI / 2;
        rotZ = 0.4;
      } else {
        const pNorm = (progress - 0.60) / 0.40;
        const angle = p.vortexAngle + time * p.vortexSpeed * 0.5;
        const radius = p.vortexRadius * (1 + pNorm * 3);

        x = Math.cos(angle) * radius;
        y = p.vortexY + (p.targetY - p.vortexY) * pNorm;
        z = Math.sin(angle) * radius - pNorm * 5;

        rotY = -angle;
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
        color="#0a0a0c" 
        roughness={0.8}
        metalness={0.2}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

// 3D Realistic Red Flame Embers & Electric Chakra Particles
function AtmosphereEmbers() {
  const count = 300;
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
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig({ progress }) {
  useFrame(({ camera }) => {
    if (progress < 0.36) {
      const norm = progress / 0.36;
      camera.position.z = THREE.MathUtils.lerp(5.5, 4.0, norm);
    } else if (progress >= 0.36 && progress < 0.60) {
      const norm = (progress - 0.36) / 0.24;
      camera.position.z = THREE.MathUtils.lerp(4.0, 2.0, norm);
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
        
        <CrowFlock scenePhase={scenePhase} progress={progress} />
        <AtmosphereEmbers />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom 3D Crow Instanced Mesh Component
function CrowFlock({ scenePhase, progress }) {
  const meshRef = useRef();
  const count = 350; // Optimized count for 60 FPS performance

  // Generate 3D Crow Geometry with Animated Flapping Wings
  const crowGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    // Simple 3D wing shape (v-shape crow silhouette)
    const vertices = new Float32Array([
      // Left Wing
      -0.6, 0.1, -0.2,   0, 0, 0.4,   0, 0, -0.3,
      // Right Wing
      0, 0, 0.4,        0.6, 0.1, -0.2,  0, 0, -0.3,
      // Tail
      -0.1, 0, -0.3,    0.1, 0, -0.3,    0, -0.05, -0.7
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Initialize Crow Instances data (Positions, Velocities, Rotations, Wing flap phase)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 0.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      temp.push({
        // Original character center position spawn
        spawnX: (Math.random() - 0.5) * 1.5,
        spawnY: -0.2 + (Math.random() - 0.5) * 1.8,
        spawnZ: (Math.random() - 0.5) * 0.8,
        
        // Random flight velocity
        vx: (Math.random() - 0.5) * 4,
        vy: 1.0 + Math.random() * 3,
        vz: (Math.random() - 0.5) * 4,
        
        // Vortex polar coords
        vortexRadius: 0.8 + Math.random() * 3.5,
        vortexAngle: Math.random() * Math.PI * 2,
        vortexSpeed: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 2.5),
        vortexY: (Math.random() - 0.5) * 3,

        // Dispersal final target
        targetX: (Math.random() - 0.5) * 16,
        targetY: (Math.random() - 0.5) * 10,
        targetZ: -2 - Math.random() * 10,

        scale: 0.15 + Math.random() * 0.25,
        flapSpeed: 10 + Math.random() * 20,
        flapOffset: Math.random() * Math.PI * 2,
        currentPos: new THREE.Vector3(),
        rotation: new THREE.Euler()
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

      // Phase 1 (0 - 0.3): Idle / hidden
      if (progress < 0.35) {
        // Subtle feather float near character
        x = p.spawnX + Math.sin(time + i) * 0.05;
        y = p.spawnY + Math.cos(time * 0.8 + i) * 0.05;
        z = p.spawnZ + Math.sin(time * 0.5) * 0.05;
        scale = p.scale * 0.2 * (progress / 0.35);
      }
      // Phase 2 (0.35 - 0.75): Disintegration & Outward Explosion (Scenes 4)
      else if (progress >= 0.35 && progress < 0.75) {
        const pNorm = (progress - 0.35) / 0.4;
        x = p.spawnX + p.vx * pNorm * 2.5 + Math.sin(time * 2 + i) * 0.3;
        y = p.spawnY + p.vy * pNorm * 2.5;
        z = p.spawnZ + p.vz * pNorm * 2.5 + (i % 2 === 0 ? pNorm * 3 : -pNorm * 2);
        
        rotY = Math.atan2(p.vx, p.vz);
        rotX = Math.sin(time * p.flapSpeed + p.flapOffset) * 0.3;
      }
      // Phase 3 (0.75 - 0.88): Crow Vortex Swirl (Scene 5)
      else if (progress >= 0.75 && progress < 0.88) {
        const pNorm = (progress - 0.75) / 0.13;
        const currentAngle = p.vortexAngle + time * p.vortexSpeed;
        const currentRadius = THREE.MathUtils.lerp(p.vortexRadius * 2, p.vortexRadius * 0.6, pNorm);

        x = Math.cos(currentAngle) * currentRadius;
        y = p.vortexY * (1 - pNorm * 0.5) + Math.sin(time * 3 + i) * 0.2;
        z = Math.sin(currentAngle) * currentRadius + 1.0;

        rotY = -currentAngle + Math.PI / 2;
        rotZ = 0.4;
      }
      // Phase 4 (0.88 - 1.0): Dispersal to Edges (Scenes 6 & 7)
      else {
        const pNorm = (progress - 0.88) / 0.12;
        const angle = p.vortexAngle + time * p.vortexSpeed * 0.5;
        const radius = p.vortexRadius * (1 + pNorm * 3);

        x = Math.cos(angle) * radius;
        y = p.vortexY + (p.targetY - p.vortexY) * pNorm;
        z = Math.sin(angle) * radius - pNorm * 5;

        rotY = -angle;
      }

      // Dynamic wing flap bending
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

// 3D Floating Embers & Dark Atmospheric Particles
function AtmosphereEmbers({ progress }) {
  const count = 150;
  const meshRef = useRef();

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(time + i) * 0.003 + 0.002;
      if (positions[i * 3 + 1] > 6) positions[i * 3 + 1] = -6;
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
        size={0.06}
        color="#dc2626"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera Rig controller that synchronizes push-in and dolly moves
function CameraRig({ scenePhase, progress }) {
  useFrame(({ camera }) => {
    // 0-3s: Slow cinematic push in towards character
    if (progress < 0.25) {
      const norm = progress / 0.25;
      camera.position.z = THREE.MathUtils.lerp(5.5, 4.2, norm);
      camera.position.y = THREE.MathUtils.lerp(0, 0.2, norm);
    } 
    // 3-5s: Standing upward camera tracking
    else if (progress >= 0.25 && progress < 0.42) {
      const norm = (progress - 0.25) / 0.17;
      camera.position.z = THREE.MathUtils.lerp(4.2, 3.8, norm);
      camera.position.y = THREE.MathUtils.lerp(0.2, 0.5, norm);
    }
    // 5-6.5s: Dramatic facial close-up
    else if (progress >= 0.42 && progress < 0.54) {
      const norm = (progress - 0.42) / 0.12;
      camera.position.z = THREE.MathUtils.lerp(3.8, 1.8, norm);
      camera.position.y = THREE.MathUtils.lerp(0.5, 0.75, norm);
    }
    // 6.5-10s: Pull back for disintegration and vortex
    else if (progress >= 0.54 && progress < 0.85) {
      const norm = (progress - 0.54) / 0.31;
      camera.position.z = THREE.MathUtils.lerp(1.8, 5.0, norm);
      camera.position.y = THREE.MathUtils.lerp(0.75, 0.0, norm);
    }
    // 10-12s: Title settle
    else {
      camera.position.z = 5.0;
      camera.position.y = 0.0;
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
        <ambientLight intensity={0.2} />
        <pointLight position={[2, 3, 4]} color="#dc2626" intensity={2.5} />
        <pointLight position={[-2, -1, 2]} color="#7f1d1d" intensity={1.5} />
        
        <CrowFlock scenePhase={scenePhase} progress={progress} />
        <AtmosphereEmbers progress={progress} />
        <CameraRig scenePhase={scenePhase} progress={progress} />
      </Canvas>
    </div>
  );
}

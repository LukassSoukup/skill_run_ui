"use client"
import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { skills } from '@/app/data/staticDataProvider'

type BoxProps = ThreeElements['mesh'] & {
    skillIndex: number;
}

const Box = ({ skillIndex, ...props }: BoxProps) => {
    const ref = useRef<THREE.Mesh>(null!)
    const [texture, setTexture] = useState<THREE.Texture | null>(null)

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const skill = skills[skillIndex];
        if (skill?.image) {
            const loadedTexture = textureLoader.load(`${skill.image}`);
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            loadedTexture.minFilter = THREE.LinearFilter;
            loadedTexture.magFilter = THREE.LinearFilter;
            loadedTexture.generateMipmaps = false;
            loadedTexture.flipY = false;
            setTexture(loadedTexture);
        }
    }, [skillIndex]);
    
    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta;
        
        const radius = 5;
        const time = state.clock.getElapsedTime() / 5;
        
        ref.current.position.x = Math.cos(time + skillIndex) * radius;
        ref.current.position.y = Math.sin(time + skillIndex) * radius;
        ref.current.position.z = Math.sin(time + skillIndex * 0.5) * radius;
    })

    return (
        <mesh
            {...props}
            ref={ref}
            scale={0.35}
            castShadow
            receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            {texture && (
                <>
                    <meshStandardMaterial attach="material-0" map={texture} color={'#ffffff'} roughness={0.3} metalness={0.7} />
                    <meshStandardMaterial attach="material-1" map={texture} color={'#ffffff'} roughness={0.3} metalness={0.7} />
                    <meshStandardMaterial attach="material-2" map={texture} color={'#ffffff'} roughness={0.3} metalness={0.7} />
                    <meshStandardMaterial attach="material-3" map={texture} color={'#ffffff'} roughness={0.3} metalness={0.7} />
                    <meshStandardMaterial attach="material-4" map={texture} color={'#ffffff'} roughness={0.3} metalness={0.7} />
                    <meshStandardMaterial attach="material-5" map={texture} color={'#ffffff'} roughness={0.3} metalness={0.7} />
                </>
            )}
        </mesh>
    )
}

const ThreeCanvas = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={8} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            {skills.map((_, index) => (
                <Box 
                    key={index}
                    position={[0, 0, 0]}
                    skillIndex={index}
                />
            ))}
        </Canvas>
    )
};

export default ThreeCanvas;
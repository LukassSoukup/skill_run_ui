"use client"
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

const Box = (props: ThreeElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta;
        
        const index = parseInt(props.name || "0");
        ref.current.position.y = Math.cos(state.clock.getElapsedTime()/5 + (index * (2 * Math.PI / 23))) * 2
        ref.current.position.x = Math.sin(state.clock.getElapsedTime()/5 + (index * (2 * Math.PI / 23))) * 2
        ref.current.position.z = Math.tan(state.clock.getElapsedTime()/5 + (index * (2 * Math.PI / 23))) * 2
        //ref.current.position.z = Math.abs(Math.tan(state.clock.getElapsedTime()/5 + (index * (2 * Math.PI / 23))) * 2)
    })

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 0.5 : 0.2}
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const ThreeCanvas = () => {
    const numberOfBoxes = 30; // You can change this number to add more boxes
    
    return (
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            {Array.from({ length: numberOfBoxes }).map((_, index) => (
                <Box 
                    key={index}
                    position={[Math.PI * index * Math.sin(index * 10)/index, Math.PI * index * Math.cos(index * 10)/index, 0]}
                    name={index.toString()}
                />
            ))}
        </Canvas>
    )
};

export default ThreeCanvas;
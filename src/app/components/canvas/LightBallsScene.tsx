import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import CameraControls from './CameraControls'

function LightSphere({ color, intensity = 200 }: { color: THREE.ColorRepresentation, intensity?: number }) {
    const [clicked, click] = useState(false)
    const lightRef = useRef<THREE.PointLight>(null!)
    const texture = new THREE.CanvasTexture(generateTexture())
    texture.magFilter = THREE.NearestFilter
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.set(1, 4.5)

    useFrame((state) => {

        const time = state.clock.getElapsedTime() + (color === 0xff8888 ? 10000 : 0)
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(time * 0.6) * 9
            lightRef.current.position.y = Math.sin(time * 0.7) * 9 + 6
            lightRef.current.position.z = Math.sin(time * 0.8) * 18
            lightRef.current.rotation.x = time
            lightRef.current.rotation.z = time
        }
    })

    return (
        <pointLight ref={lightRef} color={color} intensity={clicked ? intensity*10 : intensity} distance={20} castShadow shadow-bias={-0.005}>
            <mesh onClick={() => click(!clicked)}>
                <sphereGeometry args={[0.3, 12, 6]}  />
                <meshPhysicalMaterial emissive={color} emissiveIntensity={1} color={color} />
            </mesh>
            <mesh castShadow receiveShadow onClick={() => click(!clicked)}>
                <sphereGeometry args={[2, 32, 8]} />
                <meshPhongMaterial side={THREE.DoubleSide} alphaMap={texture} alphaTest={0.5} />
            </mesh>
        </pointLight>
    )
}

function BackgroundBox() {
    return (
        <mesh position={[0, 10, 0]} receiveShadow>
            <boxGeometry args={[30, 30, 60]} />
            <meshPhongMaterial
                color={0xa0adaf}
                shininess={10}
                specular={0x111111}
                emissive={0x111111}
                reflectivity={7}
                side={THREE.BackSide}
            />
        </mesh>
    )
}

function generateTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const context = canvas.getContext('2d')!
    context.fillStyle = 'white'
    context.fillRect(0, 0, 10,5)
    return canvas
}

export default function LightBallsScene() {
    return (
        <Canvas
            shadows={true}
            camera={{ position: [0, 10, 40], fov: 45 }}
        >
            <ambientLight color={0x111122} intensity={3} />
            <LightSphere color={0x0088ff} />
            <LightSphere color={0xff8888} />
            <BackgroundBox />
            <CameraControls />
        </Canvas>
    )
}

import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import CameraControls from './CameraControls'
import { TextureLoader } from 'three'

function LightSphere({id, color, intensity = 200 }: {id: number, color: THREE.ColorRepresentation, intensity?: number }) {
    const [clicked, click] = useState(false)
    const lightRef = useRef<THREE.PointLight>(null!)
    const texture = new THREE.CanvasTexture(generateTexture())
    texture.magFilter = THREE.NearestFilter
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.set(2, 15)

    useFrame((state) => {

        const time = state.clock.getElapsedTime() + ((id-1) * 10000)
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(time * 0.6) * 9
            lightRef.current.position.y = Math.sin(time * 0.7) * 9 + 6
            lightRef.current.position.z = Math.sin(time * 0.8) * 18
            lightRef.current.rotation.x = time
            lightRef.current.rotation.z = time
        }
    })

    return (
        <pointLight ref={lightRef} color={color} intensity={clicked ? intensity : intensity*10} distance={20} castShadow shadow-bias={-0.005}>
            <mesh onClick={() => click(!clicked)}>
                <sphereGeometry args={[0.3, 12, 6]} />
                <meshPhysicalMaterial emissive={color} emissiveIntensity={1} color={color} />
            </mesh>
            <mesh castShadow receiveShadow onClick={() => click(!clicked)}>
                <sphereGeometry args={[2, 32, 8]} />
                <meshStandardMaterial 
                    side={THREE.DoubleSide} 
                    alphaMap={texture} 
                    alphaTest={0.5} 
                    color={color} 
                    roughness={0} 
                    metalness={0.985} 
                    flatShading
                />
            </mesh>
        </pointLight>
    )
}

function BackgroundBox() {
    const [map, bumpMap, roughnessMap] = useLoader(TextureLoader, [
        '/textures/hardwood_diffuse.jpg',
        '/textures/hardwood_bump.jpg',
        '/textures/hardwood_roughness.jpg'
    ]);
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set(4, 4)
    map.needsUpdate = true

    bumpMap.wrapS = THREE.RepeatWrapping
    bumpMap.wrapT = THREE.RepeatWrapping
    bumpMap.anisotropy = 4
    bumpMap.repeat.set(4, 4)
    bumpMap.needsUpdate = true

    roughnessMap.wrapS = THREE.RepeatWrapping
    roughnessMap.wrapT = THREE.RepeatWrapping
    roughnessMap.anisotropy = 4
    roughnessMap.repeat.set(4, 4)
    roughnessMap.needsUpdate = true

    return (
        <mesh position={[0, 10, 0]} receiveShadow>
            <boxGeometry args={[30, 30, 60]} />
            <meshStandardMaterial
                color={0xa0adaf}
                side={THREE.BackSide}
                map={map}
                bumpMap={bumpMap}
                roughnessMap={roughnessMap}
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
            <LightSphere id={1} color={0xffff} />
            <LightSphere id={2} color={0xffffff} />
            <BackgroundBox />
            <CameraControls />
        </Canvas>
    )
}

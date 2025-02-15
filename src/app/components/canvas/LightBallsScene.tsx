import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import CameraControls from './CameraControls'
import CameraControlsMobile, { isMobile } from './CameraControlsMobile'
import { TextureLoader } from 'three'
import { useTheme } from '@/app/context/ThemeProvider'

function LightSphere({id, color, isWhiteMode, intensity = 200 }: {id: number, color: THREE.ColorRepresentation, isWhiteMode:boolean, intensity?: number }) {
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
        <pointLight ref={lightRef} color={color} intensity={clicked ? intensity : intensity*10} decay={isWhiteMode ? 5 : 2} distance={20} castShadow shadow-bias={-0.005}>
            <mesh onClick={() => click(!clicked)}>
                <sphereGeometry args={[0.3, 12, 6]} />
                <meshPhysicalMaterial emissive={color} emissiveIntensity={1} color={color} />
            </mesh>
            <mesh castShadow receiveShadow 
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'default'}
                onClick={() => click(!clicked)}
                >
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

function LightBulb({ color, isWhiteMode, setTheme }: { color: THREE.ColorRepresentation, isWhiteMode: boolean, setTheme: React.Dispatch<React.SetStateAction<string>> }) {
    const WHITE_MODE = process.env.NEXT_PUBLIC_THEME_LIGHT_MODE;
    const DARK_MODE = process.env.NEXT_PUBLIC_THEME_DARK_MODE;
    const lightRef = useRef<THREE.PointLight>(null!)
    const texture = new THREE.CanvasTexture(generateTexture())
    texture.magFilter = THREE.NearestFilter
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.set(5, 1)
    return (
        <>
        <pointLight ref={lightRef} 
            position={[0, 22, -20]} 
            decay={0.05} 
            intensity={isWhiteMode ? 10 : 0} 
            distance={200} 
            castShadow 
            shadow-bias={-0.005}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'default'}
            onClick={() => setTheme(isWhiteMode ? DARK_MODE! : WHITE_MODE!)}
        >
            <mesh>
            <sphereGeometry args={[0.3, 12, 6]} />
            <meshStandardMaterial emissive={isWhiteMode ? color : 0x000000} emissiveIntensity={1} color={color} />
            </mesh>
            <mesh  >
            <sphereGeometry args={[2, 32, 3]} />
            <meshStandardMaterial 
                side={THREE.DoubleSide} 
                alphaMap={texture} 
                alphaTest={0.5} 
                color={color} 
            />
            </mesh>
        </pointLight>
        </>
    )
}

function BackgroundBox({isWhiteMode}: {isWhiteMode: boolean}) {
    const [map, bumpMap, roughnessMap] = useLoader(TextureLoader, [
        '/textures/hardwood_diffuse.jpg',
        '/textures/hardwood_bump.jpg',
        '/textures/hardwood_roughness.jpg'
    ]);

    const setupTexture = (texture: THREE.Texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 4;
        texture.repeat.set(4, 4);
        texture.needsUpdate = true;
    };

    [map, bumpMap, roughnessMap].forEach(setupTexture);

    return (
        <mesh position={[0, 10, 0]} receiveShadow>
            <boxGeometry args={[30, 30, 60]} />
            <meshStandardMaterial
                color={0xa0adaf}
                side={THREE.BackSide}
                map={map}
                bumpMap={bumpMap}
                roughnessMap={roughnessMap}
                roughness={isWhiteMode ? 3 : 0.75}
                metalness={0.5}
                bumpScale={2}
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
    const { setTheme, isWhiteMode } = useTheme()
    return (
        <Canvas
            shadows={true}
            camera={{ position: [0, 10, 40], fov: 45 }}
        >
            <ambientLight color={0x111122} intensity={3} />
            <LightBulb color={0xffffff} isWhiteMode={isWhiteMode} setTheme={setTheme}/>
            <LightSphere id={1} color={0xffff} isWhiteMode={isWhiteMode}/>
            <LightSphere id={2} color={0xffffff} isWhiteMode={isWhiteMode}/>
            <BackgroundBox isWhiteMode={isWhiteMode}/>
            {isMobile() ? <CameraControlsMobile /> : <CameraControls />}
        </Canvas>
    )
}

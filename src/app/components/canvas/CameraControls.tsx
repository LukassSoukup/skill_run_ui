import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const CameraControls = () => {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = -(event.clientX / window.innerWidth) + 0.5
            mouse.current.y = -(event.clientY / window.innerHeight)
            
            // Convert mouse position to rotation angles
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useFrame(() => {
        // Smoothly interpolate rotation
        //camera.rotation.x = (targetRotation.current.x - camera.rotation.x) * 0.05
        //camera.rotation.y = (targetRotation.current.y - camera.rotation.y) * 0.05
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (mouse.current.y * Math.PI) / 10, 0.1)
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (mouse.current.x * Math.PI) / 10, 0.1)
        
    })

    return null
}

export default CameraControls
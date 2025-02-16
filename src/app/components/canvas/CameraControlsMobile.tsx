import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const isMobile = () => {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const CameraControls = () => {
    console.debug("Mobile device detected, using mobile camera controls");
    const { camera } = useThree()
    const orientation = useRef({ alpha: 0, beta: 0, gamma: 0 })

    useEffect(() => {
        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            orientation.current.alpha = event.alpha || 0
            orientation.current.beta = event.beta || 0
            orientation.current.gamma = event.gamma || 0
        }

        window.addEventListener('deviceorientation', handleDeviceOrientation)
        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation)
        }
    }, [])

    useFrame(() => {
        // Smoothly interpolate rotation
        const targetX = THREE.MathUtils.lerp(camera.rotation.x, (orientation.current.beta * Math.PI) / 10, 0.1)
        const targetY = THREE.MathUtils.lerp(camera.rotation.y, (orientation.current.gamma * Math.PI) / 10, 0.1)

         // Constrain rotation to stay within the box
        const minRotationX = -Math.PI / 4   // -45 degrees
        const maxRotationX = Math.PI / 4    // +45 degrees
        const minRotationY = -Math.PI / 4   // -45 degrees
        const maxRotationY = Math.PI / 4    // +45 degrees

        camera.rotation.x = THREE.MathUtils.clamp(targetX, minRotationX, maxRotationX)
        camera.rotation.y = THREE.MathUtils.clamp(targetY, minRotationY, maxRotationY)
    
    })

    return null
}

export default CameraControls
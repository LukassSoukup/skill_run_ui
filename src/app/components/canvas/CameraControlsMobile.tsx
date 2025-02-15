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
    const targetRotation = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            orientation.current.alpha = event.alpha || 0
            orientation.current.beta = event.beta || 0
            orientation.current.gamma = event.gamma || 0
            console.debug(event.alpha, event.beta, event.gamma);
            console.debug(THREE.MathUtils.degToRad(orientation.current.beta), THREE.MathUtils.degToRad(orientation.current.gamma));
            // Convert device orientation to rotation angles
            targetRotation.current.x = THREE.MathUtils.degToRad(orientation.current.beta) // vertical rotation
            targetRotation.current.y = THREE.MathUtils.degToRad(orientation.current.gamma) // horizontal rotation
        }

        window.addEventListener('deviceorientation', handleDeviceOrientation)
        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation)
        }
    }, [])

    useFrame(() => {
        // Smoothly interpolate rotation
        camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05
        camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05
    })

    return null
}

export default CameraControls
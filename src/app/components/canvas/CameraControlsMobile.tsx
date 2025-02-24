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
        // Calculate target position and rotation based on device orientation
        // The scene is located at orientation 0,0,0 - thats why we need to bring the orientation closer to 0 by multiplying it with roation speed constant
        // beta is subtracted by 90 to make the orientation more in the center of the scene and to fit the natural holding position of the device
        const ROTATION_SPEED_X = 0.4;
        const ROTATION_SPEED_Y = 0.1;
        const targetX = ((orientation.current.gamma*ROTATION_SPEED_X) * Math.PI) / 180
        const targetY = (((orientation.current.beta-90)*ROTATION_SPEED_Y) * Math.PI) / 180

        // Constrain rotation to stay within the box
        const minRotationX = -Math.PI / 8 // -22.5 degrees
        const maxRotationX = Math.PI / 8  // 22.5 degrees
        const minRotationY = -Math.PI / 8 // -22.5 degrees
        const maxRotationY = Math.PI / 8  // 22.5 degrees

        // Smoothly interpolate rotation with easing
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, THREE.MathUtils.clamp(targetY, minRotationX, maxRotationX), 0.03)
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, THREE.MathUtils.clamp(targetX, minRotationY, maxRotationY), 0.03)

    })

    return null
}

export default CameraControls
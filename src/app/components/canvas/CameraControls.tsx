import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

const CameraControls = () => {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })
    const targetRotation = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = -(event.clientX / window.innerWidth) 
            mouse.current.y = -(event.clientY / window.innerHeight)
            
            // Convert mouse position to rotation angles
            targetRotation.current.x = mouse.current.y * Math.PI // vertical rotation
            targetRotation.current.y = mouse.current.x * Math.PI // horizontal rotation
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useFrame(() => {
        // Smoothly interpolate rotation
        camera.rotation.x = (targetRotation.current.x - camera.rotation.x) * 0.05
        camera.rotation.y = (targetRotation.current.y - camera.rotation.y) * 0.05
    })

    return null
}

export default CameraControls
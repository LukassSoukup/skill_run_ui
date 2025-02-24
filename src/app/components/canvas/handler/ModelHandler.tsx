import React from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface CustomModelProps {
    url: string, 
    size?: [x: number, y: number, z:number],
    position?: [x: number, y: number, z:number],
}
const CustomModel = ({ url, size, position }: CustomModelProps) => {
  const gltf = useLoader(GLTFLoader, url)
  if(size) {
    gltf.scene.scale.set(size[0], size[1], size[2]);
  }
  if(position) {
    gltf.scene.position.set(position[0], position[1], position[2]); 
  }
  return <primitive object={gltf.scene} />
}

export default CustomModel;
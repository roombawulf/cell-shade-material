import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from "@react-three/drei"
import { useControls } from 'leva'
import { useEffect, useRef } from "react"

import vertexShader from './shaders/cellshade-material/vertex.glsl'
import fragmentShader from './shaders/cellshade-material/fragment.glsl'

const CellShadeMaterial = shaderMaterial(
    {
        ...THREE.UniformsLib.lights,
        u_color: new THREE.Color(),
        u_diffuseCell: null,
        u_specularCell: null,
        u_shine: null
    },
    vertexShader, 
    fragmentShader,
    material => { 
        material.lights = true 
    }
)
extend({ CellShadeMaterial })

function CellShade(){

    const mesh = useRef()
    const { color, diffuseCell, specularCell, shine } = useControls('Cell-Shade Material', {
        color: '#bebebe',
        diffuseCell: {value: 1.2, min: 0.01, max: 2.0, step: 0.01},
        specularCell: {value: 0.05, min: 0.01, max: 2.0, step: 0.01},
        shine: {value: 500.0, min: 1.0, max: 1000.0, step: 1.0}
    })

    useFrame(({clock}) => {
        mesh.current.rotation.y = 0.5 * clock.elapsedTime
        mesh.current.rotation.x =  0.4 * clock.elapsedTime
    })

    return (
        <mesh ref={mesh} castShadow receiveShadow={true}>
            <torusKnotGeometry args={[1, 0.2, 300, 20]}/>
            <cellShadeMaterial key={CellShadeMaterial.key}
                u_color={color}
                u_diffuseCell={diffuseCell} 
                u_specularCell={specularCell}
                u_shine={shine} 
            />
        </mesh>
    )
}
export default CellShade
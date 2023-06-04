import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { DirectionalLightHelper } from "three";
import { useRef } from "react"

import CellShade from "./CellShade";


function Lights(){
    const dirLight1 = useRef()
    const dirLight2 = useRef()
    const dirLightControl1 = useControls(' Light 1', {
        position: {x: -2.0, y: 0.0, z: 1.0},
        color: '#F9584B'
    })
    const dirLightControl2 = useControls(' Light 2', {
        position: {x: 0.0, y: 2.0, z: 2.0},
        color: '#c38c00'
    })

    useHelper(dirLight1, DirectionalLightHelper)
    useHelper(dirLight2, DirectionalLightHelper)

    return(
        <>
            <directionalLight ref={dirLight1} castShadow
                position={[dirLightControl1.position.x, dirLightControl1.position.y, dirLightControl1.position.z]} 
                color={dirLightControl1.color}
                shadow-mapSize-height={512} 
                shadow-mapSize-width={512} 
            />
            <directionalLight ref={dirLight2} castShadow
                position={[dirLightControl2.position.x, dirLightControl2.position.y, dirLightControl2.position.z]} 
                color={dirLightControl2.color} 
                shadow-mapSize-height={512} 
                shadow-mapSize-width={512}
            />
        </>
    )

}


function Experience(){

    return (
        <div className="canvas-container">
            <Canvas camera={{position: [0,2,2]}} shadows='soft'>
                <color attach="background" args={['#071416']} />
                <ambientLight intensity={0.1} color={'white'}/>
                <CellShade />
                <Lights />
                <OrbitControls />
            </Canvas>
        </div>
    )
}
export default Experience
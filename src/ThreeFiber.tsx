import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Model() {
  const result = useLoader(GLTFLoader, 'models/skyscraper/scene.gltf');
  return (
    <primitive
      object={result.scene}
      scale={[0.2, 0.2, 0.2]}
      position={[0, -10, 10]}
      rotation={[0, -0.8, 0]}
    />
  );
}

function TextOverlay() {
  return (
    <div className="z-20 text-white absolute top-0 left-0 h-screen w-1/2 flex flex-col justify-center items-center">
      <h1 className="text-5xl">REACT THREE FIBER</h1>
    </div>
  );
}

function ThreeFiber() {
  return (
    <>
      <TextOverlay />
      <Canvas className="z-10 bg-[#121212]">
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={75}
          near={0.1}
          far={1000}
        />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight />
        <Model />
      </Canvas>
    </>
  );
}

export default ThreeFiber;

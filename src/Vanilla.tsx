import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

function Vanilla() {
  const canvasRef = useRef(null);
  const loader = new GLTFLoader();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x12121212);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(2);
    // const box = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshStandardMaterial({ color: 'yellow' });
    // const boxWithMat = new THREE.Mesh(box, material);

    const light = new THREE.AmbientLight(0xffffff, 2);
    light.castShadow = true;
    scene.add(light);
    let scrapper: THREE.Group<THREE.Object3DEventMap>;
    // scene.add(boxWithMat);
    loader.load(
      'models/skyscraper/scene.gltf',
      function renderModel(gltf) {
        scrapper = gltf.scene;
        scrapper.scale.set(0.2, 0.2, 0.2);
        scrapper.position.set(20, -12, 10);
        // const boxHelper = new THREE.BoxHelper(scrapper, 0xffff00);
        // scene.add(boxHelper);
        scene.add(scrapper);
      },
      undefined,
      function errorHandler(error) {
        console.error(error);
      }
    );

    camera.position.z = 20;

    const animate = () => {
      // boxWithMat.rotation.x += 0.01;
      // boxWithMat.rotation.y += 0.01;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  });

  return (
    <div className="App ">
      <canvas className="z-10 absolute" ref={canvasRef} />
      <div className="text-white z-20 relative h-screen w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-5xl">THREEJS</h1>
      </div>
    </div>
  );
}

export default Vanilla;

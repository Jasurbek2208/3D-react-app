import React, { useEffect, useRef } from 'react';
import { AmbientLight, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas: canvasRef.current });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(1280, 720);

    const aLight = new AmbientLight(0x404040, 1.2);
    scene.add(aLight);

    const pLight = new PointLight(0xffffff, 1.2);
    pLight.position.set(0, -3, 7);
    scene.add(pLight);

    const loader = new GLTFLoader();
    loader.load('/3D-models/scene.gltf', function (gltf) {
      const obj = gltf.scene;
      obj.scale.set(1.3, 1.3, 1.3);
      scene.add(obj);
    });

    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    render();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to <br /> My first 3D site</h1>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;

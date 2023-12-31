import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

//scene
const scene = new THREE.Scene();

//sizes
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  3000);
camera.position.set(0, 500, 1000);
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRederTarget = new THREE.WebGLCubeRenderTarget(500);

// cube camra
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRederTarget);

scene.add(cubeCamera);


// envimage
const urls = [
  '/envImage/right.png',
  '/envImage/left.png',
  '/envImage/up.png',
  '/envImage/down.png',
  '/envImage/front.png',
  '/envImage/back.png',
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);



// object
const material = new THREE.MeshBasicMaterial({
  envMap: cubeRederTarget.texture,
  reflectivity: 1
});
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

function animate() {
  controls.update();
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();





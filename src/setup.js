import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { stud, studLine } from './materials/24';
import { generate, lines } from './materials/ply';
import frontDoor from './materials/ext_door2';
import slab from './materials/slab';

const initialize = () => {
  // ---------------------------
  // --- scene, sizes, colors --
  // ---------------------------
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const white = new THREE.Color('white');
  const pink = new THREE.Color('red');
  const scene = new THREE.Scene();

  // ---------------------------
  // --- vertical studs --------
  // ---------------------------
  const beams = [];
  const beamLines = [];

  for (var i = 0; i < 10; i++) {
    let newBeam = stud(10);
    let newLine = studLine(10);
    beams.push(newBeam);
    beamLines.push(newLine);
    beams[i].position.x = i * 16;
    beams[i].position.y = 12;
    beamLines[i].position.x = i * 16;
    beamLines[i].position.y = 12;
    scene.add(beams[i]);
    scene.add(beamLines[i]);
  }

  // ---------------------------
  // --- plywood sheathing -----
  // ---------------------------

  let plyw = true;

  if (plyw) {
    let newPly = generate(8, 4);
    let newLines = lines(8, 4);
    let Xoffset = 0.75;
    let Yoffset = -24;
    newPly.position.z = 2;
    newPly.position.x = 48 - Xoffset;
    newPly.position.y = Yoffset;
    newLines.position.z = 2;
    newLines.position.x = 48 - Xoffset;
    newLines.position.y = Yoffset;
    scene.add(newPly);
    scene.add(newLines);

    let newPly2 = generate(4, 4);
    let newLines2 = lines(4, 4);
    newPly2.position.z = 2;
    newPly2.position.x = 24 - Xoffset;
    newPly2.position.y = Yoffset + 48;
    newLines2.position.z = 2;
    newLines2.position.x = 24 - Xoffset;
    newLines2.position.y = Yoffset + 48;
    scene.add(newPly2);
    scene.add(newLines2);

    let newPly3 = generate(8, 4);
    let newLines3 = lines(8, 4);
    newPly3.position.z = 2;
    newPly3.position.x = 96 - Xoffset;
    newPly3.position.y = Yoffset + 48;
    newLines3.position.z = 2;
    newLines3.position.x = 96 - Xoffset;
    newLines3.position.y = Yoffset + 48;
    scene.add(newPly3);
    scene.add(newLines3);

    let newPly4 = generate(4, 4);
    let newLines4 = lines(4, 4);
    newPly4.position.z = 2;
    newPly4.position.x = 120 - Xoffset;
    newPly4.position.y = Yoffset;
    newLines4.position.z = 2;
    newLines4.position.x = 120 - Xoffset;
    newLines4.position.y = Yoffset;
    scene.add(newPly4);
    scene.add(newLines4);
  }

  // ---------------------------
  // --- front door ------------
  // ---------------------------
  const fDoor = frontDoor(-20.5, -1 * (96 / 2 - 79 / 2), -0.825);
  for (var i = 0; i < fDoor.length; i++) {
    scene.add(fDoor[i]);
  }

  // ---------------------------
  // --- foundation ------------
  // ---------------------------
  const foundation = slab();
  foundation.position.y = -51;
  scene.add(foundation);

  // ---------------------------
  // --- light -----------------
  // ---------------------------
  const light1 = new THREE.PointLight(white, 1, 100);
  const light2 = new THREE.PointLight(white, 1, 100);
  const light3 = new THREE.PointLight(pink, 1, 100);
  const light4 = new THREE.PointLight(pink, 1, 100);
  light1.position.set(0, 40, 50);
  light2.position.set(0, 40, -50);
  light3.position.set(2, 80, 0);
  light4.position.set(2, -80, 0);
  light1.intensity = 1;
  light2.intensity = 1;
  light3.intensity = 1;
  light4.intensity = 1;
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);
  scene.add(light4);

  // ---------------------------
  // --- hemisphere light ------
  // ---------------------------
  const hemiLight = new THREE.HemisphereLight(0xd1f2ff, 0xd1f2ff, 1);
  scene.add(hemiLight);

  // ---------------------------
  // --- camera ----------------
  // ---------------------------
  const aspect = sizes.width / sizes.height;
  const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
  let initcX = Number(localStorage.getItem('controlcX'));
  let initcY = Number(localStorage.getItem('controlcY'));
  let initcZ = Number(localStorage.getItem('controlcZ'));
  camera.position.x = initcX;
  camera.position.y = initcY;
  camera.position.z = initcZ;
  scene.add(camera);

  // ---------------------------
  // --- renderer --------------
  // ---------------------------
  const canvas = document.querySelector('#main');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
  renderer.render(scene, camera);

  // ---------------------------
  // --- controls --------------
  // ---------------------------
  const controls = new OrbitControls(camera, canvas);

  let initX = Number(localStorage.getItem('controlX'));
  let initY = Number(localStorage.getItem('controlY'));
  let initZ = Number(localStorage.getItem('controlZ'));

  controls.target.set(initX, initY, initZ);
  controls.enableDamping = true;
  let controlTimeout;
  controls.addEventListener('change', (e) => {
    clearTimeout(controlTimeout);
    controlTimeout = setTimeout(() => {
      console.log(controls);
      localStorage.setItem('controlX', controls.target.x);
      localStorage.setItem('controlY', controls.target.y);
      localStorage.setItem('controlZ', controls.target.z);
      localStorage.setItem('controlcX', controls.object.position.x);
      localStorage.setItem('controlcY', controls.object.position.y);
      localStorage.setItem('controlcZ', controls.object.position.z);
    }, 35);
  });

  // ---------------------------
  // -- resize event listener --
  // ---------------------------
  window.addEventListener('resize', () => {
    console.log('window changed');
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };
  loop();
};

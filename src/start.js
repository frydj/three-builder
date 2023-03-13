import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { stud, studLine } from './materials/24';
import { generate, lines } from './materials/ply';
import frontDoor from './materials/ext_door2';
import slab from './materials/slab';
import { InteractionManager } from 'three.interactive';
import axios from 'axios';
import U2410 from './models/2410U';
import Terrain from 'three-terrain';
import cinderblock from './models/CIND-REG';

// ---------------------------
// --- scene, sizes, colors --
// ---------------------------
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const loader = new THREE.TextureLoader();
const white = new THREE.Color('white');
const pink = new THREE.Color('red');
const scene = new THREE.Scene();
// scene.background = loader.load('brm.jpg');
// scene.backgroundBlurriness = 0.99;

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
// scene.add(light1);
// scene.add(light2);
// scene.add(light3);
// scene.add(light4);

// ---------------------------
// --- hemisphere light ------
// ---------------------------
const hemiLight = new THREE.HemisphereLight(0xd1f2ff, 0xd1f2ff, 1);
scene.add(hemiLight);

// ---------------------------
// --- camera ----------------
// ---------------------------
const aspect = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 10000);
let initcX = Number(localStorage.getItem('controlcX')) || 0;
let initcY = Number(localStorage.getItem('controlcY')) || 0;
let initcZ = Number(localStorage.getItem('controlcZ')) || 20;
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

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// const cnd = cinderblock(10, 0, 0);
// for (var ci = 0; ci < cnd.length; ci++) {
//   scene.add(cnd[ci]);
// }

// const cnd2 = cinderblock(10, 0, 16 + 3 / 8);
// for (var ci = 0; ci < cnd2.length; ci++) {
//   scene.add(cnd2[ci]);
// }

// const cnd3 = cinderblock(10, 0, 32 + 3 / 4);
// for (var ci = 0; ci < cnd3.length; ci++) {
//   scene.add(cnd3[ci]);
// }

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
    localStorage.setItem('controlX', controls.target.x);
    localStorage.setItem('controlY', controls.target.y);
    localStorage.setItem('controlZ', controls.target.z);
    localStorage.setItem('controlcX', controls.object.position.x);
    localStorage.setItem('controlcY', controls.object.position.y);
    localStorage.setItem('controlcZ', controls.object.position.z);
  }, 1);
});

// ---------------------------
// --- terrain ---------------
// ---------------------------

// const terrain = new Terrain({
//   width: 640,
//   height: 255,
//   depth: 640,
//   maps: {
//     colorRGBheightAlpha: 'grass.png',
//     //   /*
//     //     colorRGB: colormap from image RGB
//     //     colorRGBheightAlpha: colormap from image RGB + heightmap from alpha channel
//     //     colorRGBheightRGB: colormap from RGB + heightmap from RGB grayscale
//     //     heightAlpha: heightmap from image alpha channel
//     //     heightR: heightmap from image red channel
//     //     heightRGB: heightmap from image RGB grayscale
//     //   */
//   },
// });
// scene.add(terrain);

// ---------------------------
// --- vertical studs --------
// ---------------------------
const beams = [];
const beamLines = [];

for (var i = 0; i < 10; i++) {
  let newBeam = stud(10);
  let newLine = studLine(10);

  // interactionManager.update();
  // interactionManager.add(newBeam);
  // newBeam.addEventListener('mouseover', (event) => {
  //   event.target.material.color.set(0xff0000);
  //   document.body.style.cursor = 'pointer';
  // });
  // newBeam.addEventListener('mouseout', (event) => {
  //   event.target.material.color.set(0xf2dcaa);
  //   document.body.style.cursor = 'default';
  // });
  // interactionManager.update();

  // beams.push(newBeam);
  // beamLines.push(newLine);
  // beams[i].position.x = i * 16;
  // beams[i].position.y = 12;
  // beamLines[i].position.x = i * 16;
  // beamLines[i].position.y = 12;
  // scene.add(beams[i]);
  // scene.add(beamLines[i]);
  // interactionManager.add(beams[i]);
  // interactionManager.update();
}

// beams[0].addEventListener('mouseover', (event) => {
//   event.target.material.color.set(0xff0000);
//   document.body.style.cursor = 'pointer';
// });
// beams[0].addEventListener('mouseout', (event) => {
//   event.target.material.color.set(0xf2dcaa);
//   console.log(event.target);
//   document.body.style.cursor = 'default';
// });
interactionManager.update();

// ---------------------------
// --- plywood sheathing -----
// ---------------------------

/* TODOS? */

// ---------------------------
// --- front door ------------
// ---------------------------

/* TODOS? */

// ---------------------------
// --- foundation ------------
// ---------------------------
const foundation = slab();
foundation.position.y = -3;
scene.add(foundation);

// just test...

// const geeo = new THREE.BoxGeometry(120, 0.1, 120);
// const matt = new THREE.MeshStandardMaterial({
//   color: '#f2dcaa',
//   roughness: 0.8,
// });

// const mish = new THREE.Mesh(geeo, matt);
// mish.position.y = 0;
// scene.add(mish);

// ---------------------------
// --- fetch from db ---------
// ---------------------------

axios.defaults.baseURL = 'http://localhost:5001';
let url = '/pieces';
let pieces = [];
axios.get(url).then((res) => {
  console.log(res.data);
  pieces = res.data;

  var cuts = [
    {
      deg: 45,
      length: 3,
    },
  ];

  for (var i = 0; i < pieces.length; i++) {
    // front door(s)
    if (pieces[i].shortcode === 'FD1') {
      console.log('is front door!');
      const fDoor = frontDoor(
        pieces[i].positionX,
        pieces[i].positionY,
        pieces[i].positionZ
      );
      for (var j = 0; j < fDoor.length; j++) {
        scene.add(fDoor[j]);
        interactionManager.add(fDoor[j]);
        fDoor[j].addEventListener('click', (event) => {
          console.log("that's my ice cream cone!");
        });
      }
    }

    // 2 x 4 x 10 U
    if (pieces[i].shortcode === '2410U') {
      console.log('is stud!');
      const plank = U2410(
        pieces[i].positionX,
        pieces[i].positionY,
        pieces[i].positionZ,
        JSON.parse(pieces[i].cuts)
      );
      for (var j = 0; j < plank.length; j++) {
        scene.add(plank[j]);
        interactionManager.add(plank[j]);
        plank[j].addEventListener('click', (event) => {
          console.log("he's a stud!");
        });
      }
    }

    // cinderblocks
    if (pieces[i].shortcode === 'CIND-REG') {
      console.log('is cinderblock!');
      const cnd = cinderblock(
        pieces[i].positionX,
        pieces[i].positionY,
        pieces[i].positionZ,
        JSON.parse(pieces[i].cuts)[0].ang
      );
      for (var j = 0; j < cnd.length; j++) {
        scene.add(cnd[j]);
        interactionManager.add(cnd[j]);
        cnd[j].addEventListener('click', (event) => {
          console.log("he's a cinder!");
        });
      }
    }
  }
});

// ---------------------------
// -- resize event listener --
// ---------------------------
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  interactionManager.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

const animate = (time) => {
  requestAnimationFrame(animate);
  interactionManager.update();
  renderer.render(scene, camera);
};
animate();

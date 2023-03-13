import * as THREE from 'three';
import CSG from '../utils/three-csg';
import glassPane from './glass';

const door = (x, y, z) => {
  // main door body

  const texture = new THREE.TextureLoader().load('matteblack.png');
  let geometry = new THREE.BoxGeometry(36, 79, 1.75);
  const edges = new THREE.EdgesGeometry(geometry);
  const material = new THREE.MeshStandardMaterial({
    color: '#5b6673',
    roughness: 0.8,
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);

  // make windows
  let margin = 4.5;
  let window1 = new THREE.Mesh(new THREE.BoxGeometry(36 - margin * 2, 10, 5));
  let window2 = window1.clone();
  let window3 = window1.clone();
  let window4 = window1.clone();
  let window5 = window1.clone();

  // affix the window positions
  let strt = 9;
  let gap = 10 + margin;
  window1.position.y = 79 / 2 - strt;
  window2.position.y = 79 / 2 - (strt + gap * 1);
  window3.position.y = 79 / 2 - (strt + gap * 2);
  window4.position.y = 79 / 2 - (strt + gap * 3);
  window5.position.y = 79 / 2 - (strt + gap * 4);

  // Make sure the .matrix of each mesh is current
  mesh.updateMatrix();
  window1.updateMatrix();
  window2.updateMatrix();
  window3.updateMatrix();
  window4.updateMatrix();
  window5.updateMatrix();

  // Create a bsp tree from each of the meshes
  let bspDoor = CSG.fromMesh(mesh);
  let bspWindow1 = CSG.fromMesh(window1);
  let bspWindow2 = CSG.fromMesh(window2);
  let bspWindow3 = CSG.fromMesh(window3);
  let bspWindow4 = CSG.fromMesh(window4);
  let bspWindow5 = CSG.fromMesh(window5);

  // Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
  let bspResult = bspDoor.subtract(bspWindow1);
  bspResult = bspResult.subtract(bspWindow2);
  bspResult = bspResult.subtract(bspWindow3);
  bspResult = bspResult.subtract(bspWindow4);
  bspResult = bspResult.subtract(bspWindow5);

  // Get the resulting mesh from the result bsp, and assign meshA.material to the resulting mesh
  let meshResult = CSG.toMesh(bspResult, mesh.matrix, mesh.material);
  meshResult.position.x = x;
  meshResult.position.y = y;
  meshResult.position.z = z;
  return meshResult;
};

export default door;

import * as THREE from 'three';
import CSG from '../utils/three-csg';
import { stud, studLine } from '../materials/24';

// const cutDeg = 0;
// const cutLength = 6;
const showOriginal = true;

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
const material1 = new THREE.MeshStandardMaterial({
  color: '#f2dcaa',
  roughness: 0.8,
});

const material2 = new THREE.MeshStandardMaterial({
  color: '#4287f5',
  roughness: 0.8,
});

const create = (x, y, z, cuts) => {
  const plnk = stud(10);
  let cutDeg = cuts[0]?.deg;
  let cutLength = cuts[0]?.length;

  let degg = cutDeg / 180;
  const legm = 1.75 * Math.sin(toRadians(cutDeg)) * 2;

  let cut2 = new THREE.Mesh(new THREE.BoxGeometry(2.1, legm, 500), material2);
  console.log('degg', degg);
  cut2.rotation.x = Math.PI * degg;

  let cut1 = new THREE.Mesh(new THREE.BoxGeometry(2, 4, cutLength), material1);

  cut1.rotation.x = Math.PI / 2;

  cut1.position.x = x;
  // y position is top of stud, minus half the cut length
  cut1.position.y = 120 - cutLength / 2;
  cut1.position.z = z;

  cut2.position.x = x;
  // y position is top of stud, minus the full cut length
  cut2.position.y = y + 120 - cutLength;
  cut2.position.z = z;

  plnk.position.x = x;
  plnk.position.y = y + 60;
  plnk.position.z = z;

  // Make sure the .matrix of each mesh is current
  plnk.updateMatrix();
  cut1.updateMatrix();
  cut2.updateMatrix();

  // Create a bsp tree from each of the meshes
  let bspPlnk = CSG.fromMesh(plnk);
  let bspCut1 = CSG.fromMesh(cut1);
  let bspCut2 = CSG.fromMesh(cut2);

  // Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
  let bspResult = bspPlnk;

  if (cutLength > 0) {
    bspResult = bspResult.subtract(bspCut1);
  }
  if (cutDeg > 0) {
    bspResult = bspResult.subtract(bspCut2);
  }

  // Get the resulting mesh from the result bsp, and assign meshA.material to the resulting mesh
  let meshResult = CSG.toMesh(bspResult, plnk.matrix, plnk.material);
  meshResult.position.x = x;
  meshResult.position.y = y + 60;
  meshResult.position.z = z;

  let meshLines = CSG.toGeometry(bspResult, plnk.matrix, plnk.material);
  const edges = new THREE.EdgesGeometry(meshLines);

  const line = studLine(10);

  line.position.x = x;
  line.position.y = y + 60;
  line.position.z = z;
  line.updateMatrix();

  const line2 = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xff8d85 })
  );
  line2.updateMatrix();

  // return [plnk, line, cut1, cut2];
  if (showOriginal) {
    return [meshResult, line];
  } else {
    return [meshResult, line2];
  }
};

export default create;

import * as THREE from 'three';
import CSG from '../utils/three-csg';

// Make 2 box meshes..
let meshA = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30));
let meshB = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30));

// offset one of the boxes by half its width..
meshB.position.add(new THREE.Vector3(0.1, 0.1, 0.1));

// Make sure the .matrix of each mesh is current
meshA.updateMatrix();
meshB.updateMatrix();

// Create a bsp tree from each of the meshes
let bspA = CSG.fromMesh(meshA);
let bspB = CSG.fromMesh(meshB);

// Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
let bspResult = bspA.subtract(bspB);

// Get the resulting mesh from the result bsp, and assign meshA.material to the resulting mesh
let meshResult = CSG.toMesh(bspResult, meshA.matrix, meshA.material);
meshResult.position.x = 20;
meshResult.position.y = 120;
meshResult.position.z = 0;
// scene.add(meshResult);

export default meshResult;

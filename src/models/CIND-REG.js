import * as THREE from 'three';
import CSG from '../utils/three-csg';

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

const cinderblock = (x, y, z, ang) => {
  const texture = new THREE.TextureLoader().load('cinder.png');
  const geometry = new THREE.BoxGeometry(8, 8, 16);
  const material = new THREE.MeshStandardMaterial({
    color: '#5c5c5c',
    roughness: 0.8,
    map: texture,
  });
  let item = new THREE.Mesh(geometry, material);

  let hole1 = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 5.5));
  let hole2 = hole1.clone();

  hole1.position.z = 3.5;
  hole2.position.z = -3.5;

  item.updateMatrix();
  hole1.updateMatrix();
  hole2.updateMatrix();

  let bspItem = CSG.fromMesh(item);
  let bspHole1 = CSG.fromMesh(hole1);
  let bspHole2 = CSG.fromMesh(hole2);

  let bspResult = bspItem.subtract(bspHole1);
  bspResult = bspResult.subtract(bspHole2);
  let meshResult = CSG.toMesh(bspResult, item.matrix, item.material);

  let meshLines = CSG.toGeometry(bspResult, item.matrix, item.material);
  const edges = new THREE.EdgesGeometry(meshLines);

  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x0f0f0f })
  );
  line.updateMatrix();

  meshResult.position.x = x;
  meshResult.position.y = y + 4;
  meshResult.position.z = z;

  line.position.x = x;
  line.position.y = y + 4;
  line.position.z = z;

  let rota = toRadians(ang);

  meshResult.rotation.y = rota;
  line.rotation.y = rota;

  return [meshResult, line];
};

export default cinderblock;

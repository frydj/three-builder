import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('ply.png');

// Rectangular Prism
const geometry = new THREE.BoxGeometry(12, 0.5, 12);
const edges = new THREE.EdgesGeometry(geometry);
const material = new THREE.MeshStandardMaterial({
  color: '#ffd1d1',
  roughness: 0.8,
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.scale.z = 8;
mesh.rotation.x = Math.PI / 2;

const generate = (length, width) => {
  let item = new THREE.Mesh(geometry, material);
  if (length) {
    item.scale.x = length;
  }
  if (width) {
    item.scale.z = width;
  }
  item.rotation.x = Math.PI / 2;
  return item;
};

const lines = (length, width) => {
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xe85dae })
  );
  if (length) {
    line.scale.x = length;
  }
  if (width) {
    line.scale.z = width;
  }
  line.rotation.x = Math.PI / 2;
  return line;
};

export { generate, lines };

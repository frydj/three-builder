import * as THREE from 'three';

const slab = () => {
  const texture = new THREE.TextureLoader().load('concrete2.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  const geometry = new THREE.BoxGeometry(1200, 6, 1200);
  // const edges = new THREE.EdgesGeometry(geometry);
  const material = new THREE.MeshStandardMaterial({
    color: '#a8a8a8',
    roughness: 1,
    map: texture,
  });

  return new THREE.Mesh(geometry, material);
};

export default slab;

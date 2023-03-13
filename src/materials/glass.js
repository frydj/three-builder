import * as THREE from 'three';

const glassPane = (x, y, z) => {
  const geometry = new THREE.BoxGeometry(x, y, z);
  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.1,
    transmission: 1,
    thickness: 0.1,
    color: '#a1a5ab',
  });

  return new THREE.Mesh(geometry, material);
};

export default glassPane;

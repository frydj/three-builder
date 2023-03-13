import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('pine.png');

// Rectangular Prism
const geometry = new THREE.BoxGeometry(1.5, 3.5, 12);
const edges = new THREE.EdgesGeometry(geometry);
const material = new THREE.MeshStandardMaterial({
  color: '#f2dcaa',
  roughness: 0.8,
  map: texture,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.scale.z = 10;
mesh.rotation.x = Math.PI / 2;

const stud = (scale) => {
  let item = new THREE.Mesh(geometry, material);
  if (scale) {
    item.scale.z = scale;
  }
  item.rotation.x = Math.PI / 2;

  // item.addEventListener('mouseover', (event) => {
  //   event.target.material.color.set(0xff0000);
  //   document.body.style.cursor = 'pointer';
  //   console.log(e.target)
  // });
  // item.addEventListener('mouseout', (event) => {
  //   event.target.material.color.set(0xf2dcaa);
  //   console.log(event.target);
  //   document.body.style.cursor = 'default';
  // });

  return item;
};

const studLine = (scale) => {
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x91783f })
  );
  if (scale) {
    line.scale.z = scale;
  }
  line.rotation.x = Math.PI / 2;
  return line;
};

export { stud, studLine };

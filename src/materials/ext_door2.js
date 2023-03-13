import * as THREE from 'three';
import CSG from '../utils/three-csg';
import glassPane from './glass';
import doorFrame from './ext_door';

const frontDoor = (x, y, z) => {
  const yVal = y + 39.5;
  console.log('yVal', yVal);
  const frame = doorFrame(x, yVal, z);
  const windows = [];

  let initial = -27.5;
  let step = 14.5;
  for (var i = 0; i < 5; i++) {
    // create 5 glass panes
    const win = glassPane(27, 10, 1);
    let val = 39.5 + initial + step * i;
    win.position.x = x;
    win.position.y = val + y;
    win.position.z = z;
    windows.push(win);
  }

  return [frame, ...windows];
};

export default frontDoor;

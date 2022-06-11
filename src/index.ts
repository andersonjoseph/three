import './index.css';
import {ThreeApp, ThreeMesh} from './ThreeApp';

import {BoxBufferGeometry, Mesh, MeshBasicMaterial} from 'three';

const app = new ThreeApp('.webgl', {
  enableOrbitControls: true, 
});

class Cube implements ThreeMesh {
  public mesh: Mesh;

  constructor() {
    const geometry = new BoxBufferGeometry();
    const material = new MeshBasicMaterial({color: 'red'});

    this.mesh = new Mesh(geometry, material);
  }

  render(app: ThreeApp) {
    this.mesh.rotation.y = app.clock.getElapsedTime();
  }

}


app.addObject(new Cube());
app.start();


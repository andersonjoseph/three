import {ThreeApp, ThreeObject} from './ThreeApp';

import {BoxBufferGeometry, Mesh, MeshBasicMaterial} from 'three';

const app = new ThreeApp('.webgl', {
  enableOrbitControls: true, 
});

class Cube implements ThreeObject {
  public object: Mesh

  constructor() {
    const geometry = new BoxBufferGeometry();
    const material = new MeshBasicMaterial({color: 'red'});

    this.object= new Mesh(geometry, material);
  }

  render(app: ThreeApp) {
    this.object.rotation.y = app.clock.getElapsedTime();
  }
}

app.addObject(new Cube());
app.start();


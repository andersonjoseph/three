import {Scene, PerspectiveCamera, WebGLRenderer, Clock, Mesh, Points} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface ThreeMesh {
  mesh: Mesh,
  render?: (app: ThreeApp) => void
}

export interface ThreePoints {
  points: Points,
  render?: (app: ThreeApp) => void
}

type ThreeAppOptions = {
  enableOrbitControls?: boolean
  renderer?: ConstructorParameters<typeof WebGLRenderer>[0]
}

export class ThreeApp {

  private renderCallbacks: ((app: ThreeApp) => void)[];
  private controls?: OrbitControls;

  public sizes: {width: number, height: number};
  public canvas: HTMLElement;
  public clock: Clock;
  public camera: PerspectiveCamera;
  public scene: Scene
  public renderer: WebGLRenderer;

  constructor(selector: string, options: ThreeAppOptions) {
    this.renderCallbacks = [];

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.scene = new Scene();

    const canvas = document.querySelector(selector) as HTMLElement;
    if(!canvas) {
      throw new Error('Canvas element not found');
    }

    this.canvas = canvas;

    this.camera = new PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.z = 2;
    this.scene.add(this.camera);

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      ...options.renderer
    })

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.clock = new Clock();

    if(options && options.enableOrbitControls) {
      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
    }

  }

  addObject(object: ThreePoints | ThreeMesh) {
    if('mesh' in object)
      this.scene.add(object.mesh);
    else 
      this.scene.add(object.points);

    if(object.render)
      this.renderCallbacks.push(object.render.bind(object));
  }

  private render() {

    if(this.controls) {
      this.controls.update();
    }

    for(const callback of this.renderCallbacks) {
      callback(this);
    }

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }

  start() {
    this.render();
  }
}


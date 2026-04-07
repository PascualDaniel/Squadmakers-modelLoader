import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export class CameraController {
    constructor(canvas) {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(4, 4, 6);
        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.target.set(0, 1, 0);
        this.controls.update();
    }
    onResize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

import { AmbientLight, DirectionalLight } from "three";
export class Lights {
    constructor(scene) {
        const ambient = new AmbientLight(0xffffff, 0.6);
        const directional = new DirectionalLight(0xffffff, 1.1);
        directional.position.set(5, 10, 7);
        scene.add(ambient);
        scene.add(directional);
    }
}

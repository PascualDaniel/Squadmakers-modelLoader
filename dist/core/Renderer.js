import { WebGLRenderer } from "three";
export class Renderer {
    constructor(canvas) {
        this.renderer = new WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.renderer.setSize(width, height);
    }
}

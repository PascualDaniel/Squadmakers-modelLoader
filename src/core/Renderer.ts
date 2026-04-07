import { WebGLRenderer } from "three";

export class Renderer {
	public readonly renderer: WebGLRenderer;

	constructor(canvas: HTMLCanvasElement) {
		this.renderer = new WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true });
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.resize(window.innerWidth, window.innerHeight);
	}

	resize(width: number, height: number): void {
		this.renderer.setSize(width, height);
	}
}

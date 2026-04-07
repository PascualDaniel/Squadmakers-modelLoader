import { AxesHelper, Color, GridHelper, Group, Scene, Vector3 } from "three";

export class SceneManager {
	public readonly scene: Scene;
	private readonly models = new Map<string, Group>();

	constructor() {
		this.scene = new Scene();
		this.scene.background = new Color("#1c1f24");
		this.addSpatialHelpers();
	}

	addModel(name: string, model: Group): void {
		this.models.set(name, model);
		this.scene.add(model);
	}

	toggleModelVisibility(name: string): void {
		const model = this.models.get(name);
		if (!model) return;
		model.visible = !model.visible;
	}

	setModelPosition(name: string, x: number, y: number, z: number): void {
		const model = this.models.get(name);
		if (!model) return;
		model.position.set(x, y, z);
	}

	applyZUpToYUp(name: string): void {
		const model = this.models.get(name);
		if (!model) return;
		model.rotation.x = -Math.PI / 2;
	}

	getModelPosition(name: string): Vector3 | null {
		const model = this.models.get(name);
		return model ? model.position.clone() : null;
	}

	private addSpatialHelpers(): void {
		const grid = new GridHelper(2000, 20);
		const axes = new AxesHelper(500);
		this.scene.add(grid);
		this.scene.add(axes);
	}
}


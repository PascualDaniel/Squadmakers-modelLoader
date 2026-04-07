import { AxesHelper, Box3, Color, GridHelper, Group, Scene, Vector3 } from "three";

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

		const bounds = new Box3().setFromObject(model);
		if (bounds.isEmpty()) return;

		const currentCenter = bounds.getCenter(new Vector3());
		const targetCenter = new Vector3(x, y, z);
		model.position.add(targetCenter.sub(currentCenter));
		model.updateMatrixWorld(true);
	}

	applyZUpToYUp(name: string): void {
		const model = this.models.get(name);
		if (!model) return;

		const beforeBounds = new Box3().setFromObject(model);
		if (beforeBounds.isEmpty()) return;
		const beforeCenter = beforeBounds.getCenter(new Vector3());

		model.rotation.x = -Math.PI / 2;
		model.updateMatrixWorld(true);

		const afterCenter = new Box3().setFromObject(model).getCenter(new Vector3());
		model.position.add(beforeCenter.sub(afterCenter));
		model.updateMatrixWorld(true);
	}

	getModelPosition(name: string): Vector3 | null {
		const model = this.models.get(name);
		if (!model) return null;

		const bounds = new Box3().setFromObject(model);
		if (bounds.isEmpty()) return model.position.clone();
		return bounds.getCenter(new Vector3());
	}

	private addSpatialHelpers(): void {
		const grid = new GridHelper(2000, 20);
		const axes = new AxesHelper(500);
		this.scene.add(grid);
		this.scene.add(axes);
	}
}


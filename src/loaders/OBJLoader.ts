import { Box3, DoubleSide, Group, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { OBJLoader as ThreeOBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export class OBJModelLoader {
	private readonly loader = new ThreeOBJLoader();
	private geospatialOrigin: Vector3 | null = null;

	async load(url: string): Promise<Group> {
		const model = await this.loader.loadAsync(url);
		model.traverse((child: Object3D) => {
			if (child instanceof Mesh) {
				child.material = new MeshStandardMaterial({ color: 0xd9d9d9, side: DoubleSide });
			}
		});

		
		const bounds = new Box3().setFromObject(model);
		if (!bounds.isEmpty()) {
			const center = bounds.getCenter(new Vector3());
			if (!this.geospatialOrigin) {
				this.geospatialOrigin = center.clone();
			}
			model.position.set(-this.geospatialOrigin.x, -this.geospatialOrigin.y, -this.geospatialOrigin.z);
		}

		return model;
	}
}

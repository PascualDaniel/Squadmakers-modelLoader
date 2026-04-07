import { Box3, DoubleSide, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { OBJLoader as ThreeOBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
export class OBJModelLoader {
    constructor() {
        this.loader = new ThreeOBJLoader();
        this.geospatialOrigin = null;
    }
    async load(url) {
        const model = await this.loader.loadAsync(url);
        model.traverse((child) => {
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

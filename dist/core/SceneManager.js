import { AxesHelper, Box3, BoxGeometry, Color, GridHelper, Mesh, MeshStandardMaterial, Scene, Vector3 } from "three";
export class SceneManager {
    constructor() {
        this.models = new Map();
        this.scene = new Scene();
        this.scene.background = new Color("#1c1f24");
        this.addSpatialHelpers();
        this.marker = this.createMarker();
        this.scene.add(this.marker);
    }
    setMarkerPosition(x, y, z) {
        this.marker.position.set(x, y, z);
    }
    addModel(name, model) {
        this.models.set(name, model);
        this.scene.add(model);
    }
    toggleModelVisibility(name) {
        const model = this.models.get(name);
        if (!model)
            return;
        model.visible = !model.visible;
    }
    setModelPosition(name, x, y, z) {
        const model = this.models.get(name);
        if (!model)
            return;
        const bounds = new Box3().setFromObject(model);
        if (bounds.isEmpty())
            return;
        const currentCenter = bounds.getCenter(new Vector3());
        const targetCenter = new Vector3(x, y, z);
        model.position.add(targetCenter.sub(currentCenter));
        model.updateMatrixWorld(true);
    }
    applyZUpToYUp(name) {
        const model = this.models.get(name);
        if (!model)
            return;
        const beforeBounds = new Box3().setFromObject(model);
        if (beforeBounds.isEmpty())
            return;
        const beforeCenter = beforeBounds.getCenter(new Vector3());
        model.rotation.x = -Math.PI / 2;
        model.updateMatrixWorld(true);
        const afterCenter = new Box3().setFromObject(model).getCenter(new Vector3());
        model.position.add(beforeCenter.sub(afterCenter));
        model.updateMatrixWorld(true);
    }
    getModelPosition(name) {
        const model = this.models.get(name);
        if (!model)
            return null;
        const bounds = new Box3().setFromObject(model);
        if (bounds.isEmpty())
            return model.position.clone();
        return bounds.getCenter(new Vector3());
    }
    addSpatialHelpers() {
        const grid = new GridHelper(2000, 20);
        const axes = new AxesHelper(500);
        this.scene.add(grid);
        this.scene.add(axes);
    }
    createMarker() {
        const geometry = new BoxGeometry(20, 20, 20);
        const material = new MeshStandardMaterial({
            color: "#ff5a1f",
            emissive: "#ff5a1f",
            emissiveIntensity: 0.4
        });
        const marker = new Mesh(geometry, material);
        marker.name = "position-marker";
        return marker;
    }
}

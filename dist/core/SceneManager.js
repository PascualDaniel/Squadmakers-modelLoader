import { AxesHelper, Color, GridHelper, Scene } from "three";
export class SceneManager {
    constructor() {
        this.models = new Map();
        this.scene = new Scene();
        this.scene.background = new Color("#1c1f24");
        this.addSpatialHelpers();
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
        model.position.set(x, y, z);
    }
    applyZUpToYUp(name) {
        const model = this.models.get(name);
        if (!model)
            return;
        model.rotation.x = -Math.PI / 2;
    }
    getModelPosition(name) {
        const model = this.models.get(name);
        return model ? model.position.clone() : null;
    }
    addSpatialHelpers() {
        const grid = new GridHelper(2000, 20);
        const axes = new AxesHelper(500);
        this.scene.add(grid);
        this.scene.add(axes);
    }
}

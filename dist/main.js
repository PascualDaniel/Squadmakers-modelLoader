import { CameraController } from "./core/CameraController.js";
import { Lights } from "./core/Lights.js";
import { Renderer } from "./core/Renderer.js";
import { SceneManager } from "./core/SceneManager.js";
import { OBJModelLoader } from "./loaders/OBJLoader.js";
import { Box3, Vector3 } from "three";
function createCanvas(container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    return canvas;
}
async function bootstrap() {
    const app = document.getElementById("app");
    if (!app)
        throw new Error("Missing app container");
    const canvas = createCanvas(app);
    const sceneManager = new SceneManager();
    const cameraController = new CameraController(canvas);
    const renderer = new Renderer(canvas);
    const loader = new OBJModelLoader();
    new Lights(sceneManager.scene);
    const [modelA, modelB] = await Promise.all([
        loader.load("./assets/models/N720_ac3765c7-6423-4f50-96a2-857d187b1bab.obj"),
        loader.load("./assets/models/RSE_7021ea73-8340-441a-b6a5-24a95a5b2a78.obj")
    ]);
    sceneManager.addModel("modelA", modelA);
    sceneManager.addModel("modelB", modelB);
    const bounds = new Box3().setFromObject(modelA).union(new Box3().setFromObject(modelB));
    if (!bounds.isEmpty()) {
        const center = bounds.getCenter(new Vector3());
        const size = bounds.getSize(new Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance = maxSize / (2 * Math.tan((Math.PI * cameraController.camera.fov) / 360));
        const fitWidthDistance = fitHeightDistance / cameraController.camera.aspect;
        const distance = 1.3 * Math.max(fitHeightDistance, fitWidthDistance);
        cameraController.controls.target.copy(center);
        cameraController.camera.position.set(center.x + distance * 0.6, center.y + distance * 0.45, center.z + distance);
        cameraController.camera.near = Math.max(0.1, distance / 5000);
        cameraController.camera.far = Math.max(10000, distance * 20);
        cameraController.camera.updateProjectionMatrix();
        cameraController.controls.update();
    }
    const animate = () => {
        requestAnimationFrame(animate);
        cameraController.controls.update();
        renderer.renderer.render(sceneManager.scene, cameraController.camera);
    };
    animate();
    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.resize(width, height);
        cameraController.onResize(width, height);
    });
}
bootstrap().catch((error) => {
    console.error("Failed to start viewer", error);
});

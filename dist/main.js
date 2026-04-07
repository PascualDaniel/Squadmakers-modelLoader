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
function createControls(container, sceneManager, modelNames) {
    const panel = document.createElement("div");
    panel.className = "viewer-controls";
    for (const name of modelNames) {
        const card = document.createElement("div");
        card.className = "viewer-controls-card";
        const title = document.createElement("h3");
        title.textContent = name;
        const xInput = document.createElement("input");
        xInput.type = "number";
        xInput.step = "0.1";
        xInput.placeholder = "x";
        const yInput = document.createElement("input");
        yInput.type = "number";
        yInput.step = "0.1";
        yInput.placeholder = "y";
        const zInput = document.createElement("input");
        zInput.type = "number";
        zInput.step = "0.1";
        zInput.placeholder = "z";
        const currentPosition = sceneManager.getModelPosition(name);
        if (currentPosition) {
            xInput.value = currentPosition.x.toFixed(2);
            yInput.value = currentPosition.y.toFixed(2);
            zInput.value = currentPosition.z.toFixed(2);
        }
        const positionRow = document.createElement("div");
        positionRow.className = "viewer-controls-row";
        positionRow.append(xInput, yInput, zInput);
        const setPositionButton = document.createElement("button");
        setPositionButton.textContent = "Set Position";
        setPositionButton.addEventListener("click", () => {
            const x = Number(xInput.value || 0);
            const y = Number(yInput.value || 0);
            const z = Number(zInput.value || 0);
            sceneManager.setModelPosition(name, x, y, z);
        });
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle Visibility";
        toggleButton.addEventListener("click", () => {
            sceneManager.toggleModelVisibility(name);
        });
        const normalizeButton = document.createElement("button");
        normalizeButton.textContent = "Normalize Orientation";
        normalizeButton.addEventListener("click", () => {
            sceneManager.applyZUpToYUp(name);
        });
        const actionsRow = document.createElement("div");
        actionsRow.className = "viewer-controls-row";
        actionsRow.append(setPositionButton, toggleButton, normalizeButton);
        card.append(title, positionRow, actionsRow);
        panel.appendChild(card);
    }
    container.appendChild(panel);
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
    createControls(app, sceneManager, ["modelA", "modelB"]);
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

# Squadmakers-modelLoader

Minimal Three.js OBJ viewer built with TypeScript (no Vite, no bundler).

## Features

- Modular architecture: Scene, Camera/Controls, Renderer, Lights, OBJ loader
- Loads two OBJ models into the same scene
- OrbitControls navigation
- AxesHelper and GridHelper for spatial reference
- Model utility functions:
	- toggle visibility
	- set x/y/z position
	- apply Z-up to Y-up rotation fix

## Structure

- `src/core/SceneManager.ts`
- `src/core/CameraController.ts`
- `src/core/Renderer.ts`
- `src/core/Lights.ts`
- `src/loaders/OBJLoader.ts`
- `src/main.ts`
- `assets/models/model-a.obj`
- `assets/models/model-b.obj`

## Run

```bash
npm install
npm run build
npm run serve
```
```
Available on:
  http://10.8.0.6:8080
  http://192.168.1.128:8080
  http://127.0.0.1:8080
server
```
# Squadmakers-modelLoader

Visor que cargua dos OBJ y los representa en una escena 3D.



## Features

	Se pueden Mover los modelos
	Se pueden hacer visibles o invisibles
	Se pueden normalizar y se inicializan bien TODO	

## Parte técnica

- Los modelos se centran al origen para evitar problemas de precisión y se usa logarithmicDepthBuffer.
- Se corrige la orientación del objeto si es necesario (si no esta en 0.0).
- 

## Estructura

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
Abre el navegador en:
  http://10.8.0.6:8080
  http://192.168.1.128:8080
  http://127.0.0.1:8080
server
```
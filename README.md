# Orb Visualizer - Technical Assessment

A high-performance 3D data visualization built with **Three.js**, **TypeScript**, and **GLSL**. This project features an organic, reactive central orb surrounded by dynamic progress rings representing device status.

## 🛠 Tech Stack
* **Three.js**: 3D Engine for WebGL rendering.
* **TypeScript**: Type-safe application logic.
* **Vite**: Modern build tool for high-speed development.
* **Vite-Plugin-GLSL**: Native modular support for `.glsl` files.
* **Post-Processing**: UnrealBloomPass for atmospheric radiance.

## 🚀 Key Features
* **Reactive Orb**: Custom GLSL shader with vertex displacement that "agitates" based on completeness scores.
* **Dynamic Rings**: Shader-based progress rings featuring "Sun Mode" glow and additive blending.
* **Architecture**: Complete separation of concerns between core logic, 3D management, and GPU shaders.
* **FOUC Prevention**: Integrated loading system ensures the UI only reveals once the 3D scene is rendered.

## 📁 Project Structure
```text
src/
├── core/
│   ├── DeviceRing.ts      # Individual ring mesh and shader bridge
│   └── DevicesManager.ts  # Logic for managing multiple ring instances
├── scene/
│   ├── shaders/           # Modular GLSL vertex and fragment shaders
│   ├── Orb.ts             # Central orb geometry and displacement logic
│   ├── StarField.ts       # Optimized 16,000+ particle environment
│   └── SceneManager.ts    # Renderer, Camera, and Post-processing setup
├── main.ts                # App entry point with precision timing loop
└── style.css              # UI overlay and cinematic layout styling
```

## 🛠 Technical Implementation
Modular Shaders: Leveraged vite-plugin-glsl to extract GLSL logic from TypeScript, improving maintainability and readability.

Precision Timing: Replaced frame-dependent loops with performance.now() delta timing for consistent animation across 60Hz to 144Hz displays.

Static Initialization: Utilized static class properties to handle Three.js geometry logic cleanly before class instantiation.

Performance: Optimized the environment using BufferGeometry and PointsMaterial to maintain 60FPS on mobile and desktop.

⚡ Development
### 1. Install dependencies:

```text
npm install
```

### 2. Run development server:

```text
npm run dev

```

**And Voila! The Orb Visualizer web app is running now.**


# Three.js Scene Documentation — skill_run_ui

Reference documentation for the interactive 3D scene powering the portfolio home page.

---

## File Structure

```
src/app/components/canvas/
├── LightBallsScene.tsx        — Main home-page scene (lighting, environment, camera)
├── ThreeCanvas.tsx            — Skills orbit scene (rotating skill-icon cubes)
├── CameraControls.tsx         — Desktop mouse-driven camera rotation
├── CameraControlsMobile.tsx   — Mobile device-orientation camera rotation
└── handler/
    └── ModelHandler.tsx       — Generic GLTF model loader (primitive wrapper)
```

Public assets:
```
public/
├── models/LightCeiling.glb    — Light bulb 3D model
└── textures/
    ├── hardwood_diffuse.jpg
    ├── hardwood_bump.jpg
    └── hardwood_roughness.jpg
```

---

## LightBallsScene.tsx — Main Scene

The primary scene rendered on the home page as a full-screen fixed background (`fixed inset-0 opacity-50`).

### Camera
| Property | Value |
|---|---|
| Position | `[0, 10, 40]` |
| FOV | `45` |

### Ambient Light
| Property | Value |
|---|---|
| Color | `0x111122` |
| Intensity | `3` |

### Shadows
Enabled globally on the `<Canvas>`.

---

### BackgroundBox

A large inverted box (`BackSide` rendering) that acts as the room surrounding the camera.

| Property | Value |
|---|---|
| Size | `[30, 30, 60]` |
| Position | `[0, 10, 0]` |
| Roughness | `3` (light mode) / `0.75` (dark mode) |
| Metalness | `0.5` |
| Bump scale | `2` |

**Textures** (all repeat `4×4`, anisotropy `4`):
- `hardwood_diffuse.jpg` → `map`
- `hardwood_bump.jpg` → `bumpMap`
- `hardwood_roughness.jpg` → `roughnessMap`

---

### LightBulb

A clickable ceiling fixture that acts as the theme toggle.

| Property | Value |
|---|---|
| Position | `[0, 20.8, -20]` |
| Model | `/models/LightCeiling.glb` (scale `[5, 5, 5]`) |
| Emissive sphere radius | `0.93` |

**Behavior:**
- Click → toggles `ThemeProvider` between `DARK_MODE` (`business`) and `WHITE_MODE` (`nord`).
- Light mode: point light intensity `10`.
- Dark mode: point light intensity `0` (off).

---

### LightSphere (×2)

Two orbiting spheres that emit colored light and can be clicked to boost intensity.

#### Orbital Motion (per frame, `t` = elapsed seconds)
```ts
x = Math.sin(t * 0.6) * 9
y = Math.sin(t * 0.7) * 9 + 6
z = Math.sin(t * 0.8) * 18
```

| Property | Sphere 1 | Sphere 2 |
|---|---|---|
| Light color | `0xffff00` (yellow) | `0xffffff` (white) |
| Base intensity | `200` | `200` |
| Decay — dark mode | `2` | `2` |
| Decay — light mode | `5` | `5` |

**Click behavior:** Toggles intensity between `200` (normal) and `2000` (10× boost).

#### Mesh composition
- **Inner mesh** — emissive sphere, radius `0.3`.
- **Outer mesh** — sphere, radius `2`, animated canvas alpha texture (see below).

#### Dynamic canvas texture (`generateTexture`)
Created once on mount via a `10×10` HTML canvas:
- White rectangle `(0, 0, 10, 5)` on a transparent background.
- Applied as `alphaMap` on the outer sphere's `MeshStandardMaterial`.

---

## CameraControls.tsx — Desktop

Smoothly rotates the camera based on normalized mouse position.

| Property | Value |
|---|---|
| Lerp factor | `0.1` |
| X rotation formula | `(mouse.y × π) / 10` |
| Y rotation formula | `(mouse.x × π) / 10` |

Mouse coordinates are normalized to `[-0.5, 0.5]`.

---

## CameraControlsMobile.tsx — Mobile

Uses the `deviceorientation` Web API to drive camera rotation.

| Property | Value |
|---|---|
| Lerp factor | `0.03` |
| X rotation speed | `0.4` |
| Y rotation speed | `0.1` |
| Clamp range | `±π/8` (≈ ±22.5°) |

- `gamma` (left/right tilt) → Y-axis rotation.
- `beta` (forward/back tilt) → X-axis rotation.

---

## ThreeCanvas.tsx — Skills Scene

A secondary scene (currently not used in active routes) that displays skill icons as rotating textured cubes orbiting a common center.

### Camera
| Property | Value |
|---|---|
| Position | `[0, 0, 10]` |
| FOV | `75` |

### Box (per skill)
Each box is independently orbiting and self-rotating.

#### Orbital position (per frame, `t` = elapsed seconds, `i` = skill index)
```ts
x = Math.cos(t + i) * 5
y = Math.sin(t + i) * 5
z = Math.sin(t + i * 0.5) * 5
```

| Property | Value |
|---|---|
| Scale | `0.35` |
| Self-rotation | `+= delta` on both X and Y axes |
| Roughness | `0.3` |
| Metalness | `0.7` |

Each face applies the same `meshStandardMaterial` loaded with the skill's SVG icon texture (`SRGBColorSpace`, `LinearFilter`).

---

## ModelHandler.tsx

Thin wrapper around `THREE.GLTFLoader` that positions and scales a GLTF model.

```tsx
<ModelHandler url="/models/LightCeiling.glb" size={[5, 5, 5]} position={[0, 20.8, -20]} />
```

---

## Theme Integration

The scene reads from `ThemeProvider` context (`src/app/context/ThemeProvider.tsx`).

| DaisyUI theme | Constant | Effect on scene |
|---|---|---|
| `business` | `DARK_MODE` | LightBulb off, reduced decay, lower roughness |
| `nord` | `WHITE_MODE` | LightBulb on (intensity 10), higher decay, higher roughness |

Theme is persisted in `localStorage` and applied via `document.documentElement` class.

---

## How the Scene is Mounted

`src/app/(main)/(home)/page.tsx` renders `<AnimatedHomePage>`, which dynamically imports `<LightBallsScene>` with `{ ssr: false }` (required for Three.js / browser APIs).

```tsx
// AnimatedHomePage.tsx
const LightBallsScene = dynamic(() => import('../canvas/LightBallsScene'), { ssr: false });

// Rendered at:
<div className="fixed inset-0 opacity-50">
  <LightBallsScene />
</div>
```

Text content is layered above with `relative z-5`.

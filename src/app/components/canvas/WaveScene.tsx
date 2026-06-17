"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "@/app/context/ThemeProvider"

const DARK_MODE = process.env.NEXT_PUBLIC_THEME_DARK_MODE || "business"

const RIPPLE_LIFETIME = 3.0
const MAX_RIPPLES     = 5

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMouseStrength;
  uniform vec2  uRippleOrigins[${MAX_RIPPLES}];
  uniform float uRippleAges[${MAX_RIPPLES}];

  void main() {
    vec3 pos = position;

    // Ambient wave displacement
    pos.z += sin(pos.x * 0.70 + uTime * 0.30) * 0.22;
    pos.z += sin(pos.y * 0.55 + uTime * 0.20) * 0.16;
    pos.z += sin((pos.x * 0.40 + pos.y * 0.35) + uTime * 0.15) * 0.12;

    // Mouse lift — Gaussian peak centred on cursor (plane-local coords)
    float mDist = length(pos.xy - uMouse);
    pos.z += 0.40 * uMouseStrength * exp(-(mDist * mDist) / 0.5);

    // Click ripples — one expanding ring per slot, fades over RIPPLE_LIFETIME
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      float rd   = length(pos.xy - uRippleOrigins[i]);
      float r1   = uRippleAges[i] * 3.0;
      float fade = 1.0 - clamp(uRippleAges[i] / 3.0, 0.0, 1.0);
      pos.z += 0.25 * fade * exp(-pow(rd - r1, 2.0) / 0.16);
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3  uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`

export default function WaveScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const { theme } = useTheme()
  const isDark = theme === DARK_MODE
  const isDarkRef = useRef(isDark)
  isDarkRef.current = isDark

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(1)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    camera.position.set(0, 0, 8)

    const geometry = new THREE.PlaneGeometry(26, 22, 100, 80)
    const dark = isDarkRef.current
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime:          { value: 0 },
        uColor:         { value: new THREE.Color(dark ? "#b8cfe0" : "#1a4a6e") },
        uOpacity:       { value: dark ? 0.15 : 0.10 },
        uMouse:         { value: new THREE.Vector2(0, 0) },
        uMouseStrength: { value: 0 },
        uRippleOrigins: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector2(0, 0)) },
        uRippleAges:    { value: Array.from({ length: MAX_RIPPLES }, () => RIPPLE_LIFETIME) },
      },
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -0.42
    scene.add(mesh)
    mesh.updateMatrixWorld(true)

    // ── Shared raycasting helpers ──────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const ndcMouse  = new THREE.Vector2()
    const worldHit  = new THREE.Vector3()
    const meshPlane = new THREE.Plane(
      new THREE.Vector3(0, Math.sin(0.42), Math.cos(0.42)).normalize(),
      0
    )

    const screenToPlaneLocal = (clientX: number, clientY: number): THREE.Vector2 | null => {
      const rect = canvas.getBoundingClientRect()
      ndcMouse.x =  ((clientX - rect.left) / rect.width)  * 2 - 1
      ndcMouse.y = -((clientY - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(ndcMouse, camera)
      if (!raycaster.ray.intersectPlane(meshPlane, worldHit)) return null
      const local = worldHit.clone()
      mesh.worldToLocal(local)
      return new THREE.Vector2(local.x, local.y)
    }

    const isInsideCanvas = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return clientX >= rect.left && clientX <= rect.right &&
             clientY >= rect.top  && clientY <= rect.bottom
    }

    // ── Mouse hover ────────────────────────────────────────────────────
    const mouseTarget  = new THREE.Vector2(0, 0)
    const mouseCurrent = new THREE.Vector2(0, 0)
    let   strengthTarget = 0

    const onMouseMove = (e: MouseEvent) => {
      if (!isInsideCanvas(e.clientX, e.clientY)) { strengthTarget = 0; return }
      const local = screenToPlaneLocal(e.clientX, e.clientY)
      if (local) mouseTarget.copy(local)
      strengthTarget = 1
    }

    // ── Click ripple — claims first expired slot in pool ───────────────
    const onMouseClick = (e: MouseEvent) => {
      if (!isInsideCanvas(e.clientX, e.clientY)) return
      const local = screenToPlaneLocal(e.clientX, e.clientY)
      if (!local) return

      const ages    = material.uniforms.uRippleAges.value as number[]
      const origins = material.uniforms.uRippleOrigins.value as THREE.Vector2[]

      // Find first expired slot; fall back to oldest active slot
      let slot = ages.findIndex(a => a >= RIPPLE_LIFETIME)
      if (slot === -1) slot = ages.indexOf(Math.max(...ages))

      origins[slot].copy(local)
      ages[slot] = 0
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("click",     onMouseClick)

    // ── Resize ────────────────────────────────────────────────────────
    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight || window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // ── Render loop ───────────────────────────────────────────────────
    const clock   = new THREE.Clock()
    let   rafId: number
    let   prevTime = 0

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      const elapsed   = clock.getElapsedTime()
      const deltaTime = elapsed - prevTime
      prevTime = elapsed

      // Smooth mouse
      mouseCurrent.lerp(mouseTarget, 0.08)
      material.uniforms.uMouse.value.copy(mouseCurrent)
      const sc = material.uniforms.uMouseStrength.value
      material.uniforms.uMouseStrength.value += (strengthTarget - sc) * (strengthTarget > sc ? 0.10 : 0.05)

      // Advance all active ripples
      const ages = material.uniforms.uRippleAges.value as number[]
      for (let i = 0; i < MAX_RIPPLES; i++) {
        if (ages[i] < RIPPLE_LIFETIME) {
          ages[i] = Math.min(ages[i] + deltaTime, RIPPLE_LIFETIME)
        }
      }

      material.uniforms.uTime.value = elapsed
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("click",     onMouseClick)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      materialRef.current = null
    }
  }, [])

  // Reactive theme update
  useEffect(() => {
    const mat = materialRef.current
    if (!mat) return
    mat.uniforms.uColor.value.set(isDark ? "#b8cfe0" : "#1a4a6e")
    mat.uniforms.uOpacity.value = isDark ? 0.15 : 0.10
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  )
}

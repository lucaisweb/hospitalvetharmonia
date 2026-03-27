import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import recifeBg from "@/assets/recife-bg.png";
import recifeAerial from "@/assets/recife-aerial.png";
import recifeSkyline from "@/assets/recife-skyline.png";

const IMAGES = [recifeBg, recifeAerial, recifeSkyline];
const SLIDE_DURATION = 6000;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  varying vec2 vUv;

  vec4 glassDistort(sampler2D tex, vec2 uv, float strength) {
    float dist = length(uv - 0.5);
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float warp = strength * (1.0 - smoothstep(0.0, 0.55, dist));
    vec2 offset = vec2(
      cos(angle + 3.14159) * warp * 0.06,
      sin(angle + 3.14159) * warp * 0.06
    );
    return texture2D(tex, clamp(uv + offset, 0.0, 1.0));
  }

  void main() {
    float radius = uProgress * 0.9;
    float d = length(vUv - 0.5);
    float edgeWidth = 0.04;
    float inner = smoothstep(radius - edgeWidth, radius - edgeWidth * 0.3, d);
    float outer = 1.0 - smoothstep(radius, radius + edgeWidth * 0.5, d);
    float ring = inner * outer;

    vec4 fromColor = glassDistort(uFrom, vUv, (1.0 - uProgress) * 0.4);
    vec4 toColor   = glassDistort(uTo,   vUv, uProgress * 0.4);

    float mask = 1.0 - smoothstep(radius - edgeWidth * 0.5, radius, d);
    vec4 ringColor = mix(fromColor, toColor, 0.5) + vec4(0.18, 0.22, 0.2, 0.0) * ring;
    vec4 base = mix(fromColor, toColor, mask);
    gl_FragColor = mix(base, ringColor, ring * 0.7);
    gl_FragColor.a = 1.0;
  }
`;

const WebGLSlide = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let rafId = 0;
    let slideTimer: ReturnType<typeof setTimeout>;
    let destroyed = false;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch {
      // WebGL not supported — fallback background will show
      return;
    }

    const W = canvas.parentElement?.clientWidth || window.innerWidth;
    const H = canvas.parentElement?.clientHeight || window.innerHeight;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uFrom: { value: new THREE.Texture() },
      uTo:   { value: new THREE.Texture() },
      uProgress: { value: 0 },
    };

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();

    const loadTex = (src: string) =>
      new Promise<THREE.Texture>((resolve) => {
        loader.load(
          src,
          (t) => { t.minFilter = THREE.LinearFilter; resolve(t); },
          undefined,
          () => resolve(new THREE.Texture()) // fallback on error
        );
      });

    let currentIdx = 0;
    let animating = false;
    let loadedTextures: THREE.Texture[] = [];

    const startTransition = () => {
      if (animating || destroyed) return;
      const nextIdx = (currentIdx + 1) % loadedTextures.length;
      uniforms.uFrom.value = loadedTextures[currentIdx];
      uniforms.uTo.value   = loadedTextures[nextIdx];
      uniforms.uProgress.value = 0;
      animating = true;

      const duration = 1800;
      const start = performance.now();

      const tick = (now: number) => {
        if (destroyed) return;
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        uniforms.uProgress.value = eased;
        renderer!.render(scene, camera);

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          currentIdx = nextIdx;
          animating = false;
          slideTimer = setTimeout(startTransition, SLIDE_DURATION);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const renderLoop = () => {
      if (destroyed) return;
      renderer!.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };

    Promise.all(IMAGES.map(loadTex)).then((txs) => {
      if (destroyed) { txs.forEach((t) => t.dispose()); return; }
      loadedTextures = txs;
      uniforms.uFrom.value = txs[0];
      uniforms.uTo.value   = txs[1] || txs[0];
      uniforms.uProgress.value = 0;

      // Start static render loop, then auto-slide
      cancelAnimationFrame(rafId);
      renderLoop();
      setReady(true);
      slideTimer = setTimeout(startTransition, SLIDE_DURATION);
    });

    const onResize = () => {
      if (!renderer || destroyed) return;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      destroyed = true;
      clearTimeout(slideTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      loadedTextures.forEach((t) => t.dispose());
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ display: "block" }}
    />
  );
};

export default WebGLSlide;

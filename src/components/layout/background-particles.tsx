"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function BackgroundParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready || process.env.NEXT_PUBLIC_ENABLE_PARTICLES === "false") {
    return null;
  }

  return (
    <Particles
      id="particles"
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: 42,
            density: {
              enable: true,
              width: 1000,
              height: 1000,
            },
          },
          color: { value: ["#00d4ff", "#7c3aed", "#00ff88"] },
          links: {
            enable: true,
            distance: 120,
            color: "#1f4e65",
            opacity: 0.22,
          },
          move: {
            enable: true,
            speed: 0.8,
          },
          opacity: {
            value: 0.3,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: {
              distance: 60,
            },
          },
        },
      }}
    />
  );
}

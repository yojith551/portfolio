import React, { useRef, useEffect } from 'react';

export default function Cyber3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse interactive coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Starfield & Floating Polyhedral Nodes
    const numStars = 140;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 2400,
        z: Math.random() * 1200 + 100,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00f0ff' : '#a855f7'
      });
    }

    // 3D Rotating Cyber Polyhedra (Wireframe Nodes)
    const polyhedra = [
      { x: -380, y: -180, z: 600, rotX: 0, rotY: 0, rotZ: 0, size: 75, speed: 0.012, color: '#00f0ff' },
      { x: 420, y: 120, z: 750, rotX: 0.5, rotY: 0.5, rotZ: 0, size: 90, speed: 0.009, color: '#a855f7' },
      { x: -280, y: 320, z: 850, rotX: 1, rotY: 0, rotZ: 0.5, size: 65, speed: 0.015, color: '#00ff9d' },
      { x: 340, y: -260, z: 900, rotX: 0.2, rotY: 1.2, rotZ: 0, size: 80, speed: 0.011, color: '#ec4899' }
    ];

    // Octahedron vertices
    const baseVertices = [
      [0, -1, 0],
      [1, 0, 0],
      [0, 0, 1],
      [-1, 0, 0],
      [0, 0, -1],
      [0, 1, 0]
    ];
    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1]
    ];

    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const fov = 450;
      const cx = width / 2 + mouseX * 40;
      const cy = height / 2 + mouseY * 40;

      // -------------------------------------------------------------
      // 1. 3D PERSPECTIVE FLOOR GRID (Infinite Cyber Matrix)
      // -------------------------------------------------------------
      gridOffset = (gridOffset + 1.2) % 40;
      const horizon = height * 0.65;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1;

      // Vertical perspective lines
      for (let x = -14; x <= 14; x++) {
        const xPos = width * 0.5 + x * 75 + mouseX * 60;
        ctx.beginPath();
        ctx.moveTo(cx, horizon);
        ctx.lineTo(xPos * 2.2 - cx * 1.2, height);
        ctx.stroke();
      }

      // Horizontal depth lines
      for (let z = 1; z <= 18; z++) {
        const depth = Math.pow(z / 18, 2.2);
        const yPos = horizon + depth * (height - horizon);
        const lineAlpha = (z / 18) * 0.25;
        ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 2. 3D FLOATING PARTICLES (WARP SPEED EFFECT)
      // -------------------------------------------------------------
      stars.forEach(s => {
        s.z -= 2.5;
        if (s.z <= 10) {
          s.z = 1200;
          s.x = (Math.random() - 0.5) * 2400;
          s.y = (Math.random() - 0.5) * 2400;
        }

        const k = fov / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1200 - s.z) / 800);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha * 0.75;
          ctx.beginPath();
          ctx.arc(px, py, s.size * k * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // -------------------------------------------------------------
      // 3. 3D FLOATING POLYHEDRAL WIREFRAME CRYSTALS
      // -------------------------------------------------------------
      polyhedra.forEach(poly => {
        poly.rotX += poly.speed;
        poly.rotY += poly.speed * 1.3;

        // Transform vertices
        const cosX = Math.cos(poly.rotX), sinX = Math.sin(poly.rotX);
        const cosY = Math.cos(poly.rotY), sinY = Math.sin(poly.rotY);

        const transformed = baseVertices.map(([vx, vy, vz]) => {
          // Local scale
          let x = vx * poly.size;
          let y = vy * poly.size;
          let z = vz * poly.size;

          // Rotate Y
          let x1 = x * cosY + z * sinY;
          let z1 = -x * sinY + z * cosY;

          // Rotate X
          let y2 = y * cosX - z1 * sinX;
          let z2 = y * sinX + z1 * cosX;

          // World position
          let wx = x1 + poly.x + mouseX * 80;
          let wy = y2 + poly.y + mouseY * 80;
          let wz = z2 + poly.z;

          // Project to 2D
          const k = fov / wz;
          return [wx * k + cx, wy * k + cy, wz];
        });

        // Draw edges
        ctx.strokeStyle = poly.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = poly.color;
        ctx.shadowBlur = 10;

        edges.forEach(([i1, i2]) => {
          const [p1x, p1y] = transformed[i1];
          const [p2x, p2y] = transformed[i2];
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);
          ctx.stroke();
        });
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}


import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Shield, Trophy, Zap, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Gauge, Compass } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { useAchievements } from '../../context/AchievementContext';

export default function RoadToTheFutureGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  // Game UI States
  const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing' | 'paused' | 'gameover'
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [nearMisses, setNearMisses] = useState(0);
  const [cameraMode, setCameraMode] = useState('first_person'); // 'first_person' | 'third_person'
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('yojith_road_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [collectedCounts, setCollectedCounts] = useState({ python: 0, turbo: 0, github: 0 });
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  // Game Engine Reference
  const gameRef = useRef({
    playerX: 0, // -1 (left road edge) to +1 (right road edge)
    targetPlayerX: 0,
    playerLean: 0,
    speed: 0,
    minSpeed: 40,
    baseSpeed: 90,
    maxSpeed: 240,
    speedVal: 0,
    roadCurve: 0,
    targetCurve: 0,
    curveTimer: 0,
    roadZ: 0,
    distanceTraveled: 0,
    score: 0,
    nearMissCount: 0,
    multiplier: 1,
    multiplierTimer: 0,
    shieldTimer: 0,
    boostTimer: 0,
    traffic: [], // Vehicles on road
    collectibles: [], // Orbs
    particles: [], // Neon sparks, smoke, speedlines
    lastMilestone: 0,
    keys: { left: false, right: false, up: false, down: false, horn: false },
    animationId: null,
    collected: { python: 0, turbo: 0, github: 0 }
  });

  const triggerMilestone = useCallback((dist, text) => {
    setActiveMilestone(text);
    sounds.playMilestone();
    setTimeout(() => {
      setActiveMilestone(null);
    }, 3500);
  }, []);

  // Keyboard Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      const g = gameRef.current;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        if (gameState === 'playing' || gameState === 'menu') {
          e.preventDefault();
        }
      }

      if (e.key === ' ' || e.code === 'Space') {
        if (gameState === 'menu' || gameState === 'gameover') {
          startGame();
        } else if (gameState === 'playing' || gameState === 'paused') {
          togglePause();
        }
        return;
      }

      if (e.key === 'h' || e.key === 'H') {
        sounds.playHorn();
      }
      if (e.key === 'c' || e.key === 'C') {
        setCameraMode(prev => prev === 'first_person' ? 'third_person' : 'first_person');
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') g.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') g.keys.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') g.keys.up = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') g.keys.down = true;
    };

    const handleKeyUp = (e) => {
      const g = gameRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') g.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') g.keys.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') g.keys.up = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') g.keys.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const startGame = () => {
    sounds.init();
    sounds.playBeep(600, 0.1);
    const g = gameRef.current;
    g.playerX = 0;
    g.targetPlayerX = 0;
    g.playerLean = 0;
    g.speed = g.baseSpeed;
    g.speedVal = g.baseSpeed;
    g.roadZ = 0;
    g.roadCurve = 0;
    g.targetCurve = 0;
    g.distanceTraveled = 0;
    g.score = 0;
    g.nearMissCount = 0;
    g.multiplier = 1;
    g.multiplierTimer = 0;
    g.shieldTimer = 90; // Spawn grace
    g.boostTimer = 0;
    g.traffic = [];
    g.collectibles = [];
    g.particles = [];
    g.lastMilestone = 0;
    g.collected = { python: 0, turbo: 0, github: 0 };
    g.keys = { left: false, right: false, up: false, down: false };

    setScore(0);
    setDistance(0);
    setNearMisses(0);
    setCollectedCounts({ python: 0, turbo: 0, github: 0 });
    setActiveMilestone(null);
    setGameState('playing');
    sounds.startEngine(0.4);
  };

  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
      sounds.stopEngine();
    } else if (gameState === 'paused') {
      setGameState('playing');
      sounds.startEngine(0.4);
    }
  };

  const gameOver = useCallback(() => {
    sounds.stopEngine();
    sounds.playCrash();
    setGameState('gameover');

    const g = gameRef.current;
    if (g.score > highScore) {
      setHighScore(g.score);
      try {
        localStorage.setItem('yojith_road_highscore', g.score.toString());
      } catch {}
    }

    if (g.distanceTraveled >= 600) {
      unlockAchievement('traffic_rider');
    }
  }, [highScore, unlockAchievement]);

  // Main 3D Canvas Rendering & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g = gameRef.current;

    let spawnTimer = 0;
    let collectibleTimer = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const horizonY = height * 0.38;

      // -------------------------------------------------------------
      // 1. UPDATE PHYSICS & LOGIC (If Playing)
      // -------------------------------------------------------------
      if (gameState === 'playing') {
        // Accelerate / Brake input
        const isBoosting = g.keys.up || g.boostTimer > 0;
        if (isBoosting) {
          g.speed = Math.min(g.maxSpeed, g.speed + 1.2);
        } else if (g.keys.down) {
          g.speed = Math.max(g.minSpeed, g.speed - 2.0);
        } else {
          // Normalize toward base speed + distance progression
          const currentBase = Math.min(160, g.baseSpeed + g.distanceTraveled * 0.05);
          if (g.speed > currentBase) g.speed -= 0.6;
          else g.speed += 0.4;
        }

        const currentSpeedKmh = Math.floor(g.speed);
        setSpeedKmh(currentSpeedKmh);
        sounds.updateEngine(g.speed / g.maxSpeed, isBoosting);

        // Steering & Lean physics
        const steerVelocity = (g.speed / 120) * 0.038;
        if (g.keys.left) g.targetPlayerX = Math.max(-0.85, g.targetPlayerX - steerVelocity);
        if (g.keys.right) g.targetPlayerX = Math.min(0.85, g.targetPlayerX + steerVelocity);

        g.playerX += (g.targetPlayerX - g.playerX) * 0.16;
        const targetLean = (g.targetPlayerX - g.playerX) * 2.8;
        g.playerLean += (targetLean - g.playerLean) * 0.2;

        // Dynamic 3D road curving (Traffic Rider style turns)
        g.curveTimer++;
        if (g.curveTimer > 280) {
          g.curveTimer = 0;
          g.targetCurve = (Math.random() - 0.5) * 1.8;
        }
        g.roadCurve += (g.targetCurve - g.roadCurve) * 0.015;

        // Advance road depth & score
        const zStep = g.speed * 0.00045;
        g.roadZ = (g.roadZ + zStep * 20) % 1;
        const distIncrement = g.speed * 0.025;
        g.distanceTraveled += distIncrement;
        g.score += Math.round(distIncrement * 3 * g.multiplier);

        setDistance(Math.floor(g.distanceTraveled));
        setScore(g.score);

        // Timers
        if (g.shieldTimer > 0) g.shieldTimer--;
        if (g.boostTimer > 0) g.boostTimer--;
        if (g.multiplierTimer > 0) {
          g.multiplierTimer--;
          if (g.multiplierTimer === 0) g.multiplier = 1;
        }

        // Milestones
        const distInt = Math.floor(g.distanceTraveled);
        if (distInt >= 100 && g.lastMilestone < 100) {
          g.lastMilestone = 100;
          triggerMilestone(100, "100m: Highway Online — Welcome to the Fast Lane!");
        } else if (distInt >= 500 && g.lastMilestone < 500) {
          g.lastMilestone = 500;
          triggerMilestone(500, "500m: High-Velocity Focus Unlocked!");
        } else if (distInt >= 1000 && g.lastMilestone < 1000) {
          g.lastMilestone = 1000;
          triggerMilestone(1000, "1000m: Highway Master — Leveling Up Toward The Dream!");
          unlockAchievement('traffic_rider');
        }

        // Spawn Traffic Rider Vehicles (Sedans, Cyber Trucks, Sports Coupes, Speeders)
        spawnTimer++;
        const spawnInterval = Math.max(30, 70 - Math.floor(g.distanceTraveled * 0.015));
        if (spawnTimer > spawnInterval) {
          spawnTimer = 0;
          const lanes = [-0.62, -0.22, 0.22, 0.62]; // 4 distinct lanes!
          const chosenLane = lanes[Math.floor(Math.random() * lanes.length)];
          const vehicleTypes = ['sedan', 'truck', 'sports_car', 'suv'];
          const chosenType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
          
          // Speeds vary: trucks are slow, sports cars are faster
          let vSpeed = 0.005;
          let vColor = '#ef4444';
          let vLength = 22;
          let vWidth = 14;

          if (chosenType === 'truck') {
            vSpeed = 0.0035;
            vColor = '#f59e0b';
            vLength = 34;
            vWidth = 16;
          } else if (chosenType === 'sports_car') {
            vSpeed = 0.0065;
            vColor = '#ec4899';
            vLength = 20;
            vWidth = 14;
          } else if (chosenType === 'suv') {
            vSpeed = 0.0048;
            vColor = '#3b82f6';
            vLength = 24;
            vWidth = 15;
          }

          g.traffic.push({
            type: chosenType,
            x: chosenLane,
            targetX: chosenLane,
            z: 0.03, // At horizon (0) moving toward player (1.0)
            speed: vSpeed,
            color: vColor,
            length: vLength,
            width: vWidth,
            nearMissChecked: false
          });
        }

        // Spawn Collectibles
        collectibleTimer++;
        if (collectibleTimer > 65) {
          collectibleTimer = 0;
          const lanes = [-0.42, 0, 0.42];
          const chosenLane = lanes[Math.floor(Math.random() * lanes.length)];
          const cTypes = ['python', 'turbo', 'github'];
          const cType = cTypes[Math.floor(Math.random() * cTypes.length)];

          g.collectibles.push({
            subType: cType,
            x: chosenLane,
            z: 0.03,
            speed: 0.007
          });
        }

        // Update Traffic
        for (let i = g.traffic.length - 1; i >= 0; i--) {
          const veh = g.traffic[i];
          // Relative movement: player speed minus vehicle speed
          const relativeSpeed = Math.max(0.002, (g.speed / 100) * 0.012 - veh.speed * 0.5);
          veh.z += relativeSpeed;

          // Traffic Rider Near-Miss Detection (passing closely at high speed gives bonus points!)
          if (!veh.nearMissChecked && veh.z > 0.82 && veh.z < 0.94) {
            const laneDiff = Math.abs(veh.x - g.playerX);
            if (laneDiff >= 0.16 && laneDiff < 0.32 && g.speed > 130) {
              veh.nearMissChecked = true;
              g.nearMissCount++;
              setNearMisses(g.nearMissCount);
              g.score += 500 * g.multiplier;
              sounds.playNearMiss();

              // Pop near miss sparks
              for (let p = 0; p < 8; p++) {
                g.particles.push({
                  x: width * 0.5 + veh.x * width * 0.45,
                  y: height * 0.85,
                  vx: (Math.random() - 0.5) * 8,
                  vy: -Math.random() * 6 - 2,
                  color: '#00f0ff',
                  life: 20,
                  maxLife: 20
                });
              }
            }
          }

          // Collision Detection with Player
          if (veh.z >= 0.84 && veh.z <= 0.96) {
            const laneDiff = Math.abs(veh.x - g.playerX);
            if (laneDiff < 0.16) {
              if (g.shieldTimer > 0) {
                // Shield absorbs collision!
                sounds.playBeep(880, 0.08);
                g.shieldTimer = 0;
                // Blast vehicle forward
                veh.z = 1.2;
              } else {
                gameOver();
                break;
              }
            }
          }

          // Off-screen cleanup
          if (veh.z > 1.15) {
            g.traffic.splice(i, 1);
          }
        }

        // Update Collectibles
        for (let i = g.collectibles.length - 1; i >= 0; i--) {
          const col = g.collectibles[i];
          col.z += (g.speed / 100) * 0.011;

          if (col.z >= 0.84 && col.z <= 0.96) {
            const laneDiff = Math.abs(col.x - g.playerX);
            if (laneDiff < 0.18) {
              sounds.playCollect(col.subType);
              g.collected[col.subType] = (g.collected[col.subType] || 0) + 1;
              setCollectedCounts({ ...g.collected });

              if (col.subType === 'python') {
                g.score += 300 * g.multiplier;
              } else if (col.subType === 'turbo') {
                g.boostTimer = 160; // 3-second nitro boost!
                g.multiplier = Math.min(4, g.multiplier + 1);
                g.multiplierTimer = 220;
              } else if (col.subType === 'github') {
                g.score += 500 * g.multiplier;
                g.shieldTimer = 150; // Shield
              }

              for (let p = 0; p < 10; p++) {
                g.particles.push({
                  x: width * 0.5 + col.x * width * 0.45,
                  y: height * 0.85,
                  vx: (Math.random() - 0.5) * 6,
                  vy: -Math.random() * 5 - 2,
                  color: col.subType === 'python' ? '#00f0ff' : col.subType === 'turbo' ? '#ec4899' : '#00ff9d',
                  life: 25,
                  maxLife: 25
                });
              }

              g.collectibles.splice(i, 1);
              continue;
            }
          }

          if (col.z > 1.15) g.collectibles.splice(i, 1);
        }

        // Particle updates
        for (let i = g.particles.length - 1; i >= 0; i--) {
          const p = g.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (p.life <= 0) g.particles.splice(i, 1);
        }
      }

      // -------------------------------------------------------------
      // 2. 3D RENDERING PIPELINE
      // -------------------------------------------------------------
      ctx.clearRect(0, 0, width, height);

      // Cyber City Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#02050e');
      skyGrad.addColorStop(0.7, '#070f26');
      skyGrad.addColorStop(1, '#1b103e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Distant 3D Neon City Skyline with Parallax
      const cityOffset = g.roadCurve * 40;
      const towers = [
        { x: 0.05, w: 0.07, h: 65, color: '#091530' },
        { x: 0.14, w: 0.09, h: 95, color: '#0d1d42' },
        { x: 0.25, w: 0.06, h: 55, color: '#091530' },
        { x: 0.33, w: 0.08, h: 120, color: '#112555' },
        { x: 0.44, w: 0.07, h: 75, color: '#091530' },
        { x: 0.53, w: 0.11, h: 140, color: '#132b63' }, // Core Spire
        { x: 0.66, w: 0.08, h: 85, color: '#0d1d42' },
        { x: 0.76, w: 0.06, h: 60, color: '#091530' },
        { x: 0.84, w: 0.10, h: 110, color: '#112555' }
      ];

      towers.forEach(t => {
        const tx = t.x * width + cityOffset;
        const tw = t.w * width;
        const ty = horizonY - t.h;
        ctx.fillStyle = t.color;
        ctx.fillRect(tx, ty, tw, t.h);

        // Neon windows / lights
        ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.fillRect(tx + 4, ty + 10, 3, 3);
        ctx.fillRect(tx + 12, ty + 25, 3, 3);
        ctx.fillRect(tx + tw - 8, ty + 18, 3, 3);

        // Blinking spire light
        ctx.fillStyle = '#00ff9d';
        ctx.fillRect(tx + tw / 2 - 1, ty - 5, 2, 5);
      });

      // Neon Horizon Line
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 10, 0, horizonY + 10);
      horizonGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      horizonGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.5)');
      horizonGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 10, width, 20);

      // Ground (Road borders / Matrix terrain)
      const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      groundGrad.addColorStop(0, '#060a17');
      groundGrad.addColorStop(1, '#020409');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // -------------------------------------------------------------
      // 3D HIGHWAY PROJECTION (Traffic Rider 4-Lane Curve Engine)
      // -------------------------------------------------------------
      const roadTopW = width * 0.16;
      const roadBottomW = width * 0.94;
      const curveAmount = g.roadCurve * 90;

      const segments = 45;
      for (let s = 0; s < segments; s++) {
        const z1 = s / segments;
        const z2 = (s + 1) / segments;

        const y1 = horizonY + Math.pow(z1, 2.0) * (height - horizonY);
        const y2 = horizonY + Math.pow(z2, 2.0) * (height - horizonY);

        const w1 = roadTopW + z1 * (roadBottomW - roadTopW);
        const w2 = roadTopW + z2 * (roadBottomW - roadTopW);

        const c1 = width * 0.5 + Math.pow(1 - z1, 1.8) * curveAmount;
        const c2 = width * 0.5 + Math.pow(1 - z2, 1.8) * curveAmount;

        // Asphalt Segment
        ctx.beginPath();
        ctx.moveTo(c1 - w1 * 0.5, y1);
        ctx.lineTo(c1 + w1 * 0.5, y1);
        ctx.lineTo(c2 + w2 * 0.5, y2);
        ctx.lineTo(c2 - w2 * 0.5, y2);
        ctx.closePath();

        const isEven = (s + Math.floor(g.roadZ * 15)) % 2 === 0;
        ctx.fillStyle = isEven ? '#12192e' : '#0e1426';
        ctx.fill();

        // Neon Curbs (Cyan Left / Purple Right)
        ctx.strokeStyle = isEven ? '#00f0ff' : 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1 + z2 * 4;
        ctx.beginPath();
        ctx.moveTo(c1 - w1 * 0.5, y1);
        ctx.lineTo(c2 - w2 * 0.5, y2);
        ctx.stroke();

        ctx.strokeStyle = isEven ? '#ec4899' : 'rgba(236, 72, 153, 0.4)';
        ctx.beginPath();
        ctx.moveTo(c1 + w1 * 0.5, y1);
        ctx.lineTo(c2 + w2 * 0.5, y2);
        ctx.stroke();

        // Dashed Lane Dividers (4 Lanes -> 3 Dividers: -0.5, 0, 0.5)
        if (isEven) {
          [-0.5, 0, 0.5].forEach(laneOffset => {
            const lx1 = c1 + (w1 * 0.5) * laneOffset;
            const lx2 = c2 + (w2 * 0.5) * laneOffset;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 1 + z2 * 3;
            ctx.beginPath();
            ctx.moveTo(lx1, y1);
            ctx.lineTo(lx2, y2);
            ctx.stroke();
          });
        }
      }

      // -------------------------------------------------------------
      // DRAW COLLECTIBLES IN 3D
      // -------------------------------------------------------------
      g.collectibles.forEach(col => {
        const z = col.z;
        if (z < 0.04 || z > 1.05) return;

        const currentW = roadTopW + z * (roadBottomW - roadTopW);
        const y = horizonY + Math.pow(z, 2.0) * (height - horizonY);
        const curveAtZ = width * 0.5 + Math.pow(1 - z, 1.8) * curveAmount;
        const x = curveAtZ + (currentW * 0.45) * col.x;
        const scale = 0.2 + z * 0.9;
        const size = 32 * scale;

        ctx.save();
        ctx.translate(x, y);

        // Floating hover
        const bob = Math.sin(Date.now() * 0.01 + col.x * 4) * 4;
        ctx.translate(0, bob);

        ctx.beginPath();
        ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = col.subType === 'python' ? 'rgba(0, 240, 255, 0.25)' : col.subType === 'turbo' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(0, 255, 157, 0.25)';
        ctx.strokeStyle = col.subType === 'python' ? '#00f0ff' : col.subType === 'turbo' ? '#ec4899' : '#00ff9d';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(9, Math.floor(size * 0.65))}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(col.subType === 'python' ? 'PY' : col.subType === 'turbo' ? '⚡' : 'GH', 0, 1);

        ctx.restore();
      });

      // -------------------------------------------------------------
      // DRAW 3D TRAFFIC VEHICLES (Traffic Rider Perspective Cars & Trucks)
      // -------------------------------------------------------------
      const sortedVehicles = [...g.traffic].sort((a, b) => a.z - b.z);
      sortedVehicles.forEach(veh => {
        const z = veh.z;
        if (z < 0.04 || z > 1.1) return;

        const currentW = roadTopW + z * (roadBottomW - roadTopW);
        const y = horizonY + Math.pow(z, 2.0) * (height - horizonY);
        const curveAtZ = width * 0.5 + Math.pow(1 - z, 1.8) * curveAmount;
        const x = curveAtZ + (currentW * 0.45) * veh.x;
        const scale = 0.15 + z * 1.1;

        const carW = veh.width * 4 * scale;
        const carH = veh.length * 3 * scale;

        ctx.save();
        ctx.translate(x, y);

        // Vehicle Ground Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.ellipse(0, carH * 0.4, carW * 0.6, carH * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Vehicle Chassis
        if (veh.type === 'truck') {
          // Cyber Big Rig / Cargo Truck
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(-carW * 0.6, -carH * 0.5, carW * 1.2, carH * 0.9);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.strokeRect(-carW * 0.6, -carH * 0.5, carW * 1.2, carH * 0.9);

          // Rear Brake Lights
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(-carW * 0.5, carH * 0.35, carW * 0.25, 4 * scale);
          ctx.fillRect(carW * 0.25, carH * 0.35, carW * 0.25, 4 * scale);

          // Cargo Label
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(7, Math.floor(8 * scale))}px 'Orbitron', sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('CARGO', 0, 0);
        } else {
          // Sedan / Sports Car (Sleek aerodynamic design)
          const carGrad = ctx.createLinearGradient(-carW * 0.5, 0, carW * 0.5, 0);
          carGrad.addColorStop(0, veh.color);
          carGrad.addColorStop(0.5, '#0f172a');
          carGrad.addColorStop(1, veh.color);
          ctx.fillStyle = carGrad;

          ctx.beginPath();
          ctx.roundRect(-carW * 0.5, -carH * 0.4, carW, carH * 0.8, 6 * scale);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Windshield (Tinted glass)
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.roundRect(-carW * 0.35, -carH * 0.15, carW * 0.7, carH * 0.35, 3 * scale);
          ctx.fill();

          // Rear Glowing Cyber Tail-lights (Traffic Rider signature!)
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 8;
          ctx.fillRect(-carW * 0.45, carH * 0.32, carW * 0.25, 3 * scale);
          ctx.fillRect(carW * 0.2, carH * 0.32, carW * 0.25, 3 * scale);
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      });

      // -------------------------------------------------------------
      // DRAW PLAYER COCKPIT & MOTORCYCLE (Traffic Rider 1st/3rd Person)
      // -------------------------------------------------------------
      const playerY = height * 0.86;
      const playerScreenX = width * 0.5 + (roadBottomW * 0.45) * g.playerX;

      ctx.save();
      ctx.translate(playerScreenX, playerY);
      ctx.rotate(g.playerLean * 0.14);

      if (cameraMode === 'first_person') {
        // --- COCKPIT FIRST-PERSON HUD (TRAFFIC RIDER CLASSIC FEEL) ---
        // Dual Handlebars
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-110, 40);
        ctx.lineTo(-40, 15);
        ctx.lineTo(40, 15);
        ctx.lineTo(110, 40);
        ctx.stroke();

        // Rubber Grips
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-120, 28, 30, 20);
        ctx.fillRect(90, 28, 30, 20);

        // Center Digital Display / Cyber Gauge
        ctx.fillStyle = '#090e21';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-50, -25, 100, 48, 8);
        ctx.fill();
        ctx.stroke();

        // Digital Speed in Cockpit
        ctx.fillStyle = '#00f0ff';
        ctx.font = `bold 16px 'Orbitron', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(g.speed)} KM/H`, 0, -2);

        // RPM Bar
        const rpmFill = Math.min(80, (g.speed / g.maxSpeed) * 80);
        ctx.fillStyle = g.speed > 180 ? '#ec4899' : '#00ff9d';
        ctx.fillRect(-40, 10, rpmFill, 4);

        // Windshield Visor Line
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -60, 90, Math.PI * 0.2, Math.PI * 0.8, false);
        ctx.stroke();

      } else {
        // --- THIRD-PERSON SUPERBIKE CHASSIS ---
        // Bike Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.ellipse(0, 25, 32, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Massive Rear Racing Tire
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-14, 10, 28, 25);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-14, 10, 28, 25);

        // Motorcycle Frame
        const frameGrad = ctx.createLinearGradient(-20, -30, 20, 20);
        frameGrad.addColorStop(0, '#00f0ff');
        frameGrad.addColorStop(0.5, '#6366f1');
        frameGrad.addColorStop(1, '#090d16');
        ctx.fillStyle = frameGrad;
        ctx.beginPath();
        ctx.moveTo(0, -40);
        ctx.lineTo(20, -15);
        ctx.lineTo(15, 15);
        ctx.lineTo(-15, 15);
        ctx.lineTo(-20, -15);
        ctx.closePath();
        ctx.fill();

        // Rider Back & Helmet
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.arc(0, -18, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Neon Exhaust Thrusters
        ctx.fillStyle = (g.keys.up || g.boostTimer > 0) ? '#ec4899' : '#00ff9d';
        ctx.fillRect(-10, 20, 20, 6);
      }

      // Exhaust Trail / Nitro Flames
      if (gameState === 'playing') {
        const flameLength = (g.keys.up || g.boostTimer > 0) ? 42 : 18;
        const flameGrad = ctx.createLinearGradient(0, 25, 0, 25 + flameLength);
        flameGrad.addColorStop(0, (g.keys.up || g.boostTimer > 0) ? '#ec4899' : '#00f0ff');
        flameGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-8, 25);
        ctx.lineTo(8, 25);
        ctx.lineTo(0, 25 + flameLength + Math.random() * 8);
        ctx.closePath();
        ctx.fill();
      }

      // Shield Aura
      if (g.shieldTimer > 0) {
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      // -------------------------------------------------------------
      // DRAW PARTICLES & SPARK EFFECTS
      // -------------------------------------------------------------
      g.particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Next frame
      g.animationId = requestAnimationFrame(render);
    };

    g.animationId = requestAnimationFrame(render);
    return () => {
      if (g.animationId) cancelAnimationFrame(g.animationId);
      sounds.stopEngine();
    };
  }, [gameState, cameraMode, triggerMilestone, gameOver]);

  return (
    <div id="game" className="relative w-full max-w-5xl mx-auto my-12 px-4">
      {/* Outer Cyberpunk Frame */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/40 via-purple-500/30 to-emerald-500/40 shadow-2xl">
        <div className="relative rounded-xl overflow-hidden bg-[#070b19] border border-cyan-500/30">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0a0f24]/90 border-b border-cyan-500/20 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <div>
                <h3 className="font-cyber text-lg font-bold text-white flex items-center gap-2">
                  ROAD TO THE FUTURE 3D <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">TRAFFIC RIDER MODE</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono hidden sm:block">Weave through cyber highway traffic at 200+ km/h</p>
              </div>
            </div>

            {/* Quick Telemetry & Controls */}
            <div className="flex items-center space-x-3 sm:space-x-5 text-sm font-mono">
              <div className="flex items-center space-x-1.5 text-cyan-300">
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-base">{speedKmh} <span className="text-xs font-normal">KM/H</span></span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-300">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400">SCORE:</span>
                <span className="font-bold">{score}</span>
              </div>
              <div className="hidden md:flex items-center space-x-1.5 text-pink-400">
                <Zap className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-slate-400">NEAR MISS:</span>
                <span className="font-bold">{nearMisses}</span>
              </div>

              {/* Camera Switcher Button */}
              <button
                onClick={() => setCameraMode(prev => prev === 'first_person' ? 'third_person' : 'first_person')}
                className="px-2.5 py-1 rounded bg-slate-800 text-xs font-cyber text-cyan-300 border border-slate-700 hover:border-cyan-400 transition cursor-pointer"
                title="Switch Camera View [C]"
              >
                {cameraMode === 'first_person' ? '1ST PERSON' : '3RD PERSON'}
              </button>

              {/* Mute button */}
              <button
                onClick={handleToggleMute}
                aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div ref={containerRef} className="relative w-full aspect-[16/9] max-h-[540px] bg-[#040711] overflow-hidden select-none">
            <canvas
              ref={canvasRef}
              width={900}
              height={506}
              className="w-full h-full object-cover block"
            />

            {/* Active Milestone Banner */}
            {activeMilestone && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-cyan-950/90 border border-cyan-400/80 text-cyan-200 font-cyber text-sm sm:text-base tracking-wider shadow-lg shadow-cyan-500/30 animate-bounce text-center z-20">
                ⭐ {activeMilestone}
              </div>
            )}

            {/* In-Game Top HUD Badges */}
            {gameState === 'playing' && (
              <div className="absolute top-3 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
                {gameRef.current.multiplier > 1 && (
                  <span className="px-2.5 py-1 rounded bg-pink-500/20 border border-pink-400 text-pink-300 font-mono text-xs font-bold animate-pulse">
                    🔥 {gameRef.current.multiplier}X NITRO COMBO
                  </span>
                )}
                {gameRef.current.shieldTimer > 0 && (
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> HIGHWAY SHIELD
                  </span>
                )}
              </div>
            )}

            {/* OVERLAY: MENU STATE */}
            {gameState === 'menu' && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
                <div className="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-pink-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Zap className="w-9 h-9 text-white animate-pulse" />
                </div>
                <h2 className="font-cyber text-2xl sm:text-4xl font-extrabold text-white tracking-wider mb-2">
                  ROAD TO THE FUTURE 3D
                </h2>
                <p className="max-w-xl text-slate-300 text-sm sm:text-base mb-4 leading-relaxed font-sans">
                  "Pilot an ultra-performance cyber motorcycle down the multi-lane highway. Overtake traffic, achieve near-miss combos at high velocity, and never stop advancing."
                </p>

                {/* Highway HUD Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 max-w-lg w-full text-xs font-mono">
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                    <span className="font-bold">PY:</span> Knowledge (+300)
                  </div>
                  <div className="p-2 rounded bg-pink-950/40 border border-pink-500/30 text-pink-300">
                    <span className="font-bold">⚡ NITRO:</span> Speed Burst
                  </div>
                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="font-bold">GH:</span> Shield (+500)
                  </div>
                  <div className="p-2 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
                    <span className="font-bold">NEAR MISS:</span> +500 PTS
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-xl font-cyber text-base font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/40 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" /> THROTTLE UP // START RUN
                </button>

                <p className="text-xs text-slate-400 mt-4 font-mono">
                  Controls: [Arrow Keys / WASD] steer & accelerate | [H] Horn | [C] Camera View | [Space] Pause
                </p>
              </div>
            )}

            {/* OVERLAY: PAUSED STATE */}
            {gameState === 'paused' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
                <Pause className="w-12 h-12 text-cyan-400 mb-2" />
                <h3 className="font-cyber text-2xl font-bold text-white mb-2">RUN PAUSED</h3>
                <p className="text-slate-300 text-sm font-mono mb-5">Refuel your focus. The future is waiting.</p>
                <div className="flex gap-3">
                  <button
                    onClick={togglePause}
                    className="px-6 py-2.5 rounded-lg font-cyber bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition"
                  >
                    RESUME
                  </button>
                  <button
                    onClick={startGame}
                    className="px-6 py-2.5 rounded-lg font-cyber bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
                  >
                    RESTART
                  </button>
                </div>
              </div>
            )}

            {/* OVERLAY: GAMEOVER STATE */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
                <div className="px-3 py-1 rounded bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs mb-2">
                  COLLISION DETECTED
                </div>
                <h3 className="font-cyber text-2xl sm:text-3xl font-bold text-white mb-1">
                  "Every failure is another opportunity to improve."
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono mb-4">
                  High-speed highway run concluded. Recalibrate and break your record!
                </p>

                {/* Run Recap Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md w-full mb-6 font-mono text-left">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">DISTANCE</div>
                    <div className="text-lg font-bold text-cyan-400">{distance}m</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">RUN SCORE</div>
                    <div className="text-lg font-bold text-emerald-400">{score}</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">NEAR MISSES</div>
                    <div className="text-lg font-bold text-pink-400">{nearMisses}</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">HIGH SCORE</div>
                    <div className="text-lg font-bold text-purple-400">{highScore}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={startGame}
                    className="px-7 py-3 rounded-xl font-cyber text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> RETRY RUN
                  </button>
                  <button
                    onClick={() => setGameState('menu')}
                    className="px-5 py-3 rounded-xl font-cyber text-sm font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition"
                  >
                    MENU
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom On-Screen Controls for Mobile & Quick Play */}
          <div className="p-3 bg-[#0a0f24] border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="hidden sm:inline">CONTROLS:</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">←</kbd>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">→</kbd>
              <span>Weave</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑</kbd>
              <span>Accelerate</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↓</kbd>
              <span>Brake</span>
            </div>

            {/* Mobile Touch Controller Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onTouchStart={() => { gameRef.current.keys.left = true; }}
                onTouchEnd={() => { gameRef.current.keys.left = false; }}
                onMouseDown={() => { gameRef.current.keys.left = true; }}
                onMouseUp={() => { gameRef.current.keys.left = false; }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold active:scale-90 transition select-none flex items-center gap-1"
                aria-label="Steer Left"
              >
                <ArrowLeft className="w-4 h-4" /> Left
              </button>
              <button
                onTouchStart={() => { gameRef.current.keys.right = true; }}
                onTouchEnd={() => { gameRef.current.keys.right = false; }}
                onMouseDown={() => { gameRef.current.keys.right = true; }}
                onMouseUp={() => { gameRef.current.keys.right = false; }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold active:scale-90 transition select-none flex items-center gap-1"
                aria-label="Steer Right"
              >
                Right <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onTouchStart={() => { gameRef.current.keys.up = true; }}
                onTouchEnd={() => { gameRef.current.keys.up = false; }}
                onMouseDown={() => { gameRef.current.keys.up = true; }}
                onMouseUp={() => { gameRef.current.keys.up = false; }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold active:scale-90 transition select-none flex items-center gap-1"
                aria-label="Accelerate"
              >
                <ArrowUp className="w-4 h-4" /> Throttle
              </button>
              <button
                onTouchStart={() => { gameRef.current.keys.down = true; }}
                onTouchEnd={() => { gameRef.current.keys.down = false; }}
                onMouseDown={() => { gameRef.current.keys.down = true; }}
                onMouseUp={() => { gameRef.current.keys.down = false; }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-amber-950 border border-amber-500/40 text-amber-300 font-bold active:scale-90 transition select-none flex items-center gap-1"
                aria-label="Brake"
              >
                <ArrowDown className="w-4 h-4" /> Brake
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

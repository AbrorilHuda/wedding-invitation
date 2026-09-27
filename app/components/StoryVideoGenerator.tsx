import React, { useState, useEffect, useRef, useCallback } from "react";
import { WEDDING_CONFIG } from "../config/wedding";
import { subscribeToWishes } from "../services/weddingService";
import type { Wish } from "../types/invitation";

// ─── Fallback wishes when Firestore not available ─────────────────────────────
const FALLBACK_WISHES: Wish[] = [
  {
    id: "1",
    n: "Rizky Ananda",
    h: "Hadir",
    p: "Barakallahu lakuma wa baraka alaikuma. Semoga menjadi keluarga sakinah, mawaddah, warahmah!",
    createdAt: "2 jam yang lalu",
  },
  {
    id: "2",
    n: "Dewi Lestari",
    h: "Hadir",
    p: `Selamat menempuh hidup baru ${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}. Bahagia selalu ya!`,
    createdAt: "5 jam yang lalu",
  },
  {
    id: "3",
    n: "Fajar Nugroho",
    h: "Tidak Hadir",
    p: "Maaf belum bisa hadir langsung, tapi doa terbaik selalu menyertai kalian berdua.",
    createdAt: "Kemarin",
  },
];

// ─── Canvas dimensions (9:16 WA Story) ────────────────────────────────────────
const CANVAS_W = 540;
const CANVAS_H = 960;

// ─── Timing config ─────────────────────────────────────────────────────────────
const SLIDE_DURATION = 4000;    // ms per wish slide
const FADE_DURATION  = 600;     // ms for fade in/out
const OPENING_DURATION = 3500;  // ms for opening slide
const CLOSING_DURATION = 3000;  // ms for closing slide
const FPS = 30;

// ─── Particle type ─────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  type: "petal" | "star" | "heart";
}

// ─── Colour palette ────────────────────────────────────────────────────────────
const PETAL_COLORS = ["#f9a8d4", "#fda4af", "#fbcfe8", "#e9d5ff", "#fde68a", "#ffffff"];
const BG_GRADIENT_STOPS = ["#1a0a2e", "#2d1b4e", "#1a0a2e"];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 7
): number {
  const words = text.split(" ");
  let line = "";
  let lineCount = 0;
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      if (lineCount >= maxLines - 1) {
        ctx.fillText(line.trimEnd() + "…", x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line.trimEnd(), x, currentY);
      line = words[i] + " ";
      currentY += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trimEnd(), x, currentY);
  return currentY + lineHeight;
}

function initParticles(): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 38; i++) {
    particles.push({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      size: 4 + Math.random() * 10,
      speedY: 0.4 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: 0.3 + Math.random() * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      type: (["petal", "star", "heart"] as const)[Math.floor(Math.random() * 3)],
    });
  }
  return particles;
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, rotation: number) {
  const spikes = 5;
  const outerR = r;
  const innerR = r * 0.4;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const angle = rotation + (i * Math.PI) / spikes;
    const radius = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.3);
  ctx.bezierCurveTo(cx, cy - size * 0.2, cx - size, cy - size * 0.2, cx - size, cy + size * 0.3);
  ctx.bezierCurveTo(cx - size, cy + size * 0.9, cx, cy + size * 1.3, cx, cy + size * 1.3);
  ctx.bezierCurveTo(cx, cy + size * 1.3, cx + size, cy + size * 0.9, cx + size, cy + size * 0.3);
  ctx.bezierCurveTo(cx + size, cy - size * 0.2, cx, cy - size * 0.2, cx, cy + size * 0.3);
  ctx.closePath();
  ctx.fill();
}

function drawPetal(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, rotation: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.5, size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    if (p.type === "star") {
      drawStar(ctx, p.x, p.y, p.size, p.rotation);
    } else if (p.type === "heart") {
      drawHeart(ctx, p.x, p.y, p.size * 0.4);
    } else {
      drawPetal(ctx, p.x, p.y, p.size, p.rotation);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  });
}

function tickParticles(particles: Particle[]): Particle[] {
  return particles.map((p) => {
    let { x, y, speedY, speedX, rotation, rotSpeed, opacity } = p;
    y += speedY;
    x += speedX;
    rotation += rotSpeed;
    if (y > CANVAS_H + 20) {
      y = -20;
      x = Math.random() * CANVAS_W;
      opacity = 0.3 + Math.random() * 0.7;
    }
    if (x < -20) x = CANVAS_W + 20;
    if (x > CANVAS_W + 20) x = -20;
    return { ...p, x, y, rotation };
  });
}

// ─── Decorative border frame ───────────────────────────────────────────────────
function drawDecorativeFrame(ctx: CanvasRenderingContext2D) {
  const pad = 18;
  const r = 22;

  // Outer frame
  ctx.save();
  ctx.strokeStyle = "rgba(249,168,212,0.45)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(pad, pad, CANVAS_W - pad * 2, CANVAS_H - pad * 2, r);
  ctx.stroke();

  // Inner frame
  ctx.strokeStyle = "rgba(249,168,212,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(pad + 8, pad + 8, CANVAS_W - (pad + 8) * 2, CANVAS_H - (pad + 8) * 2, r - 6);
  ctx.stroke();

  // Corner ornaments
  const corners: [number, number, number, number][] = [
    [pad + 4, pad + 4, 1, 1],
    [CANVAS_W - pad - 4, pad + 4, -1, 1],
    [pad + 4, CANVAS_H - pad - 4, 1, -1],
    [CANVAS_W - pad - 4, CANVAS_H - pad - 4, -1, -1],
  ];
  corners.forEach(([cx, cy, sx, sy]) => {
    ctx.strokeStyle = "rgba(253,214,138,0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx + sx * 20, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + sy * 20);
    ctx.stroke();

    ctx.fillStyle = "rgba(253,214,138,0.9)";
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

// ─── Watermark / branding ─────────────────────────────────────────────────────
function drawWatermark(ctx: CanvasRenderingContext2D, couple: string) {
  ctx.save();
  ctx.font = "600 13px 'Georgia', serif";
  ctx.fillStyle = "rgba(253,214,138,0.65)";
  ctx.textAlign = "center";
  ctx.fillText(`✦ ${couple} ✦`, CANVAS_W / 2, CANVAS_H - 36);
  ctx.font = "400 11px 'Georgia', serif";
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillText(WEDDING_CONFIG.event.dateDisplay, CANVAS_W / 2, CANVAS_H - 20);
  ctx.restore();
}

// ─── Background gradient ──────────────────────────────────────────────────────
function drawBackground(
  ctx: CanvasRenderingContext2D,
  bgImage: HTMLImageElement | null,
  bgOpacity: number
) {
  // Dark gradient base
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, BG_GRADIENT_STOPS[0]);
  grad.addColorStop(0.5, BG_GRADIENT_STOPS[1]);
  grad.addColorStop(1, BG_GRADIENT_STOPS[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Photo overlay
  if (bgImage) {
    ctx.save();
    ctx.globalAlpha = bgOpacity * 0.35;
    // Cover crop
    const scale = Math.max(CANVAS_W / bgImage.width, CANVAS_H / bgImage.height);
    const dw = bgImage.width * scale;
    const dh = bgImage.height * scale;
    const dx = (CANVAS_W - dw) / 2;
    const dy = (CANVAS_H - dh) / 2;
    ctx.drawImage(bgImage, dx, dy, dw, dh);
    // Dark overlay vignette
    const vig = ctx.createRadialGradient(CANVAS_W / 2, CANVAS_H / 2, 0, CANVAS_W / 2, CANVAS_H / 2, CANVAS_W);
    vig.addColorStop(0, "rgba(26,10,46,0.3)");
    vig.addColorStop(1, "rgba(26,10,46,0.85)");
    ctx.globalAlpha = 1;
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.restore();
  } else {
    // Vignette without photo
    ctx.save();
    const vig = ctx.createRadialGradient(CANVAS_W / 2, CANVAS_H / 2, 0, CANVAS_W / 2, CANVAS_H / 2, CANVAS_W);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.6)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.restore();
  }
}

// ─── Opening slide ────────────────────────────────────────────────────────────
function drawOpeningSlide(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Ornamental line
  ctx.strokeStyle = "rgba(253,214,138,0.6)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CANVAS_W / 2 - 80, CANVAS_H / 2 - 90);
  ctx.lineTo(CANVAS_W / 2 + 80, CANVAS_H / 2 - 90);
  ctx.stroke();

  // "Ucapan & Doa" label
  ctx.font = "italic 600 22px 'Georgia', serif";
  ctx.fillStyle = "rgba(253,214,138,0.9)";
  ctx.textAlign = "center";
  ctx.fillText("Ucapan & Doa", CANVAS_W / 2, CANVAS_H / 2 - 60);

  // Couple name
  ctx.font = "bold 42px 'Georgia', serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(249,168,212,0.6)";
  ctx.shadowBlur = 20;
  ctx.fillText(WEDDING_CONFIG.coupleName, CANVAS_W / 2, CANVAS_H / 2 - 10);
  ctx.shadowBlur = 0;

  // Date
  ctx.font = "400 18px 'Georgia', serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText(WEDDING_CONFIG.event.dateDisplay, CANVAS_W / 2, CANVAS_H / 2 + 30);

  // Ornamental line bottom
  ctx.strokeStyle = "rgba(253,214,138,0.6)";
  ctx.beginPath();
  ctx.moveTo(CANVAS_W / 2 - 80, CANVAS_H / 2 + 50);
  ctx.lineTo(CANVAS_W / 2 + 80, CANVAS_H / 2 + 50);
  ctx.stroke();

  // Bismillah
  ctx.font = "italic 400 15px 'Georgia', serif";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText("بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", CANVAS_W / 2, CANVAS_H / 2 + 80);

  ctx.restore();
}

// ─── Wish slide ────────────────────────────────────────────────────────────────
function drawWishSlide(ctx: CanvasRenderingContext2D, wish: Wish, index: number, total: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Quote mark decorative
  ctx.font = "bold 80px 'Georgia', serif";
  ctx.fillStyle = "rgba(249,168,212,0.15)";
  ctx.textAlign = "left";
  ctx.fillText("\u201C", 44, CANVAS_H / 2 - 140);

  // Wish message text
  const textX = CANVAS_W / 2;
  const textY = CANVAS_H / 2 - 90;
  const maxW  = CANVAS_W - 100;

  ctx.font = "italic 400 22px 'Georgia', serif";
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 8;

  const bottomY = wrapText(ctx, `"${wish.p}"`, textX, textY, maxW, 34, 7);
  ctx.shadowBlur = 0;

  // Divider
  ctx.strokeStyle = "rgba(253,214,138,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CANVAS_W / 2 - 40, bottomY + 16);
  ctx.lineTo(CANVAS_W / 2 + 40, bottomY + 16);
  ctx.stroke();

  // Sender name
  ctx.font = "600 18px 'Georgia', serif";
  ctx.fillStyle = "rgba(253,214,138,0.95)";
  ctx.fillText(`— ${wish.n}`, CANVAS_W / 2, bottomY + 44);

  // Status badge
  const badgeColor = wish.h === "Hadir" ? "rgba(134,239,172,0.25)" : "rgba(249,168,212,0.2)";
  const badgeText  = wish.h === "Hadir" ? "Hadir" : "Tidak Hadir";
  const badgeTextColor = wish.h === "Hadir" ? "rgba(134,239,172,0.9)" : "rgba(249,168,212,0.85)";
  const bw = 100, bh = 24, bx = CANVAS_W / 2 - 50, by = bottomY + 56;
  ctx.fillStyle = badgeColor;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 12);
  ctx.fill();
  ctx.font = "400 13px 'Georgia', serif";
  ctx.fillStyle = badgeTextColor;
  ctx.fillText(badgeText, CANVAS_W / 2, by + 16);

  // Slide indicator dots
  const dotY = CANVAS_H - 70;
  const dotSpacing = 14;
  const totalDots = Math.min(total, 10);
  const startX = CANVAS_W / 2 - ((totalDots - 1) * dotSpacing) / 2;
  for (let i = 0; i < totalDots; i++) {
    ctx.fillStyle = i === index % totalDots ? "rgba(253,214,138,0.9)" : "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.arc(startX + i * dotSpacing, dotY, i === index % totalDots ? 4 : 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ─── Closing slide ────────────────────────────────────────────────────────────
function drawClosingSlide(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.font = "italic 600 20px 'Georgia', serif";
  ctx.fillStyle = "rgba(253,214,138,0.9)";
  ctx.textAlign = "center";
  ctx.fillText("Jazakumullahu Khairan", CANVAS_W / 2, CANVAS_H / 2 - 40);

  ctx.font = "400 17px 'Georgia', serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText("Atas segala doa dan ucapan terbaik", CANVAS_W / 2, CANVAS_H / 2 - 6);
  ctx.fillText("untuk kedua mempelai.", CANVAS_W / 2, CANVAS_H / 2 + 20);

  ctx.font = "bold 28px 'Georgia', serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(249,168,212,0.6)";
  ctx.shadowBlur = 16;
  ctx.fillText(WEDDING_CONFIG.coupleName, CANVAS_W / 2, CANVAS_H / 2 + 66);
  ctx.shadowBlur = 0;

  ctx.font = "400 14px 'Georgia', serif";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText("💍 " + WEDDING_CONFIG.event.dateDisplay + " 💍", CANVAS_W / 2, CANVAS_H / 2 + 92);

  ctx.restore();
}

// ─── Main component ───────────────────────────────────────────────────────────
export function StoryVideoGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef   = useRef<Blob[]>([]);

  const [wishes, setWishes]           = useState<Wish[]>(FALLBACK_WISHES);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreview, setIsPreview]     = useState(false);
  const [progress, setProgress]       = useState(0);          // 0–100
  const [statusMsg, setStatusMsg]     = useState("");
  const [bgImage, setBgImage]         = useState<HTMLImageElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    WEDDING_CONFIG.galleryPhotos[0]?.fullSrc || ""
  );
  const [withMusic, setWithMusic]       = useState(false);
  const [maxWishes, setMaxWishes]       = useState(8);

  const particlesRef = useRef<Particle[]>(initParticles());
  const startTimeRef = useRef<number>(0);

  const couple = WEDDING_CONFIG.coupleName;

  // ── Fetch wishes from Firestore ──────────────────────────────────────────────
  useEffect(() => {
    const unsub = subscribeToWishes((liveWishes) => {
      if (liveWishes && liveWishes.length > 0) setWishes(liveWishes);
    }, FALLBACK_WISHES);
    return () => unsub();
  }, []);

  // ── Load selected background photo ──────────────────────────────────────────
  useEffect(() => {
    if (!selectedPhoto) { setBgImage(null); return; }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setBgImage(img);
    img.onerror = () => setBgImage(null);
    img.src = selectedPhoto;
  }, [selectedPhoto]);

  // ── Compute total video duration ─────────────────────────────────────────────
  const displayedWishes = wishes.slice(0, maxWishes);
  const totalDurationMs =
    OPENING_DURATION + displayedWishes.length * SLIDE_DURATION + CLOSING_DURATION;

  // ── Render one frame ─────────────────────────────────────────────────────────
  const renderFrame = useCallback(
    (elapsed: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Tick particles
      particlesRef.current = tickParticles(particlesRef.current);

      // Background
      drawBackground(ctx, bgImage, 1);

      // Particles
      drawParticles(ctx, particlesRef.current);

      // Decorative frame
      drawDecorativeFrame(ctx);

      // Determine current slide
      if (elapsed < OPENING_DURATION) {
        // Opening
        const fadeIn  = Math.min(1, elapsed / FADE_DURATION);
        const fadeOut = elapsed > OPENING_DURATION - FADE_DURATION
          ? Math.max(0, 1 - (elapsed - (OPENING_DURATION - FADE_DURATION)) / FADE_DURATION)
          : 1;
        drawOpeningSlide(ctx, Math.min(fadeIn, fadeOut));
      } else {
        const afterOpening = elapsed - OPENING_DURATION;
        const closingStart = displayedWishes.length * SLIDE_DURATION;

        if (afterOpening < closingStart) {
          // Wish slides
          const slideIndex = Math.floor(afterOpening / SLIDE_DURATION);
          const slideElapsed = afterOpening % SLIDE_DURATION;
          const fadeIn  = Math.min(1, slideElapsed / FADE_DURATION);
          const fadeOut = slideElapsed > SLIDE_DURATION - FADE_DURATION
            ? Math.max(0, 1 - (slideElapsed - (SLIDE_DURATION - FADE_DURATION)) / FADE_DURATION)
            : 1;
          const wish = displayedWishes[Math.min(slideIndex, displayedWishes.length - 1)];
          if (wish) {
            drawWishSlide(ctx, wish, slideIndex, displayedWishes.length, Math.min(fadeIn, fadeOut));
          }
        } else {
          // Closing
          const closingElapsed = afterOpening - closingStart;
          const fadeIn  = Math.min(1, closingElapsed / FADE_DURATION);
          const fadeOut = closingElapsed > CLOSING_DURATION - FADE_DURATION
            ? Math.max(0, 1 - (closingElapsed - (CLOSING_DURATION - FADE_DURATION)) / FADE_DURATION)
            : 1;
          drawClosingSlide(ctx, Math.min(fadeIn, fadeOut));
        }
      }

      // Watermark always
      drawWatermark(ctx, couple);
    },
    [bgImage, displayedWishes, couple]
  );

  // ── Preview loop ─────────────────────────────────────────────────────────────
  const startPreview = useCallback(() => {
    setIsPreview(true);
    setStatusMsg("Preview berjalan…");
    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTimeRef.current) % totalDurationMs;
      renderFrame(elapsed);
      setProgress(Math.round((elapsed / totalDurationMs) * 100));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [renderFrame, totalDurationMs]);

  const stopPreview = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setIsPreview(false);
    setProgress(0);
    setStatusMsg("");
  }, []);

  // ── Recording ─────────────────────────────────────────────────────────────────
  const startRecording = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!("MediaRecorder" in window)) {
      setStatusMsg("⚠️ Browser Anda tidak mendukung MediaRecorder. Coba Chrome/Edge.");
      return;
    }

    // Pick best supported codec
    const mimeTypes = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ];
    const mimeType = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || "video/webm";

    chunksRef.current = [];
    const stream  = canvas.captureStream(FPS);
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4_000_000 });
    mediaRecRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `story-ucapan-${couple.replace(/\s+/g, "-").toLowerCase()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMsg("✅ Video berhasil diunduh!");
      setIsRecording(false);
      setProgress(0);
      cancelAnimationFrame(rafRef.current);
    };

    recorder.start(100);
    setIsRecording(true);
    setStatusMsg("🎬 Merekam video…");
    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      const elapsed = now - startTimeRef.current;
      if (elapsed >= totalDurationMs) {
        // Render last frame then stop
        renderFrame(totalDurationMs - 10);
        recorder.stop();
        return;
      }
      renderFrame(elapsed);
      setProgress(Math.round((elapsed / totalDurationMs) * 100));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [renderFrame, totalDurationMs, couple]);

  const stopRecording = useCallback(() => {
    mediaRecRef.current?.stop();
    cancelAnimationFrame(rafRef.current);
    setIsRecording(false);
    setStatusMsg("Perekaman dibatalkan.");
    setProgress(0);
  }, []);

  // ── Cleanup on unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      mediaRecRef.current?.stop();
    };
  }, []);

  // ── Initial static render ────────────────────────────────────────────────────
  useEffect(() => {
    renderFrame(0);
  }, [renderFrame]);

  const durationSec = Math.round(totalDurationMs / 1000);

  // ── JSX ──────────────────────────────────────────────────────────────────────
  return (
    <div className="svgen-root">
      {/* Header */}
      <div className="svgen-header">
        <h2 className="svgen-title serif">Story Video Generator</h2>
        <p className="svgen-desc">
          Buat video WA Story 9:16 berisi ucapan & doa dari tamu untuk dibagikan.
          Export sebagai <code>.webm</code> lalu convert ke MP4 sesuai kebutuhan.
        </p>
      </div>

      <div className="svgen-layout">
        {/* ── LEFT: Canvas Preview ─────────────────────────────── */}
        <div className="svgen-preview-col">
          <div className="svgen-canvas-wrap">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="svgen-canvas"
            />
            {/* WA Story aspect-ratio label */}
            <div className="svgen-ratio-badge">9 : 16</div>
          </div>

          {/* Progress bar */}
          {(isRecording || isPreview) && (
            <div className="svgen-progress-wrap">
              <div className="svgen-progress-bar">
                <div className="svgen-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="svgen-progress-label">
                {isRecording ? `Merekam… ${progress}%` : `Preview ${progress}%`}
              </span>
            </div>
          )}

          {statusMsg && (
            <div className="svgen-status">{statusMsg}</div>
          )}
        </div>

        {/* ── RIGHT: Controls ──────────────────────────────────── */}
        <div className="svgen-controls-col">

          {/* Info card */}
          <div className="svgen-info-card">
            <div className="svgen-info-row">
              <span>⏱ Durasi</span>
              <strong>~{durationSec} detik</strong>
            </div>
            <div className="svgen-info-row">
              <span>💬 Ucapan tampil</span>
              <strong>{displayedWishes.length} dari {wishes.length}</strong>
            </div>
            <div className="svgen-info-row">
              <span>📐 Resolusi</span>
              <strong>540 × 960 px</strong>
            </div>
            <div className="svgen-info-row">
              <span>🎞 Format</span>
              <strong>.webm (VP9)</strong>
            </div>
          </div>

          {/* Max wishes slider */}
          <div className="svgen-control-group">
            <label className="svgen-label">
              Jumlah ucapan dalam video
              <span className="svgen-label-val">{maxWishes}</span>
            </label>
            <input
              type="range"
              min={1}
              max={Math.min(wishes.length, 20)}
              value={maxWishes}
              onChange={(e) => setMaxWishes(Number(e.target.value))}
              className="svgen-range"
              disabled={isRecording || isPreview}
            />
            <div className="svgen-range-hints">
              <span>1</span>
              <span>{Math.min(wishes.length, 20)}</span>
            </div>
          </div>

          {/* Background photo selector */}
          <div className="svgen-control-group">
            <label className="svgen-label">Background foto</label>
            <div className="svgen-photo-grid">
              {WEDDING_CONFIG.galleryPhotos.slice(0, 7).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`svgen-photo-thumb ${selectedPhoto === p.fullSrc ? "active" : ""}`}
                  onClick={() => setSelectedPhoto(p.fullSrc)}
                  disabled={isRecording || isPreview}
                  title={p.alt}
                >
                  <img src={p.thumbSrc} alt={p.alt} loading="lazy" />
                </button>
              ))}
              <button
                type="button"
                className={`svgen-photo-thumb svgen-photo-none ${!selectedPhoto ? "active" : ""}`}
                onClick={() => setSelectedPhoto("")}
                disabled={isRecording || isPreview}
                title="Tanpa foto"
              >
                <span>✕</span>
              </button>
            </div>
          </div>

          {/* Music toggle */}
          <div className="svgen-control-group">
            <label className="svgen-label svgen-toggle-label">
              <span>🎵 Musik background</span>
              <button
                type="button"
                className={`svgen-toggle ${withMusic ? "on" : ""}`}
                onClick={() => setWithMusic((v) => !v)}
                disabled={isRecording || isPreview}
              >
                <span className="svgen-toggle-knob" />
              </button>
            </label>
            {withMusic && (
              <p className="svgen-toggle-note">
                ⚠️ Audio tidak terekam di .webm via browser. Tambahkan musik secara manual saat convert ke MP4 (misal: CapCut, DaVinci Resolve).
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="svgen-actions">
            {/* Preview */}
            {!isRecording && (
              <button
                type="button"
                className={`svgen-btn ${isPreview ? "svgen-btn-danger" : "svgen-btn-secondary"}`}
                onClick={isPreview ? stopPreview : startPreview}
              >
                {isPreview ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    Stop Preview
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                    Preview Animasi
                  </>
                )}
              </button>
            )}

            {/* Record / Stop */}
            {!isPreview && (
              <button
                type="button"
                className={`svgen-btn ${isRecording ? "svgen-btn-danger" : "svgen-btn-primary"}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <span className="svgen-rec-dot" />
                    Batal Rekam
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" fill="currentColor" />
                    </svg>
                    Export Video .webm
                  </>
                )}
              </button>
            )}
          </div>

          {/* Notes */}
          <div className="svgen-notes">
            <p><strong>📌 Cara pakai:</strong></p>
            <ol>
              <li>Pilih jumlah ucapan & foto background</li>
              <li>Preview animasi terlebih dahulu</li>
              <li>Klik <em>Export Video .webm</em> & tunggu proses selesai</li>
              <li>File otomatis terunduh — convert ke MP4 via CapCut/HandBrake</li>
              <li>Upload ke WA Story 🎉</li>
            </ol>
            <p className="svgen-note-warn">
              ⚠️ Jangan minimize/pindah tab saat merekam agar canvas tetap aktif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRef, useEffect } from 'react';

export function useHoverSequence(theme: 'nova' | 'echo') {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const hoverRef = useRef(false);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const framesLoadedRef = useRef(false);
  const rafRef = useRef<number>(0);

  const sequenceName = theme === 'nova' ? 'nova-door-open' : 'echo-door-open';
  const frameCount = 61;
  const rgb = theme === 'nova' ? '212, 160, 23' : '108, 60, 225';

  useEffect(() => {
    const sizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || window.innerWidth;
        canvas.height = parent.clientHeight || window.innerHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Try to preload all frames
    let loadedCount = 0;
    const frames: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequences/${sequenceName}/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          framesRef.current = frames;
          framesLoadedRef.current = true;
        }
      };
      img.onerror = () => {
        // frames not available yet — procedural fallback will be used
      };
      frames.push(img);
    }

    const drawProcedural = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      p: number
    ) => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Portal glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(width, height) * 0.8 * p);
      gradient.addColorStop(0, `rgba(${rgb}, ${p * 0.4})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Door frame
      const doorW = width * 0.5 + p * width * 0.05;
      const doorH = height * 0.8 + p * height * 0.05;

      ctx.beginPath();
      ctx.moveTo(-doorW / 2, doorH / 2);
      ctx.lineTo(-doorW / 2, -doorH / 4);
      ctx.quadraticCurveTo(0, -doorH / 2, doorW / 2, -doorH / 4);
      ctx.lineTo(doorW / 2, doorH / 2);
      ctx.closePath();

      ctx.strokeStyle = `rgba(${rgb}, ${0.2 + p * 0.8})`;
      ctx.lineWidth = 2 + p * 4;
      ctx.stroke();

      ctx.fillStyle = `rgba(${rgb}, ${p * 0.1})`;
      ctx.fill();

      // Particles
      if (p > 0.01) {
        for (let i = 0; i < 30; i++) {
          const x = Math.sin(i * 123) * 0.5 * doorW;
          const y = ((Math.cos(i * 321) * 0.5 * doorH + (Date.now() * 0.05 % doorH)) - doorH / 2);
          const r = (Math.sin(i) * 0.5 + 0.5) * 3 * p;
          if (y > -doorH / 2 && y < doorH / 2) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb}, ${Math.random() * p})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();
    };

    const drawFrame = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      frameIndex: number
    ) => {
      const img = framesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return false;

      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const x = canvas.width / 2 - (img.naturalWidth / 2) * scale;
      const y = canvas.height / 2 - (img.naturalHeight / 2) * scale;
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      return true;
    };

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const target = hoverRef.current ? 1 : 0;
      progressRef.current += (target - progressRef.current) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (framesLoadedRef.current && framesRef.current.length === frameCount) {
        // Use real image sequence
        const frameIndex = Math.min(frameCount - 1, Math.floor(progressRef.current * (frameCount - 1)));
        const drawn = drawFrame(ctx, canvas, frameIndex);
        if (!drawn) drawProcedural(ctx, canvas, progressRef.current);
      } else {
        // Procedural fallback
        drawProcedural(ctx, canvas, progressRef.current);
      }

      const stillMoving = Math.abs(target - progressRef.current) > 0.001;
      if (stillMoving || hoverRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    sizeCanvas();
    render();

    window.addEventListener('resize', sizeCanvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', sizeCanvas);
    };
  }, [theme, sequenceName]);

  return {
    canvasRef,
    setHover: (h: boolean) => {
      hoverRef.current = h;
      // Kick off the animation loop if it stopped
      cancelAnimationFrame(rafRef.current);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const loop = () => {
        const target = hoverRef.current ? 1 : 0;
        progressRef.current += (target - progressRef.current) * 0.08;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const rgb2 = theme === 'nova' ? '212, 160, 23' : '108, 60, 225';
        if (framesLoadedRef.current && framesRef.current.length === frameCount) {
          const frameIndex = Math.min(frameCount - 1, Math.floor(progressRef.current * (frameCount - 1)));
          const img = framesRef.current[frameIndex];
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
            const x = canvas.width / 2 - (img.naturalWidth / 2) * scale;
            const y = canvas.height / 2 - (img.naturalHeight / 2) * scale;
            ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
          }
        } else {
          // Inline procedural for loop
          const p = progressRef.current;
          const w = canvas.width, ht = canvas.height;
          ctx.save();
          ctx.translate(w / 2, ht / 2);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(w, ht) * 0.8 * p);
          g.addColorStop(0, `rgba(${rgb2}, ${p * 0.4})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.fillRect(-w / 2, -ht / 2, w, ht);
          const dw = w * 0.5 + p * w * 0.05, dh = ht * 0.8 + p * ht * 0.05;
          ctx.beginPath();
          ctx.moveTo(-dw / 2, dh / 2);
          ctx.lineTo(-dw / 2, -dh / 4);
          ctx.quadraticCurveTo(0, -dh / 2, dw / 2, -dh / 4);
          ctx.lineTo(dw / 2, dh / 2);
          ctx.closePath();
          ctx.strokeStyle = `rgba(${rgb2}, ${0.2 + p * 0.8})`;
          ctx.lineWidth = 2 + p * 4;
          ctx.stroke();
          ctx.fillStyle = `rgba(${rgb2}, ${p * 0.1})`;
          ctx.fill();
          ctx.restore();
        }

        if (Math.abs(target - progressRef.current) > 0.001 || hoverRef.current) {
          rafRef.current = requestAnimationFrame(loop);
        }
      };
      rafRef.current = requestAnimationFrame(loop);
    },
  };
}

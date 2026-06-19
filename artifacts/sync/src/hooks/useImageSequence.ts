import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ProceduralRenderFn = (ctx: CanvasRenderingContext2D, progress: number, width: number, height: number) => void;

export function useImageSequence(
  sequenceName: string,
  frameCount: number,
  proceduralRender: ProceduralRenderFn,
  scrollTriggerElement?: React.RefObject<HTMLElement>,
  frameStart: number = 1,
  imageOffsetX: number = 0,
  imageOffsetY: number = 0
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;
    let totalErrors = 0;
    let imagesReady = false;

    const sizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || window.innerWidth;
        canvas.height = parent.clientHeight || window.innerHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return;
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const x = canvas.width / 2 - (img.naturalWidth / 2) * scale + imageOffsetX * canvas.width;
      const y = canvas.height / 2 - (img.naturalHeight / 2) * scale + imageOffsetY * canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (imagesReady && frames.length > 0) {
        const frameIndex = Math.min(frameCount - 1, Math.floor(progressRef.current.value * frameCount));
        const img = frames[frameIndex];
        if (img && img.complete && img.naturalWidth > 0) {
          drawFrame(img);
          return;
        }
      }
      proceduralRender(ctx, progressRef.current.value, canvas.width, canvas.height);
    };

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount + totalErrors >= frameCount) {
        imagesReady = loadedCount > 0;
        render();
      }
    };

    const onImageError = () => {
      totalErrors++;
      if (loadedCount + totalErrors >= frameCount) {
        imagesReady = loadedCount > 0;
        render();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequences/${sequenceName}/ezgif-frame-${String(i + frameStart).padStart(3, '0')}.jpg`;
      img.onload = onImageLoad;
      img.onerror = onImageError;
      frames.push(img);
    }

    const resize = () => {
      sizeCanvas();
      render();
    };

    sizeCanvas();
    render();
    window.addEventListener('resize', resize);

    let st: ScrollTrigger | undefined;
    if (scrollTriggerElement?.current) {
      st = ScrollTrigger.create({
        trigger: scrollTriggerElement.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          progressRef.current.value = self.progress;
          render();
        },
      });
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (st) st.kill();
    };
  }, [sequenceName, frameCount, proceduralRender, scrollTriggerElement, frameStart, imageOffsetX]);

  return canvasRef;
}

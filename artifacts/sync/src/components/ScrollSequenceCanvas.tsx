import { useImageSequence } from '@/hooks/useImageSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceCanvasProps {
  sequenceName: string;
  frameCount: number;
  proceduralRender: (ctx: CanvasRenderingContext2D, progress: number, width: number, height: number) => void;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement> | null;
  frameStart?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
}

export function ScrollSequenceCanvas({
  sequenceName,
  frameCount,
  proceduralRender,
  className = '',
  scrollContainerRef,
  frameStart = 1,
  imageOffsetX = 0,
  imageOffsetY = 0,
}: ScrollSequenceCanvasProps) {
  const canvasRef = useImageSequence(
    sequenceName,
    frameCount,
    proceduralRender,
    scrollContainerRef ?? undefined,
    frameStart,
    imageOffsetX,
    imageOffsetY
  );

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

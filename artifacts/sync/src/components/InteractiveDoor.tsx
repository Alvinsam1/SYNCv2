import { useRef } from 'react';
import { useHoverSequence } from '@/hooks/useHoverSequence';
import { motion } from 'framer-motion';

interface InteractiveDoorProps {
  theme: 'nova' | 'echo';
  title: string;
  subtitle: string;
  description: string;
  onClick: (ref: React.RefObject<HTMLElement>) => void;
}

export function InteractiveDoor({ theme, title, subtitle, description, onClick }: InteractiveDoorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef, setHover } = useHoverSequence(theme);

  const themeColorClass = theme === 'nova'
    ? 'text-yellow-400'
    : 'text-purple-400';

  const themeBorderClass = theme === 'nova'
    ? 'border-yellow-400/20 hover:border-yellow-400/60'
    : 'border-purple-400/20 hover:border-purple-400/60';

  const themeGlowClass = theme === 'nova'
    ? 'group-hover:shadow-yellow-500/20'
    : 'group-hover:shadow-purple-500/20';

  return (
    <motion.div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative flex-1 h-[80vh] flex flex-col items-center justify-end pb-12 cursor-pointer group border-x ${themeBorderClass} transition-all duration-700 ${themeGlowClass} group-hover:shadow-2xl overflow-hidden`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(containerRef as React.RefObject<HTMLElement>)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Canvas fills full door height */}
      <canvas
        ref={canvasRef}
        width={600}
        height={900}
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: 'center' }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10" />

      {/* Text — revealed on hover */}
      <div className="relative z-20 text-center px-8 translate-y-4 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
        <h3 className={`font-display text-5xl md:text-6xl font-bold tracking-widest ${themeColorClass} mb-2 drop-shadow-lg`}>
          {title}
        </h3>
        <p className="text-xl text-white font-medium mb-3">{subtitle}</p>
        <p className="text-white/60 max-w-xs mx-auto text-sm font-light">{description}</p>
        <div className={`mt-5 inline-block text-sm font-display tracking-widest uppercase ${themeColorClass} border border-current px-4 py-2`}>
          Enter →
        </div>
      </div>

      {/* Year badge — always visible */}
      <div className={`absolute top-8 left-1/2 -translate-x-1/2 z-20 font-display text-xs tracking-[0.3em] uppercase ${themeColorClass} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}>
        {theme === 'nova' ? '2075' : '2025'}
      </div>
    </motion.div>
  );
}

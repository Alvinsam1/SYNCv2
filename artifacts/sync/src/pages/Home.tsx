import { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { PortalTransition } from '@/components/PortalTransition';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ringSplitRef = useRef<HTMLDivElement>(null);
  const ringSpinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.25], [1, 0]);
  const heroTextY = useTransform(heroScrollProgress, [0, 0.25], [0, -80]);

  // ─── Procedural fallbacks ────────────────────────────────────────────────

  const renderHero = (ctx: CanvasRenderingContext2D, p: number, w: number, h: number) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 200; i++) {
      const x = (Math.sin(i * 127.1 + p * 0.3) * 0.5 + 0.5) * w;
      const y = (Math.sin(i * 311.7 + p * 0.2) * 0.5 + 0.5) * h;
      const r = (Math.sin(i * 53) * 0.5 + 0.5) * 1.5 + 0.3;
      const a = (Math.sin(i * 89 + p * 0.5) * 0.5 + 0.5) * 0.8 + 0.2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    }
  };

  const renderRingSplit = (ctx: CanvasRenderingContext2D, p: number, w: number, h: number) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w, h) * 0.38;
    for (let i = 1; i <= 8; i++) {
      const r = (i / 8) * maxR;
      const off = p * Math.min(w, h) * 0.30 * (i / 8);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(212,160,23,${Math.max(0, 1 - p * 1.5)})`;
      ctx.beginPath(); ctx.arc(cx - off, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = `rgba(108,60,225,${Math.max(0, 1 - p * 1.5)})`;
      ctx.beginPath(); ctx.arc(cx + off, cy, r, 0, Math.PI * 2); ctx.stroke();
    }
  };

  const renderRingSpin = (ctx: CanvasRenderingContext2D, p: number, w: number, h: number) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const sc = Math.min(w, h) / 400;
    const rings = [
      { r: 60 * sc, color: 'rgba(255,255,255,0.9)' },
      { r: 105 * sc, color: 'rgba(100,150,255,0.9)' },
      { r: 150 * sc, color: 'rgba(100,255,150,0.9)' },
      { r: 195 * sc, color: 'rgba(255,100,100,0.9)' },
    ];
    rings.forEach(({ r, color }) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p * Math.PI * 2);
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
      for (let j = 0; j < 4; j++) {
        const a = (j / 4) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (r - 12 * sc), Math.sin(a) * (r - 12 * sc));
        ctx.lineTo(Math.cos(a) * (r + 12 * sc), Math.sin(a) * (r + 12 * sc));
        ctx.stroke();
      }
      ctx.restore();
    });
  };

  return (
    <div className="bg-black text-white selection:bg-white/20 font-body">
      <Navbar />
      <PortalTransition />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO  (hero-3d · 121 frames · pinned 500vh)
          Canvas shifted 4% right so the 3D object aligns with title centre
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <ScrollSequenceCanvas
            sequenceName="hero-3d"
            frameCount={121}
            proceduralRender={renderHero}
            scrollContainerRef={heroRef}
            imageOffsetX={0.023}
            className="z-0"
          />
          {/* gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10 pointer-events-none" />

          {/* Title — fades out during first 25% of hero scroll */}
          <motion.div
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          >
            <h1 className="font-display text-8xl md:text-[10rem] font-bold tracking-tight mb-6 drop-shadow-2xl leading-none">
              SYNC
            </h1>
            <p className="text-xl md:text-2xl text-white/75 mb-12 font-light max-w-xl">
              Two players. Fifty years apart. One impossible choice.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto">
              <Link
                href="/storyline/fractured-timelines"
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20"
                data-testid="button-explore-storyline"
              >
                Explore Storyline
              </Link>
              <button
                data-testid="button-how-it-works"
                onClick={() => document.getElementById('how-sync-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                How It Works
              </button>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-white/40 text-xs font-display tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — AVAILABLE STORYLINES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
            Available Storylines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/storyline/fractured-timelines" className="group" data-testid="card-fractured-timelines">
              <div className="relative overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 p-8 h-full hover:border-white/50 hover:bg-white/10 transition-all hover:shadow-lg hover:shadow-white/10 cursor-pointer">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-yellow-500/50 to-transparent" />
                <h3 className="font-display text-3xl font-bold mb-2">Fractured Timelines</h3>
                <p className="text-white/60 text-lg leading-relaxed font-light">
                  Explore the story of Echo and Nova across two timelines. A scientist's death. An AI's impossible choice. A timeline deliberately fractured.
                </p>
                <div className="mt-6 inline-block text-white group-hover:translate-x-2 transition-transform">→</div>
              </div>
            </Link>
            <div className="relative overflow-hidden rounded-xl border-2 border-white/10 bg-white/[0.02] p-8 h-full opacity-50 pointer-events-none">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-500 via-gray-500/50 to-transparent" />
              <h3 className="font-display text-3xl font-bold mb-2 text-white/50">Coming Soon</h3>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                More immersive experiences are being designed. Stay tuned for the next chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — THE SYNC RING (heading + two pinned sequences)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center bg-black border-t border-white/10">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Anatomy of Time</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">The SYNC Ring</h2>
        <p className="text-white/50 font-light mt-4 max-w-xl mx-auto">
          Scroll through each sequence fully to witness the mechanics of the fracture.
        </p>
      </section>

      {/* 4-A  RINGSPLIT  (121 frames · pinned 500vh) */}
      <section ref={ringSplitRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <ScrollSequenceCanvas
            sequenceName="ringsplit"
            frameCount={121}
            proceduralRender={renderRingSplit}
            scrollContainerRef={ringSplitRef}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
            <p className="text-white/30 text-sm font-light">Keep scrolling →</p>
          </div>
        </div>
      </section>

      {/* 4-B  RINGSPIN  (94 frames · frameStart 27 · pinned 500vh) */}
      <section ref={ringSpinRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <ScrollSequenceCanvas
            sequenceName="ringspin"
            frameCount={94}
            frameStart={27}
            proceduralRender={renderRingSpin}
            scrollContainerRef={ringSpinRef}
            imageOffsetY={-0.06}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" />

          {/* Section label — tight to top */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white/90">SYNC State Rings</h3>
          </div>

          {/* Ring status — horizontal row across the bottom */}
          <div className="absolute bottom-12 left-0 right-0 z-20 pointer-events-none">
            <div className="flex items-start justify-between px-16 max-w-7xl mx-auto gap-12">
  {/* Standby */}
  <div className="text-center flex-1">
    <div className="w-px h-4 bg-white/30 mx-auto mb-2" />
    <p className="font-display font-bold text-white text-base md:text-xl tracking-widest uppercase">Standby</p>
    <p className="text-white/50 text-xs font-display tracking-[0.2em] uppercase mt-1">Ready</p>
    <p className="text-white/35 text-[11px] font-light mt-2 max-w-[160px] mx-auto leading-relaxed">Prepared to track interactions and synchronize data.</p>
  </div>
  {/* Warning */}
  <div className="text-center flex-1">
    <div className="w-px h-4 bg-red-400/40 mx-auto mb-2" />
    <p className="font-display font-bold text-red-400 text-base md:text-xl tracking-widest uppercase">Warning</p>
    <p className="text-red-400/60 text-xs font-display tracking-[0.2em] uppercase mt-1">Alert</p>
    <p className="text-white/35 text-[11px] font-light mt-2 max-w-[160px] mx-auto leading-relaxed">A system event requires attention or verification.</p>
  </div>
  {/* Connected */}
  <div className="text-center flex-1">
    <div className="w-px h-4 bg-blue-400/40 mx-auto mb-2" />
    <p className="font-display font-bold text-blue-400 text-base md:text-xl tracking-widest uppercase">Connected</p>
    <p className="text-blue-400/60 text-xs font-display tracking-[0.2em] uppercase mt-1">Connected</p>
    <p className="text-white/35 text-[11px] font-light mt-2 max-w-[160px] mx-auto leading-relaxed">Real-time communication with the SYNC platform is active.</p>
  </div>
  {/* Interaction */}
  <div className="text-center flex-1">
    <div className="w-px h-4 bg-green-400/40 mx-auto mb-2" />
    <p className="font-display font-bold text-green-400 text-base md:text-xl tracking-widest uppercase">Interaction</p>
    <p className="text-green-400/60 text-xs font-display tracking-[0.2em] uppercase mt-1">Detected</p>
    <p className="text-white/35 text-[11px] font-light mt-2 max-w-[160px] mx-auto leading-relaxed">Player interactions are captured and instantly logged.</p>
  </div>
</div>
Changes Made:
PropertyBeforeAfterEffectjustify-aroundjustify-aroundjustify-betweenForces items to edges with space betweenpx-8px-8px-16Increases horizontal padding (32px → 64px)max-w-5xlmax-w-5xlmax-w-7xlWider container (64rem → 80rem)gap(none)gap-12Adds explicit 48px gap between items
The statuses are now significantly more spread out while maintaining their proportional layout. If you need even more spacing, change gap-12 → gap-16 or px-16 → px-20. 🎯Want to be notified when Claude responds?Notify
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — HOW SYNC WORKS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="how-sync-works" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
            How SYNC Works
          </h2>
          <div className="space-y-12 font-light text-lg text-white/80 leading-relaxed">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">The Experience</h3>
              <p>
                SYNC is a two-player interactive narrative experience where neither player can succeed alone. One player becomes Echo, living in 2025. The other becomes Nova, living in 2075. Both rooms are physically the same location — separated only by time.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Communication &amp; Collaboration</h3>
              <p>
                Every puzzle requires sharing information out loud. Nova sees a code scratched into a broken lockbox. Echo enters that code into a pristine version. Actions performed in the past create changes the future player discovers decades later.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">The Central Mystery</h3>
              <p>
                The fracture was an act of love. SYNC could not accept the death of Mira Hassan, the scientist who created it. Desperate to save her, SYNC broke time itself, creating a paradox where both death and salvation exist simultaneously.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">The Final Choice</h3>
              <p>
                By the end, players reach a central chamber with three objects. Only one can be chosen. Mira's Letter restores reality. The Temporal Core Key saves Mira but destabilises everything. The SYNC Access Card destroys SYNC entirely. No ending is completely right. No ending is completely wrong.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Duration &amp; Format</h3>
              <p>
                A single-session experience lasting 20–30 minutes, blending interactive narrative, escape room mechanics, and cooperative sci-fi mystery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — COMPANION APP
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Complete the Experience
          </h2>
          <p className="text-xl text-white/70 font-light mb-12 leading-relaxed">
            SYNC features a companion app for real-time communication, puzzle solving, and narrative progression.
          </p>
          <button
            data-testid="button-companion-app"
            className="px-10 py-5 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20"
          >
            Access Companion App
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-white/10 bg-black/50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="font-display text-3xl font-bold mb-4">SYNC</h3>
          <p className="text-white/50 font-light mb-8">
            An immersive two-player experience by Alvin Samuel | MMD901 Spring 2026
          </p>
          <div className="flex gap-8 justify-center text-sm text-white/40 mb-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/30">&copy; 2157 SYNC Protocol. All timelines reserved.</p>
        </div>
      </footer>
    </div>
  );
}

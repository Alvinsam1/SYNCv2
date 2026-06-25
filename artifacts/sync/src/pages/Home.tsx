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

  // ─── Room type data ───────────────────────────────────────────────────────
  const roomTypes = [
    { icon: '🛏', label: 'Character Bedrooms' },
    { icon: '🔬', label: 'Research Labs' },
    { icon: '🏛', label: 'Historical Locations' },
    { icon: '🌿', label: 'Fantasy Environments' },
    { icon: '🔍', label: 'Crime Scenes' },
    { icon: '🌆', label: 'Future Cities' },
    { icon: '🔐', label: 'Escape Challenges' },
    { icon: '🎮', label: 'Control Rooms' },
  ];

  const ringCaptures = [
    { color: 'text-yellow-400', border: 'border-yellow-400/30', glow: 'shadow-yellow-400/20', icon: '◈', label: 'Objects Discovered' },
    { color: 'text-blue-400', border: 'border-blue-400/30', glow: 'shadow-blue-400/20', icon: '◉', label: 'Clues Collected' },
    { color: 'text-purple-400', border: 'border-purple-400/30', glow: 'shadow-purple-400/20', icon: '◎', label: 'Areas Visited' },
    { color: 'text-green-400', border: 'border-green-400/30', glow: 'shadow-green-400/20', icon: '◌', label: 'Puzzle Completions' },
    { color: 'text-red-400', border: 'border-red-400/30', glow: 'shadow-red-400/20', icon: '◐', label: 'Team Interactions' },
    { color: 'text-cyan-400', border: 'border-cyan-400/30', glow: 'shadow-cyan-400/20', icon: '◑', label: 'Narrative Milestones' },
  ];

  const syncDataPoints = [
    { label: 'Decisions Made' },
    { label: 'Paths Explored' },
    { label: 'Discoveries Unlocked' },
    { label: 'Player Interactions' },
    { label: 'Narrative Outcomes' },
  ];

  const appFeatures = [
    { icon: '📍', label: 'Track Progress', desc: 'Live map of your journey through the experience' },
    { icon: '🧠', label: 'Collected Memories', desc: 'Every clue and discovery archived for review' },
    { icon: '👤', label: 'Character Info', desc: 'Deep dives into the people behind the story' },
    { icon: '🔓', label: 'Unlock Content', desc: 'Digital rewards tied to in-room discoveries' },
    { icon: '🤝', label: 'Team Sync', desc: 'Compare notes and experiences with teammates' },
    { icon: '📖', label: 'Continue the Story', desc: 'The narrative keeps unfolding after you leave' },
  ];

  const narrativeWorlds = [
    { label: 'Sci-Fi Mystery', color: 'from-blue-500/20 to-transparent', border: 'border-blue-500/30' },
    { label: 'Supernatural Investigation', color: 'from-purple-500/20 to-transparent', border: 'border-purple-500/30' },
    { label: 'Historical Adventure', color: 'from-yellow-500/20 to-transparent', border: 'border-yellow-500/30' },
    { label: 'Detective Thriller', color: 'from-red-500/20 to-transparent', border: 'border-red-500/30' },
    { label: 'Fantasy Kingdom', color: 'from-green-500/20 to-transparent', border: 'border-green-500/30' },
    { label: 'Original World', color: 'from-white/10 to-transparent', border: 'border-white/20' },
  ];

  return (
    <div className="bg-black text-white selection:bg-white/20 font-body">
      <Navbar />
      <PortalTransition />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO  (hero-3d · 121 frames · pinned 500vh)
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10 pointer-events-none" />
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
          SECTION 3 — HOW SYNC WORKS (PART 1: Intro + Physical Spaces + Ring Intro)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="how-sync-works" className="relative bg-black border-t border-white/10 overflow-hidden">

        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* ── 3-A: Hero intro ── */}
        <div className="relative z-10 pt-32 pb-20 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xs tracking-[0.5em] uppercase text-white/30 mb-4"
          >
            The Platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            How SYNC Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
          >
            A Story Engine Built for Real-World Experiences
          </motion.p>
        </div>

        {/* ── 3-B: Framework overview ── */}
        <div className="relative z-10 px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-lg md:text-xl text-white/65 font-light leading-relaxed text-center max-w-3xl mx-auto mb-20"
            >
              SYNC combines physical spaces, wearable technology, and a connected mobile platform to create
              immersive multiplayer experiences where every interaction becomes part of a living story.
              Rather than being tied to a single narrative, SYNC is designed as a{' '}
              <span className="text-white font-medium">flexible experience framework</span> capable of
              supporting countless worlds, characters, and adventures.
            </motion.p>

            {/* Three pillars */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                {
                  num: '01',
                  title: 'Physical Spaces',
                  desc: 'Themed environments that respond to your every move — rooms that breathe, react, and remember.',
                  accent: 'border-yellow-500/40',
                  glow: 'from-yellow-500/10',
                },
                {
                  num: '02',
                  title: 'SYNC Ring',
                  desc: 'A wearable bridge between player and world — silently recording every meaningful interaction.',
                  accent: 'border-blue-500/40',
                  glow: 'from-blue-500/10',
                },
                {
                  num: '03',
                  title: 'Connected App',
                  desc: 'A companion platform that extends the experience beyond the venue, into memory and beyond.',
                  accent: 'border-purple-500/40',
                  glow: 'from-purple-500/10',
                },
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`relative rounded-2xl border ${pillar.accent} bg-gradient-to-b ${pillar.glow} to-transparent p-8 overflow-hidden`}
                >
                  <span className="font-display text-6xl font-bold text-white/5 absolute top-4 right-6 select-none leading-none">
                    {pillar.num}
                  </span>
                  <p className="font-display text-xs tracking-[0.3em] uppercase text-white/30 mb-3">{pillar.num}</p>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* World types banner */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-8"
            >
              <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 text-center mb-3">
                Adaptable to Any World
              </p>
              <p className="text-white/55 text-center font-light mb-8 max-w-xl mx-auto">
                Whether players are investigating a mystery, surviving a dystopian future, exploring a fantasy
                kingdom, or experiencing a fractured timeline — the core system remains the same.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Mystery Investigation', 'Dystopian Future', 'Fantasy Kingdom', 'Fractured Timeline', 'Historical Drama', 'Supernatural Thriller'].map((world) => (
                  <span
                    key={world}
                    className="px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm font-light hover:border-white/30 hover:text-white/70 transition-colors"
                  >
                    {world}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 3-C: Physical Spaces ── */}
        <div className="relative z-10 border-t border-white/10 py-24 px-6 bg-white/[0.015]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Chapter 01</p>
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Physical Spaces<br />Become Interactive<br />
                  <span className="text-white/40">Worlds</span>
                </h3>
                <p className="text-white/60 font-light text-lg leading-relaxed mb-6">
                  Each SYNC experience is built around a collection of themed physical environments.
                  Every room contains interactive elements that respond to player actions and reveal
                  pieces of the larger narrative.
                </p>
                <p className="text-white/40 font-light leading-relaxed">
                  The environment itself becomes part of the storytelling — not just a backdrop,
                  but an active participant in the unfolding story.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="grid grid-cols-2 gap-3"
              >
                {roomTypes.map((room, i) => (
                  <motion.div
                    key={room.label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-white/25 hover:bg-white/[0.06] transition-all"
                  >
                    <span className="text-xl">{room.icon}</span>
                    <span className="text-white/65 text-sm font-light">{room.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── 3-D: The SYNC Ring intro ── */}
        <div className="relative z-10 border-t border-white/10 pt-28 pb-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xs tracking-[0.5em] uppercase text-white/30 mb-4"
          >
            Chapter 02 · Wearable Technology
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6"
          >
            The SYNC Ring
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-4"
          >
            At the center of every experience is the SYNC Ring — a bridge between the player and the world,
            recording meaningful interactions throughout the journey.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/30 text-sm font-display tracking-[0.2em] uppercase"
          >
            Scroll through the sequences below to witness the mechanics
          </motion.p>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent mx-auto mt-4" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4-A — RINGSPLIT  (121 frames · pinned 500vh)
      ══════════════════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4-B — RINGSPIN  (94 frames · frameStart 27 · pinned 500vh)
      ══════════════════════════════════════════════════════════════════ */}
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
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white/90">SYNC State Rings</h3>
          </div>
          <div className="absolute bottom-12 left-0 right-0 z-20 pointer-events-none">
            <div className="flex items-start justify-between px-8 w-full">
              <div className="text-center flex-1">
                <div className="w-px h-4 bg-white/30 mx-auto mb-2" />
                <p className="font-display font-bold text-white text-base md:text-xl tracking-widest uppercase">Standby</p>
                <p className="text-white/50 text-xs font-display tracking-[0.2em] uppercase mt-1">Ready</p>
                <p className="text-white/35 text-[11px] font-light mt-2 max-w-[140px] mx-auto leading-relaxed">Prepared to track interactions and synchronize data.</p>
              </div>
              <div className="text-center flex-1">
                <div className="w-px h-4 bg-red-400/40 mx-auto mb-2" />
                <p className="font-display font-bold text-red-400 text-base md:text-xl tracking-widest uppercase">Warning</p>
                <p className="text-red-400/60 text-xs font-display tracking-[0.2em] uppercase mt-1">Alert</p>
                <p className="text-white/35 text-[11px] font-light mt-2 max-w-[140px] mx-auto leading-relaxed">A system event requires attention or verification.</p>
              </div>
              <div className="text-center flex-1">
                <div className="w-px h-4 bg-blue-400/40 mx-auto mb-2" />
                <p className="font-display font-bold text-blue-400 text-base md:text-xl tracking-widest uppercase">Connected</p>
                <p className="text-blue-400/60 text-xs font-display tracking-[0.2em] uppercase mt-1">Connected</p>
                <p className="text-white/35 text-[11px] font-light mt-2 max-w-[140px] mx-auto leading-relaxed">Real-time communication with the SYNC platform is active.</p>
              </div>
              <div className="text-center flex-1">
                <div className="w-px h-4 bg-green-400/40 mx-auto mb-2" />
                <p className="font-display font-bold text-green-400 text-base md:text-xl tracking-widest uppercase">Interaction</p>
                <p className="text-green-400/60 text-xs font-display tracking-[0.2em] uppercase mt-1">Detected</p>
                <p className="text-white/35 text-[11px] font-light mt-2 max-w-[140px] mx-auto leading-relaxed">Player interactions are captured and instantly logged.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — HOW SYNC WORKS (PART 2: Ring captures + Real-Time Sync)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black border-t border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* ── 5-A: What the ring captures ── */}
        <div className="relative z-10 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">As You Explore</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">The Ring Can Register</h3>
              <p className="text-white/45 font-light max-w-lg mx-auto">
                Instead of relying on manual tracking, the experience evolves naturally as players interact with their surroundings.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ringCaptures.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`rounded-2xl border ${item.border} bg-white/[0.02] p-6 text-center hover:bg-white/[0.05] transition-all shadow-lg ${item.glow}`}
                >
                  <span className={`font-display text-3xl font-bold ${item.color} block mb-3`}>{item.icon}</span>
                  <p className="text-white/75 font-light text-sm leading-snug">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5-B: Real-Time Synchronization ── */}
        <div className="relative z-10 border-t border-white/10 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Data stream visual */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-2 md:order-1"
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 overflow-hidden">
                  {/* Animated pulse line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                  <p className="font-display text-xs tracking-[0.4em] uppercase text-white/25 mb-6">Live Data Stream</p>
                  <div className="space-y-3">
                    {syncDataPoints.map((point, i) => (
                      <motion.div
                        key={point.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-400/60 flex-shrink-0" />
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-white/55 text-sm font-light whitespace-nowrap">{point.label}</span>
                        <div className="flex-1 h-px bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-purple-400/60 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="order-1 md:order-2"
              >
                <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Chapter 03</p>
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Real-Time<br />
                  <span className="text-white/40">Synchronization</span>
                </h3>
                <p className="text-white/60 font-light text-lg leading-relaxed mb-6">
                  Every action captured by the ring is instantly connected to the SYNC ecosystem.
                  Information is synchronized with the companion app, creating a dynamic record
                  of the player's journey.
                </p>
                <p className="text-white/40 font-light leading-relaxed">
                  The system continuously builds a personalized experience profile — no two journeys need to be identical.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — COMPANION APP
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 border-t border-white/10 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Chapter 04</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The Companion<br />
                <span className="text-white/40">App</span>
              </h3>
              <p className="text-white/60 font-light text-lg leading-relaxed mb-8">
                The SYNC app extends the experience beyond the physical venue. The app transforms
                a single event into an ongoing experience — continuing to interact with the story
                long after the session ends.
              </p>

              {/* ── DOWNLOAD BUTTON ── */}
              {/*
                TO MAKE THIS A REAL DOWNLOAD:
                1. Upload your APK to your GitHub repo (e.g., /public/sync-companion.apk)
                   OR host it on GitHub Releases and copy the direct download link.
                2. Replace the href below with the full URL to your .apk file.
                3. The `download` attribute triggers a file download instead of navigating.

                Example with GitHub release:
                href="https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0/sync-companion.apk"

                Example with file in /public:
                href="/sync-companion.apk"
              */}
              <a
                href="/sync-companion.apk"
                download="sync-companion.apk"
                data-testid="button-companion-app"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Get Companion App
              </a>
              <p className="text-white/25 text-xs mt-3 font-light">Android APK · Free Download</p>
            </motion.div>

            {/* Right — feature grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 gap-3"
            >
              {appFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 hover:border-white/20 hover:bg-white/[0.04] transition-all"
                >
                  <span className="text-2xl mt-0.5">{feature.icon}</span>
                  <div>
                    <p className="text-white/85 font-medium text-sm mb-0.5">{feature.label}</p>
                    <p className="text-white/40 font-light text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — MULTIPLAYER BY DESIGN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 border-t border-white/10 bg-white/[0.015] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Chapter 05</p>
            <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Multiplayer<br />
              <span className="text-white/40">by Design</span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-16"
          >
            SYNC is built around collaboration. The story emerges not only from the environment
            but also from the connections formed between players.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fractured Information',
                desc: 'Players often possess different pieces of information, unique objectives, or exclusive access to certain areas and discoveries.',
                accent: 'border-yellow-500/30',
              },
              {
                title: 'Shared Narrative',
                desc: 'To fully understand the experience, they must communicate, share findings, and work together. No single player holds the whole truth.',
                accent: 'border-blue-500/30',
              },
              {
                title: 'Human Connection',
                desc: 'The story emerges not only from the environment but from the bonds formed between players as they navigate the unknown together.',
                accent: 'border-purple-500/30',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className={`rounded-2xl border ${card.accent} bg-white/[0.02] p-8 text-left`}
              >
                <h4 className="font-display text-xl font-bold text-white mb-4">{card.title}</h4>
                <p className="text-white/55 font-light leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — ONE SYSTEM. UNLIMITED NARRATIVES.
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 border-t border-white/10 overflow-hidden">
        {/* Deep gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-white/[0.02] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-white/25 mb-6">The Bigger Picture</p>
            <h3 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              One System.<br />
              <span className="text-white/35">Unlimited Narratives.</span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/55 font-light max-w-2xl mx-auto leading-relaxed mb-16"
          >
            The true power of SYNC lies in its adaptability. The same ecosystem can be reconfigured
            to support entirely different experiences.
          </motion.p>

          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16"
          >
            {['Physical Rooms', 'SYNC Ring', 'Companion App', 'Shared Narrative'].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3 text-white/75 font-light text-sm whitespace-nowrap">
                  {step}
                </div>
                {i < 3 && (
                  <span className="text-white/20 font-display font-bold hidden md:block">→</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* World tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
          >
            {narrativeWorlds.map((world, i) => (
              <motion.div
                key={world.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                className={`rounded-xl border ${world.border} bg-gradient-to-br ${world.color} px-6 py-4 text-white/60 font-light text-sm hover:text-white/85 transition-colors`}
              >
                {world.label}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-10"
          >
            <p className="text-white/65 font-light text-lg leading-relaxed max-w-3xl mx-auto">
              SYNC is not a single story. It is a{' '}
              <span className="text-white font-medium">platform for immersive storytelling</span>{' '}
              where technology, space, and human interaction merge into one connected experience.
            </p>
          </motion.div>
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

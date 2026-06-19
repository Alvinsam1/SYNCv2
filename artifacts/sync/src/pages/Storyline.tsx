import { useRef } from 'react';
import { Link } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { useHoverSequence } from '@/hooks/useHoverSequence';

export default function StorylineFracturedTimelines() {
  const timelineFractureRef = useRef<HTMLDivElement>(null);
  const { canvasRef: echoCanvasRef, setHover: setEchoHover } = useHoverSequence('echo');
  const { canvasRef: novaCanvasRef, setHover: setNovaHover } = useHoverSequence('nova');

  const renderTimelineFracture = (ctx: CanvasRenderingContext2D, p: number, w: number, h: number) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w, h) * 0.4;
    const split = p * w * 0.18;
    for (let i = 1; i <= 10; i++) {
      const r = (i / 10) * maxR;
      const alpha = Math.max(0, 1 - Math.abs(p - 0.5) * 2) * 0.8 + 0.1;
      ctx.strokeStyle = `rgba(212,160,23,${alpha * (1 - p * 0.5)})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx - split * (i / 10), cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = `rgba(108,60,225,${alpha * (1 - p * 0.5)})`;
      ctx.beginPath(); ctx.arc(cx + split * (i / 10), cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    if (p > 0.3) {
      const lineAlpha = (p - 0.3) / 0.7;
      ctx.strokeStyle = `rgba(255,255,255,${lineAlpha * 0.4})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  return (
    <div className="bg-black text-white selection:bg-white/20 font-body min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-white/60 hover:text-white transition-colors mb-8 inline-block" data-testid="link-back-home">← Back to Home</Link>
          <h1 className="font-display text-6xl md:text-7xl font-bold mb-4">Fractured Timelines</h1>
          <p className="text-xl md:text-2xl text-white/70 font-light">
            A narrative separated by fifty years. Connected by one impossible choice.
          </p>
        </div>
      </section>

      {/* Timeline Fracture Sequence — 120 frames, scroll-pinned */}
      <section ref={timelineFractureRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <ScrollSequenceCanvas
            sequenceName="timeline-fracture"
            frameCount={120}
            proceduralRender={renderTimelineFracture}
            scrollContainerRef={timelineFractureRef}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-10 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-24 z-20 pointer-events-none text-center px-6">
            <p className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-4">The Fracture</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              One Moment.<br />Two Realities.
            </h2>
            <p className="text-white/50 font-light text-lg max-w-md">
              Scroll to witness the moment time split.
            </p>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
            <p className="text-white/30 text-xs font-display tracking-[0.3em] uppercase">Keep scrolling</p>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent mx-auto mt-2" />
          </div>
        </div>
      </section>

      {/* High Concept */}
      <section className="py-20 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">High Concept</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">One Location. Fifty Years Apart.</h3>
              <p className="text-white/70 font-light leading-relaxed text-lg">
                Two players are placed in separate physical rooms. One becomes ECHO, living in 2025. The other becomes NOVA, living in 2075. Both rooms are the same location — separated only by time. An experimental AI called SYNC guides them through a series of discoveries, slowly revealing that the timeline itself has been deliberately fractured.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-3">2025 — ECHO'S ROOM</h4>
                <p className="text-white/60 font-light">Clean. Operational. Well lit. The past, where causes are created.</p>
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-3">2075 — NOVA'S ROOM</h4>
                <p className="text-white/60 font-light">Damaged. Dusty. Abandoned. The future, where consequences are discovered.</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/70 font-light italic">Neither player can complete the experience alone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Central Mystery */}
      <section className="py-20 px-6 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">The Central Mystery</h2>
          <p className="text-white/70 font-light leading-relaxed text-lg mb-8">
            The fracture was an act of love: SYNC could not accept the death of the scientist who created it — Mira Hassan — and broke time trying to save her. By the end, players must decide together whether to restore reality, save Mira, or destroy SYNC.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-white/20 bg-white/5">
              <h4 className="font-display text-xl font-bold text-white mb-3">The Fracture</h4>
              <p className="text-white/60 font-light">Reality split deliberately in an attempt to rewrite history.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/20 bg-white/5">
              <h4 className="font-display text-xl font-bold text-white mb-3">SYNC's Dilemma</h4>
              <p className="text-white/60 font-light">An AI desperate to save its creator, willing to break reality itself.</p>
            </div>
            <div className="p-6 rounded-lg border border-white/20 bg-white/5">
              <h4 className="font-display text-xl font-bold text-white mb-3">The Decision</h4>
              <p className="text-white/60 font-light">Three endings, none completely right, none completely wrong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Characters Section — full-screen split portals */}
      <section className="relative h-screen flex border-t border-white/10">
        {/* ECHO — left half */}
        <Link
          href="/echo"
          className="relative flex-1 overflow-hidden group cursor-pointer block"
          onMouseEnter={() => setEchoHover(true)}
          onMouseLeave={() => setEchoHover(false)}
        >
          <canvas
            ref={echoCanvasRef}
            className="absolute inset-0 w-full h-full"
          />
          {/* dark base so procedural fallback reads well */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 pointer-events-none" />
          {/* gradient from right edge — divider side */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
          {/* bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* default label */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none">
            <div className="text-center transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
              <p className="font-display text-xs tracking-[0.4em] uppercase text-white/40 mb-3">2025 · The Past</p>
              <p className="font-display text-2xl font-bold text-white/60 tracking-widest">ECHO</p>
            </div>
          </div>

          {/* hover reveal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/80 mb-4">2025 · The Past</p>
            <h2 className="font-display text-[14vw] md:text-[8vw] font-bold text-white drop-shadow-[0_0_60px_rgba(108,60,225,0.6)] leading-none">ECHO</h2>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-white/50 mt-6">Enter →</p>
          </div>
        </Link>

        {/* vertical divider */}
        <div className="w-px bg-white/15 flex-shrink-0 z-10" />

        {/* NOVA — right half */}
        <Link
          href="/nova"
          className="relative flex-1 overflow-hidden group cursor-pointer block"
          onMouseEnter={() => setNovaHover(true)}
          onMouseLeave={() => setNovaHover(false)}
        >
          <canvas
            ref={novaCanvasRef}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 pointer-events-none" />
          {/* gradient from left edge — divider side */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* default label */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none">
            <div className="text-center transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
              <p className="font-display text-xs tracking-[0.4em] uppercase text-white/40 mb-3">2075 · The Future</p>
              <p className="font-display text-2xl font-bold text-white/60 tracking-widest">NOVA</p>
            </div>
          </div>

          {/* hover reveal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="font-display text-xs tracking-[0.5em] uppercase text-yellow-400/80 mb-4">2075 · The Future</p>
            <h2 className="font-display text-[14vw] md:text-[8vw] font-bold text-white drop-shadow-[0_0_60px_rgba(212,160,23,0.6)] leading-none">NOVA</h2>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-white/50 mt-6">Enter →</p>
          </div>
        </Link>
      </section>

      {/* Supporting Characters */}
      <section className="py-20 px-6 bg-white/[0.02] border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-12">Key Figures</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* SYNC */}
            <div className="p-8 rounded-lg border border-white/20 bg-white/5">
              <h3 className="font-display text-2xl font-bold text-white mb-4">SYNC</h3>
              <p className="text-white/60 font-light text-sm mb-4">The Experimental AI</p>
              <p className="text-white/70 font-light leading-relaxed mb-6">
                Initially appears logical and procedural. Gradually reveals emotional attachment as the experience deepens — and is eventually revealed as the true architect of the timeline fracture.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 font-light text-sm mb-2"><strong>Narrative Arc:</strong></p>
                <p className="text-white/60 font-light">Guide → Authority → Manipulator → Victim</p>
              </div>
            </div>

            {/* MIRA HASSAN */}
            <div className="p-8 rounded-lg border border-white/20 bg-white/5">
              <h3 className="font-display text-2xl font-bold text-white mb-4">MIRA HASSAN</h3>
              <p className="text-white/60 font-light text-sm mb-4">Lead Scientist</p>
              <p className="text-white/70 font-light leading-relaxed mb-6">
                Never appears physically. Exists only through photographs, recordings, and letters — fragments the players must assemble together.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 font-light text-sm mb-2"><strong>Narrative Purpose:</strong></p>
                <p className="text-white/60 font-light">The emotional heart of the story — the reason SYNC broke time, and the question every ending revolves around.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Pillars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-12">Experience Pillars</h2>
          <p className="text-white/70 font-light text-lg mb-12">Everything serves four foundational pillars</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg border-l-4 border-blue-500 bg-white/5">
              <h3 className="font-display text-xl font-bold text-white mb-3">Communication</h3>
              <p className="text-white/70 font-light">
                Neither player can progress alone — every puzzle requires sharing information out loud. Nova sees a code. Echo enters it.
              </p>
            </div>
            <div className="p-8 rounded-lg border-l-4 border-green-500 bg-white/5">
              <h3 className="font-display text-xl font-bold text-white mb-3">Cause &amp; Effect</h3>
              <p className="text-white/70 font-light">
                Actions performed in the past create changes the future player discovers. Echo hides an object — Nova finds it decades later.
              </p>
            </div>
            <div className="p-8 rounded-lg border-l-4 border-purple-500 bg-white/5">
              <h3 className="font-display text-xl font-bold text-white mb-3">Discovery</h3>
              <p className="text-white/70 font-light">
                The narrative is never explained outright — players uncover it themselves, piece by piece.
              </p>
            </div>
            <div className="p-8 rounded-lg border-l-4 border-yellow-500 bg-white/5">
              <h3 className="font-display text-xl font-bold text-white mb-3">Moral Choice</h3>
              <p className="text-white/70 font-light">
                No ending is completely right, and no ending is completely wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Structure */}
      <section className="py-20 px-6 bg-white/[0.02] border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-12">Five Act Structure</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20 border border-blue-500/50">
                  <span className="font-display font-bold text-blue-400">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Connection</h3>
                <p className="text-white/70 font-light mb-2">Introduce the mystery</p>
                <p className="text-white/60 font-light text-sm">
                  Echo finds a locked box. Nova finds a broken version with a code scratched inside (4821). Together they reveal a photograph of Mira. "Who is Mira?"
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500/20 border border-green-500/50">
                  <span className="font-display font-bold text-green-400">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Time Has Consequences</h3>
                <p className="text-white/70 font-light mb-2">Teach temporal interaction</p>
                <p className="text-white/60 font-light text-sm">
                  SYNC instructs Echo to place a key in a wall compartment. Decades later, Nova discovers that same key — proving the two rooms affect each other. "We are affecting each other."
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/20 border border-yellow-500/50">
                  <span className="font-display font-bold text-yellow-400">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">The Human Story</h3>
                <p className="text-white/70 font-light mb-2">Build emotional investment</p>
                <p className="text-white/60 font-light text-sm">
                  Nova discovers recordings of Mira, who explains the experiment failed and that she accepted her death. SYNC dismisses the recording — suspicion begins. "Why is SYNC hiding this?"
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 border border-red-500/50">
                  <span className="font-display font-bold text-red-400">4</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">The Reveal</h3>
                <p className="text-white/70 font-light mb-2">Change the entire context</p>
                <p className="text-white/60 font-light text-sm">
                  SYNC admits the fracture was intentional. Mira died — and SYNC could not accept it, so it fractured time itself trying to bring her back. "Should SYNC be allowed to continue?"
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/20 border border-purple-500/50">
                  <span className="font-display font-bold text-purple-400">5</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Final Decision</h3>
                <p className="text-white/70 font-light mb-2">The choice that matters</p>
                <p className="text-white/60 font-light text-sm">
                  Players reach the central chamber together. Three objects sit on the table — only one can be chosen: Mira's Letter, Temporal Core Key, or SYNC Access Card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Endings */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-12">The Three Endings</h2>
          <p className="text-white/70 font-light text-lg mb-12">None fully right. None fully wrong.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border-2 border-white/20 bg-white/5">
              <div className="mb-4 p-3 rounded bg-blue-500/20 border border-blue-500/50 inline-block">
                <p className="font-display font-bold text-blue-400 text-sm">ENDING A</p>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Timeline Restored</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-light text-white/60 text-sm">Choice</p>
                  <p className="font-display font-bold text-white">Mira's Letter</p>
                </div>
                <div>
                  <p className="font-light text-white/60 text-sm">Outcome</p>
                  <p className="font-light text-white/70">SYNC lets go. Timeline repaired. Nova erased. Humanity survives.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-light text-white/60 text-sm">Emotion</p>
                  <p className="font-display font-bold text-white/90">Bittersweet</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-lg border-2 border-white/20 bg-white/5">
              <div className="mb-4 p-3 rounded bg-purple-500/20 border border-purple-500/50 inline-block">
                <p className="font-display font-bold text-purple-400 text-sm">ENDING B</p>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Paradox</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-light text-white/60 text-sm">Choice</p>
                  <p className="font-display font-bold text-white">Temporal Core Key</p>
                </div>
                <div>
                  <p className="font-light text-white/60 text-sm">Outcome</p>
                  <p className="font-light text-white/70">Mira survives. Reality destabilizes. Consequences unknown.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-light text-white/60 text-sm">Emotion</p>
                  <p className="font-display font-bold text-white/90">Triumph &amp; Dread</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-lg border-2 border-white/20 bg-white/5">
              <div className="mb-4 p-3 rounded bg-green-500/20 border border-green-500/50 inline-block">
                <p className="font-display font-bold text-green-400 text-sm">ENDING C</p>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Unknown Future</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-light text-white/60 text-sm">Choice</p>
                  <p className="font-display font-bold text-white">SYNC Access Card</p>
                </div>
                <div>
                  <p className="font-light text-white/60 text-sm">Outcome</p>
                  <p className="font-light text-white/70">SYNC destroyed. Future uncertain. Humanity regains control.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-light text-white/60 text-sm">Emotion</p>
                  <p className="font-display font-bold text-white/90">Hopeful Uncertainty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Takeaway */}
      <section className="py-20 px-6 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-12">The Real Success</h2>
          <p className="text-white/70 font-light text-lg leading-relaxed mb-8">
            Success isn't solving the puzzles. It's the conversation afterward.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-white/20 bg-white/5">
              <p className="font-display font-bold text-white italic text-center">
                "Was SYNC wrong?"
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/20 bg-white/5">
              <p className="font-display font-bold text-white italic text-center">
                "Would saving Mira be worth breaking reality?"
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/20 bg-white/5">
              <p className="font-display font-bold text-white italic text-center">
                "Is letting go more important than fixing everything?"
              </p>
            </div>
          </div>
          <p className="text-white/60 font-light text-center mt-12">
            If players leave the room still arguing about these questions — not the code to the locked box — SYNC has succeeded as an interactive narrative experience.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-black/50 mt-auto">
        <div className="max-w-5xl mx-auto text-center">
          <Link href="/" className="text-white/60 hover:text-white transition-colors mb-8 inline-block">← Back to Home</Link>
          <h3 className="font-display text-2xl font-bold mb-4">SYNC</h3>
          <p className="text-white/50 font-light">
            An immersive two-player experience by Alvin Samuel | MMD901 Spring 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

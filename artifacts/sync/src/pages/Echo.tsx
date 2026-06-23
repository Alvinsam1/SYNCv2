import { useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useHoverSequence } from '@/hooks/useHoverSequence';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

export default function Echo() {
  const { canvasRef, setHover } = useHoverSequence('echo');
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-black min-h-screen text-white font-body"
    >
      <Navbar />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden flex flex-col items-center justify-center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-xs tracking-[0.6em] uppercase text-purple-400/80 mb-6"
          >
            2025 · The Past
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-display text-[22vw] md:text-[16vw] font-bold leading-none tracking-tighter text-white drop-shadow-[0_0_80px_rgba(108,60,225,0.4)]"
          >
            ECHO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-lg md:text-2xl tracking-widest uppercase text-white/60 mt-4"
          >
            Echo represents possibility.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-white/30 text-xs font-display tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── CORE IDENTITY ── */}
      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/70 mb-4">Core Identity</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">The Past</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { line: 'Echo exists before the catastrophe.' },
              { line: 'The world still feels repairable.' },
              { line: 'Discovery and experimentation drive everything.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i + 1}
                className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5"
              >
                <p className="text-white/70 font-light leading-relaxed">{item.line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT ECHO KNOWS ── */}
      <section className="py-28 px-6 bg-white/[0.02] border-b border-white/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/70 mb-4">At the Start</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">What Echo Knows</h2>
            <ul className="space-y-4 text-white/70 font-light">
              {[
                'The facility appears normal.',
                'SYNC appears trustworthy.',
                'The future is unknown.',
                'Mira is unknown.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="p-8 rounded-xl border border-purple-500/30 bg-purple-500/5"
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/60 mb-6">Echo Constantly Asks</p>
            <p className="font-display text-2xl md:text-3xl font-bold text-white/90 leading-relaxed italic">
              "What will happen if I do this?"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT ECHO CAN DO ── */}
      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/70 mb-4">Abilities</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What Echo Can Do</h2>
            <p className="text-white/60 font-light text-lg mb-12">
              Echo influences the future. Most actions create changes that Nova later discovers.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Hide Objects',
                desc: 'Place a key in a compartment. Nova discovers it decades later.',
                icon: '◻',
              },
              {
                title: 'Leave Messages',
                desc: 'Write notes, mark locations, create clues that echo across time.',
                icon: '✎',
              },
              {
                title: 'Activate Systems',
                desc: 'Turn on machinery. Unlock access routes. Store data for the future.',
                icon: '⚡',
              },
              {
                title: 'Make Decisions',
                desc: 'Trust or distrust SYNC. Reveal or conceal. Choose whether to preserve evidence.',
                icon: '◈',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                custom={i + 1}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/40 hover:bg-purple-500/5 transition-colors"
              >
                <div className="text-purple-400 text-xl mb-4">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOICES ── */}
      <section className="py-28 px-6 bg-white/[0.02] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="mb-12"
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/70 mb-4">Gameplay</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Echo's Choices</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
            >
              <h3 className="font-display text-sm tracking-[0.3em] uppercase text-white/50 mb-6">Practical</h3>
              <ul className="space-y-3 text-white/70 font-light">
                {['Open locker', 'Read documents', 'Activate terminals', 'Store objects', 'Send messages'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={2}
            >
              <h3 className="font-display text-sm tracking-[0.3em] uppercase text-white/50 mb-6">Moral</h3>
              <ul className="space-y-3 text-white/70 font-light">
                {['Trust SYNC', 'Question SYNC', 'Share discoveries', 'Hide discoveries'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ROOM LAYOUT ── */}
      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="mb-12"
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/70 mb-4">Environment</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Room Layout</h2>
            <p className="text-white/50 font-light text-lg">Active Research Facility</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { area: 'Research Desk', items: ['Notes', 'Logs', 'Personal items'] },
              { area: "Mira's Locker", items: ['Photographs', 'Letter', 'Personal belongings'] },
              { area: 'Temporal Compartment', items: ['Transfer objects through time'] },
              { area: 'Main Terminal', items: ['Receives instructions from SYNC'] },
              { area: 'Whiteboard', items: ['Leave information for the future'] },
            ].map((room, i) => (
              <motion.div
                key={room.area}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                custom={i + 1}
                className="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5"
              >
                <h3 className="font-display text-sm font-bold text-purple-300 mb-3 tracking-wide">{room.area}</h3>
                <ul className="space-y-1.5">
                  {room.items.map((item) => (
                    <li key={item} className="text-white/55 text-sm font-light flex items-center gap-2">
                      <span className="w-0.5 h-0.5 rounded-full bg-purple-400/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE GOAL ── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="font-display text-xs tracking-[0.5em] uppercase text-purple-400/70 mb-8">The Purpose</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-purple-400/70 mb-8 leading-tight">
              Echo creates the causes.<br />
              <span className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">Nova discovers the effects.</span>
            </h2>
            <p className="text-white/50 font-light text-lg max-w-xl mx-auto">
              Every action in the past echoes forward. What you choose to do — or not do — shapes a reality you will never directly witness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── NAV ── */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/storyline/fractured-timelines"
            className="font-display text-sm tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors"
          >
            ← Back to Fractured Timelines
          </Link>
          <Link
            href="/nova"
            className="group flex items-center gap-4 px-8 py-4 border border-yellow-500/30 rounded-xl hover:border-yellow-500/60 hover:bg-yellow-500/5 transition-all"
          >
            <div className="text-right">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-yellow-400/60 mb-1">2075 · The Future</p>
              <p className="font-display text-xl font-bold text-white">NOVA</p>
            </div>
            <span className="text-white/40 group-hover:translate-x-1 transition-transform text-xl">→</span>
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

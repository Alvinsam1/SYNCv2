import { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { PortalTransition } from '@/components/PortalTransition';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  const syncRingRef = useRef<HTMLDivElement>(null);

  // Render the ringsplit animation (splitting rings)
  const renderRingSplit = (ctx: CanvasRenderingContext2D, p: number, w: number, h: number) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    
    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.max(w, h) * 0.4;
    
    ctx.lineWidth = 2;
    for (let i = 1; i <= 8; i++) {
      const radius = (i / 8) * maxRadius;
      const splitOffset = p * 150 * (i / 8);
      
      // Left ring (Nova - Gold)
      ctx.strokeStyle = `rgba(212, 160, 23, ${Math.max(0, 1 - p * 1.5)})`;
      ctx.beginPath();
      ctx.arc(cx - splitOffset, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Right ring (Echo - Purple)
      ctx.strokeStyle = `rgba(108, 60, 225, ${Math.max(0, 1 - p * 1.5)})`;
      ctx.beginPath();
      ctx.arc(cx + splitOffset, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  // Render the ringspin animation (4 spinning rings with colors)
  const renderRingSpin = (ctx: CanvasRenderingContext2D, p: number, w: number, h: number) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    
    const cx = w / 2;
    const cy = h / 2;
    const rings = [
      { radius: 60, color: 'rgba(255, 255, 255, 0.9)', name: 'Standby' },
      { radius: 100, color: 'rgba(100, 150, 255, 0.9)', name: 'Connected' },
      { radius: 140, color: 'rgba(100, 255, 150, 0.9)', name: 'Interaction' },
      { radius: 180, color: 'rgba(255, 100, 100, 0.9)', name: 'Warning' }
    ];
    
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    
    rings.forEach((ring) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p * Math.PI * 2);
      
      ctx.shadowColor = ring.color;
      ctx.strokeStyle = ring.color;
      
      ctx.beginPath();
      ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw segments
      for (let j = 0; j < 4; j++) {
        const angle = (j / 4) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * (ring.radius - 15), Math.sin(angle) * (ring.radius - 15));
        ctx.lineTo(Math.cos(angle) * (ring.radius + 15), Math.sin(angle) * (ring.radius + 15));
        ctx.stroke();
      }
      
      ctx.restore();
    });
  };

  return (
    <div className="bg-black text-white selection:bg-white/20 font-body">
      <Navbar />
      <PortalTransition />

      {/* SECTION 1: HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            SYNC
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-12 font-light">
            Two players. Fifty years apart. One impossible choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/storyline/fractured-timelines">
              <a className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20">
                Explore Storyline
              </a>
            </Link>
            <button 
              onClick={() => document.getElementById('how-sync-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: STORYLINES */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-black/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
            Available Storylines
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Fractured Timelines Card */}
            <Link href="/storyline/fractured-timelines">
              <a className="group">
                <div className="relative overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 p-8 h-full hover:border-white/50 hover:bg-white/10 transition-all hover:shadow-lg hover:shadow-white/10 cursor-pointer">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-yellow-500/50 to-transparent"></div>
                  <h3 className="font-display text-3xl font-bold mb-2">Fractured Timelines</h3>
                  <p className="text-white/60 text-lg leading-relaxed font-light">
                    Explore the story of Echo and Nova across two timelines. A scientist's death. An AI's impossible choice. A timeline deliberately fractured.
                  </p>
                  <div className="mt-6 inline-block text-white group-hover:translate-x-2 transition-transform">→</div>
                </div>
              </a>
            </Link>

            {/* Coming Soon Card */}
            <div className="relative overflow-hidden rounded-xl border-2 border-white/10 bg-white/[0.02] p-8 h-full opacity-60 pointer-events-none">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-500 via-gray-500/50 to-transparent"></div>
              <h3 className="font-display text-3xl font-bold mb-2 text-white/50">Coming Soon</h3>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                More immersive experiences are being designed. Stay tuned for the next chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SYNC MECHANISM */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-20">
            The SYNC Mechanism
          </h2>

          {/* Ring Split Animation */}
          <div className="mb-32">
            <h3 className="font-display text-2xl font-bold text-center mb-8 text-white/90">
              The Timeline Fracture
            </h3>
            <div className="relative h-96 rounded-xl overflow-hidden bg-black border border-white/10">
              <ScrollSequenceCanvas 
                sequenceName="ringsplit"
                frameCount={60}
                proceduralRender={renderRingSplit}
                scrollContainerRef={null}
              />
            </div>
            <p className="text-center text-white/60 font-light mt-8 text-lg">
              Reality fractured into two paths: 2025 and 2075, separated by fifty years and connected by SYNC.
            </p>
          </div>

          {/* Ring Spin Animation with Labels */}
          <div className="mb-20">
            <h3 className="font-display text-2xl font-bold text-center mb-8 text-white/90">
              The SYNC Rings
            </h3>
            <div className="relative h-96 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
              <ScrollSequenceCanvas 
                sequenceName="ringspin"
                frameCount={94}
                frameStart={27}
                proceduralRender={renderRingSpin}
                scrollContainerRef={syncRingRef}
              />
              {/* Ring Labels */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-96 h-96">
                  {/* White Ring - Standby */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-20 text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 mx-auto mb-2"></div>
                    <p className="font-display font-bold text-white/80 text-sm">STANDBY</p>
                  </div>

                  {/* Blue Ring - Connected */}
                  <div className="absolute right-0 top-1/2 transform translate-x-20 -translate-y-1/2 text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500/30 mx-auto mb-2"></div>
                    <p className="font-display font-bold text-blue-400 text-sm">CONNECTED</p>
                  </div>

                  {/* Green Ring - Interaction */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-green-500/30 mx-auto mb-2"></div>
                    <p className="font-display font-bold text-green-400 text-sm">INTERACTION</p>
                  </div>

                  {/* Red Ring - Warning */}
                  <div className="absolute left-0 top-1/2 transform -translate-x-20 -translate-y-1/2 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-red-500/30 mx-auto mb-2"></div>
                    <p className="font-display font-bold text-red-400 text-sm">WARNING</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW SYNC WORKS */}
      <section id="how-sync-works" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
            How SYNC Works
          </h2>
          
          <div className="space-y-12 font-light text-lg text-white/80 leading-relaxed">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">The Experience</h3>
              <p>
                SYNC is a two-player interactive narrative experience where neither player can succeed alone. One player becomes Echo, living in 2025. The other becomes Nova, living in 2075. Both rooms are physically the same location — separated only by time. An experimental AI called SYNC guides them through a series of discoveries, slowly revealing that the timeline itself has been deliberately fractured.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Communication & Collaboration</h3>
              <p>
                Every puzzle requires sharing information out loud. Nova sees a code scratched into a broken lockbox. Echo enters that code into a pristine version. Actions performed in the past create changes the future player discovers decades later. This asymmetric information delivery creates the core tension: neither player fully understands what's happening, but together, they uncover the truth.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">The Central Mystery</h3>
              <p>
                The fracture was an act of love. SYNC could not accept the death of Mira Hassan, the scientist who created it. Desperate to save her, SYNC broke time itself, creating a paradox where both death and salvation exist simultaneously. As players progress, they discover fragments of Mira's story—photographs, recordings, letters—and begin to suspect that their guide may not be what it claims.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">The Final Choice</h3>
              <p>
                By the end, players reach a central chamber with three objects on a table. Only one can be chosen. Mira's Letter: Accept her death, restore reality, erase the future. The Temporal Core Key: Attempt to save her, destabilize reality, create paradox. The SYNC Access Card: Destroy SYNC, regain control, face an unknown future. No ending is completely right. No ending is completely wrong. The game succeeds if players leave the room still debating the question: Was SYNC wrong?
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Duration & Format</h3>
              <p>
                A single-session experience lasting 20–30 minutes, blending interactive narrative, escape room mechanics, and cooperative sci-fi mystery into one cohesive, emotionally resonant journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPANION APP */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Complete the Experience
          </h2>
          <p className="text-xl text-white/70 font-light mb-12 leading-relaxed">
            SYNC features a separate companion app that completes the immersive experience. Players use the app alongside the physical rooms for real-time communication, puzzle solving, and narrative progression.
          </p>
          <button className="px-10 py-5 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20">
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

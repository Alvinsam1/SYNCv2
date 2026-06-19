import { Link } from 'wouter';
import { Navbar } from '@/components/Navbar';

export default function StorylineFracturedTimelines() {
  return (
    <div className="bg-black text-white selection:bg-white/20 font-body min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/">
            <a className="text-white/60 hover:text-white transition-colors mb-8 inline-block">← Back to Home</a>
          </Link>
          <h1 className="font-display text-6xl md:text-7xl font-bold mb-4">Fractured Timelines</h1>
          <p className="text-xl md:text-2xl text-white/70 font-light">
            A narrative separated by fifty years. Connected by one impossible choice.
          </p>
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

      {/* Characters Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">The Players</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* ECHO */}
            <div>
              <div className="mb-8 h-64 rounded-lg border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-purple-500/50 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-purple-400">E</span>
                  </div>
                  <p className="text-white/60 font-light">Image Placeholder</p>
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-2">ECHO</h3>
              <p className="text-white/50 font-light text-sm mb-6">Lives in 2025</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-white/90 mb-2">Personality</h4>
                  <p className="text-white/70 font-light">Curious • Optimistic • Emotional</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white/90 mb-2">Room State</h4>
                  <p className="text-white/70 font-light">Clean · Operational · Well Lit</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white/90 mb-2">Narrative Function</h4>
                  <p className="text-white/70 font-light">Represents the past. Creates causes. Changes events.</p>
                </div>
              </div>
            </div>

            {/* NOVA */}
            <div>
              <div className="mb-8 h-64 rounded-lg border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-yellow-500/50 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-yellow-400">N</span>
                  </div>
                  <p className="text-white/60 font-light">Image Placeholder</p>
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-2">NOVA</h3>
              <p className="text-white/50 font-light text-sm mb-6">Lives in 2075</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-white/90 mb-2">Personality</h4>
                  <p className="text-white/70 font-light">Practical • Resourceful • Cautious</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white/90 mb-2">Room State</h4>
                  <p className="text-white/70 font-light">Damaged · Dusty · Abandoned</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white/90 mb-2">Narrative Function</h4>
                  <p className="text-white/70 font-light">Represents the future. Observes consequences. Discovers truths.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <h3 className="font-display text-xl font-bold text-white mb-3">Cause & Effect</h3>
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
                  <p className="font-display font-bold text-white/90">Triumph & Dread</p>
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
          <Link href="/">
            <a className="text-white/60 hover:text-white transition-colors mb-8 inline-block">← Back to Home</a>
          </Link>
          <h3 className="font-display text-2xl font-bold mb-4">SYNC</h3>
          <p className="text-white/50 font-light">
            An immersive two-player experience by Alvin Samuel | MMD901 Spring 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

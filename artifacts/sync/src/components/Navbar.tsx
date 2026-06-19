import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
      <Link href="/" className="text-xl font-bold tracking-widest uppercase">
        SYNC
      </Link>
      <div className="flex gap-6 text-sm font-medium tracking-wide">
        <Link href="/" className="hover:text-white/70 transition-colors">Experience</Link>
        <Link href="/nova" className="text-[hsl(var(--color-nova))] hover:opacity-80 transition-opacity">Nova</Link>
        <Link href="/echo" className="text-[hsl(var(--color-echo))] hover:opacity-80 transition-opacity">Echo</Link>
      </div>
    </nav>
  );
}

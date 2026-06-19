export function GlassCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5 ${className}`}>
      {children}
    </div>
  );
}

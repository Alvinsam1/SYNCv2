import { GlassCard } from './GlassCard';

export function FeatureCard({ title, description, index }: { title: string, description: string, index: number }) {
  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="text-white/30 font-mono text-sm">0{index}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{description}</p>
    </GlassCard>
  );
}

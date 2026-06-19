import { motion } from 'framer-motion';

export function TimelineStep({ id, title, description, isLast }: { id: string, title: string, description: string, isLast?: boolean }) {
  return (
    <div className="relative flex gap-8 md:gap-12 w-full max-w-3xl mx-auto group">
      {/* Line & Dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-white/20 border border-white/50 group-hover:bg-white transition-colors duration-500 relative z-10" />
        {!isLast && (
          <div className="w-px h-full min-h-[100px] bg-gradient-to-b from-white/20 to-white/5 my-2" />
        )}
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pb-16"
      >
        <span className="text-[hsl(var(--color-nova))] font-mono text-sm tracking-widest">{id}</span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">{title}</h3>
        <p className="text-white/60 text-base md:text-lg leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
}

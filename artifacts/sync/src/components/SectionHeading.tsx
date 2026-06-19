import { motion } from "framer-motion";

export function SectionHeading({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const text = typeof children === 'string' ? children : '';
  
  return (
    <motion.h2 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`text-4xl md:text-6xl font-bold tracking-tighter ${className}`}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h2>
  );
}

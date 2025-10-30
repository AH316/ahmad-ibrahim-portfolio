import { motion } from 'framer-motion';

interface QuoteProps {
  text: string;
  author: string;
  className?: string;
}

export default function Quote({ text, author, className = '' }: QuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative py-8 ${className}`}
      data-testid="lotr-quote"
    >
      <div className="flex items-start gap-4">
        <span className="text-gondor-gold text-4xl font-cinzel leading-none mt-2">&ldquo;</span>
        <div className="flex-1">
          <p className="text-gondor-silver text-lg md:text-xl italic font-light leading-relaxed">
            {text}
          </p>
          <p className="text-gondor-gold font-cinzel text-sm md:text-base mt-3">
            &mdash; {author}
          </p>
        </div>
        <span className="text-gondor-gold text-4xl font-cinzel leading-none mt-2">&rdquo;</span>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gondor-gold to-transparent opacity-30"></div>
    </motion.div>
  );
}

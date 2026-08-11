import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import LightRays from '../ui/LightRays';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* WebGL light rays background */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-100">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3b82f6"
          raysSpeed={0.6}
          lightSpread={0.14}
          rayLength={1.6}
          followMouse={true}
          mouseInfluence={0.12}
          noiseAmount={0.02}
          distortion={0.02}
          fadeDistance={0.85}
        />
      </div>

      {/* Fade para a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 to-transparent pointer-events-none z-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full text-center flex flex-col items-center">
        {/* Terminal eyebrow */}
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mb-10 tracking-wider select-none"
        >
          <span className="text-blue-500">~/</span>joao-mendes
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none mb-6"
        >
          {t('hero.name')}
        </motion.h1>

        {/* Role — bracket style */}
        <motion.p {...fadeUp(0.3)} className="font-mono text-sm tracking-widest mb-8">
          <span className="text-zinc-400 dark:text-zinc-600">[ </span>
          <span className="text-blue-500">{t('hero.role')}</span>
          <span className="text-zinc-400 dark:text-zinc-600"> ]</span>
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-zinc-600 dark:text-zinc-400 text-lg max-w-lg leading-relaxed mb-12"
        >
          {t('hero.desc')}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => scrollTo('#projects')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors duration-200"
          >
            {t('hero.cta_primary')}
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="group font-mono text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {t('hero.cta_secondary')}
            <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

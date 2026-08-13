import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import ParticleText from '../ui/ParticleText';
import ContactModal from '../ui/ContactModal';

const LightRays = lazy(() => import('../ui/LightRays'));

const isLowEndDevice = () =>
  typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Layer 0: WebGL light rays — lazy loaded, disabled on low-end devices */}
      {!isLowEndDevice() && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
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
          </Suspense>
        </div>
      )}

      {/* Layer 1: ParticleText cobrindo a hero inteira */}
      <div className="absolute inset-0 z-10">
        <ParticleText
          text={t('hero.name')}
          particleSize={2}
          density={4}
          color={theme === 'dark' ? '#e4e4e7' : '#18181b'}
          highlightColor="#3b82f6"
          scatter={200}
          gatherDuration={1400}
          stagger={380}
          pointerRepel={50}
          repelRadius={130}
          idleDrift={0.3}
          trigger="mount"
          fontSize="clamp(3.5rem, 11vw, 8rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow={false}
        />
      </div>

      {/* Layer 2: Conteúdo sobreposto */}
      <div className="relative z-20 min-h-screen flex flex-col items-center px-6 pointer-events-none">
        {/* Terminal eyebrow — topo */}
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono text-xs text-zinc-400 dark:text-zinc-600 tracking-wider select-none mt-28"
        >
          <span className="text-blue-500">~/</span>joao-mendes
        </motion.p>

        <div className="flex-1" />

        {/* Role, desc, CTAs — base */}
        <div className="flex flex-col items-center gap-6 pb-28 text-center pointer-events-auto">
          <motion.p {...fadeUp(0.3)} className="font-mono text-sm tracking-widest">
            <span className="text-zinc-400 dark:text-zinc-600">[ </span>
            <span className="text-blue-500">{t('hero.role')}</span>
            <span className="text-zinc-400 dark:text-zinc-600"> ]</span>
          </motion.p>

          <motion.p
            {...fadeUp(0.4)}
            className="text-zinc-600 dark:text-zinc-400 text-lg max-w-lg leading-relaxed"
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors duration-200"
            >
              {t('hero.cta_primary')}
            </button>
            <button
              onClick={() => scrollTo('#projects')}
              className="group font-mono text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {t('hero.cta_secondary')}
              <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade para a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-30" />

      {/* Modal */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Briefcase, CheckCircle2, Languages, Building2 } from 'lucide-react';
import { LocationMap } from '../ui/LocationMap';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

export default function About() {
  const { t } = useTranslation();

  const facts = [
    { icon: GraduationCap, key: 'about.education' },
    { icon: Briefcase,     key: 'about.experience' },
    { icon: Building2,     key: 'about.company', href: 'https://swscompany.com.br', clickHint: true },
    { icon: Languages,     key: 'about.english' },
    { icon: CheckCircle2,  key: 'about.status', highlight: true, fullWidth: true },
  ];

  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p {...fadeUp(0)} className="font-mono text-blue-500 text-xs mb-3 tracking-widest uppercase">
          {t('about.tag')}
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-16 tracking-tight">
          {t('about.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Photo — idêntico ao original */}
          <motion.div {...fadeUp(0.15)} className="relative">
            <div className="aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
              <img
                src="/joao.png"
                alt="João Mendes"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-full max-w-sm h-full rounded-2xl border border-blue-500/20 -z-10 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <div className="space-y-5">
            <motion.p {...fadeUp(0.2)} className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t('about.bio1')}
            </motion.p>
            <motion.p {...fadeUp(0.28)} className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t('about.bio2')}
            </motion.p>
            <motion.p {...fadeUp(0.36)} className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t('about.bio3')}
            </motion.p>

            {/* Location Map */}
            <motion.div {...fadeUp(0.42)} className="pt-1">
              <LocationMap
                location={t('about.location')}
                coordinates="24.3600° S, 50.6144° W"
              />
            </motion.div>

            {/* Fact chips */}
            <motion.div {...fadeUp(0.50)} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {facts.map(({ icon: Icon, key, highlight, href, clickHint, fullWidth }) => {
                const chipClass = `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  highlight
                    ? 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400'
                    : href
                    ? 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`;
                const iconClass = highlight ? 'text-blue-500' : href ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400';

                const baseContent = (
                  <>
                    <Icon size={14} className={iconClass} />
                    <span className="flex-1">{t(key)}</span>
                    {href && <span className="text-xs opacity-50">↗</span>}
                  </>
                );

                if (clickHint && href) {
                  return (
                    <div key={key} className="relative">
                      <a href={href} target="_blank" rel="noopener noreferrer" className={chipClass}>
                        {baseContent}
                      </a>
                      <span className="absolute -top-2.5 right-3 bg-blue-500 text-white text-[9px] px-2.5 py-1 rounded-full font-semibold tracking-wide shadow-sm shadow-blue-500/40 pointer-events-none select-none">
                        clique aqui
                      </span>
                    </div>
                  );
                }

                return href ? (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={chipClass}>
                    {baseContent}
                  </a>
                ) : (
                  <div key={key} className={`${chipClass}${fullWidth ? ' sm:col-span-2' : ''}`}>{baseContent}</div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, GraduationCap, Briefcase, CheckCircle2, Languages, Building2 } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

export default function About() {
  const { t } = useTranslation();

  const facts = [
    { icon: MapPin,        key: 'about.location' },
    { icon: GraduationCap, key: 'about.education' },
    { icon: Briefcase,     key: 'about.experience' },
    { icon: Building2,     key: 'about.company', href: 'https://swscompany.com.br' },
    { icon: Languages,     key: 'about.english' },
    { icon: CheckCircle2,  key: 'about.status', highlight: true },
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
          {/* Photo */}
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

            <motion.div {...fadeUp(0.44)} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {facts.map(({ icon: Icon, key, highlight, href }) => {
                const className = `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  highlight
                    ? 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400'
                    : href
                    ? 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`;
                const iconClass = highlight ? 'text-blue-500' : href ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400';
                const content = (
                  <>
                    <Icon size={14} className={iconClass} />
                    {t(key)}
                    {href && <span className="ml-auto text-xs opacity-50">↗</span>}
                  </>
                );
                return href ? (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                ) : (
                  <div key={key} className={className}>{content}</div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

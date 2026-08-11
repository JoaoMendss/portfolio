import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Monitor, ShoppingCart, Plug, Palette, Wrench } from 'lucide-react';

const icons = {
  landing: Globe,
  webapp: Monitor,
  ecommerce: ShoppingCart,
  api: Plug,
  ui: Palette,
  maintenance: Wrench,
};

const serviceKeys = ['landing', 'webapp', 'ecommerce', 'api', 'ui', 'maintenance'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p {...fadeUp(0)} className="font-mono text-blue-500 text-xs mb-3 tracking-widest uppercase">
          {t('services.tag')}
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          {t('services.title')}
        </motion.h2>
        <motion.p {...fadeUp(0.14)} className="text-zinc-500 dark:text-zinc-400 text-lg mb-16 max-w-lg">
          {t('services.subtitle')}
        </motion.p>

        <div>
          {serviceKeys.map((key, i) => {
            const Icon = icons[key];
            return (
              <motion.div
                key={key}
                {...fadeUp(i * 0.06)}
                className="group flex items-center gap-6 md:gap-10 py-6 border-b border-zinc-100 dark:border-zinc-800/70 last:border-0 cursor-default"
              >
                {/* Number */}
                <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 w-6 flex-shrink-0 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/10 transition-colors duration-300">
                  <Icon size={15} className="text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 w-44 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-300">
                  {t(`services.items.${key}.title`)}
                </h3>

                {/* Dotted line */}
                <div className="hidden md:block flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />

                {/* Description */}
                <p className="hidden md:block text-sm text-zinc-500 dark:text-zinc-400 text-right w-72 flex-shrink-0 leading-relaxed">
                  {t(`services.items.${key}.desc`)}
                </p>

                {/* Arrow */}
                <span className="ml-auto md:ml-0 text-zinc-200 dark:text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 text-lg">
                  →
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

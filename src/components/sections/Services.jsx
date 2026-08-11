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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceKeys.map((key, i) => {
            const Icon = icons[key];
            return (
              <motion.div
                key={key}
                {...fadeUp(i * 0.07)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 bg-white dark:bg-zinc-900 transition-colors duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/15 flex items-center justify-center mb-5 transition-colors">
                  <Icon size={18} className="text-blue-500" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-base">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t(`services.items.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

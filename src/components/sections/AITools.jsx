import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, Code2, Bot, Cpu, Zap, Brain } from 'lucide-react';

const tools = [
  {
    name: 'Claude Code',
    icon: Terminal,
    color: '#3b82f6',
    desc_pt: 'IA da Anthropic no terminal — desenvolvimento, revisão de código e arquitetura.',
    desc_en: "Anthropic's AI in the terminal — development, code review, and architecture.",
  },
  {
    name: 'Cursor AI',
    icon: Code2,
    color: '#8b5cf6',
    desc_pt: 'Editor com IA nativa — autocomplete avançado e chat contextual do código.',
    desc_en: 'AI-native editor — advanced autocomplete and contextual code chat.',
  },
  {
    name: 'ChatGPT',
    icon: Bot,
    color: '#10b981',
    desc_pt: 'Brainstorming, documentação e solução de problemas complexos.',
    desc_en: 'Brainstorming, documentation, and solving complex problems.',
  },
  {
    name: 'v0 by Vercel',
    icon: Cpu,
    color: '#f59e0b',
    desc_pt: 'Geração de componentes UI com IA — prototipação rápida.',
    desc_en: 'AI UI component generation — rapid prototyping.',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function AITools() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const advantages = t('ai.advantages', { returnObjects: true });

  return (
    <section id="ai" className="py-28 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.p {...fadeUp(0)} className="font-mono text-blue-500 text-xs mb-3 tracking-widest uppercase">
          {t('ai.tag')}
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          {t('ai.title')}
        </motion.h2>
        <motion.p {...fadeUp(0.14)} className="text-zinc-500 dark:text-zinc-400 text-lg mb-16 max-w-lg">
          {t('ai.desc')}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Tools */}
          <div>
            <motion.p {...fadeUp(0.2)} className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-5">
              {t('ai.tools_title')}
            </motion.p>
            <div className="grid sm:grid-cols-2 gap-3">
              {tools.map(({ name, icon: Icon, color, desc_pt, desc_en }, i) => (
                <motion.div
                  key={name}
                  {...fadeUp(0.22 + i * 0.07)}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon size={14} style={{ color }} />
                    <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{name}</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isEn ? desc_en : desc_pt}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Advantages + badge */}
          <div>
            <motion.p {...fadeUp(0.2)} className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-5">
              {t('ai.advantage_title')}
            </motion.p>
            <div className="space-y-4 mb-10">
              {Array.isArray(advantages) && advantages.map((adv, i) => (
                <motion.div key={i} {...fadeUp(0.28 + i * 0.07)} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap size={11} className="text-blue-500" />
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{adv}</p>
                </motion.div>
              ))}
            </div>

            {/* Claude Code badge */}
            <motion.div
              {...fadeUp(0.55)}
              className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Brain size={15} className="text-blue-400" />
                <span className="font-semibold text-blue-400 text-sm">{t('ai.badge_title')}</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t('ai.badge_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiPhp, SiExpress,
  SiPostgresql, SiMongodb, SiMysql,
  SiGit, SiGithub, SiDocker, SiVite,
} from 'react-icons/si';
import { Terminal, Code2, Bot, Cpu } from 'lucide-react';
import { SplineScene } from '../ui/SplineScene';

const stack = {
  frontend: [
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss, color: '#264DE4' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#aaaaaa' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  ],
  database: [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  ],
  tools: [
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: '#aaaaaa' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
  ],
  ai: [
    { name: 'Claude Code', icon: Terminal, color: '#3b82f6' },
    { name: 'Cursor AI', icon: Code2, color: '#8B5CF6' },
    { name: 'ChatGPT', icon: Bot, color: '#74AA9C' },
    { name: 'v0 by Vercel', icon: Cpu, color: '#ffffff' },
  ],
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function Stack() {
  const { t } = useTranslation();

  return (
    <section id="stack" className="py-28 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p {...fadeUp(0)} className="font-mono text-blue-500 text-xs mb-3 tracking-widest uppercase">
          {t('stack.tag')}
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          {t('stack.title')}
        </motion.h2>
        <motion.p {...fadeUp(0.14)} className="text-zinc-500 dark:text-zinc-400 text-lg mb-16 max-w-lg">
          {t('stack.subtitle')}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Tech categories */}
          <div className="space-y-10">
            {Object.entries(stack).map(([category, techs], ci) => (
              <motion.div key={category} {...fadeUp(ci * 0.08)}>
                <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                  {t(`stack.categories.${category}`)}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {techs.map(({ name, icon: Icon, color }) => (
                    <motion.div
                      key={name}
                      whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default"
                    >
                      <Icon size={15} style={{ color }} />
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spline 3D — sticky enquanto scrolla as categorias */}
          <motion.div {...fadeUp(0.2)} className="lg:sticky lg:top-24 h-[580px] relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            {/* Sombra de contato — sensação de chão */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-6 rounded-full bg-black/20 dark:bg-black/50 blur-2xl pointer-events-none" />
            {/* Fade gradual pra fundir com o fundo */}
            <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-zinc-50 via-zinc-50/80 dark:from-zinc-950 dark:via-zinc-950/60 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

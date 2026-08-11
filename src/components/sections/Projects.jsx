import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'DevBurger',
    desc_pt: 'Plataforma completa de pedidos com painel admin, autenticação JWT e integração de pagamentos.',
    desc_en: 'Complete ordering platform with admin panel, JWT authentication, and payment integration.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
    type: 'fullstack',
    status: 'completed',
    accent: '#3b82f6',
    github: 'https://github.com/JoaoMendss',
  },
  {
    id: 2,
    name: 'Smart Collar',
    desc_pt: 'Startup de monitoramento de pets via IoT — dashboard em tempo real e gestão de dispositivos.',
    desc_en: 'Pet monitoring startup via IoT — real-time dashboard and device management.',
    tech: ['React', 'Node.js', 'MongoDB', 'IoT', 'Express'],
    type: 'fullstack',
    status: 'concept',
    accent: '#8b5cf6',
    github: 'https://github.com/JoaoMendss',
  },
  {
    id: 3,
    name: 'MetaBoost',
    desc_pt: 'Frontend para marca de suplementos — design responsivo e otimizado para conversão.',
    desc_en: 'Frontend for a supplement brand — responsive design optimized for conversion.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    type: 'frontend',
    status: 'completed',
    accent: '#10b981',
    github: 'https://github.com/JoaoMendss',
  },
  {
    id: 4,
    name: 'Currency Converter',
    desc_pt: 'Conversor de moedas em tempo real com API de câmbio ao vivo e interface limpa.',
    desc_en: 'Real-time currency converter with live exchange rate API and clean interface.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    type: 'frontend',
    status: 'completed',
    accent: '#f59e0b',
    github: 'https://github.com/JoaoMendss',
  },
  {
    id: 5,
    name: 'JS Games',
    desc_pt: 'Coleção de jogos browser com JavaScript puro — lógica, arcade e física.',
    desc_en: 'Collection of browser games with pure JavaScript — logic, arcade, and physics.',
    tech: ['JavaScript', 'Canvas API', 'HTML5'],
    type: 'frontend',
    status: 'ongoing',
    accent: '#ef4444',
    github: 'https://github.com/JoaoMendss',
  },
  {
    id: 6,
    name: 'UI Lab',
    desc_pt: 'Experimentos de UI — interfaces complexas, animações e padrões avançados de design.',
    desc_en: 'UI experiments — complex interfaces, animations, and advanced design patterns.',
    tech: ['CSS3', 'HTML5', 'JavaScript', 'React'],
    type: 'frontend',
    status: 'ongoing',
    accent: '#06b6d4',
    github: 'https://github.com/JoaoMendss',
  },
];

const statusDot = {
  completed: '#10b981',
  concept: '#f59e0b',
  ongoing: '#3b82f6',
  private: '#71717a',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p {...fadeUp(0)} className="font-mono text-blue-500 text-xs mb-3 tracking-widest uppercase">
          {t('projects.tag')}
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          {t('projects.title')}
        </motion.h2>
        <motion.p {...fadeUp(0.14)} className="text-zinc-500 dark:text-zinc-400 text-lg mb-16 max-w-lg">
          {t('projects.subtitle')}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              {...fadeUp(i * 0.06)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 transition-colors duration-300"
            >
              {/* Accent bar */}
              <div className="w-7 h-0.5 rounded-full mb-5" style={{ background: project.accent }} />

              {/* Meta */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: statusDot[project.status] }}
                />
                <span className="font-mono text-xs text-zinc-400">
                  {t(`projects.status.${project.status}`)}
                </span>
                <span className="ml-auto font-mono text-xs text-zinc-400 uppercase">
                  {t(`projects.type.${project.type}`)}
                </span>
              </div>

              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                {isEn ? project.desc_en : project.desc_pt}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <Github size={13} />
                  {t('projects.github')}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

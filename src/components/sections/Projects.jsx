import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: 'devburger',
    name: 'DevBurger',
    type: 'fullstack',
    status: 'completed',
    github: 'https://github.com/JoaoMendss',
    live: null,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
    desc_pt: 'Plataforma completa de pedidos com painel admin, autenticação JWT e integração de pagamentos.',
    desc_en: 'Complete ordering platform with admin panel, JWT authentication, and payment integration.',
    about_pt: 'Sistema de delivery de hambúrgueres com dois painéis — cliente e admin. O cliente navega o cardápio, monta pedidos e acompanha status em tempo real. O admin gerencia produtos, categorias e pedidos com atualização automática.',
    about_en: 'Burger delivery system with two panels — customer and admin. Customers browse the menu, build orders, and track status in real time. Admins manage products, categories, and orders with live updates.',
    how_pt: 'Arquitetura em dois repositórios separados. Frontend em React + Vite com Context API para carrinho. Backend RESTful em Node.js/Express com autenticação via JWT e refresh tokens. PostgreSQL com Sequelize ORM, deploy em Railway (API) e Vercel (frontend).',
    how_en: 'Two separate repositories. React + Vite frontend with Context API for cart state. Node.js/Express RESTful backend with JWT + refresh token auth. PostgreSQL via Sequelize ORM, deployed on Railway (API) and Vercel (frontend).',
  },
  {
    slug: 'smart-collar',
    name: 'Smart Collar',
    type: 'fullstack',
    status: 'concept',
    github: 'https://github.com/JoaoMendss',
    live: null,
    tech: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'ESP32'],
    desc_pt: 'Startup de monitoramento de pets via IoT — dashboard em tempo real e gestão de dispositivos.',
    desc_en: 'Pet monitoring startup via IoT — real-time dashboard and device management.',
    about_pt: 'Coleiras inteligentes que enviam dados de localização, temperatura corporal e nível de atividade do pet para um dashboard web. Proprietários acompanham a saúde e localização em tempo real pelo celular ou desktop.',
    about_en: 'Smart collars that send pet location, body temperature, and activity data to a web dashboard. Owners monitor health and location in real time via mobile or desktop.',
    how_pt: 'Conceito desenvolvido com dashboard em React e backend Node.js usando WebSockets para streaming de dados em tempo real. MongoDB para armazenar séries temporais dos sensores. Hardware planejado com ESP32 + GPS NEO-6M + sensor de temperatura.',
    how_en: 'Concept developed with React dashboard and Node.js backend using WebSockets for real-time data streaming. MongoDB for sensor time-series storage. Hardware planned with ESP32 + GPS NEO-6M + temperature sensor.',
  },
  {
    slug: 'metaboost',
    name: 'MetaBoost',
    type: 'frontend',
    status: 'completed',
    github: 'https://github.com/JoaoMendss',
    live: null,
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    desc_pt: 'Frontend para marca de suplementos — design responsivo e otimizado para conversão.',
    desc_en: 'Frontend for a supplement brand — responsive design optimized for conversion.',
    about_pt: 'Landing page de alta conversão para marca de suplementos esportivos. Design focado em credibilidade e performance — seções de produto, depoimentos, FAQ e CTA estratégico. Mobile-first e otimizado para SEO.',
    about_en: 'High-conversion landing page for a sports supplement brand. Design focused on credibility and performance — product sections, testimonials, FAQ, and strategic CTA. Mobile-first and SEO optimized.',
    how_pt: 'Desenvolvido com HTML5, CSS3 e JavaScript vanilla para máxima performance sem dependências externas. Animações com CSS transitions e Intersection Observer API. Score 95+ no Lighthouse em performance e acessibilidade.',
    how_en: 'Built with vanilla HTML5, CSS3, and JavaScript for maximum performance without external dependencies. Animations via CSS transitions and Intersection Observer API. 95+ Lighthouse score in performance and accessibility.',
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    type: 'frontend',
    status: 'completed',
    github: 'https://github.com/JoaoMendss',
    live: null,
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    desc_pt: 'Conversor de moedas em tempo real com API de câmbio ao vivo e interface limpa.',
    desc_en: 'Real-time currency converter with live exchange rate API and clean interface.',
    about_pt: 'Aplicação web para conversão de moedas em tempo real com suporte a mais de 150 divisas. Interface limpa e direta — seleciona as moedas, digita o valor e o resultado aparece instantaneamente.',
    about_en: 'Web app for real-time currency conversion supporting 150+ currencies. Clean, direct interface — select currencies, type the amount, and the result shows instantly.',
    how_pt: 'Integração com ExchangeRate API para taxas atualizadas a cada chamada. Cache local via localStorage para reduzir requisições repetidas. JavaScript vanilla com fetch API e manipulação de DOM sem framework.',
    how_en: 'Integrates with ExchangeRate API for up-to-date rates on each call. Local cache via localStorage to reduce repeated requests. Vanilla JavaScript with fetch API and framework-free DOM manipulation.',
  },
  {
    slug: 'js-games',
    name: 'JS Games',
    type: 'frontend',
    status: 'ongoing',
    github: 'https://github.com/JoaoMendss',
    live: null,
    tech: ['JavaScript', 'Canvas API', 'HTML5'],
    desc_pt: 'Coleção de jogos browser com JavaScript puro — lógica, arcade e física.',
    desc_en: 'Collection of browser games with pure JavaScript — logic, arcade, and physics.',
    about_pt: 'Projeto de estudo contínuo de algoritmos e física 2D no browser. Snake e Tetris já completos com sistema de score e níveis. Pong com IA simples. Sistema de física para platformer em desenvolvimento.',
    about_en: 'Ongoing study project for algorithms and 2D physics in the browser. Snake and Tetris complete with scoring and levels. Pong with basic AI. Physics engine for a platformer in development.',
    how_pt: 'Cada jogo é um módulo independente com seu próprio game loop usando requestAnimationFrame. Física implementada do zero — vetores 2D, detecção de colisão AABB e resposta a colisão. Canvas API para renderização a 60fps.',
    how_en: 'Each game is an independent module with its own game loop using requestAnimationFrame. Physics implemented from scratch — 2D vectors, AABB collision detection, and collision response. Canvas API for 60fps rendering.',
  },
  {
    slug: 'ui-lab',
    name: 'UI Lab',
    type: 'frontend',
    status: 'ongoing',
    github: 'https://github.com/JoaoMendss',
    live: null,
    tech: ['CSS3', 'HTML5', 'JavaScript', 'React', 'Framer Motion'],
    desc_pt: 'Experimentos de UI — interfaces complexas, animações e padrões avançados de design.',
    desc_en: 'UI experiments — complex interfaces, animations, and advanced design patterns.',
    about_pt: 'Laboratório pessoal de experimentos de UI — componentes incomuns, microinterações e desafios de CSS que vão além do convencional. Cada componente é um exercício de criatividade e técnica.',
    about_en: 'Personal UI experiment lab — unusual components, micro-interactions, and CSS challenges that go beyond the conventional. Each component is an exercise in creativity and technique.',
    how_pt: 'Componentes isolados em React com foco em técnicas avançadas: CSS custom properties, clip-path, SVG animations e Framer Motion. Documentados e componentizados para eventual open-source. 42 componentes publicados até agora.',
    how_en: 'Isolated React components focused on advanced techniques: CSS custom properties, clip-path, SVG animations, and Framer Motion. Documented and componentized for eventual open-source. 42 components published so far.',
  },
];

const statusColor = {
  completed: '#28c840',
  concept:   '#ffbd2e',
  ongoing:   '#3b82f6',
  private:   '#71717a',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

/* ─── Project Modal ──────────────────────────────────────── */
function ProjectModal({ project, onClose, isEn }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  const about = isEn ? project.about_en : project.about_pt;
  const how   = isEn ? project.how_en   : project.how_pt;

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 shadow-2xl pointer-events-auto">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-[#161616] flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-zinc-500 flex-1 truncate">
                  ~/projects/{project.slug}-full.md
                </span>
                <button
                  onClick={onClose}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors ml-2"
                  aria-label="Fechar"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 p-6 font-mono text-sm space-y-5
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-zinc-700
                [&::-webkit-scrollbar-thumb]:rounded-full">

                {/* Prompt */}
                <p className="text-zinc-600 text-xs">
                  <span className="text-blue-500">$</span> cat {project.slug}-full.md
                </p>

                {/* Heading + meta */}
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-bold text-base"># {project.name}</p>
                  <p className="text-xs flex items-center gap-2">
                    <span className="text-zinc-600">&gt;</span>
                    <span className="text-zinc-500">{project.type}</span>
                    <span className="text-zinc-700">·</span>
                    <span style={{ color: statusColor[project.status] }}>{project.status}</span>
                  </p>
                </div>

                <div className="border-t border-zinc-800/60" />

                {/* About */}
                <div className="space-y-2">
                  <p className="text-blue-400 text-xs">## {isEn ? 'About' : 'Sobre'}</p>
                  <p className="text-zinc-400 leading-relaxed text-xs border-l-2 border-zinc-800 pl-3">
                    {about}
                  </p>
                </div>

                {/* How it was built */}
                <div className="space-y-2">
                  <p className="text-blue-400 text-xs">## {isEn ? 'How it was built' : 'Como foi feito'}</p>
                  <p className="text-zinc-400 leading-relaxed text-xs border-l-2 border-zinc-800 pl-3">
                    {how}
                  </p>
                </div>

                {/* Tech */}
                <div className="space-y-2">
                  <p className="text-blue-400 text-xs">## Tech stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-800/60" />

                {/* Links */}
                <div className="flex items-center gap-4 text-xs">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    [↗ github]
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-200 transition-colors"
                    >
                      [↗ live demo]
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Terminal shell ─────────────────────────────────────── */
function Terminal({ path, onClick, children, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-lg
        hover:border-zinc-600 hover:shadow-blue-500/[0.07] transition-all duration-300
        cursor-pointer flex flex-col group ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-[#161616] flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-zinc-600 truncate flex-1">{path}</span>
        <span className="font-mono text-xs text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
          [enter ↵]
        </span>
      </div>
      <div className="p-5 font-mono text-xs flex flex-col gap-2.5 flex-1">
        {children}
      </div>
    </div>
  );
}

function Prompt({ cmd }) {
  return (
    <p className="text-zinc-600">
      <span className="text-blue-500">$</span> {cmd}
    </p>
  );
}

function GithubLink({ href }) {
  return (
    <div className="pt-2 mt-auto border-t border-zinc-800/60">
      <span className="text-zinc-600">[↗ github]</span>
    </div>
  );
}

/* ─── Card variants ──────────────────────────────────────── */
function DevBurgerCard({ project, onClick, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }} className="lg:col-span-2">
      <Terminal path="~/projects/devburger.md" onClick={onClick} className="h-full">
        <Prompt cmd="cat devburger.md" />
        <p className="text-zinc-100 font-bold text-sm mt-1"># DevBurger</p>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">fullstack</span> · <span className="text-emerald-400">completed</span></p>
        <p className="text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-3">{project.desc_pt}</p>
        <p><span className="text-blue-400">tech</span><span className="text-zinc-700">: </span><span className="text-emerald-400">React · Node.js · PostgreSQL · Express · JWT</span></p>
        <GithubLink href={project.github} />
      </Terminal>
    </motion.div>
  );
}

function SmartCollarCard({ project, onClick, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/smart-collar" onClick={onClick} className="h-full">
        <Prompt cmd="git log --oneline -5" />
        <div className="space-y-1.5 mt-1">
          {[
            ['a3f9c12', 'add real-time IoT dashboard'],
            ['b721e8a', 'integrate device management'],
            ['c934d1f', 'setup MongoDB aggregation'],
            ['d102fa9', 'add JWT auth layer'],
            ['e891b3c', 'initial commit'],
          ].map(([hash, msg]) => (
            <p key={hash}><span className="text-yellow-500/80">{hash}</span><span className="text-zinc-400"> {msg}</span></p>
          ))}
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">fullstack</span> · <span className="text-yellow-400">concept</span></p>
        <GithubLink href={project.github} />
      </Terminal>
    </motion.div>
  );
}

function MetaBoostCard({ project, onClick, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/metaboost" onClick={onClick} className="h-full">
        <Prompt cmd="npm run build" />
        <div className="space-y-1 mt-1">
          <p className="text-zinc-600">&gt; metaboost@1.0.0 build</p>
          <p><span className="text-emerald-400">✓</span> <span className="text-zinc-400">css  </span><span className="text-zinc-500">12.4 kB │ gzip: 4.1 kB</span></p>
          <p><span className="text-emerald-400">✓</span> <span className="text-zinc-400">js   </span><span className="text-zinc-500">48.1 kB │ gzip: 16.8 kB</span></p>
          <p><span className="text-emerald-400">✓</span> <span className="text-zinc-400">html </span><span className="text-zinc-500">optimized</span></p>
          <p className="text-zinc-600 mt-1">built in <span className="text-emerald-400">1.24s</span></p>
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">frontend</span> · <span className="text-emerald-400">completed</span></p>
        <GithubLink href={project.github} />
      </Terminal>
    </motion.div>
  );
}

function CurrencyCard({ project, onClick, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/currency-converter" onClick={onClick} className="h-full">
        <Prompt cmd="node index.js" />
        <div className="space-y-1 mt-1">
          <p className="text-zinc-600">fetching live rates<span className="animate-pulse">...</span></p>
          <p><span className="text-blue-400">USD</span><span className="text-zinc-600"> → </span><span className="text-zinc-400">BRL</span><span className="text-zinc-700">  </span><span className="text-emerald-400">5.42</span></p>
          <p><span className="text-blue-400">USD</span><span className="text-zinc-600"> → </span><span className="text-zinc-400">EUR</span><span className="text-zinc-700">  </span><span className="text-emerald-400">0.91</span></p>
          <p><span className="text-blue-400">USD</span><span className="text-zinc-600"> → </span><span className="text-zinc-400">GBP</span><span className="text-zinc-700">  </span><span className="text-emerald-400">0.79</span></p>
          <p className="text-zinc-600">status: <span className="text-emerald-400">✓ live</span></p>
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">frontend</span> · <span className="text-emerald-400">completed</span></p>
        <GithubLink href={project.github} />
      </Terminal>
    </motion.div>
  );
}

function GamesCard({ project, onClick, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/js-games" onClick={onClick} className="h-full">
        <Prompt cmd="ls games/" />
        <div className="space-y-1 mt-1">
          {[['snake.js','done'],['tetris.js','done'],['pong.js','wip'],['physics.js','wip']].map(([file, st]) => (
            <p key={file} className="flex justify-between">
              <span className="text-zinc-400">{file}</span>
              <span className={st === 'done' ? 'text-emerald-400' : 'text-blue-400'}>{st === 'done' ? '✓ done' : '~ wip'}</span>
            </p>
          ))}
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">frontend</span> · <span className="text-blue-400">ongoing</span></p>
        <GithubLink href={project.github} />
      </Terminal>
    </motion.div>
  );
}

function UILabCard({ project, onClick, isEn, delay }) {
  const entries = isEn
    ? [['11:23:01','AnimatedCard.jsx','deployed'],['11:24:18','MorphButton.jsx','deployed'],['11:25:44','ParallaxHero.jsx','deployed'],['11:26:09','GlitchText.jsx','in progress']]
    : [['11:23:01','AnimatedCard.jsx','publicado'],['11:24:18','MorphButton.jsx','publicado'],['11:25:44','ParallaxHero.jsx','publicado'],['11:26:09','GlitchText.jsx','em progresso']];

  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }} className="md:col-span-2 lg:col-span-3">
      <Terminal path="~/projects/ui-lab" onClick={onClick} className="h-full">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-2.5">
          <div className="space-y-2.5">
            <Prompt cmd="ls components/ | wc -l" />
            <p className="text-zinc-100 text-lg font-bold">42</p>
            <Prompt cmd="git status" />
            <p className="text-zinc-500">On branch <span className="text-emerald-400">main</span></p>
            <p><span className="text-zinc-600">modified: </span><span className="text-yellow-400">3 files</span></p>
            <p className="text-zinc-600">&gt; <span className="text-zinc-500">frontend</span> · <span className="text-blue-400">ongoing</span></p>
          </div>
          <div className="space-y-2.5">
            <Prompt cmd="tail -f deploy.log" />
            <div className="space-y-1">
              {entries.map(([time, file, status]) => (
                <p key={file} className="flex gap-3">
                  <span className="text-zinc-700 flex-shrink-0">[{time}]</span>
                  <span className="text-zinc-400 flex-shrink-0">{file}</span>
                  <span className={`ml-auto flex-shrink-0 ${status.includes('progress') || status.includes('progresso') ? 'text-yellow-400' : 'text-emerald-400'}`}>— {status}</span>
                </p>
              ))}
            </div>
            <div className="pt-2 border-t border-zinc-800/60">
              <span className="text-zinc-600">[↗ github]</span>
            </div>
          </div>
        </div>
      </Terminal>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function Projects() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [selected, setSelected] = useState(null);

  const p = (slug) => PROJECTS.find((x) => x.slug === slug);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          <DevBurgerCard   project={p('devburger')}         onClick={() => setSelected(p('devburger'))}         delay={0}    />
          <SmartCollarCard project={p('smart-collar')}      onClick={() => setSelected(p('smart-collar'))}      delay={0.06} />
          <MetaBoostCard   project={p('metaboost')}         onClick={() => setSelected(p('metaboost'))}         delay={0.10} />
          <CurrencyCard    project={p('currency-converter')} onClick={() => setSelected(p('currency-converter'))} delay={0.14} />
          <GamesCard       project={p('js-games')}          onClick={() => setSelected(p('js-games'))}          delay={0.18} />
          <UILabCard       project={p('ui-lab')}            onClick={() => setSelected(p('ui-lab'))}            isEn={isEn}  delay={0.22} />
        </div>
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        isEn={isEn}
      />
    </section>
  );
}

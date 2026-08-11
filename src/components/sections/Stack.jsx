import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiPhp, SiExpress,
  SiPostgresql, SiMongodb, SiMysql,
  SiGit, SiGithub, SiDocker, SiVite,
} from 'react-icons/si';
import { Terminal, Code2, Bot, Cpu } from 'lucide-react';
import { SplineScene } from '../ui/SplineScene';
import ContactModal from '../ui/ContactModal';

const descriptions = {
  pt: {
    'HTML5':        'Linguagem de marcação que estrutura todo o conteúdo da web. Define o esqueleto de páginas — textos, imagens, links e formulários.',
    'CSS3':         'Responsável pela estilização visual da web. Controla cores, tipografia, layout e animações em cascata sobre o HTML.',
    'JavaScript':   'A linguagem da web. Adiciona interatividade e lógica a qualquer página — roda no browser e no servidor via Node.js.',
    'React':        'Biblioteca para construir interfaces em componentes reutilizáveis. Gerencia o estado da UI de forma eficiente com Virtual DOM.',
    'Tailwind CSS': 'Framework CSS utility-first. Você aplica classes prontas direto no HTML — sem sair do arquivo, sem nomear nada.',
    'Node.js':      'Runtime JavaScript no servidor. Permite usar a mesma linguagem no frontend e backend, ideal para APIs e apps em tempo real.',
    'Express':      'Framework minimalista para Node.js. Simplifica a criação de servidores HTTP, rotas e middlewares com poucas linhas.',
    'PHP':          'Linguagem server-side amplamente usada na web. Presente em mais de 75% dos sites do mundo, incluindo o WordPress.',
    'PostgreSQL':   'Banco relacional open-source robusto. Suporta JSON, queries complexas e garante integridade dos dados com ACID compliance.',
    'MongoDB':      'Banco NoSQL orientado a documentos. Armazena dados em formato JSON flexível — ótimo para estruturas dinâmicas.',
    'MySQL':        'Um dos bancos relacionais mais populares. Rápido, confiável e amplamente suportado por hospedagens e frameworks.',
    'Git':          'Sistema de controle de versão distribuído. Registra o histórico completo do código e facilita colaboração em equipe.',
    'GitHub':       'Plataforma de hospedagem de repositórios Git. Hub central para open-source, code review e colaboração entre devs.',
    'Docker':       'Plataforma de containerização. Empacota apps com todas as dependências — roda igual em qualquer ambiente.',
    'Vite':         'Build tool moderna para frontend. Servidor de dev instantâneo e builds ultrarrápidos com hot module replacement.',
    'Claude Code':  'IA da Anthropic especializada em código. Agente de terminal que lê, escreve e raciocina sobre qualquer codebase com autonomia.',
    'Cursor AI':    'Editor de código com IA integrada. Autocompleta, refatora e explica código em contexto, direto no editor.',
    'ChatGPT':      'Modelo de linguagem da OpenAI. Útil para rascunhar ideias, explicar conceitos técnicos e brainstorm de soluções.',
    'v0 by Vercel': 'Gerador de componentes UI da Vercel via prompts. Cria código React + Tailwind funcional a partir de linguagem natural.',
  },
  en: {
    'HTML5':        'Markup language that structures all web content. Defines the skeleton of pages — texts, images, links, and forms.',
    'CSS3':         'Responsible for the visual styling of the web. Controls colors, typography, layout, and animations cascading over HTML.',
    'JavaScript':   'The language of the web. Adds interactivity and logic to any page — runs in the browser and on the server via Node.js.',
    'React':        'Library for building UIs with reusable components. Manages UI state efficiently using Virtual DOM.',
    'Tailwind CSS': 'Utility-first CSS framework. Apply ready-made classes directly in HTML — no separate files, no naming anything.',
    'Node.js':      'JavaScript runtime on the server. Use the same language in frontend and backend, ideal for APIs and real-time apps.',
    'Express':      'Minimalist framework for Node.js. Simplifies creating HTTP servers, routes, and middlewares with minimal code.',
    'PHP':          'Widely used server-side language. Powers over 75% of websites worldwide, including WordPress.',
    'PostgreSQL':   'Robust open-source relational database. Supports JSON, complex queries, and guarantees data integrity with ACID compliance.',
    'MongoDB':      'NoSQL document-oriented database. Stores data in flexible JSON format — great for dynamic structures.',
    'MySQL':        'One of the most popular relational databases. Fast, reliable, and widely supported by hosts and frameworks.',
    'Git':          'Distributed version control system. Records the complete history of code changes and facilitates team collaboration.',
    'GitHub':       'Git repository hosting platform. Central hub for open-source, code review, and developer collaboration.',
    'Docker':       'Containerization platform. Packages apps with all dependencies — runs the same in any environment.',
    'Vite':         'Modern frontend build tool. Instant dev server and ultra-fast builds with hot module replacement.',
    'Claude Code':  "Anthropic's code-specialized AI. Terminal agent that reads, writes, and reasons about any codebase autonomously.",
    'Cursor AI':    'Code editor with built-in AI. Autocompletes, refactors, and explains code in context, directly in your editor.',
    'ChatGPT':      "OpenAI's language model. Useful for drafting ideas, explaining technical concepts, and brainstorming solutions.",
    'v0 by Vercel': "Vercel's UI component generator via prompts. Creates functional React + Tailwind code from natural language.",
  },
};

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
    { name: 'v0 by Vercel', icon: Cpu, color: '#18181b', darkColor: '#ffffff' },
  ],
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

function RobotBubble({ isEn, onTalk }) {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [showCta, setShowCta] = useState(false);

  const messages = isEn
    ? ["Hey, I'm Finn!", 'What do you need today?']
    : ['Ei, eu sou o Finn!', 'Do que precisa hoje?'];

  useEffect(() => {
    setText('');
    setShowCta(false);
    let i = 0;
    const msg = messages[messageIndex];
    const timers = [];

    const typer = setInterval(() => {
      i++;
      setText(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(typer);
        if (messageIndex < messages.length - 1) {
          timers.push(setTimeout(() => setMessageIndex((mi) => mi + 1), 2200));
        } else {
          timers.push(setTimeout(() => setShowCta(true), 700));
          timers.push(setTimeout(() => {
            setShowCta(false);
            setMessageIndex(0);
          }, 700 + 12000));
        }
      }
    }, 65);

    return () => {
      clearInterval(typer);
      timers.forEach(clearTimeout);
    };
  }, [messageIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 220, damping: 22 }}
      className="absolute -top-2 left-4 z-10 max-w-[210px]"
    >
      {/* Bubble */}
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-br-none px-4 py-3.5 shadow-xl">
        <p className="font-mono text-sm text-zinc-800 dark:text-zinc-200 leading-snug min-h-[1.4em]">
          {text}
          <span className="inline-block w-[2px] h-[0.85em] bg-blue-500 ml-[2px] align-middle animate-pulse" />
        </p>

        <AnimatePresence>
          {showCta && (
            <motion.button
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onTalk}
              className="mt-2.5 text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors group flex items-center gap-1"
            >
              {isEn ? "Let's talk" : 'Vamos conversar'}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Tail — aponta para baixo-direita (direção à cabeça do Finn) */}
      <div className="absolute -bottom-[9px] right-5 w-4 h-4 rotate-45 bg-white dark:bg-zinc-900 border-b border-l border-zinc-200 dark:border-zinc-700" />
    </motion.div>
  );
}

export default function Stack() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="stack" className="py-28">
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
                  {techs.map(({ name, icon: Icon, color, darkColor }) => {
                    const desc = isEn ? descriptions.en[name] : descriptions.pt[name];
                    const iconColor = theme === 'dark' && darkColor ? darkColor : color;
                    return (
                      <motion.div
                        key={name}
                        whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                        className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default"
                      >
                        <Icon size={15} style={{ color: iconColor }} />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{name}</span>

                        {/* Tooltip */}
                        {desc && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-52 pointer-events-none
                            opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-200 ease-out delay-150 group-hover:delay-0">
                            <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 shadow-xl">
                              <p className="font-mono text-[11px] text-zinc-300 leading-relaxed">{desc}</p>
                            </div>
                            {/* Seta */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2.5 h-2.5 rotate-45 bg-zinc-900 border-r border-b border-zinc-700" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spline 3D + speech bubble */}
          <motion.div {...fadeUp(0.2)} className="lg:sticky lg:top-24 h-[340px] lg:h-[580px] relative">
            <RobotBubble
              key={isEn ? 'en' : 'pt'}
              isEn={isEn}
              onTalk={() => setModalOpen(true)}
            />

            <div className="absolute inset-0 pt-14 lg:pt-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>

            {/* Sombra de contato */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-6 rounded-full bg-black/20 dark:bg-black/50 blur-2xl pointer-events-none" />
            {/* Ground fade */}
            <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-white via-white/80 dark:from-zinc-950 dark:via-zinc-950/60 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

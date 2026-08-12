import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: 'podium-arena',
    name: 'Podium Arena',
    type: 'fullstack',
    status: 'ongoing',
    live: 'https://frontend-five-vert-72.vercel.app/',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'MercadoPago', 'JWT', 'Google OAuth'],
    desc_pt: 'Sistema completo de reservas para arena de beach tennis, vôlei e futevolei — com painel de usuário, painel admin e pagamentos integrados.',
    desc_en: 'Complete booking system for a beach tennis, volleyball and footvolley arena — with user panel, admin panel, and integrated payments.',
    about_pt: 'Projeto desenvolvido em parceria com meu irmão para a Podium Arena, em Telêmaco Borba (PR). É uma plataforma completa de reservas de quadras com painel do usuário (histórico de reservas, Arena Credits, próximos agendamentos) e painel administrativo (gestão de quadras, horários, relatórios de pagamento). Os usuários podem pagar via Pix, cartão de crédito ou usar Arena Credits — créditos internos da arena.',
    about_en: 'Project built with my brother for Podium Arena, in Telêmaco Borba, Brazil. A complete court booking platform with a user panel (booking history, Arena Credits, upcoming schedules) and an admin panel (court management, schedules, payment reports). Users can pay via Pix, credit card, or Arena Credits — the arena\'s internal credit system.',
    how_pt: 'Frontend em React + Vite com React Router DOM para roteamento. Backend RESTful em Node.js/Express com MongoDB e Mongoose. Autenticação via JWT e login social com Google OAuth. Pagamentos integrados ao MercadoPago (Pix e cartão). Sistema de Arena Credits gerenciado no próprio banco.',
    how_en: 'Frontend in React + Vite with React Router DOM for routing. RESTful backend in Node.js/Express with MongoDB and Mongoose. Authentication via JWT and social login with Google OAuth. Payments integrated with MercadoPago (Pix and credit card). Arena Credits system managed in the database.',
  },
  {
    slug: 'sws-company',
    name: 'SWS Company',
    type: 'fullstack',
    status: 'ongoing',
    live: 'https://swscompany.com.br',
    tech: ['React 19', 'Vite', 'GSAP', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
    desc_pt: 'Site oficial da empresa que co-fundei com meu irmão — Storm Web & Systems, empresa de desenvolvimento web, apps e sistemas.',
    desc_en: 'Official website of the company I co-founded with my brother — Storm Web & Systems, a web development, apps, and systems company.',
    about_pt: 'A SWS (Storm Web & Systems) é uma empresa de tecnologia que fundei com meu irmão. Oferecemos desenvolvimento web, criação de aplicativos e sistemas customizados para empresas. O site institucional apresenta os serviços, portfólio e canais de contato da empresa, com animações fluidas e design profissional.',
    about_en: 'SWS (Storm Web & Systems) is a tech company I co-founded with my brother. We offer web development, app creation, and custom systems for businesses. The institutional site presents the company\'s services, portfolio, and contact channels, with fluid animations and professional design.',
    how_pt: 'Frontend em React 19 + Vite com GSAP para animações avançadas de scroll e entrada de elementos. React Router DOM v7 para navegação. Backend em Node.js + Express 5 com MongoDB e autenticação JWT. Nodemailer para formulário de contato. Docker para containerização do backend.',
    how_en: 'Frontend in React 19 + Vite with GSAP for advanced scroll and entry animations. React Router DOM v7 for navigation. Node.js + Express 5 backend with MongoDB and JWT authentication. Nodemailer for the contact form. Docker for backend containerization.',
  },
  {
    slug: 'smart-collar',
    name: 'Smart Collar',
    type: 'fullstack',
    status: 'concept',
    live: null,
    tech: ['React Native', 'Expo', 'Node.js', 'MQTT', 'MongoDB', 'WebSocket', 'ESP32'],
    desc_pt: 'Startup do IFPR — coleira inteligente para cães com monitoramento de BPM, GPS, passos, calorias e respiração em tempo real via app.',
    desc_en: 'IFPR startup — smart collar for dogs monitoring BPM, GPS, steps, calories, and breathing in real time via mobile app.',
    about_pt: 'Ideia de startup desenvolvida no IFPR (Telêmaco Borba, PR). O conceito é uma coleira inteligente para cães — como um smartwatch, só que para pets. A coleira capturaria dados contínuos: batimentos cardíacos, passos, calorias gastas, localização GPS, temperatura corporal e frequência respiratória. Todas as métricas seriam acompanhadas em tempo real pelo dono através de um aplicativo mobile.',
    about_en: 'Startup idea developed at IFPR (Telêmaco Borba, Brazil). The concept is a smart collar for dogs — like a smartwatch, but for pets. The collar would capture continuous data: heart rate, steps, calories burned, GPS location, body temperature, and breathing rate. All metrics would be monitored in real time by the owner through a mobile app.',
    how_pt: 'Hardware planejado com ESP32 (WiFi/BLE integrado), sensor de BPM MAX30102, acelerômetro MPU-6050, GPS NEO-6M e sensor de temperatura. Os dados seriam transmitidos via MQTT para um broker na nuvem. Backend em Node.js consumindo o broker e distribuindo via WebSocket para o app. App em React Native + Expo (iOS e Android). MongoDB para armazenar séries temporais dos sensores.',
    how_en: 'Hardware planned with ESP32 (built-in WiFi/BLE), MAX30102 BPM sensor, MPU-6050 accelerometer, NEO-6M GPS, and temperature sensor. Data transmitted via MQTT to a cloud broker. Node.js backend consuming the broker and distributing via WebSocket to the app. React Native + Expo app (iOS and Android). MongoDB for sensor time-series storage.',
  },
  {
    slug: 'smart-finance',
    name: 'Smart Finance',
    type: 'fullstack',
    status: 'ongoing',
    live: null,
    github: 'https://github.com/JoaoMendss/smart-finance',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Google Gemini', 'JWT'],
    desc_pt: 'TCC — sistema de gestão financeira pessoal com o Fin, assistente de IA que analisa receitas, despesas e metas e conversa com você por chat.',
    desc_en: 'Final project — personal finance management system with Fin, an AI assistant that analyzes income, expenses, and goals and chats with you.',
    about_pt: 'Projeto de TCC em desenvolvimento. O Smart Finance é um sistema completo de gestão financeira pessoal com dashboard, transações, orçamentos por categoria, metas de economia e transações recorrentes. O diferencial é o Fin — um assistente de IA integrado ao Google Gemini que analisa seus dados reais, responde perguntas, faz simulações ("se eu economizar R$ 300/mês...") e gera relatórios mensais automáticos. Tem importação de extrato CSV (Nubank, Inter etc.) com categorização automática e conformidade com LGPD.',
    about_en: 'TCC final project in development. Smart Finance is a complete personal finance management system with dashboard, transactions, category budgets, savings goals, and recurring transactions. The highlight is Fin — a Google Gemini-powered AI assistant that analyzes your real data, answers questions, runs simulations, and generates automatic monthly reports. Supports CSV statement import (Nubank, Inter, etc.) with automatic categorization and LGPD compliance.',
    how_pt: 'Frontend em React 18 + Vite com CSS puro e gráficos SVG nativos. Backend Node.js + Express com MongoDB e autenticação JWT + Google OAuth. IA integrada ao Google Gemini (gemini-2.5-flash, camada gratuita) — o sistema funciona normalmente sem a chave, usando insights baseados em regras. Sistema de recorrência automática de transações fixas rodando no servidor.',
    how_en: 'Frontend in React 18 + Vite with pure CSS and native SVG charts. Node.js + Express backend with MongoDB and JWT + Google OAuth authentication. AI integrated with Google Gemini (gemini-2.5-flash, free tier) — the system works without the key using rule-based insights. Automatic recurrence system for fixed transactions running server-side.',
  },
  {
    slug: 'devburger',
    name: 'DevBurger',
    type: 'fullstack',
    status: 'completed',
    live: null,
    tech: ['React 19', 'Vite', 'MUI', 'Stripe', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'JWT', 'Multer'],
    desc_pt: 'Plataforma completa de delivery de hambúrgueres — painel do cliente, painel admin, pagamento com Stripe e autenticação JWT. Feito 100% sem IA.',
    desc_en: 'Complete burger delivery platform — customer panel, admin panel, Stripe payment, and JWT auth. Built 100% without AI.',
    about_pt: 'O DevBurger foi o projeto que me deu base para quase tudo que sei hoje. Desenvolvido do zero, sem nenhum apoio de IA, para treinar as habilidades de fullstack no mundo real. Tem dois painéis completos — o cliente navega o cardápio, monta o pedido e paga com cartão via Stripe; o admin gerencia produtos, categorias, pedidos e upload de imagens. Foi aqui que aprendi de verdade sobre segurança, arquitetura de API e estratégia de desenvolvimento.',
    about_en: 'DevBurger was the project that gave me the foundation for almost everything I know today. Built from scratch, without any AI assistance, to train real-world fullstack skills. It has two complete panels — customers browse the menu, build their order, and pay by card via Stripe; admins manage products, categories, orders, and image uploads. This is where I really learned about security, API architecture, and development strategy.',
    how_pt: 'Frontend em React 19 + Vite com Material UI v7 e Styled Components. Formulários com React Hook Form + Yup. Pagamentos com Stripe. Backend em Node.js + Express 5 com dois bancos: PostgreSQL via Sequelize (usuários, produtos, categorias) e MongoDB via Mongoose (pedidos). Upload de imagens com Multer. Autenticação com JWT + bcrypt. Dois repos separados — interface e API.',
    how_en: 'Frontend in React 19 + Vite with Material UI v7 and Styled Components. Forms with React Hook Form + Yup. Payments with Stripe. Node.js + Express 5 backend with two databases: PostgreSQL via Sequelize (users, products, categories) and MongoDB via Mongoose (orders). Image uploads with Multer. Authentication with JWT + bcrypt. Two separate repos — interface and API.',
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    type: 'frontend',
    status: 'completed',
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
    slug: 'ui-lab',
    name: 'UI Lab',
    type: 'frontend',
    status: 'ongoing',
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
  const liveLabel = isEn ? 'open project' : 'ver ao vivo';

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

                <p className="text-zinc-600 text-xs">
                  <span className="text-blue-500">$</span> cat {project.slug}-full.md
                </p>

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

                <div className="space-y-2">
                  <p className="text-blue-400 text-xs">## {isEn ? 'About' : 'Sobre'}</p>
                  <p className="text-zinc-400 leading-relaxed text-xs border-l-2 border-zinc-800 pl-3">{about}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-blue-400 text-xs">## {isEn ? 'How it was built' : 'Como foi feito'}</p>
                  <p className="text-zinc-400 leading-relaxed text-xs border-l-2 border-zinc-800 pl-3">{how}</p>
                </div>

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

                {(project.live || project.github) && (
                  <>
                    <div className="border-t border-zinc-800/60" />
                    <div className="flex items-center gap-4 text-xs flex-wrap">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                          [↗ {liveLabel}]
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-200 transition-colors">
                          [↗ github]
                        </a>
                      )}
                      {!project.live && project.github && (
                        <span className="text-yellow-400/70 flex items-center gap-1.5">
                          <span className="animate-pulse">●</span>{isEn ? 'prod: pending' : 'prod: pendente'}
                        </span>
                      )}
                    </div>
                  </>
                )}
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

function LiveLink({ href, isEn }) {
  if (!href) return null;
  return (
    <div className="pt-2 mt-auto border-t border-zinc-800/60">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        [↗ {isEn ? 'open project' : 'ver ao vivo'}]
      </a>
    </div>
  );
}

/* ─── Card variants ──────────────────────────────────────── */
function PodiumArenaCard({ project, onClick, isEn, delay }) {
  const courts = isEn
    ? [['[1]', 'Beach Tennis', true], ['[2]', 'Volleyball', true], ['[3]', 'Footvolley', false]]
    : [['[1]', 'Beach Tennis', true], ['[2]', 'Vôlei', true], ['[3]', 'Futevolei', false]];

  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }} className="lg:col-span-2">
      <Terminal path="~/projects/podium-arena" onClick={onClick} className="h-full">
        <Prompt cmd="curl /api/courts/status" />
        <div className="space-y-1 mt-1">
          <p className="text-zinc-600 text-[11px] mb-2">{isEn ? '> courts status' : '> status das quadras'}</p>
          {courts.map(([num, name, available]) => (
            <p key={name} className="flex items-center gap-2">
              <span className="text-zinc-600">{num}</span>
              <span className="text-zinc-400 w-24">{name}</span>
              <span className={available ? 'text-emerald-400' : 'text-red-400'}>
                {available ? '✓ disponível' : '✗ reservado'}
              </span>
            </p>
          ))}
          <p className="text-zinc-600 mt-2">
            {isEn ? '> payments: ' : '> pagamentos: '}
            <span className="text-zinc-400">Pix · {isEn ? 'Credit Card' : 'Cartão'} · Arena Credits</span>
          </p>
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">fullstack</span> · <span className="text-blue-400">ongoing</span></p>
        <p><span className="text-blue-400">tech</span><span className="text-zinc-700">: </span><span className="text-emerald-400">React · Node.js · MongoDB · MercadoPago</span></p>
        <LiveLink href={project.live} isEn={isEn} />
      </Terminal>
    </motion.div>
  );
}

function SWSCard({ project, onClick, isEn, delay }) {
  const services = isEn ? [
    ['[web]',    'Web Development',   'landing pages · web apps · e-commerce'],
    ['[mobile]', 'Mobile Apps',       'iOS · Android · React Native'],
    ['[sys]',    'Custom Systems',    'APIs · dashboards · automation'],
    ['[design]', 'UI/UX & Branding',  'interfaces · identity · prototyping'],
  ] : [
    ['[web]',    'Desenvolvimento Web',    'landing pages · web apps · e-commerce'],
    ['[mobile]', 'Aplicativos Mobile',    'iOS · Android · React Native'],
    ['[sys]',    'Sistemas Customizados', 'APIs · dashboards · automação'],
    ['[design]', 'UI/UX & Branding',      'interfaces · identidade · prototipagem'],
  ];

  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }} className="md:col-span-2 lg:col-span-3">
      <Terminal path="~/projects/sws-company" onClick={onClick} className="h-full">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">

          {/* Esquerda — curl info */}
          <div className="space-y-2.5">
            <Prompt cmd="curl swscompany.com.br/api/info" />
            <div className="space-y-1.5">
              <p className="text-zinc-600 text-[11px]">&gt; 200 OK</p>
              {[
                [isEn ? 'name'  : 'nome',  'Storm Web & Systems'],
                [isEn ? 'role'  : 'cargo', isEn ? 'co-founder' : 'co-fundador'],
                [isEn ? 'type'  : 'tipo',  isEn ? 'software company' : 'empresa de software'],
                ['stack',                   'React 19 · GSAP · Express 5'],
                ['status',                  '● active'],
              ].map(([k, v]) => (
                <p key={k} className="flex gap-2 text-[11px]">
                  <span className="text-blue-400 w-16 flex-shrink-0">"{k}":</span>
                  <span className={k === 'status' ? 'text-emerald-400' : 'text-zinc-300'}>"{v}"</span>
                </p>
              ))}
            </div>
            <LiveLink href={project.live} isEn={isEn} />
          </div>

          {/* Direita — serviços */}
          <div className="space-y-2.5">
            <Prompt cmd="cat services.md" />
            <div className="space-y-2.5">
              {services.map(([tag, title, desc]) => (
                <div key={tag} className="space-y-0.5">
                  <p className="text-[11px]">
                    <span className="text-yellow-400/80">{tag}</span>
                    <span className="text-zinc-200 ml-2 font-medium">{title}</span>
                  </p>
                  <p className="text-zinc-600 text-[10px] pl-7">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Terminal>
    </motion.div>
  );
}

function SmartCollarCard({ project, onClick, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/smart-collar" onClick={onClick} className="h-full">
        <Prompt cmd="mqtt subscribe collar/dog-001/sensors" />
        <div className="space-y-1.5 mt-1">
          <p className="text-zinc-600 text-[11px]">&gt; device: <span className="text-emerald-400">smartcollar-001</span> <span className="animate-pulse">●</span></p>
          {[
            ['❤', 'bpm',   '92 bpm'],
            ['🐾', 'steps', '1.423'],
            ['📍', 'gps',   '-24.32, -50.82'],
            ['🌡', 'temp',  '38.4 °C'],
            ['💨', 'resp',  '22 rpm'],
          ].map(([emoji, key, val]) => (
            <p key={key} className="flex gap-2">
              <span>{emoji}</span>
              <span className="text-blue-400 w-10">{key}</span>
              <span className="text-zinc-300">{val}</span>
            </p>
          ))}
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">fullstack</span> · <span className="text-yellow-400">concept</span></p>
        <LiveLink href={project.live} />
      </Terminal>
    </motion.div>
  );
}

function SmartFinanceCard({ project, onClick, isEn, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/smart-finance" onClick={onClick} className="h-full">
        <Prompt cmd="node fin.js --insight" />
        <div className="space-y-1 mt-1">
          <p className="text-zinc-600 text-[11px]">{isEn ? '> loading financial data' : '> carregando dados'}
            <span className="animate-pulse">...</span>
          </p>
          {[
            [isEn ? 'balance'  : 'saldo',    'R$ 4.850'],
            [isEn ? 'income'   : 'receitas', 'R$ 3.200/mês'],
            [isEn ? 'expenses' : 'despesas', 'R$ 1.847/mês'],
            [isEn ? 'saved'    : 'guardado', 'R$ 1.353 (42%) ✓'],
          ].map(([k, v]) => (
            <p key={k} className="flex gap-2 text-[11px]">
              <span className="text-blue-400 w-16 flex-shrink-0">{k}:</span>
              <span className="text-zinc-300">{v}</span>
            </p>
          ))}
          <p className="text-emerald-400 text-[11px] mt-1 border-l-2 border-zinc-800 pl-2 leading-relaxed">
            Fin: {isEn ? 'you saved 42% of income this month!' : 'você economizou 42% da renda este mês!'}
          </p>
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">fullstack</span> · <span className="text-blue-400">ongoing</span> · <span className="text-yellow-400/80">TCC</span></p>
        <div className="pt-2 mt-auto border-t border-zinc-800/60 flex items-center justify-between">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            [↗ github]
          </a>
          <span className="text-yellow-400/60 text-[10px] flex items-center gap-1">
            <span className="animate-pulse">●</span>{isEn ? 'prod: pending' : 'prod: pendente'}
          </span>
        </div>
      </Terminal>
    </motion.div>
  );
}

function DevBurgerCard({ project, onClick, isEn, delay }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -3, transition: { duration: 0.18 } }}>
      <Terminal path="~/projects/devburger" onClick={onClick} className="h-full">
        <Prompt cmd="curl /api/orders/new" />
        <div className="space-y-1 mt-1">
          {[
            ['X-Burger',     '2x', 'R$ 34,90'],
            ['Batata Frita', '1x', 'R$ 14,90'],
            ['Coca-Cola',    '2x', 'R$  9,90'],
          ].map(([item, qty, price]) => (
            <p key={item} className="flex gap-2 text-[11px]">
              <span className="text-zinc-400 flex-1">{item}</span>
              <span className="text-zinc-600">{qty}</span>
              <span className="text-emerald-400">{price}</span>
            </p>
          ))}
          <p className="text-zinc-600 text-[11px] pt-1 border-t border-zinc-800/60">
            total: <span className="text-zinc-300">R$ 69,60</span>
            {'  '}payment: <span className="text-blue-400">Stripe ✓</span>
          </p>
        </div>
        <p className="text-zinc-600">&gt; <span className="text-zinc-500">fullstack</span> · <span className="text-emerald-400">completed</span></p>
        <div className="pt-2 mt-auto border-t border-zinc-800/60 flex items-center justify-between">
          <LiveLink href={project.live} isEn={isEn} />
          <span className="text-zinc-700 text-[10px]">{isEn ? 'no AI used' : 'sem IA'}</span>
        </div>
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
        <LiveLink href={project.live} />
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
            <LiveLink href={project.live} isEn={isEn} />
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
          <SWSCard         project={p('sws-company')}         onClick={() => setSelected(p('sws-company'))}         isEn={isEn}  delay={0}    />
          <PodiumArenaCard project={p('podium-arena')}        onClick={() => setSelected(p('podium-arena'))}        isEn={isEn}  delay={0.06} />
          <SmartCollarCard project={p('smart-collar')}        onClick={() => setSelected(p('smart-collar'))}                     delay={0.10} />
          <SmartFinanceCard project={p('smart-finance')}       onClick={() => setSelected(p('smart-finance'))}      isEn={isEn}  delay={0.14} />
          <DevBurgerCard   project={p('devburger')}           onClick={() => setSelected(p('devburger'))}           isEn={isEn}  delay={0.18} />
          <CurrencyCard    project={p('currency-converter')}  onClick={() => setSelected(p('currency-converter'))}               delay={0.22} />
<UILabCard       project={p('ui-lab')}              onClick={() => setSelected(p('ui-lab'))}              isEn={isEn}  delay={0.30} />
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} isEn={isEn} />
    </section>
  );
}

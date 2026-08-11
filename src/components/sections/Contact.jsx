import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FORMSPREE_ID = 'xkokpkwr';

const SERVICES = [
  { key: '1', cmd: 'send-email',    value: 'joaoluiizmendes@gmail.com',    href: null,  email: true },
  { key: '2', cmd: 'open-linkedin', value: 'linkedin.com/in/joaolcmendes', href: 'https://www.linkedin.com/in/joaolcmendes/' },
  { key: '3', cmd: 'view-github',   value: 'github.com/JoaoMendss',        href: 'https://github.com/JoaoMendss' },
  { key: '4', cmd: 'get-location',  value: 'Telêmaco Borba, PR — Brasil',  href: null },
];

const SSH_CMD = 'ssh joao@portfolio.dev';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

/* ─── SSH Terminal ───────────────────────────────────────── */
function SSHTerminal({ isEn }) {
  const [phase,       setPhase]       = useState(0);
  const [cmdText,     setCmdText]     = useState('');
  const [barFull,     setBarFull]     = useState(false);
  const [executed,    setExecuted]    = useState(null);

  /* email form state */
  const [emailPhase,  setEmailPhase]  = useState(null); // null|'name'|'contact'|'message'|'sending'|'done'|'error'
  const [formData,    setFormData]    = useState({ name: '', contact: '', message: '' });
  const [fieldDraft,  setFieldDraft]  = useState('');
  const inputRef = useRef(null);

  const termRef  = useRef(null);
  const isInView = useInView(termRef, { once: true, margin: '-80px' });

  /* sequence */
  useEffect(() => {
    if (!isInView) return;
    const timers = [];
    const delay  = (fn, ms) => timers.push(setTimeout(fn, ms));

    setPhase(1);
    delay(() => { setPhase(2); setTimeout(() => setBarFull(true), 60); }, 1500);
    delay(() => setPhase(3), 3000);
    delay(() => setPhase(4), 3600);
    delay(() => setPhase(5), 4200);

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  /* typewriter */
  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCmdText(SSH_CMD.slice(0, i));
      if (i >= SSH_CMD.length) clearInterval(t);
    }, 52);
    return () => clearInterval(t);
  }, [phase]);

  /* keyboard nav — desativado durante email mode */
  useEffect(() => {
    if (phase < 5 || emailPhase) return;
    const onKey = (e) => {
      const s = SERVICES.find((x) => x.key === e.key);
      if (s) handleSelect(s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, emailPhase]);

  /* foca o input quando muda de fase do email */
  useEffect(() => {
    if (emailPhase && !['sending', 'done', 'error'].includes(emailPhase)) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [emailPhase]);

  /* ── handlers ── */
  const handleSelect = (service) => {
    setExecuted(service);
    if (service.email) {
      setEmailPhase('name');
      return;
    }
    if (service.href) {
      setTimeout(() => window.open(service.href, '_blank', 'noopener,noreferrer'), 600);
    }
  };

  const submitEmail = async (data) => {
    setEmailPhase('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          _replyto: data.contact,
          message: data.message,
        }),
      });
      setEmailPhase(res.ok ? 'done' : 'error');
    } catch {
      setEmailPhase('error');
    }
  };

  const handleFieldKey = (e) => {
    /* Ctrl+C ou Escape = cancelar */
    if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
      setEmailPhase(null);
      setFormData({ name: '', contact: '', message: '' });
      setFieldDraft('');
      setExecuted(null);
      return;
    }

    if (e.key !== 'Enter') return;
    const val = fieldDraft.trim();
    if (!val) return;

    if (emailPhase === 'name') {
      setFormData(d => ({ ...d, name: val }));
      setFieldDraft('');
      setEmailPhase('contact');
    } else if (emailPhase === 'contact') {
      setFormData(d => ({ ...d, contact: val }));
      setFieldDraft('');
      setEmailPhase('message');
    } else if (emailPhase === 'message') {
      const final = { ...formData, message: val };
      setFormData(final);
      setFieldDraft('');
      submitEmail(final);
    }
  };

  /* ── labels ── */
  const L = isEn ? {
    connecting: 'Connecting to portfolio.dev',
    done: 'done', auth: 'Authenticating...', authed: '✓ authenticated',
    welcome: "Welcome to João's portfolio server.",
    lastlogin: 'Last login: Mon Aug 11 2026',
    services: 'Available services',
    hint: 'Click or press [1–4] to connect.',
    opening: 'opening',
    fields: { name: 'name', contact: 'email/tel', message: 'message' },
    cancel: 'esc or ^C to cancel',
    sending: 'Sending',
    mailDone: "Message sent! I'll get back to you soon.",
    mailErr: 'Error sending. Please try again.',
    enter: 'press enter to confirm',
  } : {
    connecting: 'Connecting to portfolio.dev',
    done: 'done', auth: 'Authenticating...', authed: '✓ authenticated',
    welcome: 'Bem-vindo ao servidor do João.',
    lastlogin: 'Último acesso: Seg 11 Ago 2026',
    services: 'Serviços disponíveis',
    hint: 'Clique ou pressione [1–4] para conectar.',
    opening: 'abrindo',
    fields: { name: 'nome', contact: 'email/tel', message: 'mensagem' },
    cancel: 'esc ou ^C para cancelar',
    sending: 'Enviando',
    mailDone: 'Mensagem enviada! Entrarei em contato em breve.',
    mailErr: 'Erro ao enviar. Tente novamente.',
    enter: 'pressione enter para confirmar',
  };

  const currentFieldLabel = emailPhase === 'name'    ? L.fields.name
                          : emailPhase === 'contact'  ? L.fields.contact
                          : emailPhase === 'message'  ? L.fields.message
                          : null;

  return (
    <div ref={termRef} className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl w-full">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-[#161616]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-zinc-500">joao@portfolio.dev — ssh</span>
      </div>

      {/* Content */}
      <div className="p-6 font-mono text-sm space-y-2.5 min-h-[380px]">

        {phase >= 1 && (
          <p className="text-zinc-400">
            <span className="text-blue-500">$</span> {cmdText}
            {phase === 1 && <span className="inline-block w-[2px] h-[0.82em] bg-blue-500 ml-[3px] align-middle animate-pulse" />}
          </p>
        )}

        {phase >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
            <p className="text-zinc-600 text-xs">{L.connecting}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full bg-blue-500 rounded-full transition-all duration-[1300ms] ease-out ${barFull ? 'w-full' : 'w-0'}`} />
              </div>
              <span className={`text-xs transition-colors duration-300 ${barFull ? 'text-emerald-400' : 'text-zinc-700'}`}>
                {barFull ? L.done : '...'}
              </span>
            </div>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-zinc-600">
            {L.auth} <span className="text-emerald-400">{L.authed}</span>
          </motion.p>
        )}

        {phase >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-1 space-y-0.5">
            <p className="text-zinc-200">{L.welcome}</p>
            <p className="text-zinc-600 text-xs">{L.lastlogin}</p>
          </motion.div>
        )}

        {/* ── Menu ou Email mode ── */}
        {phase >= 5 && !emailPhase && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="pt-1 space-y-4">
            <div className="border-t border-zinc-800/80 pt-4 space-y-0.5">
              <p className="text-zinc-600 text-xs mb-3">{L.services}:</p>
              {SERVICES.map((service, i) => (
                <motion.button
                  key={service.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleSelect(service)}
                  className="w-full flex items-start sm:items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-zinc-800/50 group transition-colors text-left"
                >
                  <span className="text-blue-500 flex-shrink-0">[{service.key}]</span>
                  <span className="text-zinc-400 flex-shrink-0 group-hover:text-zinc-100 transition-colors">{service.cmd}</span>
                  <span className="text-zinc-600 text-xs truncate group-hover:text-zinc-400 transition-colors sm:ml-auto">{service.value}</span>
                </motion.button>
              ))}
            </div>
            <p className="text-zinc-700 text-xs">{L.hint}</p>
            <p className="text-zinc-500">
              <span className="text-emerald-500">joao@portfolio</span>
              <span className="text-zinc-700">:~$</span>
              <span className="inline-block w-[2px] h-[0.82em] bg-zinc-500 ml-1.5 align-middle animate-pulse" />
            </p>
          </motion.div>
        )}

        {/* ── Email interaction ── */}
        {phase >= 5 && emailPhase && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-1 space-y-2 border-t border-zinc-800/80">

            {/* comando executado */}
            <p className="pt-3">
              <span className="text-emerald-500">joao@portfolio</span>
              <span className="text-zinc-700">:~$</span>
              {' '}<span className="text-zinc-400">connect send-email</span>
            </p>

            {/* campos já preenchidos */}
            {formData.name && (
              <p className="text-xs">
                <span className="text-blue-400">{L.fields.name}:</span>
                <span className="text-zinc-300 ml-2">{formData.name}</span>
              </p>
            )}
            {formData.contact && (
              <p className="text-xs">
                <span className="text-blue-400">{L.fields.contact}:</span>
                <span className="text-zinc-300 ml-2">{formData.contact}</span>
              </p>
            )}
            {formData.message && (
              <p className="text-xs">
                <span className="text-blue-400">{L.fields.message}:</span>
                <span className="text-zinc-300 ml-2">{formData.message}</span>
              </p>
            )}

            {/* campo atual sendo digitado */}
            {currentFieldLabel && (
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-xs flex-shrink-0">{currentFieldLabel}:</span>
                <input
                  ref={inputRef}
                  value={fieldDraft}
                  onChange={(e) => setFieldDraft(e.target.value)}
                  onKeyDown={handleFieldKey}
                  spellCheck={false}
                  autoComplete="off"
                  className="bg-transparent text-zinc-200 text-xs font-mono outline-none flex-1 min-w-0 caret-blue-500"
                />
              </div>
            )}

            {/* dicas */}
            {currentFieldLabel && (
              <p className="text-zinc-700 text-[11px]">
                {L.enter} &nbsp;·&nbsp; {L.cancel}
              </p>
            )}

            {/* estados de envio */}
            {emailPhase === 'sending' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-500 text-xs">
                {L.sending}<span className="animate-pulse">...</span>
              </motion.p>
            )}
            {emailPhase === 'done' && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
                <p className="text-emerald-400 text-xs">✓ {L.mailDone}</p>
                <p className="text-zinc-500">
                  <span className="text-emerald-500">joao@portfolio</span>
                  <span className="text-zinc-700">:~$</span>
                  <span className="inline-block w-[2px] h-[0.82em] bg-zinc-500 ml-1.5 align-middle animate-pulse" />
                </p>
              </motion.div>
            )}
            {emailPhase === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                <p className="text-red-400 text-xs">✗ {L.mailErr}</p>
                <button
                  onClick={() => { setEmailPhase('name'); setFormData({ name: '', contact: '', message: '' }); }}
                  className="text-zinc-600 text-xs hover:text-zinc-300 transition-colors"
                >
                  [retry]
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* feedback para opções não-email */}
        {phase >= 5 && !emailPhase && executed && !executed.email && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0.5 border-t border-zinc-800/60 pt-3"
            >
              <p className="text-zinc-400">
                <span className="text-emerald-500">joao@portfolio</span>
                <span className="text-zinc-700">:~$</span>
                {' '}connect {executed.cmd}
              </p>
              {executed.href ? (
                <p className="text-zinc-600 text-xs">
                  {L.opening} <span className="text-blue-400">{executed.value}</span>
                  <span className="animate-pulse">...</span>
                </p>
              ) : (
                <p className="text-zinc-400 text-xs">{executed.value}</p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function Contact() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="contact" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p {...fadeUp(0)} className="font-mono text-blue-500 text-xs mb-3 tracking-widest uppercase">
          {t('contact.tag')}
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          {t('contact.title')}
        </motion.h2>
        <motion.p {...fadeUp(0.14)} className="text-zinc-500 dark:text-zinc-400 text-lg mb-16 max-w-lg">
          {t('contact.desc')}
        </motion.p>

        <motion.div {...fadeUp(0.2)}>
          <SSHTerminal isEn={isEn} />
        </motion.div>

        <motion.p
          {...fadeUp(0.3)}
          className="font-mono text-xs text-zinc-500 dark:text-zinc-600 mt-8"
        >
          {isEn ? 'avg. response time: < 24h' : 'tempo médio de resposta: < 24h'}
        </motion.p>
      </div>
    </section>
  );
}

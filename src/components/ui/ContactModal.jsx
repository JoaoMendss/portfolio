import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Mail, Linkedin, MessageSquare } from 'lucide-react';

export default function ContactModal({ open, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const options = [
    {
      icon: Mail,
      label: t('modal.email_label'),
      value: 'joaoluiizmendes@gmail.com',
      href: 'mailto:joaoluiizmendes@gmail.com',
    },
    {
      icon: Linkedin,
      label: t('modal.linkedin_label'),
      value: 'linkedin.com/in/joaomendss',
      href: 'https://www.linkedin.com/in/joaomendss/',
      external: true,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-start justify-between p-7 pb-5">
                <div>
                  <p className="font-mono text-blue-500 text-xs tracking-widest uppercase mb-1.5">
                    {t('contact.tag')}
                  </p>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {t('modal.title')}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {t('modal.subtitle')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1 -mt-1 -mr-1"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Options */}
              <div className="px-7 pb-5 space-y-2.5">
                {options.map(({ icon: Icon, label, value, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : '_self'}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 group transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <Icon size={16} className="text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
                      <p className="font-mono text-xs text-zinc-400 truncate">{value}</p>
                    </div>
                    <span className="ml-auto text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
                      →
                    </span>
                  </a>
                ))}

                {/* Form option */}
                <button
                  onClick={scrollToContact}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 group transition-all duration-200 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <MessageSquare size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t('modal.form_label')}</p>
                    <p className="text-xs text-zinc-400">{t('modal.form_desc')}</p>
                  </div>
                  <span className="ml-auto text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
                    →
                  </span>
                </button>
              </div>

              {/* Footer */}
              <div className="px-7 py-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="font-mono text-xs text-zinc-400 text-center">{t('modal.response')}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

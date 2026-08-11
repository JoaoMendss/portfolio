import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2 } from 'lucide-react';

const FORMSPREE_ID = 'xkokpkwr';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const INPUT_CLS =
  'w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors text-sm';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socials = [
    { icon: Mail, label: 'joaoluiizmendes@gmail.com', href: 'mailto:joaoluiizmendes@gmail.com' },
    { icon: Github, label: 'github.com/JoaoMendss', href: 'https://github.com/JoaoMendss' },
    { icon: Linkedin, label: 'linkedin.com/in/joaolcmendes', href: 'https://www.linkedin.com/in/joaolcmendes/' },
    { icon: MapPin, label: 'Telêmaco Borba, PR — Brasil', href: null },
  ];

  return (
    <section id="contact" className="py-28 bg-zinc-50 dark:bg-zinc-900/40">
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

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Social links */}
          <motion.div {...fadeUp(0.2)}>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-5">
              {t('contact.social')}
            </p>
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, href }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all group"
                  >
                    <Icon size={15} className="text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{label}</span>
                  </a>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500"
                  >
                    <Icon size={15} className="text-zinc-400" />
                    <span className="text-sm">{label}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp(0.3)}>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <CheckCircle2 size={22} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {t('contact.form.success_title')}
                </h3>
                <p className="text-sm text-zinc-500">{t('contact.form.success_desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="João Silva"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="joao@email.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t('contact.form.placeholder_message')}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${INPUT_CLS} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-red-500">{t('contact.form.error')}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={14} />
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

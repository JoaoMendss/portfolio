import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowUpRight } from 'react-icons/fi';

const NAV_LINKS = [
  { href: '#about',    key: 'nav.about' },
  { href: '#services', key: 'nav.services' },
  { href: '#stack',    key: 'nav.stack' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#contact',  key: 'nav.contact' },
];

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/JoaoMendss',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joaolcmendes/',
    icon: FiLinkedin,
  },
  {
    label: 'joaoluiizmendes@gmail.com',
    href: 'mailto:joaoluiizmendes@gmail.com',
    icon: FiMail,
  },
];

const scrollTo = (href) =>
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Brand column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div>
            <p className="font-mono text-xs text-blue-500 tracking-widest uppercase mb-1">~/joao-mendes</p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              João Mendes
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Full Stack Developer
            </p>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
            {t('footer.tagline')}
          </p>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-emerald-500">{t('footer.available')}</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav column */}
        <div className="md:col-span-3">
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 tracking-widest uppercase mb-5">
            {t('footer.nav_title')}
          </p>
          <ul className="space-y-3">
            {NAV_LINKS.map(({ href, key }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-150"
                >
                  {t(key)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="md:col-span-4">
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 tracking-widest uppercase mb-5">
            {t('footer.contact_title')}
          </p>
          <ul className="space-y-4">
            <li>
              <a
                href="mailto:joaoluiizmendes@gmail.com"
                className="group flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                <FiMail size={14} className="mt-0.5 flex-shrink-0" />
                <span>joaoluiizmendes@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/joaolcmendes/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                <FiLinkedin size={14} className="flex-shrink-0" />
                <span>linkedin.com/in/joaolcmendes</span>
                <FiArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/JoaoMendss"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                <FiGithub size={14} className="flex-shrink-0" />
                <span>github.com/JoaoMendss</span>
                <FiArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-zinc-400 dark:text-zinc-600">
              <FiMapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>{t('footer.location')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © 2026 João Mendes — {t('footer.rights')}
          </p>
          <p className="font-mono text-xs text-zinc-300 dark:text-zinc-700">
            React · Vite · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

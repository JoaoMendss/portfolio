import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function LangToggle() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const setLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <div className="relative flex items-center font-mono text-xs h-7 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 p-0.5">
      {/* Sliding pill */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-blue-500"
        style={{ width: 'calc(50% - 2px)' }}
        animate={{ left: isEn ? 'calc(50% + 2px)' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />

      <button
        onClick={() => setLang('pt')}
        className={`relative z-10 px-3 py-0.5 rounded-full transition-colors duration-200 ${
          !isEn ? 'text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLang('en')}
        className={`relative z-10 px-3 py-0.5 rounded-full transition-colors duration-200 ${
          isEn ? 'text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`}
      >
        EN
      </button>
    </div>
  );
}

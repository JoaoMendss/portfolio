import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <span className="text-zinc-500">
          © 2026 João Mendes — {t('footer.rights')}
        </span>
        <span className="font-mono text-xs text-zinc-400">{t('footer.made')}</span>
      </div>
    </footer>
  );
}

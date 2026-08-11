import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex items-center w-[52px] h-7 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300 p-1 cursor-pointer"
    >
      {/* Track icons */}
      <Sun size={10} className="absolute left-[7px] text-amber-400 opacity-40" />
      <Moon size={10} className="absolute right-[7px] text-blue-400 opacity-40" />

      {/* Sliding knob */}
      <motion.div
        className="relative z-10 w-5 h-5 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              <Moon size={10} className="text-blue-400" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              <Sun size={10} className="text-amber-400" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

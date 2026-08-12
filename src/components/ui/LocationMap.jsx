import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function LocationMap({ location = 'Telêmaco Borba, PR', coordinates = '24.3600° S, 50.6144° W', className = '' }) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 w-full"
        animate={{ height: isExpanded ? 260 : 130 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/30 via-transparent to-zinc-200/40 dark:from-zinc-800/20 dark:to-zinc-800/40" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900" />

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.line x1="0%" y1="35%" x2="100%" y2="35%" stroke="rgba(120,120,120,0.3)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.line x1="0%" y1="65%" x2="100%" y2="65%" stroke="rgba(120,120,120,0.3)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                <motion.line x1="30%" y1="0%" x2="30%" y2="100%" stroke="rgba(120,120,120,0.22)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.line x1="70%" y1="0%" x2="70%" y2="100%" stroke="rgba(120,120,120,0.22)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`h-${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(120,120,120,0.12)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }} />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line key={`v-${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke="rgba(120,120,120,0.12)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} />
                ))}
              </svg>

              <motion.div className="absolute top-[40%] left-[10%] w-[15%] h-[20%] rounded-sm bg-zinc-400/30 dark:bg-zinc-500/30 border border-zinc-400/20 dark:border-zinc-500/20" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
              <motion.div className="absolute top-[15%] left-[35%] w-[12%] h-[15%] rounded-sm bg-zinc-400/25 dark:bg-zinc-500/25 border border-zinc-400/15 dark:border-zinc-500/15" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
              <motion.div className="absolute top-[70%] left-[75%] w-[18%] h-[18%] rounded-sm bg-zinc-400/28 dark:bg-zinc-500/28 border border-zinc-400/18 dark:border-zinc-500/18" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.7 }} />
              <motion.div className="absolute top-[20%] right-[10%] w-[10%] h-[25%] rounded-sm bg-zinc-400/22 dark:bg-zinc-500/22 border border-zinc-400/15 dark:border-zinc-500/15" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.55 }} />
              <motion.div className="absolute top-[55%] left-[5%] w-[8%] h-[12%] rounded-sm bg-zinc-400/20 dark:bg-zinc-500/20 border border-zinc-400/12 dark:border-zinc-500/12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.65 }} />
              <motion.div className="absolute top-[8%] left-[75%] w-[14%] h-[10%] rounded-sm bg-zinc-400/22 dark:bg-zinc-500/22 border border-zinc-400/15 dark:border-zinc-500/15" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.75 }} />

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.5))' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3b82f6" />
                  <circle cx="12" cy="9" r="2.5" fill="white" />
                </svg>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          animate={{ opacity: isExpanded ? 0 : 0.04 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-map" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-map)" />
          </svg>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.div animate={{ opacity: isExpanded ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <motion.svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-blue-500"
                animate={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(59,130,246,0.6))' : 'drop-shadow(0 0 4px rgba(59,130,246,0.3))' }}
                transition={{ duration: 0.3 }}
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </motion.svg>
            </motion.div>

            <motion.div
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-900/5 dark:bg-zinc-100/5 backdrop-blur-sm"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">Live</span>
            </motion.div>
          </div>

          <div className="space-y-1">
            <motion.h3
              className="text-zinc-900 dark:text-zinc-100 font-medium text-sm tracking-tight"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="text-zinc-500 dark:text-zinc-400 text-xs font-mono"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="h-px bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="absolute -bottom-6 left-1/2 text-[10px] text-zinc-500 whitespace-nowrap pointer-events-none"
        style={{ x: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isExpanded ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        {t('about.map_hint')}
      </motion.p>
    </motion.div>
  )
}

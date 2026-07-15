import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';

/**
 * Preloader — A high-end minimal loading screen.
 * Displays during the initial splash or page transitions.
 */
export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState(() => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    return { width: 1280, height: 720 };
  });

  useEffect(() => {
    // Artificial delay for that "Senior UI" premium splash feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.0s to let the full G N I D A O L animation wave complete before exit

    if (typeof window !== 'undefined') {
      const updateViewport = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      };

      updateViewport();
      window.addEventListener('resize', updateViewport);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateViewport);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  const initialPath = `M0 0 L${viewport.width} 0 L${viewport.width} ${viewport.height} L0 ${viewport.height} Z`;
  const targetPath = `M0 0 L${viewport.width} 0 Q${viewport.width / 2} 0 0 0 Z`;

  const curveVars = {
    initial: {
      d: initialPath
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Minimal Content Layer */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.6 } }}
            className="fixed inset-0 z-10 flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <LoadingSpinner size="lg" />
              </motion.div>
            </div>
          </motion.div>

          {/* LIQUID WAVE LAYER */}
          <svg className="absolute inset-0 h-full w-full fill-[#050806]">
            <motion.path
              variants={curveVars}
              initial="initial"
              exit="exit"
            />
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}

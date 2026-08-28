import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('counting'); // counting -> logo -> exit

  useEffect(() => {
    setMounted(true);
    setViewport({ width: window.innerWidth, height: window.innerHeight });

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', updateViewport);

    // Fast progress counter logic (takes ~0.6s to reach 100)
    let startTime;
    const duration = 600;

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const currentProgress = Math.min(Math.floor((elapsedTime / duration) * 100), 100);
      
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        // Reached 100%, switch to logo reveal phase fast
        setTimeout(() => setPhase('logo'), 100);
        
        // After logo reveal, switch to exit phase quickly
        setTimeout(() => setPhase('exit'), 1000);

        // Finally unmount preloader
        setTimeout(() => setLoading(false), 1800);
      }
    };
    
    requestAnimationFrame(animateProgress);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  if (!mounted) return null;

  // The liquid SVG curve animation (made faster)
  const initialPath = `M0 0 L${viewport.width} 0 L${viewport.width} ${viewport.height} L0 ${viewport.height} Z`;
  const targetPath = `M0 0 L${viewport.width} 0 Q${viewport.width / 2} 0 0 0 Z`;

  const curveVars = {
    initial: { d: initialPath },
    exit: { 
      d: targetPath, 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          
          {/* Main Overlay Content */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.6 } }}
            className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-transparent"
          >
            <div className="relative flex flex-col items-center justify-center w-full max-w-sm px-6">
              
              <AnimatePresence mode="wait">
                {/* PHASE 1: Counting Phase */}
                {phase === 'counting' && (
                  <motion.div
                    key="counter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="text-[#34d99a] font-display font-bold text-6xl tracking-tighter mb-4">
                      {progress}%
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#34d99a]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* PHASE 2: Logo Reveal Phase */}
                {phase === 'logo' && (
                  <motion.div
                    key="logo"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                  >
                    <h1 className="text-white font-display font-bold text-5xl md:text-7xl tracking-widest uppercase">
                      NOWIC
                    </h1>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-[#34d99a] text-sm md:text-base font-medium tracking-[0.2em] uppercase mt-2"
                    >
                      Studio
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

          {/* LIQUID WAVE LAYER (Background) */}
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

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we've shown the splash screen before
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    if (hasShownSplash) {
      setIsVisible(false);
      return;
    }

    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasShownSplash', 'true');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
          <motion.div
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              initial={{opacity: 1}}
              exit={{
                opacity: 0,
                transition: {duration: 0.5, ease: 'easeInOut'}
              }}
          >
            <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                exit={{
                  scale: 1.2,
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
            >
              <div className="w-full mt-4 flex justify-center items-center">
                <img src="/images/log.svg" alt="Your SVG" width="60" height="60"/>



              <motion.h1
                  className="mt-6 text-3xl font-bold"
                  initial={{opacity: 0, y: 20}}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.3,
                      duration: 0.5
                    }
                  }}
              >
                VIRAL BUG
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>
        )}
</AnimatePresence>
)
;
}
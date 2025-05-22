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
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
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
            <div className="flex flex-col items-center">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="12" fill="#FFFFFF" />
                <path d="M18 42V18H42L18 42Z" fill="#000000" />
                <path d="M42 42V18L18 42H42Z" fill="#555555" />
              </svg>
              
              <motion.h1
                className="mt-6 text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    delay: 0.3, 
                    duration: 0.5 
                  } 
                }}
              >
                DIGITAL AGENCY
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#FAFAFB] dark:bg-[#0F172A] flex flex-col items-center justify-center z-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {/* Abstract Premium Logo representing overlapping parts of personality */}
        <div className="relative w-24 h-24 mb-6">
          <motion.div
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 0.85 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-[#fe4c6f] rounded-3xl mix-blend-multiply dark:mix-blend-normal dark:opacity-80"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)" }}
          />
          <motion.div
            initial={{ rotate: 45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 0.85 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-[#6B5BFF] rounded-3xl mix-blend-multiply dark:mix-blend-normal dark:opacity-80 translate-x-3 translate-y-3"
            style={{ clipPath: "polygon(0% 25%, 100% 0%, 100% 100%, 0% 100%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white font-sans font-bold text-2xl z-10 translate-x-1 translate-y-1">
            Jung
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC]"
        >
          MBTI <span className="text-[#fe4c6f]">Indonesia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-sm font-medium tracking-widest text-[#6B5BFF] uppercase mt-2"
        >
          Fondasi OpenJung Core
        </motion.p>
      </motion.div>

      {/* Floating subtle background particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#fe4c6f] rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#6B5BFF] rounded-full filter blur-[120px]" />
      </div>
    </div>
  );
}

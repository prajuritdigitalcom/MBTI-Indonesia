import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Membaca tanggapan Anda...",
    "Menghitung kecenderungan dimensi...",
    "Mencocokkan profil psikologi OpenJung...",
    "Menyusun laporan hasil kepribadian..."
  ];

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 550);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearInterval(statusTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, statuses.length]);

  return (
    <div className="fixed inset-0 bg-[#FAFAFB] dark:bg-[#0F172A] flex flex-col items-center justify-center z-50 px-6">
      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Modern Orbital Loading Animation */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-[#6B5BFF]/10 border-t-[#6B5BFF] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            className="absolute w-20 h-20 border-4 border-[#fe4c6f]/10 border-t-[#fe4c6f] rounded-full"
          />
          <motion.div
            animate={{ scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#6B5BFF]"
          >
            <Sparkles size={32} fill="currentColor" className="opacity-80" />
          </motion.div>
        </div>

        {/* Dynamic Analyzing Title */}
        <motion.h3
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-xl font-black text-gray-900 dark:text-white tracking-tight"
        >
          Menganalisis Kepribadian Anda...
        </motion.h3>

        {/* Changing Sub-status text */}
        <div className="h-6 mt-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-bold text-gray-500 dark:text-slate-400 tracking-wide uppercase"
            >
              {statuses[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Ambient subtle blur filters */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 pointer-events-none opacity-20">
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-linear-to-tr from-[#fe4c6f] to-[#6B5BFF] rounded-full filter blur-[100px]" />
        </div>
      </div>
    </div>
  );
}

// Ensure AnimatePresence is imported correctly
import { AnimatePresence } from 'motion/react';

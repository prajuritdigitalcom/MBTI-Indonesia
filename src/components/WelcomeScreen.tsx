import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, History, User, AlertCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  onViewHistory: () => void;
  hasHistory: boolean;
}

export default function WelcomeScreen({ onStart, onViewHistory, hasHistory }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onStart(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh] py-4 px-4 w-full max-w-md mx-auto">
      {/* Abstract Animated Illustration */}
      <div className="relative w-full h-52 flex items-center justify-center my-4 overflow-hidden rounded-2xl bg-linear-to-b from-white to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 p-4 border border-gray-100 dark:border-slate-800 shadow-xs">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-44 h-44 border-2 border-dashed border-[#6B5BFF]/20 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-28 h-28 bg-linear-to-tr from-[#fe4c6f]/10 to-[#6B5BFF]/10 rounded-full filter blur-xl"
        />
        
        {/* Floating cards representing personality types */}
        <motion.div
          initial={{ x: -145, y: -50, rotate: -10 }}
          animate={{ y: [-50, -42, -50] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 text-xs font-bold text-[#fe4c6f] flex items-center gap-1 z-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#fe4c6f]" /> INTJ
        </motion.div>

        <motion.div
          initial={{ x: 145, y: -50, rotate: 12 }}
          animate={{ y: [-50, -58, -50] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 text-xs font-bold text-[#6B5BFF] flex items-center gap-1 z-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#6B5BFF]" /> ENFP
        </motion.div>

        {/* Additional floating personality types to fill space */}
        <motion.div
          initial={{ x: -160, y: 0, rotate: -8 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 text-xs font-bold text-emerald-500 flex items-center gap-1 z-10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> INFJ
        </motion.div>

        <motion.div
          initial={{ x: 160, y: 0, rotate: 15 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 text-xs font-bold text-amber-500 flex items-center gap-1 z-10"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" /> INFP
        </motion.div>

        <motion.div
          initial={{ x: -145, y: 50, rotate: 5 }}
          animate={{ y: [50, 58, 50] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 text-xs font-bold text-indigo-500 flex items-center gap-1 z-10"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500" /> ENTJ
        </motion.div>

        <motion.div
          initial={{ x: 145, y: 50, rotate: -12 }}
          animate={{ y: [50, 42, 50] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 text-xs font-bold text-purple-500 flex items-center gap-1 z-10"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500" /> ESTP
        </motion.div>

        <motion.div
          initial={{ y: 0, rotate: 2 }}
          animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 text-center z-20"
        >
          <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Tipe Kepribadian Anda</p>
          <p className="text-xl font-black text-gray-800 dark:text-white tracking-widest mt-0.5">????</p>
        </motion.div>
      </div>

      {/* Hero Header */}
      <div className="text-center w-full my-3">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
          Kenali <span className="text-[#fe4c6f]">Kepribadianmu</span>
        </h2>
        <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 max-w-xs mx-auto">
          Temukan tipe kepribadianmu dan pahami kelebihan, gaya komunikasi, serta karier idealmu hanya dalam beberapa menit.
        </p>
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap justify-center gap-2 my-4 w-full">
        <span className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-full border border-rose-100/30">
          ✨ 100% Gratis
        </span>
        <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-100/30">
          🔒 Tanpa Login
        </span>
        <span className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-100/30">
          ⏱️ Hanya 5 Menit
        </span>
      </div>

      {/* Name Input Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-3 mt-2">
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 pl-1">
            Nama Panggilan Anda
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
              <User size={18} />
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setError(false);
              }}
              placeholder="Masukkan namamu disini..."
              className={`w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 border-2 ${
                error ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-slate-700'
              } rounded-2xl text-gray-900 dark:text-white font-semibold focus:outline-hidden focus:border-[#6B5BFF] transition-all text-base shadow-xs placeholder-gray-400`}
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500 dark:text-red-400 font-bold mt-1.5 flex items-center gap-1 pl-1"
            >
              <AlertCircle size={14} /> Nama wajib diisi untuk hasil kartu personal
            </motion.p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="submit"
            className="w-full bg-[#fe4c6f] hover:bg-[#e03d5e] text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <Play size={18} fill="currentColor" />
            Mulai Tes Sekarang
          </button>

          {hasHistory && (
            <button
              type="button"
              onClick={onViewHistory}
              className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 text-gray-700 dark:text-slate-200 font-bold py-3.5 px-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <History size={16} />
              Lihat Riwayat Tes Sebelumnya
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

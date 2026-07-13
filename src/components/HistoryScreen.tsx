import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trash2, Calendar, User, ChevronRight, Award } from 'lucide-react';
import { HistoryRecord } from '../types';
import { mbtiResults } from '../data/mbtiResults';

interface HistoryScreenProps {
  onBack: () => void;
  onSelectRecord: (record: HistoryRecord) => void;
}

export default function HistoryScreen({ onBack, onSelectRecord }: HistoryScreenProps) {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mbti_indonesia_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const handleDeleteRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering row select
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('mbti_indonesia_history', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat tes di perangkat ini?")) {
      setHistory([]);
      localStorage.removeItem('mbti_indonesia_history');
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[85vh] py-4 px-4 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-all cursor-pointer text-gray-600 dark:text-slate-300"
            >
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-black text-gray-900 dark:text-white pl-1">Riwayat Tes</h3>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:underline transition-all cursor-pointer"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* List of records */}
        {history.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-750 text-center my-8 shadow-xs">
            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-750 rounded-2xl flex items-center justify-center text-gray-400 mx-auto mb-4">
              <Calendar size={28} />
            </div>
            <h4 className="text-base font-extrabold text-gray-900 dark:text-white">Belum Ada Riwayat</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Hasil tes kepribadian Anda akan otomatis tersimpan secara aman di peramban ini setelah Anda menyelesaikan tes.
            </p>
            <button
              onClick={onBack}
              className="mt-5 bg-[#6B5BFF] hover:bg-[#5748E6] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Mulai Tes Pertama Anda
            </button>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {history.map((record) => {
              const profile = mbtiResults[record.mbtiType];
              const gradient = profile?.bgGradient || "from-gray-500 to-slate-500";
              
              return (
                <motion.div
                  key={record.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectRecord(record)}
                  className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-750 hover:border-[#6B5BFF]/40 dark:hover:border-indigo-500/40 transition-all cursor-pointer shadow-xs flex justify-between items-center group"
                >
                  <div className="flex gap-4 items-center">
                    {/* Small avatar block with MBTI type gradient */}
                    <div className={`w-12 h-12 bg-linear-to-br ${gradient} rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xs`}>
                      {record.mbtiType}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <User size={12} className="text-gray-400" />
                        {record.name}
                      </h4>
                      <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
                        {record.mbtiTitle}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1">
                        <Calendar size={10} />
                        {record.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteRecord(record.id, e)}
                      className="p-2 text-gray-300 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                      title="Hapus riwayat"
                    >
                      <Trash2 size={15} />
                    </button>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer back button */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onBack}
          className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 text-gray-700 dark:text-slate-300 font-bold py-3.5 px-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

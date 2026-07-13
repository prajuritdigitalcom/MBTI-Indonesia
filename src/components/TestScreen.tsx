import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { questions } from '../data/questions';

interface TestScreenProps {
  answers: Record<number, number>;
  onAnswer: (questionId: number, value: number) => void;
  onComplete: () => void;
  onBackToWelcome: () => void;
}

export default function TestScreen({ answers, onAnswer, onComplete, onBackToWelcome }: TestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  const options = [
    { value: 5, label: "Sangat Setuju", color: "emerald", scaleColor: "bg-emerald-500", activeBg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-300" },
    { value: 4, label: "Setuju", color: "teal", scaleColor: "bg-teal-400", activeBg: "bg-teal-50/50 dark:bg-teal-950/10 border-teal-400 text-teal-700 dark:text-teal-300" },
    { value: 3, label: "Netral", color: "gray", scaleColor: "bg-gray-400", activeBg: "bg-gray-50 dark:bg-slate-800/80 border-gray-400 text-gray-700 dark:text-gray-300" },
    { value: 2, label: "Tidak Setuju", color: "roseLight", scaleColor: "bg-rose-300", activeBg: "bg-rose-50/50 dark:bg-rose-950/10 border-rose-300 text-rose-700 dark:text-rose-300" },
    { value: 1, label: "Sangat Tidak Setuju", color: "roseDeep", scaleColor: "bg-rose-500", activeBg: "bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-300" }
  ];

  const handleSelectOption = (val: number) => {
    onAnswer(currentQuestion.id, val);

    // Auto next after 300ms delay for feedback feel
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete();
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBackToWelcome();
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1 && answers[currentQuestion.id] !== undefined) {
      setCurrentIndex((prev) => prev + 1);
    } else if (currentIndex === totalQuestions - 1 && answers[currentQuestion.id] !== undefined) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[85vh] py-4 px-4 w-full max-w-md mx-auto">
      {/* Upper Navigation & Progress */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft size={16} /> Sebelumnya
          </button>
          <div className="flex items-center gap-1.5 text-xs font-black text-[#6B5BFF] dark:text-indigo-400 uppercase tracking-widest">
            <Sparkles size={14} /> Pertanyaan {currentIndex + 1} / {totalQuestions}
          </div>
        </div>

        {/* Custom Premium Progress Bar */}
        <div className="relative w-full h-3 bg-gray-200/60 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-linear-to-r from-[#fe4c6f] to-[#6B5BFF]"
            initial={{ width: `${progressPercent}%` }}
            animate={{ width: `${Math.round(((currentIndex + 1) / totalQuestions) * 100)}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="my-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-[100px] flex items-center"
          >
            <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white leading-relaxed text-center w-full px-1">
              &ldquo;{currentQuestion.text}&rdquo;
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Choice Options Stack */}
      <div className="space-y-3 my-4">
        {options.map((opt) => {
          const isSelected = answers[currentQuestion.id] === opt.value;
          return (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectOption(opt.value)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${
                isSelected
                  ? opt.activeBg
                  : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-750 text-gray-700 dark:text-slate-300 hover:border-gray-300 dark:hover:border-slate-650'
              } shadow-xs hover:shadow-md`}
            >
              <div className="flex items-center gap-3.5">
                {/* Scale Circle */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                    isSelected
                      ? 'border-transparent scale-110'
                      : 'border-gray-300 dark:border-slate-600'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isSelected ? `${opt.scaleColor} scale-100` : 'bg-transparent scale-0'
                    }`}
                  />
                </div>
                <span className="font-bold text-sm md:text-base">{opt.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Manual Advancement Footer (Optional Safeguard) */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800 mt-2">
        <span className="text-xs font-bold text-gray-400 dark:text-slate-500">
          Geser otomatis saat memilih
        </span>
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion.id] === undefined}
          className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl transition-all ${
            answers[currentQuestion.id] === undefined
              ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed'
              : 'text-[#6B5BFF] hover:bg-indigo-50 dark:hover:bg-indigo-950/30 cursor-pointer'
          }`}
        >
          Selanjutnya <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

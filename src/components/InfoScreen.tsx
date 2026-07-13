import { motion } from 'motion/react';
import { ArrowLeft, Play, Info, Sparkles, Smile, Compass } from 'lucide-react';

interface InfoScreenProps {
  onNext: () => void;
  onBack: () => void;
  userName: string;
}

export default function InfoScreen({ onNext, onBack, userName }: InfoScreenProps) {
  return (
    <div className="flex flex-col justify-between min-h-[85vh] py-4 px-4 w-full max-w-md mx-auto">
      {/* Header Back Button */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={onBack}
          className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-all cursor-pointer text-gray-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest pl-1">
          Kembali
        </span>
      </div>

      {/* Greeting and Intro */}
      <div className="text-center my-2">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 rounded-full mb-3"
        >
          <Compass size={28} className="animate-spin-slow" />
        </motion.div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Halo, <span className="text-[#6B5BFF]">{userName}</span>!
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-300 mt-1">
          Sebelum mulai, mari pahami panduan singkat tes ini.
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="space-y-3.5 my-4">
        {/* Item 1 */}
        <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-750 shadow-xs">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-[#fe4c6f] font-bold text-sm">
            24
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Jumlah Pertanyaan</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Terdapat 24 pertanyaan yang mewakili 4 elemen kepribadian utama.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-750 shadow-xs">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-[#6B5BFF]">
            <Smile size={20} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Jawab dengan Jujur</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Tidak ada jawaban benar atau salah. Pilih opsi yang paling menggambarkan dirimu apa adanya.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-750 shadow-xs">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Hindari Jawaban &quot;Netral&quot;</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Usahakan memilih setuju/tidak setuju daripada memilih netral agar analisis kepribadianmu lebih akurat.
            </p>
          </div>
        </div>
      </div>

      {/* Tip Banner */}
      <div className="p-3.5 bg-linear-to-r from-indigo-50/50 to-rose-50/50 dark:from-indigo-950/20 dark:to-rose-950/20 rounded-2xl border border-indigo-100/10 dark:border-indigo-900/10 flex items-start gap-2.5 text-xs text-gray-500 dark:text-slate-400">
        <Info size={16} className="text-[#6B5BFF] flex-shrink-0 mt-0.5" />
        <p>
          Tes ini berjalan sepenuhnya di browsermu secara offline dan datamu aman, tidak dikirim ke server mana pun.
        </p>
      </div>

      {/* Action CTA */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onNext}
          className="w-full bg-[#6B5BFF] hover:bg-[#5748E6] text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          Mulai Sekarang
          <Play size={16} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

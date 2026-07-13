import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { 
  Download, Share2, Copy, Check, RotateCcw, Award, 
  Briefcase, BookOpen, Heart, Shield, Lightbulb, Compass,
  Calendar, Eye
} from 'lucide-react';
import { CalculatedScores } from '../utils/mbtiCalculator';
import { mbtiResults, traitNames } from '../data/mbtiResults';

interface ResultsScreenProps {
  scores: CalculatedScores;
  userName: string;
  onRetake: () => void;
  onViewHistory: () => void;
  isNewResult?: boolean;
}

export default function ResultsScreen({ scores, userName, onRetake, onViewHistory, isNewResult = false }: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'style' | 'career'>('overview');
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const exportCardRef = useRef<HTMLDivElement>(null);

  const mbtiType = scores.mbtiType;
  const profile = mbtiResults[mbtiType] || mbtiResults.INTJ; // fallback safe

  // Auto-save results to local storage on mount (only for newly completed tests)
  useEffect(() => {
    if (!isNewResult) return;

    try {
      const existingHistory = localStorage.getItem('mbti_indonesia_history');
      const historyList = existingHistory ? JSON.parse(existingHistory) : [];
      
      const newRecord = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        createdAt: Date.now(),
        name: userName,
        mbtiType: mbtiType,
        mbtiTitle: profile.title,
        scores: {
          EI: scores.EI.ePercent,
          SN: scores.SN.sPercent,
          TF: scores.TF.tPercent,
          JP: scores.JP.jPercent
        }
      };

      // Check if a record with same scores and name was just saved within last 15 seconds to prevent duplicate
      const duplicate = historyList.some((r: any) => 
        r.name === userName && 
        r.mbtiType === mbtiType && 
        Math.abs(scores.EI.ePercent - r.scores.EI) < 1 &&
        Math.abs(scores.SN.sPercent - r.scores.SN) < 1 &&
        Math.abs(scores.TF.tPercent - r.scores.TF) < 1 &&
        Math.abs(scores.JP.jPercent - r.scores.JP) < 1 &&
        (r.createdAt ? Math.abs(Date.now() - r.createdAt) < 15000 : true)
      );

      if (!duplicate) {
        historyList.unshift(newRecord);
        localStorage.setItem('mbti_indonesia_history', JSON.stringify(historyList));
      }
    } catch (e) {
      console.error("Failed to save history to local storage", e);
    }
  }, [isNewResult, mbtiType, userName, scores, profile.title]);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?type=${mbtiType}&name=${encodeURIComponent(userName)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDownloadCard = async () => {
    if (!exportCardRef.current) return;
    setIsDownloading(true);

    try {
      // Ensure all images are loaded, styles are parsed before exporting
      const dataUrl = await toPng(exportCardRef.current, {
        width: 1080,
        height: 1350,
        style: {
          transform: 'scale(1)',
          left: '0',
          top: '0',
          position: 'static',
        },
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `MBTI_Indonesia_${userName}_${mbtiType}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Oops, something went wrong with card export!', err);
    } finally {
      setIsDownloading(false);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }
  };

  const handleShareSystem = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?type=${mbtiType}&name=${encodeURIComponent(userName)}`;
    if (navigator.share) {
      navigator.share({
        title: `Hasil Tes MBTI: ${userName} adalah ${mbtiType}`,
        text: `Saya baru saja mengikuti tes kepribadian MBTI Indonesia dan hasilnya adalah ${mbtiType} - ${profile.title}. Coba tes milikmu juga secara gratis!`,
        url: shareUrl,
      }).catch(err => console.log('Share canceled or failed', err));
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-3 space-y-6">
      
      {/* MBTI Premium Visual Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${profile.bgGradient} text-white p-6 shadow-xl border border-white/10`}
      >
        {/* Glow rings */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl -translate-y-20 translate-x-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full filter blur-2xl translate-y-20 -translate-x-20 pointer-events-none" />

        <div className="flex justify-between items-start z-10 relative">
          <div>
            <span className="px-3 py-1 bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest rounded-full backdrop-blur-md">
              Kartu Kepribadian
            </span>
            <h4 className="text-sm font-semibold text-white/80 mt-2 pl-0.5">
              {userName}
            </h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShareSystem}
              className="p-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-xl backdrop-blur-md border border-white/10 cursor-pointer"
              title="Bagikan Hasil"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={handleDownloadCard}
              disabled={isDownloading}
              className="p-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-all rounded-xl backdrop-blur-md border border-white/10 cursor-pointer"
              title="Unduh Kartu Instagram"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="my-8 z-10 relative">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-black tracking-widest text-center"
          >
            {mbtiType}
          </motion.h1>
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-black text-center mt-3 tracking-wide"
          >
            {profile.title}
          </motion.h2>
          <p className="text-xs text-white/70 text-center font-medium uppercase tracking-widest mt-1">
            {profile.subtitle}
          </p>
        </div>

        {/* Short Summary inside the card */}
        <div className="pt-4 border-t border-white/10 z-10 relative text-xs text-white/85 leading-relaxed italic text-center pl-1 pr-1">
          &ldquo;{profile.summary}&rdquo;
        </div>
      </motion.div>

      {/* Sharing Successful Alert */}
      {showShareSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-emerald-500 text-white p-3.5 rounded-2xl text-center font-bold text-xs shadow-md"
        >
          🎉 Berhasil mengunduh kartu! Siap dibagikan ke Instagram Story (1080x1350).
        </motion.div>
      )}

      {/* Dimensi Kepribadian Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xs border border-gray-100 dark:border-slate-750">
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          <Shield size={20} className="text-[#6B5BFF]" />
          Dimensi Kepribadian Anda
        </h3>

        <div className="space-y-5">
          {/* Dimension 1: E vs I */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              <span>E - Extraversion ({scores.EI.ePercent}%)</span>
              <span>I - Introversion ({scores.EI.iPercent}%)</span>
            </div>
            <div className="relative w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${scores.EI.ePercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#fe4c6f] ${scores.EI.dominant === 'E' ? 'opacity-100' : 'opacity-40'}`} 
              />
              <div 
                style={{ width: `${scores.EI.iPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#6B5BFF] ${scores.EI.dominant === 'I' ? 'opacity-100' : 'opacity-40'}`} 
              />
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 pl-0.5">
              Dominan <strong className="text-gray-700 dark:text-white">{scores.EI.dominant === 'E' ? 'Extraversion' : 'Introversion'}</strong>: {traitNames[scores.EI.dominant].desc}
            </p>
          </div>

          {/* Dimension 2: S vs N */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              <span>S - Sensing ({scores.SN.sPercent}%)</span>
              <span>N - Intuition ({scores.SN.nPercent}%)</span>
            </div>
            <div className="relative w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${scores.SN.sPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#fe4c6f] ${scores.SN.dominant === 'S' ? 'opacity-100' : 'opacity-40'}`} 
              />
              <div 
                style={{ width: `${scores.SN.nPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#6B5BFF] ${scores.SN.dominant === 'N' ? 'opacity-100' : 'opacity-40'}`} 
              />
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 pl-0.5">
              Dominan <strong className="text-gray-700 dark:text-white">{scores.SN.dominant === 'S' ? 'Sensing' : 'Intuition'}</strong>: {traitNames[scores.SN.dominant].desc}
            </p>
          </div>

          {/* Dimension 3: T vs F */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              <span>T - Thinking ({scores.TF.tPercent}%)</span>
              <span>F - Feeling ({scores.TF.fPercent}%)</span>
            </div>
            <div className="relative w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${scores.TF.tPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#fe4c6f] ${scores.TF.dominant === 'T' ? 'opacity-100' : 'opacity-40'}`} 
              />
              <div 
                style={{ width: `${scores.TF.fPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#6B5BFF] ${scores.TF.dominant === 'F' ? 'opacity-100' : 'opacity-40'}`} 
              />
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 pl-0.5">
              Dominan <strong className="text-gray-700 dark:text-white">{scores.TF.dominant === 'T' ? 'Thinking' : 'Feeling'}</strong>: {traitNames[scores.TF.dominant].desc}
            </p>
          </div>

          {/* Dimension 4: J vs P */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              <span>J - Judging ({scores.JP.jPercent}%)</span>
              <span>P - Perceiving ({scores.JP.pPercent}%)</span>
            </div>
            <div className="relative w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${scores.JP.jPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#fe4c6f] ${scores.JP.dominant === 'J' ? 'opacity-100' : 'opacity-40'}`} 
              />
              <div 
                style={{ width: `${scores.JP.pPercent}%` }} 
                className={`h-full transition-all duration-500 bg-[#6B5BFF] ${scores.JP.dominant === 'P' ? 'opacity-100' : 'opacity-40'}`} 
              />
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 pl-0.5">
              Dominan <strong className="text-gray-700 dark:text-white">{scores.JP.dominant === 'J' ? 'Judging' : 'Perceiving'}</strong>: {traitNames[scores.JP.dominant].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="relative flex p-1.5 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className="relative flex-1 py-3 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {activeTab === 'overview' && (
            <motion.span
              layoutId="activeTabBackground"
              className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700/50 z-[-1]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <Award size={14} className={activeTab === 'overview' ? 'text-[#fe4c6f]' : 'text-gray-400 dark:text-slate-500'} />
          <span className={activeTab === 'overview' ? 'text-gray-950 dark:text-white' : 'text-gray-500 dark:text-slate-400'}>
            Karakter
          </span>
        </button>
        
        <button
          onClick={() => setActiveTab('style')}
          className="relative flex-1 py-3 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {activeTab === 'style' && (
            <motion.span
              layoutId="activeTabBackground"
              className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700/50 z-[-1]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <Heart size={14} className={activeTab === 'style' ? 'text-[#6B5BFF]' : 'text-gray-400 dark:text-slate-500'} />
          <span className={activeTab === 'style' ? 'text-gray-950 dark:text-white' : 'text-gray-500 dark:text-slate-400'}>
            Gaya Hidup
          </span>
        </button>

        <button
          onClick={() => setActiveTab('career')}
          className="relative flex-1 py-3 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {activeTab === 'career' && (
            <motion.span
              layoutId="activeTabBackground"
              className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700/50 z-[-1]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <Briefcase size={14} className={activeTab === 'career' ? 'text-amber-500' : 'text-gray-400 dark:text-slate-500'} />
          <span className={activeTab === 'career' ? 'text-gray-950 dark:text-white' : 'text-gray-500 dark:text-slate-400'}>
            Karier & Tips
          </span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[220px]">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Characteristics list */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 shadow-xs space-y-3">
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Lightbulb size={18} className="text-[#fe4c6f]" />
                Karakter Umum
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-300">
                {profile.characteristics.map((char, index) => (
                  <li key={index} className="flex gap-2.5 items-start pl-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fe4c6f] mt-1.5 flex-shrink-0" />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 shadow-xs space-y-3">
                <h4 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500"><Award size={16} /></span>
                  Kelebihan Utama
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-slate-300">
                  {profile.strengths.map((str, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 shadow-xs space-y-3">
                <h4 className="text-sm font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500"><BookOpen size={14} /></span>
                  Tantangan Diri
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-slate-300">
                  {profile.weaknesses.map((weak, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'style' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Style Cards */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 shadow-xs space-y-4">
              {/* Learning Style */}
              <div className="space-y-1.5 pb-3 border-b border-gray-100 dark:border-slate-700">
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-[#6B5BFF]" />
                  Gaya Belajar
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed pl-1">
                  {profile.learningStyle}
                </p>
              </div>

              {/* Working Style */}
              <div className="space-y-1.5 pb-3 border-b border-gray-100 dark:border-slate-700">
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Briefcase size={16} className="text-[#fe4c6f]" />
                  Gaya Bekerja
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed pl-1">
                  {profile.workingStyle}
                </p>
              </div>

              {/* Communication Style */}
              <div className="space-y-1.5 pb-3 border-b border-gray-100 dark:border-slate-700">
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Eye size={16} className="text-indigo-500" />
                  Gaya Komunikasi
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed pl-1">
                  {profile.communicationStyle}
                </p>
              </div>

              {/* Stress Coping */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Heart size={16} className="text-rose-500" />
                  Cara Menghadapi Tekanan (Stres)
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed pl-1">
                  {profile.stressCoping}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'career' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Suitable Careers List */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 shadow-xs space-y-3.5">
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Briefcase size={18} className="text-[#fe4c6f]" />
                Karier yang Cocok
              </h4>
              <div className="flex flex-wrap gap-2 pt-1 pl-1">
                {profile.suitableCareers.map((career, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 font-extrabold text-xs rounded-xl"
                  >
                    💼 {career}
                  </span>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-slate-700">
                <h5 className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest pl-1 mb-1">Lingkungan Kerja Ideal</h5>
                <p className="text-sm text-gray-600 dark:text-slate-300 pl-1 leading-relaxed">
                  {profile.idealWorkEnvironment}
                </p>
              </div>
            </div>

            {/* Self Development Tips */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 shadow-xs space-y-3">
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-500" />
                Tips Pengembangan Diri
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-300">
                {profile.selfDevelopmentTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 items-start pl-0.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-xs font-extrabold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-slate-800">
        <button
          onClick={onRetake}
          className="w-full bg-[#fe4c6f] hover:bg-[#e03d5e] text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <RotateCcw size={16} />
          Ulangi Tes Baru
        </button>
        <button
          onClick={onViewHistory}
          className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 text-gray-700 dark:text-slate-200 font-bold py-3.5 px-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <Calendar size={16} />
          Lihat Riwayat Tesku
        </button>
      </div>

      {/* Copy link button */}
      <button
        onClick={handleCopyLink}
        className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200 transition-all flex items-center justify-center gap-1.5"
      >
        {isCopied ? (
          <>
            <Check size={14} className="text-emerald-500" />
            <span>Tautan hasil disalin ke papan klip!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Salin Tautan Hasil untuk Dibagikan</span>
          </>
        )}
      </button>

      {/* ========================================== */}
      {/* EXPORT ONLY HIDDEN INSTAGRAM STORY CANVAS  */}
      {/* Size: 1080px x 1350px                      */}
      {/* ========================================== */}
      <div className="absolute top-0 left-[-9999px] pointer-events-none">
        <div 
          ref={exportCardRef}
          className={`w-[1080px] h-[1350px] bg-linear-to-br ${profile.bgGradient} text-white p-20 flex flex-col justify-between relative overflow-hidden font-sans`}
          style={{ width: '1080px', height: '1350px' }}
        >
          {/* Subtle Background Art */}
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-white/5 rounded-full filter blur-[150px]" />
          <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-black/15 rounded-full filter blur-[150px]" />

          {/* Top Branding Bar */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <span className="font-black text-2xl tracking-widest text-white">J</span>
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-widest uppercase">MBTI Indonesia</h4>
                <p className="text-xs text-white/60 tracking-wider">Laporan Hasil Tes Kepribadian</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-5 py-2 bg-white/10 border border-white/20 rounded-full font-bold text-sm uppercase tracking-widest">
                Passport Psikologi
              </span>
            </div>
          </div>

          {/* Center Main Type Badge */}
          <div className="my-auto text-center z-10 flex flex-col items-center">
            <span className="text-2xl font-semibold text-white/70 uppercase tracking-[0.3em] mb-4">
              PROFIL KEPRIBADIAN: {userName}
            </span>
            <h1 className="text-[170px] font-black tracking-[0.1em] leading-none mb-4 translate-x-3 text-shadow-lg">
              {mbtiType}
            </h1>
            <h2 className="text-5xl font-black tracking-wide bg-white/10 px-10 py-4 rounded-3xl border border-white/10 inline-block mb-4 shadow-sm">
              {profile.title}
            </h2>
            <p className="text-xl font-bold tracking-widest text-white/80 uppercase">
              {profile.subtitle}
            </p>
          </div>

          {/* Bottom Scores Grid & Watermark */}
          <div className="border-t border-white/15 pt-12 z-10 space-y-12">
            {/* Visual Bars Matrix */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-8">
              {/* EI */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-black uppercase tracking-wider text-white/75">
                  <span>E - Extraversion ({scores.EI.ePercent}%)</span>
                  <span>I - Introversion ({scores.EI.iPercent}%)</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                  <div style={{ width: `${scores.EI.ePercent}%` }} className="h-full bg-white" />
                  <div style={{ width: `${scores.EI.iPercent}%` }} className="h-full bg-white/30" />
                </div>
              </div>

              {/* SN */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-black uppercase tracking-wider text-white/75">
                  <span>S - Sensing ({scores.SN.sPercent}%)</span>
                  <span>N - Intuition ({scores.SN.nPercent}%)</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                  <div style={{ width: `${scores.SN.sPercent}%` }} className="h-full bg-white" />
                  <div style={{ width: `${scores.SN.nPercent}%` }} className="h-full bg-white/30" />
                </div>
              </div>

              {/* TF */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-black uppercase tracking-wider text-white/75">
                  <span>T - Thinking ({scores.TF.tPercent}%)</span>
                  <span>F - Feeling ({scores.TF.fPercent}%)</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                  <div style={{ width: `${scores.TF.tPercent}%` }} className="h-full bg-white" />
                  <div style={{ width: `${scores.TF.fPercent}%` }} className="h-full bg-white/30" />
                </div>
              </div>

              {/* JP */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-black uppercase tracking-wider text-white/75">
                  <span>J - Judging ({scores.JP.jPercent}%)</span>
                  <span>P - Perceiving ({scores.JP.pPercent}%)</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                  <div style={{ width: `${scores.JP.jPercent}%` }} className="h-full bg-white" />
                  <div style={{ width: `${scores.JP.pPercent}%` }} className="h-full bg-white/30" />
                </div>
              </div>
            </div>

            {/* Bottom Footer Watermark */}
            <div className="flex justify-center items-center pt-8 border-t border-white/15">
              <div className="text-center">
                <p className="text-base text-white/40 uppercase tracking-widest font-semibold">Fondasi Algoritma</p>
                <p className="text-2xl font-black text-white mt-1.5">OpenJung Core Framework</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

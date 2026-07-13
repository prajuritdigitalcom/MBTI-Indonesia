import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Sparkles, Brain } from 'lucide-react';

// Subcomponents
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import InfoScreen from './components/InfoScreen';
import TestScreen from './components/TestScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';

// Utilities & Data
import { calculateMBTI, CalculatedScores } from './utils/mbtiCalculator';
import { HistoryRecord } from './types';

export default function App() {
  const [view, setView] = useState<'splash' | 'welcome' | 'info' | 'test' | 'loading' | 'results' | 'history'>('welcome');
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<CalculatedScores | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [isNewResult, setIsNewResult] = useState(false);

  // 1. Force Disable Dark Mode
  useEffect(() => {
    try {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 2. Local History existence check
  const checkHistory = () => {
    try {
      const saved = localStorage.getItem('mbti_indonesia_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        setHasHistory(parsed && parsed.length > 0);
      } else {
        setHasHistory(false);
      }
    } catch (e) {
      setHasHistory(false);
    }
  };

  useEffect(() => {
    checkHistory();
  }, [view]);

  // 3. Detect and handle Shared Links (Deep Linking for SEO and Sharing)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedType = params.get('type');
    const sharedName = params.get('name');

    if (sharedType && sharedName) {
      const type = sharedType.toUpperCase();
      // Verify valid 4-letter combination of EI, SN, TF, JP
      const validPattern = /^[EI][SN][TF][JP]$/;
      if (validPattern.test(type)) {
        setUserName(decodeURIComponent(sharedName));
        
        // Construct realistic percentages representing the shared type
        const mockScores: CalculatedScores = {
          mbtiType: type,
          EI: {
            E: type[0] === 'E' ? 70 : 30,
            I: type[0] === 'I' ? 70 : 30,
            ePercent: type[0] === 'E' ? 70 : 30,
            iPercent: type[0] === 'I' ? 70 : 30,
            dominant: type[0] as 'E' | 'I',
            percent: 70
          },
          SN: {
            S: type[1] === 'S' ? 70 : 30,
            N: type[1] === 'N' ? 70 : 30,
            sPercent: type[1] === 'S' ? 70 : 30,
            nPercent: type[1] === 'N' ? 70 : 30,
            dominant: type[1] as 'S' | 'N',
            percent: 70
          },
          TF: {
            T: type[2] === 'T' ? 70 : 30,
            F: type[2] === 'F' ? 70 : 30,
            tPercent: type[2] === 'T' ? 70 : 30,
            fPercent: type[2] === 'F' ? 70 : 30,
            dominant: type[2] as 'T' | 'F',
            percent: 70
          },
          JP: {
            J: type[3] === 'J' ? 70 : 30,
            P: type[3] === 'P' ? 70 : 30,
            jPercent: type[3] === 'J' ? 70 : 30,
            pPercent: type[3] === 'P' ? 70 : 30,
            dominant: type[3] as 'J' | 'P',
            percent: 70
          }
        };

        setScores(mockScores);
        // Skip splash screen straight to results for shared links
        setView('results');
      }
    }
  }, []);

  // 4. Test Event Handlers
  const handleStartTest = (name: string) => {
    setUserName(name);
    setAnswers({});
    setIsNewResult(false);
    setView('info');
  };

  const handleAnswerQuestion = (id: number, val: number) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: val
    }));
  };

  const handleCalculateResult = () => {
    const finalScores = calculateMBTI(answers);
    setScores(finalScores);
    setIsNewResult(true);
    setView('results');
  };

  const handleSelectHistoryRecord = (record: HistoryRecord) => {
    setUserName(record.name);
    setIsNewResult(false);
    
    // Convert saved percentages to score shape
    const convertedScores: CalculatedScores = {
      mbtiType: record.mbtiType,
      EI: {
        E: record.scores.EI,
        I: 100 - record.scores.EI,
        ePercent: record.scores.EI,
        iPercent: 100 - record.scores.EI,
        dominant: record.scores.EI >= 50 ? 'E' : 'I',
        percent: record.scores.EI >= 50 ? record.scores.EI : 100 - record.scores.EI
      },
      SN: {
        S: record.scores.SN,
        N: 100 - record.scores.SN,
        sPercent: record.scores.SN,
        nPercent: 100 - record.scores.SN,
        dominant: record.scores.SN >= 50 ? 'S' : 'N',
        percent: record.scores.SN >= 50 ? record.scores.SN : 100 - record.scores.SN
      },
      TF: {
        T: record.scores.TF,
        F: 100 - record.scores.TF,
        tPercent: record.scores.TF,
        fPercent: 100 - record.scores.TF,
        dominant: record.scores.TF >= 50 ? 'T' : 'F',
        percent: record.scores.TF >= 50 ? record.scores.TF : 100 - record.scores.TF
      },
      JP: {
        J: record.scores.JP,
        P: 100 - record.scores.JP,
        jPercent: record.scores.JP,
        pPercent: 100 - record.scores.JP,
        dominant: record.scores.JP >= 50 ? 'J' : 'P',
        percent: record.scores.JP >= 50 ? record.scores.JP : 100 - record.scores.JP
      }
    };

    setScores(convertedScores);
    setView('results');
  };

  const handleRetake = () => {
    setAnswers({});
    setIsNewResult(false);
    setView('welcome');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] dark:bg-[#0F172A] text-[#111827] dark:text-[#F8FAFC] flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic top header */}
      {view !== 'splash' && (
        <header className="sticky top-0 z-40 bg-[#FAFAFB]/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 py-3.5 px-4">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            {/* Header Brand */}
            <button 
              onClick={() => setView('welcome')}
              className="flex items-center gap-2.5 hover:opacity-85 transition-opacity text-left cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-lg bg-linear-to-br from-[#fe4c6f] to-[#6B5BFF] flex items-center justify-center text-white">
                <Brain size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-black">
                  MBTI <span className="text-[#fe4c6f]">Indonesia</span>
                </h1>
              </div>
            </button>

            {/* Actions: History access */}
            <div className="flex items-center gap-1.5">
              {view === 'welcome' && hasHistory && (
                <button
                  onClick={() => setView('history')}
                  className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white transition-all hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  title="Lihat Riwayat"
                >
                  <History size={18} />
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 w-full relative">
        <AnimatePresence mode="wait">
          {view === 'splash' && (
            <SplashScreen key="splash" onComplete={() => setView('welcome')} />
          )}

          {view === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full"
            >
              <WelcomeScreen
                onStart={handleStartTest}
                onViewHistory={() => setView('history')}
                hasHistory={hasHistory}
              />
            </motion.div>
          )}

          {view === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <InfoScreen
                userName={userName}
                onNext={() => setView('test')}
                onBack={() => setView('welcome')}
              />
            </motion.div>
          )}

          {view === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <TestScreen
                answers={answers}
                onAnswer={handleAnswerQuestion}
                onComplete={() => setView('loading')}
                onBackToWelcome={() => setView('welcome')}
              />
            </motion.div>
          )}

          {view === 'loading' && (
            <LoadingScreen key="loading" onComplete={handleCalculateResult} />
          )}

          {view === 'results' && scores && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <ResultsScreen
                scores={scores}
                userName={userName}
                onRetake={handleRetake}
                onViewHistory={() => setView('history')}
                isNewResult={isNewResult}
              />
            </motion.div>
          )}

          {view === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <HistoryScreen
                onBack={() => setView('welcome')}
                onSelectRecord={handleSelectHistoryRecord}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Simple Footer */}
      {view !== 'splash' && (
        <footer className="py-6 px-4 text-center border-t border-gray-100 dark:border-slate-800 text-[11px] font-semibold text-gray-400 dark:text-slate-500 max-w-xl mx-auto w-full">
          <p>
            © 2026 Karya Prajurit Digital. Hak Cipta Dilindungi.
          </p>
        </footer>
      )}
    </div>
  );
}

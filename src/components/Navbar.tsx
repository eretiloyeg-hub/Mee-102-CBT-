import React from 'react';
import { Award, Calculator, Clock, History, HelpCircle, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: 'setup' | 'test' | 'results' | 'history' | 'questions';
  setActiveTab: (tab: 'setup' | 'test' | 'results' | 'history' | 'questions') => void;
  openCalculator: () => void;
  openAIGenerator: () => void;
  isTestActive: boolean;
  timeRemainingSeconds: number | null;
  subjectTitle?: string;
  questionProgress?: { current: number; total: number; answered: number };
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openCalculator,
  openAIGenerator,
  isTestActive,
  timeRemainingSeconds,
  subjectTitle,
  questionProgress,
}) => {
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimerLow = timeRemainingSeconds !== null && timeRemainingSeconds <= 300; // <= 5 mins

  return (
    <header id="cbt-navbar" className="h-16 px-4 sm:px-8 border-b border-zinc-800 flex items-center justify-between bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-40 text-zinc-100">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => !isTestActive && setActiveTab('setup')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-white">
                CogniTest <span className="text-zinc-500 font-normal">Pro</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                BENTO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              {isTestActive ? subjectTitle || 'Active Test' : 'System Ready'}
            </p>
          </div>
        </div>

        {/* Live Test Metrics (if test is active) */}
        {isTestActive && (
          <div className="flex items-center gap-4 bg-zinc-900/80 px-4 py-1.5 rounded-2xl border border-zinc-800">
            {questionProgress && (
              <div className="text-xs font-medium text-zinc-300 hidden md:block">
                Question <span className="text-indigo-400 font-bold">{questionProgress.current}</span> / {questionProgress.total} 
                <span className="ml-2 text-zinc-500">({questionProgress.answered} answered)</span>
              </div>
            )}

            {timeRemainingSeconds !== null && (
              <div id="cbt-active-timer" className={`flex items-center gap-1.5 font-mono text-sm font-bold px-3 py-1 rounded-xl transition-all ${
                isTimerLow 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' 
                  : 'bg-zinc-950 text-cyan-400 border border-cyan-500/30'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            )}
          </div>
        )}

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-2">
          {/* Scientific Calculator Tool */}
          <button
            id="btn-open-calculator"
            onClick={openCalculator}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition border border-zinc-800"
            title="Open Scientific Calculator"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {!isTestActive && (
            <>
              {/* AI Custom Topic Generator Button */}
              <button
                id="btn-open-ai-generator"
                onClick={openAIGenerator}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">AI Topic</span>
              </button>

              {/* Navigation Tabs */}
              <nav className="flex items-center gap-1 ml-1 bg-zinc-900/80 p-1 rounded-2xl border border-zinc-800">
                <button
                  id="tab-setup"
                  onClick={() => setActiveTab('setup')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl transition ${
                    activeTab === 'setup' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  New Exam
                </button>
                <button
                  id="tab-history"
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl transition flex items-center gap-1 ${
                    activeTab === 'history' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">History</span>
                </button>
                <button
                  id="tab-questions"
                  onClick={() => setActiveTab('questions')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl transition flex items-center gap-1 ${
                    activeTab === 'questions' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Bank</span>
                </button>
              </nav>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

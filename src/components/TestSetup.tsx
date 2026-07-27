import React, { useState } from 'react';
import { Play, Clock, HelpCircle, Shuffle, Sparkles, Sliders, CheckSquare, Layers, Shield, FileText, Zap } from 'lucide-react';
import { TestConfig, TestMode } from '../types';
import { SUBJECT_BANKS } from '../data/questionBanks';

interface TestSetupProps {
  onStartTest: (config: TestConfig) => void;
  openAIGenerator: () => void;
}

export const TestSetup: React.FC<TestSetupProps> = ({ onStartTest, openAIGenerator }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('mee102');
  const [questionCount, setQuestionCount] = useState<number>(40); // default 40 Qs
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30); // default 30 mins
  const [mode, setMode] = useState<TestMode>('exam');
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const currentSubject = SUBJECT_BANKS.find(s => s.id === selectedSubjectId) || SUBJECT_BANKS[0];

  // Quick preset helpers
  const questionPresets = [10, 20, 40, 50, 100, 150, 200];
  const timePresets = [10, 20, 30, 45, 60];

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedCategories([]); // reset category selection to all
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleLaunch = () => {
    if (currentSubject.isCustomAI) {
      openAIGenerator();
      return;
    }

    onStartTest({
      subjectId: currentSubject.id,
      subjectTitle: currentSubject.title,
      questionCount,
      timeLimitMinutes,
      mode,
      shuffleQuestions,
      shuffleOptions,
      selectedCategories: selectedCategories.length > 0 ? selectedCategories : currentSubject.categoryList,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 text-zinc-100">
      
      {/* Top Hero Bento Card */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Bento CBT Examination Platform</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            Configure CBT Exam
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Configure up to <strong className="text-indigo-400 font-medium">200 questions</strong> and timers up to <strong className="text-cyan-400 font-medium">60 minutes (1 Hour)</strong>. Access subject banks or launch an AI exam on any topic with instant answer justifications.
          </p>
        </div>

        <button
          id="btn-ai-quick-topic"
          onClick={openAIGenerator}
          className="px-5 py-3 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold flex items-center gap-2.5 transition shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Generate Any Custom Topic</span>
        </button>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Bento Cell 1: Subject Selection (Large 2x2 grid span) */}
        <section className="md:col-span-2 md:row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-white">Subject Selection</h2>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Module Bank</span>
            </div>
            <p className="text-zinc-400 text-xs">Select a test module or custom bank to launch your test session.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {SUBJECT_BANKS.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSubjectChange(sub.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600/10 border-indigo-500/60 shadow-lg shadow-indigo-950/20'
                      : 'bg-zinc-800/40 border-zinc-700/60 hover:bg-zinc-800/70 hover:border-zinc-600'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                        {sub.title}
                      </h3>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-indigo-500 text-white' : 'border border-zinc-600'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2">{sub.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-3 border-t border-zinc-800/80 mt-3">
                    <span>{sub.totalAvailableQuestions}+ Qs</span>
                    <span className="text-indigo-400">{sub.categoryList.length} Sections</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Filter Pills (if built-in subject) */}
          {currentSubject.categoryList.length > 0 && !currentSubject.isCustomAI && (
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Filter Sections</span>
                <span>{selectedCategories.length === 0 ? 'All Sections' : `${selectedCategories.length} Selected`}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {currentSubject.categoryList.map((cat, idx) => {
                  const isChecked = selectedCategories.length === 0 || selectedCategories.includes(cat);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition ${
                        isChecked
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                          : 'bg-zinc-800/40 text-zinc-400 border-zinc-700/60 hover:text-zinc-200'
                      }`}
                    >
                      <CheckSquare className={`w-3.5 h-3.5 ${isChecked ? 'text-indigo-400' : 'text-zinc-600'}`} />
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Bento Cell 2: Test Duration (1x1) */}
        <section className="md:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-bold mb-1">Test Duration</h3>
            <p className="text-4xl font-light text-white">
              {timeLimitMinutes} <span className="text-lg text-zinc-500">min</span>
            </p>
          </div>

          <div className="space-y-2">
            <input
              id="slider-test-time-limit"
              type="range"
              min="1"
              max="60"
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${(timeLimitMinutes / 60) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {timePresets.map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setTimeLimitMinutes(mins)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-lg transition border ${
                  timeLimitMinutes === mins
                    ? 'bg-indigo-600 text-white border-indigo-400 font-bold'
                    : 'bg-zinc-800/60 text-zinc-400 border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          <p className="text-[10px] text-zinc-500">Allocation: {timeLimitMinutes === 60 ? '1 Hour Maximum' : `${timeLimitMinutes} minutes timer`}.</p>
        </section>

        {/* Bento Cell 3: Question Volume (1x1) */}
        <section className="md:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-bold mb-1">Question Volume</h3>
            <p className="text-4xl font-light text-white">
              {questionCount} <span className="text-lg text-zinc-500">/ 200</span>
            </p>
          </div>

          <div className="space-y-2">
            <input
              id="slider-test-question-count"
              type="range"
              min="1"
              max="200"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex flex-wrap gap-1">
              {questionPresets.map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-lg transition border ${
                    questionCount === cnt
                      ? 'bg-indigo-600 text-white border-indigo-400 font-bold'
                      : 'bg-zinc-800/60 text-zinc-400 border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {cnt} Qs
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-indigo-400 pt-1">
            <span>{questionCount > 100 ? 'High Density' : 'Standard Load'}</span>
            <span className="bg-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-300">
              {questionCount} Items
            </span>
          </div>
        </section>

        {/* Bento Cell 4: Review Settings & Shuffling (2x1) */}
        <section className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-white">Wrong Answer Analysis</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Receive instant justifications and AI Tuition explanations for every missed question during post-test corrections.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-3 sm:pt-0 sm:pl-6 text-xs text-zinc-300">
            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span>Shuffle Order</span>
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) => setShuffleQuestions(e.target.checked)}
                className="rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
            </label>
            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span>Shuffle Choices</span>
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) => setShuffleOptions(e.target.checked)}
                className="rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
            </label>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setMode('exam')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                  mode === 'exam' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                Exam
              </button>
              <button
                type="button"
                onClick={() => setMode('practice')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                  mode === 'practice' ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                Practice
              </button>
            </div>
          </div>
        </section>

        {/* Bento Cell 5: Primary Launch Action (Full Width Banner) */}
        <section className="md:col-span-4 flex flex-col sm:flex-row gap-4">
          <div
            id="btn-start-cbt-test"
            onClick={handleLaunch}
            className="flex-1 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:brightness-110 transition rounded-3xl p-6 sm:p-8 flex items-center justify-between cursor-pointer border border-indigo-500/30 shadow-2xl shadow-indigo-950/40 group"
          >
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Initialize CBT Session
              </h2>
              <p className="text-indigo-200 text-xs sm:text-sm opacity-90">
                {currentSubject.title} • {questionCount} Questions • {timeLimitMinutes} Minute Limit ({mode.toUpperCase()} Mode)
              </p>
            </div>
            <div className="w-14 h-14 bg-white/10 group-hover:bg-white/20 transition rounded-full flex items-center justify-center border border-white/20 shrink-0">
              <Play className="w-7 h-7 text-white fill-white ml-0.5" />
            </div>
          </div>

          <div className="w-full sm:w-64 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center shrink-0">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Engine Readiness</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">100% Ready</p>
            <p className="text-[11px] text-zinc-500 mt-1">Instant Auto-Grading & Corrections</p>
          </div>
        </section>

      </div>

    </div>
  );
};

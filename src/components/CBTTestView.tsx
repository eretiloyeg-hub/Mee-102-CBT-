import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, X, Check, Calculator, AlertTriangle, CheckCircle2, HelpCircle, Send, Sparkles, RefreshCw } from 'lucide-react';
import { Question, TestConfig, UserAnswer, TestResult } from '../types';

interface CBTTestViewProps {
  questions: Question[];
  config: TestConfig;
  onSubmitTest: (result: TestResult) => void;
  openCalculator: () => void;
}

export const CBTTestView: React.FC<CBTTestViewProps> = ({
  questions,
  config,
  onSubmitTest,
  openCalculator,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(config.timeLimitMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showPracticeExplanation, setShowPracticeExplanation] = useState<boolean>(false);
  const [isGridOpenMobile, setIsGridOpenModal] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = userAnswers[currentQuestion.id] || {
    questionId: currentQuestion.id,
    selectedIndex: null,
    timeSpentSeconds: 0,
    isFlagged: false,
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Handle Option Selection
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {
          questionId: currentQuestion.id,
          timeSpentSeconds: 0,
          isFlagged: false,
        }),
        selectedIndex: optionIndex,
      },
    }));

    if (config.mode === 'practice') {
      setShowPracticeExplanation(true);
    }
  };

  // Clear Option Choice
  const handleClearChoice = () => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {
          questionId: currentQuestion.id,
          timeSpentSeconds: 0,
          isFlagged: false,
        }),
        selectedIndex: null,
      },
    }));
    setShowPracticeExplanation(false);
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {
          questionId: currentQuestion.id,
          selectedIndex: null,
          timeSpentSeconds: 0,
        }),
        isFlagged: !(prev[currentQuestion.id]?.isFlagged || false),
      },
    }));
  };

  // Keyboard Navigation Shortcuts (A, B, C, D, Arrows, F, C)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') handleSelectOption(0);
      else if (key === 'B' || key === '2') handleSelectOption(1);
      else if (key === 'C' || key === '3') handleSelectOption(2);
      else if (key === 'D' || key === '4') handleSelectOption(3);
      else if (e.key === 'ArrowRight') {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setShowPracticeExplanation(false);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setShowPracticeExplanation(false);
        }
      } else if (key === 'F') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, questions.length]);

  // Final Submit Calculation
  const handleFinalSubmit = useCallback(() => {
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans || ans.selectedIndex === null) {
        unattemptedCount++;
      } else if (ans.selectedIndex === q.correctIndex) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalQuestions = questions.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const totalTimeSeconds = config.timeLimitMinutes * 60 - timeRemaining;

    const testResult: TestResult = {
      id: `result-${Date.now()}`,
      timestamp: Date.now(),
      subjectTitle: config.subjectTitle,
      totalQuestions,
      scorePercentage,
      correctCount,
      wrongCount,
      unattemptedCount,
      totalTimeSeconds,
      timeLimitMinutes: config.timeLimitMinutes,
      mode: config.mode,
      questions,
      userAnswers,
    };

    onSubmitTest(testResult);
  }, [questions, userAnswers, config, timeRemaining, onSubmitTest]);

  const answeredCount = (Object.values(userAnswers) as UserAnswer[]).filter((a) => a.selectedIndex !== null).length;
  const flaggedCount = (Object.values(userAnswers) as UserAnswer[]).filter((a) => a.isFlagged).length;
  const unattemptedCount = questions.length - answeredCount;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimerCritical = timeRemaining <= 300; // 5 mins

  return (
    <div id="cbt-exam-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-zinc-100">
      
      {/* Top Test Navigation & Progress Ribbon */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm shadow-xl">
        
        {/* Left info */}
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>{config.subjectTitle}</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              {config.mode === 'exam' ? 'EXAM MODE' : 'PRACTICE MODE'}
            </span>
          </h2>
          <div className="text-xs text-zinc-400 mt-0.5">
            Question <span className="font-bold text-indigo-400">{currentIndex + 1}</span> of {questions.length}
            {currentQuestion.category && <span className="ml-2 text-zinc-500">• Section: {currentQuestion.category}</span>}
          </div>
        </div>

        {/* Timer Bar */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border font-mono ${
          isTimerCritical 
            ? 'bg-rose-950/60 border-rose-500/50 text-rose-300 animate-pulse' 
            : 'bg-zinc-950 border-zinc-800 text-cyan-400'
        }`}>
          <div className="text-[11px] uppercase font-bold text-slate-400">Time Left:</div>
          <div className="text-lg font-black tracking-wider">{formatTimer(timeRemaining)}</div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCalculator}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700/80 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Calculator"
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Calc</span>
          </button>

          <button
            id="btn-open-question-grid-mobile"
            onClick={() => setIsGridOpenModal(true)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition lg:hidden text-xs font-semibold"
          >
            Grid ({answeredCount}/{questions.length})
          </button>

          <button
            id="btn-submit-exam-trigger"
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/20 flex items-center gap-1.5 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>

      </div>

      {/* Main Examination Layout: Left (Question & Options) | Right (Question Navigation Matrix) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column (Question Card) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[420px] flex flex-col justify-between space-y-6">
            
            {/* Question Header & Category */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-800">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20">
                  QUESTION #{currentIndex + 1}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleFlag}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                      currentAnswer.isFlagged
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${currentAnswer.isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>{currentAnswer.isFlagged ? 'Flagged for Review' : 'Flag Question'}</span>
                  </button>

                  {currentAnswer.selectedIndex !== null && (
                    <button
                      onClick={handleClearChoice}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-rose-900/40 text-zinc-400 hover:text-rose-300 transition"
                      title="Clear answer choice"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-zinc-100 leading-relaxed tracking-wide">
                {currentQuestion.questionText}
              </h3>

              {/* Optional Question Image */}
              {currentQuestion.imageUrl && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-zinc-800 max-h-60 bg-zinc-950 flex items-center justify-center p-2">
                  <img src={currentQuestion.imageUrl} alt="Question diagram" className="max-h-56 object-contain" />
                </div>
              )}
            </div>

            {/* Multiple Choice Options (A, B, C, D) */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, optIdx) => {
                const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
                const isSelected = currentAnswer.selectedIndex === optIdx;

                // Practice mode instant checks
                let optionStyle = "bg-zinc-950/80 border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/50 text-zinc-200";
                if (isSelected) {
                  optionStyle = "bg-indigo-950/80 border-indigo-500 text-white shadow-md shadow-indigo-900/30";
                }

                if (config.mode === 'practice' && showPracticeExplanation) {
                  if (optIdx === currentQuestion.correctIndex) {
                    optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                  } else if (isSelected && optIdx !== currentQuestion.correctIndex) {
                    optionStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                  }
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 group ${optionStyle}`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white'
                    }`}>
                      {optionLetter}
                    </div>

                    <div className="text-sm font-medium pt-0.5 leading-normal flex-1">
                      {opt}
                    </div>

                    {config.mode === 'practice' && showPracticeExplanation && optIdx === currentQuestion.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Practice Mode Explanation Box */}
            {config.mode === 'practice' && showPracticeExplanation && currentQuestion.explanation && (
              <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-1.5 text-xs animate-in fade-in">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Practice Solution Explanation:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Bottom Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                id="btn-prev-question"
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                    setShowPracticeExplanation(false);
                  }
                }}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-400 font-mono hidden sm:block">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-sans">A-D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-sans">1-4</kbd> to select
              </div>

              <button
                id="btn-next-question"
                onClick={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                    setShowPracticeExplanation(false);
                  }
                }}
                disabled={currentIndex === questions.length - 1}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-md shadow-indigo-600/20"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: CBT Question Grid Matrix (Desktop) */}
        <div className="hidden lg:block space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl sticky top-20">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider">Question Matrix</h3>
              <span className="text-xs font-mono font-bold text-indigo-400">{answeredCount}/{questions.length}</span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500"></span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500"></span>
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
                <span>Unattempted ({unattemptedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-indigo-400 bg-indigo-950"></span>
                <span>Current</span>
              </div>
            </div>

            {/* Interactive Grid Squares */}
            <div className="max-h-[380px] overflow-y-auto pr-1 grid grid-cols-5 gap-2 custom-scrollbar">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isAnswered = ans && ans.selectedIndex !== null;
                const isFlagged = ans && ans.isFlagged;
                const isCurrent = idx === currentIndex;

                let squareStyle = "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-600";
                if (isAnswered) squareStyle = "bg-emerald-600 text-white border-emerald-500 font-bold";
                if (isFlagged) squareStyle = "bg-amber-500 text-slate-950 font-black border-amber-400";
                if (isCurrent) squareStyle += " ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900";

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPracticeExplanation(false);
                    }}
                    className={`h-9 rounded-lg text-xs font-mono transition flex items-center justify-center border ${squareStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Quick Submit */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition border border-slate-700"
            >
              Finish & Submit Test
            </button>

          </div>
        </div>

      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 text-white animate-in zoom-in duration-150">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base">Submit Examination?</h3>
                <p className="text-xs text-slate-400">Are you sure you want to finish your test now?</p>
              </div>
            </div>

            {/* Summary breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-medium">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-mono font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Answered:</span>
                <span className="font-mono font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Unattempted (Skipped):</span>
                <span className="font-mono font-bold">{unattemptedCount}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Flagged for Review:</span>
                <span className="font-mono font-bold">{flaggedCount}</span>
              </div>
            </div>

            {unattemptedCount > 0 && (
              <p className="text-xs text-amber-300/90 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                Note: You still have <strong>{unattemptedCount} unanswered questions</strong>. Any unanswered questions will be marked incorrect.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Return to Test
              </button>
              <button
                id="btn-confirm-final-submit"
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/30 transition"
              >
                Yes, Submit Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Grid Modal */}
      {isGridOpenMobile && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 lg:hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-5 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">Question Navigator Matrix</h3>
              <button onClick={() => setIsGridOpenModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 grid grid-cols-5 gap-2.5 custom-scrollbar flex-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isAnswered = ans && ans.selectedIndex !== null;
                const isFlagged = ans && ans.isFlagged;
                const isCurrent = idx === currentIndex;

                let squareStyle = "bg-slate-950 text-slate-400 border-slate-800";
                if (isAnswered) squareStyle = "bg-emerald-600 text-white font-bold border-emerald-500";
                if (isFlagged) squareStyle = "bg-amber-500 text-slate-950 font-black border-amber-400";
                if (isCurrent) squareStyle += " ring-2 ring-indigo-400";

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPracticeExplanation(false);
                      setIsGridOpenModal(false);
                    }}
                    className={`h-11 rounded-lg text-xs font-mono transition flex items-center justify-center border ${squareStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

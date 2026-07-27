import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, RotateCcw, Sparkles, Filter, Search, BookOpen, Clock, Loader2, FileText, ArrowRight, AlertTriangle } from 'lucide-react';
import { TestResult, Question } from '../types';

interface TestResultsViewProps {
  result: TestResult;
  onRetakeFull: () => void;
  onRetakeWrongOnly: (wrongQuestions: Question[]) => void;
  onNewTest: () => void;
}

export const TestResultsView: React.FC<TestResultsViewProps> = ({
  result,
  onRetakeFull,
  onRetakeWrongOnly,
  onNewTest,
}) => {
  const [filter, setFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted'>('wrong');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [loadingAiId, setLoadingAiId] = useState<string | null>(null);

  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Extract questions user got wrong
  const wrongQuestions = result.questions.filter((q) => {
    const ans = result.userAnswers[q.id];
    return ans && ans.selectedIndex !== null && ans.selectedIndex !== q.correctIndex;
  });

  const filteredQuestions = result.questions.filter((q) => {
    const ans = result.userAnswers[q.id];
    const isUnattempted = !ans || ans.selectedIndex === null;
    const isCorrect = ans && ans.selectedIndex === q.correctIndex;
    const isWrong = ans && ans.selectedIndex !== null && ans.selectedIndex !== q.correctIndex;

    if (filter === 'wrong' && !isWrong) return false;
    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'unattempted' && !isUnattempted) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        q.questionText.toLowerCase().includes(term) ||
        (q.category && q.category.toLowerCase().includes(term)) ||
        q.options.some((opt) => opt.toLowerCase().includes(term))
      );
    }

    return true;
  });

  // Request deeper AI explanation for a single question
  const fetchAiExplanation = async (q: Question, selectedIndex: number | null) => {
    setLoadingAiId(q.id);
    try {
      const response = await fetch('/api/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q.questionText,
          options: q.options,
          correctIndex: q.correctIndex,
          selectedIndex: selectedIndex,
        }),
      });

      const data = await response.json();
      if (data.success && data.explanation) {
        setAiExplanations((prev) => ({
          ...prev,
          [q.id]: data.explanation,
        }));
      }
    } catch (err) {
      console.error("AI explanation error:", err);
    } finally {
      setLoadingAiId(null);
    }
  };

  // Grade badge determination
  let gradeBadge = { label: 'Passed', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  if (result.scorePercentage >= 80) {
    gradeBadge = { label: 'Excellent Distinction', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
  } else if (result.scorePercentage >= 50) {
    gradeBadge = { label: 'Satisfactory Pass', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  } else {
    gradeBadge = { label: 'Needs Revision', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-zinc-100">
      
      {/* Top Score Banner */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${gradeBadge.color}`}>
              <Award className="w-3.5 h-3.5" />
              <span>{gradeBadge.label}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Test Performance Analysis
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Subject: <span className="font-semibold text-zinc-200">{result.subjectTitle}</span> • Completed in {formatDuration(result.totalTimeSeconds)}
            </p>
          </div>

          {/* Large Score Percentage Circle */}
          <div className="flex flex-col items-center justify-center bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-inner shrink-0 min-w-[150px]">
            <div className="text-4xl sm:text-5xl font-black font-mono bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {result.scorePercentage}%
            </div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
              Final Score
            </span>
          </div>

        </div>

        {/* Breakdown Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-emerald-400 font-mono">{result.correctCount}</div>
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mt-0.5">Correct</div>
          </div>

          <div className="bg-rose-950/30 border border-rose-500/20 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-rose-400 font-mono">{result.wrongCount}</div>
            <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider mt-0.5">Wrong Answers</div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-zinc-400 font-mono">{result.unattemptedCount}</div>
            <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Unattempted</div>
          </div>

          <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-indigo-300 font-mono">{result.totalQuestions}</div>
            <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mt-0.5">Total Questions</div>
          </div>

        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
          
          {/* Target Practice Button for Missed Questions */}
          {wrongQuestions.length > 0 && (
            <button
              id="btn-drill-wrong-questions"
              onClick={() => onRetakeWrongOnly(wrongQuestions)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Drill Missed Questions ({wrongQuestions.length} Qs)</span>
            </button>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onRetakeFull}
              className="px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition border border-zinc-700"
            >
              Retake Entire Test
            </button>
            <button
              onClick={onNewTest}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md"
            >
              Configure New Exam
            </button>
          </div>

        </div>

      </div>

      {/* Corrections Section Header */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Detailed Corrections & Solutions</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review answers, explanations, and model solutions for questions answered incorrectly.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              id="filter-tab-wrong"
              onClick={() => setFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                filter === 'wrong'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Wrong ({result.wrongCount})</span>
            </button>

            <button
              id="filter-tab-correct"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct ({result.correctCount})</span>
            </button>

            <button
              id="filter-tab-all"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({result.totalQuestions})
            </button>
          </div>
        </div>

        {/* Search inside review */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-base">No Questions in this category</h3>
              <p className="text-xs text-slate-400">
                {filter === 'wrong'
                  ? 'Great job! You have zero wrong answers in this category.'
                  : 'Try adjusting your search query or filter options above.'}
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, index) => {
              const originalQuestionNumber = result.questions.findIndex((orig) => orig.id === q.id) + 1;
              const ans = result.userAnswers[q.id];
              const selectedIndex = ans ? ans.selectedIndex : null;
              const isCorrect = selectedIndex === q.correctIndex;
              const isUnattempted = selectedIndex === null;

              return (
                <div
                  key={q.id}
                  className={`bg-slate-900 border rounded-2xl p-6 space-y-5 transition shadow-lg ${
                    isCorrect
                      ? 'border-emerald-500/30'
                      : isUnattempted
                      ? 'border-slate-800'
                      : 'border-rose-500/40 bg-slate-900/90'
                  }`}
                >
                  {/* Header Badge */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-indigo-400">
                        Q#{originalQuestionNumber}
                      </span>
                      {q.category && (
                        <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md">
                          {q.category}
                        </span>
                      )}
                    </div>

                    {/* Outcome Tag */}
                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : isUnattempted ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                          Unattempted (Skipped)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base font-bold text-white leading-relaxed">
                    {q.questionText}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isUserSelected = selectedIndex === optIdx;
                      const isCorrectChoice = optIdx === q.correctIndex;

                      let style = "bg-slate-950/60 border-slate-800 text-slate-300";

                      if (isCorrectChoice) {
                        style = "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold ring-1 ring-emerald-500/30";
                      } else if (isUserSelected && !isCorrectChoice) {
                        style = "bg-rose-950/60 border-rose-500/80 text-rose-200 font-semibold";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${style}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-md font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${
                              isCorrectChoice
                                ? 'bg-emerald-500 text-slate-950'
                                : isUserSelected
                                ? 'bg-rose-500 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {letter}
                            </span>
                            <span>{opt}</span>
                          </div>

                          <div>
                            {isCorrectChoice && (
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                            {isUserSelected && !isCorrectChoice && (
                              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                                Your Pick
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 space-y-2 text-xs">
                    <div className="font-bold text-indigo-300 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Explanation & Solution:</span>
                      </div>

                      {/* AI Tutor Button */}
                      <button
                        onClick={() => fetchAiExplanation(q, selectedIndex)}
                        disabled={loadingAiId === q.id}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-[11px] font-bold border border-indigo-500/30 flex items-center gap-1.5 transition disabled:opacity-50"
                      >
                        {loadingAiId === q.id ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin text-amber-300" />
                            <span>Asking AI...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>Ask AI Tutor</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {q.explanation || "No explanation provided for this question."}
                    </p>

                    {/* AI Expanded Tutor Explanation */}
                    {aiExplanations[q.id] && (
                      <div className="mt-3 pt-3 border-t border-indigo-500/30 text-slate-200 space-y-1 bg-indigo-950/60 p-3 rounded-lg animate-in fade-in">
                        <div className="font-extrabold text-amber-300 text-[11px] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Tutor Deep Breakdown:</span>
                        </div>
                        <p className="whitespace-pre-line text-xs leading-relaxed text-slate-200 font-sans">
                          {aiExplanations[q.id]}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};

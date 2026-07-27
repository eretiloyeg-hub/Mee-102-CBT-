import React from 'react';
import { History, Award, Trash2, ArrowRight, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { TestResult } from '../types';

interface TestHistoryViewProps {
  history: TestResult[];
  onSelectResult: (result: TestResult) => void;
  onClearHistory: () => void;
  onStartNewTest: () => void;
}

export const TestHistoryView: React.FC<TestHistoryViewProps> = ({
  history,
  onSelectResult,
  onClearHistory,
  onStartNewTest,
}) => {
  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-zinc-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
            <History className="w-6 h-6 text-indigo-400" />
            <span>Test Performance History</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Track your past CBT score records, examine progress, and review wrong answer corrections anytime.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 rounded-2xl bg-zinc-900 hover:bg-rose-900/40 text-zinc-300 hover:text-rose-300 text-xs font-semibold border border-zinc-800 transition flex items-center gap-1.5 shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-4 max-w-md mx-auto my-8">
          <Award className="w-12 h-12 text-zinc-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No Exam History Yet</h3>
            <p className="text-xs text-zinc-400">
              When you complete CBT tests or practice drills, your results and corrections will be saved here automatically.
            </p>
          </div>
          <button
            onClick={onStartNewTest}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg"
          >
            Start Your First CBT Test
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((res) => {
            let scoreColor = "text-emerald-400";
            if (res.scorePercentage < 50) scoreColor = "text-rose-400";
            else if (res.scorePercentage < 80) scoreColor = "text-cyan-400";

            return (
              <div
                key={res.id}
                onClick={() => onSelectResult(res)}
                className="bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 rounded-3xl p-5 transition-all shadow-md hover:shadow-xl cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group backdrop-blur-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition">
                      {res.subjectTitle}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800">
                      {res.mode.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-medium">
                    <span>{formatDate(res.timestamp)}</span>
                    <span>•</span>
                    <span>{res.totalQuestions} Questions</span>
                    <span>•</span>
                    <span>Duration: {formatDuration(res.totalTimeSeconds)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                  <div className="text-right">
                    <div className={`text-2xl font-black font-mono ${scoreColor}`}>
                      {res.scorePercentage}%
                    </div>
                    <div className="text-[10px] text-zinc-400 font-semibold uppercase">
                      {res.correctCount}/{res.totalQuestions} Correct ({res.wrongCount} Wrong)
                    </div>
                  </div>

                  <button className="p-2.5 rounded-2xl bg-zinc-800 group-hover:bg-indigo-600 text-zinc-300 group-hover:text-white transition">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

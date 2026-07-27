import React, { useState } from 'react';
import { X, Sparkles, Loader2, BookOpen, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';
import { Question } from '../types';

interface AITopicGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsGenerated: (topicTitle: string, questions: Question[], timeLimitMinutes: number) => void;
}

export const AITopicGeneratorModal: React.FC<AITopicGeneratorModalProps> = ({
  isOpen,
  onClose,
  onQuestionsGenerated,
}) => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [timeLimit, setTimeLimit] = useState<number>(30); // minutes (up to 60)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const popularTopics = [
    "Workshop Practice & Metal fitting",
    "Internal Combustion Engines & Automotive",
    "SAT Higher Mathematics & Algebra",
    "Organic Chemistry & Reaction Mechanisms",
    "React, TypeScript & Modern Web Development",
    "Microeconomics & Financial Principles",
    "Nigerian History & Civic Education",
    "General Physics & Quantum Mechanics"
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage("Please enter a subject or topic name.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          questionCount,
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate questions. Please try again.");
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions were generated. Please refine your topic prompt.");
      }

      onQuestionsGenerated(topic.trim(), data.questions, timeLimit);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || "An error occurred while generating questions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-generator-backdrop" className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div id="ai-generator-card" className="bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden text-white animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-900/80 via-slate-900 to-slate-900 border-b border-indigo-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">AI Custom CBT Generator</h3>
              <p className="text-xs text-indigo-300">Generate custom test questions on ANY subject of your choice</p>
            </div>
          </div>
          <button
            id="btn-close-ai-generator"
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Topic Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Subject / Topic of Choice <span className="text-rose-400">*</span>
            </label>
            <input
              id="input-ai-topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Mechanical Workshop Practice, Quantum Physics, SAT Math..."
              disabled={isLoading}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            />

            {/* Quick Topic Chips */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {popularTopics.map((pt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(pt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-200 text-slate-300 border border-slate-700/60 transition"
                >
                  + {pt}
                </button>
              ))}
            </div>
          </div>

          {/* Config Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {/* Number of Questions (1 - 200) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300">Questions Count</label>
                <span className="text-xs font-bold text-indigo-400 font-mono">{questionCount} Qs</span>
              </div>
              <input
                id="slider-ai-question-count"
                type="range"
                min="5"
                max="200"
                step="5"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
                disabled={isLoading}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5</span>
                <span>50</span>
                <span>100</span>
                <span>200 max</span>
              </div>
            </div>

            {/* Time Limit (1 - 60 minutes) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300">Exam Timer Limit</label>
                <span className="text-xs font-bold text-cyan-400 font-mono">{timeLimit} Mins</span>
              </div>
              <input
                id="slider-ai-time-limit"
                type="range"
                min="5"
                max="60"
                step="5"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value, 10))}
                disabled={isLoading}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5m</span>
                <span>30m</span>
                <span>45m</span>
                <span>60m (1 hr max)</span>
              </div>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Difficulty Standard</label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  disabled={isLoading}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl capitalize transition border ${
                    difficulty === lvl
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              id="btn-generate-ai-questions"
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Synthesizing Exam ({questionCount} Qs)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate CBT Exam Now</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

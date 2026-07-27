import React, { useState } from 'react';
import { BookOpen, Search, Plus, Upload, CheckCircle2, Filter, FileText, Trash2, Edit3, X } from 'lucide-react';
import { Question } from '../types';
import { MEE102_QUESTIONS } from '../data/mee102Questions';

interface QuestionManagerViewProps {
  customQuestions: Question[];
  onAddCustomQuestion: (q: Question) => void;
  onImportQuestions: (qs: Question[]) => void;
  onClearCustomQuestions: () => void;
}

export const QuestionManagerView: React.FC<QuestionManagerViewProps> = ({
  customQuestions,
  onAddCustomQuestion,
  onImportQuestions,
  onClearCustomQuestions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  // New question form state
  const [qText, setQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState<number>(0);
  const [cat, setCat] = useState('Custom');
  const [exp, setExp] = useState('');

  const allQuestions = [...MEE102_QUESTIONS, ...customQuestions];

  const sections = Array.from(new Set(allQuestions.map((q) => q.category || 'General')));

  const filteredQuestions = allQuestions.filter((q) => {
    if (selectedSection !== 'all' && q.category !== selectedSection) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        q.questionText.toLowerCase().includes(term) ||
        q.options.some((o) => o.toLowerCase().includes(term)) ||
        (q.explanation && q.explanation.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !optA.trim() || !optB.trim()) return;

    const newQ: Question = {
      id: `custom-${Date.now()}`,
      questionText: qText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim() || 'N/A', optD.trim() || 'N/A'],
      correctIndex: correctIdx,
      category: cat.trim() || 'Custom',
      explanation: exp.trim() || 'Custom question solution.',
    };

    onAddCustomQuestion(newQ);
    setShowAddModal(false);

    // Reset form
    setQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExp('');
  };

  const handleImportJson = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError(null);
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array of question objects.");
      }

      const formatted: Question[] = parsed.map((item: any, idx: number) => ({
        id: `import-${Date.now()}-${idx}`,
        questionText: item.questionText || item.question || "Untitled Question",
        options: Array.isArray(item.options) ? item.options : ["A", "B", "C", "D"],
        correctIndex: typeof item.correctIndex === 'number' ? item.correctIndex : 0,
        category: item.category || "Imported",
        explanation: item.explanation || "No explanation.",
      }));

      onImportQuestions(formatted);
      setShowImportModal(false);
      setJsonText('');
    } catch (err: any) {
      setImportError(err?.message || "Invalid JSON format.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-zinc-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <span>Question Bank Explorer ({allQuestions.length} Questions)</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Browse built-in exam questions or import custom questions into your test engine.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-3.5 py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold border border-zinc-800 transition flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by text or options..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Sections ({sections.length})</option>
          {sections.map((sec, i) => (
            <option key={i} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      {/* Questions Count Indicator */}
      <div className="text-xs text-zinc-400 font-mono flex items-center justify-between">
        <span>Showing {filteredQuestions.length} of {allQuestions.length} questions</span>
        {customQuestions.length > 0 && (
          <button
            onClick={onClearCustomQuestions}
            className="text-rose-400 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear custom user questions ({customQuestions.length})
          </button>
        )}
      </div>

      {/* Question Cards List */}
      <div className="space-y-3">
        {filteredQuestions.slice(0, 100).map((q, idx) => (
          <div key={q.id} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 space-y-3 hover:border-zinc-700 transition backdrop-blur-sm shadow-md">
            <div className="flex items-center justify-between text-xs border-b border-zinc-800/80 pb-2">
              <span className="font-mono font-bold text-indigo-400">#{idx + 1}</span>
              {q.category && (
                <span className="px-2.5 py-0.5 rounded-lg bg-zinc-950 text-zinc-300 font-medium border border-zinc-800">
                  {q.category}
                </span>
              )}
            </div>

            <h3 className="font-bold text-sm text-white leading-relaxed">{q.questionText}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                return (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                      isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300 font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded font-mono text-[10px] flex items-center justify-center font-bold ${
                      isCorrect ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="truncate">{opt}</span>
                  </div>
                );
              })}
            </div>

            {q.explanation && (
              <p className="text-[11px] text-zinc-400 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
                <strong className="text-zinc-300">Answer Explanation:</strong> {q.explanation}
              </p>
            )}
          </div>
        ))}
        {filteredQuestions.length > 100 && (
          <p className="text-center text-xs text-zinc-500 pt-2 font-mono">
            showing first 100 search matches for peak performance...
          </p>
        )}
      </div>

      {/* Add Custom Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 text-white animate-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base">Add New Question</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Question Statement</label>
                <textarea
                  required
                  rows={2}
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="e.g. Which tool is used for cutting external threads?"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Option A</label>
                  <input
                    required
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Option B</label>
                  <input
                    required
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Option C</label>
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Option D</label>
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Correct Choice</label>
                  <select
                    value={correctIdx}
                    onChange={(e) => setCorrectIdx(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category / Section</label>
                  <input
                    type="text"
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    placeholder="e.g. Workshop Fitting"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Answer Solution Explanation</label>
                <input
                  type="text"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="Explain why this option is correct..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import JSON Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 text-white animate-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base">Import Question Bank (JSON)</h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportJson} className="space-y-3 text-xs">
              {importError && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl">
                  {importError}
                </div>
              )}

              <p className="text-slate-400">
                Paste a JSON array containing question objects with keys: <code className="text-indigo-300 font-mono">questionText</code>, <code className="text-indigo-300 font-mono">options</code>, <code className="text-indigo-300 font-mono">correctIndex</code>.
              </p>

              <textarea
                required
                rows={8}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder={`[
  {
    "questionText": "Sample Question...",
    "options": ["Opt A", "Opt B", "Opt C", "Opt D"],
    "correctIndex": 0,
    "explanation": "Why Option A is correct."
  }
]`}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-[11px] text-emerald-300 focus:outline-none focus:border-indigo-500"
              />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md"
                >
                  Import Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

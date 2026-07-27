import React, { useState } from 'react';
import { X, Delete, RefreshCw } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState<string>('0');
  const [formula, setFormula] = useState<string>('');

  if (!isOpen) return null;

  const handleNum = (val: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const handleOp = (op: string) => {
    setFormula(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
  };

  const handleBackspace = () => {
    if (display.length <= 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleScientificFunc = (func: string) => {
    try {
      const val = parseFloat(display);
      let res = 0;
      if (func === 'sin') res = Math.sin((val * Math.PI) / 180);
      else if (func === 'cos') res = Math.cos((val * Math.PI) / 180);
      else if (func === 'tan') res = Math.tan((val * Math.PI) / 180);
      else if (func === 'sqrt') res = Math.sqrt(val);
      else if (func === 'sq') res = val * val;
      else if (func === 'log') res = Math.log10(val);
      else if (func === 'ln') res = Math.log(val);

      setDisplay(Number.isFinite(res) ? String(Number(res.toFixed(6))) : 'Error');
    } catch {
      setDisplay('Error');
    }
  };

  const handleEquals = () => {
    try {
      const fullExpr = formula + display;
      // Sanitize expression safely using JS Function evaluator with standard math symbols
      const sanitized = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');

      // safe simple math evaluator
      const fn = new Function(`return ${sanitized}`);
      const result = fn();
      setDisplay(Number.isFinite(result) ? String(Number(result.toFixed(8))) : 'Error');
      setFormula('');
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div id="calculator-modal-backdrop" className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div id="calculator-card" className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-white animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-800/90 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-bold text-sm text-slate-200 tracking-wide">CBT Scientific Calculator</h3>
          </div>
          <button
            id="btn-close-calculator"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display Screen */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 text-right font-mono">
          <div className="text-xs text-slate-400 min-h-[1.25rem] truncate">{formula}</div>
          <div className="text-3xl font-extrabold text-cyan-400 truncate tracking-tight">{display}</div>
        </div>

        {/* Scientific & Standard Keys */}
        <div className="p-4 grid grid-cols-5 gap-2 text-sm font-semibold">
          {/* Row 1 Scientific */}
          <button onClick={() => handleScientificFunc('sin')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">sin</button>
          <button onClick={() => handleScientificFunc('cos')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">cos</button>
          <button onClick={() => handleScientificFunc('tan')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">tan</button>
          <button onClick={handleClear} className="p-2.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded-lg text-xs font-bold transition flex items-center justify-center">C</button>
          <button onClick={handleBackspace} className="p-2.5 bg-amber-900/50 hover:bg-amber-800 text-amber-200 rounded-lg text-xs transition flex items-center justify-center">
            <Delete className="w-4 h-4" />
          </button>

          {/* Row 2 */}
          <button onClick={() => handleScientificFunc('sqrt')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">√x</button>
          <button onClick={() => handleScientificFunc('sq')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">x²</button>
          <button onClick={() => handleScientificFunc('log')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">log</button>
          <button onClick={() => handleScientificFunc('ln')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-300 text-xs transition">ln</button>
          <button onClick={() => handleOp('÷')} className="p-2.5 bg-indigo-600/80 hover:bg-indigo-500 rounded-lg text-white font-bold transition">÷</button>

          {/* Numbers 7, 8, 9 */}
          <button onClick={() => handleNum('7')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">7</button>
          <button onClick={() => handleNum('8')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">8</button>
          <button onClick={() => handleNum('9')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">9</button>
          <button onClick={() => handleOp('×')} className="p-3 bg-indigo-600/80 hover:bg-indigo-500 rounded-lg text-white font-bold transition">×</button>
          <button onClick={() => handleNum('(')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs transition">(</button>

          {/* Numbers 4, 5, 6 */}
          <button onClick={() => handleNum('4')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">4</button>
          <button onClick={() => handleNum('5')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">5</button>
          <button onClick={() => handleNum('6')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">6</button>
          <button onClick={() => handleOp('−')} className="p-3 bg-indigo-600/80 hover:bg-indigo-500 rounded-lg text-white font-bold transition">−</button>
          <button onClick={() => handleNum(')')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs transition">)</button>

          {/* Numbers 1, 2, 3 */}
          <button onClick={() => handleNum('1')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">1</button>
          <button onClick={() => handleNum('2')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">2</button>
          <button onClick={() => handleNum('3')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">3</button>
          <button onClick={() => handleOp('+')} className="p-3 bg-indigo-600/80 hover:bg-indigo-500 rounded-lg text-white font-bold transition">+</button>
          <button onClick={() => handleNum('3.14159')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs transition">π</button>

          {/* Bottom Row */}
          <button onClick={() => handleNum('0')} className="col-span-2 p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">0</button>
          <button onClick={() => handleNum('.')} className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg text-slate-100 transition">.</button>
          <button onClick={handleEquals} className="col-span-2 p-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-lg text-slate-950 font-extrabold text-base shadow-md transition">
            =
          </button>
        </div>

      </div>
    </div>
  );
};

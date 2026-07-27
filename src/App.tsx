import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TestSetup } from './components/TestSetup';
import { CBTTestView } from './components/CBTTestView';
import { TestResultsView } from './components/TestResultsView';
import { TestHistoryView } from './components/TestHistoryView';
import { QuestionManagerView } from './components/QuestionManagerView';
import { CalculatorModal } from './components/CalculatorModal';
import { AITopicGeneratorModal } from './components/AITopicGeneratorModal';
import { Question, TestConfig, TestResult } from './types';
import { getQuestionsForSubject } from './data/questionBanks';

export default function App() {
  const [activeTab, setActiveTab] = useState<'setup' | 'test' | 'results' | 'history' | 'questions'>('setup');
  
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeResult, setActiveResult] = useState<TestResult | null>(null);

  const [testHistory, setTestHistory] = useState<TestResult[]>(() => {
    try {
      const saved = localStorage.getItem('apexcbt_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('apexcbt_custom_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apexcbt_history', JSON.stringify(testHistory));
    } catch (e) {
      console.error("Failed saving history:", e);
    }
  }, [testHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('apexcbt_custom_questions', JSON.stringify(customQuestions));
    } catch (e) {
      console.error("Failed saving custom questions:", e);
    }
  }, [customQuestions]);

  // Option shuffler helper that updates correctIndex
  const shuffleQuestionOptions = (q: Question): Question => {
    const originalCorrectOption = q.options[q.correctIndex];
    const shuffledOptions = [...q.options];

    // Fisher-Yates shuffle
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : q.correctIndex,
    };
  };

  // Start a new test session
  const handleStartTest = (config: TestConfig, overrideQuestions?: Question[]) => {
    let preparedQuestions: Question[] = [];

    if (overrideQuestions && overrideQuestions.length > 0) {
      preparedQuestions = [...overrideQuestions];
    } else {
      preparedQuestions = getQuestionsForSubject(config.subjectId, config.questionCount);
      
      // Filter by category if specified
      if (config.selectedCategories && config.selectedCategories.length > 0) {
        const filtered = preparedQuestions.filter((q) => !q.category || config.selectedCategories.includes(q.category));
        if (filtered.length > 0) {
          preparedQuestions = filtered;
        }
      }
    }

    // Shuffle questions if requested
    if (config.shuffleQuestions) {
      for (let i = preparedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preparedQuestions[i], preparedQuestions[j]] = [preparedQuestions[j], preparedQuestions[i]];
      }
    }

    // Limit to question count requested (up to 200)
    preparedQuestions = preparedQuestions.slice(0, Math.min(config.questionCount, 200));

    // Shuffle options if requested
    if (config.shuffleOptions) {
      preparedQuestions = preparedQuestions.map(shuffleQuestionOptions);
    }

    setTestConfig(config);
    setActiveQuestions(preparedQuestions);
    setActiveTab('test');
  };

  // Handle AI Question Generation output
  const handleAiQuestionsGenerated = (topicTitle: string, generatedQuestions: Question[], timeLimitMinutes: number) => {
    const aiConfig: TestConfig = {
      subjectId: 'ai_custom',
      subjectTitle: `AI Exam: ${topicTitle}`,
      questionCount: generatedQuestions.length,
      timeLimitMinutes: timeLimitMinutes,
      mode: 'exam',
      shuffleQuestions: false,
      shuffleOptions: false,
      selectedCategories: ['AI Generated'],
    };

    handleStartTest(aiConfig, generatedQuestions);
  };

  // Handle Exam Completion
  const handleTestSubmitted = (result: TestResult) => {
    setActiveResult(result);
    setTestHistory((prev) => [result, ...prev]);
    setActiveTab('results');
  };

  // Drill wrong questions only
  const handleRetakeWrongOnly = (wrongQuestions: Question[]) => {
    if (!activeResult) return;

    const drillConfig: TestConfig = {
      subjectId: activeResult.id,
      subjectTitle: `Drill: Wrong Answers in ${activeResult.subjectTitle}`,
      questionCount: wrongQuestions.length,
      timeLimitMinutes: Math.max(5, Math.ceil(wrongQuestions.length * 1.5)),
      mode: 'practice',
      shuffleQuestions: true,
      shuffleOptions: false,
      selectedCategories: [],
    };

    handleStartTest(drillConfig, wrongQuestions);
  };

  const handleRetakeFull = () => {
    if (testConfig && activeQuestions.length > 0) {
      handleStartTest(testConfig, activeQuestions);
    } else {
      setActiveTab('setup');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCalculator={() => setIsCalculatorOpen(true)}
        openAIGenerator={() => setIsAIGeneratorOpen(true)}
        isTestActive={activeTab === 'test'}
        timeRemainingSeconds={null}
        subjectTitle={testConfig?.subjectTitle}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'setup' && (
          <TestSetup
            onStartTest={(config) => handleStartTest(config)}
            openAIGenerator={() => setIsAIGeneratorOpen(true)}
          />
        )}

        {activeTab === 'test' && testConfig && activeQuestions.length > 0 && (
          <CBTTestView
            questions={activeQuestions}
            config={testConfig}
            onSubmitTest={handleTestSubmitted}
            openCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {activeTab === 'results' && activeResult && (
          <TestResultsView
            result={activeResult}
            onRetakeFull={handleRetakeFull}
            onRetakeWrongOnly={handleRetakeWrongOnly}
            onNewTest={() => setActiveTab('setup')}
          />
        )}

        {activeTab === 'history' && (
          <TestHistoryView
            history={testHistory}
            onSelectResult={(res) => {
              setActiveResult(res);
              setActiveTab('results');
            }}
            onClearHistory={() => setTestHistory([])}
            onStartNewTest={() => setActiveTab('setup')}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionManagerView
            customQuestions={customQuestions}
            onAddCustomQuestion={(q) => setCustomQuestions((prev) => [q, ...prev])}
            onImportQuestions={(qs) => setCustomQuestions((prev) => [...qs, ...prev])}
            onClearCustomQuestions={() => setCustomQuestions([])}
          />
        )}
      </main>

      {/* Scientific Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* AI Custom Topic Question Generator Modal */}
      <AITopicGeneratorModal
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
        onQuestionsGenerated={handleAiQuestionsGenerated}
      />

      {/* Footer */}
      <footer className="bg-[#09090B] border-t border-zinc-800/80 py-4 px-4 text-center text-xs text-zinc-500 font-medium">
        <p>CogniTest Pro • Bento Grid CBT Exam Simulator • Supports 200 questions & 1-hour timers</p>
      </footer>

    </div>
  );
}

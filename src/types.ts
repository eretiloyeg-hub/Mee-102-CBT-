export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  category?: string;
  explanation?: string;
  imageUrl?: string;
}

export type TestMode = 'exam' | 'practice';

export interface TestConfig {
  subjectId: string;
  subjectTitle: string;
  questionCount: number; // 1 to 200
  timeLimitMinutes: number; // 1 to 60 minutes
  mode: TestMode;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  selectedCategories: string[];
  customTopicPrompt?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedIndex: number | null; // null if unattempted/skipped
  timeSpentSeconds: number;
  isFlagged: boolean;
}

export interface TestResult {
  id: string;
  timestamp: number;
  subjectTitle: string;
  totalQuestions: number;
  scorePercentage: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  totalTimeSeconds: number;
  timeLimitMinutes: number;
  mode: TestMode;
  questions: Question[];
  userAnswers: Record<string, UserAnswer>;
}

export interface QuestionBankSubject {
  id: string;
  title: string;
  description: string;
  categoryList: string[];
  totalAvailableQuestions: number;
  isCustomAI?: boolean;
}

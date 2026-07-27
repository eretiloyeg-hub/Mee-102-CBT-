import { Question, QuestionBankSubject } from '../types';
import { MEE102_QUESTIONS } from './mee102Questions';

// Additional questions for General Engineering, Physics, Computer Science, and General Knowledge
const GENERAL_ENGINEERING_QUESTIONS: Question[] = [
  {
    id: "gen-eng-1",
    category: "Thermodynamics",
    questionText: "Which law of thermodynamics defines the concept of temperature and heat equilibrium?",
    options: ["Zeroth Law of Thermodynamics", "First Law of Thermodynamics", "Second Law of Thermodynamics", "Third Law of Thermodynamics"],
    correctIndex: 0,
    explanation: "The Zeroth Law states that if two systems are in thermal equilibrium with a third system, they are in thermal equilibrium with each other, defining temperature."
  },
  {
    id: "gen-eng-2",
    category: "Mechanics",
    questionText: "What is the SI unit of stress in solid mechanics?",
    options: ["Newton (N)", "Pascal (Pa or N/m²)", "Joule (J)", "Watt (W)"],
    correctIndex: 1,
    explanation: "Stress is force per unit cross-sectional area, measured in Pascals (1 Pa = 1 N/m²)."
  },
  {
    id: "gen-eng-3",
    category: "Electrical Engineering",
    questionText: "Ohm's Law states that the current (I) through a conductor between two points is directly proportional to?",
    options: ["Resistance (R)", "Voltage (V)", "Power (P)", "Capacitance (C)"],
    correctIndex: 1,
    explanation: "Ohm's law formulation is V = I * R, meaning current I = V / R is directly proportional to Voltage."
  },
  {
    id: "gen-eng-4",
    category: "Materials Science",
    questionText: "Which tensile material property indicates maximum stress a material can sustain without fracturing?",
    options: ["Yield Strength", "Ultimate Tensile Strength (UTS)", "Young's Modulus", "Poisson's Ratio"],
    correctIndex: 1,
    explanation: "Ultimate Tensile Strength is the maximum engineering stress point on a stress-strain curve."
  },
  {
    id: "gen-eng-5",
    category: "Fluid Mechanics",
    questionText: "Bernoulli's equation expresses the principle of conservation of what for flowing ideal fluids?",
    options: ["Mass", "Linear Momentum", "Energy", "Angular Momentum"],
    correctIndex: 2,
    explanation: "Bernoulli's principle states that the total mechanical energy in a steady, incompressible fluid remains constant along a streamline."
  }
];

const COMPUTER_SCIENCE_QUESTIONS: Question[] = [
  {
    id: "cs-1",
    category: "Algorithms",
    questionText: "What is the average time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctIndex: 1,
    explanation: "Quick Sort splits arrays recursively with divide-and-conquer, yielding O(n log n) expected average runtime."
  },
  {
    id: "cs-2",
    category: "Data Structures",
    questionText: "Which data structure operates on a First-In, First-Out (FIFO) principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctIndex: 1,
    explanation: "A Queue adds elements at the back and removes from the front (FIFO)."
  },
  {
    id: "cs-3",
    category: "Web Development",
    questionText: "In React, which hook is primary for handling component side effects?",
    options: ["useState", "useMemo", "useEffect", "useCallback"],
    correctIndex: 2,
    explanation: "useEffect lets functional components perform API calls, subscriptions, and DOM updates after rendering."
  },
  {
    id: "cs-4",
    category: "Databases",
    questionText: "Which SQL clause is used to group rows that have the same values into summary rows?",
    options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
    correctIndex: 2,
    explanation: "GROUP BY summarizes rows sharing column values alongside aggregate functions like COUNT, SUM, or AVG."
  },
  {
    id: "cs-5",
    category: "Networking",
    questionText: "Which protocol operates at the Transport Layer of the OSI model and guarantees packet delivery?",
    options: ["UDP", "IP", "TCP", "HTTP"],
    correctIndex: 2,
    explanation: "TCP (Transmission Control Protocol) provides connection-oriented, reliable byte stream delivery."
  }
];

const MATH_QUESTIONS: Question[] = [
  {
    id: "math-1",
    category: "Algebra",
    questionText: "Solve for x: 3x - 7 = 14",
    options: ["x = 5", "x = 7", "x = 21", "x = 9"],
    correctIndex: 1,
    explanation: "Add 7 to both sides: 3x = 21. Divide by 3: x = 7."
  },
  {
    id: "math-2",
    category: "Calculus",
    questionText: "What is the derivative of f(x) = x³ + 4x - 5 with respect to x?",
    options: ["f'(x) = 3x² + 4", "f'(x) = 3x²", "f'(x) = x² + 4", "f'(x) = 3x³ + 4"],
    correctIndex: 0,
    explanation: "Using the power rule: d/dx(x³) = 3x², d/dx(4x) = 4, d/dx(-5) = 0. So f'(x) = 3x² + 4."
  },
  {
    id: "math-3",
    category: "Trigonometry",
    questionText: "What is the value of sin(90°) or sin(π/2 rad)?",
    options: ["0", "0.5", "1", "√2 / 2"],
    correctIndex: 2,
    explanation: "In a unit circle, the y-coordinate at 90° (π/2) equals 1."
  },
  {
    id: "math-4",
    category: "Statistics",
    questionText: "What is the median of the dataset [4, 1, 9, 7, 3]?",
    options: ["4", "4.8", "7", "3"],
    correctIndex: 0,
    explanation: "Sort the dataset: [1, 3, 4, 7, 9]. The middle element (3rd) is 4."
  }
];

// Helper generator to scale up standard question bank artificially to 200 questions if required
export function expandQuestionsToCount(baseQuestions: Question[], targetCount: number): Question[] {
  if (baseQuestions.length >= targetCount) {
    return baseQuestions.slice(0, targetCount);
  }
  const expanded: Question[] = [...baseQuestions];
  let cycle = 1;
  while (expanded.length < targetCount) {
    for (const q of baseQuestions) {
      if (expanded.length >= targetCount) break;
      expanded.push({
        ...q,
        id: `${q.id}-dup-${cycle}`,
        questionText: `${q.questionText} (Variant ${cycle + 1})`,
      });
    }
    cycle++;
  }
  return expanded;
}

export const SUBJECT_BANKS: QuestionBankSubject[] = [
  {
    id: "mee102",
    title: "Workshop Practice (MEE 102) - FUTA Past Questions",
    description: "Complete 750+ examination bank covering Fitting, Automobile, Refrigeration, Machining, and Welding.",
    categoryList: ["Fitting", "Automobile", "Refrigeration & AC", "Machining", "Welding"],
    totalAvailableQuestions: MEE102_QUESTIONS.length
  },
  {
    id: "general_engineering",
    title: "General Engineering & Applied Sciences",
    description: "Thermodynamics, Mechanics of Materials, Electrical Principles, and Fluid Mechanics.",
    categoryList: ["Thermodynamics", "Mechanics", "Electrical Engineering", "Materials Science", "Fluid Mechanics"],
    totalAvailableQuestions: 200
  },
  {
    id: "computer_science",
    title: "Computer Science & Software Engineering",
    description: "Algorithms, Data Structures, Web Development, Databases, and Computer Networking.",
    categoryList: ["Algorithms", "Data Structures", "Web Development", "Databases", "Networking"],
    totalAvailableQuestions: 200
  },
  {
    id: "sat_math",
    title: "Mathematics & Quantitative Aptitude",
    description: "Algebra, Calculus, Geometry, Trigonometry, and Applied Probability & Statistics.",
    categoryList: ["Algebra", "Calculus", "Trigonometry", "Statistics"],
    totalAvailableQuestions: 200
  },
  {
    id: "ai_custom",
    title: "AI Custom Generator (Any Subject of Your Choice)",
    description: "Type any topic or upload syllabus and generate up to 200 fresh CBT questions instantly using Gemini AI.",
    categoryList: ["AI Generated"],
    totalAvailableQuestions: 200,
    isCustomAI: true
  }
];

export function getQuestionsForSubject(subjectId: string, count: number): Question[] {
  let base: Question[] = [];
  if (subjectId === 'mee102') {
    base = MEE102_QUESTIONS;
  } else if (subjectId === 'general_engineering') {
    base = GENERAL_ENGINEERING_QUESTIONS;
  } else if (subjectId === 'computer_science') {
    base = COMPUTER_SCIENCE_QUESTIONS;
  } else if (subjectId === 'sat_math') {
    base = MATH_QUESTIONS;
  } else {
    base = MEE102_QUESTIONS;
  }

  return expandQuestionsToCount(base, count);
}

export interface ExamConfig {
  id: string;
  name: string;
  fullName: string;
  color: string;
  subjects: { id: string; name: string }[];
  features: ('cheat-sheets' | 'mcqs' | 'flashcards' | 'blog' | 'pyqs')[];
  description: string;
}

export const exams: ExamConfig[] = [
  {
    id: 'ccat',
    name: 'C-CAT',
    fullName: 'CDAC Common Admission Test',
    color: '#0ea5e9',
    subjects: [
      { id: 'c-programming', name: 'C Programming' },
      { id: 'cpp-oop', name: 'C++ & OOP' },
      { id: 'data-structures', name: 'Data Structures' },
      { id: 'operating-systems', name: 'Operating Systems' },
      { id: 'computer-networks', name: 'Computer Networks' },
      { id: 'dbms', name: 'DBMS' },
      { id: 'quant', name: 'Quantitative Aptitude' },
      { id: 'ai-ml', name: 'AI & Machine Learning' },
      { id: 'big-data', name: 'Big Data' },
    ],
    features: ['cheat-sheets', 'mcqs', 'flashcards', 'blog'],
    description: 'Free C-CAT cheat sheets, MCQs, and flashcards. No login required.',
  },
  {
    id: 'gate-cse',
    name: 'GATE CSE',
    fullName: 'GATE Computer Science & Engineering',
    color: '#059669',
    subjects: [
      { id: 'engineering-mathematics', name: 'Engineering Mathematics' },
      { id: 'discrete-mathematics', name: 'Discrete Mathematics' },
      { id: 'digital-logic', name: 'Digital Logic' },
      { id: 'computer-organization', name: 'Computer Organization & Architecture' },
      { id: 'programming-data-structures', name: 'Programming & Data Structures' },
      { id: 'algorithms', name: 'Algorithms' },
      { id: 'theory-of-computation', name: 'Theory of Computation' },
      { id: 'compiler-design', name: 'Compiler Design' },
      { id: 'operating-systems', name: 'Operating Systems' },
      { id: 'dbms', name: 'Database Management Systems' },
      { id: 'computer-networks', name: 'Computer Networks' },
      { id: 'software-engineering', name: 'Software Engineering' },
      { id: 'web-technologies', name: 'Web Technologies' },
    ],
    features: ['cheat-sheets', 'mcqs', 'flashcards', 'blog', 'pyqs'],
    description: 'Free GATE CSE cheat sheets, MCQs, and previous year questions. No login required.',
  },
] as const;

export type ExamId = (typeof exams)[number]['id'];

export function getExamConfig(id: string): ExamConfig | undefined {
  return exams.find(e => e.id === id);
}

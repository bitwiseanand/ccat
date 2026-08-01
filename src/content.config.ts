import { defineCollection, z } from 'astro:content';

export const exams = ['ccat', 'gate-cse'] as const;
export type ExamId = (typeof exams)[number];

const cheatSheet = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(60),
    exam: z.enum(exams),
    subject: z.string(),
    topic: z.string(),
    description: z.string().min(120).max(158),
    keywords: z.array(z.string()).max(5).optional(),
    related: z.array(z.string()).max(3).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    lastVerified: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).max(5).optional(),
  }),
});

const blogPost = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(60),
    exam: z.enum(exams),
    category: z.string(),
    description: z.string().min(120).max(158),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readTime: z.string().optional(),
    keywords: z.array(z.string()).max(5).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).max(5).optional(),
  }),
});

const mcqDeck = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().min(5).max(60),
    exam: z.enum(exams),
    subject: z.string(),
    topic: z.string(),
    description: z.string().min(120).max(158),
    relatedCheatsheet: z.string().optional(),
    questions: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      correct: z.number().int().min(0),
      explanation: z.string(),
    })),
  }),
});

const flashcardDeck = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().min(5).max(60),
    exam: z.enum(exams),
    subject: z.string(),
    topic: z.string(),
    description: z.string().min(120).max(158),
    relatedCheatsheet: z.string().optional(),
    cards: z.array(z.object({
      front: z.string(),
      back: z.string(),
    })),
  }),
});

const note = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    topic: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    lastUpdated: z.coerce.date().optional(),
    usedInExams: z.array(z.enum(exams)).optional(),
    order: z.number().optional(),
    relatedCheatsheet: z.string().optional(),
  }),
});

export const collections = {
  'cheatsheets': cheatSheet,
  'blog': blogPost,
  'mcqs': mcqDeck,
  'flashcards': flashcardDeck,
  'notes': note,
};

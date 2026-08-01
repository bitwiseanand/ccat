import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface ContentItem {
  collection: string;
  id: string;
  data: {
    title: string;
    exam: string;
    subject?: string;
    topic?: string;
    description: string;
  };
}

export async function getAllContent(): Promise<ContentItem[]> {
  const [sheets, mcqs, flashcards, blog] = await Promise.all([
    getCollection('cheatsheets'),
    getCollection('mcqs'),
    getCollection('flashcards'),
    getCollection('blog'),
  ]);

  return [
    ...sheets.map(s => ({ ...s, id: s.id.replace(/\.md$/, ''), collection: 'cheat-sheets' })),
    ...mcqs.map(m => ({ ...m, collection: 'mcqs' })),
    ...flashcards.map(f => ({ ...f, collection: 'flashcards' })),
    ...blog.map(b => ({ ...b, id: b.id.replace(/\.md$/, ''), collection: 'blog' })),
  ];
}

export async function getRelatedContent(current: {
  exam: string;
  subject: string;
  topic: string;
  slug: string;
  collection: string;
}, limit = 4): Promise<ContentItem[]> {
  const all = await getAllContent();

  const scored = all
    .filter(item => item.id !== current.slug || item.collection !== current.collection)
    .map(item => {
      let score = 0;
      if (item.data.exam === current.exam) score += 10;
      if (item.data.subject === current.subject) score += 20;
      if (item.data.topic === current.topic) score += 30;
      return { item, score };
    })
    .filter(({ score }) => score >= 30)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ item }) => item);
}

export async function getSubjectContent(exam: string, subject: string) {
  const [sheets, mcqs, flashcards] = await Promise.all([
    getCollection('cheatsheets', s => s.data.exam === exam && s.data.subject === subject),
    getCollection('mcqs', m => m.data.exam === exam && m.data.subject === subject),
    getCollection('flashcards', f => f.data.exam === exam && f.data.subject === subject),
  ]);

  return { sheets, mcqs, flashcards };
}

export async function getExamSubjects(exam: string): Promise<string[]> {
  const sheets = await getCollection('cheatsheets', s => s.data.exam === exam);
  return [...new Set(sheets.map(s => s.data.subject))];
}

export async function getContentByExam(exam: string) {
  const [sheets, mcqs, flashcards, blog] = await Promise.all([
    getCollection('cheatsheets', s => s.data.exam === exam),
    getCollection('mcqs', m => m.data.exam === exam),
    getCollection('flashcards', f => f.data.exam === exam),
    getCollection('blog', b => b.data.exam === exam),
  ]);

  return { sheets, mcqs, flashcards, blog };
}

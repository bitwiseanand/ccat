import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function loadFlashcards(exam?: string): Promise<CollectionEntry<'flashcards'>[]> {
  const all = await getCollection('flashcards');
  if (exam) {
    return all.filter(f => f.data.exam === exam);
  }
  return all;
}

export async function loadFlashcardBySlug(exam: string, slug: string): Promise<CollectionEntry<'flashcards'> | undefined> {
  const all = await getCollection('flashcards');
  return all.find(f => f.data.exam === exam && f.id === `${exam}/${slug}`);
}

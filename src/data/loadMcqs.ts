import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function loadMcqs(exam?: string): Promise<CollectionEntry<'mcqs'>[]> {
  const all = await getCollection('mcqs');
  if (exam) {
    return all.filter(m => m.data.exam === exam);
  }
  return all;
}

export async function loadMcqBySlug(exam: string, slug: string): Promise<CollectionEntry<'mcqs'> | undefined> {
  const all = await getCollection('mcqs');
  return all.find(m => m.data.exam === exam && m.id === `${exam}/${slug}`);
}

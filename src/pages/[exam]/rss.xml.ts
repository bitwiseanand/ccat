import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { exams, getExamConfig } from '../../data/exams';
import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  return exams.map(e => ({ params: { exam: e.id } }));
}

export const GET: APIRoute = async (context) => {
  const exam = context.params.exam as string;
  const examConfig = getExamConfig(exam)!;

  const [sheets, blog] = await Promise.all([
    getCollection('cheatsheets', s => s.data.exam === exam),
    getCollection('blog', b => b.data.exam === exam),
  ]);

  const allItems = [
    ...sheets.map(s => ({
      title: s.data.title,
      pubDate: s.data.lastVerified,
      description: s.data.description,
      link: `/${exam}/cheat-sheets/${s.id.replace(/\.md$/, '').replace(`${exam}/`, '')}/`,
    })),
    ...blog.map(b => ({
      title: b.data.title,
      pubDate: b.data.date,
      description: b.data.description,
      link: `/${exam}/blog/${b.id.replace(/\.md$/, '').replace(`${exam}/`, '')}/`,
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return rss({
    title: `${examConfig.name} Cheat Sheets — ExamCheatSheets`,
    description: `Latest ${examConfig.name} revision notes, cheat sheets, and articles`,
    site: context.site!,
    items: allItems,
    customData: `<language>en-us</language>`,
  });
};

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkPyq from './src/plugins/remark-pyq.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { exams } from './src/data/exams.ts';

// astro:content isn't available inside astro.config.mjs (it's part of the
// Astro runtime, not the Node/Vite config-loading context), so this reads
// the content directly off disk instead.

function readFrontmatterField(filePath, field) {
  const text = fs.readFileSync(filePath, 'utf-8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const re = new RegExp(`^${field}:\\s*"?([^"\\r\\n]*)"?\\s*$`, 'm');
  const m = fm[1].match(re);
  return m ? m[1].trim() : null;
}

function examsWithMdContent(dir) {
  const base = path.resolve(`src/content/${dir}`);
  if (!fs.existsSync(base)) return new Set();
  return new Set(
    fs.readdirSync(base).filter((entry) => {
      const sub = path.join(base, entry);
      return fs.statSync(sub).isDirectory() && fs.readdirSync(sub).some((f) => f.endsWith('.md'));
    })
  );
}

function examsWithJsonContent(dir) {
  const base = path.resolve(`src/content/${dir}`);
  if (!fs.existsSync(base)) return new Set();
  return new Set(
    fs.readdirSync(base).filter((entry) => {
      const sub = path.join(base, entry);
      return fs.statSync(sub).isDirectory() && fs.readdirSync(sub).some((f) => f.endsWith('.json'));
    })
  );
}

function getSitemapData() {
  const examsWithCheatsheets = examsWithMdContent('cheatsheets');
  const examsWithBlog = examsWithMdContent('blog');
  const examsWithMcqs = examsWithJsonContent('mcqs');
  const examsWithFlashcards = examsWithJsonContent('flashcards');

  const withContent = new Set([
    ...examsWithCheatsheets,
    ...examsWithBlog,
    ...examsWithMcqs,
    ...examsWithFlashcards,
  ]);
  const emptyExams = exams.map((e) => e.id).filter((id) => !withContent.has(id));

  // Per-content-type empty hubs (e.g. an exam that has cheat sheets but no
  // MCQs yet) mirror the noIndex logic on those pages — kept in sync here
  // so the sitemap never lists a page that's actually noindexed.
  const emptyHubPaths = new Set();
  for (const exam of exams.map((e) => e.id)) {
    if (!examsWithCheatsheets.has(exam)) emptyHubPaths.add(`/${exam}/cheat-sheets/`);
    if (!examsWithBlog.has(exam)) emptyHubPaths.add(`/${exam}/blog/`);
    if (!examsWithMcqs.has(exam)) emptyHubPaths.add(`/${exam}/mcqs/`);
    if (!examsWithFlashcards.has(exam)) emptyHubPaths.add(`/${exam}/flashcards/`);
  }

  // Same thin-content guard, applied to /notes/ — if the notes collection
  // is ever emptied out entirely, don't index a blank hub page. Also
  // exclude individual stub subjects (an overview with zero real sections
  // underneath it) — mirrors the noIndex check in notes/[...slug].astro.
  const notesBase = path.resolve('src/content/notes');
  const hasAnyNotes =
    fs.existsSync(notesBase) &&
    fs.readdirSync(notesBase).some((entry) => {
      const sub = path.join(notesBase, entry);
      return fs.statSync(sub).isDirectory() && fs.readdirSync(sub).some((f) => f.endsWith('.md'));
    });
  if (!hasAnyNotes) emptyHubPaths.add('/notes/');

  if (fs.existsSync(notesBase)) {
    for (const subject of fs.readdirSync(notesBase)) {
      const subjectDir = path.join(notesBase, subject);
      if (!fs.statSync(subjectDir).isDirectory()) continue;
      const sectionCount = fs
        .readdirSync(subjectDir)
        .filter((f) => f.endsWith('.md') && f !== 'overview.md').length;
      if (sectionCount === 0) emptyHubPaths.add(`/notes/${subject}/`);
    }
  }

  // Map each real page URL to its most recent known content date, so the
  // sitemap reflects actual freshness instead of stamping every URL with
  // build time.
  const lastmodByPath = new Map();

  for (const kind of ['cheatsheets', 'blog']) {
    const base = path.resolve(`src/content/${kind}`);
    if (!fs.existsSync(base)) continue;
    for (const exam of fs.readdirSync(base)) {
      const examDir = path.join(base, exam);
      if (!fs.statSync(examDir).isDirectory()) continue;
      for (const file of fs.readdirSync(examDir)) {
        if (!file.endsWith('.md')) continue;
        const slug = file.replace(/\.md$/, '');
        const full = path.join(examDir, file);
        const d = readFrontmatterField(full, 'updatedDate') ||
                   readFrontmatterField(full, 'lastVerified') ||
                   readFrontmatterField(full, 'date');
        if (d) {
          const urlKind = kind === 'cheatsheets' ? 'cheat-sheets' : 'blog';
          lastmodByPath.set(`/${exam}/${urlKind}/${slug}/`, new Date(d));
        }
      }
    }
  }

  // Notes live at /notes/<subject>/ (overview.md) and /notes/<subject>/<section>/
  // rather than /notes/<exam>/<slug>/, so they need their own path shape here.
  if (fs.existsSync(notesBase)) {
    for (const subject of fs.readdirSync(notesBase)) {
      const subjectDir = path.join(notesBase, subject);
      if (!fs.statSync(subjectDir).isDirectory()) continue;
      for (const file of fs.readdirSync(subjectDir)) {
        if (!file.endsWith('.md')) continue;
        const slug = file.replace(/\.md$/, '');
        const full = path.join(subjectDir, file);
        const d = readFrontmatterField(full, 'lastUpdated');
        if (!d) continue;
        const urlPath = slug === 'overview' ? `/notes/${subject}/` : `/notes/${subject}/${slug}/`;
        lastmodByPath.set(urlPath, new Date(d));
      }
    }
  }

  return { emptyExams, emptyHubPaths, lastmodByPath };
}

const { emptyExams, emptyHubPaths, lastmodByPath } = getSitemapData();

// Real per-URL lastmod, derived from content dates where we have them —
// dates are attached via the sitemap entry's own lastmod when available;
// fall back to build time only for pages with no content date (hubs, etc).
export default defineConfig({
  site: 'https://examcheatsheets.com',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (emptyExams.some((exam) => page.includes(`/${exam}/`))) return false;
        if (emptyHubPaths.has(pathname)) return false;
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lastmod = lastmodByPath.get(path);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkPyq],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});

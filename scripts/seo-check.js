import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Note: this deliberately does NOT import 'astro:content' — that virtual
// module only exists inside Astro's own build/dev pipeline, not under a
// plain `node scripts/seo-check.js` invocation. Reading frontmatter/JSON
// directly off disk keeps this runnable as a standalone script.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function parseFrontmatter(text) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!fm) return data;
  for (const line of fm[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^"(.*)"$/, '$1');
    data[key] = value;
  }
  return data;
}

function loadMarkdownItems(kind) {
  const base = path.join(root, 'src/content', kind);
  const items = [];
  if (!fs.existsSync(base)) return items;
  for (const exam of fs.readdirSync(base)) {
    const examDir = path.join(base, exam);
    if (!fs.statSync(examDir).isDirectory()) continue;
    for (const file of fs.readdirSync(examDir)) {
      if (!file.endsWith('.md')) continue;
      const full = path.join(examDir, file);
      const data = parseFrontmatter(fs.readFileSync(full, 'utf-8'));
      items.push({ collection: kind, id: `${kind}/${exam}/${file.replace(/\.md$/, '')}`, data });
    }
  }
  return items;
}

function loadJsonItems(kind) {
  const base = path.join(root, 'src/content', kind);
  const items = [];
  if (!fs.existsSync(base)) return items;
  for (const exam of fs.readdirSync(base)) {
    const examDir = path.join(base, exam);
    if (!fs.statSync(examDir).isDirectory()) continue;
    for (const file of fs.readdirSync(examDir)) {
      if (!file.endsWith('.json')) continue;
      const full = path.join(examDir, file);
      const data = JSON.parse(fs.readFileSync(full, 'utf-8'));
      items.push({ collection: kind, id: `${kind}/${exam}/${file.replace(/\.json$/, '')}`, data });
    }
  }
  return items;
}

function loadNotesItems() {
  const base = path.join(root, 'src/content/notes');
  const items = [];
  if (!fs.existsSync(base)) return items;
  for (const subject of fs.readdirSync(base)) {
    const subjectDir = path.join(base, subject);
    if (!fs.statSync(subjectDir).isDirectory()) continue;
    for (const file of fs.readdirSync(subjectDir)) {
      if (!file.endsWith('.md')) continue;
      const full = path.join(subjectDir, file);
      const data = parseFrontmatter(fs.readFileSync(full, 'utf-8'));
      items.push({ collection: 'notes', id: `notes/${subject}/${file.replace(/\.md$/, '')}`, data });
    }
  }
  return items;
}

function checkSEO() {
  const issues = [];

  const sheets = loadMarkdownItems('cheatsheets');
  const blog = loadMarkdownItems('blog');
  const mcqs = loadJsonItems('mcqs');
  const flashcards = loadJsonItems('flashcards');
  const notes = loadNotesItems();

  const allContent = [...sheets, ...blog, ...mcqs, ...flashcards];
  const descriptions = new Map();

  for (const item of allContent) {
    const slug = item.id;
    const desc = item.data.description || '';
    const title = item.data.title || '';

    if (desc.length < 120) {
      issues.push(`[${slug}] Description too short: ${desc.length} chars (min 120)`);
    }
    if (desc.length > 158) {
      issues.push(`[${slug}] Description too long: ${desc.length} chars (max 158)`);
    }

    if (descriptions.has(desc)) {
      issues.push(`[${slug}] Duplicate description with ${descriptions.get(desc)}`);
    } else {
      descriptions.set(desc, slug);
    }

    if (title.length > 60) {
      issues.push(`[${slug}] Title too long: ${title.length} chars (max 60)`);
    }
    if (title.length < 10) {
      issues.push(`[${slug}] Title too short: ${title.length} chars (min 10)`);
    }

    if (item.data.lastVerified) {
      const age = Date.now() - new Date(item.data.lastVerified).getTime();
      const sixMonths = 180 * 24 * 60 * 60 * 1000;
      if (age > sixMonths) {
        const days = Math.floor(age / (24 * 60 * 60 * 1000));
        issues.push(`[${slug}] Content stale: last verified ${days} days ago (> 180 days)`);
      }
    }

    if (item.collection === 'blog' && !item.data.date) {
      issues.push(`[${slug}] Blog post missing date`);
    }
  }

  const noteDescriptions = new Map();
  for (const item of notes) {
    const title = item.data.title || '';
    const desc = item.data.description || '';

    if (!title.trim()) {
      issues.push(`[${item.id}] Missing or empty title`);
    }
    if (!desc.trim()) {
      issues.push(`[${item.id}] Missing or empty description`);
    }
    if (noteDescriptions.has(desc) && desc.trim()) {
      issues.push(`[${item.id}] Duplicate description with ${noteDescriptions.get(desc)}`);
    } else if (desc.trim()) {
      noteDescriptions.set(desc, item.id);
    }
  }

  const sheetSlugs = new Set(sheets.map((s) => s.id.replace(/^cheatsheets\//, '')));
  for (const mcq of mcqs) {
    if (mcq.data.relatedCheatsheet) {
      const expectedSlug = `${mcq.data.exam}/${mcq.data.relatedCheatsheet}`;
      if (!sheetSlugs.has(expectedSlug)) {
        issues.push(`[mcqs/${mcq.id}] Related cheatsheet not found: ${expectedSlug}`);
      }
    }
  }

  if (issues.length > 0) {
    console.error(`❌ ${issues.length} SEO issue(s) found:`);
    issues.forEach((i) => console.error(`  - ${i}`));
    process.exit(1);
  }

  console.log(`✅ All SEO checks passed (${allContent.length + notes.length} items scanned)`);
}

try {
  checkSEO();
} catch (err) {
  console.error('SEO check failed:', err);
  process.exit(1);
}

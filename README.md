# ExamCheatSheets — Multi-Exam Astro Edition

Free, no-login cheat sheets, MCQs, and flashcards for CS exams.

## Supported Exams

| Exam | Subjects | Status |
|------|----------|--------|
| **C-CAT** | C, C++, DSA, OS, Networks, DBMS, Quant, AI/ML, Big Data | ✅ Live |
| **GATE CSE** | Engineering Math, DSA, Algorithms, TOC, Compiler, OS, DBMS, Networks, +4 more | 🚧 Scaffolding |

## Architecture

- **Static-first**: Astro builds everything to static HTML
- **One template per page type**: `[exam]/cheat-sheets/[slug].astro` serves ALL exams
- **Schema-enforced**: Zod validates frontmatter at build time
- **Auto SEO**: Meta tags, structured data, breadcrumbs, Open Graph — all auto-generated
- **Auto internal linking**: RelatedContent component scores by exam+subject+topic
- **Auto TOC**: Extracted from headings, sticky sidebar
- **FAQ Schema**: Optional `faq` frontmatter renders accordion + JSON-LD

## Project Structure

```
src/
  content/
    cheat-sheets/
      ccat/           ← C-CAT cheat sheets (your content)
      gate-cse/       ← GATE CSE cheat sheets (you add)
    blog/
      ccat/           ← C-CAT blog posts
      gate-cse/       ← GATE blog posts
    mcqs/             ← JSON MCQ decks
    flashcards/       ← JSON flashcard decks
  data/
    exams.ts          ← Exam config (add new exams here)
  components/
    SEOHead.astro     ← All meta tags + structured data
    Breadcrumbs.astro ← Visual + schema breadcrumbs
    RelatedContent.astro ← Auto internal links
    FAQ.astro         ← Accordion + FAQPage schema
    TableOfContents.astro ← Sticky TOC
  layouts/
    CheatSheetLayout.astro ← TOC + content + related + FAQ
    BlogLayout.astro       ← Article layout
  pages/
    [exam]/cheat-sheets/[slug].astro  ← One file, all exams
    [exam]/mcqs/[slug].astro
    [exam]/flashcards/[slug].astro
    [exam]/blog/[slug].astro
```

## Quick Start

```bash
npm install

# Migrate your old content (run once)
node scripts/migrate-content.js /path/to/old-repo

# Dev server
npm run dev

# Build (includes SEO checks)
npm run build

# Deploy dist/ to Vercel
```

## Adding a New Exam

1. Add exam to `src/data/exams.ts`
2. Create content folders: `src/content/cheatsheets/new-exam/`
3. Drop in markdown files with proper frontmatter
4. Done — routing, nav, SEO, sitemap all auto-update

## Adding Content

### Cheat Sheet
```markdown
---
title: "Data Structures Cheat Sheet"
exam: "ccat"
subject: "data-structures"
topic: "dsa-overview"
description: "Essential data structures cheat sheet with arrays, linked lists, trees, graphs, and algorithms for C-CAT."
keywords: ["data structures", "linked list", "binary tree", "graph algorithms"]
lastVerified: 2026-01-15
faq:
  - question: "What data structures are most important for C-CAT?"
    answer: "Arrays, linked lists, stacks, queues, binary trees, BST, and graphs carry the highest weightage."
---

# Data Structures

Your markdown content here...
```

### Blog Post
```markdown
---
title: "C-CAT Preparation Strategy"
exam: "ccat"
category: "strategy"
description: "A complete 3-month preparation strategy for C-CAT covering all sections with daily study plans and resources."
date: 2026-01-10
readTime: "8 min"
---
```

### MCQ Deck
```json
{
  "title": "Data Structures MCQs",
  "exam": "ccat",
  "subject": "data-structures",
  "topic": "dsa-overview",
  "description": "25 practice MCQs on data structures with detailed explanations for C-CAT preparation.",
  "relatedCheatsheet": "data-structures-cheat-sheet",
  "questions": [
    {
      "question": "What is the time complexity of binary search?",
      "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      "correct": 1,
      "explanation": "Binary search divides the search space in half each iteration, giving O(log n) time."
    }
  ]
}
```

## SEO Features (All Automatic)

- ✅ Meta title & description per page
- ✅ Open Graph + Twitter Cards
- ✅ Canonical URLs
- ✅ Article / TechArticle schema
- ✅ BreadcrumbList schema
- ✅ FAQPage schema (from frontmatter)
- ✅ Organization schema (homepage)
- ✅ Auto-generated sitemap
- ✅ Per-exam RSS feeds
- ✅ Auto internal linking
- ✅ Pre-build SEO validation (`npm run check`)

## License

MIT — Open source, contributions welcome.

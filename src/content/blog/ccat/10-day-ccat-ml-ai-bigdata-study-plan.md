---
title: "CDAC CCAT Study Plan — ML, AI & Big Data (10-Day Sprint)"
exam: "ccat"
category: "strategy"
description: "A focused 10-day sprint plan for CDAC CCAT's AI, ML, NLP, and Big Data topics. Essential reading for C-CAT aspirants preparing for the exam."
date: 2026-07-10
readTime: "9 min"
---

**Your situation:** 1–2 weeks left, 1–2 hours/day available.
**This plan:** 10 core days, built around the mistakes candidates repeatedly make — not a generic syllabus dump.

## How to fit this into your actual timeline

- **Exactly 7 days?** Merge into 5 double-sessions: Day 1+2, Day 3+4, Day 5+6, Day 7+8, Day 9+10. Heavier (~1.5–2 hrs) but skips nothing important.
- **Closer to 14 days?** Do the 10 days as written, then use the 2 optional days at the end as extra mock-test rounds, with rest days sprinkled in between if you need them.
- **Daily rhythm:** ~60% of your time on concepts/notes, ~40% on solving MCQs and immediately reviewing what you got wrong. Don't skip the practice half — re-reading notes alone won't fix recurring mistakes.

## The 5 recurring trouble spots — drill these every single day, not just their assigned day

| Trouble spot | The trap | The fix to memorize |
|---|---|---|
| **AI capability levels** | Mixing up Reactive / Limited Memory / Theory of Mind / Self-Aware | "Uses recent data to act" = Limited Memory. "Reads human emotion/intent" = Theory of Mind. "Has consciousness" = Self-Aware. "No memory, fixed output" = Purely Reactive. |
| **NLP pipeline order** | Swapping Lexical ↔ Semantic ↔ Syntactic | Fixed order: **Lexical** (split into words) → **Syntactic** (check grammar) → **Semantic** (extract meaning) → **Discourse** (use context from other sentences) → **Pragmatic** (real-world intent, sarcasm) |
| **NoSQL valid types** | Confusing container words (Table/Row/Collection) with real categories | Only 6 real types: **Document, Key-Value, Wide-Column, Graph, Search, Time-Series**. "Collection," "Table," "Row," "Text" are NOT types. |
| **SQL command categories** | DCL vs DML mix-up (GRANT/REVOKE) | DDL = structure (CREATE/ALTER/DROP) · DML = row data (INSERT/UPDATE/DELETE) · **DCL = permissions (GRANT/REVOKE)** · TCL = transactions (COMMIT/ROLLBACK/SAVEPOINT) · DQL = SELECT |
| **ACID properties** | Atomicity vs Durability mix-up | **Atomicity** = all-or-nothing *during* execution. **Durability** = stays saved *after* commit, survives crashes. |

## Day 1 — AI Foundations & The Capability Ladder

*Priority #1 — usually the biggest repeat miss.*

- **Concepts (35–40 min):**
  - History pegs: Dartmouth Conference 1956 (McCarthy coins "AI"), Shakey 1969 (first mobile robot), Deep Blue 1997 (chess vs Kasparov), Watson, AlphaGo, LinearFold (Baidu, COVID RNA folding)
  - Agent–Environment model: every AI system = Agent + Environment. Sensors (perceive) vs Actuators (act). In humans: eyes/ears = sensors, hands/legs/vocal tract = actuators.
  - **The four AI levels**, with one example each:
    1. Purely Reactive — no memory, fixed output (Deep Blue, AlphaGo)
    2. Limited Memory — uses recent/historical data (self-driving cars, chatbots)
    3. Theory of Mind — understands human emotion/intent (theoretical only)
    4. Self-Aware — machine consciousness (purely theoretical)
- **Practice (20–25 min):** 15–20 MCQs mixing history facts with "classify this example into a level" questions. Write a one-line reason for every wrong answer.

## Day 2 — AI Domains & Machine Learning Foundations

- **Concepts (30–35 min):**
  - 3 AI domains: Computer Vision (DeepFace, Google Lens), NLP (chatbots, translation), Data Science (recommendations, forecasting)
  - Hierarchy: AI ⊃ ML ⊃ Deep Learning (DL = multi-layer neural nets)
  - Learning types: Supervised (labeled, Y=f(X)), Unsupervised (no labels), Semi-supervised (mix), Reinforcement (reward-based)
- **Practice (25 min):** 15–20 MCQs

## Day 3 — ML Tasks & Algorithm Matching

*A common recurring mix-up.*

- **Concepts (35–40 min):** Build this table from memory, then check it:
  - Classification → Decision Tree, SVM, Logistic Regression, KNN, Naive Bayes (discrete output, e.g. spam/ham)
  - Regression → Linear Regression, SVR (continuous output, e.g. price)
  - Clustering → K-Means, Hierarchical (unsupervised grouping)
  - Association → Apriori, Eclat (e.g. market basket analysis)
  - SVM is the crossover algorithm — works for both classification and regression.
- **Practice (20–25 min):** 15–20 MCQs purely on "which algorithm solves which task type"

## Day 4 — NLP Pipeline Deep Dive

*The second recurring weak spot.*

- **Concepts (35–40 min):**
  - 5 stages in strict order: Lexical → Syntactic → Semantic → Discourse Integration → Pragmatic (see trouble-spot table above for definitions)
  - NLU (understanding/reading) vs NLG (generating/writing)
  - Write your own one-line example sentence for each of the 5 stages
- **Practice (20–25 min):** 15–20 MCQs, all pipeline-order based. If you miss one, recite the full pipeline out loud before continuing.

## Day 5 — Generative AI Mapping + Cumulative Review (Days 1–4)

- **Concepts (20 min):** Company-to-product map: ChatGPT/DALL-E → OpenAI · Bard/Gemini → Google · Copilot → Microsoft · Watson → IBM · AlphaGo → DeepMind
- **Timed mixed quiz (40 min):** 25–30 MCQs across everything from Days 1–4. This is the real checkpoint for whether the AI-ladder and NLP-pipeline fixes have actually stuck.

## Day 6 — Big Data Fundamentals

- **Concepts (30–35 min):** The 5 Vs — Volume (size), Velocity (speed), Variety (types), Veracity (trustworthiness), Value (usefulness). "Volatile" is NOT a V — a common distractor. Tech stack: Hadoop (storage + processing), Spark (fast in-memory processing), Hive (SQL-like queries on Hadoop), Kafka (streaming).
- **Practice (20–25 min):** 15 MCQs

## Day 7 — SQL Command Categories & NoSQL Types

*Two more weak spots live here.*

- **Concepts (40 min):** Build the SQL command table and the NoSQL valid-types list from the trouble-spot table above. Drill until automatic.
- **Practice (25 min):** 20 MCQs — half on SQL categories, half on "is this a real NoSQL type or a distractor"

## Day 8 — Data Warehousing & ACID/BASE

*The ACID mix-up lives here.*

- **Concepts (30–35 min):** OLTP (real-time transactions) vs OLAP (analytical queries on historical data). 3 DWH schemas: Star, Snowflake, Galaxy. ACID = Atomicity, Consistency, Isolation, Durability (definitions in the trouble-spot table above). BASE (NoSQL's relaxed alternative) = Basically Available, Soft state, Eventual consistency.
- **Practice (20–25 min):** 15–20 MCQs — drill the 4 ACID definitions until you can state them cold.

## Day 9 — Data Engineering Lifecycle & Cloud Basics

- **Concepts (25–30 min):** Lifecycle: Source → Ingestion → Storage → Transformation → Serving. Batch (data at rest) vs Stream (data in motion — Kafka, Spark Streaming) processing. Cloud models: IaaS/PaaS/SaaS. Virtualization: Type-I (bare-metal, used by cloud providers) vs Type-II (runs on host OS, e.g. VirtualBox).
- **Practice (25–30 min):** 20 MCQs covering Days 6–9 (the full Big Data + Databases block)

## Day 10 — Full Mock Test + Error Log Review

- One full-length mixed mock (45–50 MCQs) spanning AI, ML, NLP, Big Data, SQL, and NoSQL — timed if possible
- Immediately review every wrong/skipped answer. Cross-check anything against the trouble-spot table at the top.

## Optional extra days if you have more time

**Day 11:** Second mock test, ideally a different question set. Spend extra time only on whatever came up wrong in Day 10's mock.

**Day 12 (light day, no new content):** Flip through your error log and the trouble-spot table once. Sleep well — under exam pressure, recognition speed matters more than facts crammed the night before.

## Exam-day tactic

With negative marking on CCAT, blind guessing is usually a losing bet — only answer if you can eliminate at least two of the four options first. On the AI-types and NLP-pipeline questions especially, the wrong options are almost always the *adjacent* stage or level, not a random one — use that to narrow down fast.

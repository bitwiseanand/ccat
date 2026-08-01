---
title: "NLP Pipeline Explained"
subject: "artificial-intelligence"
topic: "nlp"
description: "The 5-step NLP pipeline, key techniques like tokenization and lemmatization, and transformer architecture overview."
keywords: ["nlp pipeline", "natural language processing", "tokenization", "lemmatization", "transformer", "bert", "gpt"]
lastUpdated: "2026-07-29"
usedInExams: []
---

# NLP Explained — The 5-Step Pipeline You Need to Memorize

Natural Language Processing assessment questions often test one specific thing: whether you know the **5-step pipeline** and can identify which step a given example belongs to. Let's lock that in.

## What Is NLP?

NLP is the branch of AI focused on enabling machines to read, interpret, and generate human language. It splits into two halves:

```
NLP System
├── NLU (Natural Language Understanding) → Reading / Interpreting meaning
└── NLG (Natural Language Generation)     → Writing / Producing responses
```

**Assessment trap:** NLU is about *understanding* input; NLG is about *producing* output. A question asking "Which component handles sentiment analysis?" → **NLU**. "Which component handles autocomplete or chatbot replies?" → **NLG**.

## The 5-Step NLP Pipeline

This sequence is a favorite for match-the-following and fill-in-the-blank questions:

| Step | Name | What It Does | Example |
|------|------|---------------|---------|
| 1 | Lexical Analysis | Breaks text into sentences/words | "The cat sat" → ["The", "cat", "sat"] |
| 2 | Syntactic Analysis | Checks grammar/structure | "The school goes to boy" → rejected |
| 3 | Semantic Analysis | Extracts literal/dictionary meaning | "Bank" (river) vs. "bank" (money) |
| 4 | Discourse Integration | Meaning depends on surrounding sentences | "It was delicious" — what was? |
| 5 | Pragmatic Analysis | Interprets real-world intent | "Can you pass the salt?" = a request, not a literal question |

**Memory trick:** LSSDP — **L**exical, **S**yntactic, **S**emantic, **D**iscourse, **P**ragmatic. Say it as "Less Stress, Study Daily, Pass."

## Key NLP Techniques — Match Them Correctly

| Technique | Description |
|-----------|--------------|
| Tokenization | Splitting text into words/sentences/subwords |
| Stop Word Removal | Removing common filler words (the, is, at) |
| Stemming | Crude root reduction: "running" → "run" |
| Lemmatization | Dictionary-accurate base form: "better" → "good" |
| POS Tagging | Labeling words as noun/verb/adjective |
| NER | Identifying names, organizations, dates, locations |

**Common assessment trap:** Stemming vs. Lemmatization. Stemming is faster but cruder (can produce non-words); Lemmatization is slower but grammatically accurate. If a question emphasizes "dictionary-correct" output, the answer is Lemmatization.

## Transformer Architecture — The Modern Backbone of NLP

Introduced in the 2017 paper "Attention Is All You Need" (Google), Transformers replaced RNNs as the dominant NLP architecture by using **self-attention** — allowing every word to directly relate to every other word, and enabling parallel (not sequential) processing.

| Model | Developer | Key Feature |
|-------|-----------|--------------|
| BERT | Google | Bidirectional; strong at understanding |
| GPT-3/4 | OpenAI | Generative; strong at text generation |
| T5 | Google | Text-to-text transfer transformer |

**Assessment trap:** BERT is primarily for *understanding* tasks (bidirectional context), while GPT is primarily *generative* (predicts the next word). Don't mix these up on a "which model is best for X" question.

## Quick Recap

- NLU = understanding, NLG = generation
- Pipeline order: Lexical → Syntactic → Semantic → Discourse → Pragmatic
- Stemming = crude/fast, Lemmatization = accurate/dictionary-based
- Transformers use self-attention, not recurrence

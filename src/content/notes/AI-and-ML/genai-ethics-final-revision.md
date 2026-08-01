---
title: "Generative AI, Ethics & Final Revision"
subject: "artificial-intelligence"
topic: "generative-ai"
description: "Overview of Generative AI technologies, risks, AI ethics concerns, and a consolidated revision checklist."
keywords: ["generative ai", "ai ethics", "gan", "llm", "deepfakes", "hallucination"]
lastUpdated: "2026-07-29"
usedInExams: []
---

# Generative AI, Ethics & Final Revision Checklist

Let's close out this series with two commonly tested topics — Generative AI and AI Ethics — plus a consolidated checklist for last-minute revision.

## What Is Generative AI?

Generative AI refers to systems that **create new content** — text, images, audio, video, or code — that resembles but is distinct from their training data. This is different from purely predictive/classification AI, which only labels or scores existing input.

## Key Technologies Behind Gen AI

| Technology | Generates | Examples |
|------------|-----------|----------|
| Large Language Models (LLM) | Text | GPT, Llama |
| Diffusion Models | Images | DALL-E, Stable Diffusion |
| GANs (Generative Adversarial Networks) | Realistic images/video | Deepfakes, synthetic media |

**GAN structure to remember:** A GAN has two competing networks — a **Generator** (creates fake content) and a **Discriminator** (tries to detect fakes). They train against each other until the Generator produces convincing output.

## The Gen AI Pipeline

```
Training Data → Transformer Model → Fine-tuning (RLHF) →
Prompt → Generated Output
```

**RLHF** = Reinforcement Learning from Human Feedback — this is how models like ChatGPT are fine-tuned to align with human preferences after initial training.

## Risks of Generative AI — A Frequently Tested List

| Risk | Description |
|------|--------------|
| Deepfakes | Fake videos/images of real people |
| Misinformation | AI-generated false content |
| Hallucination | Confidently generating incorrect facts |
| Bias | Reflecting biases present in training data |
| Copyright issues | Training on copyrighted content without consent |

## AI Ethics — The Six Major Concerns

| Concern | Key Example |
|---------|--------------|
| Bias & Fairness | Amazon's scrapped hiring AI (gender bias); facial recognition error rates varying by skin tone |
| Privacy | Mass surveillance via facial recognition |
| Accountability | Who's liable for a self-driving car accident? |
| Transparency | "Black box" decisions; EU GDPR Article 22 grants a "right to explanation" |
| Job Displacement | Automation affecting routine roles |
| Autonomous Weapons | AI weapons operating without human oversight |

**Assessment trap:** "Explainable AI (XAI)" is the research field specifically addressing the *transparency* concern — don't confuse it with bias mitigation, which is a separate research area.

## Final Revision Checklist

Use this as your last-minute run-through before any assessment:

- [ ] AI ⊃ ML ⊃ DL hierarchy and the "not all AI is ML" exception
- [ ] Supervised (labeled) vs. Unsupervised (unlabeled) vs. Reinforcement (reward-based)
- [ ] Logistic Regression = classification, despite the name
- [ ] Perceptron can't solve XOR; MLP can
- [ ] CNN = images (convolution + pooling); RNN/LSTM = sequences (hidden state, vanishing gradient)
- [ ] Transformers use self-attention, not recurrence
- [ ] NLP pipeline: Lexical → Syntactic → Semantic → Discourse → Pragmatic
- [ ] NLU = understanding, NLG = generation
- [ ] Classification vs. Detection vs. Semantic vs. Instance Segmentation
- [ ] GAN = Generator + Discriminator
- [ ] Key dates: 1956 (Dartmouth), 1958 (Perceptron), 1997 (Deep Blue), 2016 (AlphaGo), 2017 (Transformer)
- [ ] Six major AI ethics concerns: bias, privacy, accountability, transparency, job displacement, autonomous weapons

## Closing Thought

Technical AI assessments reward precision over general familiarity — the test is less about "do you know AI is a big field" and more about "can you correctly distinguish similar-sounding terms under time pressure." Going back through this series with the comparison tables and traps highlighted should give you a strong, exam-ready foundation.

Good luck with your preparation!

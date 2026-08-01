---
title: "Supervised vs Unsupervised vs Reinforcement Learning"
subject: "artificial-intelligence"
topic: "machine-learning"
description: "Full breakdown of the three main types of machine learning with examples, algorithms, and evaluation metrics."
keywords: ["supervised learning", "unsupervised learning", "reinforcement learning", "classification", "clustering"]
lastUpdated: "2026-07-29"
usedInExams: []
---

# Supervised vs Unsupervised vs Reinforcement Learning — Full Breakdown

This is one of the highest-yield topics for technical assessments. Almost every exam includes at least one question asking you to classify a scenario into one of these three categories — so let's build a system for identifying them instantly.

## The Core Distinguishing Question

Ask yourself: **"Does the training data include labeled correct answers?"**

- **Yes, every example has a known answer** → Supervised Learning
- **No labels at all, just raw data** → Unsupervised Learning
- **No labels, but the system gets feedback (reward/penalty) after acting** → Reinforcement Learning

## 1. Supervised Learning

You have input variables (X) and a known output (Y), and the algorithm learns a mapping function Y = f(X) — like a student learning from a teacher who provides the correct answers.

**Two sub-types:**

| Type | Predicts | Example |
|------|----------|---------|
| Regression | Continuous/numeric values | House price prediction, stock forecasting |
| Classification | Discrete categories | Spam vs. ham email, loan approval |

**Common algorithms:** Linear Regression, Logistic Regression, Decision Tree, Random Forest, SVM, KNN, Naive Bayes.

**Assessment trap:** Logistic Regression has "regression" in the name but is actually used for **classification** (predicting probabilities between 0 and 1), not continuous value prediction. This is one of the most frequently tested gotchas.

## 2. Unsupervised Learning

Only input data (X) exists — no output labels. The algorithm must find hidden structure on its own.

**Two sub-types:**

| Type | Goal | Example |
|------|------|---------|
| Clustering | Group similar data points | Customer segmentation |
| Association | Find items that co-occur | Market basket analysis ("people who buy bread also buy butter") |

**Common algorithms:** K-Means, Hierarchical Clustering, DBSCAN (clustering); Apriori, Eclat, FP-Growth (association).

**Key terms for association rules:**
- **Support** — how frequently the itemset appears
- **Confidence** — how often the rule is correct
- **Lift** — how much better than random chance the rule is

## 3. Reinforcement Learning

No labeled dataset at all. Instead, an **agent** interacts with an **environment**, takes **actions**, and receives **rewards** or penalties, gradually learning the best strategy (**policy**) through trial and error.

**Key terms:** Agent, Environment, State, Action, Reward, Policy, Value Function.

**Famous RL wins:**

| System | Task | Result |
|--------|------|--------|
| AlphaGo | Go | Beat world champion Lee Sedol (2016) |
| OpenAI Five | Dota 2 | Beat professional human teams |
| AlphaStar | StarCraft II | Reached Grandmaster level |
| AlphaFold 2 | Protein folding | Solved a 50-year biology problem |

## Quick Classification Drill

Try these mentally:

1. Predicting whether a tumor is malignant or benign (with historical labeled data) → **Supervised (Classification)**
2. Grouping news articles by topic with no predefined categories → **Unsupervised (Clustering)**
3. Teaching a robot to walk through trial and error with reward signals → **Reinforcement Learning**
4. Predicting next month's sales revenue from historical numeric data → **Supervised (Regression)**
5. Finding that customers who buy diapers also tend to buy beer → **Unsupervised (Association)**

## Evaluation Metrics Cheat Sheet (Supervised Learning)

| Metric | Formula | Use When |
|--------|---------|----------|
| Accuracy | Correct / Total | Balanced datasets |
| Precision | TP / (TP + FP) | False positives are costly |
| Recall | TP / (TP + FN) | False negatives are costly |
| F1-Score | 2×(P×R)/(P+R) | Imbalanced datasets |

Master this classification skill and you'll be able to answer scenario-based ML questions almost on autopilot.

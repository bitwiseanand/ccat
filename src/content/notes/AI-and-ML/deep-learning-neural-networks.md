---
title: "Deep Learning and Neural Networks"
subject: "artificial-intelligence"
topic: "deep-learning"
order: 6
description: "Mechanics of neural networks including training process, backpropagation, activation functions, and key hyperparameters."
keywords: ["deep learning", "neural networks", "backpropagation", "activation functions", "gradient descent"]
lastUpdated: "2026-07-29"
usedInExams: []
---

# Deep Learning & Neural Networks — The Mechanics Behind the Buzzword

"Deep Learning" gets thrown around constantly, but technical assessments tend to test the *mechanics* — how a neural network actually trains — not just the buzzword. Here's the process broken down clearly.

## Why "Deep"?

"Deep" simply refers to the number of hidden layers in a neural network:

- **Shallow network:** 1–2 layers
- **Deep network:** 3+ layers (often dozens or hundreds)

## The Biological Inspiration

Artificial Neural Networks (ANNs) loosely mimic biological neurons:

| Biological | Artificial Equivalent |
|------------|------------------------|
| Dendrites (receive signals) | Input connections |
| Soma (processes signal) | Weighted sum + activation function |
| Axon (sends signal) | Output connection |
| Synapse (junction) | Weighted edge between nodes |

## Layers of a Neural Network

| Layer | Role |
|-------|------|
| Input Layer | Receives raw features |
| Hidden Layer(s) | Performs weighted sums + activation; learns abstract features |
| Output Layer | Produces final prediction |

## The Training Process — Step by Step

This 4-step cycle is a near-guaranteed assessment topic:

**Step 1: Forward Pass**
Input flows through hidden layers to produce a prediction.

**Step 2: Calculate Loss**
Compare the prediction to the correct answer using a loss function (MSE for regression, Cross-Entropy for classification).

**Step 3: Backward Pass (Backpropagation)**
Compute how much each weight contributed to the error, using the chain rule:
`dL/dw = dL/dy × dy/dw`

**Step 4: Update Weights (Gradient Descent)**
`w = w − α × (dL/dw)`
where α (alpha) is the learning rate.

This cycle repeats until the loss stops decreasing (convergence).

## Key Hyperparameters — Memorize the Typical Ranges

| Hyperparameter | Description | Typical Range |
|-----------------|--------------|----------------|
| Learning Rate (α) | Step size for weight updates | 0.001 – 0.1 |
| Batch Size | Samples per weight update | 32, 64, 128 |
| Epochs | Full passes through training data | 10 – 1000 |
| Dropout Rate | Fraction of neurons randomly disabled | 0.2 – 0.5 |

## Activation Functions — A Frequently Tested Table

| Function | Formula | Range | Best Use |
|----------|---------|-------|----------|
| Sigmoid | 1/(1+e⁻ˣ) | (0, 1) | Binary output |
| Tanh | (eˣ−e⁻ˣ)/(eˣ+e⁻ˣ) | (−1, 1) | Hidden layers |
| ReLU | max(0, x) | [0, ∞) | Most hidden layers |
| Leaky ReLU | max(0.01x, x) | (−∞, ∞) | Fixes "dying ReLU" |
| Softmax | eˣⁱ / Σeˣʲ | (0,1), sums to 1 | Multi-class output |

**Assessment trap:** Softmax is for the *output* layer in multi-class classification — not for hidden layers. Don't confuse it with ReLU's role.

## The Perceptron — Where It All Started

A perceptron is the simplest artificial neuron, invented by Frank Rosenblatt in 1958:

```
z = w1x1 + w2x2 + w3x3 + b
y = 1 if z ≥ 0, else 0
```

**Critical limitation:** A single-layer perceptron can only solve *linearly separable* problems — it can implement AND/OR gates but **cannot solve XOR**. This exact limitation is why Multi-Layer Perceptrons (MLPs) with hidden layers were developed — a very commonly tested fact.

## Quick Recap

- Deep = 3+ hidden layers
- Training = Forward Pass → Loss → Backpropagation → Gradient Descent
- Single-layer perceptron can't solve XOR; MLP can

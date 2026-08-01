---
title: "Computer Vision"
subject: "artificial-intelligence"
topic: "computer-vision"
description: "Overview of computer vision pipeline, tasks including classification, detection, and segmentation, and real-world applications."
keywords: ["computer vision", "image classification", "object detection", "semantic segmentation", "cnn"]
lastUpdated: "2026-07-29"
usedInExams: []
---

# Computer Vision — Pipeline, Tasks, and the Terms Assessments Confuse On Purpose

Computer Vision (CV) assessment questions often hinge on one thing: telling apart tasks that *sound* similar but are technically different (classification vs. detection vs. segmentation). Here's the breakdown that keeps them straight.

## What Is Computer Vision?

CV enables machines to interpret visual data — images and video — and take action or make decisions based on that understanding. It relies heavily on deep learning, particularly **Convolutional Neural Networks (CNNs)**.

## The CV Pipeline

```
Image Capture → Preprocessing → Feature Extraction (CNN) →
Classification/Detection → Output/Action
```

- **Preprocessing:** Resizing, normalizing pixel values
- **Feature Extraction:** CNN layers detect edges → shapes → objects
- **Classification/Detection:** Final layer (e.g., Softmax) assigns labels

## The Task Types That Get Confused — Master This Table

| Task | Description | Output |
|------|-------------|--------|
| Image Classification | Assigns one label to the whole image | Class label (e.g., "cat") |
| Object Detection | Locates AND classifies multiple objects | Bounding boxes + labels |
| Semantic Segmentation | Classifies every pixel | Pixel-level map (no distinction between object instances) |
| Instance Segmentation | Segments each object instance separately | Individual object masks |
| Pose Estimation | Detects body keypoints | Skeleton coordinates |

**The trap explained simply:**
- Classification says "there's a cat in this image."
- Detection says "there's a cat *here*" (with a bounding box), and possibly other objects too.
- Semantic segmentation says "these exact pixels are 'cat' pixels" — but if there are two cats, it won't tell them apart.
- Instance segmentation *does* tell the two cats apart as separate objects.

This exact distinction (semantic vs. instance segmentation) is one of the most commonly tested CV nuances.

## Real-World Applications — Match Them Correctly

| Domain | Application | Example |
|--------|-------------|---------|
| Content Moderation | Filtering unsafe images | Social media platforms |
| Facial Recognition | Identity verification | Apple Face ID |
| Image Classification | Object identification | Google Lens |
| Object Detection | Multi-object localization | Autonomous vehicles detecting pedestrians |
| Medical Imaging | Tumor/fracture detection | Radiology AI |
| OCR | Image-to-text conversion | Google Translate camera mode |
| Augmented Reality | Digital overlay on real world | Pokémon Go, Snapchat filters |

## Why CNNs Specifically?

Recall from the neural networks post: CNNs use **local connections** and **parameter sharing**, making them efficient at scanning images for local patterns (edges, textures) without needing a separate parameter for every single pixel connection — something a plain fully-connected network can't do efficiently.

## Quick Recap

- CV pipeline: Capture → Preprocess → Extract Features (CNN) → Classify/Detect → Output
- Classification = one label per image
- Detection = multiple objects + bounding boxes
- Semantic segmentation = pixel-level, no instance separation
- Instance segmentation = pixel-level, WITH instance separation

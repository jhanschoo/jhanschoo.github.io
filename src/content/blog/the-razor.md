---
title: "The Razor"
description: "On Generalization"
pubDate: "2025-07-17"
tags: ["brook", "computer science"]
draft: true
---

## Formalizing generalization

In everyday life, we frequently perform inductive inference, when we treat a new input in a "similar" way to a prototypal input that we have previously encountered that we have identified as "similar" to the new input. The task of generalization with respect to a class of models and prototypes is to select a model from the class that **memorizes** the prototypes as best it can, and then **treats new inputs according to their similarity to the prototypes.**

_Remark._ We shall frequently be talking about Turing machines (TMs) interchangably with their description in a certain encoding. This encoding should be assumed to satisfy the basic property that TMs with more states are encoded to longer strings than TMs with fewer states.

**Definition.** The **Kolmogorov complexity,** or **K-complexity,** of a binary string, is the shortest description of a TM
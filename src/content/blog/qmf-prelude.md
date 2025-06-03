---
title: "Quantum Mechanical Fundamentals: Prelude"
description: "I discuss what I've been doing recently, and outline the next few posts."
pubDate: "2025-05-05"
tags: ["brook", "quantum mechanics", "qmf"]
---
Out of interest, I have been spending some of my time learning some fundamentals of quantum computing through the [*PennyLane Codebook*](https://pennylane.ai/codebook), an outreach and educational resource continually being developed by the quantum computing startup *Xanadu* based in Toronto. The *Codebook* introduces quantum computing concepts through exercises where concepts are developed twice, once in prose, following which a Python exercise is given to reinforce the concepts. Quantum computing algorithms in the exercises largely utilize the *PennyLane* framework. Note that other very similar code-and-lesson resources exist covering largely the same material:

- [IBM Quantum Learning](https://learning.quantum.ibm.com/), the successor to the *Qiskit textbook*, uses exercises in IBM's Python quantum computing framework *Qiskit* for its code counterpart.
- [Microsoft Quantum katas](https://quantum.microsoft.com/en-us/tools/quantum-katas) are a series of katas, using exercises in the *Q\#* programming language for the code counterpart.
- In addition to these, many universities offer courses covering similar fundamental topics.

You have seen me mention the *Pennylane* and *Qiskit* Python frameworks, as well as the *Q\#* programming language. Generally speaking, it is in these frameworks that a practitioner writes quantum circuits (aka. quantum algorithms) in. These frameworks abstract quantum computing primitives from the hardware and simulators available, while providing backends that compile these circuits and send jobs to the target underlying hardware or simulator.

Nevertheless, I became interested in knowing more the quantum-mechanical principles underlying QC. One immediately bumps into quantum mechanical concepts in QC; whether it be in hardware or in simulation. For that reason, I developed this series of posts. In this series, I make an opinionated choice regarding the development that I hope differentiates it from far more comprehensive and standard treatments.

1. I first develop a naïve model to talk about the probabilistic outcome of a fixed light-polarization experiment.
2. I illustrate using waveplates that if we want to talk about small changes to a particular light-polarization experiment/system, then most accessible alterations to the experiment has a notion of "rotation" that is not cleanly described in the naïve framework. We then show that we arrive at the state space of the QM formalism by building an intermediate representation that describes generalized rotations succinctly, such that not all of them immediately alter the probability distribution. I then discuss that this intermediate representation maps to probability distributions with the Born rule.
3. Next I introduce time as the parameter commonly used to describe system evolution. I motivate the Hamiltonian mathematically by the elegance of Stone's theorem, and physically from the desire to represent influences over time, and also to represent them additively.
4. I introduce the spectral theorem and show how that result leads to Stone's theorem, and also generalizes measurement, including to the infinite-dimensional case.
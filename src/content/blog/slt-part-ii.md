---
title: "Singular Learning Theory: Part II—Volume scaling and the Real Log Canonical Threshold"
description: "Sublevel volume, the RLCT, and phase transitions between competing basins."
pubDate: "2026-11-19"
tags:
  [
    "brook",
    "machine learning",
    "singular learning theory",
    "slt",
    "interpretability",
  ]
---

In [Part I](/blog/slt-part-i), we saw how symmetries and redundant units in neural networks turn isolated minima into flat troughs and intersecting zero-loss surfaces $W_0 = \{w \in W : K(w) = 0\}$, where the Fisher information matrix $I(w)$ becomes singular and BIC's $\frac{d}{2}\log n$ volume penalty breaks down. To analyze such singular models without relying on quadratic approximations, Sumio Watanabe developed **Singular Learning Theory (SLT)**, replacing parameter counting with a direct measurement of volume near the optimal set.

## Volume scaling and the Real Log Canonical Threshold

Imagine filling the KL landscape $K(w)$ with water up to a tiny error level $\epsilon > 0$, and measuring the prior volume of the submerged region—the fraction of all parameter configurations whose error falls below $\epsilon$:

$$
V(\epsilon) = \int_{K(w) < \epsilon} \varphi(w) \, dw.
$$

Now watch what happens as we drain the water toward zero ($\epsilon \to 0^+$). For a sufficiently smooth (real-analytic) KL divergence $K(w)$ and a smooth, positive prior $\varphi$ on a bounded (compact) parameter space, Watanabe proved (using Hironaka's theorem on resolution of singularities) that this submerged volume shrinks according to a power law:

$$
V(\epsilon) \propto \epsilon^{\lambda} (-\log \epsilon)^{m - 1},
$$

where the leading exponent $\lambda > 0$ is the **Real Log Canonical Threshold (RLCT)** and the integer $m \ge 1$ is its **multiplicity**.

For readers skipping the asymptotics, the intuition is direct: $\lambda$ measures *how rapidly the pool of good weights dries up as we demand higher accuracy*. A large $\lambda$ means the volume of near-optimal parameters vanishes quickly because most knobs are tightly pinned down; a small $\lambda$ means a broad, forgiving neighborhood of parameters keeps the error low.

Two simple examples illustrate how $\lambda$ both generalizes parameter counting and reveals why singularities are geometrically cheap.

**Example (regular $d$-parameter model).** Suppose $K(w) = w_1^2 + w_2^2 + \dots + w_d^2$ near $w_0 = 0$, with $\varphi$ smooth and positive at the origin. The condition $K(w) < \epsilon$ defines a $d$-dimensional ball of radius $\epsilon^{1/2}$, whose volume scales as $(\epsilon^{1/2})^d = \epsilon^{d/2}$. Reading off the exponent gives $\lambda = d/2$ and $m = 1$. Whenever a model is regular, the RLCT reduces identically to half the parameter count.

**Example (two-parameter cross-singularity).** Now consider $K(w_1, w_2) = w_1^2 w_2^2$ with a uniform prior $\varphi(w_1, w_2) = 1/4$ on $W = [-1, 1]^2$, capturing the intersecting zero-loss lines $w_1 = 0$ and $w_2 = 0$ of a redundant neuron. Compare its shape directly with a regular two-parameter bowl ($w_1^2 + w_2^2 < \epsilon$): the regular bowl confines $(w_1, w_2)$ to a shrinking circular disk of radius $\sqrt{\epsilon}$, whose area scales as $(\sqrt{\epsilon})^2 = \epsilon^1$ ($\lambda = 1$). By contrast, $|w_1 w_2| < \sqrt{\epsilon}$ forms a cross-shaped region whose long hyperbolic arms stretch all the way out along both axes, capturing much more area near the zeros.

To verify the scaling explicitly, fourfold symmetry reduces the prior integral of $1/4$ over $[-1, 1]^2$ to integrating $1$ over the region $w_1 w_2 < \sqrt{\epsilon}$ in the first quadrant $[0, 1]^2$. For $0 < \epsilon < 1$, we split at $w_1 = \sqrt{\epsilon}$: when $0 \le w_1 < \sqrt{\epsilon}$, any $w_2 \in [0, 1]$ satisfies $w_1 w_2 < \sqrt{\epsilon}$; when $\sqrt{\epsilon} \le w_1 \le 1$, we require $w_2 < \sqrt{\epsilon}/w_1$. Thus

$$
V(\epsilon) = \int_0^{\sqrt{\epsilon}} 1 \, dw_1 + \int_{\sqrt{\epsilon}}^{1} \frac{\sqrt{\epsilon}}{w_1} \, dw_1 = \epsilon^{1/2} + \frac{1}{2} \epsilon^{1/2} (-\log \epsilon).
$$

As $\epsilon \to 0^+$, the logarithmic term dominates, so $V(\epsilon) \propto \epsilon^{1/2} (-\log \epsilon)$. Even though the model still has $d = 2$ parameters, its RLCT drops in half from $\lambda = 1$ to $\lambda = 1/2$, with multiplicity $m = 2$.

More generally, different directions in parameter space contribute differently to $\lambda$:

- Active quadratic directions ($K \propto w_i^2$) contribute $1/2$ each, just as in regular models.
- Higher-order degenerate directions ($K \propto w_i^{2k}$ for $k \ge 2$) flatten the valley walls and contribute $1/(2k)$ (for instance, $1/4$ for quartic walls).
- Intersecting slack subspaces (such as $K \propto w_1^2 w_2^2$) share fractional contributions ($1/2$ across the pair rather than $1/2 + 1/2 = 1$).
- Exact continuous symmetry directions, along which $K(w)$ never changes, contribute $0$.

In algebraic geometry, resolution of singularities constructs coordinate transformations that untangle intersecting creases into simple power-law products (monomials) from which $\lambda$ can be read off directly. For empirical machine learning, the key conceptual takeaway is simpler: $\lambda$ automatically discounts symmetries and idle capacity, so $2\lambda$ acts as the model's **effective parameter count**—roughly how many rigid classical knobs this singular geometry behaves like.

## Free energy and competing basins within a network

Plugging this volume-scaling law into the partition function $Z_n$ yields Watanabe's asymptotic expansion for the Bayesian free energy as $n \to \infty$:

$$
F_n = n L_n(w_0) + \lambda \log n - (m - 1) \log \log n + \mathcal{O}_p(1).
$$

Compare this directly with BIC from [Part I](/blog/slt-part-i): the raw dimension penalty $\frac{d}{2} \log n$ is replaced by the geometric penalty $\lambda \log n$, and the singular behavior that broke $\log \det I(w_0)$ is now absorbed cleanly into $\lambda$ and $m$. Crucially, because $\lambda$ depends only on how the sublevel volume $V(\epsilon)$ shrinks as $\epsilon \to 0^+$, it is invariant to adding redundant parameters or reparametrizing symmetries: doubling the width of a network with duplicate neurons inflates $d$, while $\lambda$ remains bounded by the effective complexity of the underlying input-output map.

Notice that the same free-energy decomposition applies not only across separate model families, but also across competing neighborhoods *inside a single network*. For any local basin $U \subset W$, we can restrict the partition function to $U$ and define its **local free energy**

$$
F_n(U) = -\log \int_U \exp\bigl(-n L_n(w)\bigr) \, \varphi(w) \, dw,
$$

which satisfies $F_n(U) \approx n L_n(w_U) + \lambda_U \log n$ (up to lower-order terms) in terms of the local optimum $w_U$ and local RLCT $\lambda_U$ inside $U$.

This gives researchers a precise language for comparing qualitatively different solutions to the same training task. Consider training a transformer on a structured problem such as modular arithmetic, where two distinct basins both fit the training data nearly perfectly:

1. **A memorization basin ($U_{\text{mem}}$, around $w_{\text{mem}}$):** the network fits individual training examples through brittle, ad-hoc combinations of weights. Because most parameters are pinned down to hold specific associations, little slack remains and $\lambda_{\text{mem}}$ is large.
2. **A circuit basin ($U_{\text{circ}}$, around $w_{\text{circ}}$):** the network implements a compact, reusable algorithm in a small subnetwork, leaving the remaining units free to sit on flat, intersecting zero-planes. Because unused capacity adds little to volume contraction, $\lambda_{\text{circ}}$ is substantially smaller.

The difference between their local free energies is

$$
\Delta F_n = F_n(U_{\text{mem}}) - F_n(U_{\text{circ}}) \approx n\bigl(L_n(w_{\text{mem}}) - L_n(w_{\text{circ}})\bigr) + (\lambda_{\text{mem}} - \lambda_{\text{circ}}) \log n.
$$

Because the posterior probability of basin $U$ is $P(U \mid D_n) = \frac{1}{Z_n} \int_U \exp\bigl(-n L_n(w)\bigr)\,\varphi(w)\,dw = \frac{1}{Z_n} e^{-F_n(U)}$ with global partition function $Z_n$, the ratio of posterior mass between the two basins is

$$
\frac{P(U_{\text{circ}} \mid D_n)}{P(U_{\text{mem}} \mid D_n)} = \frac{e^{-F_n(U_{\text{circ}})}}{e^{-F_n(U_{\text{mem}})}} = e^{\Delta F_n}.
$$

Once both basins fit the training set equally well ($L_n(w_{\text{mem}}) \approx L_n(w_{\text{circ}})$), the training-loss gap vanishes and this ratio scales as $n^{\lambda_{\text{mem}} - \lambda_{\text{circ}}}$. Even a modest complexity gap of $\lambda_{\text{mem}} - \lambda_{\text{circ}} = 10$ on $n = 10{,}000$ training examples gives the circuit basin $10{,}000^{10} = 10^{40}$ times more posterior mass than the memorizing solution. Simpler internal representations dominate not merely because we prefer them aesthetically, but because they occupy exponentially larger volumes of parameter space.

## Two-stage training dynamics and phase transitions

Although SGD does not literally sample from the Bayesian posterior, this balance between training fit ($n L_n$) and parameter-space volume ($\lambda \log n$) provides a useful physical analogy for two-stage dynamics and abrupt transitions observed during neural network training:

- **Error-driven descent ($n L_n$ dominates):** Early in training, $L_n(w)$ is large and gradients pull the network toward whichever basin lowers training error fastest. Superficial heuristics or memorization pathways often provide the cleanest initial gradient signal, pulling weights into a high-$\lambda$ basin.
- **Entropic drift ($\lambda \log n$ dominates):** Once training loss approaches its floor, gradients along memorized directions weaken. Persistent mini-batch noise causes SGD to explore rather than stay pinned in narrow canyons, nudging trajectories out of steep, high-$\lambda$ valleys into adjacent, lower-$\lambda$ basins of far greater volume.

Because dropping $\lambda$ requires reorganizing weights so that redundant units release onto intersecting zero-planes, escaping a high-$\lambda$ basin often shows up externally as a sharp **phase transition**—such as delayed generalization in *grokking*, or the sudden emergence of induction heads during language model pretraining.

In [Part III](/blog/slt-part-iii), we turn this theoretical picture into a practical tool—using SGLD to measure the local geometry around the checkpoints that optimization actually visits.

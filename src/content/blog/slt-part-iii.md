---
title: "Singular Learning Theory: Part III—The Local Learning Coefficient and developmental interpretability"
description: "Estimating local effective complexity with SGLD to track circuit formation over training."
pubDate: "2026-11-20"
tags:
  [
    "brook",
    "machine learning",
    "singular learning theory",
    "slt",
    "interpretability",
  ]
---

While the RLCT resolves the paradox of overparameterization in theory, it is a global, asymptotic invariant defined around $W_0$ with respect to the unknown data-generating distribution $q(x)$ as $n \to \infty$. For a real neural network trained on finite data, we do not know $q(x)$ in closed form and cannot resolve algebraic singularities across millions or billions of weights by hand.

To turn Watanabe's invariant into an empirical probe applicable to a specific model checkpoint $w^*$—whether at convergence or partway through training—Lau et al. (2023) introduced the **Local Learning Coefficient (LLC)**, denoted $\hat{\lambda}(w^*)$.

## Localizing the learning coefficient with SGLD

Moving from the global theoretical $\lambda$ to the empirical $\hat{\lambda}(w^*)$ requires two practical substitutions:

1. **Replace $K(w)$ with empirical excess loss:** Instead of measuring divergence from the unknown truth $q(x)$, we measure how much the training loss rises as we step away from the checkpoint via $L_n(w) - L_n(w^*)$.
2. **Localize to the basin around $w^*$:** To measure only the basin currently occupied by $w^*$ rather than letting samples wander across saddles into distant valleys, we add a quadratic tether $\frac{\gamma}{2}\|w - w^*\|^2$ of stiffness $\gamma > 0$, which acts as a local Gaussian prior centered at $w^*$.

Together, these define a localized, tempered posterior centered at $w^*$:

$$
p_\beta(w \mid w^*) \propto \exp\left(-n \beta L_n(w) - \frac{\gamma}{2} \|w - w^*\|^2\right),
$$

where $\beta > 0$ is an inverse temperature parameter controlling how strongly rises in training loss are penalized relative to random noise—canonically set near $\beta = 1 / \log n$ following Watanabe's Widely Applicable Bayesian Information Criterion (WBIC). In terms of expectations under this distribution, the Local Learning Coefficient is defined as

$$
\hat{\lambda}(w^*) = n \beta \left( \mathbb{E}_{w \sim p_\beta}[L_n(w)] - L_n(w^*) \right).
$$

We estimate this average without solving high-dimensional integrals by running **Stochastic Gradient Langevin Dynamics (SGLD)** starting at $w^*$. Intuitively, picture releasing a tethered cloud of noisy random walkers around the checkpoint: at each step, the walkers take a mini-batch gradient step downhill on $n\beta L_n(w) + \frac{\gamma}{2}\|w - w^*\|^2$ (pulling them toward low training loss and back toward $w^*$) while receiving a small random Gaussian kick in all directions. We then measure how much their training loss rises on average above $L_n(w^*)$. Along stiff directions used by an active circuit, random kicks push the walkers up steep walls and raise the average loss; along flat symmetries or unused weights, random kicks barely alter predictions at all, adding nothing to $\hat{\lambda}(w^*)$.

To see how this works out mathematically in a simple quadratic valley, consider the idealized case where $w^*$ sits near a local minimum so that, in principal-axis (eigenbasis) coordinates, $L_n(w) - L_n(w^*) \approx \frac{1}{2}\sum_{i=1}^d a_i (w_i - w_i^*)^2$ with curvatures $a_i \ge 0$. Absorbing the constant factor $\exp(-n\beta L_n(w^*))$ into the normalization of $p_\beta(w \mid w^*)$, each coordinate perturbation $w_i - w_i^*$ is approximately independent and Gaussian:

$$
w_i - w_i^* \sim \mathcal{N}\bigl(0, (n\beta a_i + \gamma)^{-1}\bigr).
$$

Its contribution to $\hat{\lambda}(w^*)$ is therefore

$$
n \beta \, \mathbb{E}\!\left[\frac{1}{2} a_i (w_i - w_i^*)^2\right] = \frac{1}{2} \frac{n \beta a_i}{n \beta a_i + \gamma}.
$$

Summing these per-axis contributions across all $d$ coordinates cleanly separates active directions from flat directions:

- Along a stiff, active direction where $n\beta a_i \gg \gamma$, the fraction approaches $1$, so the coordinate contributes $1/2$ to $\hat{\lambda}(w^*)$—an instance of the equipartition theorem, in which every rigid quadratic direction absorbs the same thermal energy.
- Along a flat symmetry or degenerate direction where $a_i = 0$, the coordinate contributes $0$ to $\hat{\lambda}(w^*)$, while the tether $\gamma > 0$ keeps its variance finite at $1/\gamma$ so the random walkers do not drift away unboundedly.[^1]

## Developmental interpretability: tracking circuits over training

Once we can estimate $\hat{\lambda}(w_t)$ at any checkpoint $w_t$ indexed by training step $t$, we can evaluate it across an entire training run and plot $\hat{\lambda}(w_t)$ alongside the training loss curve. This practice—known as **developmental interpretability**—gives researchers a shared empirical language for structural changes inside a network that are invisible in the loss curve alone. Whereas raw parameter count $d$ stays fixed throughout training and training loss mostly slopes downward, $\hat{\lambda}(w_t)$ rises, plateaus, and falls in distinct episodes as internal circuits assemble and simplify.

### Circuit formation ($\hat{\lambda}$ increases)

At initialization, a network produces largely unstructured outputs; few weights are tightly constrained to a specific computation, so $\hat{\lambda}$ begins low. As training progresses, the model builds progressively richer mechanisms—for instance, a language model advancing from token unigram frequencies to bigram statistics and then to multi-layer induction heads that copy patterns across context.

Forming a new circuit requires recruiting previously unconstrained weights into coordinated roles. Along those directions, the landscape sharpens from flat slack into curved walls, and as those effective degrees of freedom lock into place, $\hat{\lambda}(w_t)$ climbs across the developmental window in which the circuit emerges.

### Compression and pruning ($\hat{\lambda}$ plateaus or drops)

Equally revealing are episodes where $\hat{\lambda}(w_t)$ decreases even while training loss stays flat or continues to improve. A falling LLC indicates that the network is shedding effective degrees of freedom by releasing constrained weights back onto flatter or more degenerate subspaces. This happens in two common ways:

- **Pruning transient heuristics:** early in training, networks often rely on high-parameter local shortcuts to cut loss quickly; once a cleaner general mechanism takes over, the temporary pathways become redundant and decay into zero-curvature subspaces.
- **Algorithmic unification:** in settings such as grokking, shifting from example-by-example memorization to a compact rule collapses many rigid constraints into a small, symmetric subnetwork, turning large portions of weight space back into slack and producing a sharp drop in $\hat{\lambda}(w_t)$.

---

Taken together, these ideas replace static parameter counting with a geometric account of training. Raw parameter count $d$ fails on overparameterized networks because symmetries and redundant units fill parameter space with flat troughs and intersecting zero-loss surfaces where the Fisher information matrix is singular. Watanabe's Real Log Canonical Threshold $\lambda$ replaces coordinate counting with sublevel volume scaling in the free energy, explaining why compact circuits dominate posterior mass and emerge through phase transitions. Finally, the Local Learning Coefficient $\hat{\lambda}(w_t)$ turns this geometric invariant into a practical measurement across checkpoints, letting researchers track when internal structure forms, competes, and compresses during training.

[^1]: In practice, numerical estimates of $\hat{\lambda}(w^*)$ depend on the choice of localization stiffness $\gamma$, inverse temperature $\beta$, and SGLD hyperparameters such as step size and chain length. Practitioners therefore rarely interpret a single isolated estimate as an exact parameter count; instead, they hold these hyperparameters fixed across a run and track relative rises, plateaus, and drops in $\hat{\lambda}(w_t)$ over training.

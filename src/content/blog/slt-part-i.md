---
title: "Singular Learning Theory: Part I—Why classical parameter counting fails"
description: "Classical statistics, Bayesian volume, and singularities in overparameterized models."
pubDate: "2026-11-18"
tags:
  [
    "brook",
    "machine learning",
    "singular learning theory",
    "slt",
    "interpretability",
  ]
---

*This blog post series is based on the final Week 8 session of [OdySEA](https://odysea-ai.org/) conducted by Ming Liang. The session itself was a whirlwind tour forming useful bones on which digestion with the aid of a chatbot was needed to help me plug in holes and form an organized, motivated explanation. The structure, conceptual framing, and outline in what follows originate from me, while the prose exposition was generated with AI. I actively steered the drafting process, stepped in to redirect or rewrite sections where needed, and reviewed the final text. It is simultaneously published at [RAIN-SG's Substack](https://responsibleainetworksg.substack.com/).*

Classical statistical learning theory relies on a simple proxy for model complexity: the number of parameters. Each adjustable weight is treated as an independent degree of freedom that can be tuned to fit noise in the training set. If we fit a tenth-degree polynomial to eight data points, the curve oscillates wildly between them; to keep a model from memorizing noise, we count its parameters, penalize complexity accordingly, and keep the number of degrees of freedom well below the sample size.

Modern neural networks break this picture. Large networks routinely contain far more parameters than training examples, yet they still generalize smoothly rather than memorizing data verbatim. Just as striking is the geometry of how they learn. Instead of sliding uniformly toward a single minimum, training trajectories often pass through long plateaus of little apparent change punctuated by sudden drops in loss, during which internal mechanisms form, reorganize, or simplify. Classical theory predicts the wrong complexity penalties in this regime because its assumptions fail inside neural parameter spaces.

Traditional accounts of overfitting judge a model class by its worst-case capacity—asking whether *some* setting of its parameters could memorize arbitrary noise in the training set, a test that any network with more weights than examples automatically fails. Rather than asking what a model *could* memorize in the worst case, we examine how parameter settings actually organize around good solutions, using a central quantity from Bayesian statistics and statistical physics: the **marginal likelihood** (or **partition function**), and its negative logarithm, the **Bayesian free energy**. By averaging fit across the entire parameter space, free energy captures not merely whether a single weight setting approximates the data well, but *how much volume* of configurations supports that approximation. Although free energy is a Bayesian quantity rather than a literal equation of motion for gradient descent, its trade-off between training fit and parameter volume provides both a useful physical model for why noisy training drifts toward flatter, more redundant basins and a direct way to measure the geometry around real checkpoints.

We include the explicit equations and derivations for technically curious readers comfortable with undergraduate multivariable calculus, linear algebra, and probability. At the same time, every mathematical expression is paired with a geometric explanation so that readers without those prerequisites can read past the symbolic steps and still walk away with a clear intuitive picture of how **Singular Learning Theory (SLT)**, the **Real Log Canonical Threshold (RLCT, $\lambda$)**, and the **Local Learning Coefficient (LLC, $\hat{\lambda}$)** help researchers describe and measure phenomena observed when training overparameterized models—phenomena that classical parameter counting cannot express. The progression across the three parts is as follows:

1. In **Part I**, we frame neural networks as parameterized probabilistic models within the Bayesian framework, see why parameter-space volume illuminates training behavior through the partition function and free energy, examine how classical model selection approximates free energy via the Laplace approximation and the Bayesian information criterion (BIC), and see why symmetries and redundant neurons create singularities that break BIC.
2. In **[Part II](/blog/slt-part-ii)**, we introduce Sumio Watanabe's Singular Learning Theory and the **Real Log Canonical Threshold (RLCT)**, which replaces parameter counting with volume scaling near zero-loss sets and explains why compact circuits capture vastly more posterior volume than memorization, leading to phase transitions during training.
3. In **[Part III](/blog/slt-part-iii)**, we move from the global, theoretical RLCT to its empirical counterpart, the **Local Learning Coefficient (LLC)**, showing how Stochastic Gradient Langevin Dynamics (SGLD) measures local effective complexity across training checkpoints to track circuit formation and pruning.

## Parameterized models and the Bayesian framework

When a practitioner trains a neural network, they run a learning algorithm (such as gradient descent) on a dataset to arrive at one working computer program chosen from a predefined set of possible outputs of that algorithm. All candidate programs in that set share a fixed architecture and differ only in a list of $d$ adjustable numerical weights, $w = (w_1, \dots, w_d) \in W \subseteq \mathbb{R}^d$. Selecting a vector of weights $w$ selects one concrete program from this **parameterized model family**.

At first glance, treating a neural network as a probability distribution can seem unnatural, especially when a model appears to output deterministic numbers or discrete choices. Yet virtually every deep learning model defines, explicitly or implicitly, a probability distribution $p(x \mid w)$ parameterized by its weights $w$. For example, a language model or image classifier with a softmax layer explicitly outputs probabilities over next tokens or class labels, while even a regression network trained with mean-squared error implicitly specifies a Gaussian distribution centered at the network's predicted value.

That probabilistic description also highlights a difference in perspective between engineering and theory. In an applied setting, a practitioner runs a chosen training recipe on a specific dataset to obtain *one* final parameter vector $w^*$ for the task at hand—for instance, whether a fine-tuned classifier performs reliably on a support queue. A researcher studying learning more generally, however, needs a way to reason about the model family $p(x \mid w)$ across arbitrary data distributions without tying every conclusion to a single run, random seed, or optimization recipe.

The **Bayesian framework** provides that common language. Rather than picking out a single vector $w^*$, we start from a **prior density** $\varphi(w)$ assigning initial plausibility across the parameter space $W$, observe $n$ training examples $D_n = \{x_1, \dots, x_n\}$, and update to a **posterior distribution** over all candidate programs:

$$
p(w \mid D_n) \propto \varphi(w) \prod_{i=1}^n p(x_i \mid w).
$$

Taking negative logarithms turns this product into the familiar regularized objective of deep learning: $-\sum_{i=1}^n \log p(x_i \mid w)$ is the total training loss on $D_n$, and $-\log \varphi(w)$ acts as a **regularization term** (such as $L_2$ weight decay under a zero-mean Gaussian prior) that keeps parameter-space volume finite. Whereas standard training runs an optimizer to settle on a single minimum $w^*$ of that objective, conditioning on $D_n$ retains the entire distribution across $W$. Because $p(w \mid D_n)$ depends solely on the model family, the prior, and the dataset—abstracting away optimizer specifics—studying how it concentrates as $n$ grows isolates the geometry of how the architecture represents a task.

## Bayesian volume and training dynamics

What does retaining the full posterior $p(w \mid D_n)$ reveal that looking only at a single optimum $w^*$ misses? Above all, it reveals **parameter-space volume**. Picture the parameter space $W \subseteq \mathbb{R}^d$ as the horizontal floor of a terrain equipped with ordinary Euclidean distance and volume, and assign each point $w$ a vertical elevation equal to its training loss. This forms what practitioners call the **loss landscape**, where well-fitting programs sit at the bottoms of valleys. Compare two valleys whose lowest points reach the exact same minimum loss:

- **A narrow ravine:** moving even a tiny Euclidean distance from the bottom in some directions may cause the training loss to climb steeply.
- **A broad basin:** one can move across a wide Euclidean region around the bottom while the training loss barely rises.

How does this loss landscape translate into the Bayesian posterior $p(w \mid D_n)$? Because lower training loss corresponds to higher data likelihood $\prod_{i=1}^n p(x_i \mid w)$, a low-loss *valley* in the loss landscape becomes a high *peak* of **probability density** in the posterior. At their exact bottom points, both valleys achieve the same minimum loss—and, assuming comparable prior density $\varphi(w)$, the same peak probability density.

In a continuous space $W$, however, a single point has zero volume, so density at one point does not determine how much posterior weight a region holds. What actually measures how strongly the posterior favors a valley is its **probability mass**—the integral of the probability density $p(w \mid D_n)$ over Euclidean volume in that neighborhood. In the narrow ravine, the loss shoots up and the probability density drops off almost immediately away from the floor along those steep directions, leaving a thin ridge of high density with very little total mass. In the broad basin, the loss stays low—and the probability density remains high—across a large Euclidean volume, accumulating vastly more posterior probability mass.

Although gradient-based optimizers such as SGD or Adam do not literally sample from $p(w \mid D_n)$, they traverse this same Euclidean loss landscape under mini-batch gradient noise and finite step sizes, making it hard to stay balanced inside a narrow ravine and biasing trajectories toward broad, high-volume basins. The Bayesian trade-off between *depth* (loss at the valley floor) and *volume* (the Euclidean region over which loss remains low), measured by free energy, therefore captures both the intrinsic geometry of a solution and its pull on noisy optimization.

## Measuring fit and curvature: KL divergence and Fisher information

To describe this landscape geometry precisely, we need one quantity to measure fit and another to measure the steepness of a valley around a minimum.

Suppose the training examples are drawn independently from an underlying data distribution $q(x)$, and recall that each parameter vector $w \in W \subseteq \mathbb{R}^d$ in our model family defines a predicted distribution $p(x \mid w)$. We measure the average discrepancy between the data-generating distribution and the model's predictions using the **Kullback–Leibler (KL) divergence**:

$$
K(w) = D_{\mathrm{KL}}(q \,\|\, p_w) = \int q(x) \log \frac{q(x)}{p(x \mid w)} \, dx,
$$

with integration replaced by summation when $x$ is discrete. Intuitively, $K(w)$ averages the prediction mismatch over all possible data points $x$. It is always nonnegative ($K(w) \ge 0$), and in the **realizable** setting—where the model family is expressive enough to represent $q$ exactly—there exists at least one optimal parameter $w_0 \in W$ matching $q$ everywhere ($p(\cdot \mid w_0) = q$), at which $K(w_0) = 0$.[^1]

In practice, we never have access to $q(x)$ itself; we only observe the $n$ training examples $x_1, \dots, x_n$. Rather than computing $K(w)$ directly, training evaluates the **empirical negative log-likelihood**—the standard cross-entropy training loss averaged over the training set:

$$
L_n(w) = -\frac{1}{n} \sum_{i=1}^n \log p(x_i \mid w).
$$

Its expected value over fresh draws from $q$ is $K(w) + H(q)$, where $H(q) = -\int q(x)\log q(x)\,dx$ is the constant entropy of $q$, so minimizing $L_n(w)$ is equivalent to minimizing an empirical estimate of $K(w)$ up to an additive constant. Moreover, rewriting the dataset likelihood as $\prod_{i=1}^n p(x_i \mid w) = \exp(-n L_n(w))$ shows why poor fits disappear exponentially fast from the posterior as dataset size $n$ grows.

Now suppose we stand at a realizable optimum $w_0$ where $K(w_0) = 0$ and the slope $\nabla K(w_0) = 0$. How steeply do the valley walls rise as we nudge $w_0$? Expanding $K(w)$ to second order gives a quadratic bowl approximation:

$$
K(w) \approx \frac{1}{2} (w - w_0)^\top I(w_0) (w - w_0),
$$

where the matrix of second derivatives $\nabla^2 K(w_0)$ coincides at the realizable optimum $w_0$ with the **Fisher information matrix** $I(w_0)$. Geometrically, a multi-dimensional quadratic bowl has a set of perpendicular principal axes, and the *eigenvalues* of $I(w_0)$ are simply the steepnesses (curvatures) of the bowl along each of those axes: a large eigenvalue corresponds to a steep wall where tiny weight changes sharply distort predictions, a small eigenvalue corresponds to a gentle slope, and a zero eigenvalue corresponds to a completely flat trough along which the model's predictions do not change at all. Those steepnesses also govern local optimization behavior: when some axes are vastly steeper than others, gradient descent oscillates across steep directions while creeping slowly along shallow ones. Viewing a parameterized model family as a geometric space whose local distance and curvature are governed by the Fisher matrix $I(w)$ is the centerpiece of **information geometry**, pioneered by Shun-ichi Amari—who also introduced the **natural gradient** ($I(w)^{-1}\nabla L_n(w)$), rescaling updates by the inverse Fisher matrix to equalize steep and shallow axes whenever $I(w)$ is invertible.

Local curvature also governs how reliably a solution survives noisy training steps. Near a minimum $w_0$—where the full-batch gradient vanishes and updates are dominated by mini-batch noise—an SGD step of bounded Euclidean distance acts as a small random perturbation $\Delta w = w - w_0$. When that noise is spread across directions rather than aimed solely along the steepest axis, the quadratic approximation $K(w_0 + \Delta w) \approx \frac{1}{2}\Delta w^\top I(w_0)\Delta w$ yields a simple probabilistic bound: the probability that a bounded noisy step *remains a good fit* (keeping the increase in error below a small tolerance) is controlled by the fraction of the local Euclidean ball around $w_0$ where the walls of $I(w_0)$ stay shallow or flat. The more directions that are flat or gentle, the smaller the chance that a bounded step knocks the model into a high-loss region.

## Classical model selection and the Laplace approximation

With training fit and local curvature in place, we step back from tracking and updating a single parameter instance $w$ through gradient steps to evaluating the model family as a whole. Rather than modifying one weight vector, Bayesian model selection integrates out $w$ across parameter space against the regularizing prior $\varphi(w)$ (such as Gaussian weight decay), which keeps total parameter volume finite. Averaging the dataset likelihood under $\varphi(w)$ gives the **marginal likelihood**, known in statistical physics as the **partition function** $Z_n$:

$$
Z_n = \int_W \prod_{i=1}^n p(x_i \mid w) \, \varphi(w) \, dw = \int_W \exp\bigl(-n L_n(w)\bigr) \, \varphi(w) \, dw.
$$

Although $Z_n$ integrates over all of $W$, local curvature around $w_0$ still governs its value as $n$ grows: because $\exp(-n L_n(w))$ suppresses high-loss regions exponentially fast, almost the entire integral concentrates inside the low-loss valley around $w_0$. Taking the negative logarithm of $Z_n$ gives the **Bayesian free energy**:

$$
F_n = -\log Z_n = -\log \int_W \exp\bigl(-n L_n(w)\bigr) \, \varphi(w) \, dw.
$$

Because of the minus sign, a larger partition function $Z_n$—meaning a better combination of low training loss and generous supporting volume—corresponds to a *smaller* free energy $F_n$. Returning to our earlier terrain comparison, suppose we evaluate two landscapes (or two local regions with comparable prior weight) whose bottoms reach the exact same minimum training loss: the **broad basin** keeps $\exp(-n L_n(w))$ large across a much wider Euclidean neighborhood than the **narrow ravine**, giving it a larger integral $Z_n$ and therefore a lower free energy $F_n$.

Consider what happens to $F_n$ as dataset size $n \to \infty$ in a **regular** statistical model—one whose loss landscape around the optimal parameter $w_0$ is a single smooth bowl curving upward in every direction, with no flat troughs or ridges (formally, $w_0$ sits as an isolated point in the interior of $W$ with $\varphi(w_0) > 0$, and every principal axis of $I(w_0)$ has strictly positive curvature so $I(w_0)$ is positive definite). As $n$ grows, the empirical minimizer $\hat{w}_n$ (the weight setting minimizing training loss $L_n$ on the dataset) moves within distance $n^{-1/2}$ of $w_0$, and the factor $\exp(-n L_n(w))$ concentrates almost all of the integral inside a small Gaussian peak around $\hat{w}_n$. Because the loss rises quadratically like $(\Delta w)^2$ around the bottom of the bowl, keeping $n(\Delta w)^2$ bounded as $n$ grows forces the width of that peak to shrink by $1/\sqrt{n}$ along every one of the $d$ independent parameter axes. Shrinking a $d$-dimensional box by $1/\sqrt{n}$ along each axis shrinks its total volume by $(n^{-1/2})^d = n^{-d/2}$.

Approximating the integral by treating the log-integrand as a quadratic bowl around its peak—the **Laplace approximation**—turns that shrinking volume into an asymptotic formula for the free energy:

$$
F_n = n L_n(w_0) + \frac{d}{2} \log n + \frac{1}{2} \log \det I(w_0) + \mathcal{O}_p(1).
$$

Multiplying the leading terms by $2$ (with $L_n$ evaluated at the empirical minimizer $\hat{w}_n$) gives the classical **Bayesian information criterion (BIC)**. Reading each term geometrically shows why classical parameter counting works here:

1. **Training fit ($n L_n(w_0)$):** Because this term grows linearly with dataset size $n$, even a slight improvement in fitting the data eventually outweighs complexity penalties once enough samples are collected.
2. **Dimensional volume penalty ($\frac{d}{2}\log n$):** This comes directly from $-\log(n^{-d/2})$. Each of the $d$ independent parameters shrinks the surviving volume by $1/\sqrt{n}$, adding $\frac{1}{2}\log n$ to the free energy regardless of what the parameter represents.
3. **Local curvature ($\frac{1}{2}\log\det I(w_0)$):** The determinant $\det I(w_0)$ is the product of the bowl's steepnesses across all $d$ principal axes. Steeper bowls have smaller volume and pay a slightly higher constant penalty.
4. **Lower-order remainder ($\mathcal{O}_p(1)$):** This collects terms that stay bounded as $n$ grows, including the prior density $-\log \varphi(w_0)$, the Gaussian normalization constant $-\frac{d}{2}\log(2\pi)$, and the bounded fluctuation $n L_n(\hat{w}_n) - n L_n(w_0)$ between the empirical minimum and $w_0$.

For classical regular models such as linear or logistic regression, this expansion matches both model selection and optimization geometry: there is an isolated bowl, every parameter constrains predictions, and the posterior contracts uniformly around $w_0$.

Look closely, however, at the product of steepnesses inside $\frac{1}{2}\log\det I(w_0)$. It requires every single eigenvalue of $I(w_0)$ to be strictly greater than zero. If even *one* direction in parameter space is completely flat at $w_0$—curvature zero—then the product $\det I(w_0)$ vanishes, a Gaussian bowl fails to confine probability along that flat axis, and the BIC expansion breaks down.

## Symmetries, redundancy, and singularities in neural networks

In neural networks, flat directions are not rare edge cases; they are built directly into the architecture through symmetries and overparameterization.

First, consider **continuous rescaling symmetries**. Take a single hidden ReLU neuron computing $v \cdot \operatorname{ReLU}(w \cdot x)$ for an input vector $x$, incoming weights $w$, and outgoing weight $v$, where $\operatorname{ReLU}(z) = \max(0, z)$ sets negative numbers to zero and passes positive numbers through unchanged. Because positive scaling passes straight through $\operatorname{ReLU}$, multiplying the incoming weights $w$ by any positive number $c > 0$ and dividing the outgoing weight $v$ by $c$ cancels out identically:

$$
\left(\frac{v}{c}\right) \operatorname{ReLU}\bigl((c w) \cdot x\bigr) = v \cdot \operatorname{ReLU}(w \cdot x).
$$

Doubling $w$ and halving $v$, for instance, produces the exact same output for every input $x$. Varying $c$ traces a continuous curve $(c w, v/c)$ in parameter space along which the predicted distribution $p(x \mid w)$ and $K(w)$ never change. Along that curve, the valley has zero steepness, giving $I(w_0)$ a zero eigenvalue.[^2]

Second, consider **redundant units**. Suppose the true data distribution can be represented exactly by a single hidden neuron, and we fit a two-neuron network instead. The second neuron can be switched off in two distinct ways without disturbing $K(w) = 0$:

- setting its outgoing weight to zero ($v_2 = 0$), which leaves its incoming weights $w_2$ free to take any values; or
- setting its incoming weights to zero ($w_2 = 0$), which silences the unit for every input and leaves its outgoing weight $v_2$ free to take any values.

Where $w_2 = 0$ and $v_2 = 0$ meet, two flat zero-loss sheets cross along a crease, much like two perpendicular walls meeting at a corner.

When the set of optimal weights $W_0 = \{w \in W : K(w) = 0\}$ is no longer a collection of isolated points sitting in round bowls—forming instead continuous curves, flat sheets, and intersecting creases where $I(w)$ has zero eigenvalues—we call the model a **singular statistical model**. Amari and collaborators showed that these intersecting redundant-neuron singularities also degenerate the Fisher metric along training trajectories, trapping gradient descent on the long plateaus followed by sudden drops in loss observed when training neural networks.

Beyond slowing optimization, singularities also break the Laplace approximation for free energy because flat and intersecting valleys leave vastly more room for weights to vary without hurting training fit. Where quadratic curvature disappears, valley walls flatten out into gentler higher-order slopes such as quartics ($K(w) \propto \Delta w^4$) or cross-terms like $w_2^2 v_2^2$. In a quartic direction, the region of acceptable parameters shrinks at rate $n^{-1/4}$ rather than $n^{-1/2}$ (since keeping $n \Delta w^4$ bounded allows $\Delta w$ up to order $n^{-1/4}$ rather than $n^{-1/2}$); along an exact symmetry curve, it does not shrink with $n$ at all. Posterior volume therefore contracts far more slowly than $n^{-d/2}$, and raw parameter count $d$ dramatically overstates the model's effective complexity.

In [Part II](/blog/slt-part-ii), we replace raw parameter counting with a geometric measure of how fast near-optimal volume shrinks—the Real Log Canonical Threshold ($\lambda$)—and see how it governs competition between basins inside a single network.

[^1]: If the model is slightly misspecified so that $\min_w K(w) = K(w_0) > 0$, the local volume and free-energy theory still holds by replacing $K(w)$ with the excess divergence $K(w) - K(w_0)$ under appropriate regularity conditions around the optimal set.

[^2]: Watanabe's formal proofs assume that $K(w)$ is real-analytic, which excludes piecewise-linear activations such as ReLU at their nondifferentiable boundaries. However, networks with smooth activations (such as $\tanh$ or GELU) as well as deep linear networks satisfy analyticity and exhibit the exact same continuous rescaling symmetries and intersecting degeneracies, and empirical SLT extends smoothly to ReLU architectures in practice.

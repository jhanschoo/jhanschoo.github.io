---
title: "Quantum Mechanical Fundamentals: Part I—Representing states"
description: "We shall see how to implement and represent a single qubit succinctly."
pubDate: "2024-05-24"
tags: ["brook", "quantum mechanics", "qmf"]
---

Standard introductions to QM go into deep detail about particular QM systems, since after all, modeling particular systems is the *raison d'être* of physics. On the other hand, most QC introductions develop the idealized fragment of QM relevant to it, without delving deeper into the QM formalism that underpins QC. Neither typically discuss the mathematical results that justify the QM formalism. This is alright, but once the QC practitioner needs to optimize circuits for hardware, work in QM applications of QC, or work on QC technologies itself, a short introduction focusing on the QM formalism itself should prove useful. This post attempts to be that bridge. It assumes

- a good grasp of undergrad analysis and linear algebra that would be typical for math graduates
- and familiarity with quantum computing basics (you know about finite-dimesional Hilbert spaces, state preparation, measurement in the computational basis, and Pauli and rotation gates).

## Recap: 1-qubit case

We first recall QC concepts in a single qubit. In this setting, the state exists as a unit vector in two dimensions, $\mathbb{C}^2$, furnished with the Euclidean norm. We identify $\left(\begin{smallmatrix}1 \\ 0\end{smallmatrix}\right)=\ket{0}$ and $\left(\begin{smallmatrix}0 \\ 1\end{smallmatrix}\right)=\ket{1}$. Then $\{\ket{0}, \ket{1}\}$ forms an orthonormal basis, called the **computational basis**, for $\mathbb{C}^2$.

A quantum circuit typically starts in the state $\ket{0}$, then proceeds to apply unitary operators $U \in \mathbb{C}^{2\times 2}$ to manipulate the state. Let us look at the form of the state after applying any number of unitary operators. Recall that the composition of any number of unitary operators is again a unitary operator, so it suffices to just consider $U\ket{0}$. Since $U$ is unitary, there exist unique complex numbers $\alpha, \beta\in\mathbb{C}$ such that $U\ket{0}=\alpha\ket{0}+\beta\ket{1}$. Because $U$ is unitary, the resulting vector also has unit magnitude; that is, $\sqrt{|\alpha|^2+|\beta|^2} = 1 = |\alpha|^{2} + |\beta|^{2}$.

Finally we measure, and for simplicity, we measure in the computational basis. By the [Born rule](https://en.wikipedia.org/wiki/Born_rule), $P(0)=|\alpha|^2$ and $P(1)=|\beta|^2$.

## Motivating implementation: photon polarization

Let us see how the class of 1-qubit circuits may be realized physically, and in doing so, validate the language of QC as a mathematically appropriate way to model these phenomena. Today, the polarization of light is a widely observed and manipulated quantum phenomenon. Polarizers on sunglasses filter out the polarized light of glare while allowing significant unpolarized light through. Liquid crystal displays manipulate the polarization of light to selectively allow or block the transmission of light from a backlight. The 1-qubit circuit class can be implemented in terms of light polarization in the following manner:

- $\ket{0}$ and $\ket{1}$ shall correspond to horizontal and vertical polarization respectively.
- Measurement corresponds to distinguishing between horizontal ($\ket{0}$) and vertical ($\ket{1}$) polarization states. To do so, we use a beam splitter that reflects light based on polarization. In more detail, a photon polarized horizontally is transmitted almost surely, a photon polarized vertically is reflected almost surely, and transmission is probabilistic when the state vector is in a superposition of these two states. Light detectors are set up to detect whether photons are reflected or transmitted.
- An $R_x(\theta)$ gate can be implemented with a half-wave plate rotated $\theta/4$ anticlockwise from the horizontal axis, sandwiched between two quarter-wave plates with the fast axis in the *vertical* axis.
- An $R_y(\theta)$ gate can be implemented with a half-wave plate with the fast axis in the horizontal axis, followed by a half-wave plate rotated $\theta/4$ anticlockwise from the horizontal axis.
- An $R_z(\theta)$ gate can be implemented as $R_z(\theta)=R_x(-\pi/2)R_y(\theta)R_x(\pi/2)$. It can also be implemented in a more conceptually simple manner with a single wave plate of a precise thickness linear in $\theta$, oriented with the fast axis in the horizontal axis, even though wave plates of arbitrary thickness are not typically manufactured. We mention it now as we will reference this fact later.
- We typically begin with horizontally polarized light; that is, the initial state is $\ket{0}$.

Because they implement $R_x(\theta),R_y(\theta)$ for arbitrary $\theta$, a finite number of half– and quarter–wave plates can implement any unitary operator on the 1-qubit, including the $R_z$ operators. Note that this notion is more powerful than the notion of a universal set, which is usually taken to mean that any unitary operator can be approximated arbitrarily well with some sequence of gates in the universal set. We have shown how a 1-qubit circuit class could be represented by the QC framework, but let us look a little closer at why these were the right choices.

## Why a Hilbert space? Why the Born rule?

Indeed, we want to at least be able to represent our outcome as probability mass functions (pmfs) or probability density functions (pdfs). Recall that a pmf is a function $p\colon D\to\mathbb{R}$, with $D$ being the set of mutually exclusive outcomes, and $\sum_{x\in D}p(x)=1$, and each $p(x)$ nonnegative. When $D$ is countable, we can string the probability masses $p(x)$ as a vector
$$
(p(x_1),p(x_2),\dotsc)\in\mathbb{R}^{|D|}
$$
In the case of light polarization, the pmfs themselves viewed as vectors lie in $\mathbb{R}^{\{0,1\}}\equiv\mathbb{R}^2$, and let us write $b_0=(1,0)$ and $b_1=(0,1)$ as basis vectors for this space. Consider this our first attempt at describing the state space underlying light polarization. We can summarize this as the following.

**Fact.** The function space $\mathbb{R}^D$ can be viewed as a vector space over $\mathbb{R}$, using pointwise addition of functions as vector addition, and componentwise multiplication as scalar multiplication. Then, pmfs over $D$ are the subset of this vector space where each component is nonnegative and they sum to $1$ (they form a simplex).

However, we run into issues when we want to talk about how $R_y$ affects vectors in a state space like this, if we had $R_y\colon [0,2\pi)\to\mathbb{R}^2$. In particular, we have two concerns.

First, we want to talk about rotations affecting states in somewhat the same way. Continuing with this state space candidate, we see that we must give up with a claim like modeling rotations as a translation in this state space like $b_0-R_y(\frac{\pi}{2})b_0=b_1-R_y(\frac{\pi}{2})b_1$, because $R_y(\frac{\pi}{2})b_0=R_y(\frac{\pi}{2})b_1=(1/2,1/2)$, but $b_0\neq b_1$. We shall contend with a notion of a norm on this state space that has the property that $\Vert b_0-R_y(\frac{\pi}{2})b_0\Vert=\Vert b_1-R_y(\frac{\pi}{2})b_1\Vert$ in this state space, which we should expect from a rotation.[^1] But this is problematic for this choice of state space. Leaving the choice of norm arbitrary, and investigating the concrete values of probability masses, we require
- $b_0=(1,0)$,
- $R_y(\pi/3)b_0=(3/4,1/4)$,
- $R_y(\pi/3)R_y(\pi/3)b_0=(1/4,3/4)$.

So even though $b_0$ is the same distance away from $R_y(\pi/3)b_0$ as $R_y(\pi/3)b_0$ itself is from $R_y(\pi/3)R_y(\pi/3)b_0=R_y(2\pi/3)b_0$, we have
$$
\frac{1}{4}\left\Vert (1,-1)\right\Vert
=\left\Vert b_0-R_y\left(\frac{\pi}{3}\right)b_0\right\Vert
=\left\Vert R_y\left(\frac{\pi}{3}\right)-R_y\left(\frac{2\pi}{3}\right)b_0\right\Vert
=\frac{1}{2}\left\Vert (1,-1)\right\Vert,
$$
which would only hold if $\left\Vert b_0-b_1\right\Vert=\left\Vert (1,-1)\right\Vert=0$, that is, if $b_1=b_0$. But this is not the case. So we have to altogether scrap the idea of using the natural function space of pmfs as our state space if we wanted it to be compatible with such a norm, and find another candidate for the state space. Summarizing, we have the following.

**Lemma.** There is no way to define a norm on the natural function space on pmfs such that $\Vert R_y(0)b_0-R_y(\theta)b_0\Vert=\Vert R_y(\theta)b_0-R_y(2\theta)b_0\Vert$ for all $\theta$, where  $R_y(\theta)b_0$ is the pmf corresponding to measurement on horizontally polarized light beamed through a wave plate implementing $R_y(\theta)$.

Instead, let us start from the other end, with the natural way to describe rotations in $\mathbb{R}^2$, and work our way back to PMFs. If we should continue to model our outcomes as basis vectors $b'_0=(1,0)$ and $b'_1=(0,1)$, and $R_y$ as a rotation matrix on the plane, we have that rotations preserve magnitude with respect to the Euclidean norm. This means that if $(u,v)=R_y(\theta)b'_0$, then $1=\sqrt{u^2+v^2}=u^2+v^2$. One easily checks that $(u^2,v^2)$ satisfies the requirements of a pmf, and indeed would match the empirical pmf of an experiment implementing it. We note also that since all state vectors have unit magnitude, it becomes natural to talk about the similarity between states using the dot product defined as $(u_1,u_2)\cdot(v_1,v_2)=u_1v_1+u_2v_2$, so that $b'_0\cdot b'_1=0$. This notion of a product is compatible with the Euclidean norm in the sense that $\Vert s\Vert^2=s\cdot s$, and it is compatible with basis $\{b'_0,b'_1\}$, making it orthonormal in respect to the dot product. We can then redescribe the map to obtain the pmf in more linear-algebraic terms: since $b'_0=(1,0)$ and $b'_1=(0,1)$, the pmf of a state $s$ is given by $(|s\cdot b'_0|^2, |s\cdot b'_1|^2)$. This allows us to naturally talk about the pmf when measured in respect to an arbitrary orthonormal basis, and indeed describe with a change of basis what happens if we should rotate the beam splitter's axis of polarization. We thus obtain a more suitable state space with respect to $R_y$ for the fragment of our experimental setup that allows only $R_y$ gates.

**Example.** The dot product on $\mathbb{R}^2$, given any orthonormal basis $\{e_0,e_1\}$, induces a map $m_{\{e_0,e_1\}}\colon s\mapsto (e_i\mapsto |e_i\cdot s|^2)$ that maps vectors of unit magnitude to pmfs, and also induces the Euclidean norm, which satisfies $\Vert R_y(\theta)s-s \Vert=\Vert R_y(\theta)t-t\Vert$ for rotation matrices $R_y(\theta)$ in the plane and vectors $s,t$ of unit magnitude. In particular, we recover the pmf for a light polarization setup as above by mapping a state vector through $m_{\{b'_0,b'_1\}}$.

We proceed on to our other concern, which involves the $R_z$ gates. The $R_z$ gates, corresponding to a wave plate of variable thickness, affects the relative phase of the vertical and horizontal polarization of light, when the fast axis of the wave plate is aligned with the horizontal axis. By itself, an $R_z$ gate does not change the distribution of outcomes if then measured immediately in the computational basis. But you should already know that the $R_z$ gates are a form of rotation that affects how subsequent unitary transformations in turn affect the distribution. To that end, it is natural to encode this rotation as the polar angle of a complex number while preserving the magnitude, so that the vector space is defined over $\mathbb{C}^2$. This means augmenting the dot product to $\braket{u,v}=u_1^*v_1+u_2^*v_2$, so that the norm is extended to $\sqrt{\braket{u,u}}$. The map to PMFs is then the Born rule (for the finite-dimensional case) $m_{\{\ket{0},\ket{1}\}}\colon \ket{s}\mapsto ((i\in\{0,1\})\mapsto \braket{s|i}\braket{i|s})$. In the computational basis, our vectors now have the form $(ae^{i\alpha},be^{i\beta})$ such that $(a^2,b^2)$ forms a pmf. This increase in expressive power then gives us the notion of a global phase of the state that has no physical significance, which we simply have to live with.

Note that each complex Hilbert space is isomorphic to some real Hilbert space, but suffers from very unwieldy definitions if expressed as such. Phase is a central concept in QM and the representational clarity we gain from using complex numbers is immense.

**Example.** The inner product $\braket{u,v}=u_1^*v_1+u_2^*v_2$ on $\mathbb{C}^2$, given any orthonormal basis $\{\alpha_0,\alpha_1\}$, induces a map $m_{\{\alpha_0,\alpha_1\}}\colon s\mapsto (\alpha_i\mapsto \braket{s,\alpha_i}\braket{\alpha_i,s})$ that maps vectors of unit magnitude to pmfs, and also induces a norm satisfying $\Vert R_t(\theta)s-s \Vert=\Vert R_t(\theta)t-t\Vert$, where $R_t$ can be one of $R_x,R_y,R_z$, and vectors $s,t$ have unit magnitude. In particular, we recover the pmf for a light polarization setup by mapping a state vector through $m_{\{0,1\}}$.

Finally, we remark that $\mathbb{C}^n$ with the given inner product is an example of a separable Hilbert space, and the Born rule is defined abstractly over separable Hilbert spaces. The axiomatic definition of Hilbert spaces, separability, the Born rule, and the modeling of the state vector as a unit vector, are the properties of $\mathbb{C}^n$ so far that generalize to infinite-dimensional QM systems. It is now convenient to recap some relevant definitions, and we will refer to these definitions in later posts.

**[Hilbert space.](https://en.wikipedia.org/wiki/Hilbert_space)** A Hilbert space is a vector space over $\mathbb{R}$ or over $\mathbb{C}$ furnished with an inner product—a map of two vectors to the underlying scalar field that is conjugate symmetric, linear in the *second*[^2] argument, and positive definite—such that the vector space is a complete metric space with respect to the distance induced by the norm, in turn induced by the inner product. We will use mathematical notation for arbitrary vectors, and bra-ket notation for unit-magnitude vectors.

**[Separability.](https://en.wikipedia.org/wiki/Separable_space)** A topological space is separable when it contains a countable dense subset. Then a Hilbert space is separable (wrt. the metric just discussed) if and only if it admits a countable orthonormal basis.

Note that the inner product also induces a canonical isomorphism $H\equiv H'$ between $H$ and its dual space $H'$; we shall usually write $\braket{s,t}$ for the inner product between $s,t\in H$, but write $s^{\dagger}t$ or $(s^*)'t$ when we need to emphasize that we are mapping $s$ to its conjugate dual $s^{\dagger}=(s^*)'\in H'$, then applying it to $t\in H$ to obtain a scalar. When using bra-ket notation, we write $\braket{s|t}$ for the inner product, as we have already done earlier.

**[Unitary operator.](https://en.wikipedia.org/wiki/Unitary_operator)** A unitary operator $U$ on a Hilbert space $H$ is a surjective, bounded linear operator that preserves the inner product in the sense that $\braket{Us,Ut}=\braket{s,t}$ for each $s,t\in H$.

**[Adjoint operator.](https://en.wikipedia.org/wiki/Hermitian_adjoint)** Let $A\colon D_A\to H$ be a linear operator from a dense subspace $D_A$ of the inner product space $H$. The adjoint operator $A^{\dagger}\colon D_{A^{\dagger}}\to H$ of $A$ is defined over all $y\in H$ for which some $z\in H$ satisfies $y^{\dagger}Ax=z^{\dagger}x$. By the Riesz representation theorem, this $z$ is unique. Then, $A^{\dagger}y=z$ by definition, so that $y^{\dagger}Ax=z^{\dagger}x=(A^{\dagger}y)^{\dagger}x$.

**[Self-adjoint operator.](https://en.wikipedia.org/wiki/Self-adjoint_operator)** A self-adjoint operator $A\colon A_D\to H$ on a Hilbert space $H$ is a linear operator from a dense subspace $A_D$ of $H$ that satisfies $A=A^{\dagger}$ (including agreement of domains). Then no self-adjoint operator is a proper restriction of another.

We have thus motivated the formalism of a 1-qubit circuit class in QC, by grounding it in the quantum mechanics of light polarization. The field of QC technologies that primarily implement qubits and gates using photons and optical instruments is called [LOQC](https://en.wikipedia.org/wiki/Linear_optical_quantum_computing). Among contemporary QC technologies, our light polarization is most similar to this paradigm of quantum computing.

[^1]: This makes rotation an [isometry](https://en.wikipedia.org/wiki/Unitary_operator) in this space.
[^2]: This is a matter of convention adopted in physics that also simplifies notation here; the opposite is conventional in mathematics.
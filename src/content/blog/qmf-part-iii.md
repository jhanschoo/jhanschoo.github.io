---
title: "Quantum Mechanical Fundamentals: Part III—Beyond finite-dimensional spaces"
description: "To measure infinity."
pubDate: "2024-05-26"
tags: ["brook", "quantum mechanics", "qmf"]
---

This section is written for comprehensiveness in coverage; as while many important quantum-mechanical models have important physical properties taking on values from a countably infinite set or a continuum; nevertheless they are not very directly relevant to qubit-based quantum computing. Of course, quantum computing hardware itself is modeled as infinite-dimensional QM systems, and note also computational systems under the paradigm of [continuous-variable quantum computing](https://en.wikipedia.org/wiki/Continuous-variable_quantum_information).

Earlier, I discussed that the structure of separable Hilbert spaces is what happens when we generalize from finite-dimensional spaces to infinite-dimensional. Our motivating example in this section is the system of the electronic configuration of the hydrogen atom in the ground state. On the one hand, the spin of the electron is described by a self-adjoint operator that has two eigenvalues. On the other hand, for this particular system, the position of the electron is described by an unbounded self-adjoint operator that defines the same distribution over $\mathbb{R}^3$ regardless of spin state, yet strictly speaking the operator has no eigenbasis; being self-adjoint or normal is the property that we have left that allows us to talk about such observables in a principled manner.

Let us once again go back and revisit the problem of defining a probability distribution. In the naive attempt, we effectively defined a pmf $p:\{0,1\}\to \mathbb{R}$ on the computational basis. Measure-theoretically, the finite set $D\subseteq\mathbb{R}$ would be given the discrete $\sigma$-algebra (exactly the Borel $\sigma$-algebra on the discrete topology), and so $p$ induces $P:\mathcal{B}(\{0,1\})\to\mathbb{R}$ that is a probability measure. Of course, once $D$ is uncountable, we are happy to directly define $P$ on a suitable topology, since the discrete topology is unworkable.

When we discarded the naïve model, we introduced an intermediate step in the process, that allowed us to generalize measurement beyond the computational basis, characterizing measurement as the Born rule. For an orthonormal basis $B$ of basis vectors labeled by $\lambda\in D$, we had $m_B\colon \ket{s}\mapsto (\lambda\mapsto \braket{s|\lambda}\braket{\lambda|s})$. The measure-theoretic version of this (with the discrete $\sigma$-algebra) is $M_B\colon H\to(\mathcal{B}(D)\to\mathbb{R})$ such that
$$
M_B(\ket{s})(\Delta)=\sum_{\lambda\in \Delta}\braket{s|\lambda}\braket{\lambda|s}=\bra{s}\left(\sum_{\lambda\in \Delta} \ket{\lambda}\bra{\lambda}\right)\ket{s}=\bra{s}(E_{\Delta}\ket{s}),
$$
where $E_{\Delta}$ is the orthogonal projection operator to the subspace spanned by the basis vectors indexed by $\Delta$. Of course, the above equality should be thought of as an equivalent characterization; to each $v\in H$ we want to define a suitable measure on $\mathcal{B}(D)$ so that 1) the above can be understood to be the integral in respect to that measure, and 2) the function where we fix the Borel set to be measured but allow the vector to vary should be continuous. To formalize these notions, we develop the *projection-valued measure,* and the complex measures defined by it.

*Remark.* The following statements on a subspace $S$ of a Hilbert space $H$ are equivalent.
- $S$ is a closed subspace of $H$.
- There exists an orthogonal projection operator from $H$ to $S$; this orthogonal projection operator is then unique.
- $S$ admits an orthonormal basis.
- (informally) $S$ is a Hilbert space in its own right, once we restrict the inner product on $H$, etc.

**Projection-valued measure (PVM).** A projection-valued measure $E\colon\mathcal{M}\to\mathcal{L}_{\Pi}(H)$ is a function from a measurable space $(\Omega, \mathcal{M})$ to the space of orthogonal projections $\mathcal{L}_{\Pi}(H)$ on a Hilbert space $H$, that satisfies the following:
* $E(\emptyset)=0$, the zero operator, which projects to the trivial subspace.
* $E(\Omega)=I$, the identity operator, which projects back to $H$.
* **Finite multiplicativity.** For $A,B\in\mathcal{M}$, $E(A\cap B)=E(A)E(B)$. Hence for disjoint $A,B$, the RHS is the zero operator.
* **Countable additivity.** If $(\Delta_n\in \mathcal{M}_n)$ is a sequence of pairwise disjoint sets, then
$$
E\left(\bigcup_{n=1}^\infty\Delta_n\right)=\sum_{n=1}^\infty E(\Delta_n),
$$
under the strong operator topology. That is, the operators $E(\Delta_n)$ are defined so that the series converges under the strong operator topology, and to the corresponding operator.

Note the equivalent perspective of a map into closed subspaces where countable additivity is defined in terms of orthogonal direct sums. Note that the use of $\Delta$ to denote the measurable sets is an analogy to the Dirac delta operator $\delta$.

**Lemma (scalar measure with the inner product).** Let $E\colon\mathcal{M}\to\mathcal{L}_{\Pi}(H)$ be a PVM, and let $u,v\in H$. Then
$$
\braket{u,E(.)v}\colon \mathcal{M}\to\mathbb{R},\qquad (\braket{u,E(.)v})(\Delta)=\braket{u,E(\Delta)v}.
$$
is a finite complex measure. Where clear from context, we write $\braket{u,Ev}$. Note that in bra-ket notation, we shall write $\braket{u|A|v}$ for $\bra{u}(A\ket{v})$.

**Corollary (generalized Born rule).** Let $E\colon\mathcal{M}\to\mathcal{L}_{\Pi}(H)$ be a PVM, and let $v\in H$. Then $\braket{v,Ev}$ is a finite measure.

*Example.* Recall $M_B$ as defined previously. Then
$$
M_B(\ket{s})(\Delta)=\int_{\Delta}d\braket{s|E|s},
$$
where the integral is the Lebesgue–Stieltjes integral. We can also verify that
$$
\begin{align*}
M_B(\ket{s})(\mathbb{R})&=\int_{\mathbb{R}}d\braket{s|E|s}\\&=1\braket{s|E(\mathbb{R})|s}-1\braket{s|E(\emptyset)|s}\\&=\braket{s|s}-\bra{s}0=1.
\end{align*}
$$

We therefore see that we can talk about measurements in a way that generalizes to infinite dimensions rigorously using the language of PVMs. Note that there are further generalizations of PVMs; of note are [POVM](https://en.wikipedia.org/wiki/POVM)s that use positive bounded self-adjoint operators in place of orthogonal projection operators; doing so allows us to talk about measurements on a [mixed states](https://en.wikipedia.org/wiki/Quantum_state#Mixed_states) that are possibly a continuous distribution of pure states.

Let us return back to the typical representation of an observable. We had used a Hermitian operator (on a finite-dimensional Hilbert space) to encode $m_B$. The spectral theorem makes the correspondence between PVMs and self-adjoint operators clear.

**Spectral theorem.** There exists a one-to-one correspondence between the self-adjoint operators on the Hilbert space $H$ over scalars $\mathbb{F}$ and the PVMs $E\colon\mathcal{B}(\mathbb{R})\to\mathcal{L}_{\Pi}(H)$, such that if $A\colon D_A\to H$ corresponds to $E_A\colon\mathcal{B}(\mathbb{R})\to\mathcal{L}_{\Pi}(H)$, then if $f\colon \mathbb{F}\to\mathbb{F}$ is a Borel-measurable function, there exists a dense subspace $D_{fA}$ of $H$ such that for all $x\in D_{fA}$, a vector $z\in H$ exists such that for all $y\in H$,
$$
\braket{y,z}=\int_{\mathbb{F}} f\,d\braket{y,E_Ax}\in\mathbb{F},
$$
where the integral is the Lebesgue–Stieltjes integral. Then the function
$$
fA\colon D_{fA}\to H,\qquad (fA)(x)=z,
$$
is a linear operator, and we define the notations
$$
fA=\int_{\mathbb{F}} f\,dE_A,
\qquad (fA)x=\int_{\mathbb{F}} f\,dE_Ax,
$$
and call them spectral integrals. In particular,
$$
A=\int_{\mathbb{F}}\operatorname{id}\,dE_A.
$$

*Functional calculus and Stone's theorem, revisited.* Because of the properties of the inner product and the Lebesgue–Stieltjes integral, operations on $\mathbb{F}$ sometimes translate into these. For example, when $A$ is a self-adjoint operator, then for each $t\in\mathbb{R}$, $e^{itA}$ is an operator and $D(t\mapsto e^{itA})=(t\mapsto iAe^{itA})$.

*The position operator.* Recall the motivating example of the position of the electron of a hydrogen atom in the ground state. We may define self-adjoint operators $X_1,X_2,X_3$ so that $\braket{\psi|E_{X_i}(\Delta)|\psi}$ gives for $\ket{\psi}\in H$ the marginal probability that the particle exists in a region of space where the points in that space have their $i$-th coordinate in $\Delta$. In three dimensions, the joint probability to find the particle in $\Delta_1\times\Delta_2\times\Delta_3$ is given by
$$
\int_{\Delta_1}\int_{\Delta_2}\int_{\Delta_3}d\braket{\psi|E_{X_3}|\psi}d\braket{\psi|E_{X_2}|\psi}d\braket{\psi|E_{X_1}|\psi}.
$$
We note that the order of the $E_{X_i}$ do not matter; they project to orthogonal families of subspaces, and so commute. Exactly when they commute, the $X_i$'s commute as well. When self-adjoint operators commute, that is exactly when, at least in theory, we may make a measurement simultaneously on all the observables they represent. Finally observe that in respect to any state, the probability for any one operator is given by the conventional Lebesgue–Stieltjes integral over $\mathcal{B}(\mathbb{R})$, so classical results of analysis may apply; for example, by [Fubini–Tonelli](https://en.wikipedia.org/wiki/Fubini%27s_theorem), for an arbitrary $\Delta\in\mathcal{B}(\mathbb{R}^3)$, the probability is just
$$
\int_{\mathbb{R}^3}1_{\Delta}d\braket{\psi|E_{X_1}E_{X_2}E_{X_3}|\psi},
$$
where $1_{\Delta}$ is the indicator function for $\Delta$.

This concludes our brief treatment of the infinite-dimensional case. Again, this is not very relavant to qubit-based quantum computing, but is inescapable when dealing with hardware or error-correction at the QM level.
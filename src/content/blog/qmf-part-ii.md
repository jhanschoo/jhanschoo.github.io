---
title: "Quantum Mechanical Fundamentals: Part II—The time-evolution operator and the Hamiltonian"
description: "We now model how states change over time."
pubDate: "2025-05-25"
tags: ["brook", "quantum mechanics", "qmf"]
---

While in QC, we model circuits as unitaries acting on the qubit register, this is an abstraction. QC gates are implemented as interactions with the qubit register that are continuous in respect to time, that are then packaged in respect to appropriate durations of time.[^1] In the previous section, we had motivated our choice of $\mathbb{C}^2$ by wanting $R_t(\theta)$ to preserve distances in a certain sense, for a fixed $\theta$. With that bootlace tied and secured, we shall presently tie the other bootlace. That is, fixing a Hilbert space, we ask what kinds of operators we are restricted to if we require that every permissible operator $U$ must be like $R_t(\theta)$ in that it preserves distance in a certain sense, and can also be written as $U(t)$ for a particular $t$, indicating the duration of time of the interaction, such that $U$ is in some sense continuous in its parameter $t$, and also in some sense independent of $t$ itself.

Let us immediately be more precise with what we want out of each permissible linear operator $U$.

1. It must be indeed be a linear operator $U\in\mathcal{L}(H)$ where $H$ is a Hilbert space, and not any arbitrary function on $H$.
2. It must preserve distances, in the same sense as the last section. This requirement is more commonly written as $\Vert s-t\Vert=\Vert Us-Ut\Vert$, which is equivalent to our earlier formulation. In other words, $U$ an isometry with respect to the metric induced by the norm. When $U$ is also a linear operator, we say that it is a linear isometry, so that it is equivalently characterized as $\Vert s\Vert=\Vert Us\Vert$, when we put $t=0=U0$ in the previous equation.
3. It can be regarded as an instance $U(t_0)$ of a family of linear operators $U(t)$ in a single parameter $t\in\mathbb{R}$ (physically interpreted as time). This family is 'independent of' the value of the parameter $t$, in the sense that $U(t_2+t_1)=U(t_2)U(t_1)$ for $t_1,t_2\in\mathbb{R}$, and that $U(0)=I$. In words, this means that applying the transformation for a duration of $t_2+t_1$ on some vector $s$ is equivalent to applying the transformation for a duration of $t_2$ on the state vector $U(t_1)s$.
   - Immediately, this formalizes the notion of being independent of $t$ in the in the following sense: one can imagine the family $U$ requiring two parameters, $U(t,t+t_l)$, such that while we may still decompose $U(t,t+t_l)=U(t+t_m, t+t_l)U(t, t + t_m)$, in general $U(t, t+t_l)\neq U(0, t_l)$ nevertheless. The one-parameter characterization that we have chosen instead tells us that the form of $U$ is independent of the time at which the interaction began, and only the duration of the interaction matters. Indeed, we are primarily interested in properties of systems that maintain this independence, because a property of a system's time-evolution that cannot at least partially be described independent of absolute time is necessarily random and holds no predictive power.
4. The intuition that applying the interaction over no time at all is simply identity must hold. That is, $U(0)=I$. Together with the previous property, we have $U(t)U(-t)=U(-t)U(t)=U(0)=I$. This tells us that $U(t)$ must be invertible for each $t$. We note that among functions on $H$, a unitary operator is equivalently characterized as an invertible linear isometry. This makes each $U(t)$ a unitary operator, and so indeed $U(t_0)$ as well.
5. The family formed must be [strongly continuous](https://en.wikipedia.org/wiki/Strong_operator_topology) in the sense that $\lim_{t\to t'} U(t)s=U(t')s$ for each $s\in H$. Intuitively, together with the previous property, this means that arbitrarily small deviations in the state vector can be achieved by limiting the duration of the interaction to an arbitrarily small time.

Together, these properties make $\{U(t) | t\in\mathbb{R}\}$ into what we call a _strongly continuous one-parameter unitary group_.

**[Stone's theorem.](https://en.wikipedia.org/wiki/Stone%27s_theorem_on_one-parameter_unitary_groups)** Let $H$ be a Hilbert space. There exists a one-to-one correspondence between unitary groups and self-adjoint operators $A\colon D_A\to H$ on $H$. In more detail, $U(t)=e^{itA}$, where the RHS expression is the operator exponential, the well-definition of which rests on the [spectral theorem](https://en.wikipedia.org/wiki/Spectral_theorem). Moreover, exactly when $U$ as an operator-valued function over the reals is continuous with respect to the operator norm, then $A$ is bounded and has the whole of $H$ as its domain. (Note that for self-adjoint operators to $H$, $D_A$ is uniquely determined; no self-adjoint operator is a proper restriction of the other.)

**Corollary.** If $H$ is finite-dimensional, the self-adjoint operators on $H$ have the whole of $H$ as their domain.

The proofs of Stone's theorem and the spectral theorem are out of scope. The spectral theorem will be stated much later. Nonetheless, it cannot be emphasized enough that Stone's theorem motivates the QM formalism because it gives us a way to talk about the rate of change in states over time using a single operator $H$.

We now work through $R_z$ in our setting of light polarization as an example.

Earlier, we remarked that $R_z(\theta)$ gates could be implemented with a single wave plate cut to a precise thickness linear in $\theta$. Let us try to see how this quantum-mechanical phenomenon can be modeled. It is in some sense possible to model how photons interact with the bound atoms that comprise the crystal structure in the wave plate, which would be in the realm of quantum electrodynamics, but computations in this model are generally intractable. We shall not go that far, but instead abstract this interaction into a "invariant" change over time as photons travel through the crystal structure. We make an additional modification: we assume a constant velocity for the photon, and instead parametrize $R_z$ by the duration the photon spends interacting with the material, instead of distance. Doing so fits into our convention of parametrizing interactions in QM by time.

In other words, consider the system of photon traveling in a wave plate with the fast axis labeled $\ket{0}$ and the slow axis labeled $\ket{1}$. For our purposes, a system, generally speaking, is the evolution over time of a class of initial states that we wish to deal with in the same way. We call each initial state an instance of the system and represent the evolution as a function $T$ such that $T(t,s_0)$ denotes the state after duration $t$ of the $s_0$ instance of the system. So for this system, the polarization of a photon in state $\ket{\phi}$ evolves over time $t$ as $R_z(t)\ket{\phi}$, up to constants involving measurement units and velocity. We want a way to describe the instantaneous change in state in this system, which for this system should be constant. Let us write

$$
U(t)=R_z(2t)=\begin{pmatrix}
e^{-it} & 0 \\
0 & e^{it}
\end{pmatrix}
$$

where the additional constant simplifies the representation. We can then perform the formal change in representation and write

$$
U(t)=\exp\left(it\begin{pmatrix}
-1 & 0 \\
0 & 1
\end{pmatrix}\right)
$$

Let us begin our attempt by using the Jacobian to represent the change over time and state space and find some notion of "invariance" in it. First view $U$ as a function in $\mathbb{R}\times\mathbb{C}^2\to\mathbb{C}^2$; this means that on a state $\left(\begin{smallmatrix}x \\ y\end{smallmatrix}\right)$ at time $t_0=0$, we have $U(t;x,y)=U(t)\left(\begin{smallmatrix}x \\ y\end{smallmatrix}\right)$ as the new state it has after $t$ time. We denote this by $\left(\begin{smallmatrix}x_t \\ y_t\end{smallmatrix}\right)=U(t;x,y)$. Computing the Jacobian, we get

$$
\begin{align*}
J_U(t; x, y)
&=\begin{pmatrix}
	-ixe^{-it} & e^{-it} & 0 \\ iye^{it} & 0 & e^{it}
\end{pmatrix} \\
&=\begin{pmatrix}
	D_tU(t;x,y) & D_x(t;x,y) & D_y(t;x,y)
\end{pmatrix}.
\end{align*}
$$

Alright, there are some redundant partial derivatives in this; we are only interested in the derivative with respect to time. We have $D_tU\colon \mathbb{R}\times\mathbb{C}^2\to\mathbb{C}^2$ defined as

$$
\begin{align*}
D_tU(t; x, y)&=\begin{pmatrix}
	-ixe^{-it} \\ iye^{it}
\end{pmatrix}=i\begin{pmatrix}
	-1 & 0 \\ 0 & 1
\end{pmatrix}U(t)\begin{pmatrix}
	x \\ y
\end{pmatrix} \\
&=i\begin{pmatrix}
	-1 & 0 \\ 0 & 1
\end{pmatrix}\begin{pmatrix}
	x_t \\ y_t
\end{pmatrix} \\
&=i\begin{pmatrix}
	-1 & 0 \\ 0 & 1
\end{pmatrix}U(0)\begin{pmatrix}
	x_t \\ y_t
\end{pmatrix} \\
&=D_tU(0;x_t, y_t).
\end{align*}
$$

With this factorization, we have the interpretation that for each initial state $(x,y)$, the derivative with respect to time for the state after time $t$, which is now at $U(t)\left(\begin{smallmatrix}x \\ y\end{smallmatrix}\right)$, is the same as the derivative an initial state at $U(t)\left(\begin{smallmatrix}x \\ y\end{smallmatrix}\right)$ would immediately experience. It is in this sense that the change in time is invariant.

Let me tie this notion back to the notation given by Stone's theorem. If $U(t)=e^{itA}$, then taking derivatives formally, we have

$$
D_tU(t)=D_t(t\mapsto e^{itA})(t)=iAe^{itA}=iAU(t),
$$

which seems to agree with the notation we had worked out earlier. The derivative here I have just presented is what is sometimes known as a **strong derivative**, where strong is used in the same sense as in "strongly continuous". That is, if $T(w)$ is parametrized family of operators on a Hilbert space $H$ that is strongly differentiable at a parameter value $w_0$, then, the function $T(w;v)$ has a partial derivative $D_w(w_0;v')$ at $w_0$ for each $v'\in H$, which again is the general notion of derivative we had worked out in the $R_z$ example. Stone's theorem gives us that strongly continuous one-parameter unitary groups are also strongly differentiable everywhere in that parameter, and has the form as laid out in the formal derivative.

We had lucked out in our treatment of $R_z$ as it was diagonal when viewed as a matrix in the computational basis. But it is not too much trouble (conceptually) to deal with unitary matrices that are not diagonal. In general, if $U(t)$ is a family of matrices that form a a strongly continuous one-parameter unitary group when viewed as operators, then there exists a change of basis that allows us to write $P^{\dagger}DP$, so that $D$ is diagonal, with each diagonal entry of the form $e^{ita_i}$ for some $a_i\in\mathbb{R}$. Then if $A'$ is the diagonal formed by the $a_i$ entries, we have $U(t)=e^{itP^{\dagger}A'P}$.

If, as in our example, $U(t)$ is a strongly continuous one-parameter unitary group such that $U(t)\ket{\psi}$ is the state at time $t$ of the instance of the system with initial state $\ket{\psi}$, then we call $U$ the time-evolution operator of the system. We call $A$ such that $U(t)=e^{itA}$ the Hamiltonian of the system. (Our definition of the Hamiltonian differs from the standard QM definition by a constant factor of $-1/\hbar$—the standard definition is motivated by convention and existing physical units of measurement.)

Let us now discuss the physical significance of $A$ and its eigenbasis. We shall presently assume that $A$ admits an eigenbasis, which must be countable, and defer an overview of how to treat the case when $A$ does not admit an eigenbasis to the next section. As a sufficient condition, if $H$ is finite-dimensional, then $A$ must admit a (finite) eigenbasis. Note that $A$ and $U(t)$ always admits the same eigenbasis. Now consider the expression of an arbitrary state vector in this eigenbasis. Since $U(t)$ is unitary, its eigenvalues have unit magnitude, and so the magnitudes of component coefficients in this eigenbasis do not change over time. Moreover, if $a_i\in\mathbb{R}$ is the eigenvalue of $A$ for a particular basis component, then the phase of the component coefficient changes over time at a constant rate of $a_i$ radians per unit time (the eigenvalues of a self-adjoint operator are real). Going back to the fact that the magnitudes do not change over time, if we are able to perform a measurement in this eigenbasis, the pmf corresponding to it must remain constant over time. Now recall that this eigenbasis is uniquely determined, so that it is only in this basis, that across all initial states, magnitudes of component coefficients are constant over time.

In analogy to the classical notion of energy as the foremost abstract quantity that is conserved over time in a model of a closed system, we call the basis components the distinct energy states of the system. Then in general a state vector is in a superposition of multiple energy states. We call the set of distinct eigenvalues the energy levels of the system.

Being able to talk about the Hamiltonian directly is very useful for representation. We are frequently interested in systems where the Hamiltonian can be thought of as the sum of distinct interactions, each of which have a different conceptual meaning, where different concepts reflect how we (are able to) control and manipulate them outside the model. For example, the interactions underlying circuit gates in quantum computing technologies like superconducting qubits or trapped ions come from precisely shaped and timed interactions with the electromagnetic field. We may, at an extremely high level, describe the Hamiltonian of the qubit register during an interaction as $A_q+A_i$[^2] where $A_q$ represents the Hamiltonian of the register as a closed system, and $A_i$ represents its interaction with the electromagnetic field that we are able to control. We typically call the additive terms Hamiltonians as well in an abuse of terminology; in this example we may call $A_q$ and $A_i$ the qubit Hamiltonian and the interaction Hamiltonian, for example. In contrast, the unitary of the system cannot easily be decomposed likewise when the Hamiltonian can be additively decomposed in this manner. We now close the section by discussing how decomposition of the Hamiltonian is used two common applications of QC.

**Application: Hamiltonian simulation.** An application of QC is Hamiltonian simulation. Given the Hamiltionian of a finite-dimensional QM system, an initial state, and an observable, a duration, all encoded in respect to the qubit register; and a duration and an error bound (with respect to some metric on time-evolution operators), the task is to simulate the system for that duration in respect to that time-evolution operator, then measure in respect to the observable.

**Trotter–Suzuki decomposition.** Suppose the Hamiltonian of a system can be expressed as the sum of Hamiltonians that neatly correspond to time-evolution operators (e.g. multiples of Pauli gates on qubits), even though the system Hamiltonian itself cannot. We can then still approximate the time evolution operator of the system, by breaking down the duration of the simulation into small time steps, and in each time step we simulate in turn each of the time-evolution operators corresponding to the terms of the Hamiltonian, with the approximation improving by decreasing the duration of each time step.

We can then use the Trotter–Suzuki decomposition to achieve the QC task: 1) prepare the initial state with a circuit; 2) Use a sequence of identical circuits to implementing each time step of the decomposition; 3) measure in respect to the observable; this usually involves a change of basis to the computational basis, then the measured qubit register is mapped to the corresponding eigenvalue of the observable.

**Application: The Ground State.** Recall that an atom or molecule can absorb energy in the guise of a photon, and transition to a higher energy state. It can also emit a photon to transition to a less energetic state. A least energetic state for the molecule known as the ground state exists, and under normal circumstances, is the state one usually finds an atom or molecule in. Knowing the ground state energy of molecules of reactions informs us a lot on how reactive the molecule is, and what kinds of reactions are more commonplace, and much else. The electronic configuration (state of bound electrons of a molecule) is the dominant contributor to ground state energy under the widely-used [Born–Oppenheimer approximation](https://en.wikipedia.org/wiki/Born%E2%80%93Oppenheimer_approximation), and we can talk about a ground state for the electronic configuration. The ground state energy is exactly the least eigenvalue of the Hamiltonian of a QM system modeling the electronic configuration. There exist methods that can efficiently map (approximations of) electronic configurations to qubit space, and the electronic Hamiltonian to weighted sums of Pauli strings. Pauli strings are tensor products of Pauli matrices on qubits. So each Pauli string spells out a different Pauli gate operation to perform on each qubit, or the identity map. Under this mapping, it is still generally intractable to diagonalize the Hamiltonian.

Instead, suppose that we have prepared a state $\ket{\psi(\theta)}$. It is then in a superposition of energy states as defined by the eigenbasis of the Hamiltonian, and is therefore associated with an expected energy level $E_{\psi(\theta)}$, as the sum of the probabilities of the eigenstates weighted by the corresponding eigenvalue of the Hamiltonian. This expectation is then an upper bound to the ground state energy level. While diagonalization is intractable, we can still do the following. Linearity of expectation allows us to decompose this expectation to a weighted sum over expectations of the constituent Pauli strings. The Pauli strings themselves are typically well-supported as observables across many QC technologies. So we implement circuits measuring the observables defined for each Pauli string, run each circuit for multiple shots, then classically compute the corresponding empirical expected energy level.

If additionally we have that $\theta\mapsto\ket{\psi(\theta)}$ has a derivative, then in fact the whole function $\theta\mapsto E_{\psi(\theta)}$ has a derivative, and we can compute it.[^3] With the above protocol to compute the expected energy level and gradients, we can perform gradient descent to find the parametrization $\theta_0$ that gives the lowest expected energy level, which is still an upper bound of the ground state energy level. We call this whole protocol a _variational quantum eigensolver_, and each parametric circuit that first prepares $\ket{\psi(\theta)}$ and then measures it in respect to a Pauli string is called an _Ansatz_.

---

In the previous post, we showed how the representation of quantum states in QM emerged from figuring out a way to succinctly model the dynamics of a class of light polarization experiments. In this post, we discussed how to model closed quantum systems that change continuously in time, and how to express a notion of energy under that evolution. Nevertheless, so far we have just dealt with these notions where only finitely-valued properties are concerned. For many applications this is sufficient, but when one wants to deal with continuum-valued properties, then sophisticated mathematical tools need to be brought to bear to model them in a mathematically rigorous manner. We give a quick overview of them in the next post.

[^1]: This is, of course, not necessarily true in practical quantum computers, which are much more complex. Nevertheless, the point still stands that each interaction is some continuous change over time, and no interaction causes the quantum state to jump discontinuously from one state to another instantaneously.

[^2]: It is more conventional to denote the Hamiltonian with $H$, but we do not do that here as we have used $H$ to denote the Hilbert space.

[^3]: Within the circuit itself, the [parameter-shift rules](https://pennylane.ai/qml/glossary/parameter_shift) tell us how to backpropagate the gradient.

---
title: "\"No guessing\" in puzzle games"
description: "In computational terms."
pubDate: "2026-03-28"
tags: ["brook", "logic puzzle", "ai draft"]
draft: true
---

## The solver's claim

Puzzle forums carry a recurring assertion: this Sudoku can be solved without guessing. Solvers who take pride in this mean something specific — at every step, there is a move that can be *deduced* from the current board state. You never have to write a digit in pencil, follow consequences, and erase when you reach a contradiction.

This feels like a meaningful distinction. But it immediately raises a question: forced for whom? Two solvers with different technique repertoires will draw the line differently. For a beginner, a naked triple might feel like magic — something that requires checking all combinations of three cells across a row. For an experienced solver, it's just another deduction. One solver's "forced move" is another's "I had to guess."

The interesting question isn't whether a puzzle can be solved without guessing, but what class of work a "non-guessing" solution requires — and whether that class is genuinely different from trial-and-error.

## Two kinds of work

To make this precise, consider two ways of solving a Sudoku.

The first way: at each step, scan the board and look for a cell or a house that satisfies the condition for some known technique. Naked singles require that a cell have only one remaining candidate. Hidden singles require that a digit appear as a candidate in exactly one cell of some row, column, or box. Each pass through the board attends to each cell a small number of times — you check a cell's row, column, and box, each of fixed size — and either makes definite progress (a digit placed, a candidate eliminated) or terminates the pass. With at most as many progress-making steps as there are cells on the board, the total work is comparable to a small multiple of the number of cells squared. Call this *P-like work*: the effort scales with the board in a way that stays tractable as the board grows.

The second way: try a digit in some cell, propagate the constraints, and check whether you've reached a valid completion or a contradiction. If a contradiction, backtrack and try the next candidate. The number of apparently legal partially-completed boards — states that haven't yet violated any Sudoku constraint — is enormous. Even with aggressive pruning, the number of states you might visit grows much faster than any polynomial in the number of cells. Call this *NP-like work*: the effort scales with the number of legal states, not with the board dimensions.

When the puzzle community says "no guessing," they are drawing a line between P-like work and NP-like work. A technique is legitimate if applying it costs P-like work — if recognizing when and where it applies, and executing it, requires attending to each cell only a manageable number of times.

## Advanced techniques and their subspaces

Vanilla techniques are unconditional: a naked single fires whenever a cell has one candidate; you don't need a specially constructed board to find one. But the more powerful techniques are conditional on the board having a particular structure.

An X-wing, for instance, fires when a digit appears as a candidate in exactly two cells of each of two rows, and those cells share the same two columns. When this pattern is present, you can eliminate that digit from all other cells in those columns. The technique is P-like in its cost — identifying the pattern requires a pass over the board — but it only applies when the board lies in a specific subspace: one where that particular column-aligned pair structure exists.

This matters because puzzle authors who use these techniques are selecting boards from that subspace. A Sudoku designed to require an X-wing has been constructed so that the standard vanilla techniques stall out, and the X-wing pattern is the available next step. Outside that subspace — in a generic hard puzzle — the technique simply doesn't fire, and you're left with nothing to show for the scan.

The community's inventory of advanced techniques is therefore an inventory of known subspaces: patterns that, when present, admit a P-like resolution. Owning the inventory means knowing how to recognize membership in each subspace and how to exploit it.

## The cost of the inventory itself

This introduces a subtler cost. Given a board that has resisted vanilla techniques, which advanced technique do you try next? The standard approach is to work through a ranked list: try naked pairs, then hidden pairs, then X-wings, then Swordfish, and so on. Each technique requires its own scan of the board. If the board admits none of them, you've spent work proportional to the number of techniques times the board size — and made no progress.

Recognizing that a board is in the right subspace for technique T is itself a non-trivial pattern-matching problem. Experienced solvers develop heuristics — when the candidates in this region look like X, try Y — which compress the search over the inventory. But for a solver new to a technique, or encountering a variant where new techniques apply, identifying the right approach can dominate the actual solving work.

This is still P-like work in principle, since the inventory is fixed and finite and each scan attends to each cell a bounded number of times. But it reveals that "no guessing" is relative to a fixed, known inventory. The inventory must exist in advance.

## Hard instances

Some Sudoku boards resist every technique in the community's inventory. They are not malformed — they have unique solutions, they are well-posed — but no sequence of P-like steps reaches the solution. The solver who refuses to branch simply gets stuck.

These instances are genuinely NP-like in the sense that any known solution path requires visiting a number of board states proportional to the apparent solution space, not to the board size. The community acknowledges them: they are labeled as requiring "bifurcation" or "trial and error," and are sometimes excluded from competitions or graded harder precisely because the work they demand is qualitatively different.

Their existence means that "no guessing required" is not a universally achievable property of well-posed Sudokus. It is a property of a specific subset — those whose solution path lies within reach of the community's technique inventory.

## Novel techniques and rule search

There is a final, stranger case: a board that *could* be solved without guessing, if only the solver knew a technique not yet in the community's inventory. Puzzle authors sometimes construct such boards deliberately, as a challenge — solve this without bifurcation.

To respond, a solver must discover the technique. This means searching over the space of possible logical patterns — candidate configurations and their forced implications — looking for one that applies to the board and advances the solution. That search space is at least as large as the board-state space, and typically larger, since the solver is searching over *rules* rather than board states. The work is not attending to each cell a small multiple of times; it is something closer to enumerating the space of possible P-like deductions and checking each.

This is, ironically, more NP-like than simply backtracking the original puzzle. A solver doing rule search is guess-and-checking in a space that dwarfs the space of candidate board completions. The fact that a successful discovery yields a clean, "no guessing" solution does not change the cost of the discovery process.

## What "no guessing" actually means

The upshot is that "no guessing required" is not a property of a puzzle in isolation. It is a property of a puzzle relative to an inventory of techniques — a community artifact, accumulated over time as solvers have identified and named the subspaces that admit P-like resolution.

A puzzle requires no guessing if and only if there exists a sequence of techniques from the inventory, each costing P-like work, whose composition solves it. Change the inventory — by adding house rules, by playing a variant, by drawing on techniques the community hasn't formalized — and the line between guessing and not-guessing moves.

This is what puzzle authors mean, even when they don't put it in these terms. When they say "no guessing required," they mean: given the standard toolkit, you will never need to branch. It's a claim about the puzzle's relationship to a shared, historically contingent inventory. And that inventory is itself the product of a long search — one that was, at every step, NP-like.

---
layout: post
title: The Minesweeper Theorem
category: Leisure
tags: [game, mathematics, minesweeper]
---

There's an equation that describes many situations in the Minesweeper
game where you can reveal or flag a group of squares with complete
confidence, if those squares already neighbor an uncovered square.

## Definitions

* By beside a square \\(s\\), we mean the \\(8\\) squares around the
  square \\(s\\).
* By a flagged square, we refer to a square that we are completely
  certain hides a bomb underneath it.
* By a revealed square, we refer to a square that we are completely
  certain does not hide a bomb. In addition, it displays a number.
  Remember that revealed squares with no number on them are implicitly
  numbered \\(0\\).

## The Theorem

* Consider any two revealed squares \\(a\\) and \\(b\\).
* Let the set of unflagged but unrevealed squares around \\(a\\) be
\\(A\\), and the set of unflagged but unrevealed squares around
\\(b\\) be \\(B\\).
* In addition, let the set of unflagged but unrevealed squares around
both be \\(U=A\\cap B\\) and let \\(A'=A\setminus B\\). Likewise, let
\\(B'=B\setminus A\\). Then \\(A'\\) is the set of unflagged but
unrevealed squares beside
* Let \\(a\\) and \\(b\\) also represent the number on those
  respective uncovered squares.
* Let \\(f_a\\) be the number of flagged squares around \\(a\\) and
  let \\(f_b\\) be the number of flagged squares around \\(b\\).
* Let \\(n_a=a-f_a\\) be the number of unflagged but unrevealed
  squares beside \\(A\\) but not beside \\(B\\). Likewise, let
  \\(n_b=b-f_b\\).

Then, without loss of generality, let \\(a\\geq b\\). If
\\[n_a-n_b=\\left|A'\\right|,\\] then all the squares in \\(A'\\)
contain bombs and all the squares in \\(B'\\) do not contain bombs.

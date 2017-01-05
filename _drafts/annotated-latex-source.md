---
layout: post
title: An Annotated LaTeX template
category: Design
tags: [tex]
---

The last couple months I have been experimenting with using LaTeX to
typeset very comprehensive summaries of certain textbooks and answers
to their exercises for personal use. These documents have very
interesting requirements, and I think that the decisions I have made
are good choices and will help save time for the reader in a variety
of use cases, especially those pertaining to literature, mathematics,
and computer science.

## Engine choice: XeTeX and LuaTeX

In general, documents utilizing XeTeX/LuaTeX features are not
compilable by the pdfTeX engine. XeTeX and LuaTeX provide native
support for code in UTF-8. Traditional TeX/pdfTeX are nevertheless
forward-compatible with XeTeX/LuaTeX. I have found that the
`polyglossia` package may have some trouble doing its job of switching
language typographic rules under LuaTeX, at least between English and
French.

TODO: insert image illustrating typography problems.

While
dated,
[this paper](http://www.tug.org/~vieth/papers/context2010/context-paper.pdf) suggests
that the situation is reversed for OpenType math typesetting; XeTeX
primarily uses TeX metrics, while LuaTeX correctly uses the metrics
specified by the OpenType math font. I'll discuss more about OpenType
math typesetting below.

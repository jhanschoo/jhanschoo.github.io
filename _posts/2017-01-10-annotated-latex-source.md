---
layout: post
title: An Annotated jack-of-all-trades LaTeX template
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

While
dated,
[this paper](http://www.tug.org/~vieth/papers/context2010/context-paper.pdf) suggests
that the situation is reversed for OpenType math typesetting; XeTeX
primarily uses TeX metrics, while LuaTeX correctly uses the metrics
specified by the OpenType math font. I'll discuss more about OpenType
math typesetting below.

## Document class: `memoir`

```tex
% For more powerful document formatting
\documentclass[a4paper,10pt,oneside,twocolumn,article,draft]{memoir}
```

The [`memoir`](https://www.ctan.org/pkg/memoir) package is very
flexible, and it makes it easy for one to make many common
customizations that a standard `article` or `book` class does not
support.

* `a4paper` specifies that the paper stock should be A4, (alternatively use `letter`).
* `10pt` specifies the text size: I do not recommend it on A4 or
  letter unless also using `twocolumn`, since it otherwise results in
  line widths too wide for easy reading.
* `oneside` specifies that pages are read like office memos, rather
  than having two pages displayed at a time while reading and having
  left and right pages. `twoside` specifies the latter.
* `twocolumn` specifies that text should be typeset in two columns by default.
* `article` tells `memoir` to emulate the `article` LaTeX document
  class in its heading/sectioning styles.
* `draft` makes the output highlight overfull boxes, and also exposes
  to other packages to default their options to their defaults for
  `draft`s, rather than for `final`.

In addition to this style, I also like to use `memoir` with the
`12pt`, `twoside`, `onecolumn` together instead of `10pt`, `oneside`,
and `twocolumn`. The `twoside` options I use for more involved work,
the `oneside` options I use for documents intended to be used as memos
and notes.

```tex
% nag
\usepackage[l2tabu,orthodox]{nag}
```

The [`nag`](https://www.ctan.org/pkg/nag) package warns about using obsolete packages.

``` tex
% dummy text
\usepackage[math]{blindtext}
```

The [`blindtext`](https://www.ctan.org/pkg/blindtext) package exposes the `\Blinddocument` command,
which allows you (me) to preview the effects of customizations on
dummy text.

``` tex
% For more powerful command and environment definition
\usepackage{xparse}
```

The [`xparse`](https://www.ctan.org/pkg/xparse) package allows us to replace `\newcommand`,
`\newenvironment`, `\renewcommand`, etc. with safer and more powerful
variants `\NewDocumentCommand`, `\NewDocumentEnvironment`, etc. that
includes basic conditional handling.

``` tex
% color support
\usepackage{xcolor}
```

The [`xcolor`](https://www.ctan.org/pkg/xcolor) package allows us to define colors and use them
in several contexts, and we use it to define darker colors for links
created by `hyperref`.


``` tex
% For math support
\usepackage{amsmath,amssymb}
\usepackage[amsmath,hyperref,thmmarks]{ntheorem}
```

The [`amsmath`](https://www.ctan.org/pkg/amsmath) package defines several equation environments
necessary for typesetting, while `amssymb` defines many math
operators, including several useful ones not present in base LaTeX. If
using OpenType/TrueType fonts via `fontspec`, `amssymb` must be
included before `fontspec`.

We choose to use the [`ntheorem`](https://www.ctan.org/pkg/ntheorem) package to provide greater
customization than `amsthm` or default LaTeX theorem environments. The
`amsmath` and `hyperref` options provide compatibility with those
respective packages, while `thmmarks` automatically inserts symbols at
the end of theorem environments, though it is pretty wonky.

``` tex
% For multilingual support
\usepackage{fontspec}
\usepackage{realscripts}
\usepackage{unicode-math}
\usepackage{polyglossia}
```

The [`fontspec`](https://www.ctan.org/pkg/fontspec) package allows us to typeset our document with
OpenType fonts; including the fonts distributed with your TeX
distribution and those installed into your OS.

The [`realscripts`](https://www.ctan.org/pkg/realscripts) package redefines `\textsubscript` and
`\textsuperscript` to use the OpenType subscript and superscript
features (faces) to typeset subscripts and superscripts.

The [`unicode-math`](https://www.ctan.org/pkg/unicode-math) package allows us to easily use a Unicode
math font for math typesetting. In comparison to other font and
typesetting technologies, Unicode Math is a pretty new piece of
technology pioneered by Microsoft.

The [`polyglossia`](https://www.ctan.org/pkg/polyglossia) package allows us to specify a non-english
language for the document to be typeset in. I use it to typeset
language notes.

``` tex
% For algorithm listing support
\usepackage[ruled,dotocloa,lined,linesnumbered]{algorithm2eutf8}
```

The [`algorithm2e`](https://www.ctan.org/pkg/algorithm2e) package
seems to me to offer more features for customizability, as well as
features that allow me to write DRYer code over competing algorithm
packages. However, the `algorith2e.sty` file offers localization
features not encoded in UTF-8 and this results in an error when used
in XeTeX and LuaTeX. I worked around this by reencoding the file in
UTF-8 (calling it `algorithm2eutf8`); however, this isn't a general
fix as this makes it incompatible with `pdfTeX` and `TeX` by default.

* `ruled` specifies that code block indentations are decorated with a
  vertical rule.
* `dotocloa` specifies that a list of algorithms should be generated
  alongside the table of contents.
* `lined` specifies that algorithm listings have the `lined` style,
  emulating the look of `booktabs` tables.
* `linesnumbered` specifies that listings should have line numbers.

``` tex
% Using Chivo for Display text, Erewhon for body, and Pagella for math
% c.f. fontspec and unicode-math
% also c.f. erewhon and tex-gyre-math
\setmainfont{Erewhon}[
Extension = .otf,
UprightFont = *-Regular,
ItalicFont = *-Italic,
SlantedFont = *-RegularSlanted,
BoldFont = *-Bold,
BoldItalicFont = *-BoldItalic,
BoldSlantedFont = *-BoldSlanted,
Ligatures = TeX
]
\setmathfont{texgyretermes-math.otf}
\setmathfont[range={\setminus}]{Asana-Math.otf}
%\setmathfontface\mathup{texgyretermes-regular.otf}
\setmathfontface\mathit{texgyretermes-italic.otf}
\setmathfontface\mathbf{texgyretermes-bold.otf}
\setmathfontface\mathsf{DejaVuSans.ttf}
\newfontfamily\chivo{Chivo}[
Extension = .otf,
UprightFont = *-Regular,
ItalicFont = *-Italic,
BoldFont = *-Bold,
BoldItalicFont = *-BoldItalic,
Ligatures = TeX
]
\newfontfamily\chivobold{Chivo}[
Extension = .otf,
UprightFont = *-Bold,
ItalicFont = *-BoldItalic,
BoldFont = *-Black,
BoldItalicFont = *-BlackItalic,
Ligatures = TeX
]
\newfontfamily\chivolight{Chivo}[
Extension = .otf,
UprightFont = *-Light,
ItalicFont = *-LightItalic,
BoldFont = *-Bold,
BoldItalicFont = *-BoldItalic,
Ligatures = TeX
]
```

`\setmainfont` here is exposed by `fontspec` and specifies that text
should be typeset in Erewhon, a derivative of Adobe Minion, by
default. Minion is a typeface similar to Times that is very legible
and conveys an air of precision well-suited to technical documents.

`\setmathfont` here specifies that `texgyretermes-math` should be used
for math typesetting. However, the font does not contain the
`\setminus` symbol, and we substitute the symbol in from the Asana
Math font.

After that, we specify that `texgyretermes` variants, as well as
`DejaVuSans`, should be used for the respective `\mathXX` commands
rather than the default Erewhon.

We then specify several commands that expose the Chivo typeface in
several different weights. We use Chivo because it is very geometric
in style, and offers a nice complement to Erewhon. In addition, it is
available in several heavy weights, which makes it easy to draw strong
contrast against Erewhon. We shall use Erewhon in emphasized elements;
that is, basically everything except for body and mathematical text.


``` tex
% For formatting itemize and enumerate environments
\usepackage{enumitem}
```

The [`enumitem`](https://www.ctan.org/pkg/enumitem) package offers powerful tools to define and customize
list environments like `itemize`, `enumerate`, and `description`.

``` tex
% For better tables
\usepackage{longtable}
\usepackage{tabu}
```

The [`longtable`](https://www.ctan.org/pkg/longtable) package allows
us to typeset text tables that span multiple pages.
The [`tabu`](https://www.ctan.org/pkg/tabu) package is a powerful
table package that allows us to typeset tables with column widths
proportional to each other without hardcoding exactly how wide each
column should be. There are very many table packages, many of them
mutually incompatible, but the `longtable` and `tabu` combination is
probably the most versatile.

Note that `longtable` is incompatible with text areas typeset as two
or more columns.

``` tex
% To mark sections as TODO
\usepackage[margin,noinline]{fixme}
```

The [`fixme`](https://www.ctan.org/pkg/fixme) package allows us to typeset placeholders for use when
typesetting informal documents and drafts.

``` tex
% Debugging labels
%\usepackage{showlabels}
```

The [`showlabels`](https://www.ctan.org/pkg/showlabels) package overlays the names of `\label` commands where
they appear in the document. This helps in writing and debugging
references in drafts.

``` tex
% PDF features
\usepackage[
final
%,colorlinks
,anchorcolor=darkgray
,linkcolor=red!75!black
,citecolor=green!75!black
,menucolor=red!75!black
,urlcolor=magenta!75!black
,unicode]{hyperref}
```

The [`hyperref`](https://www.ctan.org/pkg/) package provides functionality to typeset PDF
hyperlinks, and it (by default) changes certain elements of a LaTeX
document into very useful hyperlinks referring to other parts of the
document. It also provides functionality for creating PDF forms. The
functionality offered in this package is often very fragile, and
packages that are not designed to be compatible with it often break
its functionality.

We use color expressions exposed by `xcolor` to redefine the colors of
hyperlinks as their default appearance is too bright for me.

``` tex
\usepackage[perpage]{footmisx}
```

The [`footmisx`](https://www.ctan.org/pkg/footmisx) package, recently
uploaded to CTAN at Dec 2016,
exposes [`footmisc`](https://www.ctan.org/pkg/footmisc) functionality,
while maintaining compatibility with `hyperref`'s changing footnote
marks into links to footnotes. Here we specify the `perpage` option to
reset the footnote numbering every page.

Note that as of the time of writing, the `footmisx` package contains a
syntax error from a stray line. You can fix this by trying to compile
a document including `footmisx` to locate the erroreneous line, then
doing a diff between `footmisx.sty` and `footmisc.sty` to see what the
line should appear like instead.

``` tex
\usepackage{footnotebackref}
```

The [`footnotebackref`](https://www.ctan.org/pkg/) package changes the
numbers of footnotes into links that link back to where the footnote
mark appears in the text.

``` tex
% For enhanced referencing functionality
\usepackage{cleveref}
```

The [`cleveref`](https://www.ctan.org/pkg/cleveref) package exposes
enhanced label and referencing functionality through `\cref`.

``` tex
% Geometry cf. memoir
\raggedbottom
```

Specifies that `memoir` shouldn't try too hard to ensure than the
printed portion of each page should have the same height.

``` tex
% defining multiningual support cf. polyglossia
\setmainlanguage{english}

% definition of theorem environments, cf. ntheorem

\makeatletter
\newtheoremstyle{myplain}%
{\item[\hskip\labelsep \theorem@headerfont ##1\ ##2\theorem@separator]}%
{\item[\hskip\labelsep \theorem@headerfont ##1\ ##2]{\theorem@headerfont\ (##3)\theorem@separator\hskip\labelsep}}%
\newtheoremstyle{nonumberproof}%
{\item[\hskip\labelsep \theorem@headerfont ##1\theorem@separator]}%
{\item[\hskip\labelsep \theorem@headerfont ##3\theorem@separator]}
\makeatother
```

``` tex
\theoremstyle{myplain}
\theoremheaderfont{\normalfont\chivolight\bfseries}
\theoremsymbol{\ensuremath{_\Box}}
\theoremseparator{.}
\newtheorem{thm}{Theorem}[chapter]
\newtheorem{lem}[thm]{Lemma}
\newtheorem{prop}[thm]{Proposition}
\newtheorem{cor}[thm]{Corollary}

\theorembodyfont{\upshape}
\newtheorem{defn}[thm]{Definition}
\newtheorem{rem}[thm]{Remark}
\newtheorem{exmp}[thm]{Example}
\newtheorem{xca}{Exercise}[section]
\newtheorem{prb}{Problem}[chapter]

\theoremstyle{nonumberproof}
\theoremheaderfont{\normalfont\chivolight}
\theorembodyfont{\upshape}
\theoremsymbol{\ensuremath{_\blacksquare}}
\newtheorem{prf}{Proof}
```

Theorem environment definitions using commands exposed by `ntheorem`.

``` tex
% Workaround for the H (HERE-option) for the algorithm2e environment
\makeatletter
\NewDocumentCommand{\removelatexerror}{}{\let\@latex@error\@gobble}
\makeatother

\NewDocumentEnvironment{functionh}{}
{\begin{function}} % debug
%{\removelatexerror\begin{function}[H]}
  {\end{function}}
```

Define a wrapper environment around the `function` environment exposed
by `algorithm2e`. The `H` option of `algorith2e` environments specify
that those algorithm listings shouls be typeset where they appear,
rather than floating to the top or bottom of this or the next page
where that appears better. The `H` option has recently been patched to
be compatible with the `twocolumn` environment, but it has a bug where
it raises an error. This wrapper environment allows me to easily
switch between floating environments that raise errors when it detects
one, and having the floats appear in place with errors suppressed.

``` tex
% defining additional algorithm customizations and keywords
% cf. algorithm2e
\SetFuncSty{textsc}
\SetProcNameSty{textsc}
\DontPrintSemicolon
```

Specify that functions should be typeset in small caps, and semicolons
shouldn't be printed, similar to many computer science publications.

``` tex
\SetKwProg{Fn}{function}{}{end}

\SetKwFunction{True}{true}
\SetKwFunction{False}{false}
\SetKwFunction{Nil}{nil}
\SetKwFunction{Deleted}{deleted}

\SetKwInOut{Require}{Require}
\SetKwInOut{Ensure}{Ensure}

\SetKw{KwDownto}{downto}
\SetKw{Error}{error}
\SetKw{Print}{print}
```

We define some common pseudocode keywords; special values should be
typeset like functions, others should be typeset like keywords.

``` tex
% Customize equation numbering, cf. amsmath
\renewcommand{\theequation}{\thechapter.\arabic{equation}}
\numberwithin{equation}{chapter}
```

We specify that equation numbers should reset every chapter (default:
section), but not include the chapter number.

``` tex
% customization of section headers cf. memoir

\setsecnumdepth{subsection}
```

Section headings as small as `\subsection` should be prepended with
the section number. This and the below section customizations are
exposed by `memoir`.

``` tex
\renewcommand*{\beforepartskip}{\null\vskip 50pt}
\renewcommand*{\afterpartskip}{\vskip 40pt}
\renewcommand*{\partnamefont}{\normalfont\chivolight\Huge}
\renewcommand*{\partnumfont}{\normalfont\chivolight\Huge}
\renewcommand*{\parttitlefont}{\normalfont\chivolight\HUGE\bfseries}
\nopartblankpage

\chapterstyle{default}
\renewcommand*{\chapterheadstart}{\vspace*{30pt}}
\renewcommand*{\afterchapternum}{\par\nobreak\vskip 5pt}
\renewcommand*{\afterchaptertitle}{\par\nobreak\vskip 10pt}
\renewcommand*{\chapnamefont}{\normalfont\chivolight\huge}
\renewcommand*{\chapnumfont}{\normalfont\chivolight\huge}
\renewcommand*{\chaptitlefont}{\normalfont\chivobold\Huge\bfseries}

\setsecheadstyle{\normalfont\chivobold\Large\bfseries}
\setsubsecheadstyle{\normalfont\chivobold\large}
\setsubsubsecheadstyle{\normalfont\chivobold\large\itshape}
\setparaheadstyle{\normalfont\chivobold\large}
\setsubparaheadstyle{\normalfont\chivobold\large\itshape}
```

We customize the appearance of `\part` and `\chapter` headings, and
specify that all part, chapter, and section headings should be typeset
in Chivo.

``` tex
% customization of page styles cf. memoir

\makeoddfoot{plain}{}{\chivolight—\,\thepage\,—}{}
\makeevenfoot{plain}{}{\chivolight—\,\thepage\,—}{}
```

This redefines the footer so that page numbers appear between two em
dashes, which is more aesthetically pleasing, especially in `onepage`
documents. These customization commands are exposed by `memoir`.

``` tex
% customization of itemize and enumerate environments cf. enumitem
\setlist{
  noitemsep,
  nosep,
  font=\normalfont\chivobold
}

\setlist[itemize]{
  label=\textbullet
}
```

The `enumitem` allows us to redefine lists so that they use no more
interlinear whitespace than normal text. In addition, I specify that
list headings should use the Chivo font.

``` tex
% customization of tabu environments
\global\tabulinesep=4pt
```

By default, `tabu` does not add enough whitespace between table cells;
as a result, interlinear spacing between lines within a table cell are
wider than spacing between cells. This defines a command that `tabu`
uses to fix that.

``` tex
{% raw %}% customize FiXme labels
\fxsetup{
layout={inline},
inlineface=\chivolight,
marginface=\chivolight,
}

% redefine FiXme labels to have brackets
\makeatletter
\renewcommand*\FXLayoutInline[3]{{\@fxuseface{inline}\{\fxnotename{#1}: #2\}}}
\makeatother{% endraw %}
```

Setup the `fixme` package to use the `inline` style, use the Chivo
typeface, and track language changes by `polyglossia`.

Redefine the `inline` style of `fixme` notes to not show the FiXme logo.

``` tex
% definition of titling content, c.f. memoir class
\title{Notes to Author/Professor's \textit{Course/Book}}
\author{AuthorName}
\pretitle{\begin{center}\chivolight\Huge}
\posttitle{\par\end{center}\vskip 1em}
\preauthor{\begin{center}\normalfont\chivolight\Large\bfseries}
\postauthor{\par\end{center}\vskip 3em}
\predate{}
\date{}
\postdate{}
```

A simple title typeset in Chivo to be inserted at `\maketitle`. cf.
`memoir` for how to typeset fancier title pages.

``` tex
% SHORTHAND

% math shorthand

% delimiters
\NewDocumentCommand{\abs}{s m}{
  \IfBooleanTF #1%
  {\left\lvert{#2}\right\rvert}%
  {\lvert{#2}\rvert}%
}
\NewDocumentCommand{\norm}{s m}{
  \IfBooleanTF #1%
  {\left\lVert{#2}\right\rVert}%
  {\lVert{#2}\rVert}%
}
\NewDocumentCommand{\fl}{s m}{
  \IfBooleanTF #1%
  {\left\lfloor{#2}\right\rfloor}%
  {\lfloor{#2}\rfloor}%
}
\NewDocumentCommand{\ce}{s m}{
  \IfBooleanTF #1%
  {\left\lceil{#2}\right\rceil}%
  {\lceil{#2}\rceil}%
}
```

It is worth noting that we should use `\lvert` and `\rvert` and
`\lVert` and `\rVert` commands from the `amsmath` package to typeset
the vertical bar and double vertical bar "brackets"—instead of `|` and
`\|`.

``` tex
% number shorthand
\NewDocumentCommand{\bbZ}{}{\mathbb{Z}}
```

Shorthand for the group of all integers

``` tex
% Probabilistic Expectation
\DeclareMathOperator{\E}{E}

% Indicator random variable
\DeclareMathOperator{\I}{I}
```

These declare that the expectation operator and indicator random
variable should be typeset in the same style as `sin` and `log`.

``` tex
% Use \v to typeset math variables that take up multiple symbols.
\RenewDocumentCommand{\v}{m}{\mathit{#1}}
```

Especially when discussing algorithms, we may need to refer to
multiletter variables. The default math font is tailored to uniletter
math symbols; to typeset variables represented by a string of letters,
eg. the `left` in `p.left`, I use this command, which typesets it in
an (italic) text font.

``` tex
% algorithms shorthand
```

``` tex
% text shorthand
\NewDocumentCommand{\nt}{m}{\textbf{#1}} % semantic markup: "new term"
```

I use this command to emphasize the first appearance of a technical
term, especially in learning materials.

``` tex
\NewDocumentCommand{\todo}{O{} g}{\IfNoValueTF{#2}%
  {\fxnote[#1]{\textbf{TODO}}}%
  {\fxnote[#1]{\textbf{TODO:} #2}}
}

\NewDocumentCommand{\wontfix}{O{} g}{\IfNoValueTF{#2}%
  {\fxnote[#1]{\textbf{WON'T FIX}}}%
  {\fxnote[#1]{\textbf{WON'T FIX:} #2}}
}
```

These two commands help me mark sections with `fixme` notes to
indicate that I will (or won't) be substantiating in a missing section
later. This helps me write documents in a top-down manner: first
outlining the structure, then zooming into and elaborating specific
sections.

``` tex
% Document

\begin{document}
\frontmatter

\maketitle

\tableofcontents

%\listoffigures

%\listoftables

\listoffixmes

\mainmatter
\part{Part I's Name}

\chapter{Barry}

\appendix
\part{Appendices}


\part{Appendices}

\chapter{Foo}

\todo{Read Chapter}

\backmatter
\end{document}
```

The document itself.

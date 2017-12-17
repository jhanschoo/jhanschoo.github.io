---
layout: post
title: OPAM and aspcud on Arch Linux
category: Personal
tags: [opam, ocaml]
---

If you are using the AUR's aspcud as the (default) external dependency
solver for OPAM, note that aspcud's grounder dependencies are not
automatically chosen and installed. To fix this it suffices to
additionally install the clingo package.

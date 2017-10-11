---
layout: post
title: Varargs Method Overloading in Java
category: Design
tags: [java, varargs, overloading]
---

This post discusses the limitations and design–choice quirks that we
encounter when we overload Java methods where some of the overloading
signatures includes a varargs parameter. Much of the behavior
described in this post is based on sections in Chapter 7 of Herbert
Schildt's /Java: The Complete Reference: Ninth Edition/, with some
observations of my own.

They are summarized as follows,
* Remember that
* If we write overloaded definitions for a method such that while the
  definitions' parameter signatures, one may still write a function
  call to the overloaded method with a signature such that

TODO: it's way more complicated than that. c.f. Method Invocation
Expressions in Java Language Specification

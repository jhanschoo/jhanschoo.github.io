---
layout: post
title: Javascript's async and await; the Short Version
category: Programming
tags: [programming, javascript, async, await]
---

Javascript's `async` and `await` allows you to use `Promises` more
transparently. Here's a short summary of what they mean, for people
who are already familiar with the other parts of JS.

## `async`

When you write a function
```
async function myFunction(...) { ... }
```
what happens is that whenever `myFunction()` is called, is returns a
`Promise`, and the function body is executed. When a `return` is
encountered within the function body, the `Promise` resolves with the
`return`ed value. Recall from the standard behavior of promises that if a promse
resolves to a "thenable" (hence also if it resolves to a promise), then the
promises are "flattened". So the same behavior happens when we `return` a
promise from within an `async` function; if that promise is rejected, so is the
promise associated with out `async` function call.

## `await`

When you write
```
await someExpression;
```
what happens is that someExpression is evaluated. If `someExpression` evaluates
to a `Promise`, `await` waits for the `Promise` to resolve, then "returns" the
value the `Promise` resolves to. If the `Promise` is rejected, then `await`
throws the rejected/error value. If the evaluated value is not a `Promise` then
that value is returned.

Probably due to backward-compatibility reasons, `await` can only be used inside
an `async` function.

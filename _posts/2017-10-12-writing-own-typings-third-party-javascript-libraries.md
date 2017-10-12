---
layout: post
title: Writing Your Own Type Definitions for CommonJS-style Third-Party Javascript Libraries
category: Programming
tags: [programming, javascript, async, await]
---

The TypeScript documentation for writing type definitions for
3rd-party libraries that you may import in your project is pretty
poor, and that had let me to wasted hours of research. The
instructions here are current as of the time of writing.

1. Create a directory for your custom typings. We will assume here
   `project_root/typings`.
2. Configure `tsconfig.json` so that `typescript` compiles your
   `.d.ts` files. For example,
   ```
   {
     ...
     "include": [
       ...
       "./typings/**/*",
       ...
     ]
   }
   ```
3. For each module `package-name` that you wish to write definitions
   for,
4. Create a file (and its parent folder)
   `project_root/typings/package-name/index.d.ts`.
5. Especially if you are going to publish it, the first non-blank
   uncommented line should contain lines of the form
   ```
   /// <reference types="other-package" />
   ```
   where `other-package` is a package whose objects (and their types) are
   exposed by `package-name`. That is, you wish to use the types of
   `other-package` in your definitions for `package-name`.
6. Other than this line, the rest of the file should look like
   ```
   declare module 'package-name' {
     // this style is for CommonJS-style imports
     import * as otherPackage from 'other-package';

     // type definitions
     // ...
     export = packageFunction; // or other export styles
   }
   ```

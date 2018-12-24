---
layout: post
title: `inotify` file watches
category: Linux
tags: [linux]
---

To get the number of open `inotify` watches, run the following:

```
find /proc/*/fd/* -type l -lname 'anon_inode:inotify' 2>/dev/null | sed -e 's@/fd/@/fdinfo/@' | xargs cat | grep inotify | wc -l
```


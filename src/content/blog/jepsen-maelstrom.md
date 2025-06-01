---
title: "jepsen.io/maelstrom"
description: "Distributed computing concepts through implementations cumulating in Raft consensus."
pubDate: "2025-06-01"
tags: ["lake", "distributed computing", "jepsen", "maelstrom", "raft"]
---

In late 2024, I took some time to work through the [Maelstrom](https://github.com/jepsen-io/maelstrom) demos. From its `README.md`:

> Maelstrom is a workbench for learning distributed systems by writing your own. It uses the Jepsen testing library to test toy implementations of distributed systems. Maelstrom provides standardized tests for things like "a commutative set" or "a transactional key-value store", and lets you learn by writing implementations which those test suites can exercise. It's used as a part of a distributed systems workshop by Jepsen.

In this post, I will

1. Briefly summarize the Maelstrom demo runners and how they interact with the worker programs that you supply it,
2. Give very brief overviews of the various demo tests, and
3. Discuss my solutions/translations to the demos.

## Running Maelstrom demos

The core of Maelstrom is a standalone executable (compiled from a Clojure project). A suite of demo workloads are compiled from files in [`src/maelstrom/workload`](https://github.com/jepsen-io/maelstrom/tree/main/src/maelstrom/workload). If you wish to run your own workloads, you will have to write your own in Clojure and compile. In addition, network services are defined and may be used by solutions. For example, `lin-kv` is a key-value store service that is linearizable with respect to operations on it. A sample invocation for one of my solutions looks like this (I havd `cd`ed into a subdirectory of the Maelstrom repository, and my repository of solutions is cloned to a subdirectory of the Maelstrom repository):

```bash
../../maelstrom test -w lin-kv --time-limit 60 --nemesis partition --nemesis-interval 10 --test-count 10 --node-count 5 --concurrency 4n --rate 30 --bin "/bin/python3" "$PWD/s06_raft/__main__.py"
```

- `../../maelstrom` is the path to the Maelstrom executable.
- `test` is the command to run a test.
- `-w lin-kv` specifies the workload to run, in this case a linearizable key-value store.
- `--time-limit 60` specifies that the test should run for 60 seconds.
- `--nemesis partition` specifies that the a network partition should be simulated.
- Most of the other options are of a similar nature and quite self-explanatory.
- `--bin "/bin/python3"` specifies the path to the worker program that will be run for each node in the test. Following this are arguments that will be passed to the worker program.
- Hence `"$PWD/s06_raft/__main__.py"` is the path to the worker program that I wrote for this demo.

Then the Maelstrom executable will start up, and spin up a number of worker processes. Following this, communication between the Maelstrom executable and the worker processes will be done over standard input and output, in JSON objects. The worker processes will receive messages from the Maelstrom executable, and respond with messages of their own. The Maelstrom executable will then run the test suite against the worker processes, and report the results. When a workload is done, report data will be written to a `store/` subdirectory. Then `../../maelstrom serve` spins up a web server that can be used to view the results of the tests.

## Workloads

### `echo`

This workload checks that you have things set up correctly. When spun up, it should await an initialization message. When it responds that it is initialized, it should be ready to behave as an echo server: it awaits a message containing a string payload, and then respond with an appropriate response containing the same string payload.

### `broadcast`

This workload asks for an implementation of a gossip protocol. With a network topology supplied, each worker is initialized knowing about its neighbors' IDs. It has the ability to send arbitrary messages to its neighbors (by writing to standard output that the destination of the message is the ID of a neighbor), and it should be able to receive messages from its neighbors. The test suite will send messages to the workers, and expect them to gossip the messages to their neighbors (gossipping is subject to simulated network conditions), so that the message is eventually known to all workers, and also gossipping eventually terminates. The test suite will also check that the workers can handle network partitions.

### `g-set`

This workload asks for an implementation of an append-only set data structure supporting `add` and `read` operations. The operations on the data set are sent to particular nodes, but all nodes should eventually have the same set in its state. Again, the workers operate under a network topology and should gossip to propagate state. The `add` operation asks to add an element to the set, and `read` asks a client to echo all the members in the set that it is presently aware of.

### `g-counter`

The `g-counter` workload is a variant of the `g-set` workload, but it asks for a counter data structure that supports `add` and `read` operations as follows: the `add` operation increments the counter, and `read` asks a client to echo the current value of the counter that it is presently aware of.

### `g-counter`

The `g-counter` workload is a variant of the `g-set` workload, but it asks for a counter data structure that supports `add` and `read` operations as follows: the `add` operation increments the counter by a particular number, and `read` asks a client to echo the current value of the counter that it is presently aware of.

### `g-counter`

The `pn-counter` workload is a variant of the `g-counter` workload that allows for both positive and negative increments.

### `txn-lost-append`

The `txn-lost-append` workload asks for an append-only distributed key-value store where values are lists of integers that can be appended to. Operations are sent as transactions to particular nodes, and of course eventual consistency is expected. Furthermore, the workload can check for satisfaction of various consistency properties, such as strict serializability. In short, strict serializability in this context means that transactions are atomic, and if `T1` and `T2` are two transactions, such that `T1` is reported to be committed before `T2`, then `T1` must have been applied before `T2` in the state of the key-value store. The demo for this workload also introduces the `lin-kv` service, and then the `lww-kv` service.

### `lin-kv`

Finally, the `lin-kv` workload asks for a linearizable key-value store supporting `read`ing a key, `write`-ing to a key, and `cas` (compare-and-swap), which writes to a key only if it contains a particular value. The demo solves for this by implementing the Raft consensus algorithm. Specifically, the append log communication is simplified as compared to the [Raft paper](https://raft.github.io/raft.pdf). Notably, log compaction is not implemented.

## My solutions

I have reimplemented the solutions to [the demos](https://github.com/jepsen-io/maelstrom/tree/main/doc) in my own [repository](https://github.com/jhanschoo/maelstrom-demo) in Python. The original solutions provided were in Ruby. In doing the reimplementation, there were a few ambiguities and inconsistencies in the code snippets in the `.md` files, which I resolved in the reimplementation. Regarding the Raft implementation, log compaction is not implemented.

If the demos look interesting to you, I encourage you to try them out!

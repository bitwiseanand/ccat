---
title: "Operating Systems Cheat Sheet"
exam: "ccat"
subject: "operating-systems"
topic: "os-basics"
description: "Process scheduling, synchronization, deadlocks, memory management, paging, and disk scheduling — the complete OS reference for CDAC C-CAT."
keywords: ["operating systems", "process scheduling", "deadlocks", "memory management", "paging"]
lastVerified: 2026-07-28
---
## Process vs Thread

| Property | Process | Thread |
|---|---|---|
| Definition | A program in execution, with its own memory space | A lightweight unit of execution within a process |
| Memory | Separate address space per process | Threads of the same process share memory |
| Communication | Needs IPC (pipes, shared memory, sockets) | Direct, via shared memory — faster |
| Creation cost | Heavy — new address space | Light — shares parent process's resources |
| Crash impact | One process crashing doesn't affect others | One thread crashing can crash the whole process |

## Process states & PCB

```text
New → Ready → Running → Terminated
              ↕
           Waiting (Blocked)

New       — process being created
Ready     — waiting for CPU allocation
Running   — instructions being executed
Waiting   — waiting for I/O or an event
Terminated — execution finished
```

The **Process Control Block (PCB)** stores: process ID, process state, program counter, CPU registers, CPU scheduling info, memory management info, and I/O status info — one PCB per process, used for context switching.

```pyq
Q: What does the PCB (Process Control Block) primarily enable?
A) Faster disk access
*B) Context switching between processes
C) Memory compression
D) Network communication
Explain: The PCB stores a process's complete execution context (registers, program counter, state) so the OS can suspend it and resume it exactly where it left off — this is what makes context switching possible.
```

## CPU scheduling algorithms

| Algorithm | Strategy | Preemptive? | Starvation risk |
|---|---|---|---|
| FCFS (First Come First Served) | Run in arrival order | No | No, but poor avg wait time |
| SJF (Shortest Job First) | Run shortest burst time next | No | Yes — long jobs can starve |
| SRTF (Shortest Remaining Time First) | Preemptive version of SJF | Yes | Yes |
| Priority Scheduling | Highest priority runs first | Either | Yes — low priority can starve |
| Round Robin | Fixed time quantum per process, cyclic | Yes | No |

### Key formulas

```text
Turnaround Time = Completion Time − Arrival Time
Waiting Time     = Turnaround Time − Burst Time
Response Time    = Time of first CPU allocation − Arrival Time
```

### Round Robin — quantum size matters

```text
Quantum too large  → behaves like FCFS (poor response time)
Quantum too small  → excessive context-switch overhead
Ideal quantum       → slightly more than the average burst time
```

```pyq
Q: Which scheduling algorithm can lead to starvation of long processes?
A) FCFS
*B) SJF
C) Round Robin
D) None of these
Explain: SJF always picks the shortest job available — if short jobs keep arriving, a long job sitting in the queue may never get scheduled. FCFS and Round Robin both guarantee eventual execution.
```

## Process synchronization

### Critical section problem — 3 requirements

```text
1. Mutual Exclusion — only one process in the critical section at a time
2. Progress          — a process outside the critical section can't block others from entering
3. Bounded Waiting    — a limit exists on how long a process waits before entering
```

### Semaphores vs Mutex

| Property | Semaphore | Mutex |
|---|---|---|
| Type | Integer variable (counting or binary) | Binary lock, ownership-based |
| Can be used by | Multiple threads, signaling between them | Only the thread that locked it can unlock it |
| Operations | `wait()` / `P()` decrements, `signal()` / `V()` increments | `lock()` / `unlock()` |
| Use case | Resource counting, thread signaling | Protecting a single shared resource |

```c
// Binary semaphore usage — classic mutual exclusion
wait(mutex);      // P() — decrement, block if 0
    // critical section
signal(mutex);    // V() — increment, wake a waiting process
```

```pyq
Q: What is the key difference between a mutex and a semaphore?
A) Mutex is faster
*B) Mutex has ownership — only the locking thread can unlock it; a semaphore does not
C) Semaphore only works with threads, not processes
D) There is no real difference
Explain: A mutex is a locking mechanism with ownership semantics. A semaphore is a more general signaling mechanism (counting or binary) that any thread can signal, regardless of which thread waited on it.
```

### Classic synchronization problems

| Problem | Core challenge |
|---|---|
| Producer-Consumer | Producer must not add to a full buffer; consumer must not remove from an empty one |
| Readers-Writers | Multiple readers can read simultaneously; a writer needs exclusive access |
| Dining Philosophers | Avoid deadlock when philosophers need two shared forks each |

## Deadlock

### The 4 necessary conditions (Coffman conditions)

```text
1. Mutual Exclusion    — resource held exclusively by one process
2. Hold and Wait        — process holds a resource while waiting for another
3. No Preemption        — a resource can't be forcibly taken away
4. Circular Wait         — a closed chain of processes, each waiting on the next

Deadlock requires ALL FOUR to hold simultaneously —
breaking even one prevents deadlock.
```

### Handling strategies

| Strategy | Approach |
|---|---|
| Prevention | Ensure at least one Coffman condition can never hold |
| Avoidance | Grant a request only if the resulting state is still "safe" (Banker's Algorithm) |
| Detection & Recovery | Allow deadlock, detect via resource-allocation graph, then recover |
| Ignore (Ostrich algorithm) | Assume it won't happen — used by most general-purpose OSes (like Windows/Linux) |

```pyq
Q: The Banker's Algorithm is used for which deadlock-handling strategy?
A) Prevention
*B) Avoidance
C) Detection
D) Recovery
Explain: The Banker's Algorithm checks, before granting a resource request, whether the system would remain in a "safe state" — this is deadlock avoidance, not prevention (which removes a Coffman condition entirely) or detection (which acts after the fact).
```

```pyq
Q: How many of the 4 Coffman conditions must hold for a deadlock to occur?
A) Any 1
B) Any 2
C) Any 3
*D) All 4
Explain: Deadlock requires Mutual Exclusion, Hold and Wait, No Preemption, AND Circular Wait to all hold simultaneously. Breaking any single one is enough to prevent deadlock.
```

## Memory management

### Paging vs Segmentation

| Property | Paging | Segmentation |
|---|---|---|
| Division basis | Fixed-size blocks (pages) | Variable-size logical units (segments) |
| Visibility to programmer | Invisible — purely a memory-management technique | Visible — matches logical program structure (code, stack, heap) |
| External fragmentation | None | Possible |
| Internal fragmentation | Possible (last page may be partially filled) | None |

```text
Logical Address → Page Number + Offset
Page Table maps: Page Number → Frame Number (physical memory)
TLB (Translation Lookaside Buffer) caches recent Page Table lookups for speed
```

### Page replacement algorithms

| Algorithm | Strategy |
|---|---|
| FIFO | Replace the oldest-loaded page |
| LRU (Least Recently Used) | Replace the page unused for the longest time |
| Optimal | Replace the page that won't be used for the longest time in the future (theoretical best, used as a benchmark) |

**Belady's Anomaly**: with FIFO specifically, increasing the number of page frames can sometimes *increase* the number of page faults — a well-known exam trap, since it's counter-intuitive and does NOT happen with LRU or Optimal.

```pyq
Q: Belady's Anomaly refers to:
A) A deadlock in memory allocation
*B) Page faults increasing even as the number of frames increases (in FIFO)
C) A CPU scheduling bug
D) A type of thrashing
Explain: Belady's Anomaly is specific to FIFO page replacement — more physical frames can counter-intuitively cause more page faults, not fewer. It does not occur with LRU or Optimal replacement.
```

### Thrashing

```text
Thrashing = system spends more time swapping pages in/out
             than executing actual instructions.

Cause: too many processes, too little physical memory
       → high degree of multiprogramming exceeds what RAM can support

Fix: reduce the degree of multiprogramming
     (working-set model, load control)
```

## Disk scheduling

| Algorithm | Strategy |
|---|---|
| FCFS | Service requests in arrival order |
| SSTF (Shortest Seek Time First) | Service the closest request to current head position |
| SCAN (Elevator) | Head moves in one direction, servicing requests, reverses at the end |
| C-SCAN | Like SCAN, but jumps back to the start instead of reversing — uniform wait time |
| LOOK / C-LOOK | Like SCAN/C-SCAN, but reverses at the last request, not the disk's physical end |

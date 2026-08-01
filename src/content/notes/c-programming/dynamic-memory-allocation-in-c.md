---
title: Dynamic Memory Allocation in C
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
description: Dynamic memory allocation lets a program request memory at runtime instead — from a region called the heap.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Dynamic Memory Allocation in C – Complete Guide with MCQs for CDAC C-CAT

Static arrays in C need their size fixed at compile time. **Dynamic memory allocation** lets a program request memory at runtime instead — from a region called the **heap**. CDAC C-CAT frequently tests the exact differences between `malloc`, `calloc`, `realloc`, and `free`, along with what happens when they're misused.

This guide covers everything you need for the exam and technical interviews.

---

## Why Dynamic Memory?

```c
int arr[100];  // fixed size, decided at compile time
```

If you don't know the required size until the program runs (say, it depends on user input), a fixed-size array either wastes memory or isn't big enough. Dynamic allocation solves this using four standard library functions declared in `stdlib.h`.

---

## malloc()

Allocates a single block of memory of the given size, **without initializing it**.

```c
int *p = (int *) malloc(5 * sizeof(int));
```

- Takes one argument: total bytes needed.
- Returns a `void *`, which must be cast to the correct pointer type.
- Contents of the allocated memory are **garbage values**, not zero.
- Returns `NULL` if allocation fails.

```c
int *p = (int *) malloc(5 * sizeof(int));

printf("%d", p[0]);
```

Typical Output

```
Garbage value
```

---

## calloc()

Allocates memory for an array of elements and **initializes every byte to zero**.

```c
int *p = (int *) calloc(5, sizeof(int));

printf("%d", p[0]);
```

Output

```
0
```

- Takes two arguments: number of elements, size of each element.
- Slightly slower than `malloc` because of the zero-initialization step.
- Also returns `NULL` on failure.

---

## malloc vs calloc — Side by Side

| Feature | malloc() | calloc() |
|---|---|---|
| Arguments | 1 (total bytes) | 2 (count, size) |
| Initialization | Garbage values | Zero-initialized |
| Speed | Slightly faster | Slightly slower |
| Syntax | `malloc(n * size)` | `calloc(n, size)` |

```c
int *a = (int *) malloc(4 * sizeof(int));
int *b = (int *) calloc(4, sizeof(int));

printf("%d %d", a[0], b[0]);
```

Typical Output

```
Garbage 0
```

---

## realloc()

Resizes a previously allocated block — growing or shrinking it — while attempting to preserve existing contents.

```c
int *p = (int *) malloc(3 * sizeof(int));
p[0] = 1; p[1] = 2; p[2] = 3;

p = (int *) realloc(p, 5 * sizeof(int));

printf("%d %d", p[0], p[2]);
```

Output

```
1 3
```

Key behaviors:

- If there's room to grow in place, the same address may be returned.
- If not, the block is moved to a new address, old data is copied over, and the old block is freed automatically.
- New elements beyond the old size hold garbage values, not zero.
- `realloc(p, 0)` behaves like `free(p)` on most implementations and returns `NULL`.

---

## free()

Releases a dynamically allocated block back to the system.

```c
int *p = (int *) malloc(sizeof(int));
*p = 10;

free(p);
```

`free()` does not erase the pointer's value — it deallocates the memory it points to. The pointer itself still holds the (now invalid) address.

---

## The realloc() Return Value Trap

```c
int *p = (int *) malloc(sizeof(int));

p = (int *) realloc(p, 100 * sizeof(int));  // correct

// p = realloc(p, 100 * sizeof(int));  if this call fails and returns NULL,
// overwriting p directly would leak the original block
```

Always assign `realloc()`'s result to a **temporary pointer** first in production code, so a failed reallocation doesn't lose the only reference to the original block.

```c
int *temp = (int *) realloc(p, 100 * sizeof(int));
if (temp != NULL)
    p = temp;
```

---

## Memory Leak

Memory that is allocated but never freed, and whose address is lost, so it can never be freed either.

```c
void leak()
{
    int *p = (int *) malloc(sizeof(int));
    // no free(p) before p goes out of scope — leaked
}
```

Every `malloc`/`calloc`/`realloc` should eventually be matched with exactly one `free`.

---

## Dangling Pointer After free()

```c
int *p = (int *) malloc(sizeof(int));
free(p);

*p = 10;   // undefined behavior — p is now dangling
```

Best practice: set the pointer to `NULL` right after freeing it.

```c
free(p);
p = NULL;
```

---

## Double Free

```c
int *p = (int *) malloc(sizeof(int));

free(p);
free(p);   // undefined behavior
```

Freeing the same block twice corrupts the heap's internal bookkeeping — a frequent CDAC C-CAT trap question.

---

## Checking for Allocation Failure

```c
int *p = (int *) malloc(1000000000000 * sizeof(int));

if (p == NULL)
    printf("Allocation failed");
```

On systems with insufficient memory, `malloc`/`calloc`/`realloc` return `NULL` rather than crashing — code should always check this before dereferencing.

---

## Common Mistakes

#### Mistake 1

```c
int *p = malloc(sizeof(int));
printf("%d", p[0]);
```

Assuming `malloc` zero-initializes memory. Wrong — only `calloc` guarantees zero.

---

#### Mistake 2

```c
int *p = (int *) malloc(5 * sizeof(int));
p = (int *) realloc(p, 10 * sizeof(int));
```

If `realloc` fails here and returns `NULL`, the original block's address is lost — a memory leak, since it's overwritten `p` directly.

---

#### Mistake 3

```c
int *p = (int *) malloc(sizeof(int));
free(p);
free(p);
```

Double free — undefined behavior, not a harmless no-op.

---

## Frequently Asked Interview Questions

#### Which function initializes memory to zero?

`calloc()`. `malloc()` leaves the memory uninitialized.

---

#### What does `realloc(p, 0)` do?

On most implementations it frees the block and returns `NULL`, equivalent to calling `free(p)`.

---

#### Is it mandatory to cast the return value of malloc in C?

No, `void *` is implicitly convertible to any pointer type in C (unlike C++, where a cast is required). Casting is done for readability and portability, not necessity.

---

#### What happens if you forget to free allocated memory?

It causes a memory leak — the memory stays reserved for the life of the process, reducing available memory over time.

---

## CDAC C-CAT MCQs

#### MCQ 1

```c
int *p = (int *) calloc(3, sizeof(int));

printf("%d", p[1]);
```

A. Garbage value

B. 0

C. 1

D. Error

**Answer:** **B**

---

#### MCQ 2

```c
int *p = (int *) malloc(3 * sizeof(int));

printf("%d", p[1]);
```

A. 0

B. Garbage value

C. 1

D. Error

**Answer:** **B**

---

#### MCQ 3

```c
int *p = (int *) malloc(sizeof(int));
free(p);

p = NULL;

printf("%d", (p == NULL) ? 1 : 0);
```

A. 0

B. 1

C. Error

D. Undefined behavior

**Answer:** **B**

---

#### MCQ 4

```c
int *p = (int *) malloc(2 * sizeof(int));
p[0] = 5; p[1] = 10;

p = (int *) realloc(p, 4 * sizeof(int));

printf("%d %d", p[0], p[1]);
```

A. Garbage Garbage

B. 5 10

C. 0 0

D. Error

**Answer:** **B**

---

#### MCQ 5

```c
int *p;

p = (int *) malloc(0);

printf("%d", (p == NULL) ? 1 : 0);
```

A. Always 1

B. Always 0

C. Implementation-defined (may be NULL or a valid unique pointer)

D. Compilation error

**Answer:** **C**

---

#### MCQ 6

```c
int *p = (int *) malloc(sizeof(int));

free(p);
free(p);

printf("Done");
```

A. Prints "Done"

B. Compilation error

C. Undefined behavior

D. Infinite loop

**Answer:** **C**

---

## Key Takeaways

- `malloc(size)` allocates uninitialized memory; `calloc(n, size)` allocates and zero-initializes it.
- `realloc(ptr, new_size)` resizes a block, preserving old data, and may move it to a new address.
- Always assign `realloc()`'s result to a temporary pointer before overwriting the original, to avoid losing the block if allocation fails.
- `free()` releases memory but does not change the pointer's value — set it to `NULL` manually to avoid a dangling pointer.
- Forgetting to `free()` causes a memory leak; calling `free()` twice on the same pointer is undefined behavior.
- Always check for `NULL` after any allocation call before dereferencing.

---

#### Next Topics

To strengthen your C programming for **CDAC C-CAT**, continue with:

- Pointers in C
- Dangling Pointer vs Wild Pointer
- Structures and Unions in C
- File Handling in C Programming
- Command Line Arguments in C

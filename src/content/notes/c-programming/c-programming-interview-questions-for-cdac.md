---
title: C Programming Interview questions
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
description: Beyond the C-CAT MCQ paper itself, several CDAC centres run a short technical interview or viva during counselling and course orientation.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Top C Programming Interview Questions for CDAC C-CAT

Beyond the C-CAT MCQ paper itself, several CDAC centres run a short technical interview or viva during counselling and course orientation. This is a curated set of the C programming questions that come up most often — for both the exam and the interview.

---

## 1. What is the difference between `malloc()` and `calloc()`?

`malloc(size)` allocates a single block of uninitialized memory and takes one argument (total bytes). `calloc(n, size)` allocates memory for `n` elements, zero-initializes every byte, and takes two arguments.

```c
int *a = (int *) malloc(5 * sizeof(int));  // garbage values
int *b = (int *) calloc(5, sizeof(int));   // all zeros
```

---

## 2. What is a dangling pointer?

A pointer that still holds the address of memory that has already been freed or has gone out of scope. Dereferencing it causes undefined behavior.

```c
int *p = (int *) malloc(sizeof(int));
free(p);
*p = 10;   // p is now dangling
```

---

## 3. What is the difference between `==` and `=` in C?

`=` is the assignment operator; `==` is the equality comparison operator. Using `=` inside a condition is a classic bug, since it assigns and evaluates to the assigned value (non-zero is treated as true).

```c
if (x = 5)   // always true — assigns 5 to x, doesn't compare
if (x == 5)  // compares x to 5
```

---

## 4. What is the difference between `struct` and `union`?

A `struct` allocates separate memory for each member, so all members can hold values simultaneously. A `union` allocates memory equal to its **largest** member, and all members share that same memory — so only one member holds a valid value at a time.

```c
struct S { int a; float b; };   // sizeof = 8 (typically)
union  U { int a; float b; };   // sizeof = 4 (typically)
```

---

## 5. What are storage classes in C?

`auto`, `register`, `static`, and `extern` — they control a variable's scope, lifetime, and default value, not its data type.

- `auto`: default for local variables, exists only within its block.
- `register`: requests storage in a CPU register for faster access (a hint, not a guarantee).
- `static`: retains its value between function calls; initialized only once.
- `extern`: declares a variable defined in another file/scope, without allocating new storage.

---

## 6. What is the difference between `const int *p` and `int *const p`?

`const int *p` means the pointed-to value can't change through `p`, but `p` itself can point elsewhere. `int *const p` means `p` itself is fixed once initialized, but the value it points to can still be modified.

```c
const int *p1;  // *p1 = x is illegal, p1 = &y is legal
int *const p2 = &x;  // *p2 = x is legal, p2 = &y is illegal
```

---

## 7. Why is `main()` usually written as `int main()` and not `void main()`?

`int main()` returns a status code to the operating system on program termination (0 typically means success). `void main()` is non-standard and not guaranteed to work on every compiler — the C standard specifies `int main()`.

---

## 8. What is recursion, and what is its risk?

A function calling itself, directly or indirectly, to solve a problem by breaking it into smaller sub-problems. The main risk is a **stack overflow** if the recursion has no proper base case or runs too deep, since each call consumes stack memory.

```c
int factorial(int n)
{
    if (n == 0) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}
```

---

## 9. What is the difference between call by value and call by reference?

Call by value copies a variable's value into the function's parameter, so changes inside the function don't affect the original. Call by reference (in C, done via pointers) passes the address, so the function can modify the caller's original variable.

```c
void byValue(int x) { x = 100; }        // caller unaffected
void byRef(int *x) { *x = 100; }        // caller's variable changed
```

---

## 10. What is the difference between `strcpy()` and `strncpy()`?

`strcpy(dest, src)` copies the entire source string including the null terminator, with no bound check — risking a buffer overflow if `dest` is too small. `strncpy(dest, src, n)` copies at most `n` characters, but does **not** guarantee null-termination if `src` is longer than `n`.

```c
char dest[10];
strncpy(dest, "Hello CDAC", 9);
dest[9] = '\0';  // manual null-termination is often still needed
```

---

## 11. What happens if you don't free dynamically allocated memory?

It causes a **memory leak** — the memory stays reserved for the program's lifetime (or until the OS reclaims it at process exit), reducing memory available for other allocations.

---

## 12. What is the difference between an array and a pointer?

An array's size is fixed at declaration and it occupies a contiguous, fixed block of memory; `sizeof(array)` gives the full array size. A pointer is a separate variable that stores an address and can be reassigned; `sizeof(pointer)` always gives the pointer's own size, regardless of what it points to.

```c
int arr[5];
int *p = arr;

sizeof(arr);  // 20 (5 × 4 bytes)
sizeof(p);    // 8 (pointer size, typically)
```

---

## 13. What is typedef used for?

Creating an alias for an existing type, mainly to improve readability or simplify complex declarations like function pointers and struct types.

```c
typedef unsigned int uint;
typedef struct { int x, y; } Point;

uint a = 5;
Point p1 = {1, 2};
```

---

## 14. What is the difference between `#define` and `const`?

`#define` is a preprocessor directive — a pure text substitution performed before compilation, with no type checking. `const` creates an actual typed variable that participates in the type system and can be debugged.

```c
#define PI 3.14      // text substitution, no type
const float PI = 3.14;  // typed constant
```

---

## 15. What is short-circuit evaluation?

In `&&` and `||` expressions, C stops evaluating as soon as the overall result is determined. In `a && b`, if `a` is false, `b` is never evaluated. In `a || b`, if `a` is true, `b` is never evaluated. This matters when the second operand has a side effect (like a function call or `i++`).

```c
int i = 5;
if (0 && (i++))
    printf("yes");

printf("%d", i);   // 5, since i++ was never evaluated
```

---

## 16. What is the difference between a structure and a class (as commonly asked when moving to C++)?

In C, a `struct` only has data members, all public by default, and no methods (functions) or access specifiers. In C++, both `struct` and `class` can have data and member functions, differing only in default access — `public` for `struct`, `private` for `class`.

---

## 17. What are function pointers used for?

Storing the address of a function so it can be called indirectly — commonly used for callback functions, dispatch tables, and implementing polymorphism-like behavior in C.

```c
int add(int a, int b) { return a + b; }

int (*fptr)(int, int) = add;

printf("%d", fptr(2, 3));
```

Output

```
5
```

---

## 18. What is the difference between `break` and `continue`?

`break` exits the loop (or switch) entirely. `continue` skips the rest of the current iteration and moves to the next one, without exiting the loop.

---

## Key Takeaways

- Interview questions cluster around pointers, memory management, storage classes, and strings — the same topics that dominate the CCAT MCQ paper.
- Be ready to explain the "why," not just the "what" — e.g. why `realloc`'s return value needs a temporary pointer, not just that it does.
- Practice tracing small code snippets by hand; most interview questions are variations on output-tracing, not memorized definitions.

---

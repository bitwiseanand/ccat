---
title: Pointers in C
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
order: 5
description: Pointers are the single most tested concept in  C programming and exams.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---
## Pointers in C – Complete Notes with MCQs for CDAC C-CAT

Pointers are the single most tested concept in the **CDAC C-CAT C Programming** section. Nearly every tricky output-based question — arrays, strings, function calls, dynamic memory — eventually comes back to how a pointer is declared, incremented, or dereferenced.

This guide covers everything you need for the exam and technical interviews.

---

## What is a Pointer?

A **pointer** is a variable that stores the **address** of another variable, instead of storing a value directly.

```c
int x = 10;
int *p = &x;

printf("%d", *p);
```

Output

```
10
```

Here, `p` holds the address of `x`, and `*p` **dereferences** the pointer to get the value stored at that address.

---

## Declaring a Pointer

```c
int *p;      // pointer to int
char *c;     // pointer to char
float *f;    // pointer to float
```

The `*` in a declaration means "this variable is a pointer," not "dereference" — that distinction only matters after declaration.

---

## Address-of and Dereference Operators

```c
int x = 5;
int *p = &x;

printf("%d", x);    // 5
printf("%p", &x);   // address of x
printf("%d", *p);   // 5 (value at that address)
printf("%p", p);    // same address as &x
```

`&` gives an address. `*` gives the value stored at an address.

---

## Pointer Size

```c
int x = 10;
int *p = &x;

printf("%zu", sizeof(p));
```

Typical Output (64-bit system)

```
8
```

A pointer's size does **not** depend on the data type it points to — it depends on the architecture. `sizeof(int*)`, `sizeof(char*)`, and `sizeof(double*)` are all the same on a given machine.

---

## Pointer Arithmetic

Pointer arithmetic is scaled by the size of the pointed-to type, not by 1 byte.

```c
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

printf("%d", *(p + 2));
```

Output

```
30
```

`p + 1` does not mean "address + 1 byte." It means "address + `sizeof(int)` bytes."

```c
char *cp;
int *ip;

cp + 1;   // moves 1 byte
ip + 1;   // moves 4 bytes (typically)
```

---

## Arrays and Pointers

An array name **decays** into a pointer to its first element in most expressions.

```c
int arr[3] = {1, 2, 3};

printf("%d", *arr);       // 1
printf("%d", *(arr + 1)); // 2
printf("%d", arr[2]);     // 3
```

`arr[i]` is exactly equivalent to `*(arr + i)`.

Important: `arr` is **not** a pointer variable. `sizeof(arr)` gives the full array size, while `sizeof(a pointer to arr[0])` would give the pointer size.

```c
printf("%zu", sizeof(arr));  // 12 (3 ints × 4 bytes)
```

---

## Pointer to Pointer

A pointer can store the address of another pointer.

```c
int x = 10;
int *p = &x;
int **pp = &p;

printf("%d", **pp);
```

Output

```
10
```

`*pp` gives `p` (an address), and `**pp` gives `x` (the value).

---

## NULL Pointer

A pointer initialized to point to nothing.

```c
int *p = NULL;

if (p == NULL)
    printf("Empty pointer");
```

Output

```
Empty pointer
```

Dereferencing a NULL pointer (`*p`) causes undefined behavior — typically a segmentation fault.

---

## Void Pointer

A **generic pointer** that can point to any data type, but cannot be dereferenced directly without casting.

```c
int x = 10;
void *vp = &x;

printf("%d", *(int *)vp);
```

Output

```
10
```

`void *` is commonly used in functions like `malloc()` and `memcpy()`, which must work with any data type.

---

## Dangling Pointer

A pointer that still points to a memory location after that memory has been freed or has gone out of scope.

```c
int *p = (int *)malloc(sizeof(int));
free(p);

// p is now a dangling pointer
*p = 10;   // undefined behavior
```

To avoid this, set the pointer to `NULL` immediately after freeing it.

---

## Wild Pointer

A pointer that is declared but never initialized.

```c
int *p;      // wild pointer
*p = 10;     // undefined behavior — points to a random address
```

The difference: a **dangling** pointer once pointed somewhere valid; a **wild** pointer never did.

---

## Constant Pointers vs Pointers to Constants

```c
int x = 10, y = 20;

const int *p1 = &x;    // value cannot change via p1, pointer can move
int *const p2 = &x;    // pointer cannot move, value can change

*p1 = 5;   // Error
p1 = &y;   // OK

*p2 = 5;   // OK
p2 = &y;   // Error
```

Read the declaration right to left starting from the variable name to keep this straight.

---

## Pointers and Function Calls (Call by Reference)

```c
void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main()
{
    int x = 5, y = 10;
    swap(&x, &y);
    printf("%d %d", x, y);
}
```

Output

```
10 5
```

Passing addresses lets a function modify the caller's original variables — normal call-by-value cannot do this.

---

## Array of Pointers vs Pointer to Array

```c
int *arr1[3];     // array of 3 pointers to int
int (*arr2)[3];   // pointer to an array of 3 ints
```

```c
int a[3] = {1, 2, 3};
int (*p)[3] = &a;

printf("%d", (*p)[1]);
```

Output

```
2
```

`arr1` is three separate pointers. `arr2`/`p` is one pointer to an entire array — the parentheses around `*arr2` are what force this meaning; without them, `int *arr2[3]` reverts to an array of pointers.

---

## Common Mistakes

#### Mistake 1

```c
int *p;
*p = 10;
```

Wrong. `p` is uninitialized (wild pointer) — this writes to a random address.

---

#### Mistake 2

```c
int arr[5];
printf("%zu", sizeof(arr));
```

Assuming this prints the pointer size. Wrong — `sizeof` on an array name gives the full array size, not `sizeof(int*)`.

---

#### Mistake 3

```c
int *p = (int *)malloc(sizeof(int));
free(p);
free(p);   // double free — undefined behavior
```

Freeing the same pointer twice is a classic CDAC MCQ trap.

---

## Frequently Asked Interview Questions

#### Can a pointer be negative?

Pointer arithmetic that moves before the start of an array is undefined behavior, even though the resulting address value may print as a valid-looking number.

---

#### What is the difference between `p++` and `*p++`?

`p++` moves the pointer to the next element. `*p++` dereferences first, then increments the pointer (postfix binds to `p`, not the dereferenced value), due to operator precedence.

---

#### Does `sizeof(p)` depend on the type `p` points to?

No. All pointer types have the same size on a given system, since a pointer always stores just an address.

---

#### Can you perform arithmetic on a `void *`?

No, standard C does not allow arithmetic on `void *` since the compiler doesn't know the size to scale by. Some compilers allow it as an extension, treating it like `char *`.

---

## CDAC C-CAT MCQs

#### MCQ 1

```c
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

printf("%d", *(p + 3));
```

A. 30

B. 40

C. 3

D. Error

**Answer:** **B**

---

#### MCQ 2

```c
int x = 5;
int *p = &x;
int **pp = &p;

**pp = 20;

printf("%d", x);
```

A. 5

B. 20

C. Error

D. Garbage value

**Answer:** **B**

---

#### MCQ 3

```c
int a[3] = {1, 2, 3};

printf("%zu", sizeof(a));
```

A. 4

B. 8

C. 12

D. 3

**Answer:** **C**

---

#### MCQ 4

```c
char *p = "hello";

printf("%c", *(p + 1));
```

A. h

B. e

C. l

D. Error

**Answer:** **B**

---

#### MCQ 5

```c
int x = 10;
const int *p = &x;

*p = 20;
```

A. Prints 20

B. Compilation error

C. Prints 10

D. Undefined behavior

**Answer:** **B**

---

#### MCQ 6

```c
int a = 10, b = 20;
int *p = &a;

p = &b;

printf("%d", *p);
```

A. 10

B. 20

C. Error

D. Garbage value

**Answer:** **B**

---

#### MCQ 7

```c
int arr[4] = {1, 2, 3, 4};
int *p = arr;

p++;

printf("%d", *p);
```

A. 1

B. 2

C. Address of arr

D. Error

**Answer:** **B**

---

#### MCQ 8

```c
int *p = NULL;

printf("%d", *p);
```

A. 0

B. NULL

C. Segmentation fault (undefined behavior)

D. Compilation error

**Answer:** **C**

---

## Key Takeaways

- A pointer stores an **address**, not a value.
- `&` gets an address; `*` dereferences an address.
- Pointer arithmetic scales by the size of the pointed-to type, not by 1 byte.
- An array name decays into a pointer to its first element, but is not itself a pointer variable.
- `sizeof(pointer)` is the same for every pointer type on a given machine; `sizeof(array)` gives the full array size.
- A **dangling pointer** once pointed to valid memory that was later freed; a **wild pointer** was never initialized at all.
- `void *` is a generic pointer that must be cast before dereferencing.
- Pointers enable call-by-reference, letting a function modify the caller's variables.

---

#### Next Topics

To strengthen your C programming for **CDAC C-CAT**, continue with:

- Dynamic Memory Allocation in C (malloc, calloc, realloc, free)
- Arrays vs Pointers in C
- Structures and Unions
- Function Pointers in C
- Array of Pointers vs Pointer to Array

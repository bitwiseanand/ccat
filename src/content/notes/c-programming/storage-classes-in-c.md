---
title: C Programming Storage Classes
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
order: 1
description: Take a deep dive into the four storage classes and its purposes in C
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Storage Classes in C – Complete Guide with MCQs for CDAC C-CAT

A **storage class** in C determines **where a variable is stored, its scope, lifetime, and linkage**. Questions on storage classes are frequently asked in **CDAC C-CAT** and technical interviews.

---

## What is a Storage Class?

A storage class specifies:

- Scope (where the variable is accessible)
- Lifetime (how long the variable exists)
- Linkage (whether it can be accessed from another file)
- Storage location (memory/register)

C provides four storage classes:

- `auto`
- `register`
- `static`
- `extern`

---

## Summary Table

| Storage Class | Scope | Lifetime | Linkage | Default Value |
|---------------|-------|----------|---------|---------------|
| `auto` | Local | Function call | None | Garbage |
| `register` | Local | Function call | None | Garbage |
| `static` (local) | Local | Entire program | None | 0 |
| `static` (global) | File | Entire program | Internal | 0 |
| `extern` | Global | Entire program | External | 0 |

---

## auto Storage Class

`auto` is the default storage class for local variables.

```c
void fun()
{
    auto int x = 10;
    printf("%d", x);
}
````

The `auto` keyword is rarely written because local variables are automatically `auto`.

Properties:

* Local scope
* Created when the function starts
* Destroyed when the function returns
* Default value is garbage if not initialized

---

## register Storage Class

A `register` variable requests the compiler to store the variable in a CPU register for faster access.

```c
register int i;

for(i = 0; i < 10; i++)
{
    printf("%d ", i);
}
```

Properties:

* Local scope
* Function lifetime
* Compiler may ignore the request
* Address cannot be taken using `&`

Example:

```c
register int x = 10;

printf("%p", &x);
```

Output

```text
Compilation Error
```

---

## static Local Variable

A static local variable is initialized only once and retains its value between function calls.

```c
#include <stdio.h>

void fun()
{
    static int x = 0;
    x++;
    printf("%d ", x);
}

int main()
{
    fun();
    fun();
    fun();
}
```

Output

```text
1 2 3
```

Unlike ordinary local variables, `x` is not recreated on every function call.

---

## Local Variable Without static

```c
void fun()
{
    int x = 0;
    x++;
    printf("%d ", x);
}
```

Calling `fun()` three times prints

```text
1 1 1
```

because a new variable is created every time.

---

## static Global Variable

```c
static int count = 100;
```

A static global variable:

* Exists throughout the program
* Can only be accessed within the same source file
* Has **internal linkage**

---

## extern Storage Class

`extern` tells the compiler that a variable is defined in another file.

File 1

```c
int count = 10;
```

File 2

```c
extern int count;

printf("%d", count);
```

Output

```text
10
```

`extern` does **not** allocate memory. It only declares the variable.

---

## Scope, Lifetime and Linkage

| Keyword         | Scope  | Lifetime       | Linkage  |
| --------------- | ------ | -------------- | -------- |
| auto            | Local  | Function       | None     |
| register        | Local  | Function       | None     |
| static (local)  | Local  | Entire Program | None     |
| static (global) | File   | Entire Program | Internal |
| extern          | Global | Entire Program | External |

---

## Common Mistakes

### Mistake 1

Thinking `static` makes a variable global.

Wrong.

A local static variable still has **local scope**.

---

### Mistake 2

Thinking `extern` creates memory.

Wrong.

It only declares an already existing variable.

---

### Mistake 3

Taking the address of a register variable.

```c
register int x;

printf("%p", &x);
```

Compilation Error.

---

## Interview Questions

### Why use static variables?

To preserve values between function calls.

---

### Can a static local variable be accessed outside the function?

No.

---

### Does extern allocate memory?

No.

---

### What is the default value of a static variable?

```text
0
```

---

### Can register variables be stored in RAM?

Yes.

The compiler may ignore the `register` keyword.

---

## CDAC C-CAT MCQs

### MCQ 1

```c
void fun()
{
    static int x;
    x++;
    printf("%d ", x);
}

int main()
{
    fun();
    fun();
}
```

A. 1 1

B. 1 2

C. 2 2

D. Garbage

**Answer:** **B**

---

### MCQ 2

```c
void fun()
{
    int x = 0;
    x++;
    printf("%d ", x);
}

int main()
{
    fun();
    fun();
}
```

A. 1 2

B. 2 2

C. 1 1

D. Garbage

**Answer:** **C**

---

### MCQ 3

```c
register int x = 10;

printf("%p", &x);
```

A. Address

B. Garbage

C. Compilation Error

D. Undefined

**Answer:** **C**

---

### MCQ 4

The default storage class of a local variable is

A. static

B. register

C. auto

D. extern

**Answer:** **C**

---

### MCQ 5

Which storage class retains its value between function calls?

A. auto

B. register

C. static

D. extern

**Answer:** **C**

---

### MCQ 6

Which storage class provides external linkage?

A. auto

B. static

C. register

D. extern

**Answer:** **D**

---

### MCQ 7

Which storage class has internal linkage?

A. extern

B. auto

C. static (global)

D. register

**Answer:** **C**

---

### MCQ 8

Which storage class does not allocate memory?

A. auto

B. static

C. extern

D. register

**Answer:** **C**

---

### MCQ 9

The default value of a static variable is

A. Garbage

B. NULL

C. 0

D. 1

**Answer:** **C**

---

### MCQ 10

Which statement is true?

A. `register` guarantees storage in CPU registers.

B. `extern` creates a variable.

C. Local static variables retain their values between function calls.

D. `auto` variables are initialized to zero.

**Answer:** **C**

---

## Key Takeaways

* Storage classes determine **scope**, **lifetime**, **linkage**, and **storage location**.
* `auto` is the default storage class for local variables.
* `register` requests faster access but is only a compiler hint.
* Local `static` variables preserve their values between function calls.
* Global `static` variables have **internal linkage** and are visible only within the same source file.
* `extern` declares variables defined in another source file and provides **external linkage**.
* Storage classes are a common source of conceptual and MCQ-based questions in CDAC C-CAT.

```
```

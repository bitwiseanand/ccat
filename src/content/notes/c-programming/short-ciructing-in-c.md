---
title: Short Circuiting in C
subject: programming
topic: c
description: Short circiting in C is important but rather underlooked concept.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Short-Circuit Evaluation in C – Complete Guide with MCQs for CDAC C-CAT

Short-circuit evaluation is one of the most frequently tested concepts in **CDAC C-CAT**. It determines **whether the second operand of a logical expression is evaluated or skipped**. Understanding this behavior is essential for solving expression-based MCQs and avoiding runtime errors.

---

## What is Short-Circuit Evaluation?

Short-circuit evaluation means that the compiler **does not evaluate the second operand if the result can already be determined from the first operand**.

It applies only to the logical operators:

- `&&` (Logical AND)
- `||` (Logical OR)

---

## Short-Circuiting with `&&`

For the **Logical AND (`&&`)** operator:

- If the first operand is **false (0)**, the second operand is **not evaluated**.
- The overall result is already known to be false.

Example:

```c
printf("%d", 0 && 10 / 0);
```

Evaluation

```text
0 && ...
```

Since the first operand is `0`, the second operand is skipped.

Output

```text
0
```

The program does **not** crash even though `10 / 0` would normally cause undefined behavior.

---

## Short-Circuiting with `||`

For the **Logical OR (`||`)** operator:

- If the first operand is **true (non-zero)**, the second operand is **not evaluated**.
- The result is already known to be true.

Example:

```c
printf("%d", 5 || 10 / 0);
```

Evaluation

```text
5 || ...
```

Since `5` is true, the second operand is skipped.

Output

```text
1
```

---

## When Does the Second Operand Execute?

### Example 1

```c
printf("%d", 1 && 5);
```

Evaluation

```text
1 && 5
```

Both operands are evaluated.

Output

```text
1
```

---

### Example 2

```c
printf("%d", 0 || 5);
```

Evaluation

```text
0 || 5
```

The second operand must be evaluated.

Output

```text
1
```

---

## Using Functions

```c
#include <stdio.h>

int fun()
{
    printf("Function Called\n");
    return 1;
}

int main()
{
    printf("%d", 0 && fun());
}
```

Output

```text
0
```

`fun()` is **never called**.

---

Another example

```c
printf("%d", 1 || fun());
```

Output

```text
1
```

Again, `fun()` is skipped.

---

## Short-Circuiting with Increment Operators

```c
int i = 0;

printf("%d", i++ && 5);

printf("%d", i);
```

Evaluation

```text
i++ returns 0
i becomes 1
Second operand skipped
```

Output

```text
0
1
```

---

Another example

```c
int i = 0;

printf("%d", ++i && 5);
```

Evaluation

```text
++i makes i = 1
1 && 5
```

Output

```text
1
```

---

## Preventing Runtime Errors

A common use of short-circuiting is to avoid division by zero.

Instead of

```c
if (b / a > 5)
```

write

```c
if (a != 0 && b / a > 5)
```

If `a` is zero, the division is never evaluated.

---

## Pointer Safety

Instead of

```c
if(ptr->data == 10)
```

write

```c
if(ptr && ptr->data == 10)
```

If `ptr` is `NULL`, the second condition is skipped, preventing a crash.

---

## Common Mistakes

### Mistake 1

Assuming both operands are always evaluated.

```c
0 && fun()
```

`fun()` is **never executed**.

---

### Mistake 2

Assuming `&&` and `&` behave the same.

```c
0 && fun();
```

`fun()` is skipped.

```c
0 & fun();
```

`fun()` is executed because `&` is a bitwise operator, **not** a short-circuit operator.

---

### Mistake 3

Assuming `||` always evaluates both operands.

```c
10 || fun();
```

`fun()` is skipped.

---

## CDAC C-CAT MCQs

### MCQ 1

```c
printf("%d", 0 && 10 / 0);
```

A. Runtime Error

B. 0

C. 1

D. Undefined

**Answer:** **B**

---

### MCQ 2

```c
printf("%d", 5 || 10 / 0);
```

A. Runtime Error

B. 0

C. 1

D. Undefined

**Answer:** **C**

---

### MCQ 3

```c
int i = 0;

printf("%d", i++ && 5);

printf("%d", i);
```

A. 0 0

B. 0 1

C. 1 1

D. 1 0

**Answer:** **B**

---

### MCQ 4

```c
int i = 0;

printf("%d", ++i || 0);
```

A. 0

B. 1

C. Runtime Error

D. Undefined

**Answer:** **B**

---

### MCQ 5

```c
int i = 0;

printf("%d", i++ || 5);

printf("%d", i);
```

Evaluation

```text
i++ returns 0
i becomes 1
Second operand executes
```

Output

A. 1 1

B. 0 1

C. 1 0

D. 0 0

**Answer:** **A**

---

### MCQ 6

```c
int i = 5;

printf("%d", i-- && 0);

printf("%d", i);
```

Evaluation

```text
i-- returns 5
i becomes 4
5 && 0
```

Output

A. 0 4

B. 1 5

C. 0 5

D. 1 4

**Answer:** **A**

---

### MCQ 7

```c
printf("%d", 0 || 0 || 10);
```

A. 0

B. 1

C. 10

D. Error

**Answer:** **B**

---

### MCQ 8

```c
printf("%d", 5 && 6 && 7);
```

A. 0

B. 1

C. 7

D. 5

**Answer:** **B**

---

### MCQ 9

```c
printf("%d", 0 || 2 && 0);
```

Operator precedence:

```text
&& before ||
```

Evaluation

```text
2 && 0 = 0
0 || 0 = 0
```

A. 0

B. 1

C. 2

D. Error

**Answer:** **A**

---

### MCQ 10

```c
printf("%d", 1 || 0 && 0);
```

Evaluation

```text
&& before ||
0 && 0 = 0
1 || 0 = 1
```

A. 0

B. 1

C. Runtime Error

D. Undefined

**Answer:** **B**

---

## Key Takeaways

- Short-circuit evaluation applies only to `&&` and `||`.
- `&&` skips the second operand if the first operand is false.
- `||` skips the second operand if the first operand is true.
- Short-circuiting is commonly used to avoid division by zero and null pointer dereferencing.
- `&&` and `||` are different from the bitwise operators `&` and `|`, which always evaluate both operands.
- For CDAC C-CAT, always determine whether the second operand is evaluated before solving the expression.
````

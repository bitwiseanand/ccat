---
title: Operators precedence in C
subject: programming
topic: c
description: Understanding Operator Precedence** and Associativity is essential for the CDAC C-CAT exam.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Operator Precedence and Associativity in C – Complete Guide with MCQs for CDAC C-CAT

Understanding **Operator Precedence** and **Associativity** is essential for the CDAC C-CAT exam. Many questions involve evaluating expressions rather than testing individual operators. The key is knowing **which operator is evaluated first**.

---

## What is Operator Precedence?

**Operator precedence** determines **which operator is evaluated first** when an expression contains multiple operators.

Example:

```c
int x = 10 + 5 * 2;
````

Evaluation:

```text
10 + (5 * 2)
10 + 10
20
```

Output:

```text
20
```

Since `*` has higher precedence than `+`, multiplication happens first.

---

## What is Associativity?

When two operators have **the same precedence**, **associativity** determines the order of evaluation.

Example:

```c
int x = 20 / 5 * 2;
```

Both `/` and `*` have the same precedence and are **left-to-right associative**.

```text
20 / 5 = 4
4 * 2 = 8
```

Output:

```text
8
```

---

## Precedence vs Associativity

* **Precedence** decides **which operator gets evaluated first**.
* **Associativity** decides **the direction of evaluation** when operators have equal precedence.

---

## Common Precedence Order (Highest → Lowest)

| Operators               | Associativity |               |               |
| ----------------------- | ------------- | ------------- | ------------- |
| `()`                    | Left to Right |               |               |
| Unary (`++ -- ! ~ + -`) | Right to Left |               |               |
| `* / %`                 | Left to Right |               |               |
| `+ -`                   | Left to Right |               |               |
| `<< >>`                 | Left to Right |               |               |
| `< <= > >=`             | Left to Right |               |               |
| `== !=`                 | Left to Right |               |               |
| `&`                     | Left to Right |               |               |
| `^`                     | Left to Right |               |               |
| `                       | `             | Left to Right |               |
| `&&`                    | Left to Right |               |               |
| `                       |               | `             | Left to Right |
| `?:`                    | Right to Left |               |               |
| `=` `+=` `-=`           | Right to Left |               |               |
| `,`                     | Left to Right |               |               |

For the C-CAT exam, remembering the order below is usually sufficient:

```text
()
Unary
* / %
+ -
Relational
Equality
Bitwise
Logical
Assignment
Comma
```

---

## Parentheses Override Precedence

```c
int x = (10 + 5) * 2;
```

```text
15 * 2
30
```

Always evaluate expressions inside parentheses first.

---

## Solved Examples

### Example 1

```c
int a = 2 + 3 * 4;
```

```text
3 * 4 = 12
2 + 12 = 14
```

Output

```text
14
```

---

### Example 2

```c
int a = 20 - 8 / 2;
```

```text
8 / 2 = 4
20 - 4 = 16
```

Output

```text
16
```

---

### Example 3

```c
int a = 1;
int b = 2;
int c = 3;

a = a && b * c + 3;
```

Evaluation

```text
b * c = 6
6 + 3 = 9
1 && 9 = 1
```

Output

```text
a = 1
```

Arithmetic operators are evaluated before logical operators.

---

### Example 4

```c
int x = 10 > 5 + 3;
```

```text
5 + 3 = 8
10 > 8
1
```

Output

```text
1
```

---

### Example 5

```c
int x = 5 == 2 + 3;
```

```text
2 + 3 = 5
5 == 5
1
```

Output

```text
1
```

---

## Common C-CAT Mistakes

### Mistake 1

```c
10 + 2 * 5
```

Wrong:

```text
(10 + 2) * 5
```

Correct:

```text
10 + (2 * 5)
```

---

### Mistake 2

```c
a && b + c
```

Wrong:

```text
(a && b) + c
```

Correct:

```text
a && (b + c)
```

---

### Mistake 3

```c
x = y = z = 5;
```

Assignment operators are **right-to-left associative**.

```text
z = 5
y = 5
x = 5
```

---

## CDAC C-CAT MCQs

### MCQ 1

```c
printf("%d", 2 + 3 * 4);
```

A. 20

B. 14

C. 24

D. 10

**Answer:** **B**

---

### MCQ 2

```c
printf("%d", 20 / 5 * 2);
```

A. 2

B. 4

C. 8

D. 10

**Answer:** **C**

---

### MCQ 3

```c
int a = 1;
int b = 2;
int c = 3;

printf("%d", a && b * c + 3);
```

A. 0

B. 1

C. 9

D. 6

**Answer:** **B**

Evaluation

```text
b * c = 6
6 + 3 = 9
1 && 9 = 1
```

---

### MCQ 4

```c
printf("%d", 5 == 2 + 3);
```

A. 0

B. 1

C. 5

D. Error

**Answer:** **B**

---

### MCQ 5

```c
printf("%d", 10 > 5 + 10);
```

A. 0

B. 1

C. 5

D. Error

**Answer:** **A**

---

### MCQ 6

```c
int x;

x = 5 + 2 > 6;

printf("%d", x);
```

A. 5

B. 6

C. 1

D. 0

**Answer:** **C**

Evaluation

```text
5 + 2 = 7
7 > 6
1
```

---

### MCQ 7

```c
int x = 10;

x = x > 5 && 3 * 2;

printf("%d", x);
```

A. 0

B. 1

C. 6

D. 10

**Answer:** **B**

---

### MCQ 8

```c
int a;

a = 2 + 3 * 4 > 10;

printf("%d", a);
```

A. 14

B. 0

C. 1

D. 12

**Answer:** **C**

Evaluation

```text
3 * 4 = 12
2 + 12 = 14
14 > 10
1
```

---

### MCQ 9

```c
int x;

x = 10 == 5 + 5 && 8 > 3;

printf("%d", x);
```

A. 0

B. 1

C. 5

D. Error

**Answer:** **B**

Evaluation

```text
5 + 5 = 10
10 == 10 = 1
8 > 3 = 1
1 && 1 = 1
```

---

### MCQ 10

```c
int x = 5;

x = x = 2 + 3;

printf("%d", x);
```

A. 2

B. 3

C. 5

D. Error

**Answer:** **C**

Assignment operators associate **right to left**.

---

## Key Takeaways

* **Precedence** determines **which operator is evaluated first**.
* **Associativity** determines the evaluation direction when operators have the same precedence.
* Parentheses `()` have the highest precedence and should be used to make expressions clearer.
* Arithmetic operators are evaluated before relational operators, which are evaluated before logical operators.
* Assignment operators are **right-to-left associative**.
* For CDAC C-CAT, always evaluate expressions **step by step** rather than trying to compute them mentally in one go.

```
```

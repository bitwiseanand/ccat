---
title: Bitwise Operators in C
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
order: 3
description: "Bitwise operators work directly on the binary representation of integers, bit by bit, rather than on their decimal values. "
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Bitwise Operators in C – Complete Guide with MCQs for CDAC C-CAT

Bitwise operators work directly on the **binary representation** of integers, bit by bit, rather than on their decimal values. CDAC C-CAT regularly tests output-based questions built around these operators because a small mental slip (forgetting a number is signed, or misjudging shift direction) leads straight to a wrong answer.

This guide covers everything you need for the exam and technical interviews.

---

## The Six Bitwise Operators

| Operator | Name | Symbol |
|---|---|---|
| AND | Bitwise AND | `&` |
| OR | Bitwise OR | `\|` |
| XOR | Bitwise Exclusive OR | `^` |
| NOT | Bitwise Complement | `~` |
| Left Shift | Shift bits left | `<<` |
| Right Shift | Shift bits right | `>>` |

These operate on individual bits of `int`, `char`, and other integer types — not on `float` or `double`.

---

## Bitwise AND (&)

Result bit is 1 only if **both** corresponding bits are 1.

```c
int a = 12;   // 1100
int b = 10;   // 1010

printf("%d", a & b);
```

```
1100
1010
----
1000  → 8
```

Output

```
8
```

Common use: checking if a specific bit is set, using a mask.

---

## Bitwise OR (|)

Result bit is 1 if **either** corresponding bit is 1.

```c
int a = 12;   // 1100
int b = 10;   // 1010

printf("%d", a | b);
```

```
1100
1010
----
1110  → 14
```

Output

```
14
```

Common use: setting a specific bit without disturbing the others.

---

## Bitwise XOR (^)

Result bit is 1 only if the two bits are **different**.

```c
int a = 12;   // 1100
int b = 10;   // 1010

printf("%d", a ^ b);
```

```
1100
1010
----
0110  → 6
```

Output

```
6
```

Key property: `x ^ x = 0`, and `x ^ 0 = x`. This makes XOR useful for swapping two variables without a temporary variable, and for toggling bits.

```c
int a = 5, b = 9;

a = a ^ b;
b = a ^ b;
a = a ^ b;

printf("%d %d", a, b);
```

Output

```
9 5
```

---

## Bitwise NOT (~)

Inverts every bit — 0 becomes 1, and 1 becomes 0. For signed integers this is equivalent to `-(x + 1)`.

```c
int a = 5;

printf("%d", ~a);
```

```
5  = 00000000 00000000 00000000 00000101
~5 = 11111111 11111111 11111111 11111010  (this is -6 in two's complement)
```

Output

```
-6
```

---

## Left Shift (<<)

Shifts all bits to the left by the given number of positions, filling with zeros on the right. Each left shift by 1 is equivalent to multiplying by 2.

```c
int a = 5;   // 00000101

printf("%d", a << 2);
```

```
00000101 << 2 = 00010100  → 20
```

Output

```
20
```

`a << n` is equivalent to `a * 2^n` (as long as no bits overflow).

---

## Right Shift (>>)

Shifts all bits to the right by the given number of positions. For a positive number, this is equivalent to integer division by `2^n`.

```c
int a = 20;   // 00010100

printf("%d", a >> 2);
```

```
00010100 >> 2 = 00000101  → 5
```

Output

```
5
```

For **negative** numbers, most compilers perform an **arithmetic right shift**, filling with the sign bit (1) rather than 0 — this is implementation-defined behavior in the C standard, but virtually universal on modern systems.

```c
int a = -8;

printf("%d", a >> 1);
```

Typical Output

```
-4
```

---

## Checking if a Number is Even or Odd

```c
int n = 7;

if (n & 1)
    printf("Odd");
else
    printf("Even");
```

Output

```
Odd
```

The last bit of an odd number is always 1; of an even number, always 0.

---

## Swapping Two Numbers Using XOR

```c
int a = 3, b = 4;

a = a ^ b;
b = a ^ b;
a = a ^ b;

printf("%d %d", a, b);
```

Output

```
4 3
```

Caution: this fails if `a` and `b` refer to the **same memory location** (e.g. `a = a ^ a` at every step wipes the value to 0), so it's a classic trick question, not a safe general-purpose swap.

---

## Checking if a Number is a Power of 2

```c
int n = 16;

if (n > 0 && (n & (n - 1)) == 0)
    printf("Power of 2");
else
    printf("Not a power of 2");
```

Output

```
Power of 2
```

A power of 2 has exactly one bit set; subtracting 1 flips that bit and all bits after it, so ANDing the two always gives 0.

---

## Common Mistakes

#### Mistake 1

```c
int a = -4;

printf("%d", a >> 1);
```

Assuming this always gives `-2` by pure "divide by 2" logic without accounting for it being an arithmetic (sign-preserving) shift on negative numbers — the result is compiler/architecture dependent per the C standard, though `-2` is the typical outcome on most systems.

---

#### Mistake 2

```c
int a = 5, b = 5;

a = a ^ b;
b = a ^ b;
a = a ^ b;
```

Believing XOR swap always works — it silently fails if `a` and `b` are the same variable/address.

---

#### Mistake 3

Confusing `&` (bitwise AND) with `&&` (logical AND). `&` operates bit by bit and can return any integer; `&&` always returns 0 or 1.

```c
printf("%d", 4 & 2);    // 0  (0100 & 0010 = 0000)
printf("%d", 4 && 2);   // 1  (both non-zero, so logically true)
```

---

## Frequently Asked Interview Questions

#### What does `x << n` compute?

`x` multiplied by `2^n`, assuming no overflow.

---

#### What does `x >> n` compute for a positive x?

`x` divided by `2^n`, using integer (truncating) division.

---

#### How do you check if the k-th bit of a number is set?

```c
if (n & (1 << k))
    printf("Bit is set");
```

---

#### How do you clear the k-th bit of a number?

```c
n = n & ~(1 << k);
```

---

## CDAC C-CAT MCQs

#### MCQ 1

```c
int a = 6, b = 3;

printf("%d", a & b);
```

A. 2

B. 3

C. 6

D. 0

**Answer:** **A**

---

#### MCQ 2

```c
int a = 6, b = 3;

printf("%d", a | b);
```

A. 6

B. 3

C. 7

D. 0

**Answer:** **C**

---

#### MCQ 3

```c
int a = 5;

printf("%d", a << 1);
```

A. 5

B. 10

C. 2

D. 25

**Answer:** **B**

---

#### MCQ 4

```c
int a = 5;

printf("%d", ~a);
```

A. -5

B. -6

C. 5

D. 6

**Answer:** **B**

---

#### MCQ 5

```c
int a = 8;

printf("%d", a >> 2);
```

A. 32

B. 2

C. 4

D. 16

**Answer:** **B**

---

#### MCQ 6

```c
int a = 5, b = 9;

printf("%d", a ^ b);
```

A. 12

B. 14

C. 0

D. 4

**Answer:** **A**

---

#### MCQ 7

```c
int n = 18;

printf("%d", (n & (n - 1)) == 0 ? 1 : 0);
```

A. 1

B. 0

C. -1

D. Error

**Answer:** **B**

---

## Key Takeaways

- `&`, `|`, `^`, `~` operate bit by bit; `<<` and `>>` shift bits left or right.
- `x << n` multiplies `x` by `2^n`; `x >> n` divides positive `x` by `2^n`.
- Right shift on negative numbers is typically sign-preserving (arithmetic shift) but is implementation-defined by the C standard.
- `n & 1` checks even/odd; `n & (n - 1)) == 0` checks power of 2.
- Never confuse `&`/`|` (bitwise) with `&&`/`||` (logical) — they behave very differently.
- XOR swap fails when both variables share the same address.

---

#### Next Topics

To strengthen your C programming for **CDAC C-CAT**, continue with:

- Short-Circuit Evaluation in C
- Operator Precedence and Associativity in C
- Storage Classes in C
- Type Casting and Type Conversion in C
- Structure Padding in C

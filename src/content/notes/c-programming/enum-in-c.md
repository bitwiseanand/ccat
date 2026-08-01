---
title: "Enums in C"
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
description: Instead of writing numeric values directly in the code, enums make programs easier to read and maintain.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Enums in C Programming – Complete Guide with MCQs for CDAC C-CAT

Enums are one of the most frequently tested topics in the **CDAC C-CAT C Programming** section. Although they appear simple, many questions combine enums with **memory allocation, implicit values, typedef, switch statements, integer conversions, and compiler behavior**.

This guide covers everything you need for the exam and technical interviews.

---

## What is an Enum?

An **enumeration (enum)** is a user-defined data type that consists of a set of named integer constants.

Instead of writing numeric values directly in the code, enums make programs easier to read and maintain.

```c
enum Day
{
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
    SUN
};
```

Here,

```
MON = 0
TUE = 1
WED = 2
THU = 3
FRI = 4
SAT = 5
SUN = 6
```

By default, numbering starts from **0**.

---

## Why Use Enums?

Instead of

```c
int day = 3;
```

write

```c
enum Day day = THU;
```

Advantages:

* Improves readability
* Eliminates magic numbers
* Makes switch statements cleaner
* Easier maintenance
* Better self-documentation

---

## Basic Syntax

```c
enum Color
{
    RED,
    GREEN,
    BLUE
};

enum Color c = GREEN;
```

---

## Memory Representation

Many students think enums store strings.

They do **not**.

Memory stores only an integer.

```
enum Color c = BLUE;

Memory

+--------+
|   2    |
+--------+
```

The identifier `BLUE` simply represents the integer **2**.

---

## Default Values

```c
enum Number
{
    A,
    B,
    C,
    D
};
```

Values become

```
A = 0
B = 1
C = 2
D = 3
```

---

## Assigning Explicit Values

```c
enum Status
{
    FAIL = 0,
    PASS = 1
};
```

Output

```
FAIL = 0
PASS = 1
```

---

## Mixed Explicit and Implicit Values

```c
enum Number
{
    A = 5,
    B,
    C,
    D = 20,
    E,
    F
};
```

Values

```
A = 5
B = 6
C = 7
D = 20
E = 21
F = 22
```

Rule:

Every implicit value becomes

```
Previous value + 1
```

---

## Duplicate Values are Allowed

```c
enum Test
{
    A = 1,
    B = 1,
    C = 1
};
```

This is perfectly valid.

Output

```
A = 1
B = 1
C = 1
```

Names must be unique.

Values need not be.

---

## Negative Values

```c
enum Test
{
    A = -5,
    B,
    C
};
```

Values

```
A = -5
B = -4
C = -3
```

---

## Enum Variables

```c
enum Color
{
    RED,
    GREEN,
    BLUE
};

int main()
{
    enum Color c = GREEN;

    printf("%d", c);
}
```

Output

```
1
```

---

## Enum is Basically an Integer

```c
enum Color
{
    RED,
    GREEN,
    BLUE
};

printf("%d", RED);
```

Output

```
0
```

---

## Printing Enum

```c
enum Day
{
    MON,
    TUE,
    WED
};

printf("%d", WED);
```

Output

```
2
```

Enums do **not** automatically print names.

---

## Enum to Integer Conversion

```c
enum Color c = BLUE;

int x = c;

printf("%d", x);
```

Output

```
2
```

---

## Integer to Enum

```c
enum Color c;

c = 10;

printf("%d", c);
```

Output

```
10
```

The compiler usually allows this.

The value need not belong to the enum.

---

## Size of Enum

```c
enum Test
{
    A,
    B,
    C
};

printf("%zu", sizeof(enum Test));
```

Typical Output

```
4
```

Most compilers use the same size as `int`.

---

## typedef with Enum

Instead of

```c
enum Color c;
```

write

```c
typedef enum
{
    RED,
    GREEN,
    BLUE
} Color;

Color c = GREEN;
```

Much cleaner.

---

## Enum in Switch Statement

```c
enum Day
{
    MON,
    TUE,
    WED
};

enum Day d = TUE;

switch(d)
{
case MON:
    printf("Monday");
    break;

case TUE:
    printf("Tuesday");
    break;

case WED:
    printf("Wednesday");
    break;
}
```

Output

```
Tuesday
```

---

## Anonymous Enum

```c
enum
{
    RED,
    GREEN,
    BLUE
};

printf("%d", GREEN);
```

Output

```
1
```

No enum type name is created.

---

## Enum Constants are Compile-Time Constants

```c
enum
{
    SIZE = 100
};

int arr[SIZE];
```

Perfectly valid.

---

## Common Mistakes

#### Mistake 1

```c
enum Color;

Color c;
```

Wrong.

Need

```c
enum Color c;
```

unless `typedef` is used.

---

#### Mistake 2

```c
printf("%s", RED);
```

Wrong.

Enums are integers.

---

#### Mistake 3

Thinking enums store strings.

Wrong.

Only integers are stored.

---

## Frequently Asked Interview Questions

#### Can enum values repeat?

Yes.

---

#### Can enum start from any number?

Yes.

---

#### Can enum contain negative numbers?

Yes.

---

#### Are enums stored as strings?

No.

---

#### What is the default first value?

0

---

#### Can enum be used inside switch?

Yes.

---

#### What is the size of enum?

Usually the size of an `int`.

---

#### Can enum contain floating point values?

No.

---

#### Can we increment enum values automatically?

Yes.

```c
enum
{
A = 100,
B,
C
};
```

becomes

```
100
101
102
```

---

## CDAC C-CAT MCQs

#### MCQ 1

```c
enum Test
{
A,
B,
C
};

printf("%d", B);
```

A. 0

B. 1

C. 2

D. Error

**Answer:** **B**

---

#### MCQ 2

```c
enum Test
{
A=5,
B,
C
};

printf("%d %d", B, C);
```

A. 5 6

B. 6 7

C. 7 8

D. Error

**Answer:** **B**

---

#### MCQ 3

```c
enum Test
{
A=-2,
B,
C
};

printf("%d", C);
```

A. -1

B. 0

C. 1

D. 2

**Answer:** **B**

---

#### MCQ 4

```c
enum Test
{
A=2,
B=2,
C=2
};

printf("%d", C);
```

A. Error

B. 2

C. 3

D. Undefined

**Answer:** **B**

---

#### MCQ 5

```c
enum Test
{
A,
B
};

enum Test x;

x = 100;

printf("%d", x);
```

A. Error

B. 100

C. Undefined

D. Compiler dependent

**Answer:** **B**

---

#### MCQ 6

```c
typedef enum
{
RED,
GREEN,
BLUE
} Color;

Color c = BLUE;

printf("%d", c);
```

A. 1

B. 2

C. 3

D. Error

**Answer:** **B**

---

#### MCQ 7

```c
enum Test
{
A=10,
B,
C=50,
D
};

printf("%d %d", B, D);
```

A. 10 50

B. 11 51

C. 11 50

D. 12 51

**Answer:** **B**

---

#### MCQ 8

```c
enum Test
{
A,
B,
C
};

printf("%zu", sizeof(enum Test));
```

Typical Output

A. 1

B. 2

C. 4

D. 8

**Answer:** **C** (Most compilers)

---

## Key Takeaways

* An enum is a collection of **named integer constants**.
* Default values start at **0**.
* Explicit values override automatic numbering.
* Following values increment automatically.
* Duplicate values are allowed.
* Enums are stored as integers, not strings.
* `sizeof(enum)` is typically the same as `sizeof(int)`.
* `typedef enum` removes the need to write the `enum` keyword repeatedly.
* Enums improve readability, maintainability, and are widely used in switch statements, embedded systems, operating systems, and application development.

---

#### Next Topics

To strengthen your C programming for **CDAC C-CAT**, continue with:

* Storage Classes in C
* Typedef in C
* Structures and Unions
* Bit Fields
* Arrays and Pointers
* Dynamic Memory Allocation
* Preprocessor Directives
* Function Pointers
* Command Line Arguments
* File Handling

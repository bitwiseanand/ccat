---
title: "C Programming Cheat Sheet"
exam: "ccat"
subject: "c-programming"
topic: "c-basics"
description: "Complete C programming cheat sheet for C-CAT covering syntax, pointers, arrays, strings, and memory management. Quick revision notes."
keywords: ["c programming", "ccat c language", "pointers", "arrays"]
lastVerified: 2026-07-29
faq:
  - question: "Is C programming important for C-CAT?"
    answer: "Yes, C programming carries significant weightage in Section A of C-CAT exam."
  - question: "Which topics in C are most asked?"
    answer: "Pointers, arrays, strings, structures, and dynamic memory allocation are frequently tested."
---
> **Quick Navigation Guide:** Each topic follows the structure: `Cheatsheet → [Notes](#) → [MCQs](#) → [Flashcards](#)`
> *Links for Notes, MCQs, and Flashcards will be added per topic.*

---

## Table of Contents
1. [Program Structure & Compilation](#1-program-structure--compilation)
2. [Key Headers](#2-key-headers)
3. [Data Types & Variables](#3-data-types--variables)
4. [Input & Output](#4-input--output)
5. [Operators](#5-operators)
6. [Control Flow](#6-control-flow)
7. [Functions](#7-functions)
8. [Recursion](#8-recursion)
9. [Arrays](#9-arrays)
10. [Strings](#10-strings)
11. [Pointers](#11-pointers)
12. [Dynamic Memory Allocation](#12-dynamic-memory-allocation)
13. [Structures, Unions & Enums](#13-structures-unions--enums)
14. [File Handling](#14-file-handling)
15. [Preprocessor Directives](#15-preprocessor-directives)
16. [Bitwise Operators](#16-bitwise-operators)
17. [Storage Classes](#17-storage-classes)
18. [Command-Line Arguments](#18-command-line-arguments)
19. [Error Handling](#19-error-handling)
20. [Sorting & Searching](#20-sorting--searching)
21. [Common Standard Library Functions](#21-common-standard-library-functions)
22. [Quick Revision Summary](#22-quick-revision-summary)
23. [Pointers vs Arrays — Side by Side](#23-pointers-vs-arrays--side-by-side)
24. [Worked Examples](#24-worked-examples)

---

## 1. Program Structure & Compilation
### Cheatsheet
```c

#include <stdio.h>              // preprocessor directive

int global_var = 10;            // global (optional)

int main(int argc, char *argv[]) {

    int x = 5;

    printf("x = %d\n", x);

    return 0;                   // 0 = success

}

```
| Command | Effect |
|---------|--------|
| `gcc file.c -o out` | Compile + link → executable |
| `gcc -c file.c` | Compile to object file (`.o`) |
| `gcc -S file.c` | Compile to assembly (`.s`) |
| `gcc file.c -Wall -Wextra` | Enable all warnings |
| `gcc file.c -g` | Include debug symbols |
| `gcc file.c -O2` | Optimize level 2 |
| `gcc file.c -lm` | Link math library |
| `./out` | Run the program |
**Compilation Pipeline:** `Source (.c)` → `Preprocessor` → `Compiler` → `Assembly (.s)` → `Assembler` → `Object (.o)` → `Linker` → `Executable`

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 2. Key Headers
### Cheatsheet
| Header | Provides |
|--------|----------|
| `<stdio.h>` | `printf`, `scanf`, `fopen`, `fclose`, `fgets`, `fprintf`, `fscanf`, `getchar`, `putchar` |
| `<stdlib.h>` | `malloc`, `calloc`, `realloc`, `free`, `exit`, `atoi`, `atof`, `qsort`, `abs`, `rand`, `srand` |
| `<string.h>` | `strlen`, `strcpy`, `strncpy`, `strcat`, `strncat`, `strcmp`, `strncmp`, `strstr`, `strchr`, `strcspn`, `memset`, `memcpy` |
| `<math.h>` | `sqrt`, `pow`, `sin`, `cos`, `tan`, `ceil`, `floor`, `round`, `fabs`, `log`, `log10`, `exp` *(link `-lm`)* |
| `<ctype.h>` | `isalpha`, `isdigit`, `isalnum`, `isspace`, `isupper`, `islower`, `toupper`, `tolower` |
| `<time.h>` | `time()`, `clock()`, `difftime()`, `strftime()` |
| `<errno.h>` | `errno`, `perror()`, `strerror()` |
| `<assert.h>` | `assert(condition)` — debug checks |
| `<limits.h>` | `INT_MAX`, `INT_MIN`, `CHAR_BIT`, `USHRT_MAX` |
| `<float.h>` | `FLT_MAX`, `DBL_MIN`, `FLT_EPSILON` |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 3. Data Types & Variables
### Cheatsheet
| Type | Size | Format | Range |
|------|------|--------|-------|
| `char` | 1 B | `%c` / `%d` | -128 to 127 |
| `unsigned char` | 1 B | `%u` | 0 to 255 |
| `short` | 2 B | `%hd` | -32,768 to 32,767 |
| `unsigned short` | 2 B | `%hu` | 0 to 65,535 |
| `int` | 4 B | `%d` / `%i` | ~-2.1B to 2.1B |
| `unsigned int` | 4 B | `%u` | 0 to ~4.3B |
| `long` | 4/8 B | `%ld` | Platform dependent |
| `unsigned long` | 4/8 B | `%lu` | Platform dependent |
| `long long` | 8 B | `%lld` | ~-9.2E18 to 9.2E18 |
| `unsigned long long` | 8 B | `%llu` | 0 to ~1.8E19 |
| `float` | 4 B | `%f` / `%e` | ~7 digit precision |
| `double` | 8 B | `%lf` / `%le` | ~15 digit precision |
| `long double` | 12/16 B | `%Lf` | Extended precision |
| `size_t` | 4/8 B | `%zu` | Size type (unsigned) |
| `ptrdiff_t` | 4/8 B | `%td` | Pointer difference (signed) |
### Declaration & Casting
```c

int a = 10;

const int MAX_SIZE = 100;        // cannot be modified

int x = 3.7;                     // truncates → 3 (implicit cast)

float y = 5;                     // widens → 5.0 (implicit cast)

float fr = (float)a / b;         // explicit cast

printf("%zu\n", sizeof(int));   // sizeof operator → 4

// Type qualifiers

volatile int sensor;             // may change unexpectedly (hardware)

register int counter;            // hint to store in CPU register

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 4. Input & Output
### Cheatsheet
```c

// Basic formatted output

printf("%d %.2f %s %c\n", num, pi, name, ch);

printf("%10d\n", num);      // right-aligned, width 10

printf("%-10d|\n", num);    // left-aligned

printf("%010d\n", num);     // zero-padded to width 10

printf("%+d\n", num);       // always show sign

printf("%.5s\n", str);      // print max 5 chars

// scanf

scanf("%d", &age);           // & required for scalars

scanf("%49s", name);         // no & for arrays; limit to prevent overflow

// Safe string input

char full[100];

fgets(full, sizeof(full), stdin);       // reads spaces too

full[strcspn(full, "\n")] = '\0';     // strip trailing newline

// String formatting / parsing

sprintf(buf, "Age is %d", age);         // format into string

sscanf(data, "%d %f", &x, &y);          // parse from string

snprintf(buf, sizeof(buf), "%s", str);  // safe sprintf (C99)

// Character I/O

int ch = getchar();            // read single char

putchar('A');                  // write single char

// File I/O (see File Handling section)

```
### Format Specifiers
| Specifier | Type | Example |
|-----------|------|---------|
| `%d` / `%i` | `int` (decimal) | `42` |
| `%u` | `unsigned int` | `42` |
| `%f` | `float` / `double` | `3.14` |
| `%e` / `%E` | Scientific notation | `3.14e+00` |
| `%g` / `%G` | Shorter of `%f` or `%e` | `3.14` |
| `%c` | `char` | `A` |
| `%s` | String | `hello` |
| `%p` | Pointer address | `0x7ffd...` |
| `%x` / `%X` | Hexadecimal | `2a` / `2A` |
| `%o` | Octal | `52` |
| `%ld` | `long` | `42L` |
| `%lld` | `long long` | `42LL` |
| `%lu` | `unsigned long` | `42UL` |
| `%llu` | `unsigned long long` | `42ULL` |
| `%Lf` | `long double` | `3.14L` |
| `%zu` | `size_t` | `sizeof(x)` |
| `%%` | Literal `%` | `%` |
### Escape Sequences
| Escape | Meaning |
|--------|---------|
| `\n` | Newline |
| `\t` | Horizontal tab |
| `\r` | Carriage return |
| `\b` | Backspace |
| `\f` | Form feed |
| `\a` | Alert (bell) |
| `\v` | Vertical tab |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |
| `\0` | Null terminator |
| `\xhh` | Hex value (e.g., `\x41` = `A`) |
| `\ooo` | Octal value (e.g., `\101` = `A`) |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 5. Operators
### Cheatsheet
| Category | Operators |
|----------|-----------|
| **Arithmetic** | `+` `-` `*` `/` `%` |
| **Relational** | `==` `!=` `<` `>` `<=` `>=` |
| **Logical** | `&&` `\|\|` `!` *(short-circuit evaluated)* |
| **Bitwise** | `&` `\|` `^` `~` `<<` `>>` |
| **Assignment** | `=` `+=` `-=` `*=` `/=` `%=` `&=` `\|=` `^=` `<<=` `>>=` |
| **Increment/Decrement** | `++x` (pre), `x++` (post), `--x`, `x--` |
| **Ternary** | `cond ? valIfTrue : valIfFalse` |
| **Pointer** | `*` (deref), `&` (address-of), `->` |
| **Member** | `.` (direct), `->` (indirect) |
| **Comma** | `expr1, expr2` *(evaluates left to right, returns right)* |
| **Sizeof** | `sizeof(type)` / `sizeof expr` |
| **Cast** | `(type)expr` |
### Operator Precedence Table (High → Low)
| Precedence | Operator(s) | Associativity |
|:----------:|:------------|:-------------:|
| 1 | `()` `[]` `->` `.` | Left → Right |
| 2 | `++` `--` (postfix) | Left → Right |
| 3 | `++` `--` (prefix) `+` `-` (unary) `!` `~` `*` `&` `sizeof` `(type)` | Right → Left |
| 4 | `*` `/` `%` | Left → Right |
| 5 | `+` `-` | Left → Right |
| 6 | `<<` `>>` | Left → Right |
| 7 | `<` `<=` `>` `>=` | Left → Right |
| 8 | `==` `!=` | Left → Right |
| 9 | `&` | Left → Right |
| 10 | `^` | Left → Right |
| 11 | `\|` | Left → Right |
| 12 | `&&` | Left → Right |
| 13 | `\|\|` | Left → Right |
| 14 | `?:` | Right → Left |
| 15 | `=` `+=` `-=` etc. | Right → Left |
| 16 | `,` | Left → Right |
> **Mnemonic:** *"Please Excuse My Dear Aunt Sally"* adapted: **P**arentheses → **U**nary → **M**ultiply/**D**ivide → **A**dd/**S**ubtract → **S**hift → **R**elational → **E**quality → **B**itwise (**A**nd/**X**or/**O**r) → **L**ogical (**A**nd/**O**r) → **T**ernary → **A**ssignment → **C**omma

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 6. Control Flow
### Cheatsheet
#### Conditionals
```c

if (score >= 60) {

    printf("Pass\n");

} else if (score >= 40) {

    printf("Borderline\n");

} else {

    printf("Fail\n");

}

// Ternary operator

char *result = (score >= 60) ? "Pass" : "Fail";

// Switch

switch (day) {

    case 1: printf("Monday"); break;

    case 2: printf("Tuesday"); break;

    case 6: case 7: printf("Weekend"); break;  // fallthrough allowed

    default: printf("Invalid");

}

```
#### Loops
```c

// For loop

for (int i = 0; i < 5; i++) { printf("%d ", i); }

// While loop

while (cond) { ... }

// Do-while (body runs at least once)

do { ... } while (cond);

// Loop control

for (int i = 0; i < 10; i++) {

    if (i == 5) break;        // exit loop entirely

    if (i % 2 == 0) continue; // skip to next iteration

    printf("%d ", i);

}

// Nested loops with labels

outer:

for (int i = 0; i < 3; i++) {

    for (int j = 0; j < 3; j++) {

        if (i * j > 4) break outer;  // breaks both loops

    }

}

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 7. Functions
### Cheatsheet
```c

// Function prototype (declaration)

int add(int a, int b);

// Function definition

int add(int a, int b) {

    return a + b;

}

// Void function (no return)

void greet(void) {

    printf("Hello!\n");

}

// Pass by pointer to modify caller

void swap(int *a, int *b) {

    int t = *a;

    *a = *b;

    *b = t;

}

// Usage

int main() {

    int x = 10, y = 20;

    swap(&x, &y);   // x=20, y=10

    int sum = add(x, y);

    return 0;

}

```
**Key Rules:**
- All C arguments are **passed by value**
- Pass a **pointer** to let a function modify the caller's variable
- Return results instead of printing inside a function
- Take input as parameters instead of `scanf` inside functions
- Functions must be declared or defined before use
### Function Pointer
```c

int (*op)(int, int);           // declare function pointer

op = add;                      // assign

int result = op(3, 4);         // call via pointer

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 8. Recursion
### Cheatsheet
```c

// Factorial — O(n)

long long factorial(int n) {

    if (n == 0 || n == 1) return 1;    // base case

    return n * factorial(n - 1);       // recursive case

}

// Fibonacci — O(2^n) naive, O(n) with memoization

int fib(int n) {

    if (n <= 0) return 0;

    if (n == 1) return 1;

    return fib(n - 1) + fib(n - 2);

}

// Tail-recursive factorial (optimized by some compilers)

long long fact_tail(int n, long long acc) {

    if (n <= 1) return acc;

    return fact_tail(n - 1, n * acc);

}

```
**Recursion Checklist:**
1. ✅ **Base case** — stops recursion
2. ✅ **Recursive case** — moves toward base case
3. ✅ **Progress** — each call gets closer to base case
4. ⚠️ **Stack depth** — too deep = stack overflow

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 9. Arrays
### Cheatsheet
```c

// 1D Array

int arr[5] = {1, 2, 3, 4, 5};

int arr2[] = {1, 2, 3};        // size inferred: 3

int arr3[5] = {1, 2};          // {1, 2, 0, 0, 0}

// 2D Array

int mat[3][3] = {{1,2,3},{4,5,6},{7,8,9}};

// Array as function parameter (decays to pointer)

void print_array(int arr[], int n) {

    for (int i = 0; i < n; i++)

        printf("%d ", arr[i]);

}

// Equivalences

arr[i]      == *(arr + i)

&arr[i]     == arr + i

arr         == &arr[0]       // address of first element

// Array size

int n = sizeof(arr) / sizeof(arr[0]);   // only works in same scope

```
**Array Decay Rule:** When passed to a function, an array "decays" into a pointer to its first element. `sizeof(arr)` inside a function gives pointer size, not array size.

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 10. Strings
### Cheatsheet
```c

// String declaration

char s1[] = "Hello";           // mutable, size 6 (incl. '\0')

char *s2 = "Hello";            // pointer to string literal (read-only!)

char s3[20] = "Hello";         // mutable, extra space

// Common string functions (<string.h>)

strlen(s);                     // length without '\0'

strcpy(dst, src);              // copy (unsafe — no bounds check)

strncpy(dst, src, n);          // copy max n chars

strcat(dst, src);              // concatenate (unsafe)

strncat(dst, src, n);          // concatenate max n chars

strcmp(a, b);                  // compare: 0=equal, <0=a<b, >0=a>b

strncmp(a, b, n);              // compare max n chars

strstr(s, "sub");              // find substring → pointer or NULL

strchr(s, 'l');                // find first char → pointer or NULL

strrchr(s, 'l');               // find last char

strcspn(s, "abc");             // length of initial segment without chars

strtok(s, " ");                // tokenize (modifies string!)

// Conversion (<stdlib.h>)

atoi("42");                    // string → int

atof("3.14");                  // string → double

strtol("42", &end, 10);        // string → long, with error checking

// Character functions (<ctype.h>)

isalpha(c); isdigit(c); isalnum(c); isspace(c);

isupper(c); islower(c);

toupper(c); tolower(c);

```
> ⚠️ **Safety Rule:** Always prefer `strncpy`/`strncat`/`fgets`/`snprintf` over unbounded versions to prevent buffer overflows.

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 11. Pointers
### Cheatsheet
```c

int x = 42;

int *p = &x;              // & = address-of

printf("%d\n", *p);      // * = dereference → 42

int **pp = &p;             // pointer to pointer

**pp = 99;                 // modifies x through pp

int *n = NULL;              // null pointer — always check before dereferencing

if (n != NULL) { *n = 10; }

// Void pointer (generic)

void *vp = &x;

int *ip = (int*)vp;        // must cast before dereferencing

// Constant pointer vs pointer to constant

const int *p1 = &x;        // cannot modify *p1 (data is const)

int *const p2 = &x;        // cannot modify p2 (pointer is const)

const int *const p3 = &x;  // neither can be modified

```
### Pointer Arithmetic
```c

int arr[] = {10, 20, 30, 40, 50};

int *p = arr;

p++;          // now points to arr[1] (adds sizeof(int))

p += 2;       // now points to arr[3] (adds 2 * sizeof(int))

*p++;         // dereference p, then increment p

(*p)++;       // increment value at p

ptrdiff_t d = &arr[4] - &arr[0];  // d = 4 (element count, not bytes)

```
### Pointer Arithmetic Rules
| Expression | Meaning |
|------------|---------|
| `p + n` | Address of `p` + `n * sizeof(*p)` |
| `p - n` | Address of `p` - `n * sizeof(*p)` |
| `p - q` | Number of elements between `p` and `q` |
| `p++` | Move to next element |
| `p[i]` | Same as `*(p + i)` |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 12. Dynamic Memory Allocation
### Cheatsheet
```c

#include <stdlib.h>

// Allocate uninitialized memory

int *a = malloc(5 * sizeof(int));

if (a == NULL) { /* handle error */ }

// Allocate zero-initialized memory

int *b = calloc(5, sizeof(int));   // all elements = 0

// Resize existing block

a = realloc(a, 10 * sizeof(int));    // may move data to new location

if (a == NULL) { /* old block still valid! */ }

// Free memory

free(a);

a = NULL;                            // prevent dangling pointer

// Common pattern: allocate, use, free

int *arr = malloc(n * sizeof(int));

if (arr == NULL) {

    perror("malloc failed");

    exit(EXIT_FAILURE);

}

// ... use arr ...

free(arr);

arr = NULL;

```
### Memory Leak Prevention Checklist
| Action | Required |
|--------|----------|
| Every `malloc`/`calloc` | → Must have exactly one `free` |
| After `free(ptr)` | → Set `ptr = NULL` |
| `realloc` failure | → Original pointer still valid |
| Double `free` | → Undefined behavior (crash likely) |
| Use after `free` | → Undefined behavior (dangling pointer) |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 13. Structures, Unions & Enums
### Cheatsheet
```c

// Structure definition

typedef struct {

    int id;

    char name[50];

    float gpa;

} Student;

// Initialization

Student s = {101, "Alice", 3.8};

Student s2 = {.name = "Bob", .gpa = 3.5};  // designated initializer (C99)

// Member access

s.gpa = 3.9;               // dot operator (value)

Student *p = &s;

p->gpa = 4.0;               // arrow operator (pointer) — same as (*p).gpa

// Nested structures

struct Date { int day, month, year; };

struct Person {

    char name[20];

    struct Date dob;

};

struct Person person = {"Amit", {10, 5, 2002}};

printf("%d", person.dob.year);   // 2002

// Union — members share memory

union Data {

    int i;

    float f;

    char str[20];

};

union Data d;

d.i = 10;        // valid

d.f = 3.14;      // overwrites i — only one member meaningful at a time

// Enum

typedef enum { MON = 1, TUE, WED, THU, FRI, SAT, SUN } Weekday;

// Values auto-increment: TUE=2, WED=3, ...

// Self-referential structure (linked list)

struct Node {

    int data;

    struct Node *next;

};

```
### Structure vs Union
| Property | Structure | Union |
|----------|-----------|-------|
| Memory | Sum of all members + padding | Size of largest member |
| Active members | All simultaneously | Only one at a time |
| Use case | Grouping related data | Memory-efficient variant types |
| Example | `Student` record | `Data` that can be int OR float OR string |
### Structure Padding
```c

struct Demo {

    char c;    // 1 byte

    // 3 bytes padding

    int x;     // 4 bytes (aligned to 4-byte boundary)

};

// sizeof(struct Demo) == 8 (not 5!)

```
> 💡 **Tip:** Use `__attribute__((packed))` (GCC) or `#pragma pack(1)` to disable padding, but it may hurt performance.

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 14. File Handling
### Cheatsheet
```c

#include <stdio.h>

// Open file

FILE *fp = fopen("data.txt", "w");   // modes: r, w, a, rb, wb, r+, w+, a+

if (fp == NULL) {

    perror("fopen");                   // prints: "fopen: No such file or directory"

    return 1;

}

// Text I/O

fprintf(fp, "Score: %.2f\n", 98.5);

fscanf(fp, "%d %f", &x, &y);

// Line-by-line reading

char line[100];

while (fgets(line, sizeof(line), fp) != NULL) {

    printf("%s", line);

}

// Character I/O

int ch;

while ((ch = fgetc(fp)) != EOF) {

    putchar(ch);

}

// Binary I/O

fwrite(&rec, sizeof(rec), 1, fp);    // write 1 record

fread(&rec, sizeof(rec), 1, fp);     // read 1 record

// Random access

fseek(fp, 0, SEEK_SET);   // start of file

fseek(fp, 0, SEEK_END);   // end of file

fseek(fp, n, SEEK_CUR);   // n bytes from current position

long size = ftell(fp);    // current position in bytes

rewind(fp);               // same as fseek(fp, 0, SEEK_SET)

// Close file

fclose(fp);

fp = NULL;                 // prevent use-after-close

```
### File Open Modes
| Mode | Read | Write | Append | File must exist | Truncates |
|------|:----:|:-----:|:------:|:---------------:|:---------:|
| `"r"` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `"w"` | ❌ | ✅ | ❌ | ❌ | ✅ |
| `"a"` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `"r+"` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `"w+"` | ✅ | ✅ | ❌ | ❌ | ✅ |
| `"a+"` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `"rb"` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `"wb"` | ❌ | ✅ | ❌ | ❌ | ✅ |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 15. Preprocessor Directives
### Cheatsheet
```c

// Object-like macro

#define PI 3.14159

#define MAX_SIZE 100

// Function-like macro (ALWAYS parenthesize args!)

#define SQUARE(x) ((x) * (x))

#define MAX(a, b) ((a) > (b) ? (a) : (b))

#define DEBUG_PRINT(fmt, ...) printf("[DEBUG] " fmt "\n", ##__VA_ARGS__)

// Conditional compilation

#ifdef DEBUG

    printf("Debug mode\n");

#elif defined(TEST)

    printf("Test mode\n");

#else

    printf("Release mode\n");

#endif

#ifndef HEADER_H    // Include guard

#define HEADER_H

// ... declarations ...

#endif

// Pragmas

#pragma once        // Alternative to include guards (non-standard but widely supported)

// Predefined macros

__FILE__            // Current file name (string)

__LINE__            // Current line number (int)

__DATE__            // Compilation date (string)

__TIME__            // Compilation time (string)

__func__            // Current function name (C99, string)

__STDC__            // 1 if standard C

// Stringification and concatenation

#define STR(x) #x           // STR(hello) → "hello"

#define CONCAT(a, b) a##b   // CONCAT(x, y) → xy

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 16. Bitwise Operators
### Cheatsheet
| Operator | Name | Example |
|----------|------|---------|
| `&` | AND | `5 & 3` → `1` (0101 & 0011 = 0001) |
| `\|` | OR | `5 \| 3` → `7` (0101 \| 0011 = 0111) |
| `^` | XOR | `5 ^ 3` → `6` (0101 ^ 0011 = 0110) |
| `~` | NOT | `~5` → `-6` (inverts all bits) |
| `<<` | Left shift | `5 << 1` → `10` (×2) |
| `>>` | Right shift | `5 >> 1` → `2` (÷2) |
### Common Bit Manipulation Patterns
```c

n & 1                    // check if odd (test LSB)

n & (n - 1)              // clear lowest set bit

n & (-n)                 // isolate lowest set bit

n | (1 << k)             // set bit k

n & ~(1 << k)            // clear bit k

n ^ (1 << k)             // toggle bit k

(n >> k) & 1             // read bit k

n ^ (n >> 1)             // Gray code

// Count set bits (Brian Kernighan's algorithm)

int count = 0;

while (n) {

    n &= n - 1;

    count++;

}

// Swap without temp variable

a ^= b; b ^= a; a ^= b;

// Toggle ASCII case

c ^ 32;                   // 'A'(65) ^ 32 = 'a'(97)

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 17. Storage Classes
### Cheatsheet
| Class | Keyword | Scope | Lifetime | Default Value | Linkage |
|-------|---------|-------|----------|---------------|---------|
| `auto` | `auto` | Block | Block | Garbage | None |
| `register` | `register` | Block | Block | Garbage | None |
| `static` (local) | `static` | Block | Whole program | `0` | None |
| `static` (global) | `static` | File | Whole program | `0` | Internal |
| `extern` | `extern` | File/Global | Whole program | `0` | External |
```c

void counter(void) {

    static int count = 0;    // retains value between calls

    count++;

    printf("Called %d times\n", count);

}

// extern: declare a global defined in another file

extern int shared_var;

```
**Key Behaviors:**
- `static` local: initialized once, retains value across function calls
- `static` global: visible only within the file (internal linkage)
- `extern`: refers to a variable defined elsewhere
- `register`: hint to store in CPU register (compiler may ignore)

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 18. Command-Line Arguments
### Cheatsheet
```c

int main(int argc, char *argv[]) {

    // argc = argument count (includes program name, so argc >= 1)

    // argv[0] = program name (may be path)

    // argv[1] to argv[argc-1] = actual arguments

    // argv[argc] = NULL (standard guarantee)

    printf("Program: %s\n", argv[0]);

    for (int i = 1; i < argc; i++) {

        printf("Arg %d: %s\n", i, argv[i]);

    }

    return 0;

}

```
**Usage:** `./program file.txt 100`
- `argc` = 3
- `argv[0]` = `"./program"`
- `argv[1]` = `"file.txt"`
- `argv[2]` = `"100"` *(string — use `atoi` to convert)*

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 19. Error Handling
### Cheatsheet
```c

#include <stdio.h>

#include <errno.h>

#include <string.h>

FILE *fp = fopen("missing.txt", "r");

if (fp == NULL) {

    perror("fopen");                    // prints: "fopen: No such file or directory"

    printf("Error %d: %s\n", errno, strerror(errno));

    return EXIT_FAILURE;

}

// malloc error handling

int *p = malloc(100 * sizeof(int));

if (p == NULL) {

    fprintf(stderr, "Memory allocation failed\n");

    exit(EXIT_FAILURE);

}

// assert for debug checks (removed in NDEBUG builds)

#include <assert.h>

assert(ptr != NULL);    // aborts if condition is false

// Return codes

return EXIT_SUCCESS;    // 0

return EXIT_FAILURE;    // non-zero (platform dependent, usually 1)

```
### Common `errno` Values
| Value | Meaning |
|-------|---------|
| `ENOENT` | No such file or directory |
| `ENOMEM` | Not enough memory |
| `EACCES` | Permission denied |
| `EINVAL` | Invalid argument |
| `EIO` | Input/output error |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 20. Sorting & Searching
### Cheatsheet
| Algorithm | Idea | Time | Space |
|-----------|------|------|-------|
| **Selection Sort** | Find min, swap into place | O(n²) | O(1) |
| **Bubble Sort** | Swap adjacent out-of-order pairs | O(n²) | O(1) |
| **Insertion Sort** | Build sorted array one element at a time | O(n²) avg | O(1) |
| **Merge Sort** | Divide, sort halves, merge | O(n log n) | O(n) |
| **Quick Sort** | Partition around pivot, recurse | O(n log n) avg, O(n²) worst | O(log n) |
| **Heap Sort** | Build heap, repeatedly extract max | O(n log n) | O(1) |
| **Linear Search** | Scan every element | O(n) | O(1) |
| **Binary Search** | Halve range on sorted array | O(log n) | O(1) |
```c

// Binary Search (iterative)

int binary_search(int arr[], int n, int target) {

    int lo = 0, hi = n - 1;

    while (lo <= hi) {

        int mid = lo + (hi - lo) / 2;   // avoids overflow: NOT (lo + hi) / 2

        if (arr[mid] == target) return mid;

        else if (arr[mid] < target) lo = mid + 1;

        else hi = mid - 1;

    }

    return -1;   // not found

}

// qsort from stdlib.h

int cmp(const void *a, const void *b) {

    return (*(int*)a - *(int*)b);

}

qsort(arr, n, sizeof(int), cmp);

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 21. Common Standard Library Functions
### Cheatsheet
#### `<math.h>` *(compile with `-lm`)*
```c

sqrt(x);        // square root

pow(b, e);      // b raised to e

cbrt(x);        // cube root (C99)

fabs(x);        // absolute value (float/double)

ceil(x);        // round up

floor(x);       // round down

round(x);       // round to nearest (C99)

trunc(x);       // truncate toward zero (C99)

fmod(x, y);     // floating-point remainder

log(x);         // natural log

log10(x);       // base-10 log

log2(x);        // base-2 log (C99)

exp(x);         // e^x

sin(x); cos(x); tan(x);      // trig (radians)

asin(x); acos(x); atan(x);   // inverse trig

sinh(x); cosh(x); tanh(x);   // hyperbolic

M_PI;           // π (non-standard but common)

```
#### `<stdlib.h>`
```c

// Random numbers

srand(time(NULL));          // seed once

int dice = rand() % 6 + 1;  // 1-6 (biased for large ranges!)

// Conversion

atoi(str); atof(str); atol(str);

strtol(str, &endptr, base);  // base 2-36, with error checking

strtod(str, &endptr);        // string to double

// Memory

malloc(n); calloc(n, size); realloc(ptr, size); free(ptr);

// Search & Sort

bsearch(&key, arr, n, sizeof(elem), cmp);   // binary search

qsort(arr, n, sizeof(elem), cmp);            // quick sort

// Program control

exit(0); abort(); atexit(cleanup_func);

system("ls -la"); getenv("PATH");

abs(n); labs(n); llabs(n);

```
#### `<string.h>`
```c

memcpy(dst, src, n);     // copy n bytes (areas must not overlap)

memmove(dst, src, n);    // copy n bytes (areas may overlap)

memset(ptr, 0, n);       // fill n bytes with value

memcmp(a, b, n);         // compare n bytes

memchr(ptr, c, n);       // find char in n bytes

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 22. Quick Revision Summary
### Cheatsheet
| Concept | Key Point |
|---------|-----------|
| **Pointers** | `int *p = &x;` holds address; `*p` dereferences it |
| **Arrays** | `arr[i] == *(arr + i)`; name decays to pointer in functions |
| **Strings** | Null-terminated `char` arrays; always room for `'\0'` |
| **Memory** | Pair every `malloc`/`calloc` with `free`; check for `NULL` |
| **Structs** | Dot `.` for values, arrow `->` for pointers to structs |
| **Unions** | All members share memory; size = largest member |
| **Functions** | Pass-by-value; use pointers to modify caller data |
| **Files** | Check `fopen` for `NULL`; always `fclose` |
| **Bitwise** | `&` check bit, `\|` set bit, `^` toggle bit, `~` invert |
| **Recursion** | Needs base case + progress toward it |
| **Static** | Local: retains value; Global: file scope only |
| **Const** | `const int *p` = data const; `int *const p` = pointer const |

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 23. Pointers vs Arrays — Side by Side
### Cheatsheet
| Expression | Array Meaning | Pointer Meaning |
|------------|---------------|-----------------|
| `arr` | Address of first element (constant, cannot be reassigned) | `p = arr` — p is a pointer, CAN be reassigned |
| `*arr` / `*p` | Value of first element | Value at address p |
| `arr[i]` / `p[i]` | Value at index i | Value at *(p + i) |
| `&arr[i]` / `&p[i]` | Address of element i | Address of element i |
| `sizeof(arr)` | Total bytes of array (compile-time) | — |
| `sizeof(p)` | — | Size of pointer (4 or 8 bytes) |
| `&arr` | Address of entire array (type: `int (*)[5]`) | — |
| `arr++` | ❌ Illegal (array is not a lvalue) | ✅ Valid (moves to next element) |
```c

int arr[5] = {10, 20, 30, 40, 50};

int *p = arr;

// These are equivalent:

arr[2]      == *(arr + 2)      == 2[arr]      == *(p + 2)      == p[2]

&arr[2]     == arr + 2         == p + 2        == &p[2]

```
> 💡 **Fun fact:** `arr[i]` and `i[arr]` are both valid in C because `a[b]` is defined as `*(a + b)` and addition is commutative!

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

## 24. Worked Examples
### Cheatsheet
#### Reverse an Array In-Place
```c

void reverse(int arr[], int n) {

    int i = 0, j = n - 1;

    while (i < j) {

        int t = arr[i];

        arr[i] = arr[j];

        arr[j] = t;

        i++;

        j--;

    }

}

```
#### Find Max and Min with Pointer Outputs
```c

void find_max_min(int arr[], int n, int *max, int *min) {

    *max = *min = arr[0];

    for (int i = 1; i < n; i++) {

        if (arr[i] > *max) *max = arr[i];

        if (arr[i] < *min) *min = arr[i];

    }

}

// Call: find_max_min(arr, 5, &max, &min);

```
#### Count Set Bits (Brian Kernighan)
```c

int count_ones(unsigned int n) {

    int count = 0;

    while (n != 0) {

        n &= n - 1;    // clears lowest set bit

        count++;

    }

    return count;

}

```
#### Dynamic 2D Array (Jagged / Array of Pointers)
```c

int **m = malloc(rows * sizeof(int*));

for (int i = 0; i < rows; i++)

    m[i] = malloc(cols * sizeof(int));

// Use: m[i][j]

// Free

for (int i = 0; i < rows; i++)

    free(m[i]);

free(m);

```
#### Dynamic 2D Array (Contiguous Block)
```c

int *data = malloc(rows * cols * sizeof(int));

int **m = malloc(rows * sizeof(int*));

for (int i = 0; i < rows; i++)

    m[i] = data + i * cols;

// Use: m[i][j]

// Free

free(m[0]);   // frees data

free(m);      // frees pointer array

```
#### Safe String Copy
```c

void safe_copy(char *dst, size_t dst_size, const char *src) {

    if (dst_size > 0) {

        strncpy(dst, src, dst_size - 1);

        dst[dst_size - 1] = '\0';

    }

}

```
#### Linked List Node (Self-Referential Structure)
```c

struct Node {

    int data;

    struct Node *next;

};

// Insert at head

void push(struct Node **head, int data) {

    struct Node *new = malloc(sizeof(struct Node));

    new->data = data;

    new->next = *head;

    *head = new;

}

```

---

### [📋 Notes](#) &nbsp;|&nbsp; [❓ MCQs](#) &nbsp;|&nbsp; [🃏 Flashcards](#)

---

> **End of Cheatsheet** — *Add your Notes, MCQs, and Flashcards links above per topic.*
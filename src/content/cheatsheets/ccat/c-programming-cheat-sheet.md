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
## Program structure & compilation

```c
#include <stdio.h>              // preprocessor directive
int global_var = 10;            // global (optional)

int main(int argc, char *argv[]) {
    int x = 5;
    printf("x = %d\n", x);
    return 0;                   // 0 = success
}
```

| Command | Effect |
|---|---|
| `gcc file.c -o out` | Compile + link → executable |
| `gcc -c file.c` | Compile to object file (.o) |
| `gcc -S file.c` | Compile to assembly (.s) |
| `gcc file.c -Wall -Wextra` | Enable warnings |
| `./out` | Run the program |

### Key headers

| Header | Provides |
|---|---|
| `stdio.h` | printf, scanf, fopen, fclose, fgets |
| `stdlib.h` | malloc, calloc, free, exit, atoi, qsort |
| `string.h` | strlen, strcpy, strcat, strcmp, strstr |
| `math.h` | sqrt, pow, sin, cos, ceil, floor (link `-lm`) |
| `ctype.h` | isalpha, isdigit, toupper, tolower |

## Data types & variables

| Type | Size | Format | Notes |
|---|---|---|---|
| char | 1 B | %c / %d | -128 to 127 |
| unsigned char | 1 B | %u | 0 to 255 |
| short | 2 B | %hd | -32768 to 32767 |
| int | 4 B | %d | ~-2.1B to 2.1B |
| unsigned int | 4 B | %u | 0 to ~4.3B |
| long | 4/8 B | %ld | platform dependent |
| long long | 8 B | %lld | large integers |
| float | 4 B | %f | ~7 digit precision |
| double | 8 B | %lf | ~15 digit precision |

### Declaration & casting

```c
int a = 10;
const int MAX_SIZE = 100;        // cannot be modified
int x = 3.7;                     // truncates -> 3
float y = 5;                     // widens -> 5.0
float fr = (float)a / b;         // explicit cast
printf("%zu\n", sizeof(int));    // sizeof operator -> 4
```

## Input & output

```c
printf("%d %.2f %s %c\n", num, pi, name, ch);
printf("%10d\n", num);   // right-aligned width 10
printf("%-10d|\n", num); // left-aligned
printf("%010d\n", num);  // zero-padded

scanf("%d", &age);       // & required for scalars
scanf("%49s", name);     // no & needed for arrays

char full[100];
fgets(full, sizeof(full), stdin);       // reads spaces too
full[strcspn(full, "\n")] = '\0';       // strip newline

sprintf(buf, "Age is %d", age);         // format into string
sscanf(data, "%d %f", &x, &y);          // parse from string
```

### Format specifiers

| Specifier | Type |
|---|---|
| %d / %i | int |
| %u | unsigned |
| %f | float/double |
| %e | scientific |
| %c | char |
| %s | string |
| %p | pointer |
| %x / %X | hex |
| %o | octal |
| %ld | long |
| %lld | long long |
| %zu | size_t |

## Operators

- **Arithmetic**: `+ - * / %` (int `/` truncates toward zero)
- **Relational**: `== != < > <= >=`
- **Logical**: `&& || !` — short-circuit evaluated
- **Assignment**: `+= -= *= /= %=`
- **Increment**: `++x` pre (change then use), `x++` post (use then change)
- **Ternary**: `cond ? valIfTrue : valIfFalse`

**Precedence (high → low, abbreviated)**: `()` `[]` `->` `.` → unary `!` `~` `++` `--` `*` `&` → `*` `/` `%` → `+` `-` → shifts `<<` `>>` → relational → `==` → `&` → `^` → `|` → `&&` → `||` → `?:` → `=`

## Control flow

### Conditionals

```c
if (score >= 60) { printf("Pass\n"); }
else if (score >= 40) { printf("Borderline\n"); }
else { printf("Fail\n"); }

switch (day) {
    case 1: printf("Mon"); break;
    case 6: case 7: printf("Weekend"); break;  // fallthrough
    default: printf("Invalid");
}
```

### Loops

```c
for (int i = 0; i < 5; i++) { printf("%d ", i); }
while (cond) { ... }
do { ... } while (cond);   // body runs at least once

for (int i = 0; i < 10; i++) {
    if (i == 5) break;        // exit loop entirely
    if (i % 2 == 0) continue; // skip to next iteration
    printf("%d ", i);
}
```

## Functions

```c
int add(int a, int b);                  // prototype (declare before use)
int add(int a, int b) { return a + b; } // definition

void swap(int *a, int *b) {   // pass by pointer to modify caller
    int t = *a; *a = *b; *b = t;
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);   // x=20, y=10
}
```

All C arguments are passed by value — pass a pointer to let a function modify the caller's variable. Good practice: return results instead of printing inside a function; take input as parameters instead of `scanf` inside.

## Recursion

```c
long long factorial(int n) {
    if (n == 0 || n == 1) return 1;    // base case
    return n * factorial(n - 1);       // recursive case
}

int fib(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fib(n-1) + fib(n-2);        // O(2^n) - slow!
}
```

Every recursive function needs a base case and a recursive case that moves toward it. Naive recursive Fibonacci is exponential; an iterative version is O(n).

## Arrays

```c
int arr[5] = {1, 2, 3, 4, 5};
int mat[3][3] = {{1,2,3},{4,5,6},{7,8,9}};

void print_array(int arr[], int n) {   // decays to pointer
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
}
// arr[i] is equivalent to *(arr + i)
// array name = pointer to its first element
```

## Strings

```c
char s[] = "Hello";   // null-terminated: {'H','e','l','l','o','\0'}

strlen(s); strcpy(dst, s); strcat(dst, s); strcmp(a, b);
strstr(s, "sub"); strchr(s, 'l');
atoi("42"); atof("3.14");
toupper(c); tolower(c); isalpha(c); isdigit(c);
```

Prefer `strncpy`/`strncat`/`fgets` over the unbounded versions to avoid buffer overflows.

## Pointers

```c
int x = 42;
int *p = &x;              // & = address-of
printf("%d\n", *p);       // * = dereference -> 42

int **pp = &p;             // pointer to pointer
**pp = 99;                 // modifies x through pp

int *n = NULL;              // always check before dereferencing
if (n != NULL) { ... }
```

### Pointer arithmetic

```c
int arr[] = {10,20,30,40,50};
int *p = arr;
p++;      // now points to arr[1]
p += 2;   // now points to arr[3]

ptrdiff_t d = (&arr[4]) - (&arr[0]);  // d = 4 (element count)
```

## Dynamic memory allocation

```c
int *a = malloc(5 * sizeof(int));       // uninitialized memory
int *b = calloc(5, sizeof(int));        // zero-initialized memory
a = realloc(a, 10 * sizeof(int));       // resize existing block
if (a == NULL) { /* allocation failed */ exit(1); }
free(a); a = NULL;                      // always free; avoid leaks
```

A memory leak happens when allocated memory is never freed. Always pair every `malloc`/`calloc` with a matching `free`.

## Structures, unions & enums

```c
typedef struct {
    int id;
    char name[50];
    float gpa;
} student_t;

student_t s = {101, "Alice", 3.8};
s.gpa = 3.9;               // dot operator

student_t *p = &s;
p->gpa = 4.0;               // arrow operator (same as (*p).gpa)

union data { int i; float f; char str[20]; };  // members share memory

typedef enum { MON=1, TUE, WED, THU, FRI, SAT, SUN } weekday_t;  // auto-increments
```

| Property | Structure | Union |
|---|---|---|
| Memory | Sum of all members | Size of largest member |
| Active members | All at once | Only one at a time |

## File handling

```c
FILE *fp = fopen("data.txt", "w");   // r w a rb wb r+ w+
if (fp == NULL) { perror("fopen"); return 1; }
fprintf(fp, "Score: %.2f\n", 98.5);
fclose(fp);

fp = fopen("data.txt", "r");
char line[100];
while (fgets(line, sizeof(line), fp) != NULL) { printf("%s", line); }
fclose(fp);

fwrite(&rec, sizeof(rec), 1, fp);   // binary write
fread(&rec, sizeof(rec), 1, fp);    // binary read

fseek(fp, 0, SEEK_END);   // SEEK_SET / SEEK_CUR / SEEK_END
long size = ftell(fp);
```

## Preprocessor directives

```c
#define PI 3.14159
#define SQUARE(x) ((x) * (x))   // always parenthesize macro args

#ifdef DEBUG
    printf("debug info\n");
#endif

#ifndef HEADER_H    // include guard
#define HEADER_H
...
#endif
```

## Bitwise operators

| Operator | Meaning |
|---|---|
| `&` | AND |
| `\|` | OR |
| `^` | XOR |
| `~` | NOT |
| `<<` | shift left (×2^n) |
| `>>` | shift right (÷2^n) |

```c
n & 1              // check if odd (LSB test)
n | (1 << k)       // set bit k
n & ~(1 << k)      // clear bit k
n ^ (1 << k)       // toggle bit k
(n >> k) & 1       // read bit k
c ^ 32             // toggle ASCII letter case
a ^= b; b ^= a; a ^= b;   // swap two ints without a temp variable
```

## Storage classes

| Class | Scope | Lifetime | Default value |
|---|---|---|---|
| `auto` | block | block | garbage |
| `register` | block | block | garbage (CPU-register hint) |
| `static` | block/file | whole program | 0 |
| `extern` | file/global | whole program | 0 |

`static` local variables retain their value between function calls.

## Command-line arguments

```c
int main(int argc, char *argv[]) {
    // argc = number of arguments (includes program name)
    // argv[0] = program name, argv[1..] = actual arguments
    for (int i = 0; i < argc; i++) printf("%s\n", argv[i]);
}
```

## Error handling

```c
FILE *fp = fopen("missing.txt", "r");
if (fp == NULL) {
    perror("fopen");                    // prints readable error
    printf("%s\n", strerror(errno));    // errno.h
    return 1;
}
if (malloc(100) == NULL) exit(EXIT_FAILURE);
```

## Sorting & searching (patterns)

| Algorithm | Idea | Time |
|---|---|---|
| Selection sort | Repeatedly find min, swap into place | O(n²) |
| Bubble sort | Repeatedly swap adjacent out-of-order pairs | O(n²) |
| Merge sort | Divide, sort halves, merge | O(n log n) |
| Quick sort | Partition around a pivot, recurse | O(n log n) avg |
| Linear search | Scan every element | O(n) |
| Binary search | Halve the range on a sorted array | O(log n) |

```c
int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

## Common standard library functions

```c
// math.h (compile with -lm)
sqrt(x); pow(b,e); fabs(x); ceil(x); floor(x); round(x); log(x); log10(x);

// stdlib.h
srand(time(NULL)); rand();        // random numbers
int dice = rand() % 6 + 1;        // 1-6
exit(0); exit(EXIT_FAILURE);
qsort(arr, n, sizeof(int), cmp_func);
```

## Quick revision summary

- **Pointers**: `int *p = &x;` holds an address; `*p` dereferences it.
- **Arrays**: `arr[i] == *(arr + i)`; array name decays to a pointer when passed to functions.
- **Strings**: null-terminated char arrays; always leave room for `'\0'`.
- **Memory**: pair every `malloc`/`calloc` with `free`; check for NULL.
- **Structs**: dot `.` for values, arrow `->` for pointers to structs.
- **Functions**: pass-by-value by default; use pointers to modify caller data.
- **Files**: always check `fopen` for NULL and close with `fclose`.

## Pointers vs arrays — side by side

| Expression | Meaning |
|---|---|
| `arr` | address of first element (constant, cannot be reassigned) |
| `*arr` | value of first element |
| `arr[i]` | value at index i |
| `&arr[i]` | address of element i |
| `p = arr` | p is a pointer, CAN be reassigned / incremented |
| `p[i]` | same as `*(p + i)` |
| `sizeof(arr)` | total bytes of the array (compile-time size) |
| `sizeof(p)` | size of the pointer itself (e.g. 8 bytes on 64-bit) |

## Worked examples

### Reverse an array in place

```c
void reverse(int arr[], int n) {
    int i = 0, j = n - 1;
    while (i < j) {
        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        i++; j--;
    }
}
```

### Find max and min with pointer outputs

```c
void find_max_min(int arr[], int n, int *max, int *min) {
    *max = *min = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > *max) *max = arr[i];
        if (arr[i] < *min) *min = arr[i];
    }
}
// call: find_max_min(arr, 5, &max, &min);
```

### Count set bits

```c
int count_ones(unsigned int n) {
    int count = 0;
    while (n != 0) { count += n & 1; n >>= 1; }
    return count;
}
```

### Dynamic 2D array

```c
int **m = malloc(rows * sizeof(int*));
for (int i = 0; i < rows; i++) m[i] = malloc(cols * sizeof(int));
// ... use m[i][j] ...
for (int i = 0; i < rows; i++) free(m[i]);
free(m);
```

## CDAC C-CAT — top C programming traps

| Trap | Rule |
|---|---|
| Missing `&` in scanf | Forgetting `&` before a variable in `scanf` causes crashes or garbage reads. |
| String comparison | Comparing strings with `==` compares pointers, not contents — use `strcmp`. |
| Loop bounds | Off-by-one errors, especially `<=` vs `<` on array bounds. |
| Returning a local address | Returning the address of a stack variable is invalid — it no longer exists after the function returns. |
| Memory leaks / use-after-free | Forgetting to `free` allocated memory, or using memory after it's freed. |
| Missing `break` | A missing `break` in a `switch` causes unintended fallthrough. |
| Integer division truncation | `5 / 2` is `2`, not `2.5` — cast one operand to `float` if you need the decimal. |
| Unparenthesized macros | `#define SQ(x) x*x` breaks for `SQ(a+b)` — always wrap macro parameters in parentheses. |
| Unbounded string functions | `gets`/`strcpy` without a size limit risk buffer overflows — prefer the bounded variants. |

*PYQs are indicative of exam style, not guaranteed exact repeats.*

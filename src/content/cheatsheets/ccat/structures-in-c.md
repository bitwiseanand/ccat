---
title: "Structures in C"
exam: "ccat"
subject: "c-programming"
topic: "structures"
description: "Structures in C — declaration, initialization, nested structs, arrays of structs, and pointers to structs for CDAC C-CAT revision."
keywords: ["quantitative aptitude", "percentages", "time and work", "averages", "ccat quant"]
lastVerified: 2026-07-28
---

## What is a Structure?

A **structure (`struct`)** is a user-defined data type that groups variables of different data types under one name.

Unlike arrays, which store elements of the same type, structures can store heterogeneous data.

```c
struct Student {
    int roll;
    char name[20];
    float marks;
};
```

---

## Declaring and Initializing Structures

```c
struct Student s1 = {1, "Amit", 92.5};

printf("%d\n", s1.roll);
printf("%s\n", s1.name);
printf("%.1f\n", s1.marks);
```

Output

```
1
Amit
92.5
```

---

## Accessing Structure Members

Use the **dot (`.`)** operator for structure variables.

```c
struct Student s;

s.roll = 10;
printf("%d", s.roll);
```

---

## Structure Pointer

Use the **arrow (`->`)** operator with pointers.

```c
struct Student s = {1, "Amit", 90};

struct Student *ptr = &s;

printf("%s", ptr->name);
```

`ptr->name` is equivalent to `(*ptr).name`.

---

## Array of Structures

Each array element is a complete structure.

```c
struct Student s[2] = {
    {1, "Amit", 90},
    {2, "Rahul", 95}
};

printf("%s", s[1].name);
```

Output

```
Rahul
```

---

## Nested Structures

A structure can contain another structure.

```c
struct Date {
    int day;
    int month;
    int year;
};

struct Student {
    char name[20];
    struct Date dob;
};

struct Student s = {"Amit", {10, 5, 2002}};

printf("%d", s.dob.year);
```

---

## typedef with Structures

`typedef` removes the need to write `struct` every time.

```c
typedef struct {
    int roll;
    char name[20];
} Student;

Student s1;
```

---

## Self-Referential Structure

Used in linked lists and trees.

```c
struct Node {
    int data;
    struct Node *next;
};
```

A structure cannot contain an object of its own type directly, but it **can contain a pointer** to its own type.

---

## Passing Structures to Functions

```c
struct Student {
    int roll;
};

void print(struct Student s)
{
    printf("%d", s.roll);
}
```

Structures are passed **by value** unless a pointer is used.

---

## Structure Padding

Compilers may insert unused bytes between members for memory alignment.

```c
struct Demo {
    char c;
    int x;
};
```

Even though the members occupy 5 bytes, `sizeof(struct Demo)` is often **8 bytes** because of padding.

This is one of the most common CDAC C-CAT questions.

---

## Structure vs Union

| Structure | Union |
|-----------|-------|
| Each member has separate memory | All members share the same memory |
| All members can store values simultaneously | Only one member is meaningful at a time |
| Size is approximately sum of member sizes (plus padding) | Size equals the largest member |

---

## Common CDAC C-CAT MCQs

### Q1

Which operator is used to access members using a structure pointer?

A) `.`
B) `->`
C) `&`
D) `::`

**Answer:** B

---

### Q2

```c
struct Point {
    int x;
    int y;
};

struct Point p = {10, 20};

printf("%d", p.y);
```

A) 10

B) 20

C) Garbage

D) Error

**Answer:** B

---

### Q3

Which statement is true?

A) Structures can contain different data types.

B) All members share the same memory.

C) Structures cannot be passed to functions.

D) Structures cannot contain arrays.

**Answer:** A

---

### Q4

Which operator is equivalent to `ptr->roll`?

A) `*ptr.roll`

B) `(*ptr).roll`

C) `ptr.roll`

D) `&ptr.roll`

**Answer:** B

---

### Q5

Which structure is valid?

```c
A)
struct Node{
    int data;
    struct Node next;
};

B)
struct Node{
    int data;
    struct Node *next;
};
```

A) Only A

B) Only B

C) Both

D) Neither

**Answer:** B

---

## CDAC C-CAT Tips

- Remember the difference between `.` and `->`.
- Learn how `typedef struct` simplifies declarations.
- Expect questions on structure padding and `sizeof()`.
- Self-referential structures are heavily used in linked lists and trees.
- Know the difference between structures and unions.

---

## Key Takeaways

- Structures group heterogeneous data into a single user-defined type.
- Use `.` with structure variables and `->` with structure pointers.
- Arrays of structures store multiple records efficiently.
- Structures can be nested and passed to functions.
- Padding may increase the size returned by `sizeof(struct)`.
- `typedef` makes structure declarations cleaner.
- Structures allocate separate memory for each member, unlike unions.
---
title: Strings in C programming
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
description: Unlike languages such as Java, Python, or C++, C does not have a built-in String data type. Instead, a string is represented as an array of characters.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## Strings in C Programming – Complete Guide with MCQs for CDAC C-CAT

If you're preparing for the **CDAC C-CAT exam**, **GATE**, technical interviews, or simply learning **C Programming**, understanding **strings in C** is essential.

Unlike languages such as Java, Python, or C++, **C does not have a built-in String data type**. Instead, a string is represented as an **array of characters terminated by a null character (`'\0'`)**.

Because strings are implemented using arrays and pointers, questions involving strings frequently appear in the **CDAC C-CAT**, interviews, and university exams.


## What is a String in C?

One of the biggest misconceptions among beginners is that **String is a data type in C**.

It is **not.**

Unlike Java,

```java
String name = "Anand";
```

or Python,

```python
name = "Anand"
```

there is **no String data type** in C.

Instead, a string is simply an **array of characters** that ends with a special character called the **null terminator (`'\0'`)**.

For example,

```c
char name[] = "Anand";
```

is equivalent to

```c
char name[] = {
    'A',
    'n',
    'a',
    'n',
    'd',
    '\0'
};
```

Notice the compiler automatically adds the null character.

Without it, C would never know where the string ends.

---

## How Strings are Stored in Memory

Consider

```c
char name[] = "CAT";
```

Memory looks like this:

```
Address

1000      1001      1002      1003

+-----+-----+-----+------+
| 'C' | 'A' | 'T' | '\0' |
+-----+-----+-----+------+
```

Each character occupies **one byte** because

```c
sizeof(char) == 1
```

The null terminator also occupies one byte.

Therefore

```c
char name[] = "CAT";
```

occupies

```
3 characters
+1 null character
------------------
4 bytes
```

Therefore,

```c
sizeof(name)
```

returns

```
4
```

not

```
3
```

This is one of the most frequently asked CDAC C-CAT questions.

---

## Why is the Null Character Important?

Suppose we write

```c
printf("%s", name);
```

How does `printf()` know where to stop?

It simply keeps reading memory until it encounters

```c
'\0'
```

Example

```
+----+----+----+----+
| H  | i  | !  |\0 |
+----+----+----+----+

           ^
           printf stops here
```

If the null character is missing, `printf()` continues reading memory beyond the array, leading to **undefined behavior**.

---

## Strings are Arrays

Consider

```c
char city[] = "Delhi";
```

Internally, this is just an array.

```
Index

0     1     2     3     4     5

+----+----+----+----+----+------+
| D  | e  | l  | h  | i  |\0 |
+----+----+----+----+----+------+
```

So,

```c
city[0]
```

returns

```
'D'
```

while

```c
city[4]
```

returns

```
'i'
```

and

```c
city[5]
```

returns

```
'\0'
```

---

## Every Character is an Integer

People often think characters are special values.

They are not.

Every character is simply an integer represented using the ASCII table.

Example

```c
printf("%d", 'A');
```

Output

```
65
```

Similarly,

```c
printf("%d", 'a');
```

prints

```
97
```

while

```c
printf("%c", 97);
```

prints

```
a
```

Characters and integers are interchangeable because characters are stored using their numeric ASCII values.

---

## Did You Know?

This question appears surprisingly often in interviews.

```c
sizeof('A')
```

Most beginners answer

```
1
```

But in **C**, a character literal has the type **int**.

Therefore

```c
sizeof('A')
```

typically returns

```
4
```

because it is equivalent to

```c
sizeof(int)
```

However,

```c
sizeof(char)
```

always returns

```
1
```

Remember this difference.

| Expression | Typical Result |
|------------|---------------|
| `sizeof(char)` | 1 |
| `sizeof('A')` | 4 |
| `sizeof(int)` | 4 |

> **Note:** This behavior is specific to **C**. In **C++**, `'A'` has type `char`, so `sizeof('A')` is usually `1`.

---

## CDAC C-CAT Tip

Whenever you see a question involving strings, immediately ask yourself:

- Is this an **array** or a **pointer**?
- Does it contain a **null terminator**?
- Is the question about **memory** or **contents**?
- Is it comparing **addresses** or **characters**?

More than half of tricky C-CAT string questions can be solved correctly by answering these four questions first.

---

#### What's Next?

Now that you know **what a string actually is**, the next section explains why the **array name is actually the address of the first character**, how **pointer arithmetic** works, and why **`arr[i]` is exactly the same as `*(arr+i)`**.

These concepts form the foundation for understanding every function in `<string.h>`.

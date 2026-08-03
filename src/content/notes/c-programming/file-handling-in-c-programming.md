---
title: "File Handling in C Programming"
subject: c-programming
relatedCheatsheet: ccat/c-programming-cheat-sheet
topic: c
order: 9
description: File handling lets a C program read from and write to files stored on disk, so data survives after the program ends.
keywords:
    - c programming
    - pointers
    - arrays
lastUpdated: 2026-07-29
usedInExams:
    - ccat
    - gate-cse
---

## File Handling in C Programming – Complete Guide with MCQs for CDAC C-CAT

File handling lets a C program read from and write to files stored on disk, so data survives after the program ends. CDAC C-CAT tests this mostly through **file mode meanings**, the **`FILE *` structure**, and small output-tracing questions around `fopen`, `fscanf`, and `EOF`.

This guide covers everything you need for the exam and technical interviews.

---

## The FILE Pointer

Every file operation in C goes through a pointer of type `FILE *`, declared in `stdio.h`. It stores the current position and status of an open file — not the file's actual data.

```c
FILE *fp;
fp = fopen("data.txt", "r");
```

---

## Opening a File — fopen()

```c
FILE *fp = fopen("data.txt", "w");

if (fp == NULL)
{
    printf("File could not be opened");
    return 1;
}
```

`fopen()` returns `NULL` if the file cannot be opened — always check this before using `fp`.

---

## File Modes

| Mode | Meaning |
|---|---|
| `"r"` | Read only. File must exist. |
| `"w"` | Write only. Creates a new file, or truncates (erases) an existing one. |
| `"a"` | Append. Creates the file if it doesn't exist; writes are added at the end. |
| `"r+"` | Read and write. File must exist. |
| `"w+"` | Read and write. Creates new, or truncates existing. |
| `"a+"` | Read and append. Creates if needed; writing always goes to the end. |
| `"rb"`, `"wb"`, `"ab"` | Same as above, in binary mode. |

The most-tested distinction: `"w"` **erases** existing content, while `"a"` **preserves** it and only adds to the end.

---

## Writing to a File — fprintf()

```c
FILE *fp = fopen("data.txt", "w");

fprintf(fp, "Roll No: %d, Name: %s", 101, "Amit");

fclose(fp);
```

`fprintf` works exactly like `printf`, except its first argument is a file pointer instead of writing to the console.

---

## Reading from a File — fscanf()

```c
FILE *fp = fopen("data.txt", "r");
int roll;
char name[20];

fscanf(fp, "Roll No: %d, Name: %s", &roll, name);

printf("%d %s", roll, name);

fclose(fp);
```

`fscanf` returns the number of items successfully read, or `EOF` if it fails before reading anything — this return value is commonly used to control read loops.

---

## Character I/O — fputc() and fgetc()

```c
FILE *fp = fopen("data.txt", "w");
fputc('A', fp);
fclose(fp);

fp = fopen("data.txt", "r");
char ch = fgetc(fp);
printf("%c", ch);
fclose(fp);
```

Output

```
A
```

---

## Reading Until EOF

```c
FILE *fp = fopen("data.txt", "r");
char ch;

while ((ch = fgetc(fp)) != EOF)
    printf("%c", ch);

fclose(fp);
```

`EOF` (End Of File) is a special integer constant (typically `-1`) returned when there's no more data to read — it is **not** a character stored in the file itself.

---

## Line I/O — fgets() and fputs()

```c
FILE *fp = fopen("data.txt", "w");
fputs("Hello, CDAC!", fp);
fclose(fp);

fp = fopen("data.txt", "r");
char buffer[50];
fgets(buffer, 50, fp);
printf("%s", buffer);
fclose(fp);
```

Output

```
Hello, CDAC!
```

`fgets()` stops reading at a newline, at EOF, or after `n - 1` characters — whichever comes first — and null-terminates the buffer automatically.

---

## Binary File I/O — fread() and fwrite()

```c
struct Student
{
    int roll;
    char name[20];
};

struct Student s1 = {101, "Amit"};

FILE *fp = fopen("student.dat", "wb");
fwrite(&s1, sizeof(struct Student), 1, fp);
fclose(fp);

struct Student s2;
fp = fopen("student.dat", "rb");
fread(&s2, sizeof(struct Student), 1, fp);
fclose(fp);

printf("%d %s", s2.roll, s2.name);
```

Output

```
101 Amit
```

`fwrite`/`fread` copy raw bytes directly — useful for structures, and far faster than formatted text I/O, but the resulting file isn't human-readable.

---

## Closing a File — fclose()

```c
fclose(fp);
```

Flushes any buffered data to disk and releases the file handle. Forgetting to close files can lose buffered writes and eventually exhaust the OS's limit on open file handles.

---

## File Positioning — fseek(), ftell(), rewind()

```c
FILE *fp = fopen("data.txt", "r");

fseek(fp, 0, SEEK_END);
long size = ftell(fp);

rewind(fp);

printf("%ld", size);
fclose(fp);
```

- `fseek(fp, offset, whence)` moves the read/write position.
- `ftell(fp)` returns the current position (useful for finding file size, as above).
- `rewind(fp)` resets the position back to the start of the file.

`whence` can be `SEEK_SET` (from start), `SEEK_CUR` (from current position), or `SEEK_END` (from end).

---

## Common Mistakes

#### Mistake 1

```c
FILE *fp = fopen("existing.txt", "w");
```

Assuming `"w"` preserves existing content. Wrong — `"w"` truncates the file to zero length immediately on opening.

---

#### Mistake 2

```c
FILE *fp = fopen("data.txt", "r");
fscanf(fp, "%d", &x);
```

Not checking if `fp == NULL` first. If the file doesn't exist, `fopen` returns `NULL`, and using `fp` afterward causes undefined behavior.

---

#### Mistake 3

```c
FILE *fp = fopen("data.txt", "r");
while (!feof(fp))
{
    fscanf(fp, "%d", &x);
    printf("%d", x);
}
```

Using `feof()` to control a read loop typically processes the last value twice, because `feof()` only becomes true **after** a failed read attempt, not before it. The correct pattern checks `fscanf`'s own return value instead.

---

## Frequently Asked Interview Questions

#### What does fopen() return if the file cannot be opened?

`NULL`.

---

#### What is the difference between "w" and "a" mode?

`"w"` erases existing content and starts fresh; `"a"` keeps existing content and adds new data only at the end.

---

#### What does fread()/fwrite() operate on, that fprintf()/fscanf() don't?

Raw binary data (byte-for-byte), rather than human-readable formatted text.

---

#### Why must a file be closed with fclose()?

To flush buffered output to disk and release the OS file handle back for reuse.

---

## CDAC C-CAT MCQs

#### MCQ 1

```c
FILE *fp = fopen("test.txt", "r");

if (fp == NULL)
    printf("A");
else
    printf("B");
```

Assuming `test.txt` does not exist, what is printed?

A. A

B. B

C. Error

D. Nothing

**Answer:** **A**

---

#### MCQ 2

Which mode opens a file for writing, erasing any existing content?

A. "a"

B. "r"

C. "w"

D. "r+"

**Answer:** **C**

---

#### MCQ 3

Which function reads a single character from a file?

A. fgets()

B. fgetc()

C. fread()

D. fscanf()

**Answer:** **B**

---

#### MCQ 4

What does `EOF` typically represent?

A. A character stored at the end of every file

B. An integer constant signaling no more data to read

C. A function that closes a file

D. The size of a file in bytes

**Answer:** **B**

---

#### MCQ 5

```c
FILE *fp = fopen("data.txt", "a");

fprintf(fp, "New line");

fclose(fp);
```

What happens to the file's existing content?

A. It is erased

B. It is preserved, and "New line" is added at the end

C. It is preserved, and "New line" overwrites the start

D. Compilation error

**Answer:** **B**

---

#### MCQ 6

Which function moves the file position indicator to a specific location?

A. ftell()

B. rewind()

C. fseek()

D. fclose()

**Answer:** **C**

---

## Key Takeaways

- All file operations use a `FILE *` handle obtained from `fopen()`.
- `"w"` truncates existing content; `"a"` preserves it and appends.
- Always check `fopen()`'s return value against `NULL` before use.
- `fread`/`fwrite` handle raw binary data; `fscanf`/`fprintf` handle formatted text.
- `EOF` is returned by read functions on failure/end of data — don't control loops with `feof()` alone.
- Always close files with `fclose()` to flush buffers and free the handle.

---

#### Next Topics

To strengthen your C programming for **CDAC C-CAT**, continue with:

- Command Line Arguments in C
- Dynamic Memory Allocation in C
- Structures and Unions in C
- Preprocessor Directives in C
- Strings in C Programming

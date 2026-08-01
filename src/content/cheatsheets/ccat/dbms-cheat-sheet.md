---
title: "DBMS Cheat Sheet"
exam: "ccat"
subject: "dbms"
topic: "dbms-basics"
description: "ER model, keys, normalization, SQL command categories, transactions, indexing, and joins — the complete DBMS reference for CDAC C-CAT."
keywords: ["dbms", "sql", "normalization", "er model", "transactions"]
lastVerified: 2026-07-28
---
## ER model — core building blocks

| Term | Definition |
|---|---|
| Entity | A real-world object with independent existence (e.g. Student) |
| Attribute | A property of an entity (e.g. name, roll number) |
| Relationship | An association between two or more entities |
| Cardinality | How many instances of one entity relate to another (1:1, 1:N, M:N) |

### Attribute types

| Type | Example |
|---|---|
| Simple | Age — cannot be divided further |
| Composite | Name → First Name + Last Name |
| Derived | Age, derived from Date of Birth |
| Multi-valued | Phone numbers — a person can have more than one |

```pyq
Q: An attribute that can be calculated from other attributes (like Age from Date of Birth) is called:
A) Composite
B) Multi-valued
*C) Derived
D) Simple
Explain: A derived attribute is computed from another stored attribute rather than stored directly itself — Age from Date of Birth is the textbook example.
```

## Keys — quick reference

| Key type | Definition |
|---|---|
| Primary Key | Uniquely identifies a row, cannot be NULL |
| Candidate Key | Any column set that could validly be a primary key |
| Foreign Key | References a primary key in another table |
| Composite Key | A primary key made of 2 or more columns together |
| Super Key | Any set of columns that uniquely identifies a row (candidate keys are the minimal super keys) |
| Alternate Key | A candidate key that was NOT chosen as the primary key |

```pyq
Q: What is the relationship between a Super Key and a Candidate Key?
A) They are always the same
*B) Every candidate key is a super key, but a super key may have extra unnecessary attributes
C) A candidate key can have more attributes than a super key
D) There is no relationship
Explain: A candidate key is a MINIMAL super key — one with no redundant attributes. Every candidate key qualifies as a super key, but not every super key is minimal enough to be a candidate key.
```

## Normalization — the levels that get asked most

| Level | Requirement |
|---|---|
| 1NF | Atomic values only, no repeating groups |
| 2NF | 1NF + no partial dependency of a non-key attribute on part of a composite key |
| 3NF | 2NF + no transitive dependency (non-key attribute depending on another non-key attribute) |
| BCNF | Every determinant (left side of a functional dependency) must be a candidate key |

```text
Partial dependency example (violates 2NF):
  Table: (StudentID, CourseID, StudentName)
  StudentName depends only on StudentID, not on the full (StudentID, CourseID) key.

Transitive dependency example (violates 3NF):
  Table: (StudentID, DeptID, DeptName)
  DeptName depends on DeptID, which depends on StudentID — an indirect chain.
```

```pyq
Q: A table is in 2NF but has a non-key attribute that depends on another non-key attribute. What normal form does it violate?
A) 1NF
B) 2NF
*C) 3NF
D) It's already fully normalized
Explain: A non-key attribute depending on another non-key attribute is exactly the definition of a transitive dependency — which 3NF specifically eliminates.
```

## SQL command categories

| Category | Full form | Commands | Purpose |
|---|---|---|---|
| DDL | Data Definition Language | CREATE, ALTER, DROP, TRUNCATE | Defines/modifies structure |
| DML | Data Manipulation Language | INSERT, UPDATE, DELETE | Modifies row data |
| DQL | Data Query Language | SELECT | Retrieves data |
| DCL | Data Control Language | GRANT, REVOKE | Manages permissions |
| TCL | Transaction Control Language | COMMIT, ROLLBACK, SAVEPOINT | Manages transactions |

DCL vs DML is the classic mix-up: GRANT/REVOKE control *who can access data*, not the data itself — that's DCL, not DML.

```pyq
Q: GRANT and REVOKE belong to which SQL command category?
A) DDL
B) DML
*C) DCL
D) TCL
Explain: GRANT and REVOKE manage user permissions and access rights — that's Data Control Language (DCL), not data manipulation (DML).
```

## ACID properties

| Property | Meaning |
|---|---|
| Atomicity | A transaction is all-or-nothing — no partial execution survives |
| Consistency | The database moves between valid states only, never a broken one |
| Isolation | Concurrent transactions don't interfere with each other's intermediate state |
| Durability | Once committed, changes survive even a system crash |

## Transactions & concurrency control

### Transaction states

```text
Active → Partially Committed → Committed
   ↓            ↓
 Failed  →   Aborted
```

### Concurrency control techniques

| Technique | Approach |
|---|---|
| Lock-based (2PL) | Growing phase acquires locks, shrinking phase releases them — never both at once |
| Timestamp ordering | Transactions ordered by timestamp; conflicting operations are rejected/rolled back |
| Optimistic concurrency | Assume no conflict, validate at commit time, rollback only if a conflict is found |

**Two-Phase Locking (2PL)**: once a transaction releases any lock, it cannot acquire any new locks — this guarantees serializability and is the single most commonly tested concurrency concept.

```pyq
Q: In Two-Phase Locking (2PL), what happens once a transaction releases its first lock?
A) It can still acquire new locks freely
*B) It cannot acquire any new locks — it has entered the shrinking phase
C) The transaction is automatically rolled back
D) All other transactions are blocked
Explain: 2PL has two phases — growing (acquire only) and shrinking (release only). The moment a transaction releases even one lock, it has entered the shrinking phase and cannot acquire further locks.
```

## Indexing

| Index type | Structure | Best for |
|---|---|---|
| B-Tree | Balanced tree, sorted | Range queries, equality searches |
| B+ Tree | B-Tree variant, all data at leaf level, leaves linked | Most common in real DBMS — efficient range scans |
| Hash Index | Hash function maps key → bucket | Fast equality lookups, poor for range queries |

```text
Clustered Index  → determines the PHYSICAL order of table rows (only 1 per table)
Non-clustered Index → a separate structure pointing to row locations (many allowed per table)
```

```pyq
Q: How many clustered indexes can a single table have?
A) As many as needed
*B) Only 1
C) Exactly 2
D) 0 — clustered indexes don't exist in DBMS
Explain: A clustered index determines the physical storage order of table rows — since a table can only be physically sorted one way, only one clustered index is possible per table. Non-clustered indexes have no such limit.
```

## File organization

| Method | How records are stored |
|---|---|
| Heap (unordered) | No particular order — fast inserts, slow search |
| Sequential | Sorted by a key field — fast range access, slow inserts |
| Hash | Records placed by a hash function on the key — fast equality lookup |
| Clustered | Related records from different tables stored physically together |

## Joins — the ones to have cold

| Join type | Returns |
|---|---|
| INNER JOIN | Only matching rows from both tables |
| LEFT JOIN | All rows from the left table, matched rows from the right (NULL where no match) |
| RIGHT JOIN | All rows from the right table, matched rows from the left (NULL where no match) |
| FULL OUTER JOIN | All rows from both tables, matched where possible |
| SELF JOIN | A table joined with itself, using aliases |

```sql
SELECT students.name, courses.title
FROM students
INNER JOIN enrollments ON students.id = enrollments.student_id
INNER JOIN courses ON enrollments.course_id = courses.id
WHERE courses.semester = 'Spring 2027';
```


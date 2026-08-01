---
title: "Data Structures Cheat Sheet"
exam: "ccat"
subject: "data-structures"
topic: "dsa-overview"
description: "Arrays, linked lists, stacks, queues, trees, heaps, graphs, and hashing — complexity tables, core code, and previous-year-style questions for CDAC C-CAT."
keywords: ["data structures", "linked list", "binary tree", "graph algorithms", "hashing"]
lastVerified: 2026-07-28
---
## Time & space complexity — Big-O quick reference

| Data Structure | Access | Search | Insert | Delete | Space |
|---|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1)* | O(1)* | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| Hash Table | O(1) | O(1) | O(1) | O(1) | O(n) |
| BST (avg) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| BST (worst) | O(n) | O(n) | O(n) | O(n) | O(n) |
| AVL / Red-Black | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Heap | O(n) | O(n) | O(log n) | O(log n) | O(n) |

\* O(1) insert/delete at head only, for a singly linked list. Tail insert is O(1) only with a tail pointer.

## Arrays

### Key properties

| Property | Value |
|---|---|
| Access | O(1) — random access by index |
| Search (linear) | O(n) |
| Search (binary) | O(log n) — only on a sorted array |
| Insert at end | O(1) amortized (dynamic array) |
| Insert at index i | O(n) — shift elements right |
| Delete at index i | O(n) — shift elements left |
| Space | O(n) contiguous |

### Sorting algorithms

| Algorithm | Best | Avg | Worst | Space | Stable |
|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |

Stable sort = equal elements keep their original relative order. Merge and Insertion sort are stable.

### Binary search — must know

```c
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;  // avoid overflow!
    if (arr[mid] == key) return mid;
    else if (arr[mid] < key) lo = mid + 1;
    else hi = mid - 1;
}
return -1;  // not found
```

```pyq
Q: Which sorting algorithm has O(n) best case and O(n²) worst case?
A) Merge sort
*B) Insertion sort
C) Heap sort
D) Selection sort
Explain: Insertion sort is O(n) when the array is already sorted (no swaps needed), and O(n²) worst case.
```

```pyq
Q: In binary search, why use `mid = lo + (hi-lo)/2` instead of `(lo+hi)/2`?
A) Faster
*B) Avoids integer overflow
C) More accurate
D) No difference
Explain: If lo and hi are both large ints, lo+hi can overflow. lo+(hi-lo)/2 is safe and mathematically equivalent.
```

## Linked lists

### Node structure

```c
// Singly linked list node
struct Node {
    int data;
    struct Node *next;
};

// Doubly linked list node
struct DNode {
    int data;
    struct DNode *prev, *next;
};
```

### Types comparison

| Type | Forward | Backward | Space |
|---|---|---|---|
| Singly | Yes | No | 1 ptr/node |
| Doubly | Yes | Yes | 2 ptr/node |
| Circular | Yes | No* | 1 ptr/node |
| Circular Doubly | Yes | Yes | 2 ptr/node |

### Insert at head — O(1)

```c
struct Node* insertHead(struct Node* head, int d) {
    struct Node* n = malloc(sizeof(struct Node));
    n->data = d;
    n->next = head;
    return n;  // new head
}
```

### Floyd's cycle detection

```c
// Slow & fast pointer (Tortoise & Hare)
struct Node *slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return 1;  // cycle found
}
return 0;  // no cycle
```

### Reverse a linked list — O(n)

```c
struct Node *prev = NULL, *curr = head, *nxt;
while (curr) {
    nxt = curr->next;
    curr->next = prev;
    prev = curr;
    curr = nxt;
}
return prev;  // new head
```

### Find middle of list — O(n)

```c
// When fast reaches the end, slow is at the middle
struct Node *slow = head, *fast = head;
while (fast->next && fast->next->next) {
    slow = slow->next;
    fast = fast->next->next;
}
// slow = middle node
```

```pyq
Q: Time complexity of inserting at the end of a singly linked list (no tail pointer)?
A) O(1)
B) O(log n)
*C) O(n)
D) O(n²)
Explain: Without a tail pointer, you must traverse the entire list to find the last node — O(n).
```

```pyq
Q: In Floyd's cycle detection, when does `slow == fast`?
A) When the list is empty
*B) When there is a cycle
C) At the middle
D) Never
Explain: Fast moves 2 steps, slow moves 1. If there is a cycle, fast "laps" slow and they meet inside the cycle.
```

## Stacks — LIFO

### Stack operations

| Operation | Description | Array impl | Linked List impl |
|---|---|---|---|
| push(x) | Add to top | O(1) | O(1) |
| pop() | Remove from top | O(1) | O(1) |
| peek() | View top (no remove) | O(1) | O(1) |
| isEmpty() | Check if empty | O(1) | O(1) |

### Key applications

| Application | How the stack is used |
|---|---|
| Balanced parentheses | Push on open, pop on close |
| Infix → Postfix | Operator stack, precedence rules |
| Postfix evaluation | Operand stack |
| Function call stack | OS stores return addresses |
| Undo / Redo | Two stacks |
| DFS (iterative) | Node stack |
| Expression parsing | Operator + operand stacks |

### Array-based stack in C

```c
#define MAX 100
int stack[MAX], top = -1;

void push(int x) {
    if (top == MAX - 1) { printf("Overflow"); return; }
    stack[++top] = x;
}

int pop() {
    if (top == -1) { printf("Underflow"); return -1; }
    return stack[top--];
}

int peek() { return stack[top]; }
```

### Infix → Postfix rules

```text
Precedence: ^ > * / > + -
1. Operand           → send to output directly
2. (                 → push
3. )                 → pop until (
4. Operator          → pop while stack top has higher/equal precedence, then push
5. End of expression  → pop all remaining operators

Example: A+B*C   → ABC*+
Example: A*(B+C) → ABC+*
```

```pyq
Q: What is the postfix form of the expression: (A+B)*(C-D)?
*A) AB+CD-*
B) AB+*CD
C) A+B*C-D
D) ABCD+-*
Explain: Evaluate inner brackets first: (A+B)→AB+, (C-D)→CD-, then multiply: AB+CD-*
```

```pyq
Q: Evaluate postfix: `5 3 2 * +` = ?
A) 16
*B) 11
C) 25
D) 30
Explain: Read left to right: push 5, push 3, push 2. * → pop 3,2 → 6, push 6. + → pop 5,6 → 11.
```

## Queues — FIFO

### Queue operations

| Operation | Description | Complexity |
|---|---|---|
| enqueue(x) | Add to rear | O(1) |
| dequeue() | Remove from front | O(1) |
| front() | View front element | O(1) |
| rear() | View rear element | O(1) |
| isEmpty() | Check empty | O(1) |

### Types of queues

| Type | Description |
|---|---|
| Simple Queue | FIFO, linear array |
| Circular Queue | Rear wraps around — no wasted space |
| Deque | Insert/delete at both ends (double-ended) |
| Priority Queue | Highest priority dequeued first |
| Input-restricted Deque | Insert only at rear, delete at both ends |
| Output-restricted Deque | Insert at both ends, delete only at front |

### Circular queue (fixes wasted space)

```c
#define MAX 5
int q[MAX], front = -1, rear = -1;

void enqueue(int x) {
    if ((rear + 1) % MAX == front) { printf("Full"); return; }
    if (front == -1) front = 0;
    rear = (rear + 1) % MAX;
    q[rear] = x;
}

int dequeue() {
    if (front == -1) return -1;  // empty
    int x = q[front];
    if (front == rear) front = rear = -1;
    else front = (front + 1) % MAX;
    return x;
}
```

### Applications

| Application | Queue type |
|---|---|
| BFS traversal | Simple queue |
| OS scheduling | Priority queue |
| Print spooler | Simple queue |
| Sliding window max | Deque |
| Cache (LRU) | Deque / linked list |

```pyq
Q: In a circular queue of size 5, if front=2 and rear=4, how many elements are present?
A) 2
*B) 3
C) 4
D) 5
Explain: Elements = (rear − front + 1) = 4 − 2 + 1 = 3. Elements sit at positions 2, 3, 4.
```

## Trees — binary trees & BST

### Key tree terminology

| Term | Definition |
|---|---|
| Height | Longest path from root to leaf |
| Depth of node | Distance from the root |
| Degree | Number of children |
| Full Binary Tree | Every node has 0 or 2 children |
| Complete Binary Tree | All levels full except last (left-filled) |
| Perfect Binary Tree | All leaves at the same level |
| Balanced Binary Tree | \|height(L) − height(R)\| ≤ 1 for all nodes |

### BST properties & operations

```c
// BST property: left < root < right
Node* search(Node* r, int k) {
    if (!r || r->data == k) return r;
    if (k < r->data) return search(r->left, k);
    return search(r->right, k);
}

// Inorder of a BST = sorted ascending order
// BST insert: like search, add at the NULL spot found
// BST delete has 3 cases:
//   1. Leaf              → just remove
//   2. One child          → replace node with its child
//   3. Two children        → replace with inorder successor
//                            (smallest value in the right subtree)
```

### Tree traversals

```c
// Inorder (Left → Root → Right) → sorted order for a BST
void inorder(Node *r) {
    if (!r) return;
    inorder(r->left);
    printf("%d ", r->data);
    inorder(r->right);
}

// Preorder (Root → Left → Right)  → used to copy a tree
// Postorder (Left → Right → Root) → used to delete a tree
// Level order                     → uses a queue (BFS)
```

### Important formulas

| Property | Formula |
|---|---|
| Max nodes at level i | 2^i |
| Max nodes in height-h binary tree | 2^(h+1) − 1 |
| Min height for n nodes | floor(log₂ n) |
| Leaf nodes in a full binary tree | internal nodes + 1 |
| n₀ = n₂ + 1 | leaf count = (degree-2 node count) + 1 |

```pyq
Q: Inorder traversal of a BST gives nodes in which order?
A) Random
B) Descending
*C) Ascending (sorted)
D) Level order
Explain: BST property: left < root < right. Inorder (L→Root→R) always produces ascending sorted output.
```

```pyq
Q: A complete binary tree with 15 nodes has height:
A) 2
*B) 3
C) 4
D) 5
Explain: Height = floor(log₂(15)) = floor(3.9) = 3. A perfect binary tree of height 3 has 2⁴−1 = 15 nodes.
```

```pyq
Q: How many leaf nodes does a full binary tree with 7 internal nodes have?
A) 6
B) 7
*C) 8
D) 9
Explain: For a full binary tree: leaf nodes = internal nodes + 1 = 7 + 1 = 8.
```

## Heaps & priority queues

### Heap properties

| Property | Max Heap | Min Heap |
|---|---|---|
| Root value | Largest element | Smallest element |
| Parent rule | parent ≥ children | parent ≤ children |
| Get min/max | O(1) | O(1) |
| Insert | O(log n) | O(log n) |
| Delete root | O(log n) | O(log n) |
| Build heap | O(n) | O(n) |
| Heap sort | O(n log n) | O(n log n) |

### Heap sort steps

```text
Step 1: Build a max heap from the array — O(n)
        heapify from the last internal node (index n/2 - 1) down to the root

Step 2: Extract the max repeatedly — O(n log n)
        swap root with the last element
        reduce heap size by 1
        heapify the root

Result: ascending sorted array
Space:  O(1) — in-place
Stable: No
```

### Array representation

```text
For a node at index i (1-based):
  Left child  = 2*i
  Right child = 2*i + 1
  Parent      = i/2

For a node at index i (0-based):
  Left child  = 2*i + 1
  Right child = 2*i + 2
  Parent      = (i-1)/2
```

### Applications

| Application | Heap type |
|---|---|
| Priority queue | Min or max heap |
| Heap sort | Max heap |
| Dijkstra's algorithm | Min heap |
| Prim's algorithm | Min heap |
| K largest elements | Min heap of size k |
| Median of a stream | Max heap + min heap |

```pyq
Q: In a max heap stored as an array (1-based), where is the parent of the element at index 6?
A) 2
*B) 3
C) 4
D) 5
Explain: Parent = i/2 = 6/2 = 3 (integer division).
```

## Graphs

### Representations

| Method | Space | Edge check | Add edge |
|---|---|---|---|
| Adjacency Matrix | O(V²) | O(1) | O(1) |
| Adjacency List | O(V+E) | O(degree) | O(1) |

Use a matrix for dense graphs; a list for sparse graphs.

### DFS — cycle detection, topological sort

```c
bool visited[V] = {false};

void DFS(int u, int adj[][V]) {
    visited[u] = true;
    printf("%d ", u);
    for (int v = 0; v < V; v++)
        if (adj[u][v] && !visited[v])
            DFS(v, adj);
}
```

### BFS — level order, shortest path (unweighted)

```c
void BFS(int src, int adj[][V]) {
    bool visited[V] = {false};
    int queue[V], front = 0, rear = 0;
    visited[src] = true;
    queue[rear++] = src;

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < V; v++)
            if (adj[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
    }
}
```

### Shortest path algorithms

| Algorithm | Works on | Complexity |
|---|---|---|
| BFS | Unweighted graphs | O(V+E) |
| Dijkstra | Non-negative weights | O((V+E) log V) |
| Bellman-Ford | Negative weights | O(V·E) |
| Floyd-Warshall | All pairs | O(V³) |

### Spanning tree algorithms

| Algorithm | Strategy | Complexity |
|---|---|---|
| Prim's | Add the min edge to a growing tree | O(E log V) |
| Kruskal's | Sort edges, then union-find | O(E log E) |

```pyq
Q: BFS on a graph uses which data structure?
A) Stack
*B) Queue
C) Priority queue
D) Array
Explain: BFS uses a queue (FIFO) to process nodes level by level. DFS uses a stack (or the recursion call stack).
```

```pyq
Q: Which algorithm finds the shortest path in a graph with negative weights (no negative cycles)?
A) Dijkstra
B) BFS
*C) Bellman-Ford
D) Prim's
Explain: Dijkstra fails with negative weights. Bellman-Ford handles negative weights and also detects negative cycles.
```

## Hashing

### Hash table operations

| Operation | Average | Worst |
|---|---|---|
| Search | O(1) | O(n) |
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |

Worst case O(n) occurs when all keys hash to the same slot (all collisions).

### Collision resolution

| Method | How it works | Clustering |
|---|---|---|
| Chaining | Linked list at each slot | No clustering |
| Linear probing | h(k)+1, +2, ... (mod m) | Primary clustering |
| Quadratic probing | h(k)+1², +2², ... (mod m) | Secondary clustering |
| Double hashing | h1(k) + i·h2(k) (mod m) | No clustering |

### Hash functions

```text
Division method:
  h(k) = k % m   (m should be prime)

Multiplication method:
  h(k) = floor(m * (k*A mod 1))   where A ≈ 0.618 (golden ratio)

For strings (djb2):
  hash = 5381;
  while (*str) hash = hash*33 ^ *str++;
```

### Load factor & rehashing

```text
Load factor α = n / m
  n = number of elements
  m = number of slots

When α > 0.7 (typical threshold):
  → rehash into a larger table (2x)
  → re-insert all elements

Chaining:       works even when α > 1
Open addressing: α must stay < 1
```

```pyq
Q: In open addressing with linear probing, what is the main problem?
A) Extra memory
*B) Primary clustering
C) Secondary clustering
D) High deletion cost
Explain: Linear probing creates primary clustering — long chains of consecutive occupied slots that slow down search and insert.
```

## CDAC C-CAT — top DS exam traps

| Trap | Rule |
|---|---|
| Stack underflow | Popping from an empty stack. A `top == -1` check is mandatory. |
| Queue full (circular) | `(rear+1)%MAX == front` means full, NOT `rear == MAX-1`. |
| BST worst case | Inserting sorted data into a BST gives O(n) height (degenerate/skewed tree). |
| BFS vs DFS | BFS → queue → shortest path (unweighted). DFS → stack/recursion → cycle detection, topological sort. |
| Heap is not a BST | A heap only guarantees parent > children (max heap). BST guarantees left < root < right. |
| Inorder of BST | Always gives sorted (ascending) output. Preorder = copy tree. Postorder = delete tree. |
| n₀ = n₂ + 1 | In any binary tree: leaf nodes = nodes with 2 children + 1. Very common formula question. |
| Stable vs unstable sort | Merge, Bubble, Insertion = stable. Quick, Heap, Selection = NOT stable. |
| Quick sort worst case | O(n²) when the pivot is always the min or max (e.g. an already-sorted array). Avg is O(n log n). |
| Merge sort space | O(n) extra space (needs a temp array). Heap sort is O(1) in-place. |
| Hash chaining α > 1 | Chaining allows a load factor above 1. Open addressing requires α < 1. |
| Floyd cycle — meeting point | Slow and fast pointers meet INSIDE the cycle, not necessarily at its start. |
| Height vs depth | Height = edges from a node to its deepest leaf. Depth = edges from the root to that node. |
| Complete BT height | floor(log₂ n) for n nodes. |
| Dijkstra + negative edges | Dijkstra FAILS with negative weight edges. Use Bellman-Ford instead. |
| Graph adjacency matrix | Space is always O(V²) regardless of edge count — bad for sparse graphs. |

*PYQs are indicative of exam style, not guaranteed exact repeats.*

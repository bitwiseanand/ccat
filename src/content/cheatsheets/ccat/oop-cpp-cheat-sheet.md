---
title: "OOP & C++ Cheat Sheet"
exam: "ccat"
subject: "cpp-oop"
topic: "oop-concepts"
description: "Classes, constructors, inheritance, polymorphism, operator overloading, templates, and exception handling — C++/OOP for CDAC C-CAT."
keywords: ["oop", "c++", "inheritance", "polymorphism", "stl"]
lastVerified: 2026-07-28
---

## The four OOP pillars — quick reference

| Pillar | Definition | C++ mechanism |
|---|---|---|
| Encapsulation | Bundling data and methods together, hiding internal state | Access specifiers (`private`, `protected`, `public`) |
| Abstraction | Showing only essential features, hiding implementation | Abstract classes, pure virtual functions |
| Inheritance | A class acquiring properties/behavior of another class | `class Derived : access-specifier Base` |
| Polymorphism | One interface, many implementations | Function overloading, operator overloading, virtual functions |

## Classes & access specifiers

```cpp
class Student {
private:
    int rollNo;          // accessible only inside the class
protected:
    string name;          // accessible inside class + derived classes
public:
    int marks;            // accessible from anywhere
};
```

| Specifier | Same class | Derived class | Outside class |
|---|---|---|---|
| `private` | Yes | No | No |
| `protected` | Yes | Yes | No |
| `public` | Yes | Yes | Yes |

By default, `class` members are `private`; `struct` members are `public` — this default-access difference is a common trap question.

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">By default, members of a <code>struct</code> in C++ are:</p>
  <ul class="pyq-options">
    <li>A) private</li>
    <li class="correct">B) public</li>
    <li>C) protected</li>
    <li>D) Depends on compiler</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> C++ struct members default to public; class members default to private. This is the only real functional difference between struct and class in C++.</p>
</div>

## Constructors & destructors

| Type | When it runs | Notes |
|---|---|---|
| Default constructor | No arguments given | Auto-generated if you define no constructor at all |
| Parameterized constructor | Called with arguments | Lets you initialize members at creation |
| Copy constructor | Object copied from another of the same type | Signature: `ClassName(const ClassName &obj)` |
| Destructor | Object goes out of scope / `delete` called | One per class, no arguments, no return type, name is `~ClassName()` |

```cpp
class Point {
    int x, y;
public:
    Point() : x(0), y(0) {}                  // default constructor, initializer list
    Point(int a, int b) : x(a), y(b) {}       // parameterized constructor
    Point(const Point &p) : x(p.x), y(p.y) {} // copy constructor
    ~Point() {}                               // destructor
};
```

### Construction/destruction order in inheritance

```text
Construction order: Base class constructor  → Derived class constructor
Destruction order:  Derived class destructor → Base class destructor

(Destructor order is always the reverse of constructor order.)
```

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">In a derived class object, which constructor executes first?</p>
  <ul class="pyq-options">
    <li class="correct">A) Base class constructor</li>
    <li>B) Derived class constructor</li>
    <li>C) Both run simultaneously</li>
    <li>D) Order is undefined</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> The base class must be fully constructed before the derived class can build on top of it. Destructors then run in the reverse order.</p>
</div>

## The `this` pointer

```cpp
class Box {
    int side;
public:
    Box(int side) {
        this->side = side;  // disambiguates member vs parameter with the same name
    }
    Box& setSide(int s) {
        this->side = s;
        return *this;       // enables method chaining: box.setSide(1).setSide(2);
    }
};
```

`this` is a pointer to the calling object, implicitly passed to every non-static member function.

## Static members

| Property | Behavior |
|---|---|
| Static data member | Shared across ALL objects of the class — one copy total, not one per object |
| Static member function | Can access only static data; has no `this` pointer |
| Declaration | Declared inside the class, defined/initialized outside with `ClassName::` |

```cpp
class Counter {
public:
    static int count;   // declaration
    Counter() { count++; }
};
int Counter::count = 0;  // definition, required outside the class
```

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">If a class has a static data member, how many copies of it exist for 100 objects of that class?</p>
  <ul class="pyq-options">
    <li>A) 100</li>
    <li class="correct">B) 1</li>
    <li>C) 0</li>
    <li>D) Depends on constructor</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> A static member belongs to the class itself, not to any individual object — every object shares the same single copy.</p>
</div>

## Inheritance types

| Type | Structure |
|---|---|
| Single | One base, one derived |
| Multiple | One derived, two or more base classes |
| Multilevel | A → B → C chain |
| Hierarchical | One base, multiple derived classes |
| Hybrid | Combination of the above |

### Effect of inheritance access specifier

| Base member | `public` inheritance | `protected` inheritance | `private` inheritance |
|---|---|---|---|
| public | stays public | becomes protected | becomes private |
| protected | stays protected | stays protected | becomes private |
| private | not accessible | not accessible | not accessible |

### The diamond problem

```text
       A
      / \
     B   C
      \ /
       D

D inherits from both B and C, which both inherit from A.
D ends up with TWO copies of A's members — ambiguous.

Fix: virtual inheritance
   class B : virtual public A {};
   class C : virtual public A {};
   → D now gets only ONE shared copy of A.
```

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">What problem does virtual inheritance solve?</p>
  <ul class="pyq-options">
    <li>A) Slow function calls</li>
    <li class="correct">B) The diamond problem (duplicate base class copies)</li>
    <li>C) Memory leaks</li>
    <li>D) Operator overloading conflicts</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> Without virtual inheritance, a class inheriting from two classes that share a common base ends up with duplicate copies of that base's members. Virtual inheritance ensures only one shared copy exists.</p>
</div>

## Polymorphism — compile-time vs runtime

| Type | Also called | Mechanism | Resolved |
|---|---|---|---|
| Compile-time | Static / early binding | Function overloading, operator overloading | At compile time |
| Runtime | Dynamic / late binding | Virtual functions | At runtime, via the vtable |

### Function overloading

```cpp
void print(int x);
void print(double x);
void print(string x);
// Same name, different parameter list — resolved at compile time
```

### Virtual functions & the vtable

```cpp
class Shape {
public:
    virtual void draw() { cout << "Shape"; }   // virtual — enables runtime polymorphism
};
class Circle : public Shape {
public:
    void draw() override { cout << "Circle"; } // overrides base version
};

Shape* s = new Circle();
s->draw();  // prints "Circle" — decided at RUNTIME via the vtable, not compile time
```

Without `virtual`, `s->draw()` would call `Shape::draw()` based on the pointer's declared type, not the object's actual type — this is the single most commonly tested OOP concept on CCAT.

### Pure virtual functions & abstract classes

```cpp
class Shape {
public:
    virtual void draw() = 0;  // pure virtual — makes Shape an ABSTRACT class
};
// Shape s;        // ERROR — cannot instantiate an abstract class
// Shape* s = new Circle(); // OK — pointer/reference to abstract class is fine
```

A class with at least one pure virtual function cannot be instantiated directly; any derived class MUST override it to become concrete (instantiable).

### Virtual destructors — a critical exam trap

```cpp
class Base {
public:
    virtual ~Base() {}   // MUST be virtual if the class will be used polymorphically
};
class Derived : public Base {
public:
    ~Derived() { /* cleanup */ }
};

Base* b = new Derived();
delete b;  // Without a virtual destructor, only ~Base() runs — Derived's cleanup is SKIPPED (memory/resource leak)
```

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">What happens if you <code>delete</code> a derived class object through a base class pointer, and the base destructor is NOT virtual?</p>
  <ul class="pyq-options">
    <li>A) Compile error</li>
    <li>B) Both destructors run normally</li>
    <li class="correct">C) Only the base class destructor runs — derived cleanup is skipped</li>
    <li>D) Only the derived destructor runs</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> Without a virtual destructor, the compiler resolves the destructor call using the pointer's static (declared) type, not the object's actual type — this causes undefined behavior/resource leaks and is a classic CCAT trap.</p>
</div>

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">A class with a pure virtual function is called a/an ___ class.</p>
  <ul class="pyq-options">
    <li>A) Static</li>
    <li>B) Final</li>
    <li class="correct">C) Abstract</li>
    <li>D) Friend</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> A pure virtual function (declared with <code>= 0</code>) makes the class abstract — it cannot be instantiated and exists to define an interface for derived classes.</p>
</div>

## Operator overloading

```cpp
class Complex {
    int real, imag;
public:
    Complex(int r, int i) : real(r), imag(i) {}
    Complex operator+(const Complex &c) {
        return Complex(real + c.real, imag + c.imag);
    }
};
Complex c3 = c1 + c2;  // calls operator+ automatically
```

### Operators that CANNOT be overloaded

```text
::   (scope resolution)
.    (member access)
.*   (pointer-to-member access)
?:   (ternary/conditional)
sizeof
typeid
```

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">Which of the following operators CANNOT be overloaded in C++?</p>
  <ul class="pyq-options">
    <li>A) +</li>
    <li>B) ==</li>
    <li class="correct">C) ::</li>
    <li>D) []</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> The scope resolution operator (::), member access (.), pointer-to-member (.*), ternary (?:), sizeof, and typeid cannot be overloaded in C++.</p>
</div>

## Friend functions & friend classes

```cpp
class Box {
    int width;
public:
    Box(int w) : width(w) {}
    friend void printWidth(Box b);  // friend function — NOT a member, but has private access
};

void printWidth(Box b) {
    cout << b.width;  // allowed, because printWidth is declared a friend
}
```

A friend function is not a member of the class (no `this` pointer, not inherited, not affected by access specifiers itself) but can access the class's private and protected members.

## Templates — generic programming

```cpp
// Function template
template <typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}
maxVal(3, 7);       // T deduced as int
maxVal(3.5, 2.1);   // T deduced as double

// Class template
template <typename T>
class Stack {
    T arr[100];
    int top = -1;
public:
    void push(T x) { arr[++top] = x; }
    T pop() { return arr[top--]; }
};
Stack<int> intStack;
Stack<string> strStack;
```

Templates enable compile-time generic programming — one code definition, many types, with no runtime overhead (unlike, say, Java generics with type erasure).

## Exception handling

```cpp
try {
    int arr[5];
    int idx = 10;
    if (idx >= 5) throw out_of_range("Index out of bounds");
    arr[idx] = 1;
} catch (const out_of_range &e) {
    cout << "Caught: " << e.what();
} catch (...) {
    cout << "Unknown exception";  // catch-all handler
}
```

| Keyword | Purpose |
|---|---|
| `try` | Wraps code that might throw |
| `throw` | Raises an exception |
| `catch` | Handles a specific exception type |
| `catch(...)` | Catches any exception type (catch-all) |

Multiple `catch` blocks are checked top to bottom — order matters. A `catch(...)` block must come last, or it will swallow every exception before more specific handlers get a chance.

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">In a sequence of catch blocks, what happens if <code>catch(...)</code> is placed FIRST, before specific exception handlers?</p>
  <ul class="pyq-options">
    <li>A) Compile error</li>
    <li class="correct">B) It catches everything, so the later specific catch blocks become unreachable</li>
    <li>C) It is ignored</li>
    <li>D) No difference — order doesn't matter</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> Catch blocks are evaluated in order, and catch(...) matches any exception type — placing it first means no later, more specific catch block will ever execute.</p>
</div>

## Memory management — new/delete

```cpp
int* p = new int(5);      // allocate single int on heap
delete p;                 // deallocate

int* arr = new int[10];   // allocate array on heap
delete[] arr;             // MUST use delete[] for arrays, not delete
```

| Rule | Why it matters |
|---|---|
| Every `new` needs a matching `delete` | Otherwise: memory leak |
| Every `new[]` needs a matching `delete[]` | Using plain `delete` on an array causes undefined behavior |
| `new` throws `bad_alloc` on failure | Unlike C's `malloc`, which returns `NULL` |
| `delete` on a `NULL` pointer | Safe — it's a no-op, unlike dereferencing NULL |

## STL — quick container reference

| Container | Underlying structure | Access | Insert/Delete |
|---|---|---|---|
| `vector` | Dynamic array | O(1) random access | O(1) amortized at end, O(n) elsewhere |
| `list` | Doubly linked list | O(n) | O(1) anywhere (given iterator) |
| `deque` | Double-ended array | O(1) | O(1) at both ends |
| `stack` | Adapter (usually over deque) | Top only | O(1) push/pop |
| `queue` | Adapter (usually over deque) | Front/back only | O(1) push/pop |
| `map` | Red-Black tree (sorted) | O(log n) | O(log n) |
| `unordered_map` | Hash table | O(1) avg | O(1) avg |
| `set` | Red-Black tree (sorted, unique) | O(log n) | O(log n) |

<div class="pyq">
  <p class="pyq-label">PYQ</p>
  <p class="pyq-q">Which STL container guarantees elements are stored in sorted order automatically?</p>
  <ul class="pyq-options">
    <li>A) vector</li>
    <li>B) unordered_map</li>
    <li class="correct">C) map</li>
    <li>D) list</li>
  </ul>
  <p class="pyq-explain"><strong>Why:</strong> std::map is implemented as a self-balancing binary search tree (typically Red-Black), which keeps keys in sorted order automatically. unordered_map uses hashing and gives no ordering guarantee.</p>
</div>


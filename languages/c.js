window.CodeForge.registerLanguage({
  id: 'c',
  name: 'C',
  badge: 'C',
  color: '#64748b',
  category: 'systems',
  fileName: 'main.c',
  monacoLang: 'c',
  pistonLang: 'c',
  tagline: 'The bedrock of operating systems, microcontrollers, kernels, and hardware-level engineering.',
  useCases: ['Embedded', 'OS Kernels', 'IoT / Microcontrollers', 'Compilers'],
  starterPlayground: `#include <stdio.h>

int main(void) {
    printf("CodeForge C Compiler Active!\\n");
    for (int i = 1; i <= 3; i++) {
        printf("  Register Check #%d: OK\\n", i);
    }
    return 0;
}`,

  lessons: [
    {
      id: 'c_l1',
      level: 1,
      title: 'Memory-First Basics, Format Specifiers & printf',
      en: 'C gives you direct control over hardware and memory. Use <stdio.h> with format specifiers (%d for int, %f for float/double, %s for strings, %c for char).',
      ar: 'لغة C بتديك تحكم مباشر في الذاكرة والهاردوير. في الطباعة بـ printf لازم تحدد نوع المتغير بالرموز: %d للرقم الصحيح، %f للعشري، %s للنص، و %c للحرف.',
      points: [
        'Mismatched format specifiers (e.g., %d with a double) cause undefined behavior.',
        'Use sizeof(type) to inspect exact byte sizes in memory.',
        'Every C program starts at int main(void).'
      ],
      code: `#include <stdio.h>

int main(void) {
    int voltage = 12;
    double current = 2.5;
    double power = voltage * current;

    printf("V=%dV | I=%.1fA | Power=%.2fW\\n", voltage, current, power);
    printf("Size of int: %zu bytes\\n", sizeof(int));
    return 0;
}`,
      tipEn: 'Always enable compiler warnings (-Wall -Wextra) when compiling C locally—it catches format and pointer bugs early.',
      tipAr: 'لما تترجم C على جهازك شغّل التحذيرات (-Wall) لأنها بتكشف أخطاء الـ printf والمؤشرات قبل ما البرنامج يشتغل.'
    },
    {
      id: 'c_l2',
      level: 2,
      title: 'Pointers, Addresses (&) & Dereferencing (*)',
      en: 'A pointer stores the memory address of another variable. Using & gets a variable address, and * dereferences the pointer to read or modify the value directly in memory.',
      ar: 'المؤشر (Pointer) بيخزّن عنوان متغير تاني في الذاكرة. الرمز & بيجيب العنوان، والرمز * بيدخل جوه العنوان عشان يقرأ أو يعدل القيمة مباشرة.',
      points: [
        'int *p = &x; stores the address of x inside p.',
        'Pointers allow functions to modify caller variables (pass-by-pointer).',
        'Always initialize pointers to NULL if not assigned immediately.'
      ],
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 99;
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);
    return 0;
}`,
      tipEn: 'Never dereference a NULL or uninitialized pointer—it causes an immediate Segmentation Fault.',
      tipAr: 'أوعى تستخدم * على مؤشر قيمته NULL أو مش متهيأ، لأن ده بيعمل Segmentation Fault فوراً.'
    },
    {
      id: 'c_l3',
      level: 3,
      title: 'Structs & Modular Data Architecture',
      en: 'C does not have classes, so engineers model complex entities using typedef struct combined with functions that take struct pointers.',
      ar: 'لغة C مفيهاش كلاسات، فالمبرمجين بيبنوا الكيانات المركبة باستخدام typedef struct ومعاها دوال بتستقبل مؤشر للـ struct.',
      points: [
        'Use the dot operator (s.field) on values and arrow operator (ptr->field) on pointers.',
        'Pass structs by pointer (const Sensor *s) to avoid copying bytes.',
        'Structs are the foundation of Linux kernel drivers and network packets.'
      ],
      code: `#include <stdio.h>

typedef struct {
    int id;
    double tempC;
} Sensor;

void printSensor(const Sensor *s) {
    printf("Sensor #%d -> %.1f C\\n", s->id, s->tempC);
}

int main(void) {
    Sensor s1 = {101, 36.8};
    printSensor(&s1);
    return 0;
}`,
      tipEn: 'Think of "struct + functions taking struct*" as C-style Object-Oriented design.',
      tipAr: 'فكّر في الـ struct مع دوال بتستقبل مؤشر ليه كأنها النسخة الخفيفة من الـ OOP داخل لغة C.'
    },
    {
      id: 'c_l4',
      level: 4,
      title: 'Domain Track: Dynamic Memory (malloc / free) & Bitwise Ops',
      en: 'Embedded and systems programming rely on manual heap allocation (malloc/calloc/free) and bitwise operators (&, |, ^, <<, >>) to manipulate hardware registers.',
      ar: 'برمجة الأنظمة والـ Embedded بتعتمد على حجز الذاكرة اليدوي بـ malloc وتحريرها بـ free، والعمليات على البتات (Bitwise) للتحكم في مسجلات الهاردوير.',
      points: [
        'Always check if malloc() returned NULL before using allocated memory.',
        'Every malloc() must be paired with exactly one free() to prevent leaks.',
        'Bit masks (flags |= (1 << 2)) toggle individual hardware bits cleanly.'
      ],
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 4;
    int *arr = (int *)malloc(n * sizeof(int));
    if (!arr) return 1;

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    printf("Dynamic arr[3] = %d\\n", arr[3]);

    free(arr);
    arr = NULL;
    return 0;
}`,
      tipEn: 'Set pointers to NULL right after calling free(ptr) to avoid dangling pointer bugs.',
      tipAr: 'خلّي المؤشر يساوي NULL مباشرة بعد free(ptr) عشان تتفادى أخطاء الـ Dangling Pointer.'
    },
    {
      id: 'c_l5',
      level: 5,
      title: 'Portfolio Architecture: Function Pointers & Linked Lists',
      en: 'Senior C developers use function pointers for callbacks/dispatch tables and build dynamic linked structures with deterministic memory footprints.',
      ar: 'مطورين C المحترفين بيستخدموا مؤشرات الدوال (Function Pointers) لعمل Callbacks وجداول توزيع الأوامر، بالإضافة لهياكل البيانات زي Linked Lists.',
      points: [
        'int (*op)(int, int) declares a pointer to any matching function.',
        'Used in qsort(), OS interrupt tables, and plugin architectures.',
        'Zero hidden runtime overhead—100% predictable performance.'
      ],
      code: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int compute(int x, int y, int (*fn)(int, int)) {
    return fn(x, y);
}

int main(void) {
    printf("Add: %d | Mul: %d\\n", compute(6, 7, add), compute(6, 7, mul));
    return 0;
}`,
      tipEn: 'Function pointers are how C implements polymorphism and callbacks without C++ classes.',
      tipAr: 'مؤشرات الدوال هي الطريقة اللي بتحقق بيها C فكرة الـ Callbacks والـ Polymorphism بأقل استهلاك للذاكرة.'
    }
  ],

  exercises: [
    {
      id: 'c_ex1',
      level: 1,
      type: 'code',
      title: 'Find Maximum in an Array',
      promptEn: 'Find the maximum value in {14, 88, 23, 95, 42} and print only: Max: 95',
      promptAr: 'ابحث عن أكبر رقم في المصفوفة {14, 88, 23, 95, 42} واطبع فقط: Max: 95',
      expectedOutput: 'Max: 95',
      starterCode: `#include <stdio.h>

int main(void) {
    int arr[] = {14, 88, 23, 95, 42};
    int n = 5;
    int maxVal = arr[0];
    // Write your loop here

    printf("Max: %d\\n", maxVal);
    return 0;
}`,
      hintEn: 'Loop i from 1 to n - 1 and update maxVal if arr[i] > maxVal.',
      hintAr: 'اعمل حلقة من 1 إلى n-1 وحدّث maxVal لو arr[i] أكبر منه.'
    },
    {
      id: 'c_ex2',
      level: 2,
      type: 'bug',
      title: 'Fix the Pointer Dereference Bug',
      promptEn: 'Fix the bug in doubleValue() so that num becomes 50 and prints: Value: 50',
      promptAr: 'صلّح الخطأ في دالة doubleValue عشان المتغير num يبقى 50 ويطبع: Value: 50',
      expectedOutput: 'Value: 50',
      starterCode: `#include <stdio.h>

void doubleValue(int *p) {
    *p = *p * 2;
}

int main(void) {
    int num = 25;
    doubleValue(num); // Bug: missing address-of operator &
    printf("Value: %d\\n", num);
    return 0;
}`,
      hintEn: 'Pass the memory address of num using &num.',
      hintAr: 'ابعت عنوان المتغير باستخدام &num بدل num.'
    },
    {
      id: 'c_ex3',
      level: 3,
      type: 'trace',
      title: 'Trace Integer Division in C',
      promptEn: 'What does printf("%d", 7 / 2); print in C?',
      promptAr: 'إيه الناتج اللي هيطبعه printf("%d", 7 / 2) في لغة C؟',
      code: `printf("%d\\n", 7 / 2);`,
      options: ['3.5', '3', '4', '0'],
      correctIndex: 1,
      explainEn: 'Dividing two integers performs integer division in C, truncating the decimal portion (7 / 2 = 3).',
      explainAr: 'قسمة رقمين صحيحين في C بتحذف الكسر العشري، فالناتج بيكون 3 مش 3.5.'
    }
  ],

  projects: [
    {
      id: 'c_p1',
      level: 1,
      difficulty: 'Beginner',
      xp: 120,
      title: 'Ohm Law & Circuit Power Analyzer',
      briefEn: 'Build an electrical engineering console tool that calculates Voltage, Current, Resistance, and Power dissipation safely.',
      briefAr: 'ابني أداة هندسية لحساب قانون أوم والقدرة الكهربائية (V, I, R, P) مع التحقق من المقاومة الصفرية.',
      checklist: [
        'Implement V = I * R and P = V * I formulas.',
        'Format values cleanly with 2 decimal places (%.2f).',
        'Flag overload warning if power exceeds 100W.'
      ],
      hints: [
        { en: 'Use double instead of float for higher engineering precision.', ar: 'استخدم double بدل float عشان الدقة الحسابية تكون أعلى.' }
      ],
      starterCode: `#include <stdio.h>

int main(void) {
    double v = 24.0, r = 4.0;
    double i = v / r;
    double p = v * i;
    printf("Current: %.2f A | Power: %.2f W\\n", i, p);
    return 0;
}`
    },
    {
      id: 'c_p2',
      level: 2,
      difficulty: 'Elementary',
      xp: 180,
      title: 'Custom String Utility Library (Pointer Edition)',
      briefEn: 'Implement your own my_strlen(), my_reverse(), and my_toupper() functions using pure pointer arithmetic without <string.h>.',
      briefAr: 'ابني مكتبة نصوص خاصة بيك لحساب الطول وعكس النص وتحويل الحروف باستخدام مؤشرات C مباشرة.',
      checklist: [
        'Walk char *p until the null terminator \\0.',
        'Reverse a string in-place using two pointers (left & right).',
        'Test on multiple strings and verify null termination.'
      ],
      hints: [
        { en: 'A C string ends when *p == \'\\0\'.', ar: 'أي نص في C بينتهي بحرف النهاية \\0.' }
      ],
      starterCode: `#include <stdio.h>

int my_strlen(const char *s) {
    int len = 0;
    while (s[len] != '\\0') len++;
    return len;
}

int main(void) {
    printf("Length: %d\\n", my_strlen("CodeForge"));
    return 0;
}`
    },
    {
      id: 'c_p3',
      level: 3,
      difficulty: 'Intermediate',
      xp: 250,
      title: 'Inventory Database with Structs',
      briefEn: 'Manage warehouse items using an array of structs with search-by-ID, low-stock alerts, and total valuation.',
      briefAr: 'صمم قاعدة بيانات مخزن باستخدام مصفوفة من الـ structs مع البحث بالرقم وتنبيهات نقص المخزون.',
      checklist: [
        'Define struct Item { int id; char name[32]; int qty; double price; }.',
        'Write searchItem() returning a pointer to the found Item or NULL.',
        'Compute total inventory valuation.'
      ],
      hints: [
        { en: 'Return NULL from searchItem() if the ID is not found, and always check for NULL in main().', ar: 'رجّع NULL لو العنصر مش موجود وافحصه بـ if قبل الطباعة.' }
      ],
      starterCode: `#include <stdio.h>

typedef struct { int id; const char *name; int qty; double price; } Item;

int main(void) {
    Item items[2] = {{1, "ESP32", 15, 6.5}, {2, "Sensor", 4, 3.0}};
    double total = 0;
    for (int i = 0; i < 2; i++) total += items[i].qty * items[i].price;
    printf("Inventory Value: $%.2f\\n", total);
    return 0;
}`
    },
    {
      id: 'c_p4',
      level: 4,
      difficulty: 'Advanced',
      xp: 350,
      title: 'Bitwise Embedded Register Simulator',
      briefEn: 'Simulate an 8-bit microcontroller status register supporting SET_BIT, CLEAR_BIT, TOGGLE_BIT, and binary visualization.',
      briefAr: 'اعمل محاكي لمسجل ميكروكونترولر (8-bit Register) يدعم تفعيل ومسح وعكس أي بت وطباعة القيمة بالنظام الثنائي.',
      checklist: [
        'Implement bit macros/functions for SET, CLEAR, and TOGGLE.',
        'Print the 8-bit binary representation from bit 7 down to bit 0.',
        'Decode active flags (LED, MOTOR, ALARM).'
      ],
      hints: [
        { en: 'Use (reg >> i) & 1 inside a loop from i = 7 down to 0 to print binary bits.', ar: 'استخدم (reg >> i) & 1 من 7 إلى 0 عشان تطبع البتات بالثنائي.' }
      ],
      starterCode: `#include <stdio.h>
#include <stdint.h>

void printBits(uint8_t reg) {
    for (int i = 7; i >= 0; i--) printf("%d", (reg >> i) & 1);
    printf("\\n");
}

int main(void) {
    uint8_t reg = 0;
    reg |= (1 << 0); // Enable LED
    reg |= (1 << 3); // Enable Motor
    printf("Register: ");
    printBits(reg);
    return 0;
}`
    },
    {
      id: 'c_p5',
      level: 5,
      difficulty: 'Portfolio',
      xp: 500,
      title: 'Singly Linked List & Dynamic Stack Allocator',
      briefEn: 'Engineer a leak-free Singly Linked List in C with push, pop, traversal, and full heap cleanup—a classic systems interview benchmark.',
      briefAr: 'ابني Linked List ديناميكية كاملة في C بـ malloc و free مع التحرير الكامل للذاكرة بدون أي تسريب.',
      checklist: [
        'Define struct Node { int value; struct Node *next; }.',
        'Implement pushFront() and popFront() with NULL safety.',
        'Write freeList() to release every allocated node cleanly.'
      ],
      hints: [
        { en: 'Save Node *next = curr->next before calling free(curr).', ar: 'احفظ curr->next في متغير مؤقت قبل ما تنادي free(curr).' }
      ],
      starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int val; struct Node *next; } Node;

Node* push(Node *head, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->val = v; n->next = head;
    return n;
}

int main(void) {
    Node *head = NULL;
    head = push(head, 10);
    head = push(head, 20);
    for (Node *c = head; c; c = c->next) printf("%d -> ", c->val);
    printf("NULL\\n");
    return 0;
}`
    }
  ],

  compare: {
    variables: `#include <stdio.h>

int main(void) {
    const char *name = "CodeForge";
    int level = 5;
    double pi = 3.14159;
    printf("%s L%d (%.2f)\\n", name, level, pi);
    return 0;
}`,
    loops: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 3; i++) printf("Step %d\\n", i);
    const char *langs[] = {"C", "C++", "Dart"};
    for (int i = 0; i < 3; i++) printf("-> %s\\n", langs[i]);
}`,
    functions: `#include <stdio.h>

double calculateArea(double w, double h) {
    return w * h;
}
int main(void) { printf("Area: %.1f\\n", calculateArea(5, 4)); }`,
    oop: `#include <stdio.h>

typedef struct { const char *name; } Robot;
void status(const Robot *r) {
    printf("Robot %s online\\n", r->name);
}
int main(void) { Robot bot = {"Atlas"}; status(&bot); }`,
    collections: `#include <stdio.h>

int main(void) {
    int scores[4] = {85, 92, 78, 99};
    printf("Last score: %d\\n", scores[3]);
    return 0;
}`
  }
});

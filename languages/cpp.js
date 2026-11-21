window.CodeForge.registerLanguage({
  id: 'cpp',
  name: 'C++',
  badge: 'C++',
  color: '#0284c7',
  category: 'systems',
  fileName: 'main.cpp',
  monacoLang: 'cpp',
  pistonLang: 'c++',
  tagline: 'High-performance systems language powering Game Engines, Competitive Programming, and Embedded Systems.',
  useCases: ['Game Engines', 'Algorithms', 'High-Performance', 'Systems'],
  starterPlayground: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<string> topics = {"Memory", "STL", "OOP", "Performance"};
    cout << "CodeForge C++ Engine Ready!" << endl;
    for (const auto& t : topics) {
        cout << " - " << t << endl;
    }
    return 0;
}`,

  lessons: [
    {
      id: 'cpp_l1',
      level: 1,
      title: 'Structure, Static Types & I/O Streams',
      en: 'C++ is a statically typed, compiled language. Execution always begins in int main(). Include <iostream> to print with std::cout and read with std::cin.',
      ar: 'لغة C++ مترجمة (Compiled) وصارمة الأنواع، وأي برنامج بيبدأ دايماً من دالة int main(). بتستخدم مكتبة <iostream> للطباعة بـ cout والقراءة بـ cin.',
      points: [
        'Every statement ends with a semicolon (;).',
        'Choose int, double, char, bool, or std::string explicitly.',
        'Prefer "\\n" over std::endl inside heavy loops for faster performance.'
      ],
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string engine = "CodeForge C++";
    int cores = 8;
    double clockGHz = 4.2;

    cout << engine << " | Cores: " << cores << " @ " << clockGHz << "GHz\\n";
    return 0;
}`,
      tipEn: 'Always return 0 from main() to signal successful execution to the OS.',
      tipAr: 'احرص على كتابة return 0; في نهاية main() لتأكيد انتهاء البرنامج بنجاح.'
    },
    {
      id: 'cpp_l2',
      level: 2,
      title: 'Functions, Pass-by-Reference & std::vector',
      en: 'Use std::vector instead of raw C-style arrays for dynamic sizing, and pass large objects by const reference (const vector<int>&) to avoid expensive memory copies.',
      ar: 'استخدم std::vector بدل المصفوفات التقليدية لأن حجمه ديناميكي، وابعت البيانات الكبيرة بالمرجع (&) عشان ما تضيعش وقت الذاكرة في النسخ.',
      points: [
        'Pass by value copies data; pass by reference (&) edits the original directly.',
        'const T& gives zero-copy speed while preventing accidental modification.',
        'Range-based for loops (for (int x : vec)) keep code clean and safe.'
      ],
      code: `#include <iostream>
#include <vector>
using namespace std;

int sumVector(const vector<int>& nums) {
    int total = 0;
    for (int x : nums) total += x;
    return total;
}

int main() {
    vector<int> data = {10, 20, 30, 40};
    data.push_back(50);
    cout << "Sum = " << sumVector(data) << "\\n";
    return 0;
}`,
      tipEn: 'Use vec.at(i) during debugging—it throws out_of_range instead of silently reading garbage memory.',
      tipAr: 'استخدم vec.at(i) أثناء الاختبار لأنها بتنبهك لو خرجت بره حدود المصفوفة بدل ما تقرأ ذاكرة عشوائية.'
    },
    {
      id: 'cpp_l3',
      level: 3,
      title: 'Classes, Constructors & RAII',
      en: 'C++ classes separate public interfaces from private members. Member initializer lists initialize attributes directly with zero extra overhead.',
      ar: 'في C++ بنفصل البيانات الخاصة في private والواجهة العامة في public. استخدام قائمة التهيئة بعد الـ Constructor أسرع وأنضف في الأداء.',
      points: [
        'Always place a semicolon (;) after the closing brace of a class definition!',
        'Mark read-only methods as const (e.g., double area() const).',
        'RAII binds resource lifetimes to object scopes to eliminate memory leaks.'
      ],
      code: `#include <iostream>
using namespace std;

class Rectangle {
private:
    double w, h;
public:
    Rectangle(double width, double height) : w(width), h(height) {}
    double area() const { return w * h; }
};

int main() {
    Rectangle r(6.5, 4.0);
    cout << "Area = " << r.area() << "\\n";
    return 0;
}`,
      tipEn: 'Forgetting the semicolon after a class closing brace "};" is a classic C++ compiler error.',
      tipAr: 'نسيان الفاصلة المنقوطة بعد قوس نهاية الكلاس (};) من أشهر أخطاء C++.'
    },
    {
      id: 'cpp_l4',
      level: 4,
      title: 'Domain Track: STL Algorithms & Pointers / Smart Pointers',
      en: 'Modern C++ combines STL algorithms (<algorithm>) with smart pointers (<memory>) like std::unique_ptr so you get raw C speed with automatic memory safety.',
      ar: 'الـ C++ الحديثة بتجمع بين خوارزميات الـ STL السريعة والمؤشرات الذكية (Smart Pointers) عشان تاخد أقصى سرعة من غير تسريب ذاكرة (Memory Leaks).',
      points: [
        'std::sort runs in O(N log N) and accepts custom lambda comparators.',
        'Prefer std::unique_ptr over raw new/delete in modern C++.',
        'std::unordered_map provides average O(1) key-value lookups.'
      ],
      code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {72, 95, 61, 88, 99};
    sort(scores.begin(), scores.end(), greater<int>());

    cout << "Top 3 Scores: ";
    for (int i = 0; i < 3; i++) cout << scores[i] << " ";
    cout << "\\n";
    return 0;
}`,
      tipEn: 'Mastering STL (vector, map, set, priority_queue, sort) is your secret weapon in coding interviews.',
      tipAr: 'إتقان مكتبة الـ STL هو أهم سلاح في مسابقات البرمجة ومقابلات الشركات الكبرى.'
    },
    {
      id: 'cpp_l5',
      level: 5,
      title: 'Portfolio Architecture: Templates & Generic Programming',
      en: 'Templates allow you to write type-safe, zero-overhead generic data structures and algorithms that the compiler specializes at compile time.',
      ar: 'الـ Templates بتسمحلك تكتب خوارزميات وهياكل بيانات عامة تشتغل مع أي نوع بيانات (int, double, string) بأقصى سرعة وقت الترجمة.',
      points: [
        'template <typename T> generates optimized machine code per type.',
        'Powers the entire C++ Standard Template Library (STL).',
        'Combine templates with const correctness for library-grade C++.'
      ],
      code: `#include <iostream>
using namespace std;

template <typename T>
T clampValue(T val, T low, T high) {
    if (val < low) return low;
    if (val > high) return high;
    return val;
}

int main() {
    cout << clampValue(150, 0, 100) << "\\n";
    cout << clampValue(3.14, 0.0, 2.5) << "\\n";
    return 0;
}`,
      tipEn: 'Keep template definitions inside header files (.hpp) so the compiler can instantiate them.',
      tipAr: 'في المشاريع الكبيرة، اكتب الـ Templates داخل ملفات الـ Header (.hpp) عشان المترجم يشوفها.'
    }
  ],

  exercises: [
    {
      id: 'cpp_ex1',
      level: 1,
      type: 'code',
      title: 'Factorial Calculator',
      promptEn: 'Compute the factorial of 6 (6! = 720) using a for loop and print only the number 720.',
      promptAr: 'احسب مضروب الرقم 6 (6! = 720) باستخدام for loop واطبع الرقم 720 فقط.',
      expectedOutput: '720',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 6;
    long long fact = 1;
    // Write your loop here

    cout << fact << "\\n";
    return 0;
}`,
      hintEn: 'Loop from i = 1 to n (inclusive) and multiply fact *= i.',
      hintAr: 'اعمل حلقة من i = 1 حتى n واضرب fact *= i في كل لفة.'
    },
    {
      id: 'cpp_ex2',
      level: 2,
      type: 'bug',
      title: 'Fix the Missing Semicolon & Scope Error',
      promptEn: 'Fix the two compiler errors in this C++ program so it prints: Total: 45',
      promptAr: 'صلّح الخطأين في كود C++ ده عشان يطبع: Total: 45',
      expectedOutput: 'Total: 45',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 20
    int b = 25;
    cout << "Total: " << (a + c) << "\\n";
    return 0;
}`,
      hintEn: 'Add the missing semicolon after int a = 20 and replace undefined "c" with "b".',
      hintAr: 'أضف (;) بعد int a = 20 وبدّل المتغير الغلط c بالمتغير b.'
    },
    {
      id: 'cpp_ex3',
      level: 3,
      type: 'trace',
      title: 'Trace Pass-by-Reference',
      promptEn: 'What does this C++ program print?',
      promptAr: 'إيه الناتج اللي هيطبعه برنامج C++ ده؟',
      code: `void boost(int& x) { x += 10; }
int main() {
    int v = 5;
    boost(v);
    cout << v;
}`,
      options: ['5', '10', '15', 'Compile Error'],
      correctIndex: 2,
      explainEn: 'Because x is passed by reference (int&), modifying x directly updates v in main() from 5 to 15.',
      explainAr: 'لأن x اتبعت بالمرجع (int&)، التعديل على x بيغير قيمة v الأصلية من 5 إلى 15.'
    }
  ],

  projects: [
    {
      id: 'cpp_p1',
      level: 1,
      difficulty: 'Beginner',
      xp: 120,
      title: 'Scientific Engineering Calculator CLI',
      briefEn: 'Create a fast C++ console calculator supporting power, square root, trigonometric functions (<cmath>), and division-by-zero protection.',
      briefAr: 'ابني آلة حاسبة هندسية سريعة بـ C++ تدعم الأسس والجذور والدوال المثلثية مع الحماية من القسمة على صفر.',
      checklist: [
        'Include <cmath> and implement +, -, *, /, pow, and sqrt operations.',
        'Guard against division by zero and negative square roots.',
        'Format output precision with <iomanip> (fixed << setprecision(2)).'
      ],
      hints: [
        { en: 'Use switch(op) to route arithmetic operators cleanly.', ar: 'استخدم switch على رمز العملية عشان الكود يكون منظم وسريع.' }
      ],
      starterCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double a = 9.0, b = 4.0;
    cout << fixed << setprecision(2);
    cout << "Hypotenuse: " << sqrt(a*a + b*b) << "\\n";
    return 0;
}`
    },
    {
      id: 'cpp_p2',
      level: 2,
      difficulty: 'Elementary',
      xp: 180,
      title: 'Student Leaderboard & Binary Search Engine',
      briefEn: 'Store student records in a std::vector, sort them by GPA using std::sort, and implement fast binary search lookup.',
      briefAr: 'خزّن بيانات الطلاب في vector ورتّبهم حسب التقدير بـ std::sort وابني محرك بحث ثنائي سريع (Binary Search).',
      checklist: [
        'Define a struct Student { string name; double gpa; }.',
        'Sort descending by GPA using a lambda comparator.',
        'Print Top 3 honor students.'
      ],
      hints: [
        { en: 'sort(v.begin(), v.end(), [](const Student& a, const Student& b){ return a.gpa > b.gpa; });', ar: 'استخدم دالة Lambda جوه std::sort عشان ترتب الـ struct حسب الـ GPA.' }
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student { string name; double gpa; };

int main() {
    vector<Student> list = {{"Ali", 3.4}, {"Sara", 3.9}, {"Youssef", 3.7}};
    sort(list.begin(), list.end(), [](const Student& a, const Student& b){ return a.gpa > b.gpa; });
    for (const auto& s : list) cout << s.name << ": " << s.gpa << "\\n";
    return 0;
}`
    },
    {
      id: 'cpp_p3',
      level: 3,
      difficulty: 'Intermediate',
      xp: 250,
      title: 'Banking & Transaction Ledger System (OOP)',
      briefEn: 'Architect Account and SavingsAccount classes using inheritance, virtual methods, and transaction history logging.',
      briefAr: 'صمم نظام بنكي متكامل باستخدام الوراثة والـ Virtual Methods وتسجيل سجل المعاملات.',
      checklist: [
        'Create base Account class with virtual withdraw() method.',
        'Inherit SavingsAccount with interest calculation.',
        'Maintain a vector<string> of audit logs.'
      ],
      hints: [
        { en: 'Mark base destructors virtual (~Account() = default;) whenever using polymorphism.', ar: 'دايماً خلّي الـ Destructor نوعه virtual لما تستخدم الوراثة والـ Polymorphism.' }
      ],
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

class Account {
protected:
    double balance;
public:
    Account(double b) : balance(b) {}
    virtual void deposit(double amt) { balance += amt; }
    double getBalance() const { return balance; }
    virtual ~Account() = default;
};

int main() {
    Account acc(1200);
    acc.deposit(300);
    cout << "Balance: $" << acc.getBalance() << "\\n";
    return 0;
}`
    },
    {
      id: 'cpp_p4',
      level: 4,
      difficulty: 'Advanced',
      xp: 350,
      title: 'Shortest-Path Graph Router (Dijkstra)',
      briefEn: 'Implement Dijkstra shortest-path algorithm using adjacency lists and std::priority_queue to route between city nodes.',
      briefAr: 'طبّق خوارزمية Dijkstra لإيجاد أقصر مسار بين المدن باستخدام الـ Graph والـ priority_queue.',
      checklist: [
        'Represent weighted edges using vector<vector<pair<int,int>>>.',
        'Use a min-heap priority_queue to pick the closest unvisited node.',
        'Output minimum distance from source to every destination.'
      ],
      hints: [
        { en: 'Use priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> for a min-heap.', ar: 'استخدم greater<> مع priority_queue عشان يرتب الأصغر أولاً (Min-Heap).' }
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    cout << "Ready to implement Dijkstra Shortest Path!\\n";
    return 0;
}`
    },
    {
      id: 'cpp_p5',
      level: 5,
      difficulty: 'Portfolio',
      xp: 500,
      title: 'Custom Generic Dynamic Array & Memory Pool',
      briefEn: 'Build your own templated MiniVector<T> class with dynamic capacity doubling, move semantics, and bounds checking—an impressive GitHub systems project.',
      briefAr: 'ابني كلاس MiniVector<T> خاص بيك باستخدام الـ Templates وإدارة الذاكرة الديناميكية كمشروع Systems قوي للـ CV.',
      checklist: [
        'Implement push_back() with 2x capacity reallocation.',
        'Implement destructor to free heap memory safely (Rule of Five).',
        'Add bounds-checked at() method.'
      ],
      hints: [
        { en: 'Allocate a new array of size capacity*2, copy elements, delete[] old array, then update pointer.', ar: 'احجز مصفوفة ضعف الحجم، انقل العناصر، امسح القديمة بـ delete[]، وحدّث المؤشر.' }
      ],
      starterCode: `#include <iostream>
using namespace std;

template <typename T>
class MiniVector {
    T* data; size_t sz, cap;
public:
    MiniVector() : data(new T[2]), sz(0), cap(2) {}
    void push_back(const T& v) {
        if (sz == cap) {
            cap *= 2;
            T* next = new T[cap];
            for (size_t i = 0; i < sz; i++) next[i] = data[i];
            delete[] data;
            data = next;
        }
        data[sz++] = v;
    }
    size_t size() const { return sz; }
    T& operator[](size_t i) { return data[i]; }
    ~MiniVector() { delete[] data; }
};

int main() {
    MiniVector<int> mv;
    mv.push_back(10); mv.push_back(20); mv.push_back(30);
    cout << "MiniVector size: " << mv.size() << ", last: " << mv[2] << "\\n";
    return 0;
}`
    }
  ],

  compare: {
    variables: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "CodeForge";
    int level = 5;
    double pi = 3.14159;
    bool isActive = true;
    cout << name << " L" << level << "\\n";
}`,
    loops: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) cout << "Step " << i << "\\n";
    vector<string> langs = {"C++", "Python", "Dart"};
    for (const auto& l : langs) cout << "-> " << l << "\\n";
}`,
    functions: `#include <iostream>
using namespace std;

double calculateArea(double width, double height = 10.0) {
    return width * height;
}
int main() { cout << "Area: " << calculateArea(5, 4) << "\\n"; }`,
    oop: `#include <iostream>
#include <string>
using namespace std;

class Robot {
    string name;
public:
    Robot(string n) : name(n) {}
    string status() const { return "Robot " + name + " online"; }
};
int main() { Robot bot("Atlas"); cout << bot.status() << "\\n"; }`,
    collections: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    vector<int> scores = {85, 92, 78};
    scores.push_back(99);
    unordered_map<string, string> user = {{"role", "Engineer"}};
    cout << scores.back() << " " << user["role"] << "\\n";
}`
  }
});

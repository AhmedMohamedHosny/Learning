window.CodeForge.registerLanguage({
  id: 'python',
  name: 'Python',
  badge: 'PY',
  color: '#3b82f6',
  category: 'enterprise',
  fileName: 'main.py',
  monacoLang: 'python',
  pistonLang: 'python',
  tagline: 'Clean, expressive power for AI, Data Science, Automation, and scalable Backend APIs.',
  useCases: ['AI & ML', 'Automation', 'Backend APIs', 'Data Science'],
  starterPlayground: `# Python 3 Sandbox
def greet(engineer, skills):
    print(f"Welcome, {engineer}!")
    for idx, skill in enumerate(skills, 1):
        print(f"  {idx}. Mastering {skill}")

greet("Developer", ["Algorithms", "Automation", "Clean Architecture"])`,

  lessons: [
    {
      id: 'py_l1',
      level: 1,
      title: 'Variables, Dynamic Typing & Control Flow',
      en: 'Python uses indentation instead of curly braces to define code blocks. Variables are dynamically typed—no type keywords are required, though type hints improve readability in production code.',
      ar: 'بايثون بتستخدم المسافات البادئة (Indentation) بدل الأقواس { } لتحديد البلوكات البرمجية. المتغيرات ديناميكية النوع، يعني مش محتاج تكتب int أو string قبل المتغير.',
      points: [
        'Use snake_case for variable and function names (PEP 8 standard).',
        'f-strings (f"Value: {x}") are the fastest and cleanest way to format output.',
        'Conditions use if / elif / else followed by a colon (:).'
      ],
      code: `name = "CodeForge"
level = 1
score = 92.5

if score >= 90:
    grade = "A+"
elif score >= 80:
    grade = "B"
else:
    grade = "C"

print(f"{name} | Level {level} | Grade: {grade}")`,
      tipEn: 'Always check for ":" after if, elif, else, for, while, and def—forgetting it is the #1 beginner SyntaxError.',
      tipAr: 'دايماً تأكد من وجود النقطتين (:) بعد if و for و def، لأن نسيانها هو أشهر سبب للـ SyntaxError في بايثون.'
    },
    {
      id: 'py_l2',
      level: 2,
      title: 'Functions, Lists & List Comprehensions',
      en: 'Functions encapsulate reusable logic using the def keyword. Python lists and dictionaries are built-in high-performance collections, and list comprehensions let you transform data in a single readable line.',
      ar: 'الدوال بتتكتب بكلمة def لتنظيم الكود وإعادة استخدامه. القوائم (Lists) والقواميس (Dictionaries) هما أساس التعامل مع البيانات في بايثون، وتقدر تفلتر البيانات في سطر واحد بـ List Comprehension.',
      points: [
        'Return values explicitly with return; otherwise Python returns None.',
        'List slicing arr[start:end] extracts sublists effortlessly.',
        '[x * 2 for x in nums if x > 0] replaces verbose filter+map loops.'
      ],
      code: `def analyze_scores(scores):
    passed = [s for s in scores if s >= 60]
    avg = sum(passed) / len(passed)
    return len(passed), round(avg, 2)

data = [45, 78, 92, 55, 88, 100]
count, average = analyze_scores(data)
print(f"Passed: {count} | Average: {average}")`,
      tipEn: 'Never use a mutable list as a default function argument (def f(items=[]):) — use None instead.',
      tipAr: 'أوعى تحط List فاضية كقيمة افتراضية في باراميتر دالة، لأنها بتتشارك بين الاستدعاءات؛ استخدم None بدلها.'
    },
    {
      id: 'py_l3',
      level: 3,
      title: 'Object-Oriented Programming & Dataclasses',
      en: 'Classes bundle state (attributes) and behavior (methods). The __init__ constructor initializes each object, and self refers to the current instance.',
      ar: 'الكلاسات بتجمع البيانات والوظائف في وحدة واحدة. دالة __init__ هي الـ Constructor اللي بتشتغل أول ما تنشئ كائن جديد، وكلمة self بتشير للكائن الحالي.',
      points: [
        'Use _attribute convention for internal/protected state.',
        '__str__ defines how print(obj) displays your object.',
        'Inheritance lets subclasses extend or override parent behavior cleanly.'
      ],
      code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def summary(self):
        return f"{self.owner}: \${self._balance:.2f}"

acc = BankAccount("Ahmed", 1000)
acc.deposit(450)
print(acc.summary())`,
      tipEn: 'Keep methods focused on a single responsibility and validate inputs inside setters/methods.',
      tipAr: 'خلّي كل دالة داخل الكلاس مسؤولة عن مهمة واحدة بس، واعمل تحقق (Validation) من القيم قبل تعديل الرصيد أو البيانات.'
    },
    {
      id: 'py_l4',
      level: 4,
      title: 'Domain Track: Exception Handling & Data Pipelines',
      en: 'Production Python scripts handle unpredictable data gracefully using try/except blocks, JSON parsing, and generator expressions for memory-efficient pipelines.',
      ar: 'في الشغل الحقيقي (الـ Automation وتحليل البيانات)، لازم تحمي الكود بـ try/except وتتعامل مع JSON والبيانات الكبيرة بكفاءة عشان البرنامج ما يقعش فجأة.',
      points: [
        'Catch specific exceptions (ValueError, ZeroDivisionError) instead of bare except.',
        'The json module converts cleanly between dicts and JSON text.',
        'Generators (yield) stream millions of rows without filling RAM.'
      ],
      code: `import json

raw_payload = '[{"item":"Sensor","price":120},{"item":"Relay","price":45}]'
records = json.loads(raw_payload)

total = sum(r["price"] for r in records)
print(f"Loaded {len(records)} items | Total Cost: \${total}")`,
      tipEn: 'Always use "with open(...) as f:" when working with files so handles close automatically.',
      tipAr: 'عند التعامل مع الملفات استخدم دايماً with open عشان الملف يتقفل تلقائياً حتى لو حصل Error.'
    },
    {
      id: 'py_l5',
      level: 5,
      title: 'Portfolio Architecture: Decorators & Clean Design',
      en: 'Senior Python engineers use decorators, type annotations, and modular packages to add logging, caching, and timing without cluttering business logic.',
      ar: 'المبرمجين المحترفين في بايثون بيستخدموا الـ Decorators والـ Type Hints عشان يضيفوا قياس الأداء والتسجيل (Logging) للكود من غير ما يكرروا نفس السطور في كل دالة.',
      points: [
        'A decorator wraps a function to extend its behavior dynamically.',
        'functools.lru_cache memoizes expensive recursive computations automatically.',
        'Combine clean typing with unit tests for portfolio-ready repositories.'
      ],
      code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print("fib(35) =", fib(35))`,
      tipEn: 'Without @lru_cache, fib(35) takes millions of calls; with memoization, it completes in microseconds.',
      tipAr: 'من غير @lru_cache حساب fib(35) بيحتاج ملايين الاستدعاءات، ومعاها بيخلص في أجزاء من الثانية.'
    }
  ],

  exercises: [
    {
      id: 'py_ex1',
      level: 1,
      type: 'code',
      title: 'Sum of Even Numbers',
      promptEn: 'Write a loop that calculates the sum of all even numbers from 1 to 20 (inclusive) and prints the final number only.',
      promptAr: 'اكتب Loop تحسب مجموع كل الأرقام الزوجية من 1 إلى 20 (شامل 20) واطبع المجموع النهائي فقط.',
      expectedOutput: '110',
      starterCode: `# Calculate sum of even numbers from 1 to 20
total = 0
# Write your loop here

print(total)`,
      hintEn: 'Use range(2, 21, 2) or check if n % 2 == 0 inside range(1, 21).',
      hintAr: 'استخدم range(2, 21, 2) أو افحص الشرط n % 2 == 0 داخل حلقة من 1 إلى 20.'
    },
    {
      id: 'py_ex2',
      level: 2,
      type: 'bug',
      title: 'Fix the Average Bug',
      promptEn: 'This script crashes with a TypeError/ZeroDivisionError or prints the wrong result. Fix the bugs so it prints exactly: Average: 80.0',
      promptAr: 'الكود ده فيه أخطاء بتوقفه أو بتطلع ناتج غلط. صلّح الأخطاء عشان يطبع بالظبط: Average: 80.0',
      expectedOutput: 'Average: 80.0',
      starterCode: `grades = ["70", "80", "90"]
total = 0
for g in grades:
    total = total + g  # Bug here: string addition!

avg = total / len(grades)
print("Average:", avg)`,
      hintEn: 'Convert each string element g to int(g) before adding to total.',
      hintAr: 'حوّل كل عنصر نصي g إلى رقم صحيح باستخدام int(g) قبل جمعه على total.'
    },
    {
      id: 'py_ex3',
      level: 3,
      type: 'trace',
      title: 'Trace List Mutation',
      promptEn: 'What does this Python snippet output when executed?',
      promptAr: 'إيه الناتج اللي هيطبع من الكود ده لما يشتغل؟',
      code: `a = [1, 2, 3]
b = a
b.append(4)
print(len(a), len(b))`,
      options: ['3 4', '4 4', '3 3', 'TypeError'],
      correctIndex: 1,
      explainEn: 'Assigning b = a copies the reference to the same list in memory, not a clone. Mutating b also mutates a.',
      explainAr: 'الأمر b = a بينسخ المرجع (Reference) لنفس القائمة في الذاكرة، فبالتالي أي إضافة على b بتظهر في a كمان.'
    }
  ],

  projects: [
    {
      id: 'py_p1',
      level: 1,
      difficulty: 'Beginner',
      xp: 120,
      title: 'Smart Unit & Currency Converter CLI',
      briefEn: 'Build an interactive console utility that converts temperature, length, and currencies with input validation and formatted tables.',
      briefAr: 'ابني أداة تفاعلية لتحويل الوحدات (حرارة، أطوال، عملات) مع التحقق من صحة المدخلات وعرض النتيجة بشكل منسق.',
      checklist: [
        'Create conversion formulas for Celsius/Fahrenheit, Meters/Feet, and USD/EGP.',
        'Handle invalid inputs gracefully without crashing the program.',
        'Print a clean summary table using Python f-strings with 2 decimal places.'
      ],
      hints: [
        { en: 'Store conversion rates in a dictionary like rates = {"USD": 1.0, "EGP": 49.0}.', ar: 'خزّن أسعار التحويل في Dictionary عشان تسهل التحديث.' },
        { en: 'Use f"{value:.2f}" to format numbers cleanly to 2 decimal places.', ar: 'استخدم f"{value:.2f}" لعرض رقمين عشريين فقط.' }
      ],
      starterCode: `# Level 1 Project: Smart Converter
RATES = {"USD": 1.0, "EUR": 0.92, "EGP": 49.5}

def convert_currency(amount, src, dst):
    usd = amount / RATES[src]
    return usd * RATES[dst]

print(f"100 USD = {convert_currency(100, 'USD', 'EGP'):.2f} EGP")`
    },
    {
      id: 'py_p2',
      level: 2,
      difficulty: 'Elementary',
      xp: 180,
      title: 'Personal Expense Tracker & Analytics Engine',
      briefEn: 'Track daily expenses by category, filter spending above a threshold, and generate category totals using lists and dictionaries.',
      briefAr: 'صمم نظام لمتابعة المصروفات اليومية حسب الفئة، مع تصفية المصاريف الكبيرة وحساب إجمالي كل فئة.',
      checklist: [
        'Represent each expense as a dictionary {title, category, amount}.',
        'Write a function to compute total spend per category.',
        'Find the highest single expense and print a full report.'
      ],
      hints: [
        { en: 'Use totals.get(cat, 0) + amount to accumulate totals per category cleanly.', ar: 'استخدم totals.get(cat, 0) + amount لتجميع إجمالي كل فئة بسهولة.' },
        { en: 'Use max(expenses, key=lambda e: e["amount"]) to find the largest expense.', ar: 'استخدم دالة max مع lambda لإيجاد أعلى مصروف في سطر واحد.' }
      ],
      starterCode: `# Level 2 Project: Expense Analytics
expenses = [
    {"title": "Cloud Hosting", "category": "Tech", "amount": 25},
    {"title": "Coffee", "category": "Food", "amount": 6},
    {"title": "Domain Name", "category": "Tech", "amount": 12}
]

# TODO: Group totals by category and print summary
print("Total records:", len(expenses))`
    },
    {
      id: 'py_p3',
      level: 3,
      difficulty: 'Intermediate',
      xp: 250,
      title: 'University Attendance & Grading Engine (OOP)',
      briefEn: 'Design an object-oriented system with Student, Course, and AttendanceLedger classes supporting enrollment, attendance percentages, and automated GPA reports.',
      briefAr: 'ابني نظام جامعي متكامل بالـ OOP يحتوي على كلاسات للطلاب والمقررات والحضور وحساب نسب الغياب والمعدل تلقائياً.',
      checklist: [
        'Create Student and Course classes with clean __init__ constructors.',
        'Implement mark_present() and calculate_attendance_rate() methods.',
        'Flag students whose attendance drops below 75% automatically.'
      ],
      hints: [
        { en: 'Keep a dictionary mapping student_id -> Student object inside the Course class.', ar: 'احتفظ بـ Dictionary يربط رقم الطالب بكائن الطالب داخل كلاس Course.' },
        { en: 'Separate data validation from printing logic so your classes stay reusable.', ar: 'افصل منطق الحسابات عن الطباعة عشان الكلاس يكون قابل لإعادة الاستخدام.' }
      ],
      starterCode: `# Level 3 Project: OOP Attendance Engine
class Student:
    def __init__(self, sid, name):
        self.sid = sid
        self.name = name
        self.attended = 0
        self.total_sessions = 0

    def record(self, present: bool):
        self.total_sessions += 1
        if present:
            self.attended += 1

    def rate(self):
        return (self.attended / self.total_sessions * 100) if self.total_sessions else 0.0

s = Student("ENG-101", "Omar")
s.record(True); s.record(True); s.record(False)
print(f"{s.name} Attendance: {s.rate():.1f}%")`
    },
    {
      id: 'py_p4',
      level: 4,
      difficulty: 'Advanced',
      xp: 350,
      title: 'Log Parser & Anomaly Detection Pipeline',
      briefEn: 'Build an automated data pipeline that parses raw server logs, extracts HTTP 500/404 errors via Regex, aggregates IP frequency, and outputs a JSON security report.',
      briefAr: 'ابني أداة Automation لتحليل ملفات اللوج (Server Logs) واستخراج الأخطاء وعناوين الـ IP المشبوهة وإصدار تقرير JSON احترافي.',
      checklist: [
        'Parse raw log lines using Python re (Regular Expressions).',
        'Count status codes using collections.Counter.',
        'Export structured insights as formatted JSON.'
      ],
      hints: [
        { en: 'Use collections.Counter for instant frequency counting of IPs and status codes.', ar: 'مكتبة collections.Counter بتحسب تكرار الـ IPs والأخطاء في سطر واحد.' }
      ],
      starterCode: `# Level 4 Project: Log Anomaly Pipeline
import re, json
from collections import Counter

logs = [
    "192.168.1.5 GET /api/users 200",
    "10.0.0.8 POST /api/login 401",
    "10.0.0.8 POST /api/login 401",
    "192.168.1.5 GET /api/orders 500"
]

statuses = Counter(line.split()[-1] for line in logs)
print(json.dumps({"status_summary": dict(statuses)}, indent=2))`
    },
    {
      id: 'py_p5',
      level: 5,
      difficulty: 'Portfolio',
      xp: 500,
      title: 'Mini Task Scheduler & In-Memory Cache Engine',
      briefEn: 'Engineer a portfolio-grade LRU Cache + Priority Task Scheduler using heapq, decorators, and type annotations—ready to publish on GitHub.',
      briefAr: 'صمم محرك جدولة مهام مع ذاكرة كاش ذكية (LRU Cache) باستخدام heapq و Decorators كمشروع قوي يترفع على GitHub في الـ Portfolio بتاعك.',
      checklist: [
        'Implement a priority queue using Python heapq module.',
        'Build a TTL/LRU cache class with O(1) lookup using OrderedDict.',
        'Add comprehensive benchmark output showing cache hit ratio.'
      ],
      hints: [
        { en: 'collections.OrderedDict provides move_to_end() and popitem(last=False) for O(1) LRU eviction.', ar: 'OrderedDict بيوفر move_to_end و popitem عشان تبني LRU Cache بزمن O(1).' }
      ],
      starterCode: `# Level 5 Portfolio Project: Priority Scheduler + LRU Cache
import heapq

tasks = []
heapq.heappush(tasks, (1, "Deploy Security Patch"))
heapq.heappush(tasks, (3, "Generate Weekly Report"))
heapq.heappush(tasks, (2, "Sync Database Backup"))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"[P{priority}] Executing: {task}")`
    }
  ],

  compare: {
    variables: `# Dynamic typing (with optional type hints)
name: str = "CodeForge"
level: int = 5
pi: float = 3.14159
is_active: bool = True
print(f"{name} L{level}")`,
    loops: `# Iterate over a range and a list
for i in range(1, 4):
    print("Step", i)

langs = ["Python", "C++", "Dart"]
for lang in langs:
    print("->", lang)`,
    functions: `# Function with default parameter & return value
def calculate_area(width: float, height: float = 10.0) -> float:
    return width * height

print("Area:", calculate_area(5, 4))`,
    oop: `class Robot:
    def __init__(self, name: str):
        self.name = name

    def status(self) -> str:
        return f"Robot {self.name} online"

bot = Robot("Atlas")
print(bot.status())`,
    collections: `# Dynamic List & Dictionary
scores = [85, 92, 78]
scores.append(99)

user = {"name": "Ahmed", "role": "Engineer"}
print(scores, user["role"])`
  }
});

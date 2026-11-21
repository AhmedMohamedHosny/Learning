window.CodeForge.registerLanguage({
  id: 'dart',
  name: 'Dart',
  badge: 'DT',
  color: '#06b6d4',
  category: 'web',
  fileName: 'main.dart',
  monacoLang: 'dart',
  pistonLang: 'dart',
  tagline: 'Google’s fast, null-safe client language powering Flutter cross-platform iOS, Android, Web & Desktop apps.',
  useCases: ['Flutter Mobile', 'Cross-Platform', 'Null Safety', 'Reactive UI'],
  starterPlayground: `void main() {
  final platforms = ['Android', 'iOS', 'Web', 'Desktop'];
  print('CodeForge Dart Engine Ready!');
  for (final p in platforms) {
    print('  -> Target: \$p');
  }
}`,

  lessons: [
    {
      id: 'dart_l1',
      level: 1,
      title: 'Sound Null Safety, final vs const & String Interpolation',
      en: 'Dart prevents billion-dollar null crashes at compile time with Sound Null Safety. Variables cannot hold null unless explicitly marked nullable with a question mark (String?).',
      ar: 'لغة Dart بتحميك من أخطاء الـ Null وقت الترجمة بميزة Sound Null Safety. أي متغير مينفعش يقبل null إلا لو حطيت علامة استفهام بعد نوعه زي String?.',
      points: [
        'Use final for runtime constants and const for compile-time constants (huge in Flutter!).',
        'String interpolation uses $var or ${expression}.',
        'The ?? operator supplies a safe default when a nullable value is null.'
      ],
      code: `void main() {
  const appName = 'CodeForge Flutter';
  String? nickname;
  final displayName = nickname ?? 'Guest Engineer';

  print('\$appName | Welcome, \$displayName!');
}`,
      tipEn: 'Avoid using the bang operator (!) unless you are 100% certain a value is non-null—prefer ?? instead.',
      tipAr: 'ابعد عن علامة (!) في Dart إلا لو متأكد 100% إن المتغير مش فاضي، واستخدم ?? كقيمة بديلة أأمن.'
    },
    {
      id: 'dart_l2',
      level: 2,
      title: 'Named Parameters, Arrow Syntax & Collections',
      en: 'Named parameters ({required String title, int priority = 1}) are the secret behind Flutter’s ultra-readable widget trees.',
      ar: 'الباراميترات المسماة (Named Parameters) مع كلمة required هي السبب إن كود Flutter سهل القراءة ومنظم جداً.',
      points: [
        'Named parameters go inside curly braces {} in the function signature.',
        'Collection-if and spread operator (...list) build dynamic UI lists effortlessly.',
        'Single-expression functions use clean arrow syntax (=>).'
      ],
      code: `String formatBadge({required String user, int level = 1}) =>
    '[\$user • Level \$level]';

void main() {
  final core = ['Dart', 'Flutter'];
  final all = [...core, 'Firebase'];
  print(formatBadge(user: 'Ahmed', level: 4));
  print('Stack: \${all.join(" + ")}');
}`,
      tipEn: 'Master named + required parameters now—every single Flutter Widget constructor uses them.',
      tipAr: 'إتقان الـ Named Parameters دلوقتي هيخلي دخولك على Flutter سلس جداً لأن كل Widget مبني عليها.'
    },
    {
      id: 'dart_l3',
      level: 3,
      title: 'Classes, Named Constructors & Mixins',
      en: 'Dart streamlines OOP with concise constructors (this.name), factory constructors for JSON parsing (User.fromJson), and mixins for clean code reuse.',
      ar: 'Dart بتختصر عليك كتابة الـ OOP بكثير: الـ Constructor المختصر (this.name)، والـ Named Constructors لقراءة JSON، والـ Mixins لإعادة استخدام الوظائف.',
      points: [
        'ClassName.fromJson(Map<String, dynamic> json) is the standard Flutter API model pattern.',
        'Private members start with an underscore (_secret) at the library level.',
        'Mixins (with Logger) add reusable capabilities without rigid inheritance.'
      ],
      code: `class Course {
  final String title;
  final int lessons;

  const Course({required this.title, required this.lessons});

  factory Course.fromMap(Map<String, dynamic> m) =>
      Course(title: m['title'], lessons: m['lessons']);
}

void main() {
  final c = Course.fromMap({'title': 'Flutter Mastery', 'lessons': 42});
  print('\${c.title} (\${c.lessons} lessons)');
}`,
      tipEn: 'Make model classes immutable with final fields and const constructors for maximum Flutter performance.',
      tipAr: 'خلّي موديلات البيانات ثابتة بـ final و const constructor عشان تحسن أداء واجهات Flutter.'
    },
    {
      id: 'dart_l4',
      level: 4,
      title: 'Domain Track: Async, Future & Streams (Flutter Core)',
      en: 'Mobile apps must never freeze the UI thread. Dart handles network calls with Future + async/await and real-time updates (like Firebase listeners) with Stream.',
      ar: 'في تطبيقات الموبايل ممنوع الشاشة تهنج وقت تحميل البيانات. Dart بتستخدم Future مع async/await لطلبات الإنترنت، و Stream للبيانات اللحظية زي Firebase.',
      points: [
        'Mark asynchronous functions with async and pause cleanly using await.',
        'Always wrap network awaits inside try / catch blocks.',
        'Streams emit sequences of events over time (e.g., live chat or sensor ticks).'
      ],
      code: `Future<String> fetchProfile(String id) async {
  await Future.delayed(Duration(milliseconds: 50));
  return 'Engineer #\$id (Verified)';
}

Future<void> main() async {
  print('Loading profile...');
  final profile = await fetchProfile('2026');
  print('Loaded: \$profile');
}`,
      tipEn: 'In Flutter, FutureBuilder renders Futures and StreamBuilder renders live Streams directly to the UI.',
      tipAr: 'في Flutter هتستخدم FutureBuilder مع الـ Future و StreamBuilder مع الـ Stream لربط الواجهة تلقائياً.'
    },
    {
      id: 'dart_l5',
      level: 5,
      title: 'Portfolio Architecture: Sealed Classes & State Machines',
      en: 'Modern Dart 3 introduces sealed classes and exhaustive switch expressions—allowing you to model Loading, Success, and Error UI states with zero unhandled edge cases.',
      ar: 'في Dart الحديثة، تقدر تمثّل حالات الشاشة (Loading / Success / Error) بشكل صارم يخلي المترجم ينبهك لو نسيت تعالج أي حالة في الواجهة.',
      points: [
        'Eliminates impossible UI states (like loading=true and error!=null simultaneously).',
        'Powers modern Flutter BLoC and Riverpod state management.',
        'Pattern matching makes state rendering concise and bug-proof.'
      ],
      code: `abstract class UiState {}
class Loading extends UiState {}
class Loaded extends UiState { final String data; Loaded(this.data); }
class Failed extends UiState { final String msg; Failed(this.msg); }

String render(UiState s) {
  if (s is Loading) return 'Spinner...';
  if (s is Loaded) return 'UI Data: \${s.data}';
  if (s is Failed) return 'Error Banner: \${s.msg}';
  return '';
}

void main() {
  print(render(Loaded('14 Courses Ready')));
}`,
      tipEn: 'Modeling UI as explicit state classes is the hallmark of a senior Flutter engineer.',
      tipAr: 'تمثيل الشاشة كحالات واضحة (State Classes) هو اللي بيفرق مهندس Flutter المحترف عن المبتدئ.'
    }
  ],

  exercises: [
    {
      id: 'dart_ex1',
      level: 1,
      type: 'code',
      title: 'Null-Safe Greeting Builder',
      promptEn: 'Given String? userName = null;, use the ?? operator to fall back to "Developer" and print exactly: Hello, Developer!',
      promptAr: 'بفرض إن String? userName = null; استخدم معامل ?? عشان ترجع "Developer" وتطبع بالظبط: Hello, Developer!',
      expectedOutput: 'Hello, Developer!',
      starterCode: `void main() {
  String? userName;
  // Use ?? operator here
  final name = '';
  print('Hello, \$name!');
}`,
      hintEn: 'Write: final name = userName ?? "Developer";',
      hintAr: 'اكتب: final name = userName ?? "Developer";'
    },
    {
      id: 'dart_ex2',
      level: 2,
      type: 'bug',
      title: 'Fix the Semicolon & Type Error',
      promptEn: 'Fix the Dart syntax/type bugs so this program prints: Total: 42',
      promptAr: 'صلّح أخطاء الصياغة والنوع في كود Dart عشان يطبع: Total: 42',
      expectedOutput: 'Total: 42',
      starterCode: `void main() {
  int a = 20
  int b = '22'; // Bug: String assigned to int
  print('Total: \${a + b}');
}`,
      hintEn: 'Add ";" after int a = 20 and change \'22\' to integer 22.',
      hintAr: 'أضف (;) بعد int a = 20 وغيّر \'22\' لرقم صحيح 22.'
    },
    {
      id: 'dart_ex3',
      level: 3,
      type: 'trace',
      title: 'Trace Spread Operator & Collection-If',
      promptEn: 'What does this Dart snippet print?',
      promptAr: 'إيه الناتج اللي هيطبعه كود Dart ده؟',
      code: `bool isPro = true;
final tabs = ['Home', if (isPro) 'Analytics', 'Profile'];
print(tabs.length);`,
      options: ['2', '3', '4', 'Compile Error'],
      correctIndex: 1,
      explainEn: 'Because isPro is true, the collection-if includes "Analytics", resulting in 3 elements.',
      explainAr: 'لأن isPro قيمتها true، العنصر Analytics بيتضاف للقائمة فيبقى الطول 3.'
    }
  ],

  projects: [
    {
      id: 'dart_p1',
      level: 1,
      difficulty: 'Beginner',
      xp: 120,
      title: 'BMI & Fitness Readiness Calculator',
      briefEn: 'Create a null-safe Dart utility computing BMI, health category, and recommended daily water intake using named parameters.',
      briefAr: 'ابني أداة Dart بـ Named Parameters لحساب مؤشر كتلة الجسم BMI وتحديد التصنيف الصحي.',
      checklist: [
        'Write calculateBmi({required double weightKg, required double heightM}).',
        'Classify result into Underweight, Normal, Overweight, or Obese.',
        'Format output to 1 decimal place with toStringAsFixed(1).'
      ],
      hints: [
        { en: 'BMI = weightKg / (heightM * heightM).', ar: 'المعادلة هي الوزن بالكيلو مقسوم على مربع الطول بالمتر.' }
      ],
      starterCode: `double calcBmi({required double kg, required double m}) => kg / (m * m);

void main() {
  final bmi = calcBmi(kg: 74, m: 1.78);
  print('BMI: \${bmi.toStringAsFixed(1)}');
}`
    },
    {
      id: 'dart_p2',
      level: 2,
      difficulty: 'Elementary',
      xp: 180,
      title: 'Flutter-Ready JSON Model Serializer',
      briefEn: 'Build strongly typed Product and Order models with fromJson() and toJson() serialization methods ready for REST APIs.',
      briefAr: 'ابني موديلات Product و Order بـ fromJson و toJson جاهزة للربط مع أي REST API في Flutter.',
      checklist: [
        'Implement Product.fromJson(Map<String, dynamic> json).',
        'Implement toJson() returning a Map<String, dynamic>.',
        'Compute order total using .fold().'
      ],
      hints: [
        { en: 'Use (json["price"] as num).toDouble() to handle both int and double JSON numbers safely.', ar: 'استخدم (json["price"] as num).toDouble() عشان تتفادى أخطاء تحويل الأرقام من JSON.' }
      ],
      starterCode: `class Product {
  final String name;
  final double price;
  Product(this.name, this.price);
  factory Product.fromJson(Map<String, dynamic> j) => Product(j['name'], (j['price'] as num).toDouble());
  Map<String, dynamic> toJson() => {'name': name, 'price': price};
}

void main() {
  final p = Product.fromJson({'name': 'Watch', 'price': 199});
  print(p.toJson());
}`
    },
    {
      id: 'dart_p3',
      level: 3,
      difficulty: 'Intermediate',
      xp: 250,
      title: 'Role-Based Access Control (RBAC) Engine',
      briefEn: 'Use Dart enums, mixins, and OOP classes to control permissions for Admin, Professor, TA, and Student roles.',
      briefAr: 'استخدم Enums و Mixins في Dart لبناء نظام صلاحيات (Admin / Professor / Student) زي أنظمة الجامعات.',
      checklist: [
        'Define enum Role { admin, professor, student }.',
        'Create permission check methods (canEditGrades, canTakeAttendance).',
        'Log every denied action using an AuditMixin.'
      ],
      hints: [
        { en: 'Dart enhanced enums can hold methods directly inside the enum!', ar: 'في Dart الحديثة تقدر تكتب دوال مباشرة جوه الـ enum.' }
      ],
      starterCode: `enum Role { admin, professor, student }

class User {
  final String name;
  final Role role;
  User(this.name, this.role);
  bool get canManage => role == Role.admin || role == Role.professor;
}

void main() {
  final u = User('Ahmed', Role.admin);
  print('\${u.name} canManage: \${u.canManage}');
}`
    },
    {
      id: 'dart_p4',
      level: 4,
      difficulty: 'Advanced',
      xp: 350,
      title: 'Async Live Notification Stream Processor',
      briefEn: 'Create an async* Stream generator that emits live attendance/order events, filters high-priority alerts, and processes them reactively.',
      briefAr: 'ابني معالج إشعارات لحظي باستخدام Streams و async* يفلتر التنبيهات العاجلة ويعرضها فور وصولها.',
      checklist: [
        'Build a Stream<Map<String, dynamic>> using async* and yield.',
        'Filter stream events using .where().',
        'Consume events cleanly with await for.'
      ],
      hints: [
        { en: 'Use "await for (final event in stream)" to process asynchronous streams sequentially.', ar: 'استخدم await for للتعامل مع أحداث الـ Stream واحد ورا التاني.' }
      ],
      starterCode: `Stream<String> liveEvents() async* {
  for (final e in ['INFO: Sync OK', 'ALERT: High CPU', 'INFO: Saved']) {
    await Future.delayed(Duration(milliseconds: 20));
    yield e;
  }
}

Future<void> main() async {
  await for (final ev in liveEvents().where((e) => e.startsWith('ALERT'))) {
    print('Triggered -> \$ev');
  }
}`
    },
    {
      id: 'dart_p5',
      level: 5,
      difficulty: 'Portfolio',
      xp: 500,
      title: 'Mini Flutter State Management Core (ChangeNotifier)',
      briefEn: 'Engineer a lightweight reactive State Controller with listener notifications, immutable state snapshots, and undo history—portfolio-ready Dart architecture.',
      briefAr: 'صمم نواة إدارة حالة (State Controller) شبيهة بـ Provider/Bloc مع ميزة التراجع (Undo History) كمشروع Portfolio.',
      checklist: [
        'Maintain current state + a history stack for undo().',
        'Notify all registered callbacks whenever state changes.',
        'Verify state transitions and undo rollback via console tests.'
      ],
      hints: [
        { en: 'Push the previous state onto a List<T> stack before assigning the new state.', ar: 'خزّن الحالة القديمة في Stack قبل ما تحدث الحالة الجديدة عشان Undo يشتغل بسهولة.' }
      ],
      starterCode: `class StateController<T> {
  T _state;
  final List<T> _history = [];
  StateController(this._state);
  T get state => _state;
  void update(T next) { _history.add(_state); _state = next; }
  void undo() { if (_history.isNotEmpty) _state = _history.removeLast(); }
}

void main() {
  final ctrl = StateController<int>(1);
  ctrl.update(2); ctrl.update(3);
  ctrl.undo();
  print('Current State after Undo: \${ctrl.state}');
}`
    }
  ],

  compare: {
    variables: `void main() {
  const name = 'CodeForge';
  var level = 5;
  double pi = 3.14159;
  bool isActive = true;
  print('\$name L\$level');
}`,
    loops: `void main() {
  for (var i = 1; i <= 3; i++) print('Step \$i');
  final langs = ['Dart', 'Python', 'C++'];
  for (final l in langs) print('-> \$l');
}`,
    functions: `double calculateArea(double width, [double height = 10.0]) =>
    width * height;

void main() {
  print('Area: \${calculateArea(5, 4)}');
}`,
    oop: `class Robot {
  final String name;
  Robot(this.name);
  String status() => 'Robot \$name online';
}
void main() {
  print(Robot('Atlas').status());
}`,
    collections: `void main() {
  final scores = [85, 92, 78];
  scores.add(99);
  final user = {'name': 'Ahmed', 'role': 'Engineer'};
  print('\$scores \${user["role"]}');
}`
  }
});

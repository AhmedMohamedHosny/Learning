window.CodeForge.registerLanguage({
  id: 'javascript',
  name: 'JavaScript',
  badge: 'JS',
  color: '#eab308',
  category: 'web',
  fileName: 'index.js',
  monacoLang: 'javascript',
  pistonLang: 'javascript',
  tagline: 'The universal language of the Web—powering modern Frontends, Node.js Backends, and Full-Stack apps.',
  useCases: ['Web Apps', 'Node.js Backend', 'APIs', 'Full-Stack'],
  starterPlayground: `// JavaScript ES6+ Sandbox (Runs instantaneously offline!)
const skills = ["DOM", "Async/Await", "APIs", "Architecture"];
const engineer = { name: "Builder", level: 1 };

console.log(\`Hello \${engineer.name}! Ready to master:\`);
skills.forEach((s, i) => console.log(\`  \${i + 1}. \${s}\`));`,

  lessons: [
    {
      id: 'js_l1',
      level: 1,
      title: 'Modern Variables (let/const), Types & Template Literals',
      en: 'Modern JavaScript (ES6+) replaces var with block-scoped const and let. Always default to const unless a variable genuinely needs reassignment.',
      ar: 'جافاسكريبت الحديثة بتستخدم const و let بدل var عشان تمنع مشاكل الـ Scope. دايماً ابدأ بـ const، واستخدم let بس لما القيمة هتتغير.',
      points: [
        'Use strict equality (===) instead of loose equality (==) to prevent implicit type bugs.',
        'Template literals (`Hello ${name}`) support interpolation and multi-line strings.',
        'JavaScript runs right inside this browser sandbox in under 2 milliseconds!'
      ],
      code: `const appName = "CodeForge";
let activeUsers = 120;
activeUsers += 30;

const status = activeUsers >= 100 ? "Scaling Fast" : "Growing";
console.log(\`\${appName}: \${activeUsers} users (\${status})\`);`,
      tipEn: 'Never use "==" in production JS ("5" == 5 is true, which causes subtle bugs). Always use "===".',
      tipAr: 'ابعد عن (==) في جافاسكريبت لأنها بتعمل تحويل ضمني بيعمل مشاكل خفية؛ استخدم (===) دايماً.'
    },
    {
      id: 'js_l2',
      level: 2,
      title: 'Arrow Functions & Array Pipelines (map, filter, reduce)',
      en: 'Functional array methods let you process datasets immutably and cleanly without manual index loops—this pattern is the backbone of React and modern Node.js.',
      ar: 'دوال المصفوفات زي map و filter و reduce بتخليك تعالج البيانات بنظافة من غير Loops طويلة، وده الأسلوب الأساسي اللي هتحتاجه لما تدخل في React.',
      points: [
        'map() transforms every element into a new array of the same length.',
        'filter() returns only elements passing a boolean condition.',
        'reduce() folds an entire array into a single value (sum, object, etc.).'
      ],
      code: `const orders = [
  { id: 1, total: 120, paid: true },
  { id: 2, total: 80, paid: false },
  { id: 3, total: 250, paid: true }
];

const revenue = orders
  .filter(o => o.paid)
  .reduce((sum, o) => sum + o.total, 0);

console.log("Paid Revenue: $" + revenue);`,
      tipEn: 'Destructuring ({ total, paid }) makes array callbacks and API handlers dramatically cleaner.',
      tipAr: 'استخدام الـ Destructuring بيخلي الكود أقصر وأوضح خصوصاً لما تتعامل مع بيانات جاية من API.'
    },
    {
      id: 'js_l3',
      level: 3,
      title: 'ES6 Classes, Encapsulation & Modules',
      en: 'JavaScript supports clean class syntax with private fields (#field) to enforce true encapsulation for stateful business entities.',
      ar: 'جافاسكريبت الحديثة بتدعم الكلاسات والحقول الخاصة (Private Fields باستخدام علامة #) لحماية بيانات الكائن من التعديل المباشر.',
      points: [
        'Private fields start with # and throw a SyntaxError if accessed externally.',
        'Getters and setters let you expose computed properties naturally.',
        'Keep state transitions inside explicit methods.'
      ],
      code: `class Wallet {
  #balance = 0;

  constructor(owner, initial = 0) {
    this.owner = owner;
    this.#balance = initial;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  get balance() {
    return this.#balance;
  }
}

const w = new Wallet("Ahmed", 500);
w.deposit(250);
console.log(\`\${w.owner}'s Balance: $\${w.balance}\`);`,
      tipEn: 'Prefer composition (combining small functions/objects) over deep inheritance trees.',
      tipAr: 'في جافاسكريبت، تجميع الكائنات الصغيرة (Composition) أفضل بكتير من الوراثة المتداخلة الطويلة.'
    },
    {
      id: 'js_l4',
      level: 4,
      title: 'Domain Track: Closures, State & Event-Driven Logic',
      en: 'Closures allow inner functions to remember variables from their outer lexical scope—this powers state management, debouncing, and custom hooks in modern frameworks.',
      ar: 'مفهوم الـ Closure هو سر قوة جافاسكريبت؛ بيخلي الدالة الداخلية تفتكر المتغيرات بتاعة الدالة الخارجية حتى بعد ما تنتهي، وده الأساس اللي مبني عليه React Hooks.',
      points: [
        'Closures create lightweight private state without needing classes.',
        'Used heavily in event listeners, memoization, and middleware.',
        'Always handle async errors with try/catch inside async functions.'
      ],
      code: `function createCounter(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    value: () => count
  };
}

const clicks = createCounter(10);
clicks.inc();
clicks.inc();
console.log("Counter Value:", clicks.value());`,
      tipEn: 'Understanding closures makes learning React, Vue, and Express.js 10x faster.',
      tipAr: 'فهمك للـ Closures كويس هيخليك تفهم React و Node.js أسرع بكتير.'
    },
    {
      id: 'js_l5',
      level: 5,
      title: 'Portfolio Architecture: Pub/Sub Event Bus Pattern',
      en: 'Large web applications decouple UI components using an Event Bus (Publish/Subscribe) pattern so modules communicate cleanly without tangled dependencies.',
      ar: 'في تطبيقات الويب الكبيرة، بنفصل المكونات عن بعض باستخدام نمط Pub/Sub (Event Bus) عشان كل جزء يشتغل باستقلالية ونظافة.',
      points: [
        'subscribe(event, handler) registers listeners dynamically.',
        'publish(event, payload) broadcasts state updates to all subscribers.',
        'Always return an unsubscribe cleanup function to prevent memory leaks.'
      ],
      code: `class EventBus {
  constructor() { this.events = {}; }
  on(evt, fn) {
    (this.events[evt] ||= []).push(fn);
  }
  emit(evt, data) {
    (this.events[evt] || []).forEach(fn => fn(data));
  }
}

const bus = new EventBus();
bus.on("order:created", o => console.log("Notify Warehouse:", o.id));
bus.emit("order:created", { id: "ORD-904" });`,
      tipEn: 'This exact architecture underpins Redux, Zustand, and Node.js EventEmitter.',
      tipAr: 'نفس الفكرة دي بالظبط هي اللي مبني عليها Redux و EventEmitter في Node.js.'
    }
  ],

  exercises: [
    {
      id: 'js_ex1',
      level: 1,
      type: 'code',
      title: 'Double & Filter Scores',
      promptEn: 'Filter numbers greater than 10 from [5, 12, 8, 20], double each remaining number, and log the resulting comma-separated string: 24,40',
      promptAr: 'فلتر الأرقام الأكبر من 10 من المصفوفة [5, 12, 8, 20]، اضرب كل رقم في 2، واطبع النتيجة مفصولة بفاصلة: 24,40',
      expectedOutput: '24,40',
      starterCode: `const nums = [5, 12, 8, 20];
// Use filter() and map(), then join(",")
const result = [];
console.log(result.join(","));`,
      hintEn: 'Chain nums.filter(n => n > 10).map(n => n * 2).join(",").',
      hintAr: 'اربط .filter(n => n > 10).map(n => n * 2).join(",") ورا بعض.'
    },
    {
      id: 'js_ex2',
      level: 2,
      type: 'bug',
      title: 'Fix the Reference & Scope Bug',
      promptEn: 'Fix the bug in this discount calculator so it prints exactly: Final: 180',
      promptAr: 'صلّح الغلطة في حاسبة الخصم عشان تطبع بالظبط: Final: 180',
      expectedOutput: 'Final: 180',
      starterCode: `function applyDiscount(price, pct) {
  const discount = price * (pct / 100);
  return price - discout; // Typo in variable name!
}

console.log("Final:", applyDiscount(200, 10));`,
      hintEn: 'Check the spelling of "discount" on line 3.',
      hintAr: 'راجع كتابة المتغير discount في السطر التالت.'
    },
    {
      id: 'js_ex3',
      level: 3,
      type: 'trace',
      title: 'Trace Strict vs Loose Equality',
      promptEn: 'What does console.log("10" === 10, "10" == 10) print?',
      promptAr: 'إيه الناتج اللي هيطبع من الكود ده؟',
      code: `console.log("10" === 10, "10" == 10);`,
      options: ['true true', 'false true', 'false false', 'true false'],
      correctIndex: 1,
      explainEn: '=== checks both type and value (string !== number -> false), whereas == coerces "10" to 10 (true).',
      explainAr: 'المعامل === بيفحص النوع والقيمة معاً فبيرجع false، بينما == بيحوّل النص لرقم فبيرجع true.'
    }
  ],

  projects: [
    {
      id: 'js_p1',
      level: 1,
      difficulty: 'Beginner',
      xp: 120,
      title: 'Smart Password Strength Auditor',
      briefEn: 'Write a security checker that evaluates password length, uppercase, numbers, and special characters and outputs a strength score + improvement tips.',
      briefAr: 'ابني أداة لفحص قوة كلمات المرور وتقييم وجود أرقام وحروف كبيرة ورموز مع اقتراحات لتحسين الأمان.',
      checklist: [
        'Check minimum length (>= 8 characters).',
        'Verify presence of uppercase letters, digits, and symbols using Regex.',
        'Classify password as Weak, Medium, or Strong.'
      ],
      hints: [
        { en: 'Use /[A-Z]/.test(pwd) and /[0-9]/.test(pwd) to test character classes.', ar: 'استخدم التعبيرات النمطية Regex زي /[0-9]/.test(pwd) للفحص.' }
      ],
      starterCode: `function auditPassword(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score >= 4 ? "Strong" : score >= 2 ? "Medium" : "Weak";
}

console.log("Audit:", auditPassword("Forge#2026"));`
    },
    {
      id: 'js_p2',
      level: 2,
      difficulty: 'Elementary',
      xp: 180,
      title: 'E-Commerce Shopping Cart Engine',
      briefEn: 'Implement a cart engine supporting add, remove, quantity update, coupon codes, and tax calculations using pure array operations.',
      briefAr: 'صمم محرك سلة تسوق يدعم إضافة وحذف المنتجات وتحديث الكميات وتطبيق كوبونات الخصم وحساب الضريبة.',
      checklist: [
        'Support adding items and merging quantities if the SKU already exists.',
        'Apply percentage coupon codes safely.',
        'Compute subtotal, VAT (14%), and grand total.'
      ],
      hints: [
        { en: 'Use Array.find() to check if an item ID already exists in the cart.', ar: 'استخدم find() للتأكد هل المنتج موجود بالفعل في السلة قبل إضافته.' }
      ],
      starterCode: `const cart = [
  { name: "Mechanical Keyboard", price: 85, qty: 1 },
  { name: "USB-C Hub", price: 30, qty: 2 }
];
const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0);
console.log("Subtotal:", subtotal, "| With 14% VAT:", (subtotal * 1.14).toFixed(2));`
    },
    {
      id: 'js_p3',
      level: 3,
      difficulty: 'Intermediate',
      xp: 250,
      title: 'Kanban Task Board State Engine',
      briefEn: 'Model a Trello-style board with Board and Task classes supporting column transitions (Todo -> Doing -> Done) and audit history.',
      briefAr: 'ابني محرك لوحة مهام (زي Trello) بكلاسات Board و Task مع نقل المهام بين الأعمدة وتسجيل تاريخ كل حركة.',
      checklist: [
        'Create Task class with id, title, status, and history array.',
        'Implement moveTask(id, newStatus) with valid status checks.',
        'Print tasks grouped by status column.'
      ],
      hints: [
        { en: 'Validate statuses against const VALID = ["todo", "doing", "done"].', ar: 'اعمل مصفوفة بالحالات المسموحة عشان تمنع أي حالة غلط.' }
      ],
      starterCode: `class TaskBoard {
  constructor() { this.tasks = []; }
  add(title) { this.tasks.push({ id: this.tasks.length + 1, title, status: "todo" }); }
  move(id, status) {
    const t = this.tasks.find(x => x.id === id);
    if (t) t.status = status;
  }
}
const board = new TaskBoard();
board.add("Design Dark UI");
board.move(1, "done");
console.log(board.tasks);`
    },
    {
      id: 'js_p4',
      level: 4,
      difficulty: 'Advanced',
      xp: 350,
      title: 'Mini Reactive State Store (Mini-Redux)',
      briefEn: 'Build your own reactive state manager with getState(), dispatch(action), and subscribe(listener)—the exact foundation behind modern JS frameworks.',
      briefAr: 'ابني نظام إدارة حالة (State Store) شبيه بـ Redux بنفسك عشان تفهم إزاي الفريم ووركس الحديثة بتشتغل من جوه.',
      checklist: [
        'Implement createStore(reducer, initialState) using closures.',
        'Notify all subscribed listeners whenever dispatch() updates state.',
        'Support unsubscribing cleanly.'
      ],
      hints: [
        { en: 'Keep listeners in a Set() so adding and deleting listeners is O(1).', ar: 'خزّن الـ Listeners داخل Set() عشان الإضافة والحذف يكونوا سريعين ومن غير تكرار.' }
      ],
      starterCode: `function createStore(reducer, initial) {
  let state = initial;
  const listeners = new Set();
  return {
    getState: () => state,
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    dispatch: (action) => { state = reducer(state, action); listeners.forEach(fn => fn(state)); }
  };
}
const store = createStore((s, a) => a.type === "INC" ? { count: s.count + 1 } : s, { count: 0 });
store.subscribe(s => console.log("State updated:", s));
store.dispatch({ type: "INC" });`
    },
    {
      id: 'js_p5',
      level: 5,
      difficulty: 'Portfolio',
      xp: 500,
      title: 'Client-Side Query Engine & Router Core',
      briefEn: 'Architect a framework-free SPA Router + Query Cache engine that matches dynamic URL params (e.g., /courses/:id) and caches responses.',
      briefAr: 'صمم نواة Router لتطبيقات الصفحة الواحدة (SPA) بتقرأ المتغيرات من الرابط مع نظام Cache جاهز للـ Portfolio.',
      checklist: [
        'Parse dynamic route patterns like /track/:lang/level/:num.',
        'Extract route params into a clean key-value object.',
        'Implement a 404 fallback handler.'
      ],
      hints: [
        { en: 'Convert :param segments into regex capture groups to match URLs dynamically.', ar: 'حوّل أجزاء الرابط اللي بتبدأ بـ : إلى Regex Groups عشان تستخرج القيم تلقائياً.' }
      ],
      starterCode: `function matchRoute(pattern, path) {
  const pParts = pattern.split("/");
  const uParts = path.split("/");
  if (pParts.length !== uParts.length) return null;
  const params = {};
  for (let i = 0; i < pParts.length; i++) {
    if (pParts[i].startsWith(":")) params[pParts[i].slice(1)] = uParts[i];
    else if (pParts[i] !== uParts[i]) return null;
  }
  return params;
}
console.log(matchRoute("/track/:lang/level/:lvl", "/track/javascript/level/5"));`
    }
  ],

  compare: {
    variables: `const name = "CodeForge";
let level = 5;
const pi = 3.14159;
const isActive = true;
console.log(\`\${name} L\${level}\`);`,
    loops: `for (let i = 1; i <= 3; i++) {
  console.log("Step", i);
}

const langs = ["JS", "Python", "Dart"];
for (const lang of langs) {
  console.log("->", lang);
}`,
    functions: `const calculateArea = (width, height = 10) => {
  return width * height;
};

console.log("Area:", calculateArea(5, 4));`,
    oop: `class Robot {
  constructor(name) {
    this.name = name;
  }
  status() {
    return \`Robot \${this.name} online\`;
  }
}
const bot = new Robot("Atlas");
console.log(bot.status());`,
    collections: `const scores = [85, 92, 78];
scores.push(99);

const user = { name: "Ahmed", role: "Engineer" };
console.log(scores, user.role);`
  }
});

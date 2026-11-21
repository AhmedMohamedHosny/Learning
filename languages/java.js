window.CodeForge.registerLanguage({
  id: 'java',
  name: 'Java',
  badge: 'JV',
  color: '#f97316',
  category: 'enterprise',
  fileName: 'Main.java',
  monacoLang: 'java',
  pistonLang: 'java',
  tagline: 'Enterprise-grade OOP powerhouse running banking backends, Spring Boot microservices, and Android systems.',
  useCases: ['Enterprise Backend', 'Spring Boot', 'Android', 'Big Data'],
  starterPlayground: `public class Main {
    public static void main(String[] args) {
        String[] tracks = {"OOP", "Collections", "Streams", "Spring Architecture"};
        System.out.println("CodeForge Java Runtime Ready!");
        for (int i = 0; i < tracks.length; i++) {
            System.out.println("  " + (i + 1) + ". " + tracks[i]);
        }
    }
}`,

  lessons: [
    {
      id: 'java_l1',
      level: 1,
      title: 'JVM Entry Point, Strong Types & Strings',
      en: 'Every Java file compiles to JVM bytecode. Your entry class must be named Main with public static void main(String[] args). Strings are immutable objects—always compare them using .equals(), not ==.',
      ar: 'أي كود Java بيتحول لـ Bytecode يشتغل على الـ JVM. لازم الكلاس الرئيسي يكون اسمه Main وجواه دالة main القياسية. ومقارنة النصوص بتتم بـ .equals() مش ==.',
      points: [
        'Primitive types: int, double, boolean, char; reference types: String, Arrays, Objects.',
        'Use System.out.printf() for formatted numbers and aligned columns.',
        'String comparison uses a.equals(b) to compare content instead of memory address.'
      ],
      code: `public class Main {
    public static void main(String[] args) {
        String service = "CodeForge-API";
        int uptimeDays = 365;
        double sla = 99.98;

        System.out.printf("%s | Uptime: %d days | SLA: %.2f%%%n", service, uptimeDays, sla);
    }
}`,
      tipEn: 'In Java, comparing two Strings with "==" checks object references, not text content—always use .equals().',
      tipAr: 'في Java مقارنة النصوص بـ == بتقارن العنوان في الذاكرة مش النص نفسه؛ استخدم .equals() دايماً.'
    },
    {
      id: 'java_l2',
      level: 2,
      title: 'Methods, ArrayList & HashMap Collections',
      en: 'The Java Collections Framework (ArrayList, HashMap, HashSet) replaces fixed arrays in real applications with type-safe Generics (<String>, <Integer>).',
      ar: 'مكتبة الـ Collections في Java زي ArrayList و HashMap هي اللي بتعتمد عليها كل المشاريع الحقيقية مع تحديد نوع البيانات بين قوسين < >.',
      points: [
        'Import collections from java.util.*.',
        'Generics use wrapper types (Integer, Double) rather than primitives.',
        'HashMap provides fast O(1) key-value lookup for caching and indexing.'
      ],
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Algorithms", 95);
        scores.put("Databases", 90);

        for (var entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
      tipEn: 'Use var (Java 10+) for local variables when the right-hand type is obvious, keeping code concise.',
      tipAr: 'تقدر تستخدم var للمتغيرات المحلية عشان الكود يكون أنظف وأقصر مع الحفاظ على قوة الأنواع.'
    },
    {
      id: 'java_l3',
      level: 3,
      title: 'OOP Mastery: Interfaces, Inheritance & Encapsulation',
      en: 'Java shines in enterprise architecture through Interfaces and Polymorphism—allowing you to swap implementations (e.g., Stripe vs PayPal) without changing caller code.',
      ar: 'قوة Java الحقيقية في الـ OOP والـ Interfaces؛ بتخليك تبني نظام مرن تقدر تبدّل فيه بوابة الدفع أو قاعدة البيانات من غير ما تعدل باقي المشروع.',
      points: [
        'Keep fields private and expose behavior via public methods.',
        'Interfaces define contracts (what a class can do) without tight coupling.',
        'Use @Override annotation to prevent silent signature typos.'
      ],
      code: `interface Notifier {
    void send(String msg);
}

class EmailNotifier implements Notifier {
    @Override
    public void send(String msg) {
        System.out.println("[EMAIL] " + msg);
    }
}

public class Main {
    public static void main(String[] args) {
        Notifier n = new EmailNotifier();
        n.send("Deployment succeeded!");
    }
}`,
      tipEn: 'Program to an Interface (List<String> list = new ArrayList<>()) rather than a concrete class.',
      tipAr: 'قاعدة ذهبية في Java: عرّف المتغير بنوع الـ Interface (مثل List) عشان تغير التنفيذ بسهولة مستقبلاً.'
    },
    {
      id: 'java_l4',
      level: 4,
      title: 'Domain Track: Java Streams & Lambdas',
      en: 'Modern Java backend engineering uses the Stream API to filter, map, sort, and aggregate collections declaratively with clean lambda expressions.',
      ar: 'في شغل الـ Backend الحديث بـ Java، مكتبة Streams والـ Lambdas بتخليك تفلتر وتجمع البيانات بسطرين نضاف بدل Loops طويلة.',
      points: [
        'stream().filter(...).map(...).toList() builds clean data pipelines.',
        'Method references (System.out::println) remove boilerplate.',
        'Optional<T> eliminates NullPointerException crashes.'
      ],
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> prices = List.of(40, 120, 85, 210, 30);
        int highValueSum = prices.stream()
            .filter(p -> p >= 80)
            .mapToInt(Integer::intValue)
            .sum();

        System.out.println("High-Value Orders Total: $" + highValueSum);
    }
}`,
      tipEn: 'Wrap potentially missing lookup results in Optional<T> instead of returning raw null.',
      tipAr: 'استخدم Optional<T> بدل ما ترجّع null عشان تتجنب أشهر خطأ في Java وهو NullPointerException.'
    },
    {
      id: 'java_l5',
      level: 5,
      title: 'Portfolio Architecture: Generic Repository Pattern',
      en: 'Enterprise Spring Boot services organize persistence behind a Generic Repository interface so business logic stays decoupled and fully unit-testable.',
      ar: 'في أنظمة Spring Boot الاحترافية بنستخدم Generic Repository عشان نفصل قواعد البيانات عن منطق المشروع ويسهل اختباره.',
      points: [
        'Generic classes (class Repository<T>) reuse CRUD logic across all entities.',
        'Clean layered separation: Controller -> Service -> Repository.',
        'Ideal pattern to showcase in backend GitHub repositories.'
      ],
      code: `import java.util.*;

class InMemoryRepo<T> {
    private final Map<String, T> store = new LinkedHashMap<>();
    public void save(String id, T entity) { store.put(id, entity); }
    public T findById(String id) { return store.get(id); }
    public int count() { return store.size(); }
}

public class Main {
    public static void main(String[] args) {
        InMemoryRepo<String> users = new InMemoryRepo<>();
        users.save("U1", "Ahmed");
        users.save("U2", "Mona");
        System.out.println("Found U1: " + users.findById("U1") + " | Total: " + users.count());
    }
}`,
      tipEn: 'Keeping repositories interface-driven lets you swap In-Memory storage for PostgreSQL in minutes.',
      tipAr: 'تصميم الـ Repository بـ Interface بيخليك تبدل التخزين المؤقت بقاعدة بيانات حقيقية في دقائق.'
    }
  ],

  exercises: [
    {
      id: 'java_ex1',
      level: 1,
      type: 'code',
      title: 'Count Passing Grades',
      promptEn: 'Count how many grades in {55, 80, 92, 48, 75} are >= 60 and print only: Passed: 3',
      promptAr: 'احسب كام درجة في المصفوفة {55, 80, 92, 48, 75} أكبر من أو تساوي 60 واطبع فقط: Passed: 3',
      expectedOutput: 'Passed: 3',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] grades = {55, 80, 92, 48, 75};
        int count = 0;
        // Write your loop here

        System.out.println("Passed: " + count);
    }
}`,
      hintEn: 'Use an enhanced for loop: for (int g : grades) { if (g >= 60) count++; }',
      hintAr: 'استخدم for (int g : grades) وزوّد count لما تكون g >= 60.'
    },
    {
      id: 'java_ex2',
      level: 2,
      type: 'bug',
      title: 'Fix the Java Type & Semicolon Bug',
      promptEn: 'Fix the compilation errors so this program prints: Result: 30',
      promptAr: 'صلّح أخطاء الترجمة في كود Java ده عشان يطبع: Result: 30',
      expectedOutput: 'Result: 30',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int x = "10"; // Bug: String assigned to int!
        int y = 20
        System.out.println("Result: " + (x + y));
    }
}`,
      hintEn: 'Change "10" to integer 10 and add a semicolon after int y = 20.',
      hintAr: 'حوّل "10" إلى رقم صحيح 10 وضيف الفاصلة المنقوطة بعد int y = 20.'
    },
    {
      id: 'java_ex3',
      level: 3,
      type: 'trace',
      title: 'Trace String Concatenation Order',
      promptEn: 'What does System.out.println("Sum: " + 5 + 3); output in Java?',
      promptAr: 'إيه الناتج اللي هيطبعه السطر ده في لغة Java؟',
      code: `System.out.println("Sum: " + 5 + 3);`,
      options: ['Sum: 8', 'Sum: 53', 'Compile Error', 'Sum: 5 3'],
      correctIndex: 1,
      explainEn: 'Evaluation runs left-to-right: "Sum: " + 5 produces "Sum: 5", then + 3 concatenates to "Sum: 53". Wrap (5 + 3) in parentheses to add mathematically.',
      explainAr: 'التنفيذ بيمشي من الشمال لليمين: النص + 5 بيبقى نص "Sum: 5" وبعدها + 3 بيتلزق جنبه فيبقى "Sum: 53". للجمع لازم أقواس (5 + 3).'
    }
  ],

  projects: [
    {
      id: 'java_p1',
      level: 1,
      difficulty: 'Beginner',
      xp: 120,
      title: 'ATM Cash Dispenser Simulator',
      briefEn: 'Calculate the optimal breakdown of a withdrawal amount into 200, 100, 50, and 20 currency notes with balance validation.',
      briefAr: 'صمم محاكي ماكينة صراف آلي يحسب أقل عدد من الفئات النقدية (200، 100، 50، 20) مع فحص الرصيد.',
      checklist: [
        'Validate that requested amount is positive and a multiple of 20.',
        'Use integer division (/) and modulo (%) for note breakdown.',
        'Print a formatted transaction receipt.'
      ],
      hints: [
        { en: 'Store notes in int[] notes = {200, 100, 50, 20}; and iterate through them.', ar: 'حط الفئات في مصفوفة ولف عليهم بالقسمة وباقي القسمة (%).' }
      ],
      starterCode: `public class Main {
    public static void main(String[] args) {
        int amount = 570;
        int[] notes = {200, 100, 50, 20};
        for (int note : notes) {
            int count = amount / note;
            amount %= note;
            if (count > 0) System.out.println(note + " x " + count);
        }
    }
}`
    },
    {
      id: 'java_p2',
      level: 2,
      difficulty: 'Elementary',
      xp: 180,
      title: 'Library Catalog & Borrowing Manager',
      briefEn: 'Use ArrayList and HashMap to track books, issue loans to students, and search titles case-insensitively.',
      briefAr: 'استخدم ArrayList و HashMap لإدارة مكتبة وإعارة الكتب والبحث بالعنوان.',
      checklist: [
        'Store books with ISBN key and availability status.',
        'Prevent borrowing an already checked-out book.',
        'Display all available books.'
      ],
      hints: [
        { en: 'Use title.toLowerCase().contains(query.toLowerCase()) for flexible search.', ar: 'حوّل النص لـ toLowerCase قبل البحث عشان ميتأثرش بالحروف الكبيرة والصغيرة.' }
      ],
      starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<String, Boolean> books = new LinkedHashMap<>();
        books.put("Clean Code", true);
        books.put("Effective Java", false);
        books.forEach((k, avail) -> System.out.println(k + " -> " + (avail ? "Available" : "Borrowed")));
    }
}`
    },
    {
      id: 'java_p3',
      level: 3,
      difficulty: 'Intermediate',
      xp: 250,
      title: 'Multi-Gateway Payment Processor (OOP)',
      briefEn: 'Design a PaymentGateway interface with CreditCardPayment and WalletPayment classes demonstrating true polymorphism.',
      briefAr: 'صمم نظام معالجة مدفوعات باستخدام PaymentGateway Interface وكلاسات متعددة لوسائل الدفع.',
      checklist: [
        'Create PaymentGateway interface with boolean pay(double amount).',
        'Implement two concrete gateways with distinct fee percentages.',
        'Process a list of payments polymorphically.'
      ],
      hints: [
        { en: 'Accept PaymentGateway in your CheckoutService so new gateways require zero changes to checkout logic.', ar: 'خلّي دالة الدفع تستقبل نوع الـ Interface مش نوع الكلاس المحدد.' }
      ],
      starterCode: `interface PaymentGateway { void pay(double amount); }
class CardGateway implements PaymentGateway {
    public void pay(double amount) { System.out.printf("Charged $%.2f via Card%n", amount * 1.02); }
}
public class Main {
    public static void main(String[] args) {
        PaymentGateway gw = new CardGateway();
        gw.pay(100);
    }
}`
    },
    {
      id: 'java_p4',
      level: 4,
      difficulty: 'Advanced',
      xp: 350,
      title: 'Sales Analytics Engine with Java Streams',
      briefEn: 'Process transaction objects with Java Streams to group revenue by region, find top performers, and compute averages.',
      briefAr: 'ابني محرك تحليلات مبيعات باستخدام Java Streams لتجميع الإيرادات حسب المنطقة واستخراج أعلى المنتجات مبيعاً.',
      checklist: [
        'Model Sale(String region, double amount) record/class.',
        'Use Collectors.groupingBy and Collectors.summingDouble.',
        'Sort regions from highest to lowest revenue.'
      ],
      hints: [
        { en: 'Collectors.groupingBy(s -> s.region, Collectors.summingDouble(s -> s.amount)) groups and sums in one pass.', ar: 'Collectors.groupingBy بتجمع وتلخص المبيعات حسب المنطقة في خطوة واحدة.' }
      ],
      starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    static class Sale { String region; double amt; Sale(String r, double a){region=r;amt=a;} }
    public static void main(String[] args) {
        var sales = List.of(new Sale("Cairo", 500), new Sale("Alex", 320), new Sale("Cairo", 450));
        var byRegion = sales.stream().collect(Collectors.groupingBy(s -> s.region, Collectors.summingDouble(s -> s.amt)));
        System.out.println(byRegion);
    }
}`
    },
    {
      id: 'java_p5',
      level: 5,
      difficulty: 'Portfolio',
      xp: 500,
      title: 'Order Fulfillment Service Architecture',
      briefEn: 'Combine Repository, Service, Strategy, and Custom Exceptions into a clean enterprise Java backend core ready for Spring Boot migration.',
      briefAr: 'ادمج الـ Repository والـ Service والـ Custom Exceptions في نواة Backend احترافية جاهزة للتحويل إلى Spring Boot.',
      checklist: [
        'Create custom InsufficientStockException.',
        'Build OrderService with stock deduction and rollback safety.',
        'Demonstrate both a successful order and a caught exception cleanly.'
      ],
      hints: [
        { en: 'Extend RuntimeException for clean unchecked business-rule exceptions.', ar: 'ورّث الاستثناءات المخصصة من RuntimeException عشان الكود يكون أنظف.' }
      ],
      starterCode: `class StockException extends RuntimeException { StockException(String m){ super(m); } }

public class Main {
    public static void main(String[] args) {
        int stock = 2, requested = 5;
        try {
            if (requested > stock) throw new StockException("Only " + stock + " units remaining!");
        } catch (StockException e) {
            System.out.println("Handled gracefully: " + e.getMessage());
        }
    }
}`
    }
  ],

  compare: {
    variables: `public class Main {
    public static void main(String[] args) {
        String name = "CodeForge";
        int level = 5;
        double pi = 3.14159;
        boolean isActive = true;
        System.out.println(name + " L" + level);
    }
}`,
    loops: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) System.out.println("Step " + i);
        String[] langs = {"Java", "Python", "Dart"};
        for (String l : langs) System.out.println("-> " + l);
    }
}`,
    functions: `public class Main {
    static double calculateArea(double w, double h) {
        return w * h;
    }
    public static void main(String[] args) {
        System.out.println("Area: " + calculateArea(5, 4));
    }
}`,
    oop: `class Robot {
    private String name;
    Robot(String name) { this.name = name; }
    String status() { return "Robot " + name + " online"; }
}
public class Main {
    public static void main(String[] args) {
        System.out.println(new Robot("Atlas").status());
    }
}`,
    collections: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(List.of(85, 92, 78));
        scores.add(99);
        Map<String, String> user = Map.of("role", "Engineer");
        System.out.println(scores + " " + user.get("role"));
    }
}`
  }
});

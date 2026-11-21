/**
 * CodeForge Smart Bilingual Error Diagnostic Engine
 * Analyzes compiler & runtime errors across Python, JS, C++, C, Java, and Dart.
 * Always outputs: Raw Error + English Market Diagnosis & Fix + Arabic Explanation & Fix.
 */
window.CodeForge.ErrorEngine = (function () {
  const RULES = [
    // --- Missing Semicolon (C, C++, Java, Dart, JS) ---
    {
      match: /expected\s*['"]?;['"]?|missing\s+semicolon|Expected to find ';'/i,
      title: 'Missing Semicolon (;)',
      enCause: 'A statement is missing its terminating semicolon (;). C-family compilers require semicolons to separate statements.',
      enFix: 'Check the indicated line (and the line immediately above it) and add a ";" at the end of the statement.',
      arCause: 'نسيت تحط الفاصلة المنقوطة (;) في نهاية السطر البرمجي. لغات مثل C و C++ و Java و Dart بتشترط وجود (;) في نهاية كل أمر.',
      arFix: 'راجع السطر المذكور (أو السطر اللي قبله مباشرة) وأضف علامة (;) في نهايته.'
    },
    // --- Python IndentationError ---
    {
      match: /IndentationError|TabError|expected an indented block|unexpected indent/i,
      title: 'Indentation Error',
      enCause: 'Python uses whitespace indentation to define code blocks (inside if, for, def, class). Spaces and tabs are misaligned or missing.',
      enFix: 'Use 4 consistent spaces inside every block after a colon (:) and avoid mixing Tabs with Spaces.',
      arCause: 'لغة بايثون بتعتمد على المسافات البادئة (Indentation) لتحديد بداية ونهاية البلوك البرمجي (داخل if أو for أو def). هنا المسافات مش متناسقة أو ناقصة.',
      arFix: 'استخدم 4 مسافات ثابتة بعد أي سطر ينتهي بنقطتين (:) وتأكد إنك مش خالط بين زرار Tab و Space.'
    },
    // --- Python Missing Colon ---
    {
      match: /expected ':'|SyntaxError.*invalid syntax/i,
      langs: ['python'],
      title: 'Python Syntax Error',
      enCause: 'Python could not parse this statement. Common causes: missing colon (:) after if/for/while/def, unclosed quotes/parentheses, or using "=" instead of "==" in a condition.',
      enFix: 'Inspect the line pointed to by the caret (^). Verify colons (:), matching brackets (), and valid Python keywords.',
      arCause: 'بايثون مش قادر يفهم صياغة السطر ده. أشهر الأسباب: نسيان النقطتين (:) بعد if أو for أو def، أو قوس/علامة تنصيص مش مقفولة، أو كتابة (=) بدل (==) في الشرط.',
      arFix: 'بص على السطر اللي بيشاور عليه المؤشر (^) وتأكد من النقطتين (:) والأقواس وعلامات التنصيص.'
    },
    // --- NameError / Undeclared Variable / ReferenceError / Cannot find symbol ---
    {
      match: /NameError:\s*name\s*'([^']+)'\s*is not defined|ReferenceError:\s*(\w+)\s*is not defined|'([^']+)'\s*was not declared in this scope|undeclared|cannot find symbol|Undefined name '([^']+)'/i,
      title: 'Undefined Identifier / Symbol Not Found',
      enCause: (m) => {
        const sym = m[1] || m[2] || m[3] || m[4] || 'variable/function';
        return `The identifier "${sym}" is used before being declared, misspelled, or out of scope (remember: programming languages are case-sensitive).`;
      },
      enFix: 'Check spelling and capitalization, declare the variable before using it, or import the required library/header.',
      arCause: (m) => {
        const sym = m[1] || m[2] || m[3] || m[4] || 'المتغير أو الدالة';
        return `الاسم "${sym}" مش متعرّف في النطاق الحالي — غالباً فيه غلطة إملائية في الحروف (الكبير والصغير بيفرق)، أو استخدمته قبل ما تعرّفه، أو نسيت تعمل include/import للمكتبة بتاعته.`;
      },
      arFix: 'راجع كتابة الاسم (Capital/Small)، وتأكد إنك عرّفت المتغير قبل استخدامه أو استدعيت المكتبة المطلوبة.'
    },
    // --- Missing std:: in C++ ---
    {
      match: /'cout' was not declared|'cin' was not declared|'string' was not declared|'vector' was not declared/i,
      title: 'Missing std:: Namespace or Header',
      enCause: 'Standard C++ identifiers like cout, cin, string, or vector live inside the "std" namespace and require their respective #include headers.',
      enFix: 'Add "#include <iostream>" (or <string>/<vector>) at the top, and either write "std::cout" or add "using namespace std;".',
      arCause: 'عناصر C++ القياسية زي cout و cin و string موجودة جوه الـ namespace المسمى std وبتحتاج المكتبة بتاعتها فوق في الملف.',
      arFix: 'أضف #include <iostream> في أول الكود، واستخدم std::cout أو اكتب using namespace std; بعد الـ include.'
    },
    // --- Type Mismatch / TypeError ---
    {
      match: /TypeError|incompatible types|cannot convert|can't be assigned to the parameter type|invalid operands|unsupported operand type/i,
      title: 'Type Mismatch / Type Error',
      enCause: 'An operation or assignment received an incompatible data type (for example, adding a string to an integer or passing a double where an int is expected).',
      enFix: 'Convert values explicitly (e.g., int(), str(), Number(), Integer.parseInt()) or align the variable data type.',
      arCause: 'في تعارض في أنواع البيانات (Type Mismatch) — مثلاً حاولت تجمع نص (String) مع رقم (Integer) مباشرة، أو بعتّ نوع بيانات مختلف عن اللي الدالة أو المتغير مستنيه.',
      arFix: 'حوّل نوع البيانات بشكل صريح قبل العملية (مثل int() أو str() أو Number()) أو وحّد نوع المتغير.'
    },
    // --- Index Out of Bounds ---
    {
      match: /IndexError|ArrayIndexOutOfBoundsException|RangeError.*Index|out_of_range|index out of range/i,
      title: 'Index Out of Bounds',
      enCause: 'Your code attempted to access an array/list index that does not exist. Remember that indexing starts at 0 and ends at length - 1.',
      enFix: 'Change loop conditions from "<= length" to "< length", and verify the collection is not empty before indexing.',
      arCause: 'الكود حاول يوصل لعنصر في مصفوفة (Array/List) برقم فهرس (Index) خارج حدودها. افتكر دايماً إن الترقيم بيبدأ من 0 وآخر عنصر هو (الطول - 1).',
      arFix: 'تأكد إن شرط اللوب بيستخدم (< الطول) مش (<= الطول)، وتأكد إن المصفوفة مش فاضية قبل ما تقرأ منها.'
    },
    // --- Division by Zero ---
    {
      match: /ZeroDivisionError|ArithmeticException.*\/ by zero|division by zero/i,
      title: 'Division by Zero',
      enCause: 'Your program attempted to divide a number by zero, which is mathematically undefined and triggers a runtime crash.',
      enFix: 'Guard every division with an "if (divisor != 0)" check before performing the calculation.',
      arCause: 'البرنامج حاول يقسم رقم على صفر، وده بيسبب توقف فوري للبرنامج وقت التشغيل (Runtime Error).',
      arFix: 'حط شرط if يتأكد إن المقسوم عليه لا يساوي صفر قبل تنفيذ عملية القسمة.'
    },
    // --- Null / Undefined Access ---
    {
      match: /NullPointerException|Cannot read propert(?:y|ies) of (?:undefined|null)|Null check operator used on a null value/i,
      title: 'Null / Undefined Reference Error',
      enCause: 'You tried to call a method or read a property on a null/undefined value.',
      enFix: 'Initialize the object before accessing it, or use safe null-checking (e.g., "?." optional chaining or "if (obj != null)").',
      arCause: 'حاولت تستدعي دالة أو تقرأ خاصية من متغير قيمته فاضية (null أو undefined).',
      arFix: 'تأكد إنك أنشأت الكائن وأعطيته قيمة قبل استخدامه، أو استخدم فحص أمان زي if (x != null) أو معامل (?.) .'
    },
    // --- Java Class Name / Main Method ---
    {
      match: /class\s+(\w+)\s+is public, should be declared in a file named|Main method not found/i,
      title: 'Java Entry Point / Public Class Mismatch',
      enCause: 'In Java, the public class name must match the file name ("Main"), and execution requires "public static void main(String[] args)".',
      enFix: 'Keep your entry class named "public class Main" and include the exact main method signature.',
      arCause: 'في لغة Java لازم اسم الـ public class يطابق اسم الملف (Main)، ولازم يحتوي على دالة البداية بالصيغة الصحيحة public static void main(String[] args).',
      arFix: 'خلّي اسم الكلاس الرئيسي Main وتأكد من كتابة دالة main بالصيغة القياسية.'
    },
    // --- Unclosed Brackets / Quotes / Unexpected EOF ---
    {
      match: /Unexpected end of input|unterminated string|EOL while scanning|expected '\}'|expected '\)'|missing '\}'|Unclosed/i,
      title: 'Unclosed Bracket, Brace, or String',
      enCause: 'A parenthesis "(", curly brace "{", square bracket "[", or string quote was opened and never closed.',
      enFix: 'Count matching pairs of (), {}, [], and quotes from top to bottom—especially at the end of functions and loops.',
      arCause: 'فتحت قوس ( أو { أو [ أو علامة تنصيص (" أو \') ونسيت تقفلها.',
      arFix: 'راجع كل الأقواس وعلامات التنصيص المفتوحة وتأكد إن لكل بداية نهاية مطابقة ليها.'
    },
    // --- Generic JavaScript SyntaxError ---
    {
      match: /SyntaxError:\s*(.+)/i,
      title: 'Syntax Error',
      enCause: (m) => `JavaScript encountered unexpected syntax: "${m[1]}".`,
      enFix: 'Check for typos in keywords, missing commas in objects/arrays, or unclosed brackets on the highlighted line.',
      arCause: 'فيه غلطة في قواعد كتابة الكود (Syntax Error) — غالباً كلمة محجوزة مكتوبة غلط، فاصلة ناقصة، أو قوس زيادة/ناقص.',
      arFix: 'راجع السطر المحدد وتأكد من الأقواس والفواصل وأسماء الأوامر.'
    }
  ];

  function extractLineNumber(rawError, langId) {
    const patterns = [
      /line\s+(\d+)/i,
      /:(\d+):\d+/,
      /\.java:(\d+)/i,
      /\.dart:(\d+)/i,
      /<anonymous>:(\d+):/i
    ];
    for (const p of patterns) {
      const m = rawError.match(p);
      if (m && m[1]) {
        const num = parseInt(m[1], 10);
        if (num > 0 && num < 10000) return num;
      }
    }
    return null;
  }

  function analyze(langId, rawError) {
    const cleanRaw = String(rawError || '').trim();
    const line = extractLineNumber(cleanRaw, langId);

    for (const rule of RULES) {
      if (rule.langs && !rule.langs.includes(langId)) continue;
      const m = cleanRaw.match(rule.match);
      if (m) {
        return {
          title: rule.title,
          line,
          raw: cleanRaw,
          enCause: typeof rule.enCause === 'function' ? rule.enCause(m) : rule.enCause,
          enFix: typeof rule.enFix === 'function' ? rule.enFix(m) : rule.enFix,
          arCause: typeof rule.arCause === 'function' ? rule.arCause(m) : rule.arCause,
          arFix: typeof rule.arFix === 'function' ? rule.arFix(m) : rule.arFix
        };
      }
    }

    // Smart Fallback Diagnosis for Unmatched Errors
    return {
      title: 'Compiler / Runtime Error',
      line,
      raw: cleanRaw,
      enCause: 'The compiler or runtime rejected this code during execution. Inspect the exact message and line number above.',
      enFix: 'Read the first error line carefully (later errors are often cascading effects), check syntax, types, and variable names.',
      arCause: 'المترجم (Compiler) أو بيئة التشغيل أوقفت الكود بسبب خطأ في الصياغة أو وقت التشغيل. اقرأ أول سطر في الرسالة فوق عشان تحدد السبب بدقة.',
      arFix: 'ابدأ دايماً بتصليح أول خطأ بيظهرلك في السطر المحدد (لأن باقي الأخطاء غالباً بتختفي بمجرد تصليحه)، وتأكد من الأقواس وأنواع البيانات.'
    };
  }

  return { analyze };
})();

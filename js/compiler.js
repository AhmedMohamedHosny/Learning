/**
 * CodeForge Execution Engine
 * - JavaScript: Instant in-browser sandboxed execution with captured console & line numbers.
 * - Python, C++, C, Java, Dart: Real compilation & execution via Piston API (with graceful fallback).
 */
window.CodeForge.Compiler = (function () {
  const PISTON_EXECUTE_URL = 'https://emkc.org/api/v2/piston/execute';

  // Local Sandboxed JavaScript Runner
  function runJavaScriptLocally(code, stdin) {
    const start = performance.now();
    const logs = [];
    const stdinLines = (stdin || '').split('\n');
    let stdinIdx = 0;

    const customConsole = {
      log: (...args) => logs.push(args.map(formatJsVal).join(' ')),
      info: (...args) => logs.push(args.map(formatJsVal).join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.map(formatJsVal).join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.map(formatJsVal).join(' '))
    };

    const promptFn = () => (stdinIdx < stdinLines.length ? stdinLines[stdinIdx++] : '');

    try {
      // Check syntax & execute inside isolated function scope
      const fn = new Function('console', 'prompt', `"use strict";\n${code}`);
      fn(customConsole, promptFn);
      const elapsed = Math.round(performance.now() - start);
      return {
        ok: true,
        stdout: logs.join('\n'),
        stderr: '',
        elapsedMs: elapsed,
        engine: 'Local JS Sandbox'
      };
    } catch (err) {
      const elapsed = Math.round(performance.now() - start);
      let lineHint = '';
      if (err.stack) {
        const m = err.stack.match(/<anonymous>:(\d+):(\d+)/);
        if (m) {
          // Offset by 2 lines due to Function wrapper + "use strict"
          const adjustedLine = Math.max(1, parseInt(m[1], 10) - 2);
          lineHint = ` (at line ${adjustedLine})`;
        }
      }
      return {
        ok: false,
        stdout: logs.join('\n'),
        stderr: `${err.name}: ${err.message}${lineHint}`,
        elapsedMs: elapsed,
        engine: 'Local JS Sandbox'
      };
    }
  }

  function formatJsVal(v) {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'object') {
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    }
    return String(v);
  }

  // Remote Compiler Runner (Piston API v2)
  async function runViaPiston(langDef, code, stdin) {
    const start = performance.now();
    const payload = {
      language: langDef.pistonLang,
      version: '*',
      files: [{ name: langDef.fileName, content: code }],
      stdin: stdin || ''
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);

    try {
      const res = await fetch(PISTON_EXECUTE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errTxt = await res.text().catch(() => '');
        throw new Error(`Compiler API HTTP ${res.status}${errTxt ? ': ' + errTxt : ''}`);
      }

      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);

      // Check compile stage first (for C, C++, Java, Dart)
      if (data.compile && data.compile.code !== 0) {
        return {
          ok: false,
          stdout: data.compile.stdout || '',
          stderr: data.compile.stderr || data.compile.output || 'Compilation failed.',
          elapsedMs: elapsed,
          engine: `Piston (${data.language} ${data.version})`
        };
      }

      const run = data.run || {};
      const hasError = run.code !== 0 || (run.stderr && run.stderr.trim().length > 0 && !run.stdout);
      return {
        ok: !hasError,
        stdout: run.stdout || '',
        stderr: run.stderr || '',
        elapsedMs: elapsed,
        engine: `Piston (${data.language} ${data.version})`
      };
    } catch (err) {
      clearTimeout(timeoutId);
      const elapsed = Math.round(performance.now() - start);
      const isOffline = !navigator.onLine || err.name === 'AbortError' || /Failed to fetch/i.test(err.message);
      return {
        ok: false,
        stdout: '',
        stderr: isOffline
          ? `Network / Compiler Service Unavailable: Could not reach the cloud compiler (${err.message}).\nNote: JavaScript runs 100% offline locally, while ${langDef.name} requires an active internet connection to compile.`
          : err.message,
        elapsedMs: elapsed,
        engine: 'Compiler Connection'
      };
    }
  }

  async function execute(langId, code, stdin = '') {
    const langDef = window.CodeForge.getLanguage(langId);
    if (!langDef) {
      return { ok: false, stdout: '', stderr: `Unknown language: ${langId}`, elapsedMs: 0 };
    }

    if (langId === 'javascript') {
      return runJavaScriptLocally(code, stdin);
    }

    return await runViaPiston(langDef, code, stdin);
  }

  return { execute };
})();

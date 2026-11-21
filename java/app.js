/**
 * CodeForge Interactive UI Controller
 * Manages Dashboard, Resizable Split-Screen IDE (Monaco + Fallback),
 * 5-Level Curriculum, 3 Exercise Modes, Level-Based Projects,
 * Bilingual Error Inspector, Language Bridge, and Playground.
 */
(function () {
  const CF = window.CodeForge;

  // App UI State
  let activeView = 'dashboard';
  let activeLangId = CF.getState().lastLang || 'python';
  let activeLevel = 1;
  let activeTab = 'learn'; // 'learn' | 'exercises' | 'projects'
  let activeExercise = null;
  let activeFilter = 'all';
  let activeCompareConcept = 'variables';

  // Editor State
  let monacoEditor = null;
  let monacoReady = false;
  let monacoDecorations = [];
  let currentFontSize = 14;
  let currentStarterCode = '';

  // DOM References
  const views = {
    dashboard: document.getElementById('dashboardView'),
    workspace: document.getElementById('workspaceView'),
    compare: document.getElementById('compareView'),
    playground: document.getElementById('playgroundView')
  };

  const els = {
    brandHomeBtn: document.getElementById('brandHomeBtn'),
    navLinks: document.querySelectorAll('.nav-link'),
    globalRankLabel: document.getElementById('globalRankLabel'),
    globalXpLabel: document.getElementById('globalXpLabel'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),

    // Dashboard
    statLangCount: document.getElementById('statLangCount'),
    statLessonsDone: document.getElementById('statLessonsDone'),
    statChallengesDone: document.getElementById('statChallengesDone'),
    statProjectsCount: document.getElementById('statProjectsCount'),
    langSearchInput: document.getElementById('langSearchInput'),
    trackFilterPills: document.getElementById('trackFilterPills'),
    languageCardsGrid: document.getElementById('languageCardsGrid'),

    // Workspace
    wsBackBtn: document.getElementById('wsBackBtn'),
    wsLangDot: document.getElementById('wsLangDot'),
    wsLangSelect: document.getElementById('wsLangSelect'),
    wsLevelBadge: document.getElementById('wsLevelBadge'),
    wsTabs: document.querySelectorAll('.ws-tab'),
    wsProgressText: document.getElementById('wsProgressText'),
    wsProgressFill: document.getElementById('wsProgressFill'),
    levelStrip: document.getElementById('levelStrip'),
    leftPanel: document.getElementById('leftPanel'),
    leftPanelContent: document.getElementById('leftPanelContent'),
    rightPanel: document.getElementById('rightPanel'),
    splitContainer: document.getElementById('splitContainer'),
    resizerV: document.getElementById('resizerV'),
    resizerH: document.getElementById('resizerH'),

    // Editor
    editorFileDot: document.getElementById('editorFileDot'),
    editorFileName: document.getElementById('editorFileName'),
    editorEngineTag: document.getElementById('editorEngineTag'),
    fontDecBtn: document.getElementById('fontDecBtn'),
    fontIncBtn: document.getElementById('fontIncBtn'),
    fontSizeDisplay: document.getElementById('fontSizeDisplay'),
    resetCodeBtn: document.getElementById('resetCodeBtn'),
    fullscreenIdeBtn: document.getElementById('fullscreenIdeBtn'),
    testCodeBtn: document.getElementById('testCodeBtn'),
    runCodeBtn: document.getElementById('runCodeBtn'),
    monacoContainer: document.getElementById('monacoContainer'),
    fallbackEditor: document.getElementById('fallbackEditor'),

    // Console
    consolePanel: document.getElementById('consolePanel'),
    consoleTabs: document.querySelectorAll('.console-tab'),
    consoleStatusDot: document.getElementById('consoleStatusDot'),
    errorCountBadge: document.getElementById('errorCountBadge'),
    execTimeLabel: document.getElementById('execTimeLabel'),
    clearConsoleBtn: document.getElementById('clearConsoleBtn'),
    consoleOutputPane: document.getElementById('consoleOutputPane'),
    consoleDiagPane: document.getElementById('consoleDiagPane'),
    consoleStdinPane: document.getElementById('consoleStdinPane'),
    stdinInput: document.getElementById('stdinInput'),

    // Compare
    compareLangA: document.getElementById('compareLangA'),
    compareLangB: document.getElementById('compareLangB'),
    compareConceptPills: document.getElementById('compareConceptPills'),
    compareTitleA: document.getElementById('compareTitleA'),
    compareTitleB: document.getElementById('compareTitleB'),
    compareCodeA: document.getElementById('compareCodeA'),
    compareCodeB: document.getElementById('compareCodeB'),
    openAInPlayground: document.getElementById('openAInPlayground'),
    openBInPlayground: document.getElementById('openBInPlayground'),
    compareInsightBox: document.getElementById('compareInsightBox'),

    // Playground
    pgLangSelect: document.getElementById('pgLangSelect'),
    pgLoadStarterBtn: document.getElementById('pgLoadStarterBtn'),
    pgRunBtn: document.getElementById('pgRunBtn'),
    pgEditor: document.getElementById('pgEditor'),
    pgOutput: document.getElementById('pgOutput'),
    pgTimeLabel: document.getElementById('pgTimeLabel'),

    toastContainer: document.getElementById('toastContainer')
  };

  // ============================================================================
  // INIT
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    populateLanguageSelects();
    initMonacoOrFallback();
    initResizers();
    bindEvents();
    updateGlobalHeader();
    renderDashboard();
    initCompareView();
    initPlaygroundView();
  });

  function populateLanguageSelects() {
    const langs = CF.getAllLanguages();
    [els.wsLangSelect, els.compareLangA, els.compareLangB, els.pgLangSelect].forEach((sel) => {
      sel.innerHTML = langs.map((l) => `<option value="${l.id}">${l.name}</option>`).join('');
    });
    els.wsLangSelect.value = activeLangId;
    els.compareLangA.value = langs[0]?.id || 'python';
    els.compareLangB.value = langs[2]?.id || langs[1]?.id || 'cpp';
    els.pgLangSelect.value = langs[0]?.id || 'python';
  }

  // ============================================================================
  // NAVIGATION & GLOBAL STATS
  // ============================================================================
  function switchView(viewName) {
    activeView = viewName;
    Object.entries(views).forEach(([name, el]) => {
      el.classList.toggle('active', name === viewName);
    });
    els.navLinks.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    if (viewName === 'workspace') {
      loadWorkspaceLanguage(activeLangId);
      setTimeout(() => monacoEditor && monacoEditor.layout(), 60);
    } else if (viewName === 'dashboard') {
      renderDashboard();
    } else if (viewName === 'compare') {
      renderComparison();
    }
  }

  function updateGlobalHeader() {
    const st = CF.getState();
    els.globalXpLabel.textContent = `${st.xp} XP`;
    els.globalRankLabel.textContent = CF.getRank(st.xp);

    const langs = CF.getAllLanguages();
    els.statLangCount.textContent = langs.length;
    els.statLessonsDone.textContent = Object.keys(st.completedLessons).length;
    els.statChallengesDone.textContent = Object.keys(st.solvedExercises).length;
    const totalProjects = langs.reduce((acc, l) => acc + (l.projects?.length || 0), 0);
    els.statProjectsCount.textContent = totalProjects;
  }

  // ============================================================================
  // DASHBOARD VIEW
  // ============================================================================
  function renderDashboard() {
    updateGlobalHeader();
    const query = (els.langSearchInput.value || '').trim().toLowerCase();
    const langs = CF.getAllLanguages().filter((l) => {
      const matchFilter = activeFilter === 'all' || l.category === activeFilter;
      const hay = `${l.name} ${l.tagline} ${l.useCases.join(' ')} ${l.category}`.toLowerCase();
      return matchFilter && (!query || hay.includes(query));
    });

    els.languageCardsGrid.innerHTML = '';
    langs.forEach((lang) => {
      const prog = CF.getLanguageProgress(lang.id);
      const card = document.createElement('article');
      card.className = 'lang-card';
      card.style.setProperty('--card-accent', lang.color);
      card.style.setProperty('--card-glow', `${lang.color}2e`);

      card.innerHTML = `
        <div class="card-top">
          <div class="lang-identity">
            <div class="lang-badge-icon">${escapeHtml(lang.badge)}</div>
            <div>
              <div class="lang-name">${escapeHtml(lang.name)}</div>
              <div class="lang-ext">${escapeHtml(lang.fileName)} &bull; 5 Levels</div>
            </div>
          </div>
          <span class="tier-tag">Level ${prog.unlockedLevel} / 5</span>
        </div>
        <p class="card-desc">${escapeHtml(lang.tagline)}</p>
        <div class="card-tags">
          ${lang.useCases.map((u) => `<span class="mini-tag">${escapeHtml(u)}</span>`).join('')}
        </div>
        <div class="card-progress">
          <div class="card-prog-meta">
            <span>${prog.completed} / ${prog.total} milestones</span>
            <strong>${prog.percent}%</strong>
          </div>
          <div class="prog-track">
            <div class="prog-fill" style="width:${prog.percent}%"></div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        activeLangId = lang.id;
        activeLevel = prog.unlockedLevel;
        activeTab = 'learn';
        switchView('workspace');
      });

      els.languageCardsGrid.appendChild(card);
    });
  }

  // ============================================================================
  // WORKSPACE VIEW (CURRICULUM + EXERCISES + PROJECTS)
  // ============================================================================
  function loadWorkspaceLanguage(langId) {
    const lang = CF.getLanguage(langId);
    if (!lang) return;
    activeLangId = langId;
    activeExercise = null;
    els.testCodeBtn.classList.add('hidden');

    els.wsLangSelect.value = langId;
    els.wsLangDot.style.background = lang.color;
    els.editorFileDot.style.background = lang.color;
    els.editorFileName.textContent = lang.fileName;

    updateWorkspaceProgress();
    renderLevelStrip();
    renderLeftTabContent();

    const draft = CF.getEditorDraft(langId);
    const firstLesson = lang.lessons.find((l) => l.level === activeLevel) || lang.lessons[0];
    currentStarterCode = firstLesson ? firstLesson.code : lang.starterPlayground;
    setEditorCode(draft || currentStarterCode, lang.monacoLang);
    clearErrorMarkers();
  }

  function updateWorkspaceProgress() {
    const prog = CF.getLanguageProgress(activeLangId);
    els.wsProgressText.textContent = `${prog.percent}%`;
    els.wsProgressFill.style.width = `${prog.percent}%`;
    els.wsLevelBadge.textContent = `Level ${activeLevel} • ${getLevelName(activeLevel)}`;
  }

  function getLevelName(lvl) {
    const names = {
      1: 'Fundamentals',
      2: 'Functions & Data',
      3: 'OOP & Design',
      4: 'Domain Track',
      5: 'Portfolio Mastery'
    };
    return names[lvl] || `Tier ${lvl}`;
  }

  function renderLevelStrip() {
    const lang = CF.getLanguage(activeLangId);
    els.levelStrip.innerHTML = '';

    for (let lvl = 1; lvl <= 5; lvl++) {
      const lvlLessons = lang.lessons.filter((l) => l.level === lvl);
      const allDone = lvlLessons.length > 0 && lvlLessons.every((l) => CF.isLessonComplete(activeLangId, l.id));

      const btn = document.createElement('button');
      btn.className = `level-btn ${lvl === activeLevel ? 'active' : ''} ${allDone ? 'completed' : ''}`;
      btn.innerHTML = `
        <span>L${lvl}: ${getLevelName(lvl)}</span>
        ${allDone ? '<span class="lvl-check">✓</span>' : ''}
      `;
      btn.addEventListener('click', () => {
        activeLevel = lvl;
        activeExercise = null;
        els.testCodeBtn.classList.add('hidden');
        updateWorkspaceProgress();
        renderLevelStrip();
        renderLeftTabContent();
      });
      els.levelStrip.appendChild(btn);
    }
  }

  function renderLeftTabContent() {
    els.wsTabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === activeTab));
    if (activeTab === 'learn') renderLearnTab();
    else if (activeTab === 'exercises') renderExercisesTab();
    else if (activeTab === 'projects') renderProjectsTab();
  }

  // --- TAB 1: LEARN ---
  function renderLearnTab() {
    const lang = CF.getLanguage(activeLangId);
    const lessons = lang.lessons.filter((l) => l.level === activeLevel);
    els.leftPanelContent.innerHTML = '';

    lessons.forEach((lesson, index) => {
      const done = CF.isLessonComplete(activeLangId, lesson.id);
      const card = document.createElement('article');
      card.className = 'content-card';
      card.innerHTML = `
        <div class="content-card-head">
          <div>
            <span class="eyebrow">LEVEL ${lesson.level} &bull; MODULE ${index + 1}</span>
            <h3>${escapeHtml(lesson.title)}</h3>
          </div>
          ${done ? '<span class="done-pill">✓ Completed</span>' : ''}
        </div>

        <p class="en-text">${escapeHtml(lesson.en)}</p>
        <div class="ar-box">${escapeHtml(lesson.ar)}</div>

        <ul class="key-points">
          ${lesson.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
        </ul>

        <div class="code-snippet-box">
          <div class="code-snippet-head">
            <span>${escapeHtml(lang.fileName)} &bull; Live Example</span>
            <button class="btn-ghost btn-xs btn-load-code">Load in IDE →</button>
          </div>
          <pre><code>${escapeHtml(lesson.code)}</code></pre>
        </div>

        <div class="pro-tip">
          <div><strong>Pro Tip:</strong> ${escapeHtml(lesson.tipEn)}</div>
          <div class="ar-tip">${escapeHtml(lesson.tipAr)}</div>
        </div>

        <div class="lesson-footer">
          <button class="btn-ghost btn-sm btn-load-run">▶ Load &amp; Run</button>
          <button class="btn-accent btn-sm btn-mark-done">${done ? 'Completed (+25 XP)' : 'Mark Complete (+25 XP)'}</button>
        </div>
      `;

      card.querySelector('.btn-load-code').addEventListener('click', () => {
        activeExercise = null;
        els.testCodeBtn.classList.add('hidden');
        currentStarterCode = lesson.code;
        setEditorCode(lesson.code, lang.monacoLang);
        showToast('Example loaded into IDE.', 'success');
      });

      card.querySelector('.btn-load-run').addEventListener('click', () => {
        activeExercise = null;
        els.testCodeBtn.classList.add('hidden');
        currentStarterCode = lesson.code;
        setEditorCode(lesson.code, lang.monacoLang);
        runCurrentEditorCode(false);
      });

      card.querySelector('.btn-mark-done').addEventListener('click', () => {
        const newlyDone = CF.markLessonComplete(activeLangId, lesson.id);
        if (newlyDone) {
          showToast(`Lesson completed! +25 XP earned`, 'success');
          updateGlobalHeader();
          updateWorkspaceProgress();
          renderLevelStrip();
          renderLearnTab();
        }
      });

      els.leftPanelContent.appendChild(card);
    });

    // Suggested Level Project Teaser at Bottom of Learn Tab
    const levelProj = lang.projects.find((p) => p.level === activeLevel);
    if (levelProj) {
      const teaser = document.createElement('div');
      teaser.className = 'content-card';
      teaser.style.borderColor = 'rgba(6, 182, 212, 0.35)';
      teaser.innerHTML = `
        <span class="eyebrow">LEVEL ${activeLevel} RECOMMENDED PROJECT</span>
        <h3>${escapeHtml(levelProj.title)}</h3>
        <p class="en-text">${escapeHtml(levelProj.briefEn)}</p>
        <div>
          <button class="btn-primary btn-sm btn-open-proj">Open Project Blueprint →</button>
        </div>
      `;
      teaser.querySelector('.btn-open-proj').addEventListener('click', () => {
        activeTab = 'projects';
        renderLeftTabContent();
      });
      els.leftPanelContent.appendChild(teaser);
    }
  }

  // --- TAB 2: EXERCISES (3 MODES: CODE IT, BUG HUNTER, TRACE OUTPUT) ---
  function renderExercisesTab() {
    const lang = CF.getLanguage(activeLangId);
    const levelExercises = lang.exercises.filter((e) => e.level === activeLevel);
    const list = levelExercises.length ? levelExercises : lang.exercises;
    els.leftPanelContent.innerHTML = '';

    list.forEach((ex) => {
      const solved = CF.isExerciseSolved(activeLangId, ex.id);
      const badgeClass = ex.type === 'bug' ? 'type-bug' : ex.type === 'trace' ? 'type-trace' : 'type-code';
      const badgeLabel = ex.type === 'bug' ? 'Bug Hunter' : ex.type === 'trace' ? 'Trace Output' : 'Code It';

      const card = document.createElement('article');
      card.className = 'content-card';

      if (ex.type === 'trace') {
        card.innerHTML = `
          <div class="content-card-head">
            <div>
              <span class="exercise-type-badge ${badgeClass}">${badgeLabel}</span>
              <h3 style="margin-top:6px;">${escapeHtml(ex.title)}</h3>
            </div>
            ${solved ? '<span class="done-pill">✓ Solved</span>' : ''}
          </div>
          <p class="en-text">${escapeHtml(ex.promptEn)}</p>
          <div class="ar-box">${escapeHtml(ex.promptAr)}</div>
          <div class="code-snippet-box"><pre><code>${escapeHtml(ex.code)}</code></pre></div>
          <div class="trace-options">
            ${ex.options.map((opt, idx) => `<button class="trace-option" data-idx="${idx}">${escapeHtml(opt)}</button>`).join('')}
          </div>
          <div class="trace-feedback hidden"></div>
        `;

        const fb = card.querySelector('.trace-feedback');
        card.querySelectorAll('.trace-option').forEach((btn) => {
          btn.addEventListener('click', () => {
            const picked = parseInt(btn.dataset.idx, 10);
            card.querySelectorAll('.trace-option').forEach((b) => b.classList.remove('correct', 'wrong'));
            if (picked === ex.correctIndex) {
              btn.classList.add('correct');
              const newly = CF.markExerciseSolved(activeLangId, ex.id);
              fb.className = 'pro-tip';
              fb.style.borderColor = 'rgba(16,185,129,0.4)';
              fb.style.background = 'rgba(16,185,129,0.1)';
              fb.style.color = '#a7f3d0';
              fb.innerHTML = `
                <div><strong>Correct!</strong> ${escapeHtml(ex.explainEn)}</div>
                <div class="ar-tip">${escapeHtml(ex.explainAr)}</div>
              `;
              if (newly) {
                showToast('Trace challenge solved! +40 XP', 'success');
                updateGlobalHeader();
                updateWorkspaceProgress();
              }
            } else {
              btn.classList.add('wrong');
              fb.className = 'pro-tip';
              fb.style.borderColor = 'rgba(244,63,94,0.4)';
              fb.style.background = 'rgba(244,63,94,0.1)';
              fb.style.color = '#fecdd3';
              fb.innerHTML = `
                <div><strong>Not quite — trace line by line and try again.</strong></div>
                <div class="ar-tip">تتبع قيمة المتغيرات سطر بسطر وحاول تاني.</div>
              `;
            }
          });
        });
      } else {
        card.innerHTML = `
          <div class="content-card-head">
            <div>
              <span class="exercise-type-badge ${badgeClass}">${badgeLabel}</span>
              <h3 style="margin-top:6px;">${escapeHtml(ex.title)}</h3>
            </div>
            ${solved ? '<span class="done-pill">✓ Solved</span>' : ''}
          </div>
          <p class="en-text">${escapeHtml(ex.promptEn)}</p>
          <div class="ar-box">${escapeHtml(ex.promptAr)}</div>
          <div class="code-snippet-box">
            <div class="code-snippet-head"><span>Expected Output</span></div>
            <pre><code>${escapeHtml(ex.expectedOutput)}</code></pre>
          </div>
          <div class="lesson-footer">
            <button class="btn-ghost btn-xs btn-hint">Show Hint</button>
            <button class="btn-primary btn-sm btn-start-ex">Open in IDE &amp; Solve →</button>
          </div>
          <div class="hint-item hidden"></div>
        `;

        const hintEl = card.querySelector('.hint-item');
        card.querySelector('.btn-hint').addEventListener('click', () => {
          hintEl.classList.toggle('hidden');
          hintEl.innerHTML = `<strong>Hint:</strong> ${escapeHtml(ex.hintEn)}<div class="ar-inline" dir="rtl" style="margin-top:5px;">${escapeHtml(ex.hintAr)}</div>`;
        });

        card.querySelector('.btn-start-ex').addEventListener('click', () => {
          activeExercise = ex;
          currentStarterCode = ex.starterCode;
          setEditorCode(ex.starterCode, lang.monacoLang);
          els.testCodeBtn.classList.remove('hidden');
          showToast(`Loaded "${ex.title}". Edit the code and click Verify Solution!`, 'success');
        });
      }

      els.leftPanelContent.appendChild(card);
    });
  }

  // --- TAB 3: LEVEL-BASED PROJECTS ---
  function renderProjectsTab() {
    const lang = CF.getLanguage(activeLangId);
    els.leftPanelContent.innerHTML = '';

    // Highlight current level's project first, then show all 5 tiers
    const sortedProjects = [...lang.projects].sort((a, b) => (a.level === activeLevel ? -1 : b.level === activeLevel ? 1 : a.level - b.level));

    sortedProjects.forEach((proj) => {
      const isCurrentLvl = proj.level === activeLevel;
      const doneSteps = proj.checklist.filter((_, idx) => CF.isProjectChecked(activeLangId, proj.id, idx)).length;
      const pct = Math.round((doneSteps / proj.checklist.length) * 100);

      const card = document.createElement('article');
      card.className = 'content-card';
      if (isCurrentLvl) card.style.borderColor = 'rgba(99, 102, 241, 0.5)';

      card.innerHTML = `
        <div class="content-card-head">
          <div>
            <span class="eyebrow">LEVEL ${proj.level} PROJECT &bull; ${escapeHtml(proj.difficulty)} &bull; +${proj.xp} XP</span>
            <h3>${escapeHtml(proj.title)}</h3>
          </div>
          <span class="tier-tag">${doneSteps}/${proj.checklist.length} (${pct}%)</span>
        </div>

        <p class="en-text">${escapeHtml(proj.briefEn)}</p>
        <div class="ar-box">${escapeHtml(proj.briefAr)}</div>

        <div>
          <span class="eyebrow" style="margin-bottom:8px;">BUILD CHECKLIST (CLICK AS YOU IMPLEMENT)</span>
          <div class="project-checklist">
            ${proj.checklist.map((step, idx) => {
              const checked = CF.isProjectChecked(activeLangId, proj.id, idx);
              return `
                <label class="check-row ${checked ? 'checked' : ''}">
                  <input type="checkbox" data-idx="${idx}" ${checked ? 'checked' : ''} />
                  <span>${escapeHtml(step)}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <div class="hints-box">
          <div class="lesson-footer" style="border-top:none; padding-top:0;">
            <button class="btn-ghost btn-xs btn-next-hint">Reveal Hint (0 / ${proj.hints.length})</button>
            <button class="btn-primary btn-sm btn-load-proj">Load Project Boilerplate →</button>
          </div>
          <div class="revealed-hints"></div>
        </div>
      `;

      // Checklist interaction
      card.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
        chk.addEventListener('change', () => {
          const idx = parseInt(chk.dataset.idx, 10);
          const nowChecked = CF.toggleProjectCheck(activeLangId, proj.id, idx);
          if (nowChecked) showToast('Project milestone checked! +15 XP', 'success');
          updateGlobalHeader();
          renderProjectsTab();
        });
      });

      // Progressive Hints (reveal 1 by 1)
      let hintsShown = 0;
      const hintBtn = card.querySelector('.btn-next-hint');
      const hintContainer = card.querySelector('.revealed-hints');
      hintBtn.addEventListener('click', () => {
        if (hintsShown >= proj.hints.length) return;
        const h = proj.hints[hintsShown];
        hintsShown++;
        const el = document.createElement('div');
        el.className = 'hint-item';
        el.style.marginTop = '6px';
        el.innerHTML = `<strong>Hint ${hintsShown}:</strong> ${escapeHtml(h.en)}<div class="ar-inline" dir="rtl" style="margin-top:4px;color:#e2e8f0;">${escapeHtml(h.ar)}</div>`;
        hintContainer.appendChild(el);
        hintBtn.textContent = hintsShown < proj.hints.length
          ? `Reveal Hint (${hintsShown} / ${proj.hints.length})`
          : `All ${proj.hints.length} Hints Revealed`;
      });

      card.querySelector('.btn-load-proj').addEventListener('click', () => {
        activeExercise = null;
        els.testCodeBtn.classList.add('hidden');
        currentStarterCode = proj.starterCode;
        setEditorCode(proj.starterCode, lang.monacoLang);
        showToast(`Project starter loaded: ${proj.title}`, 'success');
      });

      els.leftPanelContent.appendChild(card);
    });
  }

  // ============================================================================
  // MONACO EDITOR + SEAMLESS FALLBACK
  // ============================================================================
  function initMonacoOrFallback() {
    let settled = false;

    const enableFallback = () => {
      if (settled) return;
      settled = true;
      monacoReady = false;
      els.monacoContainer.classList.add('hidden');
      els.fallbackEditor.classList.remove('hidden');
      els.editorEngineTag.textContent = 'Fast Editor';

      els.fallbackEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const s = els.fallbackEditor.selectionStart;
          const end = els.fallbackEditor.selectionEnd;
          els.fallbackEditor.value =
            els.fallbackEditor.value.substring(0, s) + '  ' + els.fallbackEditor.value.substring(end);
          els.fallbackEditor.selectionStart = els.fallbackEditor.selectionEnd = s + 2;
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runCurrentEditorCode(false);
        }
      });

      els.fallbackEditor.addEventListener('input', () => {
        CF.saveEditorDraft(activeLangId, els.fallbackEditor.value);
      });
    };

    // Fallback timeout if CDN is slow or offline
    const fallbackTimer = setTimeout(enableFallback, 3800);

    if (typeof window.require === 'undefined') {
      clearTimeout(fallbackTimer);
      enableFallback();
      return;
    }

    try {
      window.require.config({
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
      });

      window.require(['vs/editor/editor.main'], () => {
        if (settled) return;
        clearTimeout(fallbackTimer);
        settled = true;
        monacoReady = true;

        monaco.editor.defineTheme('codeforge-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
            { token: 'keyword', foreground: '818cf8', fontStyle: 'bold' },
            { token: 'string', foreground: '34d399' },
            { token: 'number', foreground: 'f59e0b' },
            { token: 'type', foreground: '38bdf8' }
          ],
          colors: {
            'editor.background': '#080b13',
            'editor.lineHighlightBackground': '#111827',
            'editorLineNumber.foreground': '#475569',
            'editorLineNumber.activeForeground': '#818cf8',
            'editorCursor.foreground': '#38bdf8',
            'editor.selectionBackground': '#312e81'
          }
        });

        monacoEditor = monaco.editor.create(els.monacoContainer, {
          value: currentStarterCode || '',
          language: 'python',
          theme: 'codeforge-dark',
          fontFamily: "'JetBrains Mono', Consolas, monospace",
          fontSize: currentFontSize,
          lineHeight: 22,
          minimap: { enabled: false },
          automaticLayout: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          padding: { top: 14, bottom: 14 },
          roundedSelection: true,
          tabSize: 4
        });

        monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
          runCurrentEditorCode(false);
        });

        monacoEditor.onDidChangeModelContent(() => {
          CF.saveEditorDraft(activeLangId, monacoEditor.getValue());
        });

        if (activeView === 'workspace') {
          const lang = CF.getLanguage(activeLangId);
          if (lang) setEditorCode(CF.getEditorDraft(activeLangId) || currentStarterCode, lang.monacoLang);
        }
      }, enableFallback);
    } catch (e) {
      clearTimeout(fallbackTimer);
      enableFallback();
    }
  }

  function getEditorCode() {
    return monacoReady && monacoEditor ? monacoEditor.getValue() : els.fallbackEditor.value;
  }

  function setEditorCode(code, monacoLang) {
    if (monacoReady && monacoEditor) {
      monacoEditor.setValue(code || '');
      if (monacoLang) {
        monaco.editor.setModelLanguage(monacoEditor.getModel(), monacoLang);
      }
    } else {
      els.fallbackEditor.value = code || '';
    }
  }

  function setFontSize(size) {
    currentFontSize = Math.max(11, Math.min(26, size));
    els.fontSizeDisplay.textContent = `${currentFontSize}px`;
    if (monacoReady && monacoEditor) {
      monacoEditor.updateOptions({ fontSize: currentFontSize });
    }
    els.fallbackEditor.style.fontSize = `${currentFontSize}px`;
  }

  function highlightErrorLine(lineNum) {
    if (!monacoReady || !monacoEditor || !lineNum) return;
    monacoDecorations = monacoEditor.deltaDecorations(monacoDecorations, [
      {
        range: new monaco.Range(lineNum, 1, lineNum, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-error-line',
          linesDecorationsClassName: 'monaco-error-glyph'
        }
      }
    ]);
    monacoEditor.revealLineInCenter(lineNum);
  }

  function clearErrorMarkers() {
    if (monacoReady && monacoEditor && monacoDecorations.length) {
      monacoDecorations = monacoEditor.deltaDecorations(monacoDecorations, []);
    }
  }

  // ============================================================================
  // CODE EXECUTION & BILINGUAL ERROR RENDERING
  // ============================================================================
  function switchConsoleTab(tabName) {
    els.consoleTabs.forEach((t) => t.classList.toggle('active', t.dataset.ctab === tabName));
    els.consoleOutputPane.classList.toggle('active', tabName === 'output');
    els.consoleDiagPane.classList.toggle('active', tabName === 'diagnostics');
    els.consoleStdinPane.classList.toggle('active', tabName === 'stdin');
  }

  function renderDiagnosticCardHtml(diag) {
    return `
      <div class="diag-card">
        <div class="diag-head">
          <div class="diag-title">
            <span>⚠ ${escapeHtml(diag.title)}</span>
          </div>
          ${diag.line ? `<span class="diag-line-pill">Line ${diag.line}</span>` : ''}
        </div>
        <pre class="diag-raw">${escapeHtml(diag.raw)}</pre>
        <div class="diag-bilingual">
          <div class="diag-block-en">
            <h4>English Diagnosis &amp; Fix</h4>
            <p>${escapeHtml(diag.enCause)}</p>
            <div class="diag-fix"><strong>Fix:</strong> ${escapeHtml(diag.enFix)}</div>
          </div>
          <div class="diag-block-ar">
            <h4>التشخيص والحل بالعربي</h4>
            <p>${escapeHtml(diag.arCause)}</p>
            <div class="diag-fix-ar"><strong>الحل:</strong> ${escapeHtml(diag.arFix)}</div>
          </div>
        </div>
      </div>
    `;
  }

  async function runCurrentEditorCode(verifyChallenge = false) {
    const code = getEditorCode();
    const stdin = els.stdinInput.value || '';

    clearErrorMarkers();
    els.runCodeBtn.disabled = true;
    els.testCodeBtn.disabled = true;
    els.consoleStatusDot.className = 'status-dot running';
    els.execTimeLabel.textContent = 'Executing...';
    els.errorCountBadge.classList.add('hidden');
    els.consoleOutputPane.innerHTML = '<div class="console-placeholder">Compiling and running your code...</div>';
    switchConsoleTab('output');

    const res = await CF.Compiler.execute(activeLangId, code, stdin);

    els.runCodeBtn.disabled = false;
    els.testCodeBtn.disabled = false;
    els.execTimeLabel.textContent = `${res.elapsedMs} ms • ${res.engine || ''}`;

    if (res.ok) {
      els.consoleStatusDot.className = 'status-dot ok';
      const outText = (res.stdout || '').trimEnd();
      let html = `<div class="terminal-success">✓ Program exited cleanly (exit code 0)</div>`;
      html += `<pre class="terminal-pre">${escapeHtml(outText || '(No output printed)')}</pre>`;

      // Exercise Verification Check
      if (verifyChallenge && activeExercise) {
        const expected = activeExercise.expectedOutput.trim().replace(/\r\n/g, '\n');
        const actual = outText.trim().replace(/\r\n/g, '\n');
        if (actual === expected) {
          const newly = CF.markExerciseSolved(activeLangId, activeExercise.id);
          html += `<div class="pro-tip" style="margin-top:12px;border-color:rgba(16,185,129,0.45);background:rgba(16,185,129,0.12);color:#a7f3d0;">
            <div><strong>✓ All Test Cases Passed!</strong> Exact match with expected output.</div>
            <div class="ar-tip">عاش! الكود عدى كل الاختبارات بنجاح وحصلت على نقاط التحدي.</div>
          </div>`;
          if (newly) {
            showToast('Challenge solved! +40 XP earned', 'success');
            updateGlobalHeader();
            updateWorkspaceProgress();
            if (activeTab === 'exercises') renderExercisesTab();
          }
        } else {
          html += `<div class="pro-tip" style="margin-top:12px;border-color:rgba(245,158,11,0.45);">
            <div><strong>Output Mismatch:</strong> Expected <code>${escapeHtml(expected)}</code> but got <code>${escapeHtml(actual || '(empty)')}</code>.</div>
            <div class="ar-tip">الناتج مختلف عن المطلوب — راجع القيمة المتوقعة وحاول تعديل الكود تاني.</div>
          </div>`;
        }
      }

      els.consoleOutputPane.innerHTML = html;
      els.consoleDiagPane.innerHTML = '<div class="console-placeholder">No errors detected. Clean execution!</div>';
    } else {
      els.consoleStatusDot.className = 'status-dot err';
      els.errorCountBadge.textContent = '1';
      els.errorCountBadge.classList.remove('hidden');

      const diag = CF.ErrorEngine.analyze(activeLangId, res.stderr || 'Unknown Error');
      if (diag.line) highlightErrorLine(diag.line);

      const diagHtml = renderDiagnosticCardHtml(diag);
      els.consoleDiagPane.innerHTML = diagHtml;
      els.consoleOutputPane.innerHTML =
        (res.stdout ? `<pre class="terminal-pre" style="margin-bottom:12px;">${escapeHtml(res.stdout)}</pre>` : '') +
        diagHtml;

      // Auto-focus Error Inspector so the user sees EN + AR diagnosis immediately
      switchConsoleTab('diagnostics');
    }
  }

  // ============================================================================
  // LANGUAGE BRIDGE (SIDE-BY-SIDE COMPARE)
  // ============================================================================
  const COMPARE_CONCEPTS = [
    { id: 'variables', label: 'Variables & Types', en: 'Compare static vs dynamic typing and variable declaration rules.', ar: 'قارن بين تعريف المتغيرات والأنواع الصارمة (Static Typing) مقابل المرنة (Dynamic Typing).' },
    { id: 'loops', label: 'Loops & Iteration', en: 'See how each language iterates over ranges and collections.', ar: 'شوف الفرق في كتابة الحلقات التكرارية (Loops) والتعامل مع المصفوفات.' },
    { id: 'functions', label: 'Functions', en: 'Compare function signatures, return types, and parameter passing.', ar: 'قارن طريقة كتابة الدوال (Functions) وتحديد نوع القيمة الراجعة.' },
    { id: 'oop', label: 'Classes & OOP', en: 'Inspect constructors, encapsulation, and method syntax across languages.', ar: 'قارن بناء الكلاسات (Classes) والـ Constructor والبرمجة الكائنية بين اللغتين.' },
    { id: 'collections', label: 'Arrays / Lists', en: 'Learn how dynamic arrays, vectors, and lists are created and mutated.', ar: 'اعرف إزاي تضيف وتقرأ عناصر من القوائم والمصفوفات الديناميكية في كل لغة.' }
  ];

  function initCompareView() {
    els.compareConceptPills.innerHTML = COMPARE_CONCEPTS.map(
      (c) => `<button class="concept-pill ${c.id === activeCompareConcept ? 'active' : ''}" data-concept="${c.id}">${c.label}</button>`
    ).join('');

    els.compareConceptPills.querySelectorAll('.concept-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCompareConcept = btn.dataset.concept;
        els.compareConceptPills.querySelectorAll('.concept-pill').forEach((b) =>
          b.classList.toggle('active', b.dataset.concept === activeCompareConcept)
        );
        renderComparison();
      });
    });

    els.compareLangA.addEventListener('change', renderComparison);
    els.compareLangB.addEventListener('change', renderComparison);

    els.openAInPlayground.addEventListener('click', () => openInPlayground(els.compareLangA.value, els.compareCodeA.textContent));
    els.openBInPlayground.addEventListener('click', () => openInPlayground(els.compareLangB.value, els.compareCodeB.textContent));
    renderComparison();
  }

  function renderComparison() {
    const langA = CF.getLanguage(els.compareLangA.value);
    const langB = CF.getLanguage(els.compareLangB.value);
    if (!langA || !langB) return;

    els.compareTitleA.textContent = `${langA.name} (${langA.fileName})`;
    els.compareTitleB.textContent = `${langB.name} (${langB.fileName})`;
    els.compareCodeA.textContent = langA.compare[activeCompareConcept] || '// Snippet unavailable';
    els.compareCodeB.textContent = langB.compare[activeCompareConcept] || '// Snippet unavailable';

    const meta = COMPARE_CONCEPTS.find((c) => c.id === activeCompareConcept);
    els.compareInsightBox.innerHTML = `
      <span class="eyebrow">ARCHITECTURE COMPARISON</span>
      <p class="en-text"><strong>${escapeHtml(meta.label)}:</strong> ${escapeHtml(meta.en)}</p>
      <div class="ar-box">${escapeHtml(meta.ar)}</div>
    `;
  }

  // ============================================================================
  // PLAYGROUND VIEW
  // ============================================================================
  function initPlaygroundView() {
    const loadStarter = () => {
      const lang = CF.getLanguage(els.pgLangSelect.value);
      if (lang) els.pgEditor.value = lang.starterPlayground;
    };

    loadStarter();
    els.pgLangSelect.addEventListener('change', loadStarter);
    els.pgLoadStarterBtn.addEventListener('click', loadStarter);

    els.pgRunBtn.addEventListener('click', async () => {
      const langId = els.pgLangSelect.value;
      els.pgRunBtn.disabled = true;
      els.pgTimeLabel.textContent = 'Running...';
      els.pgOutput.innerHTML = '<div class="console-placeholder">Executing sandbox code...</div>';

      const res = await CF.Compiler.execute(langId, els.pgEditor.value, '');
      els.pgRunBtn.disabled = false;
      els.pgTimeLabel.textContent = `${res.elapsedMs} ms`;

      if (res.ok) {
        els.pgOutput.innerHTML = `
          <div class="terminal-success">✓ Executed cleanly</div>
          <pre class="terminal-pre">${escapeHtml(res.stdout || '(No output)')}</pre>
        `;
      } else {
        const diag = CF.ErrorEngine.analyze(langId, res.stderr);
        els.pgOutput.innerHTML = renderDiagnosticCardHtml(diag);
      }
    });
  }

  function openInPlayground(langId, code) {
    els.pgLangSelect.value = langId;
    els.pgEditor.value = code;
    switchView('playground');
  }

  // ============================================================================
  // SPLIT-SCREEN RESIZERS (HORIZONTAL & VERTICAL)
  // ============================================================================
  function initResizers() {
    let draggingV = false;
    let draggingH = false;

    els.resizerV.addEventListener('mousedown', () => {
      draggingV = true;
      els.resizerV.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    els.resizerH.addEventListener('mousedown', () => {
      draggingH = true;
      els.resizerH.classList.add('dragging');
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (draggingV) {
        const rect = els.splitContainer.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        const clamped = Math.max(24, Math.min(62, pct));
        els.leftPanel.style.width = `${clamped}%`;
        if (monacoEditor) monacoEditor.layout();
      } else if (draggingH) {
        const rect = els.rightPanel.getBoundingClientRect();
        const consoleH = rect.bottom - e.clientY;
        const clamped = Math.max(130, Math.min(rect.height * 0.7, consoleH));
        els.consolePanel.style.height = `${clamped}px`;
        if (monacoEditor) monacoEditor.layout();
      }
    });

    window.addEventListener('mouseup', () => {
      if (draggingV || draggingH) {
        draggingV = false;
        draggingH = false;
        els.resizerV.classList.remove('dragging');
        els.resizerH.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }

  // ============================================================================
  // EVENT BINDINGS
  // ============================================================================
  function bindEvents() {
    els.brandHomeBtn.addEventListener('click', () => switchView('dashboard'));
    els.wsBackBtn.addEventListener('click', () => switchView('dashboard'));

    els.navLinks.forEach((btn) => {
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    els.resetProgressBtn.addEventListener('click', () => {
      if (confirm('Reset all local XP, completed lessons, and project checklists?')) {
        CF.resetState();
        updateGlobalHeader();
        renderDashboard();
        if (activeView === 'workspace') loadWorkspaceLanguage(activeLangId);
        showToast('Progress has been reset.', 'success');
      }
    });

    els.langSearchInput.addEventListener('input', renderDashboard);
    els.trackFilterPills.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        els.trackFilterPills.querySelectorAll('.filter-pill').forEach((b) =>
          b.classList.toggle('active', b === btn)
        );
        renderDashboard();
      });
    });

    els.wsLangSelect.addEventListener('change', () => {
      activeLevel = CF.getLanguageProgress(els.wsLangSelect.value).unlockedLevel;
      loadWorkspaceLanguage(els.wsLangSelect.value);
    });

    els.wsTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        renderLeftTabContent();
      });
    });

    els.consoleTabs.forEach((tab) => {
      tab.addEventListener('click', () => switchConsoleTab(tab.dataset.ctab));
    });

    els.runCodeBtn.addEventListener('click', () => runCurrentEditorCode(false));
    els.testCodeBtn.addEventListener('click', () => runCurrentEditorCode(true));
    els.resetCodeBtn.addEventListener('click', () => {
      const lang = CF.getLanguage(activeLangId);
      setEditorCode(currentStarterCode, lang?.monacoLang);
      clearErrorMarkers();
      showToast('Code reset to template.', 'success');
    });

    els.fontIncBtn.addEventListener('click', () => setFontSize(currentFontSize + 1));
    els.fontDecBtn.addEventListener('click', () => setFontSize(currentFontSize - 1));
    els.fullscreenIdeBtn.addEventListener('click', () => {
      views.workspace.classList.toggle('ide-fullscreen');
      setTimeout(() => monacoEditor && monacoEditor.layout(), 60);
    });

    els.clearConsoleBtn.addEventListener('click', () => {
      els.consoleOutputPane.innerHTML = '<div class="console-placeholder">Console cleared.</div>';
      els.consoleDiagPane.innerHTML = '<div class="console-placeholder">No active diagnostics.</div>';
      els.consoleStatusDot.className = 'status-dot';
      els.errorCountBadge.classList.add('hidden');
      els.execTimeLabel.textContent = '';
    });
  }

  // Utilities
  function showToast(message, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;
    els.toastContainer.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(6px)';
      t.style.transition = 'all 0.25s ease';
      setTimeout(() => t.remove(), 260);
    }, 2800);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();

/**
 * CodeForge Core Registry & Progress Store
 * Modular architecture: every language in /languages/*.js registers itself here.
 */
window.CodeForge = (function () {
  const STORAGE_KEY = 'codeforge_progress_v1';
  const languages = {};
  const languageOrder = [];

  function registerLanguage(langDef) {
    if (!langDef || !langDef.id) return;
    languages[langDef.id] = langDef;
    if (!languageOrder.includes(langDef.id)) {
      languageOrder.push(langDef.id);
    }
  }

  function getLanguage(id) {
    return languages[id] || null;
  }

  function getAllLanguages() {
    return languageOrder.map((id) => languages[id]);
  }

  // Persistent Progress State
  function defaultState() {
    return {
      xp: 0,
      completedLessons: {},    // { "python:l1_1": true }
      solvedExercises: {},     // { "python:ex1": true }
      projectChecks: {},       // { "python:p1:0": true }
      savedCode: {},           // { "python": "..." }
      lastLang: 'python'
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {
      return defaultState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Storage quota reached:', e);
    }
  }

  function resetState() {
    state = defaultState();
    saveState();
  }

  function addXp(amount) {
    state.xp = (state.xp || 0) + amount;
    saveState();
  }

  function getRank(xp) {
    if (xp >= 1500) return 'Principal Architect';
    if (xp >= 900) return 'Senior Engineer';
    if (xp >= 500) return 'Systems Builder';
    if (xp >= 220) return 'Code Craftsman';
    if (xp >= 80) return 'Junior Developer';
    return 'Explorer';
  }

  function markLessonComplete(langId, lessonId) {
    const key = `${langId}:${lessonId}`;
    if (!state.completedLessons[key]) {
      state.completedLessons[key] = true;
      addXp(25);
      return true;
    }
    return false;
  }

  function isLessonComplete(langId, lessonId) {
    return Boolean(state.completedLessons[`${langId}:${lessonId}`]);
  }

  function markExerciseSolved(langId, exId) {
    const key = `${langId}:${exId}`;
    if (!state.solvedExercises[key]) {
      state.solvedExercises[key] = true;
      addXp(40);
      return true;
    }
    return false;
  }

  function isExerciseSolved(langId, exId) {
    return Boolean(state.solvedExercises[`${langId}:${exId}`]);
  }

  function toggleProjectCheck(langId, projectId, stepIndex) {
    const key = `${langId}:${projectId}:${stepIndex}`;
    if (state.projectChecks[key]) {
      delete state.projectChecks[key];
      saveState();
      return false;
    } else {
      state.projectChecks[key] = true;
      addXp(15);
      return true;
    }
  }

  function isProjectChecked(langId, projectId, stepIndex) {
    return Boolean(state.projectChecks[`${langId}:${projectId}:${stepIndex}`]);
  }

  function getLanguageProgress(langId) {
    const lang = getLanguage(langId);
    if (!lang) return { percent: 0, completed: 0, total: 0, unlockedLevel: 1 };

    const totalLessons = lang.lessons.length;
    const totalExercises = lang.exercises.length;
    const total = totalLessons + totalExercises;

    let completed = 0;
    lang.lessons.forEach((l) => {
      if (isLessonComplete(langId, l.id)) completed++;
    });
    lang.exercises.forEach((ex) => {
      if (isExerciseSolved(langId, ex.id)) completed++;
    });

    const percent = total ? Math.round((completed / total) * 100) : 0;
    const unlockedLevel = Math.min(5, 1 + Math.floor(percent / 20));
    return { percent, completed, total, unlockedLevel };
  }

  function saveEditorDraft(langId, code) {
    state.savedCode[langId] = code;
    state.lastLang = langId;
    saveState();
  }

  function getEditorDraft(langId) {
    return state.savedCode[langId] || null;
  }

  function getState() {
    return state;
  }

  return {
    registerLanguage,
    getLanguage,
    getAllLanguages,
    getState,
    resetState,
    getRank,
    markLessonComplete,
    isLessonComplete,
    markExerciseSolved,
    isExerciseSolved,
    toggleProjectCheck,
    isProjectChecked,
    getLanguageProgress,
    saveEditorDraft,
    getEditorDraft
  };
})();

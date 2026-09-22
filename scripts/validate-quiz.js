global.document = {
  querySelector() { return null; },
  querySelectorAll() { return []; },
  addEventListener() {},
  getElementById() { return null; }
};

global.localStorage = {
  store: {},
  getItem(key) { return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null; },
  setItem(key, value) { this.store[key] = String(value); },
  removeItem(key) { delete this.store[key]; }
};

global.window = { CROPS: [], PESTS: {} };

global.FarmyState = {
  user: null,
  session: null,
  myFarm: []
};

try {
  require('../public/js/farmy-core.js');
  require('../public/js/farmy-quiz.js');
  const quizzes = global.getQuizCatalog ? global.getQuizCatalog() : null;
  if (!Array.isArray(quizzes) || quizzes.length !== 50) {
    throw new Error(`Expected 50 quizzes, got ${quizzes ? quizzes.length : 'missing'}`);
  }
  const totalQuestions = quizzes.reduce((sum, quiz) => sum + (Array.isArray(quiz.questions) ? quiz.questions.length : 0), 0);
  if (totalQuestions !== 500) {
    throw new Error(`Expected 500 questions, got ${totalQuestions}`);
  }
  for (const [idx, quiz] of quizzes.entries()) {
    if (!Array.isArray(quiz.questions) || quiz.questions.length !== 10) {
      throw new Error(`Quiz ${idx + 1} does not have 10 questions`);
    }
    if (new Set(quiz.questions.map(q => q.id)).size !== quiz.questions.length) {
      throw new Error(`Quiz ${idx + 1} has duplicate question IDs`);
    }
  }
  console.log('Quiz validation passed: 50 quizzes, 500 questions, each with 10 valid questions.');
} catch (err) {
  console.error('Quiz validation failed:', err.message);
  process.exit(1);
}

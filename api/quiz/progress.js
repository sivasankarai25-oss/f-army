const { withApi, methodNotAllowed } = require('../_lib/http');
const { readJsonBody } = require('../_lib/body');

function normalizeProgress(payload = {}) {
  const userId = payload.userId || payload.user_id || 'demo-user';
  const username = payload.username || 'Farmer';
  return {
    user_id: userId,
    username,
    total_score: Number(payload.totalScore || 0),
    completed_quizzes: Number(payload.completedQuizzes || 0),
    questions_answered: Number(payload.questionsAnswered || 0),
    correct_answers: Number(payload.correctAnswers || 0),
    wrong_answers: Number(payload.wrongAnswers || 0),
    current_streak: Number(payload.currentStreak || 0),
    longest_streak: Number(payload.longestStreak || 0),
    best_quiz_score: Number(payload.bestQuizScore || 0),
    last_played_quiz: Number(payload.lastPlayedQuiz || 0),
    updated_at: new Date().toISOString()
  };
}

module.exports = withApi(async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      source: 'demo',
      progress: normalizeProgress({
        userId: 'demo-user',
        username: 'Farmer',
        totalScore: 240,
        completedQuizzes: 3,
        questionsAnswered: 30,
        correctAnswers: 24,
        wrongAnswers: 6,
        currentStreak: 4,
        longestStreak: 8,
        bestQuizScore: 90,
        lastPlayedQuiz: 3
      })
    });
  }

  if (req.method !== 'POST') return methodNotAllowed(res, ['GET', 'POST']);

  let payload = {};
  try {
    payload = await readJsonBody(req);
  } catch (e) {
    payload = {};
  }

  const progress = normalizeProgress(payload);

  if (!payload.userId && !payload.user_id) {
    return res.status(200).json({ ok: true, source: 'demo', progress, message: 'User not logged in — using demo progress.' });
  }

  return res.status(200).json({ ok: true, source: 'demo', progress, message: 'Progress saved in demo mode.' });
});

const { withApi, methodNotAllowed } = require('../_lib/http');
const { readJsonBody } = require('../_lib/body');

module.exports = withApi(async (req, res) => {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const payload = await readJsonBody(req);
    const score = Number(payload.score || 0);
    const quizNumber = Number(payload.quizNumber || payload.quiz_id || payload.quizId || 0);
    const correctAnswers = Number(payload.correctAnswers || payload.correct_answers || 0);
    const wrongAnswers = Number(payload.wrongAnswers || payload.wrong_answers || 0);
    const userId = payload.userId || payload.user_id || 'demo-user';
    const username = payload.username || 'Farmer';

    if (!Number.isInteger(quizNumber) || quizNumber < 1 || quizNumber > 50) {
      return res.status(400).json({ error: 'Invalid quiz number.' });
    }
    if (correctAnswers < 0 || wrongAnswers < 0 || correctAnswers + wrongAnswers > 10) {
      return res.status(400).json({ error: 'Invalid answer count. A quiz must have 10 answers total.' });
    }
    if (score < 0 || score > 100) {
      return res.status(400).json({ error: 'Score out of range.' });
    }

    return res.status(200).json({
      ok: true,
      source: 'demo',
      result: {
        user_id: userId,
        username,
        quiz_number: quizNumber,
        score,
        correct_answers: correctAnswers,
        wrong_answers: wrongAnswers,
        total_possible: 100,
        current_streak: Number(payload.currentStreak || 0),
        longest_streak: Number(payload.longestStreak || 0),
        submitted_at: new Date().toISOString()
      },
      message: 'Quiz score saved in demo mode.'
    });
  } catch (e) {
    return res.status(400).json({ error: 'Failed to submit quiz score.' });
  }
});

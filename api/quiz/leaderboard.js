const { withApi, methodNotAllowed } = require('../_lib/http');

function buildDemoLeaderboard() {
  return [
    { rank: 1, player: 'Alex', score: 4920 },
    { rank: 2, player: 'Priya', score: 4870 },
    { rank: 3, player: 'Rahul', score: 4810 },
    { rank: 4, player: 'Siva', score: 4750 },
    { rank: 5, player: 'Nina', score: 4680 }
  ];
}

module.exports = withApi(async (req, res) => {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  try {
    return res.status(200).json({
      ok: true,
      source: 'demo',
      leaderboard: buildDemoLeaderboard(),
      message: 'Demo leaderboard'
    });
  } catch (err) {
    return res.status(200).json({
      ok: true,
      source: 'demo',
      leaderboard: buildDemoLeaderboard(),
      message: 'Demo leaderboard'
    });
  }
});

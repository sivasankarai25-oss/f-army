// Small helpers shared by every serverless function so behaviour is
// consistent (CORS, JSON body parsing, error shape) without needing Express.

function setCors(req, res) {
  // Same-origin by default (frontend + API are one Vercel deployment), but
  // allow a configured FRONTEND_URL and localhost for local development too.
  const allowed = [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173']
    .filter(Boolean);
  const origin = req.headers.origin;
  if (!origin || allowed.includes(origin) || process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/** Wrap a handler with CORS + preflight handling + top-level crash safety. */
function withApi(handler) {
  return async (req, res) => {
    // Polyfill status and json methods for non-Vercel environments (e.g. Render, plain Node)
    if (typeof res.status !== 'function') {
      res.status = function(code) {
        this.statusCode = code;
        return this;
      };
    }
    if (typeof res.json !== 'function') {
      res.json = function(data) {
        if (!this.getHeader('Content-Type')) {
          this.setHeader('Content-Type', 'application/json; charset=utf-8');
        }
        this.end(JSON.stringify(data));
        return this;
      };
    }

    setCors(req, res);
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    try {
      await handler(req, res);
    } catch (err) {
      console.error('Unhandled API error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
      }
    }
  };
}

function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed.join(', '));
  res.status(405).json({ error: `Method not allowed. Use ${allowed.join(' or ')}.` });
}

module.exports = { withApi, methodNotAllowed };

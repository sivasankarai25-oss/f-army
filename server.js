// FARMY Universal Web Server
// Supports Render (Web Service), local development, or any Node host.
// Serves static HTML/assets from public/ and dispatches /api/* to serverless handlers.

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// API Route Registry
const API_ROUTES = [
  { pattern: /^\/api\/health\/?$/, file: './api/health.js', params: [] },
  { pattern: /^\/api\/auth\/send-otp\/?$/, file: './api/auth/send-otp.js', params: [] },
  { pattern: /^\/api\/auth\/verify-otp\/?$/, file: './api/auth/verify-otp.js', params: [] },
  { pattern: /^\/api\/crops\/?$/, file: './api/crops/index.js', params: [] },
  { pattern: /^\/api\/crops\/([^/]+)\/?$/, file: './api/crops/[id].js', params: ['id'] },
  { pattern: /^\/api\/recommend\/?$/, file: './api/recommend.js', params: [] },
  { pattern: /^\/api\/pests\/match\/?$/, file: './api/pests/match.js', params: [] },
  { pattern: /^\/api\/pests\/([^/]+)\/?$/, file: './api/pests/[cropId].js', params: ['cropId'] },
  { pattern: /^\/api\/soil\/check\/?$/, file: './api/soil/check.js', params: [] },
  { pattern: /^\/api\/soil\/compare\/?$/, file: './api/soil/compare.js', params: [] },
  { pattern: /^\/api\/weather\/?$/, file: './api/weather.js', params: [] },
  { pattern: /^\/api\/farms\/tasks\/upcoming\/?$/, file: './api/farms/tasks/upcoming.js', params: [] },
  { pattern: /^\/api\/farms\/tasks\/([^/]+)\/done\/?$/, file: './api/farms/tasks/[id]/done.js', params: ['id'] },
  { pattern: /^\/api\/farms\/([^/]+)\/crops\/?$/, file: './api/farms/[farmId]/crops.js', params: ['farmId'] },
  { pattern: /^\/api\/farms\/?$/, file: './api/farms/index.js', params: [] },
  { pattern: /^\/api\/yield\/predict\/?$/, file: './api/yield/predict.js', params: [] },
  { pattern: /^\/api\/profit\/calculate\/?$/, file: './api/profit/calculate.js', params: [] },
  { pattern: /^\/api\/assistant\/ask\/?$/, file: './api/assistant/ask.js', params: [] }
];

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. Check API routes
  if (pathname.startsWith('/api/')) {
    for (const route of API_ROUTES) {
      const match = pathname.match(route.pattern);
      if (match) {
        req.query = Object.fromEntries(parsedUrl.searchParams);
        route.params.forEach((paramName, idx) => {
          req.query[paramName] = match[idx + 1];
        });

        try {
          const handler = require(route.file);
          return await handler(req, res);
        } catch (err) {
          console.error(`API Error on ${pathname}:`, err);
          if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
          return;
        }
      }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `Endpoint ${pathname} not found` }));
    return;
  }

  // 2. Static file resolution
  let relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');

  // If path doesn't have an extension, try appending .html (clean URLs)
  let targetPath = path.join(PUBLIC_DIR, relativePath);
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    if (fs.existsSync(targetPath + '.html')) {
      targetPath = targetPath + '.html';
    } else if (fs.existsSync(path.join(targetPath, 'index.html'))) {
      targetPath = path.join(targetPath, 'index.html');
    }
  }

  // Check fallback in root directory if needed
  if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
    const rootPath = path.join(__dirname, relativePath);
    if (fs.existsSync(rootPath) && fs.statSync(rootPath).isFile()) {
      targetPath = rootPath;
    }
  }

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(targetPath).pipe(res);
    return;
  }

  // 404 fallback: Serve index.html
  const fallbackIndex = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(fallbackIndex).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`🌾 FARMY server listening on port ${PORT}`);
});

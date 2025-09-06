// server.js
// A simple timer service for managing timed speaking sessions.
// Provides endpoints to create, start, pause, reset, and adjust timers.
// Timers are held in-memory and not persisted.

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');
const { v4: uuidv4 } = require('uuid');

const app = express();
const timers = {}; // In-memory store of timer objects
const DEFAULT_ID = 'default';

// Initialize a default timer for quick testing
timers[DEFAULT_ID] = {
  id: DEFAULT_ID,
  duration: 60,
  endsAt: null,
  running: false,
  remaining: 60
};

app.use(express.json());

// Allow access from test client
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Setup Swagger UI for API docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => res.redirect('/docs'));

/**
 * Helper to retrieve timer or default
 */
function getTimer(id) {
  return timers[id] || timers[DEFAULT_ID];
}

/**
 * Create a new timer
 * POST /timers
 * Body: { duration: number }
 * 201: { id }
 * 400: invalid duration
 */
app.post('/timers', (req, res) => {
  const { duration } = req.body;
  if (typeof duration !== 'number' || duration <= 0)
    return res.status(400).send('Invalid duration');

  const id = uuidv4();
  timers[id] = { id, duration, endsAt: null, running: false, remaining: duration };
  res.status(201).json({ id });
});

/**
 * POST /timers/:id/start
 * 200, 400 if already running, 404 if not found
 */
app.post('/timers/:id/start', (req, res) => {
  const timer = getTimer(req.params.id);
  if (!timer) return res.sendStatus(404);
  if (timer.running) return res.status(400).send('Already running');

  const now = Date.now();
  timer.endsAt = new Date(now + timer.remaining * 1000).toISOString();
  timer.running = true;
  res.sendStatus(200);
});

/**
 * POST /timers/:id/pause
 * 200, 400 if not running, 404 if not found
 */
app.post('/timers/:id/pause', (req, res) => {
  const timer = getTimer(req.params.id);
  if (!timer) return res.sendStatus(404);
  if (!timer.running) return res.status(400).send('Not running');

  const now = Date.now();
  const endTs = new Date(timer.endsAt).getTime();
  timer.remaining = Math.max(0, Math.round((endTs - now) / 1000));
  timer.running = false;
  timer.endsAt = null;
  res.sendStatus(200);
});

/**
 * POST /timers/:id/reset
 * 200, 404 if not found
 */
app.post('/timers/:id/reset', (req, res) => {
  const timer = getTimer(req.params.id);
  if (!timer) return res.sendStatus(404);

  timer.remaining = timer.duration;
  timer.running = false;
  timer.endsAt = null;
  res.sendStatus(200);
});

/**
 * POST /timers/:id/adjust
 * Body: { duration }
 * 200, 400 if running or invalid, 404 if not found
 */
app.post('/timers/:id/adjust', (req, res) => {
  const timer = getTimer(req.params.id);
  const { duration } = req.body;
  if (!timer) return res.sendStatus(404);
  if (timer.running) return res.status(400).send('Cannot adjust while running');
  if (typeof duration !== 'number' || duration <= 0)
    return res.status(400).send('Invalid duration');

  timer.duration = duration;
  timer.remaining = duration;
  res.sendStatus(200);
});

/**
 * GET /timers/:id/status
 * 200: { id, duration, remaining, running, endsAt }
 * 404 if not found
 */
app.get('/timers/:id/status', (req, res) => {
  const timer = getTimer(req.params.id);
  if (!timer) return res.sendStatus(404);

  const now = Date.now();
  let remaining = timer.remaining;
  if (timer.running && timer.endsAt) {
    const endTs = new Date(timer.endsAt).getTime();
    remaining = Math.max(0, Math.round((endTs - now) / 1000));
    if (remaining === 0) {
      timer.running = false;
      timer.remaining = 0;
      timer.endsAt = null;
    }
  }

  res.json({
    id: timer.id,
    duration: timer.duration,
    remaining,
    running: timer.running,
    endsAt: timer.endsAt
  });
});

// Start server
const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Timer service running on http://localhost:${PORT}`));
}

// Export for testing
module.exports = app;

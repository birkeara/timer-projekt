const request = require('supertest');
const app = require('./server');

// Helper function to delay between operations
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Timer API - Integration Test Suite', () => {
  let timerId;

  test('POST /timers - create timer', async () => {
    const res = await request(app).post('/timers').send({ duration: 90 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    timerId = res.body.id;
  });

  test('GET /timers/:id/status - verify initial status', async () => {
    const res = await request(app).get(`/timers/${timerId}/status`);
    expect(res.statusCode).toBe(200);
    expect(res.body.running).toBe(false);
    expect(res.body.remaining).toBe(90);
  });

  test('POST /timers/:id/start - start timer', async () => {
    const res = await request(app).post(`/timers/${timerId}/start`);
    expect(res.statusCode).toBe(200);
  });

  test('POST /timers/:id/adjust - should fail when running', async () => {
    const res = await request(app).post(`/timers/${timerId}/adjust`).send({ duration: 100 });
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/running/i);
  });

  test('POST /timers/:id/pause - pause timer', async () => {
    await wait(1500); // wait 1.5s before pausing to ensure time has elapsed
    const res = await request(app).post(`/timers/${timerId}/pause`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /timers/:id/status - verify paused status', async () => {
    const res = await request(app).get(`/timers/${timerId}/status`);
    expect(res.statusCode).toBe(200);
    expect(res.body.running).toBe(false);
    expect(res.body.endsAt).toBe(null);
    expect(res.body.remaining).toBeLessThan(90);
  });

  test('POST /timers/:id/adjust - change duration while paused', async () => {
    const res = await request(app).post(`/timers/${timerId}/adjust`).send({ duration: 120 });
    expect(res.statusCode).toBe(200);
  });

  test('GET /timers/:id/status - confirm adjustment', async () => {
    const res = await request(app).get(`/timers/${timerId}/status`);
    expect(res.body.duration).toBe(120);
    expect(res.body.remaining).toBe(120);
  });

  test('POST /timers/:id/reset - reset timer to full duration', async () => {
    const res = await request(app).post(`/timers/${timerId}/reset`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /timers/:id/status - confirm reset state', async () => {
    const res = await request(app).get(`/timers/${timerId}/status`);
    expect(res.body.running).toBe(false);
    expect(res.body.remaining).toBe(120);
  });

  test('POST /timers/:id/pause - should fail when already paused', async () => {
    const res = await request(app).post(`/timers/${timerId}/pause`);
    expect(res.statusCode).toBe(400);
  });

  test('POST /timers/:id/start - restart after reset', async () => {
    const res = await request(app).post(`/timers/${timerId}/start`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /timers/:id/status - should show running with endsAt', async () => {
    const res = await request(app).get(`/timers/${timerId}/status`);
    expect(res.body.running).toBe(true);
    expect(res.body.endsAt).not.toBe(null);
    expect(res.body.remaining).toBeLessThanOrEqual(120);
  });
});

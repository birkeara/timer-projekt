const request = require('supertest');
const express = require('express');
const app = require('./server.js'); 

describe('Timer API', () => {
  let timerId;

  it('should create a new timer', async () => {
    const res = await request(app)
      .post('/timers')
      .send({ duration: 60 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    timerId = res.body.id;
  });

  it('should start the timer', async () => {
    const res = await request(app).post(`/timers/${timerId}/start`);
    expect(res.statusCode).toEqual(200);
  });

  it('should get timer status', async () => {
    const res = await request(app).get(`/timers/${timerId}/status`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('remaining');
    expect(res.body.running).toBe(true);
  });

  it('should pause the timer', async () => {
    const res = await request(app).post(`/timers/${timerId}/pause`);
    expect(res.statusCode).toEqual(200);
  });

  it('should reset the timer', async () => {
    const res = await request(app).post(`/timers/${timerId}/reset`);
    expect(res.statusCode).toEqual(200);
  });
});

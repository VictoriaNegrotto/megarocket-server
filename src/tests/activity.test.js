import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

describe('getAllActivity /api/activity', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/activity').send();
    const { data } = response.body;
    const activitySeedString = JSON.stringify(activitySeed);
    const dataString = JSON.stringify(data);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Complete Activity list');
    expect(response.body.error).toBeFalsy();
    expect(dataString).toEqual(activitySeedString);
  });

  test('should return status 404 when endpoint is not correct', async () => {
    const response = await request(app).get('/api/activit').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

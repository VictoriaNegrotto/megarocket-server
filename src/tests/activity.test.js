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
    const activities = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Complete Activity list');
    expect(response.body.error).toBeFalsy();
    activities.forEach((activity) => {
      expect(activity).toHaveProperty('name');
      expect(activity).toHaveProperty('description');
    });
  });

  test('should return status 404 when endpoint is not correct', async () => {
    const response = await request(app).get('/api/activit').send();
    expect(response.status).toBe(404);
    expect(response.error.message).toEqual('cannot GET /api/activit (404)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return error response status 500 when there is a database error', async () => {
    jest.spyOn(Activity, 'find').mockRejectedValueOnce(new Error('Database error'));
    const response = await request(app).get('/api/activity').send();
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual('cannot GET /api/activity (500)');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

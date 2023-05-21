import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

const activityData = {
  name: 'Pilates',
  description: 'A class to strengthen your posture muscles and improve your flexibility, stability and balance',
};

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

describe('createActivity /api/activity', () => {
  test('should return status 201 when create an activity', async () => {
    const response = await request(app).post('/api/activity').send(activityData);
    // eslint-disable-next-line no-underscore-dangle
    const activityDataId = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual(`Activity ${activityData.name} was created successfully!`);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toStrictEqual({
      ...activityData, _id: activityDataId, isActive: true, __v: 0,
    });
  });

  test('should return status 404 when endpoint is not correct', async () => {
    const response = await request(app).post('/api/activit').send(activityData);
    expect(response.status).toBe(404);
    expect(response.error.message).toEqual('cannot POST /api/activit (404)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

import request from 'supertest';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';
import app from '../app';

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(() => { jest.restoreAllMocks(); });

describe('getActivityById /api/activity/:id', () => {
  test('should return status 200 when the activity by Id is found', async () => {
    const response = await request(app).get('/api/activity/64616a9e5648cb86adad2785').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toContain('activity with ID 64616a9e5648cb86adad2785 was found');
    expect(response.body.data).toBeDefined();
  });

  test('should return status 404 when the activity with ID was not found', async () => {
    const response = await request(app).get('/api/activity/64616a9e5648cb86adad2752').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toContain('activity with ID 64616a9e5648cb86adad2752 was not found');
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Activity, 'findOne').mockRejectedValueOnce();
    const response = await request(app).get('/api/activity/64616a9e5648cb86adad2752');
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.error.message).toEqual('cannot GET /api/activity/64616a9e5648cb86adad2752 (500)');
  });
});

describe('filterActivity /api/filter/:name', () => {
  test('should return status 200 when the filtered activity name exist', async () => {
    const getActivityByName = 'hiit';
    const response = await request(app).get(`/api/activity/filter/${getActivityByName}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual(`Activity ${getActivityByName} was successfully found`);
  });

  test('should return status 404 when the activity name was not found', async () => {
    const getActivityByName = 'invalidName!';
    const response = await request(app).get(`/api/activity/filter/${getActivityByName}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.error.message).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Activity, 'find').mockRejectedValueOnce();
    const getActivityByName = 'gap';
    const response = await request(app).get(`/api/activity/filter/${getActivityByName}`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.error.message).toEqual(`cannot GET /api/activity/filter/${getActivityByName} (500)`);
  });
});

describe('updateActivity /api/activity/:id', () => {
  test('should return status 200 and updated activity data when activity exists', async () => {
    const updatedAct = { name: 'hiit', description: 'high intensity and resistence training' };
    const response = await request(app).put('/api/activity/64616a9e5648cb86adad2758').send(updatedAct);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toBeDefined();
    expect(response.body.data.description).toBe(updatedAct.description);
    expect(response.body.message).toEqual('Activity with ID 64616a9e5648cb86adad2758 was successfully updated');
  });

  test('should return status 404 when the activity does not exist', async () => {
    const updateAct = { name: 'hiit', description: 'high intensity and resistence training' };
    const response = await request(app).get('/api/activity/64616a9e5648cb86adad2755').send(updateAct);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('activity with ID 64616a9e5648cb86adad2755 was not found');
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Activity, 'findOne').mockRejectedValueOnce();
    const updateActivity = 'gap';
    const response = await request(app).put('/api/activity/64616a9e5648cb86adad2758').send(updateActivity);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.error.message).toEqual('cannot PUT /api/activity/64616a9e5648cb86adad2758 (500)');
  });
});

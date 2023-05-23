import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});
afterEach(() => { jest.restoreAllMocks(); });
const activityData = {
  name: 'Pilates',
  description: 'A class to strengthen your posture muscles and improve your flexibility, stability and balance',
};
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
  test('should return status 500 when an error occurs getting the activity by name', async () => {
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
  test('should return status 200 and update activity data succesfully', async () => {
    const updatedAct = { name: 'hiit', description: 'high intensity and resistence training' };
    const response = await request(app).put('/api/activity/64616a9e5648cb86adad2758').send(updatedAct);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toBeDefined();
    expect(response.body.data.description).toBe(updatedAct.description);
    expect(response.body.message).toEqual('Activity with ID 64616a9e5648cb86adad2758 was successfully updated');
  });
  test('should return status 404 when the activity is invalid', async () => {
    const updateAct = { name: 'hiit', description: 'high intensity and resistence training' };
    const response = await request(app).get('/api/activity/64616a9e5648cb86adad2755').send(updateAct);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('activity with ID 64616a9e5648cb86adad2755 was not found');
  });
  test('should return status 500 when an error occurs updating an activity by id', async () => {
    jest.spyOn(Activity, 'findOne').mockRejectedValueOnce();
    const updateActivity = 'gap';
    const response = await request(app).put('/api/activity/64616a9e5648cb86adad2758').send(updateActivity);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.error.message).toEqual('cannot PUT /api/activity/64616a9e5648cb86adad2758 (500)');
  });
});
describe('deleteActivity /api/activity/:id', () => {
  test('should return status 200 when activity with id was succesfully deleted', async () => {
    const response = await request(app).delete('/api/activity/64616a9e5648cb86adad2758').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual('Activity with ID 64616a9e5648cb86adad2758 was successfully deleted');
  });
  test('should return status 404 when can not delete an invalid activity by id', async () => {
    const response = await request(app).delete('/api/activity/64616a9e5648cb86adad2745').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Activity with ID 64616a9e5648cb86adad2745 was not found');
  });
  test('should return status 500 when there is an error deleting an activity by id', async () => {
    jest.spyOn(Activity, 'findByIdAndUpdate').mockRejectedValueOnce();
    const response = await request(app).delete('/api/activity/64616a9e5648cb86adad2785').send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot DELETE /api/activity/64616a9e5648cb86adad2785 (500)');
  });
});
describe('getAllActivity /api/activity', () => {
  test('should return status 200 when request all activities list', async () => {
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
    jest.spyOn(Activity, 'find').mockRejectedValueOnce();
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
  test('should return error response status 500 when there is a database error', async () => {
    jest.spyOn(Activity, 'create').mockRejectedValueOnce();
    const response = await request(app).post('/api/activity').send(activityData);
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual('cannot POST /api/activity (500)');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

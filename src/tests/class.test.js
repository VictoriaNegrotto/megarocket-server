import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});
afterEach(() => { jest.restoreAllMocks(); });

describe('getClassById /api/class/:id', () => {
  test('should return status 200 when id exists', async () => {
    const id = '646004aff33f9c83d28ed954';
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toContain(`Class with ID ${id} was found!`);
  });
  test('should return status 404 when id doesnt exists', async () => {
    const invalidID = '646004aff33f9c83d28ed953';
    const response = await request(app).get(`/api/class/${invalidID}`).send();
    expect(response.status).toBe(404);
    expect(response.error.message).toEqual(`cannot GET /api/class/${invalidID} (404)`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toContain(`Class with ID ${invalidID} was not found`);
  });
  test('should return status 404 when endpoint is not correct', async () => {
    const response = await request(app).get('/api/classes/2').send();
    expect(response.status).toBe(404);
    expect(response.error.message).toEqual('cannot GET /api/classes/2 (404)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('should return status 500 when there is an error updating a class', async () => {
    const id = '646004aff33f9c83d28ed952';
    jest.spyOn(Class, 'findOne').mockImplementation(() => {
      throw new Error('Simulate Error');
    });
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot GET /api/class/${id} (500)`);
  });
});
describe('updateClass /api/class/:id', () => {
  test('should return status 200 when an class can be successfully updated', async () => {
    const id = '646004aff33f9c83d28ed954';
    const updateData = { day: 'Monday', slots: 20 };
    const response = await request(app).put(`/api/class/${id}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Class with ID ${id} updated!`);
  });
  test('should return status 404 when class id is invalid', async () => {
    const invalidID = '646004aff33f9c83d28ed950';
    const updateData = { day: 'Monday', slots: 20 };
    const response = await request(app).put(`/api/class/${invalidID}`).send(updateData);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
  test('should return status 404 when class is inactive ', async () => {
    const inactiveID = '646004aff33f9c83d28ed959';
    const updateData = { day: 'Monday', slots: 20 };
    const response = await request(app).put(`/api/class/${inactiveID}`).send(updateData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Class with ID ${inactiveID} is inactive and cannot be updated`);
  });
  test('should return status 500 when there is an error updating a class', async () => {
    jest.spyOn(Class, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));
    const id = '646004aff33f9c83d28ed954';
    const updateData = { day: 'Monday', slots: 20 };
    const response = await request(app).put(`/api/class/${id}`).send(updateData);
    expect(response.status).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot PUT /api/class/${id} (500)`);
  });
});

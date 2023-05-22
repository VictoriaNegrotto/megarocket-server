import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

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
  test('should return status 500 when there is a database error', async () => {
    const id = '646004aff33f9c83d28ed954';
    jest.spyOn(Class, 'findOne').mockImplementation();
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual(`cannot GET /api/class/${id} (500)`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

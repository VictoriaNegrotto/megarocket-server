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
});

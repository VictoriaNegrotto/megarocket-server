import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});
afterEach(() => { jest.restoreAllMocks(); });

describe('getAllClass /api/class', () => {
  test('should return status 200 when request all class list', async () => {
    const response = await request(app).get('/api/class').send();
    const classes = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Classes found!');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    classes.forEach((forClass) => {
      expect(forClass).toHaveProperty('day');
      expect(forClass).toHaveProperty('hour');
      expect(forClass).toHaveProperty('trainer');
      expect(forClass).toHaveProperty('activity');
      expect(forClass).toHaveProperty('slots');
    });
  });
  test('should be return status 404 when not found active classes', async () => {
    await Class.collection.deleteMany({});
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    await Class.collection.insertMany(classSeed);
  });
});

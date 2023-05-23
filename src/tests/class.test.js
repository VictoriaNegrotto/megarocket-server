import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});
afterEach(() => { jest.restoreAllMocks(); });

const mockClass = {
  day: 'Monday',
  hour: '12:30',
  trainer: '646004aff33f9e83d28ef958',
  activity: '646004aff33f9c83d28ef958',
  slots: 8,
};

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
  test('should be return status 500 when database error has ocurred', async () => {
    jest.spyOn(Class, 'find').mockImplementation(() => { throw new Error('Database error'); });
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(500);
    expect(response.error.message).toBe('cannot GET /api/admins (500)');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('createClass /api/class', () => {
  test('should return status 201 when class is created', async () => {
    const response = await request(app).post('/api/class').send(mockClass);
    // eslint-disable-next-line no-underscore-dangle
    const mockClassId = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Class with ID ${mockClassId} created!`);
    expect(response.body.data).toStrictEqual({
      ...mockClass, _id: mockClassId, isActive: true, __v: 0,
    });
  });
  test('should be return status 500 when database error has ocurred', async () => {
    jest.spyOn(Class, 'find').mockImplementation(() => { throw new Error('Database error'); });
    const response = await request(app).get('/api/class').send(mockClass);
    expect(response.status).toBe(500);
    expect(response.error.message).toBe('cannot GET /api/class (500)');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

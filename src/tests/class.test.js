import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import Activity from '../models/Activity';
import Trainer from '../models/Trainer';
import classSeed from '../seeds/class';
import activitySeed from '../seeds/activity';
import trainerSeed from '../seeds/trainer';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
  await Activity.collection.insertMany(activitySeed);
  await Trainer.collection.insertMany(trainerSeed);
});
afterEach(() => { jest.restoreAllMocks(); });

const mockClass = {
  day: 'Monday',
  hour: '12:30',
  trainer: '6460077410adc8f3ed4e623f',
  activity: '64616a9e5648cb86adad2758',
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
    expect(response.error.message).toBe('cannot GET /api/class (500)');
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
    jest.spyOn(Class, 'create').mockImplementation(() => { throw new Error('Database error'); });
    const response = await request(app).post('/api/class').send(mockClass);
    expect(response.status).toBe(500);
    expect(response.error.message).toBe('cannot POST /api/class (500)');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('getClassById /api/class/:id', () => {
  test('should return status 200 when id exists', async () => {
    const id = '646004aff33f9c83d28ed954';
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
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
  test('should return status 500 when class id is invalid', async () => {
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
describe('deleteClass /api/class/:id', () => {
  test('Should return status 200 when delete class successfully', async () => {
    const id = '646004aff33f9c83d28ed958';
    const response = await request(app).delete(`/api/class/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Class with ID ${id} deleted!`);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('should return status 404 when the class is incative', async () => {
    const invalidID = '6460077410adc8f3ed4e623f';
    const response = await request(app).delete(`/api/class/${invalidID}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Class with ID ${invalidID} was not found`);
    expect(response.body.data).toBeUndefined();
  });
  test('should return status 404 when endpoint is not correct', async () => {
    const id = '646004aff33f9c83d28ed954';
    const response = await request(app).delete(`/api/classes/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error.message).toEqual(`cannot DELETE /api/classes/${id} (404)`);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('should return status 500 when there is a database error', async () => {
    const id = '646004aff33f9c83d28ed954';
    jest.spyOn(Class, 'findByIdAndUpdate').mockRejectedValueOnce();
    const response = await request(app).delete(`/api/class/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual(`cannot DELETE /api/class/${id} (500)`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

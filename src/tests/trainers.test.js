import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainer';

const mockTrainer = {
  firstName: 'Franco',
  lastName: 'Lopez',
  dni: 42653789,
  phone: 34165383,
  email: 'mauro@sdfs.com',
  city: 'Firmat',
  password: 'password545424',
  salary: 10000000,
};

beforeAll(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

describe('getAllTrainers /api/trainer', () => {
  test('Should return status 200 when get trainers', async () => {
    const response = await request(app).get('/api/trainer').send();
    const trainers = response.body.data;
    trainers.forEach((trainer) => {
      expect(trainer).toHaveProperty('firstName');
      expect(trainer).toHaveProperty('lastName');
      expect(trainer).toHaveProperty('dni');
      expect(trainer).toHaveProperty('email');
      expect(trainer).toHaveProperty('city');
      expect(trainer).toHaveProperty('isActive');
      expect(trainer).toHaveProperty('password');
      expect(trainer).toHaveProperty('phone');
      expect(trainer).toHaveProperty('salary');
    });
    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
    expect(response.body.message).toBe('Complete Trainer list');
  });

  test('Should return status 404 when route not exists', async () => {
    const response = await request(app).post('/api/trainers').send();
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });

  test('Should return status 500', async () => {
    jest.spyOn(Trainer, 'find').mockRejectedValueOnce(new Error('Simulate Error'));
    const response = await request(app).get('/api/trainer').send();
    expect(response.error.message).toBe('cannot GET /api/trainer (500)');
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toStrictEqual({});
    expect(response.body.data).toBeUndefined();
  });
});

describe('createTrainer /api/trainer', () => {
  test('Should return status 201 when create a new trainer', async () => {
    const response = await request(app).post('/api/trainer').send(mockTrainer);
    // eslint-disable-next-line no-underscore-dangle
    const mockTrainerId = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe(`Trainer ${mockTrainer.firstName} was created successfully!`);
    expect(response.body.data).toStrictEqual({
      ...mockTrainer, _id: mockTrainerId, isActive: true, __v: 0,
    });
  });

  test('Should return status 404 when route not exists', async () => {
    const response = await request(app).post('/api/trainers').send();
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });

  test('Should return status 500', async () => {
    jest.spyOn(Trainer, 'create').mockRejectedValueOnce(new Error('Simulate Error'));
    const response = await request(app).post('/api/trainer').send(mockTrainer);
    expect(response.error.message).toBe('cannot POST /api/trainer (500)');
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toStrictEqual({});
    expect(response.body.data).toBeUndefined();
  });
});

describe('updateTrainer /api/trainer/:id', () => {
  test('should return status 200 when a trainer can be successfully updated', async () => {
    const trainerId = '6460077410adc8f3ed4e623b';
    const trainerUpdateData = { firstName: 'Mauro', lastName: 'Caffesse', email: 'mauro.caffesse@gmail.com' };
    const response = await request(app).put(`/api/trainer/${trainerId}`).send(trainerUpdateData);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('should return status 404 when endpoint is not correct', async () => {
    const response = await request(app).put('/api/trainers').send();
    expect(response.status).toBe(404);
    expect(response.error.message).toEqual('cannot PUT /api/trainers (404)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 404 for non-existent or inactive trainer', async () => {
    const nonExistentId = '6460077410adc8f3ed4e6233';

    const response = await request(app).put(`/api/trainer/${nonExistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Trainer with ID: ${nonExistentId} was not found`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

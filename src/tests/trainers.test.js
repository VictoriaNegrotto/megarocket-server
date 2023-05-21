import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainer';

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
      expect(trainer).toHaveProperty('_id');
      expect(trainer).toHaveProperty('isActive');
      expect(trainer).toHaveProperty('password');
      expect(trainer).toHaveProperty('phone');
      expect(trainer).toHaveProperty('salary');
    });
    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
    expect(response.body.message).toBe('Complete Trainer list');
  });
});

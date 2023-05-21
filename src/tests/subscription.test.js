import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subscriptionSeed from '../seeds/subscription';

const mockSubscription = {
  classes: '646004aef33f9c83d28ed950',
  members: ['646004aff33f9c83d28ed950'],
  date: '2023-06-15T14:57:14.000+00:00',
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
});

describe('getAllSubscriptions /api/subscriptions', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/subscriptions').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('should return status 404', async () => {
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('createSubscription /api/subscriptions', () => {
  test('should create a subscription and return status 201', async () => {
    const response = await request(app).post('/api/subscriptions').send(mockSubscription);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });

  test('should return status 404', async () => {
    const response = await request(app).post('/api/subscription').send(mockSubscription);
    expect(response.status).toBe(404);
  });
});

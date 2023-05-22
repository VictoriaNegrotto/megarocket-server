import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subscriptionSeed from '../seeds/subscription';

const mockSubscription = {
  classes: '6462c6beeca7042f29eb1164',
  members: ['646004aff33f9c83d28ed958'],
  date: '2023-06-15T14:57:14.000Z',
};

const failedMockSubscription = {
  classes: '646004aef33f9c83d28ed950',
  date: '2023-06-15T14:57:14.000Z',
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
});

describe('getAllSubscriptions /api/subscriptions', () => {
  test('should return status 200', async () => {
    const trueSubscription = subscriptionSeed
      .filter((oneSubscription) => oneSubscription.isActive === true);
    const response = await request(app).get('/api/subscriptions').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Subscription list found');
    expect(response.error).toBeFalsy();
    trueSubscription.forEach((activity) => {
      expect(activity).toHaveProperty('classes');
      expect(activity).toHaveProperty('members');
      expect(activity).toHaveProperty('date');
    });
  });

  test('should return status 404', async () => {
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
    expect(response.error).toBeTruthy();
    expect(response.data).toBeUndefined();
  });

  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'find').mockImplementation(new Error('Error'));
    const response = await request(app).get('/api/subscriptions').send();
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual('cannot GET /api/subscriptions (500)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('createSubscription /api/subscriptions', () => {
  test('should create a subscription and return status 201', async () => {
    const response = await request(app).post('/api/subscriptions').send(mockSubscription);
    // eslint-disable-next-line no-underscore-dangle
    const mockSubscriptionID = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Subscription was created successfully!');
    expect(response.error).toBeFalsy();
    expect(response.body.data).toStrictEqual({
      ...mockSubscription, _id: mockSubscriptionID, isActive: true, __v: 0,
    });
  });

  test('should return status 404', async () => {
    const response = await request(app).post('/api/subscription').send(mockSubscription);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 400', async () => {
    const response = await request(app).post('/api/subscriptions').send(failedMockSubscription);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'create').mockImplementation(new Error('Error'));
    const response = await request(app).post('/api/subscriptions').send(mockSubscription);
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual('cannot POST /api/subscriptions (500)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

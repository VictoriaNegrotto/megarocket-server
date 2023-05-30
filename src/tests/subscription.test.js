import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subscriptionSeed from '../seeds/subscription';
import Class from '../models/Class';
import Member from '../models/Member';
import classSeed from '../seeds/class';
import memberSeed from '../seeds/member';

const mockSubscription = {
  classes: '646004aff33f9c83d28ed958',
  members: ['646015ffa877f6e5fb0e5de3'],
  date: '2023-06-15T14:57:14.000Z',
};

const failedMockSubscription = {
  classes: '646004aef33f9c83d28ed950',
  date: '2023-06-15T14:57:14.000Z',
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
  await Class.collection.insertMany(classSeed);
  await Member.collection.insertMany(memberSeed);
});

afterEach(() => {
  jest.restoreAllMocks();
});

const validID = '646276eb6d374da6dcbc5de7';
const notFoundID = '646276eb6d374da6dcbc5de4';
const inactiveID = '646276eb6d374da6dcbc5de6';

describe('getAllSubscriptions /api/subscriptions', () => {
  test('should return status 200 and get all subscriptions', async () => {
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

  test('should return status 404 the path is wrong', async () => {
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
    expect(response.error).toBeTruthy();
    expect(response.data).toBeUndefined();
  });

  test('should return status 500 an error occurred', async () => {
    jest.spyOn(Subscription, 'find').mockImplementation(new Error('Error'));
    const response = await request(app).get('/api/subscriptions').send();
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual('cannot GET /api/subscriptions (500)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('createSubscription /api/subscriptions', () => {
  test('shouldreturn status 201 and create a subscription', async () => {
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
  test('should return status 404 the path is wrong', async () => {
    const response = await request(app).post('/api/subscription').send(mockSubscription);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 400 some value is wrong', async () => {
    const response = await request(app).post('/api/subscriptions').send(failedMockSubscription);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return status 500 an error occurred', async () => {
    jest.spyOn(Subscription, 'create').mockImplementation(new Error('Error'));
    const response = await request(app).post('/api/subscriptions').send(mockSubscription);
    expect(response.status).toBe(500);
    expect(response.error.message).toEqual('cannot POST /api/subscriptions (500)');
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('updateSubscription /api/subscriptions/:id', () => {
  test('should return status 200 when a subscription can be successfully updated', async () => {
    const response = await request(app).put(`/api/subscriptions/${validID}`).send(mockSubscription);
    expect(response.body.data).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Subscription Id: ${validID} Updated!`);
  });

  test('should return status 404 when a subscription is inactive and cannot be updated', async () => {
    const response = await request(app).put(`/api/subscriptions/${inactiveID}`).send(mockSubscription);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Subscription Id: ${inactiveID} inactive, can not be updated`);
  });

  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).put('/api/subscription').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
    expect(response.body.message).toBeUndefined();
  });

  test('should return status 500 when a subscription is not found', async () => {
    const response = await request(app).put(`/api/subscriptions/${notFoundID}`).send(mockSubscription);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot PUT /api/subscriptions/${notFoundID} (500)`);
  });

  test('should return status 500 when an error occurs while updating a subscription', async () => {
    jest.spyOn(Subscription, 'findByIdAndUpdate').mockImplementation(() => {
      throw new Error('Error updating subscription');
    });
    const response = await request(app).put(`/api/subscriptions/${validID}`).send(mockSubscription);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot PUT /api/subscriptions/${validID} (500)`);
  });
});

describe('filterSubscriptionById /api/subscriptions/:id', () => {
  test('should return status 200 when a subscription is successfully found', async () => {
    const response = await request(app).get(`/api/subscriptions/${validID}`);
    expect(response.body.data).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Subscription Id: ${validID} was found`);
  });

  test('should return status 404 when a subscription is not found', async () => {
    const response = await request(app).get(`/api/subscriptions/${notFoundID}`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Subscription Id: ${notFoundID} was not found`);
  });

  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).get('/api/subscription').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
    expect(response.body.message).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    jest.spyOn(Subscription, 'findOne').mockImplementation(() => {
      throw new Error('Error finding subscription');
    });
    const response = await request(app).get(`/api/subscriptions/${validID}`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual(`cannot GET /api/subscriptions/${validID} (500)`);
  });
});

describe('deleteSubscription /api/subscriptions/:id', () => {
  test('should return status 200 when a subscription can be successfully deleted', async () => {
    const response = await request(app).delete(`/api/subscriptions/${validID}`);
    expect(response.body.data).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Subscription Id: ${validID} deleted`);
  });

  test('should return status 404 when a subscription is not found', async () => {
    const response = await request(app).delete(`/api/subscriptions/${notFoundID}`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Subscription Id: ${notFoundID} was not found`);
  });

  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).delete('/api/subscription').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
    expect(response.body.message).toBeUndefined();
  });

  test('should return status 500 when an error occurs', async () => {
    const mockFindByIdAndUpdate = jest.spyOn(Subscription, 'findByIdAndUpdate');
    mockFindByIdAndUpdate.mockImplementationOnce(() => {
      throw new Error('An error occurred');
    });
    const response = await request(app).delete(`/api/subscriptions/${validID}`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('An error ocurred:\n Error: An error occurred');
  });
});

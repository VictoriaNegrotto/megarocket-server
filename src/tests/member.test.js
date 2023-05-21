import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/member';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});

afterEach(() => {
  jest.restoreAllMocks();
});

const mockMember = {
  firstName: 'Test',
  lastName: 'User',
  dni: 32248076,
  phone: 34130071,
  email: 'test23@example.com',
  city: 'Test City',
  birthDate: '2000-01-01T00:00:00.000Z',
  postalCode: 2000,
  memberships: 'Black',
};

describe('getMembers /api/member', () => {
  test('Should return status 200 when get all members', async () => {
    const response = await request(app).get('/api/member').send();
    const memberSeedStringIds = memberSeed.map((member) => ({
      ...member,
      // eslint-disable-next-line no-underscore-dangle
      _id: member._id.toString(),
    }));
    expect(response.body.data).toEqual(memberSeedStringIds);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Members found');
  });
  test('Should return status 200 when get only active members', async () => {
    const response = await request(app).get('/api/member').send();
    const activeMembers = memberSeed.filter((member) => member.isActive);
    const activeMembersStringIds = activeMembers.map((member) => ({
      ...member,
      // eslint-disable-next-line no-underscore-dangle
      _id: member._id.toString(),
    }));
    expect(response.body.data).toEqual(activeMembersStringIds);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Members found');
  });
  test('Should return status 404 when not found members', async () => {
    jest.spyOn(Member, 'find').mockResolvedValue([]);
    const response = await request(app).get('/api/member').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('No members active');
  });
  test('Should return status 500 when there is an error retrieving members', async () => {
    jest.spyOn(Member, 'find').mockImplementation(new Error('Error retrieving members'));

    const response = await request(app).get('/api/member').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual({});
  });
});

describe('createMember /api/member', () => {
  test('Should return status 201 when creating a new member', async () => {
    const response = await request(app).post('/api/member').send(mockMember);
    // eslint-disable-next-line no-underscore-dangle
    const newMemberId = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.data).toStrictEqual({
      ...mockMember, isActive: true, __v: 0, _id: newMemberId,
    });
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Member created');
  });

  test('Should return status 500 when there is an error creating a new member', async () => {
    const mockError = new Error('Error creating member');
    jest.spyOn(Member, 'create').mockImplementation(() => {
      throw mockError;
    });

    const response = await request(app).post('/api/member').send(mockMember);

    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual({});
  });

  test('Should return status 400 when providing invalid data', async () => {
    const invalidMember = { ...mockMember, firstName: 2 };
    const response = await request(app).post('/api/member').send(invalidMember);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "firstName" must be a string');
  });
  test('Should return status 400 when missing required fields', async () => {
    const testMember = {
      firstName: 'Test',
      lastName: 'User',
    };
    const response = await request(app).post('/api/member').send(testMember);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "dni" is required');
  });
});

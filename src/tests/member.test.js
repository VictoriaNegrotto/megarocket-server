import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/member';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
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
  test('Should return status 200 when get only active members', async () => {
    const response = await request(app).get('/api/member').send();
    const activeMembers = response.body.data;
    activeMembers.forEach((oneMember) => {
      expect(oneMember).toHaveProperty('firstName');
      expect(oneMember).toHaveProperty('lastName');
      expect(oneMember).toHaveProperty('dni');
      expect(oneMember).toHaveProperty('city');
      expect(oneMember).toHaveProperty('birthDate');
      expect(oneMember).toHaveProperty('postalCode');
      expect(oneMember).toHaveProperty('memberships');
      expect(oneMember).toHaveProperty('isActive');
    });
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
  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).get('/api/membe').send();
    expect(response.status).toBe(404);
  });
  test('Should return status 500 when there is an error retrieving members', async () => {
    jest.spyOn(Member, 'find').mockImplementation(new Error('Error retrieving members'));

    const response = await request(app).get('/api/member').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(500);
    expect(response.body.error).toBeTruthy();
    expect(response.error.message).toEqual('cannot GET /api/member (500)');
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
  test('Should return status 404 when route not exist', async () => {
    const response = await request(app).post('/api/membe').send();
    expect(response.status).toBe(404);
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
    expect(response.error.message).toEqual('cannot POST /api/member (500)');
  });
});

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

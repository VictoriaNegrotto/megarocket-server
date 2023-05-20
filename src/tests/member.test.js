import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/member';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});

describe('GET /api/member/:id', () => {
  test('should return status 200 and member data when member exists', async () => {
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de3').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
  });

  test('should return status 404 when member does not exist', async () => {
    const response = await request(app).get('/api/member/646015ffa877f6e5fb0e5de5').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });
});

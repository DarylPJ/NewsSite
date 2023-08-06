import request  from "supertest";
import app from '../src/index.js';

describe('health endpoint', () => {
  it('should return healthy', async () => {
    const expected = 'healthy';
    
    await request(app).get('/health').expect(200).expect((response) => {
      expect(response.text).toBe(expected)
    })
  });
});
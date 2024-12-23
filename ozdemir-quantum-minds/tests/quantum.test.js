const request = require('supertest');
const app = require('../src/app');

describe('Quantum API Tests', () => {
  test('Ana sayfa erişimi', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });

  test('Quantum veri yükleme', async () => {
    const testData = {
      fileName: 'test.json',
      data: {
        quantumState: 'superposition',
        probability: 0.5
      }
    };

    const response = await request(app)
      .post('/api/quantum/upload')
      .send(testData);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
}); 
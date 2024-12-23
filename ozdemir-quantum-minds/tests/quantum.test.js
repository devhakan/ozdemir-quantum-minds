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

  describe('Quantum Hesaplama Testleri', () => {
    test('Süperpozisyon hesaplama', async () => {
      const testData = {
        qubits: [0, 1],
        operation: 'superposition'
      };

      const response = await request(app)
        .post('/api/quantum/calculate')
        .send(testData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.operation).toBe('superposition');
      expect(Array.isArray(response.body.result)).toBe(true);
    });

    test('Dolanıklık hesaplama', async () => {
      const testData = {
        qubits: [0, 1],
        operation: 'entanglement'
      };

      const response = await request(app)
        .post('/api/quantum/calculate')
        .send(testData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.operation).toBe('entanglement');
      expect(response.body.result.state).toBeDefined();
    });
  });
}); 
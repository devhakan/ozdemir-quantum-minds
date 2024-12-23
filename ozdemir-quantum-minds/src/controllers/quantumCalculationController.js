const { calculateSuperposition, calculateEntanglement } = require('../services/quantumService');

exports.calculateQuantumState = async (req, res) => {
  try {
    const { qubits, operation } = req.body;
    
    let result;
    switch (operation) {
      case 'superposition':
        result = await calculateSuperposition(qubits);
        break;
      case 'entanglement':
        result = await calculateEntanglement(qubits);
        break;
      default:
        throw new Error('Geçersiz quantum operasyonu');
    }

    res.json({
      success: true,
      operation,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCalculationHistory = async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file('calculation-history.json');
    
    const [exists] = await file.exists();
    if (!exists) {
      return res.json({ calculations: [] });
    }

    const [content] = await file.download();
    const history = JSON.parse(content.toString());
    
    res.json({ calculations: history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
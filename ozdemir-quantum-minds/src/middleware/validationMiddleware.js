const validateQuantumCalculation = (req, res, next) => {
  const { qubits, operation } = req.body;
  
  if (!qubits || !Array.isArray(qubits)) {
    return res.status(400).json({
      error: 'Geçerli qubit dizisi gerekli'
    });
  }

  if (!operation || !['superposition', 'entanglement'].includes(operation)) {
    return res.status(400).json({
      error: 'Geçerli bir quantum operasyonu belirtilmeli (superposition veya entanglement)'
    });
  }

  next();
};

module.exports = {
  validateQuantumCalculation
}; 
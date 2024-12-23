const express = require('express');
const router = express.Router();
const quantumController = require('../controllers/quantumController');
const calculationController = require('../controllers/quantumCalculationController');

router.post('/upload', quantumController.uploadQuantumData);
router.get('/files', quantumController.getQuantumData);

router.post('/calculate', calculationController.calculateQuantumState);
router.get('/calculations', calculationController.getCalculationHistory);

module.exports = router; 
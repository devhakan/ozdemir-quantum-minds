const express = require('express');
const router = express.Router();
const quantumController = require('../controllers/quantumController');

router.post('/upload', quantumController.uploadQuantumData);
router.get('/files', quantumController.getQuantumData);

module.exports = router; 
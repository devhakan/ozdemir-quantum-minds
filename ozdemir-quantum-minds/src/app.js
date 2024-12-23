const express = require('express');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const quantumRoutes = require('./routes/quantumRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Routes
app.use('/api/quantum', quantumRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ozdemir Quantum Minds API\'sine Hoş Geldiniz!',
    endpoints: {
      quantum: {
        upload: 'POST /api/quantum/upload',
        files: 'GET /api/quantum/files'
      }
    }
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: './quantum-mind-445617-fd043a096b3e.json',
  projectId: 'quantum-mind-445617'
});

const bucketName = 'ozdemir-quantum-minds-data';

exports.uploadQuantumData = async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    const { fileName, data } = req.body;
    
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'application/json'
      }
    });

    stream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    stream.on('finish', () => {
      res.json({
        success: true,
        message: 'Quantum veri başarıyla yüklendi',
        fileName
      });
    });

    stream.end(JSON.stringify(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuantumData = async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles();
    
    const fileList = files.map(file => ({
      name: file.name,
      created: file.metadata.timeCreated,
      size: file.metadata.size
    }));

    res.json({ files: fileList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
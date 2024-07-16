
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Setup koneksi ke MongoDB menggunakan Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Terhubung ke MongoDB'));

// Gunakan router untuk mahasiswa
const mahasiswaRouter = require('./routes/mahasiswa');
app.use('/mahasiswa', mahasiswaRouter);

// Gunakan router untuk matakuliah
const matakuliahRouter = require('./routes/matakuliah');
app.use('/matakuliah', matakuliahRouter);

// Middleware untuk menangani error jika endpoint tidak ditemukan
app.use((req, res, next) => {
  const error = new Error('Endpoint tidak ditemukan');
  error.status = 404;
  next(error);
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Jalankan server Express
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

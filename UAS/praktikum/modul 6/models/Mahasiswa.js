const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  _id: String,
  nama: { type: String, required: true },
  jurusan: { type: String, required: true },
  angkatan: { type: Number, required: true },
  email: { type: String, required: true }
});

// Export model Mahasiswa
module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);

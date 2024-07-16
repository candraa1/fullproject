const mongoose = require('mongoose');

const matakuliahSchema = new mongoose.Schema({
  kodeMK: { type: String, required: true },
  namaMK: { type: String, required: true },
  sks: { type: Number, required: true },
  semester: { type: String, required: true }
});

// Export model Matakuliah
module.exports = mongoose.model('Matakuliah', matakuliahSchema);

const express = require('express');
const router = express.Router();
const Mahasiswa = require('../models/Mahasiswa');

// GET semua mahasiswa
router.get('/', async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find();
    res.json(mahasiswa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET satu mahasiswa berdasarkan ID
router.get('/:id', getMahasiswa, (req, res) => {
  res.json(res.mahasiswa);
});

// POST mahasiswa baru
router.post('/', async (req, res) => {
  const mahasiswa = new Mahasiswa({
    _id: req.body.nim,
    nama: req.body.nama,
    jurusan: req.body.jurusan,
    angkatan: req.body.angkatan,
    email: req.body.email
  });

  try {
    const newMahasiswa = await mahasiswa.save();
    res.status(201).json(newMahasiswa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) mahasiswa berdasarkan ID
router.put('/:id', getMahasiswa, async (req, res) => {
  if (req.body.nama != null) {
    res.mahasiswa.nama = req.body.nama;
  }
  if (req.body.jurusan != null) {
    res.mahasiswa.jurusan = req.body.jurusan;
  }
  if (req.body.angkatan != null) {
    res.mahasiswa.angkatan = req.body.angkatan;
  }
  if (req.body.email != null) {
    res.mahasiswa.email = req.body.email;
  }

  try {
    const updatedMahasiswa = await res.mahasiswa.save();
    res.json(updatedMahasiswa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE mahasiswa berdasarkan ID
router.delete('/:id', getMahasiswa, async (req, res) => {
  try {
    await Mahasiswa.deleteOne({ _id: req.params.id });
    res.json({ message: 'Mahasiswa berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware untuk mendapatkan mahasiswa berdasarkan ID
async function getMahasiswa(req, res, next) {
  let mahasiswa;
  try {
    mahasiswa = await Mahasiswa.findById(req.params.id);
    if (mahasiswa == null) {
      return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.mahasiswa = mahasiswa;
  next();
}

module.exports = router;

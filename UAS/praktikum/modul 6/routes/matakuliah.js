const express = require('express');
const router = express.Router();
const Matakuliah = require('../models/Matakuliah');

// GET semua matakuliah
router.get('/', async (req, res) => {
  try {
    const matakuliah = await Matakuliah.find();
    res.json(matakuliah);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET satu matakuliah berdasarkan ID
router.get('/:id', getMatakuliah, (req, res) => {
  res.json(res.matakuliah);
});

// POST matakuliah baru
router.post('/', async (req, res) => {
  const matakuliah = new Matakuliah({
    kodeMK: req.body.kodeMK,
    namaMK: req.body.namaMK,
    sks: req.body.sks,
    semester: req.body.semester
  });

  try {
    const newMatakuliah = await matakuliah.save();
    res.status(201).json(newMatakuliah);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) matakuliah berdasarkan ID
router.put('/:id', getMatakuliah, async (req, res) => {
  if (req.body.kodeMK != null) {
    res.matakuliah.kodeMK = req.body.kodeMK;
  }
  if (req.body.namaMK != null) {
    res.matakuliah.namaMK = req.body.namaMK;
  }
  if (req.body.sks != null) {
    res.matakuliah.sks = req.body.sks;
  }
  if (req.body.semester != null) {
    res.matakuliah.semester = req.body.semester;
  }

  try {
    const updatedMatakuliah = await res.matakuliah.save();
    res.json(updatedMatakuliah);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE matakuliah berdasarkan ID
router.delete('/:id', getMatakuliah, async (req, res) => {
    try {
      await Matakuliah.deleteOne({ _id: req.params.id });
      res.json({ message: 'Matakuliah berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Middleware untuk mendapatkan matakuliah berdasarkan ID
async function getMatakuliah(req, res, next) {
  let matakuliah;
  try {
    matakuliah = await Matakuliah.findById(req.params.id);
    if (matakuliah == null) {
      return res.status(404).json({ message: 'Matakuliah tidak ditemukan' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.matakuliah = matakuliah;
  next();
}

module.exports = router;

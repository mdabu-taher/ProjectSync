// server/routes/employees.js
import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// POST /api/employees → create
router.post('/', async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/employees → list (for dropdown)
router.get('/', async (req, res) => {
  try {
    const list = await Employee.find().select('full_name _id');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

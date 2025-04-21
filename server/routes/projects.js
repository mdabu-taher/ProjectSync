// server/routes/projects.js
import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// POST /api/projects → create
router.post('/', async (req, res) => {
  try {
    const proj = await Project.create(req.body);
    res.status(201).json(proj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/projects → list (for dropdown)
router.get('/', async (req, res) => {
  try {
    const list = await Project.find().select('project_name _id');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

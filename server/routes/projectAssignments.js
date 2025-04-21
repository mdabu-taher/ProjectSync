// server/routes/projectAssignments.js
import express from 'express';
import ProjectAssignment from '../models/ProjectAssignment.js';

const router = express.Router();

// POST  /api/project_assignments  → create a new assignment
router.post('/', async (req, res) => {
  try {
    const asg = await ProjectAssignment.create(req.body);
    res.status(201).json(asg);
  } catch (err) {
    console.error('POST /api/project_assignments error:', err);
    res.status(400).json({ error: err.message });
  }
});

// GET   /api/project_assignments  → fetch latest 5 with populated fields
router.get('/', async (req, res) => {
  try {
    const list = await ProjectAssignment.find()
      .sort({ start_date: -1 })
      .limit(5)
      .populate('employee_id',  'employee_id full_name')
      .populate('project_code', 'project_name');
    return res.json(list);
  } catch (err) {
    console.error('GET /api/project_assignments error:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;

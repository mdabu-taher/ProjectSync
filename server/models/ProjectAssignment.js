// server/models/ProjectAssignment.js
import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  employee_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Project',  required: true },
  start_date:   { type: Date, default: Date.now }
});

export default mongoose.model('ProjectAssignment', assignmentSchema);

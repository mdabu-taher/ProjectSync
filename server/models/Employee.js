// server/models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employee_id:     { type: String, required: true, unique: true },
  full_name:       { type: String, required: true },
  email:           { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true }
});

export default mongoose.model('Employee', employeeSchema);

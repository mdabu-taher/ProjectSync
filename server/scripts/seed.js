// server/scripts/seed.js
import 'dotenv/config';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import Project from '../models/Project.js';
import ProjectAssignment from '../models/ProjectAssignment.js';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // 1) Clear
  await Promise.all([
    Employee.deleteMany({}),
    Project.deleteMany({}),
    ProjectAssignment.deleteMany({})
  ]);

  // 2) Seed Employees
  const emps = await Employee.insertMany([
    { employee_id: 'E001', full_name: 'Alice Jones', email: 'alice@example.com', hashed_password: 'pwd1' },
    { employee_id: 'E002', full_name: 'Bob Smith',   email: 'bob@example.com',   hashed_password: 'pwd2' },
    { employee_id: 'E003', full_name: 'Carol Lee',   email: 'carol@example.com', hashed_password: 'pwd3' },
    { employee_id: 'E004', full_name: 'David Kim',   email: 'david@example.com', hashed_password: 'pwd4' },
    { employee_id: 'E005', full_name: 'Eva Wong',    email: 'eva@example.com',   hashed_password: 'pwd5' },
    { employee_id: 'E006', full_name: 'Mohona Parvin',    email: 'mohona@example.com',   hashed_password: 'pwd5' },
  ]);

  // 3) Seed Projects
  const projs = await Project.insertMany([
    { project_code: 'P100', project_name: 'Alpha',   project_description: 'First project' },
    { project_code: 'P200', project_name: 'Beta',    project_description: 'Second project' },
    { project_code: 'P300', project_name: 'Gamma',   project_description: 'Third project' },
    { project_code: 'P400', project_name: 'Delta',   project_description: 'Fourth project' },
    { project_code: 'P500', project_name: 'Epsilon', project_description: 'Fifth project' },
    { project_code: 'P600', project_name: 'AyanAnaya', project_description: 'sixth project' },
  ]);

  // 4) Seed Assignments
  const assigns = emps.map((e, i) => ({
    employee_id:  e._id,
    project_code: projs[i % projs.length]._id,
    start_date:   new Date(Date.now() - i * 86400000)
  }));
  await ProjectAssignment.insertMany(assigns);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});

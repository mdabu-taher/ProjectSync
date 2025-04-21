// server/index.js
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// Load root .env regardless of CWD
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Routers
import employeesRouter    from './routes/employees.js';
import projectsRouter     from './routes/projects.js';
import assignmentsRouter  from './routes/projectAssignments.js';

(async () => {
  // 1) Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // don't exit — we still want to bring up the server to see errors
  }

  // 2) Create app + middleware
  const app = express();
  app.use(cors());
  app.use(express.json());

  // 3) API routes
  app.use('/api/employees',          employeesRouter);
  app.use('/api/projects',           projectsRouter);
  app.use('/api/project_assignments',assignmentsRouter);

  // 4) Static serve if built
  const clientDist = path.join(__dirname, '../client/dist');
  const indexHtml  = path.join(clientDist, 'index.html');
  if (fs.existsSync(indexHtml)) {
    app.use(express.static(clientDist));
    app.use((_, res) => res.sendFile(indexHtml));
  } else {
    console.log('No client/dist found; skipping static serve.');
  }

  // 5) Error handler
  app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: err.message });
  });

  // 6) Start listening
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Users demo data
const users = [
  { id: '1', email: 'hire-me@anshumat.org', password: 'HireMe@2025!', name: 'Anshumat Reviewer' }
];

// Applications in-memory store
const applications = [];

const authRoutes = require('./routes/auth')(users);
const appRoutes = require('./routes/applications')(applications);

app.use('/api/auth', authRoutes);
app.use('/api/applications', appRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

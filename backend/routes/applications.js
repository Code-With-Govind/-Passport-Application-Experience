const express = require('express');

module.exports = (applications) => {
  const router = express.Router();

  // Get user's applications
  router.get('/:userId', (req, res) => {
    const userApps = applications.filter(app => app.userId === req.params.userId);
    res.json({ success: true, applications: userApps });
  });

  // Start new application
  router.post('/', (req, res) => {
    const { userId } = req.body;
    const newApp = {
      id: Date.now().toString(),
      userId,
      status: 'Draft',
      lastSaved: new Date().toISOString(),
      data: {
        step: 1
      }
    };
    applications.push(newApp);
    res.json({ success: true, application: newApp });
  });

  // Save/Update draft or submit
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const appIndex = applications.findIndex(app => app.id === id);
    
    if (appIndex !== -1) {
      applications[appIndex].data = { ...applications[appIndex].data, ...req.body.data };
      if (req.body.status) {
        applications[appIndex].status = req.body.status;
      }
      applications[appIndex].lastSaved = new Date().toISOString();
      res.json({ success: true, application: applications[appIndex] });
    } else {
      res.status(404).json({ success: false, message: 'Application not found' });
    }
  });

  return router;
};

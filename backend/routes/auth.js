const express = require('express');

module.exports = (users) => {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Return simple token/user object for demo
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials. Please use demo credentials.' });
    }
  });

  return router;
};

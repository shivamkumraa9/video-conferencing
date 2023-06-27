const authService = require('../services/authService');

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new user
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await authService.signup(name, email, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { login, signup };

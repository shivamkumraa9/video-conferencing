const conferenceService = require('../services/conferenceService');

// Generate conference link
const generateLink = async (req, res) => {
  const userId = req.user.id;

  try {
    const conferenceId = await conferenceService.generateLink(userId);
    res.json({ conferenceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

  const verifyConferenceId = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;
  
    try {
      const result = await conferenceService.verifyConferenceId(id, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { generateLink, verifyConferenceId };

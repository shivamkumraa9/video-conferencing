const Conference = require('../models/conference');
const User = require('../models/user');

// Generate conference link
const generateLink = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const conference = await Conference.create({
    UserId: user.id,
  });

  return conference.id;
};

// Verify conference ID
// Verify conference ID
const verifyConferenceId = async (conferenceId, userId) => {
    const conference = await Conference.findByPk(conferenceId);
    if (!conference) {
      throw new Error('Conference ID is invalid');
    }
    
    if (!userId) {
      return { isValid: true, isHost: false };
    }
  
    const isHost = conference.UserId === userId;
    return { isValid: true, isHost };
  };

module.exports = { generateLink, verifyConferenceId };

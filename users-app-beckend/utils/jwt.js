const jwt = require('jsonwebtoken');

// Generate a JWT token for a given user ID
const generateToken = (userId) => {
  // Token expires in 2 hours
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '2h' });
  console.log('[jwt] Generated token for userId:', userId);
  return token;
};

module.exports = { generateToken };

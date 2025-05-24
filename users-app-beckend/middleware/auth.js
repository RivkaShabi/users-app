const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token from Authorization header
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Extract token from header (format: "Bearer <token>")
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.warn('[auth] No token provided');
    return res.sendStatus(401); // Unauthorized
  }

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('[auth] Invalid token');
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    // Log the username if available
    console.log(
      '[auth] Token verified for user:',
      user && user.username ? user.username : 'unknown'
    );
    next();
  });
}

module.exports = { authenticateToken };

import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Format: Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user info to request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

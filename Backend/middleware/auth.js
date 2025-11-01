import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check if token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  // 2️⃣ Extract the actual token
  const token = authHeader.split(' ')[1];

  try {
    // 3️⃣ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ (Optional) Attach decoded info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default auth;

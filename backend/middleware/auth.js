import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysecret";

// Step 1: Check token
export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Login first!" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Step 2: Check role
export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "You cannot access this!" });
    }
    next();
  };
};

import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Example protected route
router.get("/", authenticate, authorize(["government", "ngo"]), (req, res) => {
  res.json({ message: "Welcome to Registry!", user: req.user });
});

export default router;

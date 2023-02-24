const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const prisma = require("../db/client");
const auth = require("../authentication/auth");

// New user creation
router.post("/create", async (req, res) => {
  const { username, password, email, info } = req.body;

  try {
    const users = await prisma.user.findMany({ where: { username } });
    if (users?.length > 0)
      return res.status(400).json({ message: "User existed." });

    const user = await prisma.user.create({
      data: { username, password, email, info, created_at: new Date() },
    });
    return res.status(200).json({ message: "New user created.", user });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //Get user data from database
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || user.password !== password)
      res.status(400).json({ message: "Invalid username or password." });

    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
    return res.status(200).json({ message: "User logged in.", token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Read user info
router.get("/", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.username,
      },
    });

    if (!user) return res.status(400).json({ message: "User not found." });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update user info
router.put("/update", auth, async (req, res) => {
  const { password, email, info } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        username: req.username,
      },
      data: {
        password,
        email,
        info,
      },
    });

    return res.status(200).json({ message: "User updated.", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete("/delete", auth, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        username: req.username,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return res.status(200).json({ message: "User deleted.", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

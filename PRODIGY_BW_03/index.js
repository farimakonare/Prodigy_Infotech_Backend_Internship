require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

  app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
  app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
  
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });
  
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    res.json({ token });
  });

  app.get("/profile", authMiddleware(), async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  });
  
  app.get("/admin", authMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
  });
  
  const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

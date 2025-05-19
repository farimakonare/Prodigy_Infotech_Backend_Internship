require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const User = require("./models/User");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Connect to Redis
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect().then(() => console.log("Redis connected")).catch(console.error);

app.get('/', (req, res) => {
    res.send('API is running...');
  });

  app.get("/users", async (req, res) => {
    console.time("users-fetch");
  
    const cached = await redisClient.get("users");
    if (cached) {
      console.log("Serving from Redis");
      console.timeEnd("users-fetch");
      return res.json(JSON.parse(cached));
    }
  
    const users = await User.find();
    await redisClient.setEx("users", 60, JSON.stringify(users));
    console.log("Serving from DB and caching");
    console.timeEnd("users-fetch");
    res.json(users);
  });
  
  app.post("/users", async (req, res) => {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
  
    await redisClient.del("users");
    res.status(201).json(user);
  });
  
  app.put("/users/:id", async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "User not found" });
  
    await redisClient.del("users");
    res.json(updated);
  });

  app.delete("/users/:id", async (req, res) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
  
    await redisClient.del("users");
    res.json({ message: "User deleted" });
  });
  
  const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

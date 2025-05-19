const express = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Create a new room (only for logged-in users)
router.post("/", authenticate, async (req, res) => {
    const { name, description, price, location, availableFrom, availableTo } = req.body;
    
    if (!name || !description || !price || !location || !availableFrom || !availableTo) {
        return res.status(400).json({ error: "All fields are required." });
      }

    try {
      const room = await prisma.room.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          location,
          availableFrom: new Date(availableFrom),
          availableTo: new Date(availableTo),
          userId: req.user.id,
        },
      });
  
      res.status(201).json(room);
    } catch (err) {
      console.error("Room creation error:", err);
      res.status(500).json({ error: "Failed to create room" });
    }
  });
  
// search rooms
router.get("/", async (req, res) => {
    const { location, maxPrice, from, to } = req.query;
  
    try {
      const filters = {};
  
      if (location) {
        filters.location = { contains: location, mode: "insensitive" };
      }
  
      if (maxPrice) {
        filters.price = { lte: parseFloat(maxPrice) };
      }
  
      if (from && to) {
        filters.AND = [
          { availableFrom: { lte: new Date(from) } },
          { availableTo: { gte: new Date(to) } }
        ];
      }
  
      const rooms = await prisma.room.findMany({
        where: filters,
        include: {
          user: {
            select: { id: true, email: true }
          }
        }
      });
  
      res.json(rooms);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  });
  
module.exports = router;

require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/rooms");

const app = express(); 

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes); 

const bookingRoutes = require("./routes/bookings");
app.use("/bookings", bookingRoutes);
  
app.get('/', (req, res) => {
    res.send('API is running...');
  });

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

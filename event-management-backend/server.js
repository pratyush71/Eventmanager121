const express = require("express");
const http = require("http"); // ✅ Import http module
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // ✅ Import database connection
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const socketIo = require("socket.io");

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app); // ✅ Create HTTP server before using it

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ MongoDB Connection
connectDB()
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ WebSocket connection
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Attach `io` to request object for real-time updates in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message || "Something went wrong" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
